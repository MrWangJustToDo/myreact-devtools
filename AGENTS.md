# AGENTS.md — @my-react DevTools

## Project Overview

This is a devtool for the `@my-react` framework, similar to React DevTools. It inspects component trees, hooks, state, props, HMR, triggers, errors/warnings, console output, and globalThis for any platform running `@my-react`.

## Repository Structure

```
my-react-devtools/
├── packages/
│   ├── core/          # @my-react-devtool/core — runtime logic, state, serialization
│   └── bridge/        # @my-react-devtool/bridge — message routing between core and UI
├── chrome/            # Next.js web app — devtool UI panel (also used as Chrome extension)
├── scripts/           # Build scripts
└── package.json       # Root workspace config
```

**Package manager:** pnpm (workspace via `pnpm-workspace.yaml`)  
**Language:** TypeScript throughout  
**Build:** `pnpm run build:packages` (rollup via project-tool), `pnpm run build:local` (Next.js)

## Package Architecture

### `packages/core` (`@my-react-devtool/core`)

The runtime-side library injected into the inspected page. Central class is `DevToolCore` in `src/instance.ts`.

**Key directories:**

| Directory | Purpose |
|-----------|---------|
| `src/instance.ts` | `DevToolCore` class — all runtime state fields, `_notify`, `subscribe`, all `notify*` methods |
| `src/event.ts` | Enums: `DevToolMessageEnum` (core→UI), `MessagePanelType` (UI→core), `MessageHookType`, etc. |
| `src/tree/` | Fiber → `PlainNode` conversion, `inspectFiber`, tree walking |
| `src/tree/instance.ts` | `PlainNode` class — the serializable fiber representation sent to UI |
| `src/data/` | `getNode()` / `getObj()` — deep value serialization to `NodeValue` |
| `src/hook/` | Hook inspection, `disableLogs` wrapping during hook replay |
| `src/fiber/` | Fiber node updates, HMR, type detection |
| `src/dispatch/` | `patchEvent` — hooks into reconciler callbacks (commit, update, unmount, warn, error, etc.) |
| `src/config/` | Feature toggles (hover overlay, update highlight, retrigger) |
| `src/console.ts` | Console patching — intercepts `console.*` to record output |
| `src/log.ts` | `disableLogs`/`reenableLogs` — suppresses console during hook inspection (from React DevTools) |
| `src/view/` | DOM overlay (Select, Highlight) for hover/update visualization |
| `src/setup.ts` | `setupDispatch` — patches a reconciler dispatch for devtool integration |
| `src/utils.ts` | `debounce`, `throttle` |

**Core patterns:**

- State lives as fields on `DevToolCore` (e.g. `_warn`, `_error`, `_console`, `_trigger`, `_hmr`)
- Each field has a corresponding `notify*()` method that serializes data via `getNode()` and calls `_notify()`
- `_notify()` broadcasts `{ type: DevToolMessageEnum, data, agentId }` to all `subscribe()` listeners
- `notifyAll()` (debounced) sends everything on connect/reconnect
- `connect()` / `disconnect()` enable/disable the devtool (all `notify*` methods guard with `hasEnable`)

### `packages/bridge` (`@my-react-devtool/bridge`)

Routes messages between `core` and the UI panel across different environments.

| File | Purpose |
|------|---------|
| `src/message.ts` | `onMessageFromPanelOrWorkerOrDetector` — maps `MessagePanelType` commands to `DevToolCore` methods |
| `src/core.ts` | Singleton `DevToolCore` instance |
| `src/panel/` | Extension panel setup, `window.onRender`/`window.onListener` wiring |
| `src/content/` | Content script variants (direct, forwarded, bundled, websocket) |
| `src/entry/` | Entry points for different connection modes (web, socket, websocket, node, iframe) |
| `src/background/` | Chrome extension service worker and proxy |

### `chrome/` (DevTool UI)

Next.js app rendering the devtool panel. Works as Chrome extension panel or standalone web app.

**UI framework:** HeroUI (`@heroui/react`), Tailwind CSS, Lucide icons, `next-themes`  
**State management:** `reactivity-store` (`createState` with `getActions` / `getReadonlyState` / `subscribe`)  
**Layout:** `allotment` split panes, `react-virtuoso` for virtualized tree

**Key directories:**

| Directory | Purpose |
|-----------|---------|
| `src/utils/render.ts` | `onRender(data)` — receives `DevToolMessageEnum` messages, dispatches to stores |
| `src/utils/listener.ts` | `onListener(postMessage)` — subscribes to store changes, sends `MessagePanelType` to core |
| `src/hooks/` | `reactivity-store` state modules (one per feature) |
| `src/components/` | UI components (TreeView, DetailView, NodeView, ConsoleView, GlobalThisView, etc.) |
| `src/pages/` | Next.js routes (`devTool.tsx` is the main panel) |

## Data Flow

```
@my-react reconciler
        │ (callbacks: onFiberUpdate, onFiberWarn, etc.)
        ▼
  DevToolCore (packages/core)
        │ stores in fields (_warn, _error, _console, etc.)
        │ serializes via getNode()
        │ calls _notify({ type: DevToolMessageEnum.*, data })
        ▼
  Bridge (packages/bridge)
        │ (port / postMessage / socket / websocket)
        ▼
  window.onRender (chrome/src/utils/render.ts)
        │ dispatches to reactivity-store hooks
        ▼
  UI Components (chrome/src/components/)

  ── reverse direction ──

  UI action (button click, select, etc.)
        │ updates reactivity-store state
        ▼
  window.onListener subscriptions (chrome/src/utils/listener.ts)
        │ sends MessagePanelType to bridge
        ▼
  onMessageFromPanelOrWorkerOrDetector (packages/bridge/src/message.ts)
        │ calls DevToolCore methods
        ▼
  DevToolCore responds (notify, action, etc.)
```

## How to Add a New Feature (end-to-end pattern)

Follow this checklist when adding a new data channel (like console, globalThis, warn, error):

### 1. Core — enum (`packages/core/src/event.ts`)
- Add entry to `DevToolMessageEnum` (core→UI data channel)
- Add entry to `MessagePanelType` if UI needs to send commands back (e.g. clear, refresh)

### 2. Core — state & notify (`packages/core/src/instance.ts`)
- Add field on `DevToolCore` (e.g. `_myFeature: ...`)
- Add `notifyMyFeature()` method — serialize with `getNode()`, call `_notify()`
- Add to `notifyAll()` if it should be sent on reconnect
- Add to `clear()` if it should reset on unmount
- Add `clearMyFeature()` if the UI can request clearing
- For incremental data: use an index tracker (e.g. `_myFeatureSentIndex`) to only send deltas

### 3. Bridge — command handler (`packages/bridge/src/message.ts`)
- Add `if (data?.type === MessagePanelType.myCommand)` block calling the appropriate `core.*` method

### 4. UI — store (`chrome/src/hooks/useMyFeature.ts`)
- Create `reactivity-store` state with `createState`
- Include actions for setting/appending/clearing data
- Use `count` pattern if UI needs to trigger core-side actions (count++ → listener detects → sends message)

### 5. UI — render handler (`chrome/src/utils/render.ts`)
- Import the store
- Add `if (data.type === DevToolMessageEnum.myFeature)` block dispatching to store actions

### 6. UI — listener (`chrome/src/utils/listener.ts`)
- Subscribe to store changes that should trigger messages to core
- Send `MessagePanelType.*` via `postMessage`

### 7. UI — component (`chrome/src/components/MyFeatureView/index.tsx`)
- Read from the store hook
- Use `ValueView` to render `NodeValue` data (supports expandable objects, arrays, etc.)
- Add to `DetailView` with a new mode in `useDetailMode`
- Add dropdown option in `TreeViewSetting.tsx`

## Key Patterns & Conventions

### State field naming
- Runtime fields: `_fieldName` (underscore prefix, on `DevToolCore`)
- Notify methods: `notifyFieldName()` — always guard with `if (!this.hasEnable) return`
- Clear methods: `clearFieldName()` — reset field and notify

### Incremental data sending
For high-frequency data (like console), use a sent-index to avoid resending all data:
```typescript
// only send entries that haven't been sent yet
const pending = this._data.slice(this._dataSentIndex);
this._dataSentIndex = this._data.length;
this._notify({ type: ..., data: pending });
```
UI side should `append` incoming data rather than `replace`.  
For clear: send `data: null` as a signal; UI should have separate `reset()` (no echo back) vs `clear()` (bumps count, notifies core).

### Console patching & disableLogs interaction
`console.ts` patches native console methods. `log.ts` has `disableLogs()`/`reenableLogs()` from React DevTools that replaces console methods with no-ops during hook inspection. Since `disableLogs` saves/restores whatever is on `console.*`, our patches are naturally excluded during inspection — no explicit coordination needed.

### Value serialization
All values sent to the UI go through `getNode()` (`data/inspect.ts`) → `NodeValue` objects. The UI renders these with `ValueView` component which supports expandable trees, chunk loading, and context menus.

### reactivity-store pattern in UI
```typescript
export const useMyStore = createState(() => ({ data: null }), {
  withActions: (state) => ({
    setData: (d) => { state.data = d; },
    clear: () => { state.data = null; },
  }),
  withDeepSelector: false,
  withStableSelector: true,
});
// Usage in components:
const data = useMyStore((s) => s.data);
// Usage outside components:
useMyStore.getActions().setData(value);
useMyStore.getReadonlyState().data;
```

## Dev Modes

| Command | Mode | Description |
|---------|------|-------------|
| `pnpm dev:web` | web | Connect via iframe postMessage |
| `pnpm dev:socket` | socket | Connect via Socket.IO |
| `pnpm dev:websocket` | websocket | Connect via raw WebSocket |
| `pnpm dev:local` | local | Local Next.js dev (no connection) |
| `pnpm dev:extension` | extension | Chrome extension with file watching |

## Type Checking

```bash
# Check core (ignore pre-existing @my-react type errors from node_modules)
npx tsc --noEmit -p packages/core/tsconfig.json 2>&1 | grep "packages/core"

# Check chrome app
npx tsc --noEmit -p chrome/tsconfig.json
```

## Important Files Quick Reference

| What | File |
|------|------|
| All devtool state & notify | `packages/core/src/instance.ts` |
| Message enums | `packages/core/src/event.ts` |
| Value serialization | `packages/core/src/data/inspect.ts` |
| Fiber → PlainNode | `packages/core/src/tree/inspect.ts` |
| PlainNode class | `packages/core/src/tree/instance.ts` |
| Reconciler event hooks | `packages/core/src/dispatch/event.ts` |
| Bridge message handler | `packages/bridge/src/message.ts` |
| UI message receiver | `chrome/src/utils/render.ts` |
| UI → core subscriptions | `chrome/src/utils/listener.ts` |
| Detail panel router | `chrome/src/components/DetailView/index.tsx` |
| Mode selector | `chrome/src/components/TreeView/TreeViewSetting.tsx` |
| Detail mode state | `chrome/src/hooks/useDetailMode.ts` |
