(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2374],{30803:function(e,l,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/devTool",function(){return t(70706)}])},70706:function(e,l,t){"use strict";t.r(l),t.d(l,{default:function(){return eJ}});var s,n,r=t(20217),i=t(52802),a=t.n(i),o=t(45386),c=t(89589),d=t(31038),x=t(63980),u=t(2550),m=t(57960);let h=e=>{let{left:l,right:t}=e;return(0,r.jsx)(x.w,{className:"w-full",radius:"sm",children:(0,r.jsx)(u.G,{className:"w-full p-0",children:(0,r.jsxs)(m.oL,{children:[l,t]})})})};var v=t(33135),j=t(17419),p=t(13657),f=t(58039),g=t(20908),w=t(6882),N=t(78868),y=t(79362);(s=n||(n={})).sm="sm",s.md="md",s.lg="lg";let S=(0,y.eK)(()=>({state:"sm"}),{withActions:e=>({setUISize:l=>e.state=l}),withDeepSelector:!1}),{close:b,setStore:k,setSource:A}=N.a.getActions(),C=(0,c.memo)(()=>{let{state:e,position:l,type:t}=(0,N.a)(e=>e),s=S.useShallowStableSelector(e=>e.state),n="sm"===s?11:"md"===s?12:13;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"fixed w-screen h-screen top-0 left-0",onContextMenu:e=>{e.preventDefault(),b()},style:{display:e?"block":"none"},onClick:b}),(0,r.jsx)("div",{className:"fixed z-10 ".concat("sm"===s?"text-[11px]":"md"===s?"text-[12px]":"text-[13px]"),style:{top:l.y+4,left:l.x+4},children:(0,r.jsx)(g.M,{initial:!1,mode:"wait",children:e&&(0,r.jsxs)(w.E.div,{className:"context-menu bg-content1 border rounded shadow-md py-1",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:[(0,r.jsxs)("div",{className:"context-menu-item px-2 py-1 cursor-pointer select-none flex justify-center items-center node-item-hover",onClick:async()=>{k(),await new Promise(e=>setTimeout(e,100)),b()},children:[(0,r.jsx)(f.FMB,{className:"mr-2",width:n,height:n}),(0,r.jsx)("span",{className:"flex-grow",children:"Store as global variable"})]}),("Function"===t||"Element"===t)&&(0,r.jsxs)("div",{className:"context-menu-item px-2 py-1 cursor-pointer select-none flex justify-center items-center node-item-hover",onClick:async()=>{A(),await new Promise(e=>setTimeout(e,100)),b()},children:[(0,r.jsx)(f.hsE,{className:"mr-2",width:n,height:n}),"Function"===t&&(0,r.jsx)("span",{className:"flex-grow",children:"Inspect Function source"}),"Element"===t&&(0,r.jsx)("span",{className:"flex-grow",children:"Inspect Element node"})]})]},"context-menu")})})]})});C.displayName="ContextMenu";var z=t(61865),F=t(91837),R=t(10715);let E=e=>{let l=(0,c.useRef)(e);return l.current=e,(0,c.useCallback)(function(){for(var e,t,s=arguments.length,n=Array(s),r=0;r<s;r++)n[r]=arguments[r];return n.length?null===(e=l.current)||void 0===e?void 0:e.call(l,...n):null===(t=l.current)||void 0===t?void 0:t.call(l)},[])};var O=t(56761),M=t(98110);let I=(e,l)=>{let t=(0,c.useRef)(e);return(0,c.useEffect)(()=>{l(e)&&(t.current=e)},[l,e]),t.current},q=e=>{let l=null==e?void 0:e.v,t=null==e?void 0:e.t;if("Element"===t||"Date"===t||"Boolean"===t||"Error"===t||"Number"===t||"Symbol"===t)return l;if((null==e?void 0:e.l)===!1)return"Array"===e.t||"Set"===e.t?"[…]":"Map"===e.t||"Object"===e.t?"{…}":"…";if(null!==l&&"object"==typeof l&&!Array.isArray(l)&&"function"==typeof l[window.Symbol.iterator])return"(…)";if(Array.isArray(l))return l.length>0?"[…]":"[]";if("Null"===t)return"null";if("Undefined"===t)return"undef";if("object"==typeof l)return Object.keys(l).length>0?"{…}":"{}";if("Function"===t)return"".concat(l.substr(0,10)+(l.length>10?"…":""));if("string"!=typeof l)return l;else return"String"===t?'"'.concat(l.substr(0,10)+(l.length>10?"…":""),'"'):"".concat(l.substr(0,10)+(l.length>10?"…":""))};function T(e,l){var t,s,n,r,i,a;if("Object"===e){let e=Object.keys(l),r=null==e?void 0:null===(n=e.slice(0,3))||void 0===n?void 0:null===(s=n.map(e=>"".concat(e,": ").concat(q(l[e]))))||void 0===s?void 0:null===(t=s.concat(e.length>3?["…"]:[]))||void 0===t?void 0:t.join(", ");return"{ ".concat(r," }")}if("Array"!==e)return e;{let e=null==l?void 0:null===(a=l.slice(0,4))||void 0===a?void 0:null===(i=a.map(e=>q(e)))||void 0===i?void 0:null===(r=i.concat(l.length>4?["…"]:[]))||void 0===r?void 0:r.join(", ");return"[".concat(e,"]")}}let{open:U,setId:P,setType:_}=N.a.getActions(),K=e=>{var l,t,s;let{name:n,item:i,prefix:a}=e,[o,d]=(0,c.useState)(!1),x=(0,c.useRef)(!1),u=M.F.useShallowSelector(e=>{var l,t;return null===(t=e.data)||void 0===t?void 0:null===(l=t[(null==i?void 0:i.i)||""])||void 0===l?void 0:l.loaded}),m=null!==(l=null==i?void 0:i.v)&&void 0!==l?l:null==u?void 0:u.v,h=I(m,e=>!!e),j=null!=m?m:h,p=null!==(t=null==u?void 0:u.n)&&void 0!==t?t:null==i?void 0:i.n,g=null!==(s=null==u?void 0:u.t)&&void 0!==s?s:null==i?void 0:i.t,w=(0,c.useMemo)(()=>{if(p)return p;if("Array"===g||"Set"===g||"Map"===g){let e=T("Array",null!=j?j:[]);return"Set"===g||"Map"===g?"".concat(g,"(").concat(e,")"):e}if("Iterable"===g||"Object"===g)return T("Object",null!=j?j:{})},[g,p,j]);(0,c.useEffect)(()=>{o&&(null==i?void 0:i.l)===!1&&i.i&&(!u||u.i!==i.i)&&M.F.getActions().setLoading(i.i),o&&(x.current=!0)},[u,o,null==i?void 0:i.i,null==i?void 0:i.l]),(0,c.useEffect)(()=>{o&&m&&(Array.isArray(m)?m.forEach(e=>{var l,t;!e.e||!e.i||e.l||(null===(t=M.F.getReadonlyState().data)||void 0===t?void 0:null===(l=t[e.i])||void 0===l?void 0:l.loaded)||M.F.getActions().setLoading(e.i)}):Object.values(m).forEach(e=>{var l,t;!e.e||!e.i||e.l||(null===(t=M.F.getReadonlyState().data)||void 0===t?void 0:null===(l=t[e.i])||void 0===l?void 0:l.loaded)||M.F.getActions().setLoading(e.i)}))},[m,o]);let N=e=>{j&&i&&(e.preventDefault(),U({x:e.clientX,y:e.clientY}),P(i.i),_(i.t))};if(!i)return null;let y=i.e,S=o?(0,r.jsx)(f.AS7,{width:"16",height:"16"}):(0,r.jsx)(f.VZf,{width:"16",height:"16"});if(y)return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"hook-value-view",children:[(0,r.jsxs)("div",{className:"flex w-full my-0.5 items-center",children:[(0,r.jsx)("span",{className:"text-gray-400 hover:text-gray-700",onClick:()=>d(!o),children:S}),a,(0,r.jsxs)("div",{className:"max-w-full line-clamp-1 break-all",children:[(0,r.jsx)("span",{className:"cursor-pointer select-none",onClick:()=>d(!o),onContextMenu:N,children:n}),": ",(0,r.jsx)("span",{className:"hook-value-placeholder",children:j?w:(0,r.jsx)(f.nWS,{className:"inline-block"})})]})]}),(x.current||o)&&(0,r.jsx)("div",{className:"".concat(o?"block":"hidden"," ml-6 my-0.5"),children:j?Array.isArray(j)?(0,r.jsx)(r.Fragment,{children:j.map((e,l)=>(0,r.jsx)(K,{name:l.toString(),item:e},l))}):(0,r.jsx)(r.Fragment,{children:Object.keys(j).sort().reverse().map(e=>(0,r.jsx)(K,{name:e,item:j[e]},e))}):(0,r.jsx)(v.c,{size:"sm"})})]})});{let e="String"===i.t?'"'.concat(String(i.v),'"'):String(i.v),l="ReadError"===i.t,t=(0,r.jsx)("span",{className:"hook-".concat(i.t," ").concat(l?"text-red-300":""),children:e});return(0,r.jsx)("div",{className:"hook-value-view",children:(0,r.jsxs)("div",{className:"flex w-full my-0.5 items-center",children:[(0,r.jsx)("span",{className:"text-transparent",children:S}),a,(0,r.jsxs)("div",{className:"w-full relative line-clamp-1 break-all pr-2",children:[(0,r.jsx)("span",{className:"cursor-pointer select-none",onContextMenu:N,children:n}),": ",(0,r.jsx)("span",{className:"hook-value-placeholder",children:t})]})]})})}},L=()=>{let e=(0,O.W)(e=>e.triggerStatus),l=S.useShallowStableSelector(e=>e.state),t="sm"===l?"text-[11px]":"md"===l?"text-[12px]":"text-[13px]",s=E((e,l)=>(0,r.jsx)("div",{className:"".concat(t,"  tree-wrapper"),children:(0,r.jsx)(K,{name:e.toString(),item:l})},e));return(null==e?void 0:e.length)>0?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{className:"flex items-center justify-between",children:(0,r.jsx)("span",{children:"trigger"})}),(0,r.jsx)(z.q,{y:1}),(0,r.jsx)("div",{className:"w-full",children:null==e?void 0:e.map((e,l)=>s(l,e))}),(0,r.jsx)(F.j,{})]}):null},V=()=>{let e=(0,O.W)(e=>e.hmrStatus).filter(e=>e!==R.HMRStatus.none),l=S.useShallowStableSelector(e=>e.state),t="sm"===l?"text-[11px]":"md"===l?"text-[12px]":"text-[13px]",s=E((e,l)=>(0,r.jsx)("div",{className:"".concat(t,"  tree-wrapper"),children:(0,r.jsx)("span",{children:R.HMRStatus[l]})},e));return(null==e?void 0:e.length)>0?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{className:"flex items-center justify-between",children:(0,r.jsx)("span",{children:"hmr"})}),(0,r.jsx)(z.q,{y:1}),(0,r.jsx)("div",{className:"w-full",children:null==e?void 0:e.map((e,l)=>s(l,e))}),(0,r.jsx)(F.j,{})]}):null},W=()=>{let e=(0,O.W)(e=>e.warnStatus),l=S.useShallowStableSelector(e=>e.state),t="sm"===l?"text-[11px]":"md"===l?"text-[12px]":"text-[13px]",s=E((e,l)=>(0,r.jsx)("div",{className:"".concat(t,"  tree-wrapper"),children:(0,r.jsx)(K,{name:e.toString(),item:l})},e));return(null==e?void 0:e.length)>0?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{className:"flex items-center justify-between",children:(0,r.jsx)("span",{children:"warn"})}),(0,r.jsx)(z.q,{y:1}),(0,r.jsx)("div",{className:"w-full",children:null==e?void 0:e.map((e,l)=>s(l,e))}),(0,r.jsx)(F.j,{})]}):null},B=()=>{let e=(0,O.W)(e=>e.errorStatus),l=S.useShallowStableSelector(e=>e.state),t="sm"===l?"text-[11px]":"md"===l?"text-[12px]":"text-[13px]",s=E((e,l)=>(0,r.jsx)("div",{className:"".concat(t,"  tree-wrapper"),children:(0,r.jsx)(K,{name:e.toString(),item:l})},e));return(null==e?void 0:e.length)>0?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{className:"flex items-center justify-between",children:(0,r.jsx)("span",{children:"error"})}),(0,r.jsx)(z.q,{y:1}),(0,r.jsx)("div",{className:"w-full",children:null==e?void 0:e.map((e,l)=>s(l,e))}),(0,r.jsx)(F.j,{})]}):null},D=()=>{let e=(0,p.U)(e=>e.select);return(0,O.W)(e=>e.enable)&&e?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(L,{}),(0,r.jsx)(V,{}),(0,r.jsx)(W,{}),(0,r.jsx)(B,{})]}):null};var H=t(2341);let Z=e=>{var l;let{item:t}=e,[s,n]=(0,c.useState)(!1),i=t.h,a=s?(0,r.jsx)(f.AS7,{width:"16",height:"16"}):(0,r.jsx)(f.VZf,{width:"16",height:"16"});return i?(0,r.jsx)(K,{name:t.n,item:t.v,prefix:(0,r.jsx)(H.z,{classNames:{content:"p-0"},size:"sm",className:"rounded-sm text-center mr-1 flex-shrink-0 font-[300] !px-1 text-gray-800 dark:text-gray-200 !h-[1.4em] !max-w-[initial] !min-w-[initial]",children:t.i})}):(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"hook-stack-view",children:[(0,r.jsxs)("div",{className:"flex w-full my-0.5",children:[(0,r.jsx)("span",{className:"text-gray-400 hover:text-gray-700",onClick:()=>n(!s),children:a}),(0,r.jsx)("div",{className:"max-w-full line-clamp-1 cursor-pointer",onClick:()=>n(!s),children:t.n}),":"]}),(0,r.jsx)("div",{className:"".concat(s?"block":"hidden"," ml-4 my-0.5"),children:null===(l=t.c)||void 0===l?void 0:l.map((e,l)=>(0,r.jsx)(Z,{item:e},e.n+"-"+l))})]})})},X=()=>{let e=(0,p.U)(e=>e.select),l=(0,j.K)(e=>e.nodes),t=S.useShallowStableSelector(e=>e.state),s=l.find(l=>l.i===e),n=null==s?void 0:s.i,i=(null==s?void 0:s._h)||[];return i.length>0?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{className:"flex items-center justify-between",children:(0,r.jsx)("span",{children:"hooks"})}),(0,r.jsx)(z.q,{y:1}),(0,r.jsx)("div",{className:"w-full ".concat("sm"===t?"text-[11px]":"md"===t?"text-[12px]":"text-[13px]"," tree-wrapper"),children:i.map((e,l)=>(0,r.jsx)(Z,{item:e},n+"-"+l))}),(0,r.jsx)(F.j,{})]}):null};var Y=t(51602),G=t(74538),J=t(93195),$=t(95717),Q=t(13500),ee=t(3164),el=t(93694);let{setSelect:et,setClose:es,setHover:en}=p.U.getActions(),er=(0,c.memo)(e=>{let{node:l}=e,t=(0,R.getFiberTag)(l);return(null==t?void 0:t.length)?(0,r.jsx)("div",{className:" gap-x-[2px] flex items-center",children:t.map(e=>(0,r.jsx)(H.z,{size:"sm",color:e.includes("compiler")?"primary":void 0,radius:"none",className:"rounded-md capitalize text-[8px] h-[14px]",children:e},e))}):null});er.displayName="RenderTag";let ei=(0,c.memo)(e=>{let{node:l,isScrolling:t}=e,s=(0,ee.i)((0,c.useCallback)(e=>{var t;return null===(t=e.map)||void 0===t?void 0:t[l.k]},[l.k]));return(0,r.jsxs)("div",{"data-key":!0,className:"flex items-center gap-x-[1px] text-[12px]",children:[(0,r.jsx)("div",{className:" text-[#40af2c]",children:"key"}),(0,r.jsx)("div",{className:" text-gray-400",children:"="}),(0,r.jsxs)("div",{className:"flex",children:['"',t?(0,r.jsx)("div",{className:"text-gray-600 max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap",children:s}):(0,r.jsx)(G.e,{content:s,delay:800,showArrow:!0,color:"foreground",children:(0,r.jsx)("div",{className:"text-gray-600 max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap",children:s})}),'"']})]})});ei.displayName="RenderKey";let ea=e=>{let{node:l,isScrolling:t,className:s,withKey:n=!0,withTag:i=!0,withHMR:a=!0,withSelect:o=!0,withTrigger:d=!0,withCollapse:x=!0}=e,u=(0,el.P)((0,c.useCallback)(e=>{var t;return null===(t=e.state)||void 0===t?void 0:t[l.i]},[l.i])),m=(0,Q.m)((0,c.useCallback)(e=>{var t;return null===(t=e.state)||void 0===t?void 0:t[l.i]},[l.i])),h=(0,$.R)((0,c.useCallback)(e=>{var t;return null===(t=e.state)||void 0===t?void 0:t[l.i]},[l.i])),{error:v,warn:j}=$.R.useShallowSelector(e=>{var t,s;return{error:null===(t=e.error)||void 0===t?void 0:t[l.i],warn:null===(s=e.warn)||void 0===s?void 0:s[l.i]}},(e,l)=>e.error===l.error&&e.warn===l.warn),g=(0,ee.i)((0,c.useCallback)(e=>e.map[l.n],[l.n])),{select:w,closeList:N,selectList:y}=p.U.useShallowStableSelector(e=>({select:e.select,closeList:e.closeList,selectList:e.selectList})),S=o&&l.i===w,b=x&&(null==N?void 0:N[l.i]),k=(0,c.useMemo)(()=>o&&w&&!S&&(null==y?void 0:y[l.i]),[o,w,S,y,l.i]),A=Array.isArray(null==l?void 0:l.c),C=A?b?(0,r.jsx)(f.VZf,{width:16,height:16}):(0,r.jsx)(f.AS7,{width:16,height:16}):null,F=l._d||0;return(0,r.jsx)("div",{id:"node-"+l.i.toString(),"data-depth":F,onClick:()=>{o&&et(l.i)},onMouseEnter:()=>{o&&en(l.i)},onMouseLeave:()=>{o&&en("")},className:"w-full h-full node-item cursor-pointer transition-transform-background rounded-sm select-none "+(s||"")+"".concat(o?k?" node-item-select-hover":" node-item-hover":"")+"".concat(k?" node-item-select":"")+"".concat(S?" node-item-selected":""),children:(0,r.jsxs)("div",{className:"flex items-center h-full w-full px-[2px] relative",children:[S&&(0,r.jsx)("div",{className:"absolute top-0 left-[1px] h-full border-l-2 border-blue-400 rounded-sm pointer-events-none"}),(0,r.jsx)("div",{className:"flex-grow",style:{width:"calc(100%-calc(".concat(F,"*var(--indentation-size)))"),marginLeft:"calc(".concat(F," * var(--indentation-size)")},children:(0,r.jsxs)("div",{"data-content":!0,className:"flex items-center w-fit",children:[x&&(0,r.jsx)("span",{className:" text-gray-400 min-w-[18px]"+(A?" hover:text-gray-700":""),onClick:e=>{e.stopPropagation(),es(l.i)},children:A?t?C:(0,r.jsx)(G.e,{content:b?"Toggle to open":"Toggle to close",delay:800,showArrow:!0,color:"foreground",children:C}):null}),(0,r.jsx)("p",{className:"node-name line-clamp-1",children:g}),i&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(z.q,{x:1}),(0,r.jsx)(er,{node:l})]}),d&&u>0&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(z.q,{x:1}),(0,r.jsx)(G.e,{content:"trigger update",showArrow:!0,color:"primary",children:(0,r.jsx)(H.z,{size:"sm",radius:"none",color:"primary",className:"rounded-md capitalize text-[8px] h-[14px]",children:u})})]}),a&&m>0&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(z.q,{x:1}),(0,r.jsx)(G.e,{content:"hmr update",showArrow:!0,color:"success",children:(0,r.jsx)(H.z,{size:"sm",radius:"none",color:"success",className:"rounded-md capitalize text-[8px] h-[14px]",children:m})})]}),h&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(z.q,{x:1}),(0,r.jsx)(H.z,{size:"sm",radius:"none",color:"warning",className:"rounded-md capitalize text-[8px] h-[14px]",children:h})]}),j&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(z.q,{x:1}),(0,r.jsx)(H.z,{size:"sm",radius:"none",color:"warning",className:"rounded-md capitalize text-[8px] h-[14px]",children:j})]}),v&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(z.q,{x:1}),(0,r.jsx)(H.z,{size:"sm",radius:"none",color:"danger",className:"rounded-md capitalize text-[8px] h-[14px]",children:v})]}),n&&l.k&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(z.q,{x:1}),(0,r.jsx)(ei,{node:l,isScrolling:t})]})]})})]})})},{forceReload:eo,storeFiber:ec,triggerFiber:ed,scrollIntoView:ex,inspectDom:eu}=p.U.getActions(),em=()=>{let e=(0,p.U)(e=>e.select),l=(0,j.K)(e=>e.nodes),t=S.useShallowStableSelector(e=>e.state),s=l.find(l=>l.i===e),n="sm"===t?11:"md"===t?12:13;return s?(0,r.jsxs)("div",{className:"p-2 ".concat("sm"===t?"text-[15px]":"md"===t?"text-[16px]":"text-[17px]"," sticky top-0 bg-content1 transition-transform-background z-50"),children:[(0,r.jsx)(ea,{node:s,withCollapse:!1,withSelect:!1,withKey:!1}),(0,r.jsxs)(Y.g,{className:"absolute right-4 top-0",children:[(0,r.jsx)(G.e,{content:"force scroll to select",showArrow:!0,color:"foreground",placement:"bottom-end",children:(0,r.jsx)(J.A,{isIconOnly:!0,size:"sm",variant:"flat",onPress:ex,children:(0,r.jsx)(f.TCQ,{width:n,height:n})})}),(0,r.jsx)(G.e,{content:"store fiber node",showArrow:!0,color:"foreground",placement:"bottom-end",children:(0,r.jsx)(J.A,{isIconOnly:!0,size:"sm",variant:"flat",onPress:ec,children:(0,r.jsx)(f.FMB,{width:n,height:n})})}),(0,r.jsx)(G.e,{content:"force trigger",showArrow:!0,color:"foreground",placement:"bottom-end",children:(0,r.jsx)(J.A,{isIconOnly:!0,size:"sm",variant:"flat",onPress:ed,children:(0,r.jsx)(f.o1U,{width:n,height:n})})}),(0,r.jsx)(G.e,{content:"inspect dom",showArrow:!0,color:"foreground",placement:"bottom-end",children:(0,r.jsx)(J.A,{isIconOnly:!0,size:"sm",variant:"flat",onPress:eu,children:(0,r.jsx)(f.hsE,{width:n,height:n})})}),(0,r.jsx)(G.e,{content:"force reload",showArrow:!0,color:"foreground",placement:"bottom-end",children:(0,r.jsx)(J.A,{isIconOnly:!0,size:"sm",variant:"flat",onPress:eo,children:(0,r.jsx)(f.BGW,{width:n-1,height:n-1})})})]}),(0,r.jsx)(F.j,{})]}):null},eh=()=>{var e;let l=(0,p.U)(e=>e.select),t=(0,j.K)(e=>e.nodes),s=S.useShallowStableSelector(e=>e.state),n=t.find(e=>e.i===l),i=Object.keys((null==n?void 0:null===(e=n.p)||void 0===e?void 0:e.v)||{}),a=null==n?void 0:n.i,o=i.length>0,c="sm"===s?"text-[11px]":"md"===s?"text-[12px]":"text-[13px]",d=E(e=>{var l,t;let s=i[e];return(0,r.jsx)("div",{className:"".concat(c,"  tree-wrapper"),children:(0,r.jsx)(K,{name:s,item:null==n?void 0:null===(t=n.p)||void 0===t?void 0:null===(l=t.v)||void 0===l?void 0:l[s]})},a+"-"+e)});return o?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{className:"flex items-center justify-between",children:(0,r.jsx)("span",{children:"props"})}),(0,r.jsx)(z.q,{y:1}),(0,r.jsx)("div",{className:"w-full",children:i.map((e,l)=>d(l))}),(0,r.jsx)(F.j,{})]}):null};var ev=t(99900),ej=t(98931),ep=t(50607);let ef=()=>{let e=(0,p.U)(e=>e.select),l=(0,j.K)(e=>e.nodes),t=S.useShallowStableSelector(e=>e.state),s="sm"===t?"text-[11px]":"md"===t?"text-[12px]":"text-[13px]",n=l.find(l=>l.i===e),i=null==n?void 0:n._t,a=null==n?void 0:n._t,o=(0,ej.k)(e=>e.filter),d=(0,c.useMemo)(()=>Array.from(o).map(e=>+e),[o]),x=(0,ev.p)(e=>e.list),u=null==a?void 0:a[(null==a?void 0:a.length)-1];(null==u?void 0:u.startsWith("@my-react"))?a=null==a?void 0:a.slice(0,-1):u=void 0;let m=null==a?void 0:a[(null==a?void 0:a.length)-1];(null==m?void 0:m.startsWith("@my-react"))?a=null==a?void 0:a.slice(0,-1):m=void 0;let h=(0,c.useMemo)(()=>null==a?void 0:a.map(e=>x.find(l=>l.i===e)),[x,a]),v=(0,c.useMemo)(()=>null==h?void 0:h.filter(e=>!(0,ep.VR)(e,d)),[d,h]),f=E(e=>{let l=null==v?void 0:v[e];return l?(0,r.jsx)("div",{className:"".concat(s," ml-2 "),children:(0,r.jsx)(ea,{node:l,withCollapse:!1})},l.i):null});return(null==i?void 0:i.length)?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{children:"renders"}),(0,r.jsx)(z.q,{y:1}),(0,r.jsxs)("div",{className:"w-full",children:[v.map((e,l)=>f(l)),m&&(0,r.jsx)("div",{className:"".concat(s," ml-2  px-[2px]"),children:m}),(0,r.jsx)("div",{className:"".concat(s," ml-2  px-[2px]"),children:u||"@my-react"})]}),(0,r.jsx)(F.j,{})]}):null},eg=()=>{let e=(0,p.U)(e=>e.select),l=(0,j.K)(e=>e.nodes),t=S.useShallowStableSelector(e=>e.state),s=l.find(l=>l.i===e),n=null==s?void 0:s._s;return(null==n?void 0:n.fileName)?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{children:"source"}),(0,r.jsx)(z.q,{y:1}),(0,r.jsx)("div",{className:"w-full",children:(0,r.jsx)("div",{className:"".concat("sm"===t?"text-[11px]":"md"===t?"text-[12px]":"text-[13px]"," ml-2  px-[2px] text-gray-600"),children:(null==n?void 0:n.fileName)+"".concat((null==n?void 0:n.lineNumber)?":"+(null==n?void 0:n.lineNumber):"")+"".concat((null==n?void 0:n.columnNumber)?":"+(null==n?void 0:n.columnNumber):"")})})]}):null},ew=()=>{var e,l,t;let s=(0,p.U)(e=>e.select),n=(0,j.K)(e=>e.nodes),i=S.useShallowStableSelector(e=>e.state),a=n.find(e=>e.i===s),o=Object.keys((null==a?void 0:null===(e=a.s)||void 0===e?void 0:e.t)!=="Null"&&(null==a?void 0:null===(l=a.s)||void 0===l?void 0:l.t)!=="Undefined"&&(null==a?void 0:null===(t=a.s)||void 0===t?void 0:t.v)||{}),c=null==a?void 0:a.i,d=o.length>0,x="sm"===i?"text-[11px]":"md"===i?"text-[12px]":"text-[13px]",u=E(e=>{var l,t;let s=o[e];return(0,r.jsx)("div",{className:"".concat(x,"  tree-wrapper"),children:(0,r.jsx)(K,{name:s,item:null==a?void 0:null===(t=a.s)||void 0===t?void 0:null===(l=t.v)||void 0===l?void 0:l[s]})},c+"-"+e)});return d?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{className:"flex items-center justify-between",children:(0,r.jsx)("span",{children:"states"})}),(0,r.jsx)(z.q,{y:1}),(0,r.jsx)("div",{className:"w-full",children:o.map((e,l)=>u(l))}),(0,r.jsx)(F.j,{})]}):null},eN=()=>{let{loading:e}=j.K.useShallowStableSelector(e=>({nodeList:e.nodes,loading:e.loading})),l=p.U.useShallowStableSelector(e=>e.select);return e?(0,r.jsx)("div",{className:"node-view h-full p-1 flex items-center justify-center",children:(0,r.jsx)(v.c,{color:"primary"})}):(0,r.jsx)("div",{className:"node-view h-full p-1",children:(0,r.jsxs)("div",{className:"group h-full overflow-auto",children:[(0,r.jsx)(em,{},l),(0,r.jsx)(eh,{},l),(0,r.jsx)(ew,{},l),(0,r.jsx)(X,{},l),(0,r.jsx)(D,{},l),(0,r.jsx)(ef,{},l),(0,r.jsx)(eg,{},l),(0,r.jsx)(C,{},l)]})})};var ey=t(17931),eS=t(78290);let eb=function(e){let l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200,[t,s]=(0,c.useState)(e);return[t,(0,c.useMemo)(()=>(0,R.debounce)(s,l),[l])]},ek=[],eA={width:0,height:0,left:0,right:0,top:0,bottom:0,x:0,y:0};var eC=t(8071),ez=t(77425),eF=t(3333),eR=t(98413),eE=t(39589),eO=t(34648),eM=t(35485),eI=t(71640),eq=t(62810),eT=t(33068),eU=t(15896),eP=t(84281),e_=t(38835),eK=t(19840),eL=t(97606);let{setSelect:eV}=p.U.getActions(),{toggleHoverOnBrowser:eW}=e_.Z.getActions(),eB=(0,c.memo)(e=>{var l;let{handle:t}=e,[s,n]=(0,c.useState)(""),i=(0,ev.p)(e=>e.list),[a,o]=(0,c.useState)(0),[x,u]=(0,c.useState)([]),[m,h]=(0,c.useState)([]),v=(0,ee.i)(e=>e.map),j=e_.Z.useShallowStableSelector(e=>e.state.enableHoverOnBrowser),p=x[a],g=null===(l=m[p])||void 0===l?void 0:l.i;return(0,c.useEffect)(()=>{o(0),u([])},[s]),(0,c.useEffect)(()=>{void 0!==p&&(null==t||t.scrollToIndex({index:p}),eV(g,!0))},[p,t,g]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(G.e,{content:"hover on the browser",showArrow:!0,color:"foreground",children:(0,r.jsx)(J.A,{isIconOnly:!0,variant:"flat",onPress:eW,children:(0,r.jsx)(f.Ymj,{height:"14",className:j?"text-green-400":"text-gray-400"})})}),(0,r.jsx)(z.q,{x:2}),(0,r.jsx)("form",{onSubmit:e=>{var l;if(null==e||null===(l=e.preventDefault)||void 0===l||l.call(e),s){o(0);let e=i.map(e=>({...e,_name:v[e.n]})),l=e.map((e,l)=>e._name.includes(s)?l:-1).filter(e=>-1!==e);h(e),u(l),0===l.length?d.Am.error("Can't find current name",{position:"top-right"}):d.Am.success("Find ".concat(l.length," items"),{position:"top-right"})}},children:(0,r.jsx)(eL.Y,{placeholder:"Search component",className:"w-full",value:s,variant:"flat",onChange:e=>n(e.target.value),endContent:(0,r.jsx)("button",{className:"focus:outline-none",type:"submit",children:(0,r.jsx)(f._Ve,{className:"text-black/50 dark:text-white/90 text-slate-400 flex-shrink-0"})})})}),x.length>1&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(z.q,{x:2}),(0,r.jsxs)(Y.g,{variant:"flat",children:[(0,r.jsx)(G.e,{content:"Total ".concat(x.length,", current ").concat(a+1),showArrow:!0,color:"foreground",children:(0,r.jsx)(J.A,{isIconOnly:!0,onPress:()=>o(e=>(e-1+x.length)%x.length),isDisabled:0===a,children:(0,r.jsx)(f.Hf3,{})})}),(0,r.jsx)(G.e,{content:"Total ".concat(x.length,", current ").concat(a+1),showArrow:!0,color:"foreground",children:(0,r.jsx)(J.A,{isIconOnly:!0,onPress:()=>o(e=>(e+1)%x.length),isDisabled:a===x.length-1,children:(0,r.jsx)(f.veu,{})})})]})]})]})});eB.displayName="TreeViewSearch";let eD=ej.k.getActions().onChange,eH=O.W.getActions().toggleEnable,eZ=(0,c.memo)(e=>{let{handle:l}=e,{isOpen:t,onOpen:s,onClose:i,onOpenChange:a}=(0,eC.q)(),{theme:c,setTheme:d}=(0,o.F)(),{state:x,setEnableHover:u,setEnableUpdate:m,toggleEnableRetrigger:h}=(0,e_.Z)(),{state:v,setUISize:j}=S(),p=(0,O.W)(e=>e.enable),{state:g,cb:w}=(0,eK.$)(e=>({state:e.state,cb:e.cb})),N=(0,ej.k)(e=>e.filter);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"fixed top-3 right-3 z-10 flex",children:[(0,r.jsx)(eB,{handle:l}),(0,r.jsx)(z.q,{x:2}),(0,r.jsxs)(Y.g,{variant:"flat",children:[(0,r.jsx)(G.e,{content:(0,r.jsx)("p",{className:g?"text-green-400":"text-red-400",children:g?"DevTool Connect":"DevTool DisConnect"}),showArrow:!0,children:(0,r.jsx)(J.A,{isIconOnly:!0,onPress:()=>null==w?void 0:w(),disabled:g,children:g?(0,r.jsx)(f.NhS,{className:"text-green-500"}):(0,r.jsx)(f.xrR,{className:" text-red-500"})})}),(0,r.jsx)(J.A,{isIconOnly:!0,onPress:()=>d("dark"===c?"light":"dark"),children:"dark"===c?(0,r.jsx)(f.kLh,{className:"text-gray-500"}):(0,r.jsx)(f.NWY,{className:"text-orange-500"})}),(0,r.jsx)(G.e,{content:"Setting",showArrow:!0,color:"foreground",children:(0,r.jsx)(J.A,{isIconOnly:!0,onPress:s,children:(0,r.jsx)(f.UG6,{className:t?"text-green-500":"text-gray-500"})})})]})]}),(0,r.jsx)(ez.R,{isOpen:t,size:"2xl",onClose:i,onOpenChange:a,placement:"top",children:(0,r.jsxs)(eF.A,{children:[(0,r.jsx)(eR.k,{children:(0,r.jsxs)("h3",{className:"text-[1em]",children:["Setting - ",(0,r.jsx)(eE.z,{children:"@my-react/devtool"})]})}),(0,r.jsxs)(eO.I,{className:"text-[14px]",children:[(0,r.jsxs)("div",{className:"flex flex-col gap-y-4",children:[(0,r.jsxs)("div",{className:"flex flex-col gap-y-2",children:[(0,r.jsx)("p",{className:"whitespace-nowrap text-[14px] text-foreground-500",children:"Filter Node: "}),(0,r.jsx)("div",{className:"flex items-center",children:(0,r.jsx)(eM.g,{selectionMode:"multiple",placeholder:"Select a Type",selectedKeys:N,"aria-label":"Filter Node",className:"flex items-center",onChange:e=>{eD(new Set(e.target.value.split(",")))},children:R.typeKeys.map(e=>(0,r.jsx)(eI.R,{value:e,children:(0,R.getTypeName)(e)},e))})})]}),(0,r.jsx)(F.j,{}),(0,r.jsxs)("div",{className:"flex flex-col gap-y-2",children:[(0,r.jsx)("p",{className:"whitespace-nowrap text-[14px] text-foreground-500",children:"UI Size: "}),(0,r.jsxs)(eq.X,{value:v,onValueChange:e=>j(e),orientation:"horizontal",classNames:{wrapper:"gap-x-6"},children:[(0,r.jsx)(eT.J,{value:n.sm,children:"Small Size"}),(0,r.jsx)(eT.J,{value:n.md,children:"Medium Size"}),(0,r.jsx)(eT.J,{value:n.lg,children:"Large Size"})]})]}),(0,r.jsx)(F.j,{}),(0,r.jsxs)("div",{className:"flex flex-col gap-y-2",children:[(0,r.jsx)("p",{className:"whitespace-nowrap text-[14px] text-foreground-500",children:"Config: "}),(0,r.jsx)(eU.K,{isSelected:x.enableUpdate,radius:"full",onValueChange:m,color:"primary",children:(0,r.jsxs)("div",{className:"flex items-center",children:["Highlight Update",(0,r.jsxs)("div",{className:"ml-4 gap-x-2 flex",children:[(0,r.jsx)(H.z,{style:{backgroundColor:R.color.update,mixBlendMode:"difference"},children:"update"}),(0,r.jsx)(H.z,{style:{backgroundColor:R.color.append,mixBlendMode:"difference"},children:"append"}),(0,r.jsx)(H.z,{style:{backgroundColor:R.color.setRef,mixBlendMode:"difference"},children:"setRef"}),(0,r.jsx)(H.z,{style:{backgroundColor:R.color.warn,mixBlendMode:"difference"},children:"warn"})]})]})}),(0,r.jsx)(eU.K,{isSelected:x.enableHover,radius:"full",onValueChange:u,color:"secondary",children:"Hover Overlay"}),(0,r.jsx)(eU.K,{isSelected:x.enableRetrigger,radius:"full",onValueChange:h,color:"warning",children:"Retrigger Status"}),(0,r.jsx)(eU.K,{isSelected:p,radius:"full",onValueChange:eH,color:"default",children:"Extend Node Detail"})]})]}),(0,r.jsx)(z.q,{y:4})]}),(0,r.jsx)(eP.R,{children:(0,r.jsx)(J.A,{onPress:i,children:"Close"})})]})})]})});eZ.displayName="TreeViewSetting";let eX=(0,R.debounce)((e,l,t)=>{let s=Array.from(e.querySelectorAll("[data-depth]")),n=e.clientWidth,r=l.current||12;for(let e of(n>t.current&&(r=12),t.current=n,s)){var i;let l=parseInt(e.getAttribute("data-depth")||"0",10)||0;0!==l&&(r=Math.min(r,Math.max(0,n-((null===(i=e.querySelector("[data-content]"))||void 0===i?void 0:i.clientWidth)||0)-6)/l))}l.current=r,e.style.setProperty("--indentation-size","".concat(r,"px")),e.style.setProperty("--width-size","".concat(n,"px"))},16),eY=(0,c.memo)(e=>{let{onScroll:l,data:t,onMount:s}=e,[i,a]=(0,c.useState)(!1),o=(0,c.useRef)(null),[d]=(0,c.useState)(()=>{let e=p.U.getReadonlyState().select,l=t.findIndex(l=>l.i===e);return -1===l?0:l}),x=(0,c.useRef)(t);x.current=t;let u=S.useShallowStableSelector(e=>e.state),m=E((e,l,s)=>{let{isScrolling:i}=s,a=t[e];return a?(0,r.jsx)(ea,{node:a,isScrolling:i,className:u===n.sm?"text-[12px]":u===n.md?"text-[14px]":"text-[16px]"}):null});return(0,c.useEffect)(()=>{0!==d&&setTimeout(l)},[d,l]),(0,c.useEffect)(()=>p.U.subscribe(e=>e.scroll,()=>{var e,l;let t=p.U.getReadonlyState().select,s=null===(e=x.current)||void 0===e?void 0:e.findIndex(e=>e.i===t);-1!==s&&(null===(l=o.current)||void 0===l||l.scrollIntoView({index:s,align:"center"}))}),[]),(0,c.useEffect)(()=>(s(o.current),()=>s()),[s]),(0,r.jsx)(ey.OO,{ref:o,increaseViewportBy:500,isScrolling:a,initialTopMostItemIndex:{index:d,align:"center"},context:{isScrolling:i},onScroll:l,totalCount:t.length,itemContent:m})});eY.displayName="TreeViewImpl";let eG=(0,c.memo)(()=>{let e=(0,c.useRef)(null),l=ev.p.useShallowStableSelector(e=>e.list),{width:t,height:s}=function(e){let{ref:l,cssSelector:t,getEle:s,deps:n}=e,r=(0,c.useRef)(s);r.current=s;let[i,a]=eb(eA,100);return(0,eS.L)(()=>{var e;let s=l?l.current:t?document.querySelector(t):(null===(e=r.current)||void 0===e?void 0:e.call(r))||null;if(s){if(window.ResizeObserver){let e=new ResizeObserver(()=>{a(s.getBoundingClientRect())});return e.observe(s),()=>e.disconnect()}{let e=()=>a(s.getBoundingClientRect());return e(),window.addEventListener("resize",e,{passive:!0}),()=>window.removeEventListener("resize",e)}}},[l,t,a,...n||ek]),i}({ref:e}),[n,i]=(0,c.useState)(),a=(0,c.useRef)(12),o=(0,c.useRef)(t),d=(0,c.useCallback)(()=>{e.current&&eX(e.current,a,o)},[]);return(0,c.useEffect)(()=>(d(),p.U.subscribe(e=>e.scroll,()=>setTimeout(d,20))),[t,s,l.length,d]),(0,r.jsx)("div",{className:"tree-view h-full p-1",children:(0,r.jsxs)("div",{className:"group h-full transform-gpu",ref:e,children:[l.length>0&&(0,r.jsx)(eY,{onScroll:d,data:l,onMount:i}),(0,r.jsx)(eZ,{handle:n})]})})});function eJ(){let e=(0,eK.$)(e=>e.error),{theme:l}=(0,o.F)();return(0,c.useEffect)(()=>{e&&d.Am.error(e,{position:"top-right"})},[e]),(0,r.jsxs)("main",{className:"flex p-1 h-screen",children:[(0,r.jsx)(a(),{children:(0,r.jsx)("title",{children:"@my-react devtools"})}),(0,r.jsx)(d.x7,{richColors:!0,theme:"dark"===l?"dark":"light"}),(0,r.jsx)(h,{left:(0,r.jsx)(eG,{}),right:(0,r.jsx)(eN,{})})]})}eG.displayName="TreeView"}},function(e){e.O(0,[111,7028,9774,2888,179],function(){return e(e.s=30803)}),_N_E=e.O()}]);