(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2374],{2565:function(e,l,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/devTool",function(){return n(77689)}])},77689:function(e,l,n){"use strict";n.r(l),n.d(l,{default:function(){return lm}});var s=n(95969),t=n(70328),r=n(65859),i=n.n(r),a=n(12768),o=n(3495),c=n(21780),d=n(57960);let u=e=>{let{left:l,right:n}=e;return(0,s.jsx)(o.w,{className:"w-full",radius:"sm",children:(0,s.jsx)(c.G,{className:"w-full p-0",children:(0,s.jsxs)(d.oL,{children:[l,n]})})})};var m=n(6621),x=n(48137),h=n(42177),v=n(82881),j=n(9196),p=n(31606),f=n(43395),g=n(52280),w=n(61711);let{close:N,setStore:y,setSource:b}=w.a.getActions(),S=(0,a.memo)(()=>{let{state:e,position:l,type:n}=(0,w.a)(e=>e);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{"data-context-cover":!0,className:"fixed w-screen h-screen top-0 left-0",onContextMenu:e=>{e.preventDefault(),N()},style:{display:e?"block":"none"},onClick:N}),(0,s.jsx)("div",{"data-context-content":!0,className:"fixed z-10 font-sans",style:{top:l.y+4,left:l.x+4},children:(0,s.jsx)(v.M,{initial:!1,mode:"wait",children:e&&(0,s.jsxs)(j.E.div,{className:"context-menu font-sm bg-content1 border rounded shadow-md py-1",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:[(0,s.jsxs)("div",{className:"context-menu-item px-2 cursor-pointer select-none flex justify-center items-center node-item-hover",onClick:async()=>{y(),await new Promise(e=>setTimeout(e,100)),N()},children:[(0,s.jsx)(p.Z,{className:"mr-2 w-[1em]"}),(0,s.jsx)("span",{className:"flex-grow",children:"Store as global variable"})]}),("Function"===n||"Element"===n)&&(0,s.jsxs)("div",{className:"context-menu-item px-2 cursor-pointer select-none flex justify-center items-center node-item-hover",onClick:async()=>{b(),await new Promise(e=>setTimeout(e,100)),N()},children:["Function"===n&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(f.Z,{className:"mr-2 w-[1em]"}),(0,s.jsx)("span",{className:"flex-grow",children:"Inspect Function source"})]}),"Element"===n&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(g.Z,{className:"mr-2 w-[1em]"}),(0,s.jsx)("span",{className:"flex-grow",children:"Inspect Element node"})]})]})]},"context-menu")})})]})});S.displayName="ContextMenu";var k=n(94049),A=n(84129);let C=e=>{let l=(0,a.useRef)(e);return l.current=e,(0,a.useCallback)(function(){for(var e,n,s=arguments.length,t=Array(s),r=0;r<s;r++)t[r]=arguments[r];return t.length?null===(e=l.current)||void 0===e?void 0:e.call(l,...t):null===(n=l.current)||void 0===n?void 0:n.call(l)},[])};var z=n(66922),F=n(41575),I=n(4256),E=n(17013),O=n(80104),_=n(81163);let R=(e,l)=>{let n=(0,a.useRef)(e);return(0,a.useEffect)(()=>{l(e)&&(n.current=e)},[l,e]),n.current},Z=/["'&<>]/;function q(e){let l,n;let s=""+e,t=Z.exec(s);if(!t)return s;let r="",i=0;for(n=t.index;n<s.length;n++){switch(s.charCodeAt(n)){case 34:l="&quot;";break;case 38:l="&amp;";break;case 39:l="&#39;";break;case 60:l="&lt;";break;case 62:l="&gt;";break;default:continue}i!==n&&(r+=s.slice(i,n)),i=n+1,r+=l}return i!==n?r+s.slice(i,n):r}let P=e=>{let l=null==e?void 0:e.v,n=null==e?void 0:e.t;if("Element"===n)return"<span class='text-teal-600'>".concat(q(l||""),"</span>");if("Date"===n||"Boolean"===n||"Error"===n||"Number"===n||"Symbol"===n)return q(l);if(null==e?void 0:e.n)return q(e.n);if((null==e?void 0:e.l)===!1)return"Array"===e.t||"Set"===e.t?"[…]":"Map"===e.t||"Object"===e.t?"{…}":"…";if(null!==l&&"object"==typeof l&&!Array.isArray(l)&&"function"==typeof l[window.Symbol.iterator])return"(…)";if(Array.isArray(l))return l.length>0?"[…]":"[]";if("Null"===n)return"null";if("Undefined"===n)return"undef";if("object"==typeof l)return q(Object.keys(l).length>0?"{…}":"{}");if("Function"===n)return q("".concat(l.substr(0,10)+(l.length>10?"…":"")));if("string"!=typeof l)return q(l);else return"String"===n?q('"'.concat(l.substr(0,10)+(l.length>10?"…":""),'"')):q("".concat(l.substr(0,10)+(l.length>10?"…":"")))};function T(e,l){var n,s,t,r,i,a;if("Object"===e){let e=Object.keys(l),r=null==e?void 0:null===(t=e.slice(0,3))||void 0===t?void 0:null===(s=t.map(e=>"".concat(e,": ").concat(P(l[e]))))||void 0===s?void 0:null===(n=s.concat(e.length>3?["…"]:[]))||void 0===n?void 0:n.join(", ");return"{ ".concat(r," }")}if("Array"!==e)return e;{let e=null==l?void 0:null===(a=l.slice(0,4))||void 0===a?void 0:null===(i=a.map(e=>P(e)))||void 0===i?void 0:null===(r=i.concat(l.length>4?["…"]:[]))||void 0===r?void 0:r.join(", ");return"[".concat(e,"]")}}var M=n(74865),U=n(43147),V=n(66192),L=n(19433),K=n(75717),D=n(12476),W=n(67885),B=n(65472);let{setUpdateState:H,clear:X}=n(39773).y.getActions(),Y=e=>{let{item:l,rootItem:n,parentItem:t,hookIndex:r,path:i,type:o,chunkId:c,children:d}=e,[u,m]=(0,a.useState)(""),[x,h]=(0,a.useState)(0),v=(0,a.useRef)(null),{isOpen:j,onClose:p,onOpenChange:f}=(0,M.q)();return(0,a.useEffect)(()=>{if(j){var e;m(String(l.v)),h((null===(e=v.current)||void 0===e?void 0:e.offsetWidth)||0)}},[j,l.v]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("span",{className:"cursor-pointer",children:["✨ ",d]}),(0,s.jsxs)(U.j,{placement:"bottom",isOpen:j,backdrop:"opaque",triggerScaleOnOpen:!1,onOpenChange:f,children:[(0,s.jsx)(V.b,{children:(0,s.jsx)("div",{ref:v,className:"absolute w-full h-full left-0 top-0 cursor-pointer"})}),(0,s.jsx)(L.g,{children:(0,s.jsxs)("div",{className:"p-2 min-w-[200px]",style:{minWidth:null!=x?x:200},children:["Boolean"===l.t&&(0,s.jsx)(K.i,{size:"sm",isSelected:"true"===u,onValueChange:()=>m("true"===u?"false":"true")}),"Number"===l.t&&(0,s.jsx)(D.i,{variant:"bordered",disableAnimation:!0,size:"sm",value:+u,onValueChange:e=>m(e.toString())}),"String"===l.t&&(0,s.jsx)(W.Y,{classNames:{input:"resize-y min-h-[40px]"},className:"font-code",variant:"bordered",disableAnimation:!0,disableAutosize:!0,size:"sm",value:u,onValueChange:e=>m(e)}),(0,s.jsx)(A.j,{className:"my-3"}),(0,s.jsxs)("div",{className:"flex justify-end",children:[(0,s.jsx)(B.A,{size:"sm",color:"danger",onPress:p,children:"Cancel"}),(0,s.jsx)(B.A,{size:"sm",className:"ml-2",color:"primary",onPress:()=>{u!==l.v&&(H({id:l.i,rootId:null==n?void 0:n.i,parentId:null==t?void 0:t.i,oldVal:l.v,newVal:u,hookIndex:r,path:i,type:o}),p(),setTimeout(()=>{c&&_.F.getActions().setLoading(c),X()},60))},children:"Confirm"})]})]})})]})]})},{open:J,setId:$,setType:G}=w.a.getActions(),Q=e=>{var l,n,t;let{name:r,item:i,rootItem:o,parentItem:c,prefix:d,editable:u,hookIndex:x,type:h,chunkId:v}=e,[j,p]=(0,a.useState)(!1),f=(0,a.useRef)(!1),g=_.F.useShallowSelector(e=>{var l,n;return null===(n=e.data)||void 0===n?void 0:null===(l=n[(null==i?void 0:i.i)||""])||void 0===l?void 0:l.loaded}),w=null!==(l=null==i?void 0:i.v)&&void 0!==l?l:null==g?void 0:g.v,N=R(w,e=>!!e),y=null!=w?w:N,b=null!==(n=null==g?void 0:g.n)&&void 0!==n?n:null==i?void 0:i.n,S=null!==(t=null==g?void 0:g.t)&&void 0!==t?t:null==i?void 0:i.t,k=(0,a.useMemo)(()=>{if(b)return b;if("Array"===S||"Set"===S||"Map"===S){let e=T("Array",null!=y?y:[]);return"Set"===S||"Map"===S?"".concat(S,"(").concat(e,")"):e}if("Iterable"===S||"Object"===S)return T("Object",null!=y?y:{})},[S,b,y]);(0,a.useEffect)(()=>{j&&(null==i?void 0:i.l)===!1&&i.i&&(!g||g.i!==i.i)&&_.F.getActions().setLoading(i.i),j&&(f.current=!0)},[g,j,null==i?void 0:i.i,null==i?void 0:i.l]),(0,a.useEffect)(()=>{j&&w&&(Array.isArray(w)?w.forEach(e=>{var l,n;!e.e||!e.i||e.l||(null===(n=_.F.getReadonlyState().data)||void 0===n?void 0:null===(l=n[e.i])||void 0===l?void 0:l.loaded)||_.F.getActions().setLoading(e.i)}):Object.values(w).forEach(e=>{var l,n;!e.e||!e.i||e.l||(null===(n=_.F.getReadonlyState().data)||void 0===n?void 0:null===(l=n[e.i])||void 0===l?void 0:l.loaded)||_.F.getActions().setLoading(e.i)}))},[w,j]);let A=e=>{y&&i&&(e.preventDefault(),J({x:e.clientX,y:e.clientY}),$(i.i),G(i.t))};if(!i)return null;let C=!1===i.l,z=(null==g?void 0:g.i)||i.i,F=i.e,I=(0,s.jsx)(E.Z,{fill:"currentColor",className:"origin-center ".concat(j?"rotate-90":""),width:"0.6em",height:"0.6em"});if(F){let e=y?(0,s.jsx)("span",{className:"hook-value-placeholder line-clamp-1 break-all",dangerouslySetInnerHTML:{__html:k||""}}):(0,s.jsx)("span",{className:"hook-value-placeholder line-clamp-1 break-all",children:(0,s.jsx)(O.Z,{className:"inline-block"})});return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{"data-id":z,"data-chunk":C,className:"hook-value-view",children:[(0,s.jsxs)("div",{className:"flex w-full my-0.5 items-center",children:[(0,s.jsx)("span",{className:"text-gray-400 w-[1.5em] h-[1.5em] cursor-pointer inline-flex justify-center items-center hover:text-gray-700",onClick:()=>p(!j),children:I}),d,(0,s.jsxs)("div",{className:"max-w-full flex",children:[(0,s.jsx)("span",{className:"flex-shrink-0 cursor-pointer select-none whitespace-nowrap",onClick:()=>p(!j),onContextMenu:A,children:r}),(0,s.jsx)("span",{className:"flex-shrink-0 pr-1",children:":"}),e]})]}),(f.current||j)&&(0,s.jsx)("div",{className:"".concat(j?"block":"hidden"," ml-6 my-0.5"),children:y?Array.isArray(y)?(0,s.jsx)(s.Fragment,{children:y.map((e,l)=>(0,s.jsx)(Q,{name:l.toString(),item:e,type:h,rootItem:o||i,editable:u&&"string"!=typeof b,chunkId:C?z:v,parentItem:i,hookIndex:x},l))}):(0,s.jsx)(s.Fragment,{children:Object.keys(y).sort().reverse().map(e=>(0,s.jsx)(Q,{name:e,item:y[e],type:h,rootItem:o||i,parentItem:i,editable:u&&"string"!=typeof b,chunkId:C?z:v,hookIndex:x},e))}):(0,s.jsx)(m.c,{size:"sm"})})]})})}{let e="String"===i.t?'"'.concat(String(i.v),'"'):String(i.v),l="ReadError"===i.t,n="Element"===i.t,t=(0,s.jsx)("span",{className:"hook-".concat(i.t," ").concat(l?"text-red-300":""," ").concat(n?"text-teal-600":""),children:e}),a=u&&((null==i?void 0:i.t)==="String"||(null==i?void 0:i.t)==="Number"||(null==i?void 0:i.t)==="Boolean");return(0,s.jsx)("div",{"data-id":z,"data-chunk":C,className:"hook-value-view",children:(0,s.jsxs)("div",{className:"flex w-full my-0.5 items-center",children:[(0,s.jsx)("span",{className:"text-transparent w-[1.5em] h-[1.5em] inline-block",children:I}),d,(0,s.jsxs)("div",{className:"w-full relative flex pr-2",children:[(0,s.jsx)("span",{className:"flex-shrink-0 cursor-pointer select-none whitespace-nowrap",onContextMenu:A,children:r}),(0,s.jsx)("span",{className:"flex-shrink-0 pr-1",children:":"}),a?(0,s.jsx)("span",{className:"hook-value-placeholder line-clamp-1 break-all relative",children:(0,s.jsx)(Y,{item:i,chunkId:v,hookIndex:x,path:r,type:h||"",rootItem:o,parentItem:c,children:t})}):(0,s.jsx)("span",{className:"hook-value-placeholder line-clamp-1 break-all",children:t})]})]})})}},ee=e=>{let{select:l}=e,n=(0,z.W)(e=>e.triggerStatus),t=I.P.useShallowSelector(e=>{var n;return null===(n=e.state)||void 0===n?void 0:n[l]}),r=C((e,l)=>(0,s.jsx)("div",{className:"tree-wrapper",children:(0,s.jsx)(Q,{name:e.toString(),item:l})},e)),i=t-9>=0?t-9:0;return(null==n?void 0:n.length)>0?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"node-trigger p-2 pb-0",children:[(0,s.jsx)("div",{className:"flex items-center justify-between",children:(0,s.jsx)("span",{children:"trigger"})}),(0,s.jsx)(k.q,{y:1}),(0,s.jsx)("div",{className:"w-full font-code font-sm",children:null==n?void 0:n.map((e,l)=>r(i+l,e))})]}),(0,s.jsx)(A.j,{})]}):null},el=e=>{let{select:l}=e,n=(0,z.W)(e=>e.warnStatus),t=F.R.useShallowSelector(e=>e.warn[l]),r=C((e,l)=>(0,s.jsx)("div",{className:"tree-wrapper",children:(0,s.jsx)(Q,{name:e.toString(),item:l})},e)),i=t-9>=0?t-9:0;return(null==n?void 0:n.length)>0?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"node-warn p-2 pb-0",children:[(0,s.jsx)("div",{className:"flex items-center justify-between",children:(0,s.jsx)("span",{children:"warn"})}),(0,s.jsx)(k.q,{y:1}),(0,s.jsx)("div",{className:"w-full font-code font-sm",children:null==n?void 0:n.map((e,l)=>r(i+l,e))})]}),(0,s.jsx)(A.j,{})]}):null},en=e=>{let{select:l}=e,n=(0,z.W)(e=>e.errorStatus),t=F.R.useShallowSelector(e=>e.error[l]),r=C((e,l)=>(0,s.jsx)("div",{className:"tree-wrapper",children:(0,s.jsx)(Q,{name:e.toString(),item:l})},e)),i=t-9>=0?t-9:0;return(null==n?void 0:n.length)>0?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"node-error p-2 pb-0",children:[(0,s.jsx)("div",{className:"flex items-center justify-between",children:(0,s.jsx)("span",{children:"error"})}),(0,s.jsx)(k.q,{y:1}),(0,s.jsx)("div",{className:"w-full font-code font-sm",children:null==n?void 0:n.map((e,l)=>r(i+l,e))})]}),(0,s.jsx)(A.j,{})]}):null},es=()=>{let e=(0,h.U)(e=>e.select);return(0,z.W)(e=>e.enable)&&e?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(ee,{select:e}),(0,s.jsx)(el,{select:e}),(0,s.jsx)(en,{select:e})]}):null};var et=n(2180);let er=e=>{var l;let{item:n}=e,[t,r]=(0,a.useState)(!1),i=n.h,o=(0,s.jsx)(E.Z,{fill:"currentColor",className:"origin-center ".concat(t?"rotate-90":""),width:"0.6em",height:"0.6em"});return i?(0,s.jsx)(Q,{name:n.n,item:n.v,editable:n.e,hookIndex:n.i,type:"hook",prefix:(0,s.jsx)(et.z,{classNames:{content:"p-0"},size:"sm",className:"rounded-sm text-center mr-1 flex-shrink-0 font-[300] !px-1 text-gray-800 dark:text-gray-200 !h-[1.4em] !max-w-[initial] !min-w-[initial]",children:n.i})}):(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:"hook-stack-view",children:[(0,s.jsxs)("div",{className:"flex w-full my-0.5",children:[(0,s.jsx)("span",{className:"text-gray-400 w-[1.5em] h-[1.5em] cursor-pointer inline-flex justify-center items-center hover:text-gray-700",onClick:()=>r(!t),children:o}),(0,s.jsx)("div",{className:"max-w-full line-clamp-1 cursor-pointer",onClick:()=>r(!t),children:n.n}),"Anonymous"===n.n?null:":"]}),(0,s.jsx)("div",{className:"".concat(t?"block":"hidden"," ml-4 my-0.5"),children:null===(l=n.c)||void 0===l?void 0:l.map((e,l)=>(0,s.jsx)(er,{item:e},e.n+"-"+l))})]})})},ei=()=>{let e=(0,h.U)(e=>e.select),l=(0,x.K)(e=>e.nodes).find(l=>l.i===e),n=null==l?void 0:l.i,t=(null==l?void 0:l._h)||[];return t.length>0?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"node-hooks p-2 pb-0",children:[(0,s.jsx)("div",{className:"flex items-center justify-between",children:(0,s.jsx)("span",{children:"hooks"})}),(0,s.jsx)(k.q,{y:1}),(0,s.jsx)("div",{className:"w-full font-code font-sm",children:t.map((e,l)=>(0,s.jsx)("div",{className:"tree-wrapper",children:(0,s.jsx)(er,{item:e})},n+"-"+l))})]}),(0,s.jsx)(A.j,{})]}):null};var ea=n(35202),eo=n(41167),ec=n(10715),ed=n(10640),eu=n(11298),em=n(315);let{setSelect:ex,setClose:eh,setHover:ev}=h.U.getActions(),ej=(0,a.memo)(e=>{let{node:l}=e,n=(0,ec.getFiberTag)(l);return(null==n?void 0:n.length)?(0,s.jsx)("div",{className:"gap-x-[2px] flex items-center",children:n.map(e=>(0,s.jsx)(et.z,{size:"sm",color:e.includes("compiler")?"primary":void 0,radius:"none",className:"rounded-md capitalize text-[8px] h-[14px]",children:e},e))}):null});ej.displayName="RenderTag";let ep=(0,a.memo)(e=>{let{node:l}=e,n=(0,em.i)((0,a.useCallback)(e=>{var n;return null===(n=e.map)||void 0===n?void 0:n[l.k]},[l.k]));return(0,s.jsxs)("div",{"data-key":!0,className:"flex items-center gap-x-[1px] text-[11px]",children:[(0,s.jsx)("div",{className:" text-[#40af2c]",children:"key"}),(0,s.jsx)("div",{className:" text-gray-400",children:"="}),(0,s.jsxs)("div",{className:"flex",children:['"',(0,s.jsx)(eo.e,{content:n,delay:800,showArrow:!0,color:"foreground",children:(0,s.jsx)("div",{className:"text-gray-600 max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap",children:n})}),'"']})]})});ep.displayName="RenderKey";let ef=e=>{let{node:l,className:n,withKey:t=!0,withTag:r=!0,withHMR:i=!0,withSelect:o=!0,withTrigger:c=!0,withCollapse:d=!0}=e,u=(0,I.P)((0,a.useCallback)(e=>{var n;return null===(n=e.state)||void 0===n?void 0:n[l.i]},[l.i])),m=(0,eu.m)((0,a.useCallback)(e=>{var n;return null===(n=e.state)||void 0===n?void 0:n[l.i]},[l.i])),x=(0,F.R)((0,a.useCallback)(e=>{var n;return null===(n=e.state)||void 0===n?void 0:n[l.i]},[l.i])),{error:v,warn:j}=F.R.useShallowSelector(e=>{var n,s;return{error:null===(n=e.error)||void 0===n?void 0:n[l.i],warn:null===(s=e.warn)||void 0===s?void 0:s[l.i]}},(e,l)=>e.error===l.error&&e.warn===l.warn),p=(0,em.i)((0,a.useCallback)(e=>e.map[l.n],[l.n])),{select:f,closeList:g,selectList:w}=h.U.useShallowStableSelector(e=>({select:e.select,closeList:e.closeList,selectList:e.selectList})),N=o&&l.i===f,y=d&&(null==g?void 0:g[l.i]),b=(0,a.useMemo)(()=>o&&f&&!N&&(null==w?void 0:w[l.i]),[o,f,N,w,l.i]),S=Array.isArray(null==l?void 0:l.c),A=S?(0,s.jsx)(E.Z,{fill:"currentColor",className:"origin-center ".concat(y?"":"rotate-90"),width:"0.7em",height:"0.7em"}):null,C=l._d||0;return(0,s.jsx)("div",{id:"node-"+l.i.toString(),"data-depth":C,onClick:()=>{o&&ex(l.i)},onMouseEnter:()=>{o&&ev(l.i)},onMouseLeave:()=>{o&&ev("")},className:"node-item w-full h-full cursor-pointer transition-transform-background rounded-sm select-none "+(n||"")+"".concat(o?b?" node-item-select-hover":" node-item-hover":"")+"".concat(b?" node-item-select":"")+"".concat(N?" node-item-selected":""),children:(0,s.jsxs)("div",{className:"flex items-center h-full w-full px-[2px] relative",children:[N&&(0,s.jsx)("div",{className:"absolute top-0 left-[1px] h-full border-l-2 border-blue-400 rounded-sm pointer-events-none"}),(0,s.jsx)("div",{className:"flex-grow",style:{transform:"translateX(calc(".concat(C," * var(--indentation-size))")},children:(0,s.jsxs)("div",{"data-content":!0,className:"flex items-center w-fit",children:[d&&(0,s.jsx)("span",{className:"text-gray-400 w-[1em]"+(S?" hover:text-gray-700":""),onClick:e=>{e.stopPropagation(),eh(l.i)},children:S&&(0,s.jsx)(eo.e,{content:y?"Toggle to open":"Toggle to close",delay:800,showArrow:!0,color:"foreground",children:A})}),(0,s.jsx)("p",{className:"node-name line-clamp-1",children:p}),r&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(k.q,{x:1}),(0,s.jsx)(ej,{node:l})]}),c&&u>0&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(k.q,{x:1}),(0,s.jsx)(eo.e,{content:"trigger update",showArrow:!0,color:"primary",children:(0,s.jsx)(et.z,{size:"sm",radius:"none",color:"primary",className:"rounded-md capitalize text-[8px] h-[14px]",children:u})})]}),i&&m>0&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(k.q,{x:1}),(0,s.jsx)(eo.e,{content:"hmr update",showArrow:!0,color:"success",children:(0,s.jsx)(et.z,{size:"sm",radius:"none",color:"success",className:"rounded-md capitalize text-[8px] h-[14px]",children:m})})]}),x&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(k.q,{x:1}),(0,s.jsx)(et.z,{size:"sm",radius:"none",color:"warning",className:"rounded-md capitalize text-[8px] h-[14px]",children:x})]}),j&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(k.q,{x:1}),(0,s.jsx)(et.z,{size:"sm",radius:"none",color:"warning",className:"rounded-md capitalize text-[8px] h-[14px]",children:j})]}),v&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(k.q,{x:1}),(0,s.jsx)(et.z,{size:"sm",radius:"none",color:"danger",className:"rounded-md capitalize text-[8px] h-[14px]",children:v})]}),t&&l.k&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(k.q,{x:1}),(0,s.jsx)(ep,{node:l})]})]})})]})})},{storeFiber:eg,triggerFiber:ew,scrollIntoView:eN,inspectComAction:ey,inspectDomAction:eb}=h.U.getActions(),eS=()=>{let e=(0,h.U)(e=>e.select),l=(0,x.K)(e=>e.nodes).find(l=>l.i===e),n=(null==l?void 0:l.t)&ec.NODE_TYPE.__class__||(null==l?void 0:l.t)&ec.NODE_TYPE.__function__;return l?(0,s.jsxs)("div",{className:"sticky top-0 z-50",children:[(0,s.jsxs)("div",{className:"node-name p-2 pb-0 font-lg font-code bg-content1 transition-transform-background",children:[(0,s.jsx)(ef,{node:l,withCollapse:!1,withSelect:!1,withKey:!1}),(0,s.jsxs)(ea.g,{className:"absolute right-4 top-0",children:[(0,s.jsx)(eo.e,{content:"force scroll to select",showArrow:!0,color:"foreground",placement:"bottom-end",children:(0,s.jsx)(B.A,{isIconOnly:!0,size:"sm",variant:"flat",onPress:eN,children:(0,s.jsx)(ed.Z,{className:"w-[1.1em]"})})}),(0,s.jsx)(eo.e,{content:"store fiber node",showArrow:!0,color:"foreground",placement:"bottom-end",children:(0,s.jsx)(B.A,{isIconOnly:!0,size:"sm",variant:"flat",onPress:eg,children:(0,s.jsx)(p.Z,{className:"w-[1.1em]"})})}),(0,s.jsx)(eo.e,{content:"force trigger",showArrow:!0,color:"foreground",placement:"bottom-end",children:(0,s.jsx)(B.A,{isIconOnly:!0,size:"sm",variant:"flat",onPress:ew,children:(0,s.jsx)(E.Z,{className:"w-[1.1em]"})})}),(0,s.jsx)(eo.e,{content:"inspect dom",showArrow:!0,color:"foreground",placement:"bottom-end",children:(0,s.jsx)(B.A,{isIconOnly:!0,size:"sm",variant:"flat",onPress:eb,children:(0,s.jsx)(g.Z,{className:"w-[1.1em]"})})}),n>0&&(0,s.jsx)(eo.e,{content:"inspect code",showArrow:!0,color:"foreground",placement:"bottom-end",children:(0,s.jsx)(B.A,{isIconOnly:!0,size:"sm",variant:"flat",onPress:ey,children:(0,s.jsx)(f.Z,{className:"w-[1.1em]"})})})]})]}),(0,s.jsx)(A.j,{})]}):null},ek=()=>{var e;let l=(0,h.U)(e=>e.select),n=(0,x.K)(e=>e.nodes).find(e=>e.i===l),t=Object.keys((null==n?void 0:null===(e=n.p)||void 0===e?void 0:e.v)||{}),r=null==n?void 0:n.i,i=t.length>0,a=C(e=>{var l,i;let a=t[e];return(0,s.jsx)("div",{className:"tree-wrapper",children:(0,s.jsx)(Q,{name:a,type:"props",editable:!0,item:null==n?void 0:null===(i=n.p)||void 0===i?void 0:null===(l=i.v)||void 0===l?void 0:l[a]})},r+"-"+e)});return i?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"node-props p-2 pb-0",children:[(0,s.jsx)("div",{className:"flex items-center justify-between",children:(0,s.jsx)("span",{children:"props"})}),(0,s.jsx)(k.q,{y:1}),(0,s.jsx)("div",{className:"w-full font-code font-sm",children:t.map((e,l)=>a(l))})]}),(0,s.jsx)(A.j,{})]}):null};var eA=n(58467),eC=n(4118),ez=n(61370);let{scrollIntoView:eF}=h.U.getActions(),eI=()=>{let e=(0,h.U)(e=>e.select),l=(0,x.K)(e=>e.nodes).find(l=>l.i===e),n=null==l?void 0:l._t,t=null==l?void 0:l._t,r=(0,eC.k)(e=>e.filter),i=(0,a.useMemo)(()=>Array.from(r).map(e=>+e),[r]),o=(0,eA.p)(e=>e.list),c=null==t?void 0:t[(null==t?void 0:t.length)-1];(null==c?void 0:c.startsWith("@my-react"))?t=null==t?void 0:t.slice(0,-1):c=void 0;let d=null==t?void 0:t[(null==t?void 0:t.length)-1];(null==d?void 0:d.startsWith("@my-react"))?t=null==t?void 0:t.slice(0,-1):d=void 0;let u=(0,a.useMemo)(()=>null==t?void 0:t.map(e=>o.find(l=>l.i===e)),[o,t]),m=(0,a.useMemo)(()=>null==u?void 0:u.filter(e=>!(0,ez.VR)(e,i)),[i,u]),v=C(e=>{let l=null==m?void 0:m[e];return l?(0,s.jsx)("div",{className:"ml-2",onClick:eF,children:(0,s.jsx)(ef,{node:l,withCollapse:!1})},l.i):null});return(null==n?void 0:n.length)?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"node-renders p-2 pb-0",children:[(0,s.jsx)("div",{children:"renders"}),(0,s.jsx)(k.q,{y:1}),(0,s.jsxs)("div",{className:"w-full font-code font-sm",children:[m.map((e,l)=>v(l)),d&&(0,s.jsx)("div",{className:"ml-2 px-[2px]",children:d}),(0,s.jsx)("div",{className:"ml-2 px-[2px]",children:c||"@my-react"})]})]}),(0,s.jsx)(A.j,{})]}):null},eE=()=>{let e=(0,h.U)(e=>e.select),l=(0,x.K)(e=>e.nodes).find(l=>l.i===e),n=null==l?void 0:l._s;return(null==n?void 0:n.fileName)?(0,s.jsxs)("div",{className:"node-source p-2 pb-0",children:[(0,s.jsx)("div",{children:"source"}),(0,s.jsx)(k.q,{y:1}),(0,s.jsx)("div",{className:"w-full font-code font-sm",children:(0,s.jsx)("div",{className:"ml-2 px-[2px] text-gray-600",children:(null==n?void 0:n.fileName)+"".concat((null==n?void 0:n.lineNumber)?":"+(null==n?void 0:n.lineNumber):"")+"".concat((null==n?void 0:n.columnNumber)?":"+(null==n?void 0:n.columnNumber):"")})})]}):null},eO=()=>{var e,l,n;let t=(0,h.U)(e=>e.select),r=(0,x.K)(e=>e.nodes).find(e=>e.i===t),i=Object.keys((null==r?void 0:null===(e=r.s)||void 0===e?void 0:e.t)!=="Null"&&(null==r?void 0:null===(l=r.s)||void 0===l?void 0:l.t)!=="Undefined"&&(null==r?void 0:null===(n=r.s)||void 0===n?void 0:n.v)||{}),a=null==r?void 0:r.i,o=i.length>0,c=C(e=>{var l,n;let t=i[e];return(0,s.jsx)("div",{className:"tree-wrapper",children:(0,s.jsx)(Q,{name:t,type:"state",editable:!0,item:null==r?void 0:null===(n=r.s)||void 0===n?void 0:null===(l=n.v)||void 0===l?void 0:l[t]})},a+"-"+e)});return o?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"node-states p-2 pb-0",children:[(0,s.jsx)("div",{className:"flex items-center justify-between",children:(0,s.jsx)("span",{children:"states"})}),(0,s.jsx)(k.q,{y:1}),(0,s.jsx)("div",{className:"w-full font-code font-sm",children:i.map((e,l)=>c(l))})]}),(0,s.jsx)(A.j,{})]}):null},e_=()=>{let{loading:e}=x.K.useShallowStableSelector(e=>({nodeList:e.nodes,loading:e.loading})),l=h.U.useShallowStableSelector(e=>e.select);return e?(0,s.jsx)("div",{className:"node-view h-full p-1 flex items-center justify-center",children:(0,s.jsx)(m.c,{color:"primary"})}):(0,s.jsx)("div",{className:"node-view h-full p-1",children:(0,s.jsxs)("div",{className:"group h-full overflow-auto",children:[(0,s.jsx)(eS,{},l),(0,s.jsx)(ek,{},l),(0,s.jsx)(eO,{},l),(0,s.jsx)(ei,{},l),(0,s.jsx)(es,{},l),(0,s.jsx)(eI,{},l),(0,s.jsx)(eE,{},l),(0,s.jsx)(S,{},l)]})})};var eR=n(17931),eZ=n(68880);let eq=function(e){let l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200,[n,s]=(0,a.useState)(e);return[n,(0,a.useMemo)(()=>(0,ec.debounce)(s,l),[l])]},eP=[],eT={width:0,height:0,left:0,right:0,top:0,bottom:0,x:0,y:0};var eM=n(67570),eU=n(66230),eV=n(20847),eL=n(94757),eK=n(49101),eD=n(59161),eW=n(82505),eB=n(62966),eH=n(39119),eX=n(76244),eY=n(37067),eJ=n(6250),e$=n(61684),eG=n(77936),eQ=n(71947),e0=n(6219),e1=n(65683),e2=n(31094),e6=n(11112),e4=n(36221),e7=n(77481),e5=n(36796),e9=n(11216),e8=n(31198),e3=n(37863),le=n(99269),ll=n(46378),ln=n(57144);let{setSelect:ls}=h.U.getActions(),{toggleHoverOnBrowser:lt}=e7.Z.getActions(),lr=(0,a.memo)(e=>{var l;let{handle:n}=e,[r,i]=(0,a.useState)(""),o=(0,eA.p)(e=>e.list),[c,d]=(0,a.useState)(0),[u,m]=(0,a.useState)([]),[x,h]=(0,a.useState)([]),v=(0,em.i)(e=>e.map),j=e7.Z.useShallowStableSelector(e=>e.state.enableHoverOnBrowser),p=u[c],f=null===(l=x[p])||void 0===l?void 0:l.i;return(0,a.useEffect)(()=>{d(0),m([])},[r]),(0,a.useEffect)(()=>{void 0!==p&&(null==n||n.scrollToIndex({index:p}),ls(f,!0))},[p,n,f]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(eo.e,{content:"hover on the browser",showArrow:!0,color:"foreground",children:(0,s.jsx)(B.A,{isIconOnly:!0,variant:"flat",onPress:lt,children:(0,s.jsx)(e3.Z,{className:j?"text-green-400 h-[1.2em]":"text-gray-400 h-[1.2em]"})})}),(0,s.jsx)(k.q,{x:2}),(0,s.jsx)("form",{onSubmit:e=>{var l;if(null==e||null===(l=e.preventDefault)||void 0===l||l.call(e),r){d(0);let e=o.map(e=>({...e,_name:v[e.n]})),l=e.map((e,l)=>e._name.includes(r)?l:-1).filter(e=>-1!==e);h(e),m(l),0===l.length?(0,t.fz)({severity:"danger",description:"Can't find current name",title:"error",color:"danger"}):(0,t.fz)({severity:"success",description:"Find ".concat(l.length," items"),title:"success",color:"success"})}},children:(0,s.jsx)(e8.Y,{placeholder:"Search component",className:"w-full",value:r,variant:"flat",onChange:e=>i(e.target.value),endContent:(0,s.jsx)("button",{className:"focus:outline-none",type:"submit",children:(0,s.jsx)(le.Z,{className:"text-black/50 h-[1em] dark:text-white/90 text-slate-400 flex-shrink-0"})})})}),u.length>1&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(k.q,{x:2}),(0,s.jsxs)(ea.g,{variant:"flat",children:[(0,s.jsx)(eo.e,{content:"Total ".concat(u.length,", current ").concat(c+1),showArrow:!0,color:"foreground",children:(0,s.jsx)(B.A,{isIconOnly:!0,onPress:()=>d(e=>(e-1+u.length)%u.length),isDisabled:0===c,children:(0,s.jsx)(ll.Z,{className:"w-[1.2em]"})})}),(0,s.jsx)(eo.e,{content:"Total ".concat(u.length,", current ").concat(c+1),showArrow:!0,color:"foreground",children:(0,s.jsx)(B.A,{isIconOnly:!0,onPress:()=>d(e=>(e+1)%u.length),isDisabled:c===u.length-1,children:(0,s.jsx)(ln.Z,{className:"w-[1.2em]"})})})]})]})]})});lr.displayName="TreeViewSearch";let li=eC.k.getActions().onChange,la=z.W.getActions().toggleEnable,lo=(0,a.memo)(e=>{let{handle:l}=e,{isOpen:n,onOpen:t,onClose:r,onOpenChange:i}=(0,M.q)(),{theme:a,setTheme:o}=(0,e4.F)(),{state:c,setEnableHover:d,setEnableUpdate:u,toggleEnableRetrigger:m}=(0,e7.Z)(),{state:x,setUISize:h}=(0,e9.Z)(),v=(0,z.W)(e=>e.enable),{state:j,cb:p}=(0,e5.$)(e=>({state:e.state,cb:e.cb})),f=(0,eC.k)(e=>e.filter);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"fixed top-3 right-3 z-10 flex",children:[(0,s.jsx)(lr,{handle:l}),(0,s.jsx)(k.q,{x:2}),(0,s.jsxs)(ea.g,{variant:"flat",children:[(0,s.jsx)(eo.e,{content:(0,s.jsx)("p",{className:j?"text-green-400":"text-red-400",children:j?"DevTool Connect":"DevTool DisConnect"}),showArrow:!0,children:(0,s.jsx)(B.A,{isIconOnly:!0,onPress:()=>null==p?void 0:p(),disabled:j,children:j?(0,s.jsx)(eJ.Z,{className:"text-green-500 w-[1.2em]"}):(0,s.jsx)(e$.Z,{className:" text-red-500 w-[1.2em]"})})}),(0,s.jsx)(B.A,{isIconOnly:!0,onPress:()=>o("dark"===a?"light":"dark"),children:"dark"===a?(0,s.jsx)(eG.Z,{className:"text-gray-500 w-[1.2em]"}):(0,s.jsx)(eQ.Z,{className:"text-orange-500 w-[1.2em]"})}),(0,s.jsx)(eo.e,{content:"Setting",showArrow:!0,color:"foreground",children:(0,s.jsx)(B.A,{isIconOnly:!0,onPress:t,children:(0,s.jsx)(e0.Z,{className:n?"text-green-500 w-[1.2em]":"text-gray-500 w-[1.2em]"})})})]})]}),(0,s.jsx)(eM.R,{isOpen:n,backdrop:"blur",size:"2xl",onClose:r,onOpenChange:i,placement:"top",children:(0,s.jsxs)(eU.A,{children:[(0,s.jsx)(eV.k,{children:(0,s.jsxs)("h3",{className:"font-lg",children:["Setting - ",(0,s.jsx)(eL.z,{children:"@my-react/devtool"})]})}),(0,s.jsxs)(eK.I,{children:[(0,s.jsxs)("div",{className:"flex flex-col gap-y-4",children:[(0,s.jsxs)("div",{className:"flex flex-col gap-y-2",children:[(0,s.jsxs)("p",{className:"whitespace-nowrap flex items-center text-foreground-500",children:[(0,s.jsx)(e1.Z,{className:"w-[1.2em] mr-2"}),"Filter Node:"]}),(0,s.jsx)("div",{className:"flex items-center",children:(0,s.jsx)(eD.g,{selectionMode:"multiple",placeholder:"Select a Type",variant:"bordered",selectedKeys:f,"aria-label":"Filter Node",className:"flex items-center",onChange:e=>{li(new Set(e.target.value.split(",")))},children:ec.typeKeys.map(e=>(0,s.jsx)(eW.R,{children:(0,ec.getTypeName)(e)},e))})})]}),(0,s.jsx)(A.j,{}),(0,s.jsxs)("div",{className:"flex flex-col gap-y-2",children:[(0,s.jsxs)("p",{className:"whitespace-nowrap flex items-center text-foreground-500",children:[(0,s.jsx)(e2.Z,{className:"w-[1.2em] mr-2"}),"UI Size:"]}),(0,s.jsxs)(eB.X,{value:x,onValueChange:e=>h(e),orientation:"horizontal",classNames:{wrapper:"gap-x-6"},children:[(0,s.jsx)(eH.J,{value:e9.E.sm,children:"Small Size"}),(0,s.jsx)(eH.J,{value:e9.E.md,children:"Medium Size"}),(0,s.jsx)(eH.J,{value:e9.E.lg,children:"Large Size"})]})]}),(0,s.jsx)(A.j,{}),(0,s.jsxs)("div",{className:"flex flex-col gap-y-2",children:[(0,s.jsxs)("p",{className:"whitespace-nowrap flex items-center  text-foreground-500",children:[(0,s.jsx)(e6.Z,{className:"w-[1.2em] mr-2"}),"Config:"]}),(0,s.jsx)(eX.K,{isSelected:c.enableUpdate,radius:"full",onValueChange:u,color:"primary",children:"Highlight Update"}),(0,s.jsx)(eX.K,{isSelected:c.enableHover,radius:"full",onValueChange:d,color:"secondary",children:"Hover Overlay"}),(0,s.jsx)(eX.K,{isSelected:c.enableRetrigger,radius:"full",onValueChange:m,color:"warning",children:"Retrigger Status"}),(0,s.jsx)(eX.K,{isSelected:v,radius:"full",onValueChange:la,color:"default",children:"Extend Node Detail"})]})]}),(0,s.jsx)(k.q,{y:4})]}),(0,s.jsx)(eY.R,{children:(0,s.jsx)(B.A,{onPress:r,children:"Close"})})]})})]})});lo.displayName="TreeViewSetting";let lc=(0,ec.debounce)((e,l,n)=>{let s=Array.from(e.querySelectorAll("[data-depth]")),t=e.clientWidth,r=l.current||12;for(let e of(t>n.current&&(r=12),n.current=t,s)){var i;let l=parseInt(e.getAttribute("data-depth")||"0",10)||0;0!==l&&(r=Math.min(r,Math.max(0,t-((null===(i=e.querySelector("[data-content]"))||void 0===i?void 0:i.clientWidth)||0)-6)/l))}l.current=r,e.style.setProperty("--indentation-size","".concat(r,"px")),e.style.setProperty("--width-size","".concat(t,"px")),e.style.opacity="1"},16),ld=(0,a.memo)(e=>{let{onScroll:l,data:n,onMount:t}=e,r=(0,a.useRef)(null),i=(0,a.useRef)(n);return i.current=n,(0,a.useEffect)(()=>h.U.subscribe(e=>e.scroll,()=>{var e,n;let s=h.U.getReadonlyState().select,t=null===(e=i.current)||void 0===e?void 0:e.findIndex(e=>e.i===s);-1!==t&&(null===(n=r.current)||void 0===n||n.scrollIntoView({index:t,align:"center",done:l}))}),[l]),(0,a.useEffect)(()=>(t(r.current),()=>t()),[t]),(0,s.jsx)(eR.OO,{className:"font-code font-sm overflow-x-hidden",ref:r,increaseViewportBy:300,onScroll:l,totalCount:n.length,itemContent:(e,l)=>{let t=n[e];return t?(0,s.jsx)(ef,{node:t}):null}})});ld.displayName="TreeViewImpl";let lu=(0,a.memo)(()=>{let e=(0,a.useRef)(null),l=eA.p.useShallowStableSelector(e=>e.list),{width:n,height:t}=function(e){let{ref:l,cssSelector:n,getEle:s,deps:t}=e,r=(0,a.useRef)(s);r.current=s;let[i,o]=eq(eT,100);return(0,eZ.L)(()=>{var e;let s=l?l.current:n?document.querySelector(n):(null===(e=r.current)||void 0===e?void 0:e.call(r))||null;if(s){if(window.ResizeObserver){let e=new ResizeObserver(()=>{o(s.getBoundingClientRect())});return e.observe(s),()=>e.disconnect()}{let e=()=>o(s.getBoundingClientRect());return e(),window.addEventListener("resize",e,{passive:!0}),()=>window.removeEventListener("resize",e)}}},[l,n,o,...t||eP]),i}({ref:e}),[r,i]=(0,a.useState)(),o=(0,a.useRef)(12),c=(0,a.useRef)(n),d=(0,a.useCallback)(()=>{e.current&&lc(e.current,o,c)},[]);return(0,a.useEffect)(()=>{d()},[d,n,t,l.length]),(0,s.jsx)("div",{className:"tree-view h-full p-1",children:(0,s.jsxs)("div",{className:"group h-full transform-gpu",ref:e,style:{opacity:0},children:[l.length>0&&(0,s.jsx)(ld,{onScroll:d,data:l,onMount:i}),(0,s.jsx)(lo,{handle:r})]})})});function lm(){let e=(0,e5.$)(e=>e.error);return(0,a.useEffect)(()=>{e&&(0,t.fz)({severity:"danger",description:e,title:"error",color:"danger"})},[e]),(0,s.jsxs)("main",{className:"flex p-1 h-screen",children:[(0,s.jsx)(i(),{children:(0,s.jsx)("title",{children:"@my-react devtools"})}),(0,s.jsx)(u,{left:(0,s.jsx)(lu,{}),right:(0,s.jsx)(e_,{})})]})}lu.displayName="TreeView"}},function(e){e.O(0,[8448,9196,4485,9774,2888,179],function(){return e(e.s=2565)}),_N_E=e.O()}]);