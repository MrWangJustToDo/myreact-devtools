(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2374],{30803:function(e,l,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/devTool",function(){return t(70706)}])},70706:function(e,l,t){"use strict";t.r(l),t.d(l,{default:function(){return eG}});var n,s,r=t(42208),i=t(52802),a=t.n(i),o=t(45386),c=t(79530),d=t(31038),x=t(63980),u=t(2550),m=t(57960);let h=e=>{let{left:l,right:t}=e;return(0,r.jsx)(x.w,{className:"w-full",radius:"sm",children:(0,r.jsx)(u.G,{className:"w-full p-0",children:(0,r.jsxs)(m.oL,{children:[l,t]})})})};var v=t(33135),j=t(17419),p=t(13657),f=t(58039),g=t(20908),w=t(6882),N=t(78868),y=t(79362);(n=s||(s={})).sm="sm",n.md="md",n.lg="lg";let S=(0,y.eK)(()=>({state:"sm"}),{withActions:e=>({setUISize:l=>e.state=l}),withDeepSelector:!1}),{close:b,setStore:k,setSource:A}=N.a.getActions(),C=(0,c.memo)(()=>{let{state:e,position:l,type:t}=(0,N.a)(e=>e),n=S.useShallowStableSelector(e=>e.state),s="sm"===n?11:"md"===n?12:13;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"fixed w-screen h-screen top-0 left-0",onContextMenu:e=>{e.preventDefault(),b()},style:{display:e?"block":"none"},onClick:b}),(0,r.jsx)("div",{className:"fixed z-10 ".concat("sm"===n?"text-[11px]":"md"===n?"text-[12px]":"text-[13px]"),style:{top:l.y+4,left:l.x+4},children:(0,r.jsx)(g.M,{initial:!1,mode:"wait",children:e&&(0,r.jsxs)(w.E.div,{className:"context-menu bg-content1 border rounded shadow-md py-1",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:[(0,r.jsxs)("div",{className:"context-menu-item px-2 py-1 cursor-pointer select-none flex justify-center items-center node-item-hover",onClick:async()=>{k(),await new Promise(e=>setTimeout(e,100)),b()},children:[(0,r.jsx)(f.FMB,{className:"mr-2",width:s,height:s}),(0,r.jsx)("span",{className:"flex-grow",children:"Store as global variable"})]}),("Function"===t||"Element"===t)&&(0,r.jsxs)("div",{className:"context-menu-item px-2 py-1 cursor-pointer select-none flex justify-center items-center node-item-hover",onClick:async()=>{A(),await new Promise(e=>setTimeout(e,100)),b()},children:[(0,r.jsx)(f.hsE,{className:"mr-2",width:s,height:s}),"Function"===t&&(0,r.jsx)("span",{className:"flex-grow",children:"Inspect Function source"}),"Element"===t&&(0,r.jsx)("span",{className:"flex-grow",children:"Inspect Element node"})]})]},"context-menu")})})]})});C.displayName="ContextMenu";var z=t(61865),F=t(91837);let R=e=>{let l=(0,c.useRef)(e);return l.current=e,(0,c.useCallback)(function(){for(var e,t,n=arguments.length,s=Array(n),r=0;r<n;r++)s[r]=arguments[r];return s.length?null===(e=l.current)||void 0===e?void 0:e.call(l,...s):null===(t=l.current)||void 0===t?void 0:t.call(l)},[])};var O=t(56761),E=t(95717),M=t(93694),q=t(98110);let I=(e,l)=>{let t=(0,c.useRef)(e);return(0,c.useEffect)(()=>{l(e)&&(t.current=e)},[l,e]),t.current},U=e=>{let l=null==e?void 0:e.v,t=null==e?void 0:e.t;if("Element"===t||"Date"===t||"Boolean"===t||"Error"===t||"Number"===t||"Symbol"===t)return l;if((null==e?void 0:e.l)===!1)return"Array"===e.t||"Set"===e.t?"[…]":"Map"===e.t||"Object"===e.t?"{…}":"…";if(null!==l&&"object"==typeof l&&!Array.isArray(l)&&"function"==typeof l[window.Symbol.iterator])return"(…)";if(Array.isArray(l))return l.length>0?"[…]":"[]";if("Null"===t)return"null";if("Undefined"===t)return"undef";if("object"==typeof l)return Object.keys(l).length>0?"{…}":"{}";if("Function"===t)return"".concat(l.substr(0,10)+(l.length>10?"…":""));if("string"!=typeof l)return l;else return"String"===t?'"'.concat(l.substr(0,10)+(l.length>10?"…":""),'"'):"".concat(l.substr(0,10)+(l.length>10?"…":""))};function P(e,l){var t,n,s,r,i,a;if("Object"===e){let e=Object.keys(l),r=null==e?void 0:null===(s=e.slice(0,3))||void 0===s?void 0:null===(n=s.map(e=>"".concat(e,": ").concat(U(l[e]))))||void 0===n?void 0:null===(t=n.concat(e.length>3?["…"]:[]))||void 0===t?void 0:t.join(", ");return"{ ".concat(r," }")}if("Array"!==e)return e;{let e=null==l?void 0:null===(a=l.slice(0,4))||void 0===a?void 0:null===(i=a.map(e=>U(e)))||void 0===i?void 0:null===(r=i.concat(l.length>4?["…"]:[]))||void 0===r?void 0:r.join(", ");return"[".concat(e,"]")}}let{open:T,setId:_,setType:K}=N.a.getActions(),L=e=>{var l,t,n;let{name:s,item:i,prefix:a}=e,[o,d]=(0,c.useState)(!1),x=(0,c.useRef)(!1),u=q.F.useShallowSelector(e=>{var l,t;return null===(t=e.data)||void 0===t?void 0:null===(l=t[(null==i?void 0:i.i)||""])||void 0===l?void 0:l.loaded}),m=null!==(l=null==i?void 0:i.v)&&void 0!==l?l:null==u?void 0:u.v,h=I(m,e=>!!e),j=null!=m?m:h,p=null!==(t=null==u?void 0:u.n)&&void 0!==t?t:null==i?void 0:i.n,g=null!==(n=null==u?void 0:u.t)&&void 0!==n?n:null==i?void 0:i.t,w=(0,c.useMemo)(()=>{if(p)return p;if("Array"===g||"Set"===g||"Map"===g){let e=P("Array",null!=j?j:[]);return"Set"===g||"Map"===g?"".concat(g,"(").concat(e,")"):e}if("Iterable"===g||"Object"===g)return P("Object",null!=j?j:{})},[g,p,j]);(0,c.useEffect)(()=>{o&&(null==i?void 0:i.l)===!1&&i.i&&(!u||u.i!==i.i)&&q.F.getActions().setLoading(i.i),o&&(x.current=!0)},[u,o,null==i?void 0:i.i,null==i?void 0:i.l]),(0,c.useEffect)(()=>{o&&m&&(Array.isArray(m)?m.forEach(e=>{var l,t;!e.e||!e.i||e.l||(null===(t=q.F.getReadonlyState().data)||void 0===t?void 0:null===(l=t[e.i])||void 0===l?void 0:l.loaded)||q.F.getActions().setLoading(e.i)}):Object.values(m).forEach(e=>{var l,t;!e.e||!e.i||e.l||(null===(t=q.F.getReadonlyState().data)||void 0===t?void 0:null===(l=t[e.i])||void 0===l?void 0:l.loaded)||q.F.getActions().setLoading(e.i)}))},[m,o]);let N=e=>{j&&i&&(e.preventDefault(),T({x:e.clientX,y:e.clientY}),_(i.i),K(i.t))};if(!i)return null;let y=i.e,S=o?(0,r.jsx)(f.AS7,{width:"16",height:"16"}):(0,r.jsx)(f.VZf,{width:"16",height:"16"});if(y)return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"hook-value-view",children:[(0,r.jsxs)("div",{className:"flex w-full my-0.5 items-center",children:[(0,r.jsx)("span",{className:"text-gray-400 hover:text-gray-700",onClick:()=>d(!o),children:S}),a,(0,r.jsxs)("div",{className:"max-w-full line-clamp-1 break-all",children:[(0,r.jsx)("span",{className:"cursor-pointer select-none",onClick:()=>d(!o),onContextMenu:N,children:s}),": ",(0,r.jsx)("span",{className:"hook-value-placeholder",children:j?w:(0,r.jsx)(f.nWS,{className:"inline-block"})})]})]}),(x.current||o)&&(0,r.jsx)("div",{className:"".concat(o?"block":"hidden"," ml-6 my-0.5"),children:j?Array.isArray(j)?(0,r.jsx)(r.Fragment,{children:j.map((e,l)=>(0,r.jsx)(L,{name:l.toString(),item:e},l))}):(0,r.jsx)(r.Fragment,{children:Object.keys(j).sort().reverse().map(e=>(0,r.jsx)(L,{name:e,item:j[e]},e))}):(0,r.jsx)(v.c,{size:"sm"})})]})});{let e="String"===i.t?'"'.concat(String(i.v),'"'):String(i.v),l="ReadError"===i.t,t=(0,r.jsx)("span",{className:"hook-".concat(i.t," ").concat(l?"text-red-300":""),children:e});return(0,r.jsx)("div",{className:"hook-value-view",children:(0,r.jsxs)("div",{className:"flex w-full my-0.5 items-center",children:[(0,r.jsx)("span",{className:"text-transparent",children:S}),a,(0,r.jsxs)("div",{className:"w-full relative line-clamp-1 break-all pr-2",children:[(0,r.jsx)("span",{className:"cursor-pointer select-none",onContextMenu:N,children:s}),": ",(0,r.jsx)("span",{className:"hook-value-placeholder",children:t})]})]})})}},V=e=>{let{select:l}=e,t=(0,O.W)(e=>e.triggerStatus),n=S.useShallowStableSelector(e=>e.state),s=M.P.useShallowSelector(e=>{var t;return null===(t=e.state)||void 0===t?void 0:t[l]}),i="sm"===n?"text-[11px]":"md"===n?"text-[12px]":"text-[13px]",a=R((e,l)=>(0,r.jsx)("div",{className:"".concat(i,"  tree-wrapper"),children:(0,r.jsx)(L,{name:e.toString(),item:l})},e)),o=s-9>=0?s-9:0;return(null==t?void 0:t.length)>0?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{className:"flex items-center justify-between",children:(0,r.jsx)("span",{children:"trigger"})}),(0,r.jsx)(z.q,{y:1}),(0,r.jsx)("div",{className:"w-full",children:null==t?void 0:t.map((e,l)=>a(o+l,e))}),(0,r.jsx)(F.j,{})]}):null},W=e=>{let{select:l}=e,t=(0,O.W)(e=>e.warnStatus),n=S.useShallowStableSelector(e=>e.state),s=E.R.useShallowSelector(e=>e.warn[l]),i="sm"===n?"text-[11px]":"md"===n?"text-[12px]":"text-[13px]",a=R((e,l)=>(0,r.jsx)("div",{className:"".concat(i,"  tree-wrapper"),children:(0,r.jsx)(L,{name:e.toString(),item:l})},e)),o=s-9>=0?s-9:0;return(null==t?void 0:t.length)>0?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{className:"flex items-center justify-between",children:(0,r.jsx)("span",{children:"warn"})}),(0,r.jsx)(z.q,{y:1}),(0,r.jsx)("div",{className:"w-full",children:null==t?void 0:t.map((e,l)=>a(o+l,e))}),(0,r.jsx)(F.j,{})]}):null},B=e=>{let{select:l}=e,t=(0,O.W)(e=>e.errorStatus),n=S.useShallowStableSelector(e=>e.state),s=E.R.useShallowSelector(e=>e.error[l]),i="sm"===n?"text-[11px]":"md"===n?"text-[12px]":"text-[13px]",a=R((e,l)=>(0,r.jsx)("div",{className:"".concat(i,"  tree-wrapper"),children:(0,r.jsx)(L,{name:e.toString(),item:l})},e)),o=s-9>=0?s-9:0;return(null==t?void 0:t.length)>0?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{className:"flex items-center justify-between",children:(0,r.jsx)("span",{children:"error"})}),(0,r.jsx)(z.q,{y:1}),(0,r.jsx)("div",{className:"w-full",children:null==t?void 0:t.map((e,l)=>a(o+l,e))}),(0,r.jsx)(F.j,{})]}):null},D=()=>{let e=(0,p.U)(e=>e.select);return(0,O.W)(e=>e.enable)&&e?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(V,{select:e}),(0,r.jsx)(W,{select:e}),(0,r.jsx)(B,{select:e})]}):null};var Z=t(2341);let H=e=>{var l;let{item:t}=e,[n,s]=(0,c.useState)(!1),i=t.h,a=n?(0,r.jsx)(f.AS7,{width:"16",height:"16"}):(0,r.jsx)(f.VZf,{width:"16",height:"16"});return i?(0,r.jsx)(L,{name:t.n,item:t.v,prefix:(0,r.jsx)(Z.z,{classNames:{content:"p-0"},size:"sm",className:"rounded-sm text-center mr-1 flex-shrink-0 font-[300] !px-1 text-gray-800 dark:text-gray-200 !h-[1.4em] !max-w-[initial] !min-w-[initial]",children:t.i})}):(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"hook-stack-view",children:[(0,r.jsxs)("div",{className:"flex w-full my-0.5",children:[(0,r.jsx)("span",{className:"text-gray-400 hover:text-gray-700",onClick:()=>s(!n),children:a}),(0,r.jsx)("div",{className:"max-w-full line-clamp-1 cursor-pointer",onClick:()=>s(!n),children:t.n}),":"]}),(0,r.jsx)("div",{className:"".concat(n?"block":"hidden"," ml-4 my-0.5"),children:null===(l=t.c)||void 0===l?void 0:l.map((e,l)=>(0,r.jsx)(H,{item:e},e.n+"-"+l))})]})})},X=()=>{let e=(0,p.U)(e=>e.select),l=(0,j.K)(e=>e.nodes),t=S.useShallowStableSelector(e=>e.state),n=l.find(l=>l.i===e),s=null==n?void 0:n.i,i=(null==n?void 0:n._h)||[];return i.length>0?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{className:"flex items-center justify-between",children:(0,r.jsx)("span",{children:"hooks"})}),(0,r.jsx)(z.q,{y:1}),(0,r.jsx)("div",{className:"w-full ".concat("sm"===t?"text-[11px]":"md"===t?"text-[12px]":"text-[13px]"," tree-wrapper"),children:i.map((e,l)=>(0,r.jsx)(H,{item:e},s+"-"+l))}),(0,r.jsx)(F.j,{})]}):null};var Y=t(51602),G=t(74538),J=t(93195),$=t(10715),Q=t(13500),ee=t(3164);let{setSelect:el,setClose:et,setHover:en}=p.U.getActions(),es=(0,c.memo)(e=>{let{node:l}=e,t=(0,$.getFiberTag)(l);return(null==t?void 0:t.length)?(0,r.jsx)("div",{className:" gap-x-[2px] flex items-center",children:t.map(e=>(0,r.jsx)(Z.z,{size:"sm",color:e.includes("compiler")?"primary":void 0,radius:"none",className:"rounded-md capitalize text-[8px] h-[14px]",children:e},e))}):null});es.displayName="RenderTag";let er=(0,c.memo)(e=>{let{node:l}=e,t=(0,ee.i)((0,c.useCallback)(e=>{var t;return null===(t=e.map)||void 0===t?void 0:t[l.k]},[l.k]));return(0,r.jsxs)("div",{"data-key":!0,className:"flex items-center gap-x-[1px] text-[12px]",children:[(0,r.jsx)("div",{className:" text-[#40af2c]",children:"key"}),(0,r.jsx)("div",{className:" text-gray-400",children:"="}),(0,r.jsxs)("div",{className:"flex",children:['"',(0,r.jsx)(G.e,{content:t,delay:800,showArrow:!0,color:"foreground",children:(0,r.jsx)("div",{className:"text-gray-600 max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap",children:t})}),'"']})]})});er.displayName="RenderKey";let ei=e=>{let{node:l,className:t,withKey:n=!0,withTag:s=!0,withHMR:i=!0,withSelect:a=!0,withTrigger:o=!0,withCollapse:d=!0}=e,x=(0,M.P)((0,c.useCallback)(e=>{var t;return null===(t=e.state)||void 0===t?void 0:t[l.i]},[l.i])),u=(0,Q.m)((0,c.useCallback)(e=>{var t;return null===(t=e.state)||void 0===t?void 0:t[l.i]},[l.i])),m=(0,E.R)((0,c.useCallback)(e=>{var t;return null===(t=e.state)||void 0===t?void 0:t[l.i]},[l.i])),{error:h,warn:v}=E.R.useShallowSelector(e=>{var t,n;return{error:null===(t=e.error)||void 0===t?void 0:t[l.i],warn:null===(n=e.warn)||void 0===n?void 0:n[l.i]}},(e,l)=>e.error===l.error&&e.warn===l.warn),j=(0,ee.i)((0,c.useCallback)(e=>e.map[l.n],[l.n])),{select:g,closeList:w,selectList:N}=p.U.useShallowStableSelector(e=>({select:e.select,closeList:e.closeList,selectList:e.selectList})),y=a&&l.i===g,S=d&&(null==w?void 0:w[l.i]),b=(0,c.useMemo)(()=>a&&g&&!y&&(null==N?void 0:N[l.i]),[a,g,y,N,l.i]),k=Array.isArray(null==l?void 0:l.c),A=k?S?(0,r.jsx)(f.VZf,{width:16,height:16}):(0,r.jsx)(f.AS7,{width:16,height:16}):null,C=l._d||0;return(0,r.jsx)("div",{id:"node-"+l.i.toString(),"data-depth":C,onClick:()=>{a&&el(l.i)},onMouseEnter:()=>{a&&en(l.i)},onMouseLeave:()=>{a&&en("")},className:"w-full h-full node-item cursor-pointer transition-transform-background rounded-sm select-none "+(t||"")+"".concat(a?b?" node-item-select-hover":" node-item-hover":"")+"".concat(b?" node-item-select":"")+"".concat(y?" node-item-selected":""),children:(0,r.jsxs)("div",{className:"flex items-center h-full w-full px-[2px] relative",children:[y&&(0,r.jsx)("div",{className:"absolute top-0 left-[1px] h-full border-l-2 border-blue-400 rounded-sm pointer-events-none"}),(0,r.jsx)("div",{className:"flex-grow",style:{width:"calc(100%-calc(".concat(C,"*var(--indentation-size)))"),marginLeft:"calc(".concat(C," * var(--indentation-size)")},children:(0,r.jsxs)("div",{"data-content":!0,className:"flex items-center w-fit",children:[d&&(0,r.jsx)("span",{className:" text-gray-400 min-w-[18px]"+(k?" hover:text-gray-700":""),onClick:e=>{e.stopPropagation(),et(l.i)},children:k&&(0,r.jsx)(G.e,{content:S?"Toggle to open":"Toggle to close",delay:800,showArrow:!0,color:"foreground",children:A})}),(0,r.jsx)("p",{className:"node-name line-clamp-1",children:j}),s&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(z.q,{x:1}),(0,r.jsx)(es,{node:l})]}),o&&x>0&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(z.q,{x:1}),(0,r.jsx)(G.e,{content:"trigger update",showArrow:!0,color:"primary",children:(0,r.jsx)(Z.z,{size:"sm",radius:"none",color:"primary",className:"rounded-md capitalize text-[8px] h-[14px]",children:x})})]}),i&&u>0&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(z.q,{x:1}),(0,r.jsx)(G.e,{content:"hmr update",showArrow:!0,color:"success",children:(0,r.jsx)(Z.z,{size:"sm",radius:"none",color:"success",className:"rounded-md capitalize text-[8px] h-[14px]",children:u})})]}),m&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(z.q,{x:1}),(0,r.jsx)(Z.z,{size:"sm",radius:"none",color:"warning",className:"rounded-md capitalize text-[8px] h-[14px]",children:m})]}),v&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(z.q,{x:1}),(0,r.jsx)(Z.z,{size:"sm",radius:"none",color:"warning",className:"rounded-md capitalize text-[8px] h-[14px]",children:v})]}),h&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(z.q,{x:1}),(0,r.jsx)(Z.z,{size:"sm",radius:"none",color:"danger",className:"rounded-md capitalize text-[8px] h-[14px]",children:h})]}),n&&l.k&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(z.q,{x:1}),(0,r.jsx)(er,{node:l})]})]})})]})})},{forceReload:ea,storeFiber:eo,triggerFiber:ec,scrollIntoView:ed,inspectDom:ex}=p.U.getActions(),eu=()=>{let e=(0,p.U)(e=>e.select),l=(0,j.K)(e=>e.nodes),t=S.useShallowStableSelector(e=>e.state),n=l.find(l=>l.i===e),s="sm"===t?11:"md"===t?12:13;return n?(0,r.jsxs)("div",{className:"p-2 ".concat("sm"===t?"text-[15px]":"md"===t?"text-[16px]":"text-[17px]"," sticky top-0 bg-content1 transition-transform-background z-50"),children:[(0,r.jsx)(ei,{node:n,withCollapse:!1,withSelect:!1,withKey:!1}),(0,r.jsxs)(Y.g,{className:"absolute right-4 top-0",children:[(0,r.jsx)(G.e,{content:"force scroll to select",showArrow:!0,color:"foreground",placement:"bottom-end",children:(0,r.jsx)(J.A,{isIconOnly:!0,size:"sm",variant:"flat",onPress:ed,children:(0,r.jsx)(f.TCQ,{width:s,height:s})})}),(0,r.jsx)(G.e,{content:"store fiber node",showArrow:!0,color:"foreground",placement:"bottom-end",children:(0,r.jsx)(J.A,{isIconOnly:!0,size:"sm",variant:"flat",onPress:eo,children:(0,r.jsx)(f.FMB,{width:s,height:s})})}),(0,r.jsx)(G.e,{content:"force trigger",showArrow:!0,color:"foreground",placement:"bottom-end",children:(0,r.jsx)(J.A,{isIconOnly:!0,size:"sm",variant:"flat",onPress:ec,children:(0,r.jsx)(f.o1U,{width:s,height:s})})}),(0,r.jsx)(G.e,{content:"inspect dom",showArrow:!0,color:"foreground",placement:"bottom-end",children:(0,r.jsx)(J.A,{isIconOnly:!0,size:"sm",variant:"flat",onPress:ex,children:(0,r.jsx)(f.hsE,{width:s,height:s})})}),(0,r.jsx)(G.e,{content:"force reload",showArrow:!0,color:"foreground",placement:"bottom-end",children:(0,r.jsx)(J.A,{isIconOnly:!0,size:"sm",variant:"flat",onPress:ea,children:(0,r.jsx)(f.BGW,{width:s-1,height:s-1})})})]}),(0,r.jsx)(F.j,{})]}):null},em=()=>{var e;let l=(0,p.U)(e=>e.select),t=(0,j.K)(e=>e.nodes),n=S.useShallowStableSelector(e=>e.state),s=t.find(e=>e.i===l),i=Object.keys((null==s?void 0:null===(e=s.p)||void 0===e?void 0:e.v)||{}),a=null==s?void 0:s.i,o=i.length>0,c="sm"===n?"text-[11px]":"md"===n?"text-[12px]":"text-[13px]",d=R(e=>{var l,t;let n=i[e];return(0,r.jsx)("div",{className:"".concat(c,"  tree-wrapper"),children:(0,r.jsx)(L,{name:n,item:null==s?void 0:null===(t=s.p)||void 0===t?void 0:null===(l=t.v)||void 0===l?void 0:l[n]})},a+"-"+e)});return o?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{className:"flex items-center justify-between",children:(0,r.jsx)("span",{children:"props"})}),(0,r.jsx)(z.q,{y:1}),(0,r.jsx)("div",{className:"w-full",children:i.map((e,l)=>d(l))}),(0,r.jsx)(F.j,{})]}):null};var eh=t(99900),ev=t(98931),ej=t(50607);let ep=()=>{let e=(0,p.U)(e=>e.select),l=(0,j.K)(e=>e.nodes),t=S.useShallowStableSelector(e=>e.state),n="sm"===t?"text-[11px]":"md"===t?"text-[12px]":"text-[13px]",s=l.find(l=>l.i===e),i=null==s?void 0:s._t,a=null==s?void 0:s._t,o=(0,ev.k)(e=>e.filter),d=(0,c.useMemo)(()=>Array.from(o).map(e=>+e),[o]),x=(0,eh.p)(e=>e.list),u=null==a?void 0:a[(null==a?void 0:a.length)-1];(null==u?void 0:u.startsWith("@my-react"))?a=null==a?void 0:a.slice(0,-1):u=void 0;let m=null==a?void 0:a[(null==a?void 0:a.length)-1];(null==m?void 0:m.startsWith("@my-react"))?a=null==a?void 0:a.slice(0,-1):m=void 0;let h=(0,c.useMemo)(()=>null==a?void 0:a.map(e=>x.find(l=>l.i===e)),[x,a]),v=(0,c.useMemo)(()=>null==h?void 0:h.filter(e=>!(0,ej.VR)(e,d)),[d,h]),f=R(e=>{let l=null==v?void 0:v[e];return l?(0,r.jsx)("div",{className:"".concat(n," ml-2 "),children:(0,r.jsx)(ei,{node:l,withCollapse:!1})},l.i):null});return(null==i?void 0:i.length)?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{children:"renders"}),(0,r.jsx)(z.q,{y:1}),(0,r.jsxs)("div",{className:"w-full",children:[v.map((e,l)=>f(l)),m&&(0,r.jsx)("div",{className:"".concat(n," ml-2  px-[2px]"),children:m}),(0,r.jsx)("div",{className:"".concat(n," ml-2  px-[2px]"),children:u||"@my-react"})]}),(0,r.jsx)(F.j,{})]}):null},ef=()=>{let e=(0,p.U)(e=>e.select),l=(0,j.K)(e=>e.nodes),t=S.useShallowStableSelector(e=>e.state),n=l.find(l=>l.i===e),s=null==n?void 0:n._s;return(null==s?void 0:s.fileName)?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{children:"source"}),(0,r.jsx)(z.q,{y:1}),(0,r.jsx)("div",{className:"w-full",children:(0,r.jsx)("div",{className:"".concat("sm"===t?"text-[11px]":"md"===t?"text-[12px]":"text-[13px]"," ml-2  px-[2px] text-gray-600"),children:(null==s?void 0:s.fileName)+"".concat((null==s?void 0:s.lineNumber)?":"+(null==s?void 0:s.lineNumber):"")+"".concat((null==s?void 0:s.columnNumber)?":"+(null==s?void 0:s.columnNumber):"")})})]}):null},eg=()=>{var e,l,t;let n=(0,p.U)(e=>e.select),s=(0,j.K)(e=>e.nodes),i=S.useShallowStableSelector(e=>e.state),a=s.find(e=>e.i===n),o=Object.keys((null==a?void 0:null===(e=a.s)||void 0===e?void 0:e.t)!=="Null"&&(null==a?void 0:null===(l=a.s)||void 0===l?void 0:l.t)!=="Undefined"&&(null==a?void 0:null===(t=a.s)||void 0===t?void 0:t.v)||{}),c=null==a?void 0:a.i,d=o.length>0,x="sm"===i?"text-[11px]":"md"===i?"text-[12px]":"text-[13px]",u=R(e=>{var l,t;let n=o[e];return(0,r.jsx)("div",{className:"".concat(x,"  tree-wrapper"),children:(0,r.jsx)(L,{name:n,item:null==a?void 0:null===(t=a.s)||void 0===t?void 0:null===(l=t.v)||void 0===l?void 0:l[n]})},c+"-"+e)});return d?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{className:"flex items-center justify-between",children:(0,r.jsx)("span",{children:"states"})}),(0,r.jsx)(z.q,{y:1}),(0,r.jsx)("div",{className:"w-full",children:o.map((e,l)=>u(l))}),(0,r.jsx)(F.j,{})]}):null},ew=()=>{let{loading:e}=j.K.useShallowStableSelector(e=>({nodeList:e.nodes,loading:e.loading})),l=p.U.useShallowStableSelector(e=>e.select);return e?(0,r.jsx)("div",{className:"node-view h-full p-1 flex items-center justify-center",children:(0,r.jsx)(v.c,{color:"primary"})}):(0,r.jsx)("div",{className:"node-view h-full p-1",children:(0,r.jsxs)("div",{className:"group h-full overflow-auto",children:[(0,r.jsx)(eu,{},l),(0,r.jsx)(em,{},l),(0,r.jsx)(eg,{},l),(0,r.jsx)(X,{},l),(0,r.jsx)(D,{},l),(0,r.jsx)(ep,{},l),(0,r.jsx)(ef,{},l),(0,r.jsx)(C,{},l)]})})};var eN=t(17931),ey=t(78290);let eS=function(e){let l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200,[t,n]=(0,c.useState)(e);return[t,(0,c.useMemo)(()=>(0,$.debounce)(n,l),[l])]},eb=[],ek={width:0,height:0,left:0,right:0,top:0,bottom:0,x:0,y:0};var eA=t(8071),eC=t(77425),ez=t(3333),eF=t(98413),eR=t(39589),eO=t(34648),eE=t(35485),eM=t(71640),eq=t(62810),eI=t(33068),eU=t(15896),eP=t(84281),eT=t(38835),e_=t(19840),eK=t(97606);let{setSelect:eL}=p.U.getActions(),{toggleHoverOnBrowser:eV}=eT.Z.getActions(),eW=(0,c.memo)(e=>{var l;let{handle:t}=e,[n,s]=(0,c.useState)(""),i=(0,eh.p)(e=>e.list),[a,o]=(0,c.useState)(0),[x,u]=(0,c.useState)([]),[m,h]=(0,c.useState)([]),v=(0,ee.i)(e=>e.map),j=eT.Z.useShallowStableSelector(e=>e.state.enableHoverOnBrowser),p=x[a],g=null===(l=m[p])||void 0===l?void 0:l.i;return(0,c.useEffect)(()=>{o(0),u([])},[n]),(0,c.useEffect)(()=>{void 0!==p&&(null==t||t.scrollToIndex({index:p}),eL(g,!0))},[p,t,g]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(G.e,{content:"hover on the browser",showArrow:!0,color:"foreground",children:(0,r.jsx)(J.A,{isIconOnly:!0,variant:"flat",onPress:eV,children:(0,r.jsx)(f.Ymj,{height:"14",className:j?"text-green-400":"text-gray-400"})})}),(0,r.jsx)(z.q,{x:2}),(0,r.jsx)("form",{onSubmit:e=>{var l;if(null==e||null===(l=e.preventDefault)||void 0===l||l.call(e),n){o(0);let e=i.map(e=>({...e,_name:v[e.n]})),l=e.map((e,l)=>e._name.includes(n)?l:-1).filter(e=>-1!==e);h(e),u(l),0===l.length?d.Am.error("Can't find current name",{position:"top-right"}):d.Am.success("Find ".concat(l.length," items"),{position:"top-right"})}},children:(0,r.jsx)(eK.Y,{placeholder:"Search component",className:"w-full",value:n,variant:"flat",onChange:e=>s(e.target.value),endContent:(0,r.jsx)("button",{className:"focus:outline-none",type:"submit",children:(0,r.jsx)(f._Ve,{className:"text-black/50 dark:text-white/90 text-slate-400 flex-shrink-0"})})})}),x.length>1&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(z.q,{x:2}),(0,r.jsxs)(Y.g,{variant:"flat",children:[(0,r.jsx)(G.e,{content:"Total ".concat(x.length,", current ").concat(a+1),showArrow:!0,color:"foreground",children:(0,r.jsx)(J.A,{isIconOnly:!0,onPress:()=>o(e=>(e-1+x.length)%x.length),isDisabled:0===a,children:(0,r.jsx)(f.Hf3,{})})}),(0,r.jsx)(G.e,{content:"Total ".concat(x.length,", current ").concat(a+1),showArrow:!0,color:"foreground",children:(0,r.jsx)(J.A,{isIconOnly:!0,onPress:()=>o(e=>(e+1)%x.length),isDisabled:a===x.length-1,children:(0,r.jsx)(f.veu,{})})})]})]})]})});eW.displayName="TreeViewSearch";let eB=ev.k.getActions().onChange,eD=O.W.getActions().toggleEnable,eZ=(0,c.memo)(e=>{let{handle:l}=e,{isOpen:t,onOpen:n,onClose:i,onOpenChange:a}=(0,eA.q)(),{theme:c,setTheme:d}=(0,o.F)(),{state:x,setEnableHover:u,setEnableUpdate:m,toggleEnableRetrigger:h}=(0,eT.Z)(),{state:v,setUISize:j}=S(),p=(0,O.W)(e=>e.enable),{state:g,cb:w}=(0,e_.$)(e=>({state:e.state,cb:e.cb})),N=(0,ev.k)(e=>e.filter);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"fixed top-3 right-3 z-10 flex",children:[(0,r.jsx)(eW,{handle:l}),(0,r.jsx)(z.q,{x:2}),(0,r.jsxs)(Y.g,{variant:"flat",children:[(0,r.jsx)(G.e,{content:(0,r.jsx)("p",{className:g?"text-green-400":"text-red-400",children:g?"DevTool Connect":"DevTool DisConnect"}),showArrow:!0,children:(0,r.jsx)(J.A,{isIconOnly:!0,onPress:()=>null==w?void 0:w(),disabled:g,children:g?(0,r.jsx)(f.NhS,{className:"text-green-500"}):(0,r.jsx)(f.xrR,{className:" text-red-500"})})}),(0,r.jsx)(J.A,{isIconOnly:!0,onPress:()=>d("dark"===c?"light":"dark"),children:"dark"===c?(0,r.jsx)(f.kLh,{className:"text-gray-500"}):(0,r.jsx)(f.NWY,{className:"text-orange-500"})}),(0,r.jsx)(G.e,{content:"Setting",showArrow:!0,color:"foreground",children:(0,r.jsx)(J.A,{isIconOnly:!0,onPress:n,children:(0,r.jsx)(f.UG6,{className:t?"text-green-500":"text-gray-500"})})})]})]}),(0,r.jsx)(eC.R,{isOpen:t,size:"2xl",onClose:i,onOpenChange:a,placement:"top",children:(0,r.jsxs)(ez.A,{children:[(0,r.jsx)(eF.k,{children:(0,r.jsxs)("h3",{className:"text-[1em]",children:["Setting - ",(0,r.jsx)(eR.z,{children:"@my-react/devtool"})]})}),(0,r.jsxs)(eO.I,{className:"text-[14px]",children:[(0,r.jsxs)("div",{className:"flex flex-col gap-y-4",children:[(0,r.jsxs)("div",{className:"flex flex-col gap-y-2",children:[(0,r.jsx)("p",{className:"whitespace-nowrap text-[14px] text-foreground-500",children:"Filter Node: "}),(0,r.jsx)("div",{className:"flex items-center",children:(0,r.jsx)(eE.g,{selectionMode:"multiple",placeholder:"Select a Type",selectedKeys:N,"aria-label":"Filter Node",className:"flex items-center",onChange:e=>{eB(new Set(e.target.value.split(",")))},children:$.typeKeys.map(e=>(0,r.jsx)(eM.R,{value:e,children:(0,$.getTypeName)(e)},e))})})]}),(0,r.jsx)(F.j,{}),(0,r.jsxs)("div",{className:"flex flex-col gap-y-2",children:[(0,r.jsx)("p",{className:"whitespace-nowrap text-[14px] text-foreground-500",children:"UI Size: "}),(0,r.jsxs)(eq.X,{value:v,onValueChange:e=>j(e),orientation:"horizontal",classNames:{wrapper:"gap-x-6"},children:[(0,r.jsx)(eI.J,{value:s.sm,children:"Small Size"}),(0,r.jsx)(eI.J,{value:s.md,children:"Medium Size"}),(0,r.jsx)(eI.J,{value:s.lg,children:"Large Size"})]})]}),(0,r.jsx)(F.j,{}),(0,r.jsxs)("div",{className:"flex flex-col gap-y-2",children:[(0,r.jsx)("p",{className:"whitespace-nowrap text-[14px] text-foreground-500",children:"Config: "}),(0,r.jsx)(eU.K,{isSelected:x.enableUpdate,radius:"full",onValueChange:m,color:"primary",children:(0,r.jsxs)("div",{className:"flex items-center",children:["Highlight Update",(0,r.jsxs)("div",{className:"ml-4 gap-x-2 flex",children:[(0,r.jsx)(Z.z,{style:{backgroundColor:$.color.update,mixBlendMode:"difference"},children:"update"}),(0,r.jsx)(Z.z,{style:{backgroundColor:$.color.append,mixBlendMode:"difference"},children:"append"}),(0,r.jsx)(Z.z,{style:{backgroundColor:$.color.setRef,mixBlendMode:"difference"},children:"setRef"}),(0,r.jsx)(Z.z,{style:{backgroundColor:$.color.warn,mixBlendMode:"difference"},children:"warn"})]})]})}),(0,r.jsx)(eU.K,{isSelected:x.enableHover,radius:"full",onValueChange:u,color:"secondary",children:"Hover Overlay"}),(0,r.jsx)(eU.K,{isSelected:x.enableRetrigger,radius:"full",onValueChange:h,color:"warning",children:"Retrigger Status"}),(0,r.jsx)(eU.K,{isSelected:p,radius:"full",onValueChange:eD,color:"default",children:"Extend Node Detail"})]})]}),(0,r.jsx)(z.q,{y:4})]}),(0,r.jsx)(eP.R,{children:(0,r.jsx)(J.A,{onPress:i,children:"Close"})})]})})]})});eZ.displayName="TreeViewSetting";let eH=(0,$.debounce)((e,l,t)=>{let n=Array.from(e.querySelectorAll("[data-depth]")),s=e.clientWidth,r=l.current||12;for(let e of(s>t.current&&(r=12),t.current=s,n)){var i;let l=parseInt(e.getAttribute("data-depth")||"0",10)||0;0!==l&&(r=Math.min(r,Math.max(0,s-((null===(i=e.querySelector("[data-content]"))||void 0===i?void 0:i.clientWidth)||0)-6)/l))}l.current=r,e.style.setProperty("--indentation-size","".concat(r,"px")),e.style.setProperty("--width-size","".concat(s,"px"))},16),eX=(0,c.memo)(e=>{let{onScroll:l,data:t,onMount:n}=e,i=(0,c.useRef)(null),a=(0,c.useRef)(t);a.current=t;let o=S.useShallowStableSelector(e=>e.state);return(0,c.useEffect)(()=>p.U.subscribe(e=>e.scroll,()=>{var e,t;let n=p.U.getReadonlyState().select,s=null===(e=a.current)||void 0===e?void 0:e.findIndex(e=>e.i===n);-1!==s&&(null===(t=i.current)||void 0===t||t.scrollIntoView({index:s,align:"center",done:l}))}),[l]),(0,c.useEffect)(()=>(n(i.current),()=>n()),[n]),(0,r.jsx)(eN.OO,{ref:i,increaseViewportBy:500,onScroll:l,totalCount:t.length,itemContent:(e,l)=>{let n=t[e];return n?(0,r.jsx)(ei,{node:n,className:o===s.sm?"text-[12px]":o===s.md?"text-[14px]":"text-[16px]"}):null}})});eX.displayName="TreeViewImpl";let eY=(0,c.memo)(()=>{let e=(0,c.useRef)(null),l=eh.p.useShallowStableSelector(e=>e.list),{width:t,height:n}=function(e){let{ref:l,cssSelector:t,getEle:n,deps:s}=e,r=(0,c.useRef)(n);r.current=n;let[i,a]=eS(ek,100);return(0,ey.L)(()=>{var e;let n=l?l.current:t?document.querySelector(t):(null===(e=r.current)||void 0===e?void 0:e.call(r))||null;if(n){if(window.ResizeObserver){let e=new ResizeObserver(()=>{a(n.getBoundingClientRect())});return e.observe(n),()=>e.disconnect()}{let e=()=>a(n.getBoundingClientRect());return e(),window.addEventListener("resize",e,{passive:!0}),()=>window.removeEventListener("resize",e)}}},[l,t,a,...s||eb]),i}({ref:e}),[s,i]=(0,c.useState)(),a=(0,c.useRef)(12),o=(0,c.useRef)(t);o.current=t;let d=(0,c.useCallback)(()=>{e.current&&eH(e.current,a,o)},[]);return(0,c.useEffect)(()=>{d()},[d,t,n,l.length]),(0,r.jsx)("div",{className:"tree-view h-full p-1",children:(0,r.jsxs)("div",{className:"group h-full transform-gpu",ref:e,children:[l.length>0&&(0,r.jsx)(eX,{onScroll:d,data:l,onMount:i}),(0,r.jsx)(eZ,{handle:s})]})})});function eG(){let e=(0,e_.$)(e=>e.error),{theme:l}=(0,o.F)();return(0,c.useEffect)(()=>{e&&d.Am.error(e,{position:"top-right"})},[e]),(0,r.jsxs)("main",{className:"flex p-1 h-screen",children:[(0,r.jsx)(a(),{children:(0,r.jsx)("title",{children:"@my-react devtools"})}),(0,r.jsx)(d.x7,{richColors:!0,theme:"dark"===l?"dark":"light"}),(0,r.jsx)(h,{left:(0,r.jsx)(eY,{}),right:(0,r.jsx)(ew,{})})]})}eY.displayName="TreeView"}},function(e){e.O(0,[111,7028,9774,2888,179],function(){return e(e.s=30803)}),_N_E=e.O()}]);