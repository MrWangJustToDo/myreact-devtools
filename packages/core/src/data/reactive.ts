// SEE https://github.com/MrWangJustToDo/reactivity-store

// -- reactivity-store utils --

enum ReactiveFlags {
  SKIP = "__v_skip",
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly",
  IS_SHALLOW = "__v_isShallow",
  RAW = "__v_raw",
  IS_REF = "__v_isRef",
}

export function isReactive(value: unknown): boolean {
  if (isReadonly(value)) {
    return isReactive((value as any)[ReactiveFlags.RAW]);
  }
  return !!(value && (value as any)[ReactiveFlags.IS_REACTIVE]);
}

export function isReadonly(value: unknown): boolean {
  return !!(value && (value as any)[ReactiveFlags.IS_READONLY]);
}

export function isShallow(value: unknown): boolean {
  return !!(value && (value as any)[ReactiveFlags.IS_SHALLOW]);
}

export function isProxy(value: any): boolean {
  return value ? !!value[ReactiveFlags.RAW] : false;
}

export function isRef(r: any): boolean {
  return r ? r[ReactiveFlags.IS_REF] === true : false;
}
