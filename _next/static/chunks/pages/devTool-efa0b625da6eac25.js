(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2374],{78582:function(e,l,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/devTool",function(){return t(34306)}])},34306:function(e,l,t){"use strict";t.r(l),t.d(l,{default:function(){return eW}});var s,n,r=t(20217),i=t(12518),a=t.n(i),o=t(45386),c=t(89589),d=t(31038),x=t(7850),u=t(61259),h=t(57960);let m=e=>{let{left:l,right:t}=e;return(0,r.jsx)(x.w,{className:"w-full",radius:"sm",children:(0,r.jsx)(u.G,{className:"w-full p-0",children:(0,r.jsxs)(h.oL,{children:[l,t]})})})};var v=t(33135),j=t(7767),p=t(58039),f=t(71854),g=t(92605),w=t(52376),N=t(79362);(s=n||(n={})).sm="sm",s.md="md",s.lg="lg";let y=(0,N.eK)(()=>({state:"sm"}),{withActions:e=>({setUISize:l=>e.state=l}),withDeepSelector:!1}),{close:S,setStore:b}=w.a.getActions(),k=(0,c.memo)(()=>{let{state:e,position:l}=(0,w.a)(e=>e),t=y.useShallowStableSelector(e=>e.state),s="sm"===t?11:"md"===t?12:13;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"fixed w-screen h-screen top-0 left-0",onContextMenu:e=>{e.preventDefault(),S()},style:{display:e?"block":"none"},onClick:S}),(0,r.jsx)("div",{className:"fixed z-10 ".concat("sm"===t?"text-[11px]":"md"===t?"text-[12px]":"text-[13px]"),style:{top:l.y+4,left:l.x+4},children:(0,r.jsx)(f.M,{initial:!1,mode:"wait",children:e&&(0,r.jsx)(g.E.div,{className:"context-menu bg-white border border-gray-200 rounded shadow-md py-1",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:(0,r.jsxs)("div",{className:"context-menu-item px-2 py-1 cursor-pointer select-none flex justify-center items-center node-item-hover",onClick:async()=>{b(),await new Promise(e=>setTimeout(e,100)),S(),d.Am.success("Stored as global variable success!",{position:"top-right"})},children:[(0,r.jsx)(p.FMB,{className:"mr-2",width:s,height:s}),(0,r.jsx)("span",{children:"Store as global variable"})]})},"context-menu")})})]})});k.displayName="ContextMenu";var A=t(61865),C=t(91837);let z=e=>{let l=(0,c.useRef)(e);return l.current=e,(0,c.useCallback)(function(){for(var e,t,s=arguments.length,n=Array(s),r=0;r<s;r++)n[r]=arguments[r];return n.length?null===(e=l.current)||void 0===e?void 0:e.call(l,...n):null===(t=l.current)||void 0===t?void 0:t.call(l)},[])};var O=t(99740),F=t(97417),R=t(8071),M=t(45460),q=t(46329),E=t(95612),I=t(45691);let T=e=>{let l=(0,c.useRef)();return(0,c.useEffect)(()=>{l.current=e},[e]),l.current},_=e=>{let l=null==e?void 0:e.v,t=null==e?void 0:e.t;if("Element"===t||"Date"===t||"Boolean"===t||"Error"===t||"Number"===t||"Symbol"===t)return l;if((null==e?void 0:e.l)===!1)return"Array"===e.t||"Set"===e.t?"[…]":"Map"===e.t||"Object"===e.t?"{…}":"…";if(null!==l&&"object"==typeof l&&!Array.isArray(l)&&"function"==typeof l[window.Symbol.iterator])return"(…)";if(Array.isArray(l))return l.length>0?"[…]":"[]";if("Null"===t)return"null";if("Undefined"===t)return"undef";if("object"==typeof l)return Object.keys(l).length>0?"{…}":"{}";if("Function"===t)return"".concat(l.substr(0,10)+(l.length>10?"…":""));if("string"!=typeof l)return l;else return"String"===t?'"'.concat(l.substr(0,10)+(l.length>10?"…":""),'"'):"".concat(l.substr(0,10)+(l.length>10?"…":""))};function P(e,l){if("Object"===e){let e=Object.keys(l),t=e.slice(0,3).map(e=>"".concat(e,": ").concat(_(l[e]))).concat(e.length>3?["…"]:[]).join(", ");return"{ ".concat(t," }")}if("Array"!==e)return e;{let e=l.slice(0,4).map(e=>_(e)).concat(l.length>4?["…"]:[]).join(", ");return"[".concat(e,"]")}}var L=t(38471);let{open:K,setId:V}=w.a.getActions(),B=e=>{var l,t,s,n;let{name:i,item:a,prefix:o}=e,[d,x]=(0,c.useState)(!1),u=(0,c.useRef)(!1),[h,m]=(0,c.useState)(""),{isOpen:j,onOpen:f,onClose:g,onOpenChange:w}=(0,R.q)(),N=I.F.useShallowSelector(e=>{var l,t;return null===(t=e.data)||void 0===t?void 0:null===(l=t[(null==a?void 0:a.i)||""])||void 0===l?void 0:l.loaded}),y=null!==(l=null==N?void 0:N.v)&&void 0!==l?l:null==a?void 0:a.v,S=T(y),b=null!=y?y:S,k=null!==(t=null==N?void 0:N.n)&&void 0!==t?t:null==a?void 0:a.n,A=null!==(s=null==N?void 0:N.t)&&void 0!==s?s:null==a?void 0:a.t,C=null!==(n=null==N?void 0:N.c)&&void 0!==n?n:null==a?void 0:a.c,z=(0,c.useMemo)(()=>{if(k)return k;if("Array"===A||"Set"===A||"Map"===A){let e=P("Array",null!=b?b:[]);return"Set"===A||"Map"===A?"".concat(A,"(").concat(e,")"):e}if("Iterable"===A||"Object"===A)return P("Object",null!=b?b:{})},[A,k,b]);(0,c.useEffect)(()=>{d&&(null==a?void 0:a.l)===!1&&a.i&&(!N||N.i!==a.i)&&I.F.getActions().setLoading(a.i),d&&(u.current=!0)},[N,d,null==a?void 0:a.i,null==a?void 0:a.l]),(0,c.useEffect)(()=>{d&&b&&(Array.isArray(b)?b.forEach(e=>{var l,t;!e.e||!e.i||e.l||(null===(t=I.F.getReadonlyState().data)||void 0===t?void 0:null===(l=t[e.i])||void 0===l?void 0:l.loaded)||I.F.getActions().setLoading(e.i)}):Object.values(b).forEach(e=>{var l,t;!e.e||!e.i||e.l||(null===(t=I.F.getReadonlyState().data)||void 0===t?void 0:null===(l=t[e.i])||void 0===l?void 0:l.loaded)||I.F.getActions().setLoading(e.i)}))},[b,d]);let O=e=>{b&&a&&(e.preventDefault(),K({x:e.clientX,y:e.clientY}),V(a.i))};if(!a)return null;let F=a.e,_=d?(0,r.jsx)(p.AS7,{width:"16",height:"16"}):(0,r.jsx)(p.VZf,{width:"16",height:"16"});if(F)return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"hook-value-view",children:[(0,r.jsxs)("div",{className:"flex w-full my-0.5 items-center",children:[(0,r.jsx)("span",{className:"text-gray-400 hover:text-gray-700",onClick:()=>x(!d),children:_}),o,(0,r.jsxs)("div",{className:"max-w-full line-clamp-1 break-all",children:[(0,r.jsx)("span",{className:"cursor-pointer select-none",onClick:()=>x(!d),onContextMenu:O,children:i}),": ",(0,r.jsx)("span",{className:"hook-value-placeholder",children:b?z:(0,r.jsx)(p.nWS,{className:"inline-block"})})]})]}),(C?d:u.current||d)&&(0,r.jsx)("div",{className:"".concat(d?"block":"hidden"," ml-6 my-0.5"),children:b?Array.isArray(b)?(0,r.jsx)(r.Fragment,{children:b.map((e,l)=>(0,r.jsx)(B,{name:l.toString(),item:e},l))}):(0,r.jsx)(r.Fragment,{children:Object.keys(b).sort().reverse().map(e=>(0,r.jsx)(B,{name:e,item:b[e]},e))}):(0,r.jsx)(v.c,{size:"sm"})})]})});{let e="String"===a.t?'"'.concat(String(a.v),'"'):String(a.v),l="ReadError"===a.t,t="Function"===a.t,s=(0,r.jsx)("span",{className:"hook-".concat(a.t," ").concat(l?"text-red-300":""),children:e});return(0,r.jsxs)("div",{className:"hook-value-view",children:[(0,r.jsxs)("div",{className:"flex w-full my-0.5 items-center",children:[(0,r.jsx)("span",{className:"text-transparent",children:_}),o,(0,r.jsxs)("div",{className:"w-full relative line-clamp-1 break-all ".concat(t?"pr-8":"pr-2"),children:[(0,r.jsx)("span",{className:"cursor-pointer select-none",onContextMenu:O,children:i}),": ",(0,r.jsx)("span",{className:"hook-value-placeholder",children:s}),t&&(0,r.jsx)("span",{children:(0,r.jsx)(p.dNJ,{className:"absolute right-2 top-0 cursor-pointer",onClick:()=>{m(a.v),f()}})})]})]}),(0,r.jsx)(M.R,{isOpen:j,size:"2xl",onClose:g,onOpenChange:w,children:(0,r.jsx)(q.A,{children:(0,r.jsx)(E.I,{className:"p-4",children:(0,r.jsx)(L.j,{code:h})})})})]})}},D=e=>{let{select:l}=e,t=(0,O.R)(e=>{var t;return null===(t=e.warn)||void 0===t?void 0:t[l||""]}),s=y.useShallowStableSelector(e=>e.state),n="sm"===s?"text-[11px]":"md"===s?"text-[12px]":"text-[13px]",i=z((e,l)=>(0,r.jsx)("div",{className:"".concat(n,"  tree-wrapper"),children:(0,r.jsx)(B,{name:e.toString(),item:l})},e));return(null==t?void 0:t.length)>0?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{className:"flex items-center justify-between",children:(0,r.jsx)("span",{children:"warn"})}),(0,r.jsx)(A.q,{y:1}),(0,r.jsx)("div",{className:"w-full",children:null==t?void 0:t.map((e,l)=>i(l,e))}),(0,r.jsx)(C.j,{})]}):null},U=e=>{let{select:l}=e,t=(0,O.R)(e=>{var t;return null===(t=e.error)||void 0===t?void 0:t[l||""]}),s=y.useShallowStableSelector(e=>e.state),n="sm"===s?"text-[11px]":"md"===s?"text-[12px]":"text-[13px]",i=z((e,l)=>(0,r.jsx)("div",{className:"".concat(n,"  tree-wrapper"),children:(0,r.jsx)(B,{name:e.toString(),item:l})},e));return(null==t?void 0:t.length)>0?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{className:"flex items-center justify-between",children:(0,r.jsx)("span",{children:"error"})}),(0,r.jsx)(A.q,{y:1}),(0,r.jsx)("div",{className:"w-full",children:null==t?void 0:t.map((e,l)=>i(l,e))}),(0,r.jsx)(C.j,{})]}):null},W=()=>{let e=(0,F.O)(e=>e.select);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(D,{select:e},e),(0,r.jsx)(U,{select:e},e)]})};var H=t(49337);let Z=e=>{var l;let{item:t}=e,[s,n]=(0,c.useState)(!1),i=t.h,a=s?(0,r.jsx)(p.AS7,{width:"16",height:"16"}):(0,r.jsx)(p.VZf,{width:"16",height:"16"});return i?(0,r.jsx)(B,{name:t.n,item:t.v,prefix:(0,r.jsx)(H.z,{classNames:{content:"p-0"},size:"sm",className:"rounded-sm text-center mr-1 flex-shrink-0 font-[300] !px-1 text-gray-800 dark:text-gray-200 !h-[1.4em] !max-w-[initial] !min-w-[initial]",children:t.i})}):(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"hook-stack-view",children:[(0,r.jsxs)("div",{className:"flex w-full my-0.5",children:[(0,r.jsx)("span",{className:"text-gray-400 hover:text-gray-700",onClick:()=>n(!s),children:a}),(0,r.jsx)("div",{className:"max-w-full line-clamp-1 cursor-pointer",onClick:()=>n(!s),children:t.n}),":"]}),(0,r.jsx)("div",{className:"".concat(s?"block":"hidden"," ml-4 my-0.5"),children:null===(l=t.c)||void 0===l?void 0:l.map((e,l)=>(0,r.jsx)(Z,{item:e},e.n+"-"+l))})]})})},J=()=>{let e=(0,F.O)(e=>e.select),l=(0,j.K)(e=>e.nodes),t=y.useShallowStableSelector(e=>e.state),s=l.find(l=>l.i===e),n=null==s?void 0:s.i,i=(null==s?void 0:s._h)||[];return i.length>0?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{className:"flex items-center justify-between",children:(0,r.jsx)("span",{children:"hooks"})}),(0,r.jsx)(A.q,{y:1}),(0,r.jsx)("div",{className:"w-full ".concat("sm"===t?"text-[11px]":"md"===t?"text-[12px]":"text-[13px]"," tree-wrapper"),children:i.map((e,l)=>(0,r.jsx)(Z,{item:e},n+"-"+l))}),(0,r.jsx)(C.j,{})]}):null};var X=t(71885),Y=t(59773),G=t(22241),$=t(10715),Q=t(49545),ee=t(92984),el=t(41008);let{setSelect:et,setClose:es,setHover:en}=F.O.getActions(),er=(0,c.memo)(e=>{let{node:l}=e,t=(0,$.getFiberTag)(l);return(null==t?void 0:t.length)?(0,r.jsx)("div",{className:" gap-x-[2px] flex items-center",children:t.map(e=>(0,r.jsx)(H.z,{size:"sm",color:e.includes("compiler")?"primary":void 0,radius:"none",className:"rounded-md capitalize text-[8px] h-[14px]",children:e},e))}):null});er.displayName="RenderTag";let ei=(0,c.memo)(e=>{let{node:l,isScrolling:t}=e,s=(0,ee.i)((0,c.useCallback)(e=>{var t;return null===(t=e.map)||void 0===t?void 0:t[l.k]},[l.k]));return(0,r.jsxs)("div",{"data-key":!0,className:"flex items-center gap-x-[1px] text-[12px]",children:[(0,r.jsx)("div",{className:" text-[#40af2c]",children:"key"}),(0,r.jsx)("div",{className:" text-gray-400",children:"="}),(0,r.jsxs)("div",{className:"flex",children:['"',t?(0,r.jsx)("div",{className:"text-gray-600 max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap",children:s}):(0,r.jsx)(Y.e,{content:s,delay:800,showArrow:!0,color:"foreground",children:(0,r.jsx)("div",{className:"text-gray-600 max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap",children:s})}),'"']})]})});ei.displayName="RenderKey";let ea=e=>{let{node:l,isScrolling:t,className:s,withKey:n=!0,withTag:i=!0,withHMR:a=!0,withSelect:o=!0,withTrigger:d=!0,withCollapse:x=!0}=e,u=(0,el.P)((0,c.useCallback)(e=>{var t;return null===(t=e.state)||void 0===t?void 0:t[l.i]},[l.i])),{hmrCount:h,hmrStatus:m}=(0,Q.m)((0,c.useCallback)(e=>{var t,s;return{hmrCount:null===(t=e.state)||void 0===t?void 0:t[l.i],hmrStatus:null===(s=e.status)||void 0===s?void 0:s[l.i]}},[l.i])),v=(0,O.R)((0,c.useCallback)(e=>{var t;return null===(t=e.state)||void 0===t?void 0:t[l.i]},[l.i])),{error:j,warn:f}=O.R.useShallowSelector(e=>{var t,s,n,r;return{error:null===(s=e.error)||void 0===s?void 0:null===(t=s[l.i])||void 0===t?void 0:t.length,warn:null===(r=e.warn)||void 0===r?void 0:null===(n=r[l.i])||void 0===n?void 0:n.length}},(e,l)=>e.error===l.error&&e.warn===l.warn),g=(0,ee.i)((0,c.useCallback)(e=>e.map[l.n],[l.n])),{select:w,closeList:N,selectList:y}=F.O.useShallowStableSelector(e=>({select:e.select,closeList:e.closeList,selectList:e.selectList})),S=o&&l.i===w,b=x&&(null==N?void 0:N[l.i]),k=(0,c.useMemo)(()=>o&&w&&!S&&(null==y?void 0:y[l.i]),[o,w,S,y,l.i]),C=Array.isArray(null==l?void 0:l.c),z=C?b?(0,r.jsx)(p.VZf,{width:16,height:16}):(0,r.jsx)(p.AS7,{width:16,height:16}):null,R=l._d||0;return(0,r.jsx)("div",{id:"node-"+l.i.toString(),"data-depth":R,onClick:()=>{o&&et(l.i)},onMouseEnter:()=>{o&&en(l.i)},onMouseLeave:()=>{o&&en("")},className:"w-full h-full node-item cursor-pointer transition-transform-background rounded-sm select-none "+(s||"")+"".concat(o?k?" node-item-select-hover":" node-item-hover":"")+"".concat(k?" node-item-select":"")+"".concat(S?" node-item-selected":""),children:(0,r.jsxs)("div",{className:"flex items-center h-full w-full px-[2px] relative",children:[S&&(0,r.jsx)("div",{className:"absolute top-0 left-[1px] h-full border-l-2 border-blue-400 rounded-sm pointer-events-none"}),(0,r.jsx)("div",{className:"flex-grow",style:{width:"calc(100%-calc(".concat(R,"*var(--indentation-size)))"),marginLeft:"calc(".concat(R," * var(--indentation-size)")},children:(0,r.jsxs)("div",{"data-content":!0,className:"flex items-center w-fit",children:[x&&(0,r.jsx)("span",{className:" text-gray-400 min-w-[18px]"+(C?" hover:text-gray-700":""),onClick:e=>{e.stopPropagation(),es(l.i)},children:C?t?z:(0,r.jsx)(Y.e,{content:b?"Toggle to open":"Toggle to close",delay:800,showArrow:!0,color:"foreground",children:z}):null}),(0,r.jsx)("p",{className:"node-name line-clamp-1",children:g}),i&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(A.q,{x:1}),(0,r.jsx)(er,{node:l})]}),d&&u>0&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(A.q,{x:1}),(0,r.jsx)(Y.e,{content:"trigger update",showArrow:!0,color:"primary",children:(0,r.jsx)(H.z,{size:"sm",radius:"none",color:"primary",className:"rounded-md capitalize text-[8px] h-[14px]",children:u})})]}),a&&h>0&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(A.q,{x:1}),(0,r.jsx)(Y.e,{content:m?"hmr update with ~".concat($.HMRStatus[m],"~"):"hmr update",showArrow:!0,color:"success",children:(0,r.jsx)(H.z,{size:"sm",radius:"none",color:"success",className:"rounded-md capitalize text-[8px] h-[14px]",children:h})})]}),v&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(A.q,{x:1}),(0,r.jsx)(H.z,{size:"sm",radius:"none",color:"warning",className:"rounded-md capitalize text-[8px] h-[14px]",children:v})]}),f&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(A.q,{x:1}),(0,r.jsx)(H.z,{size:"sm",radius:"none",color:"warning",className:"rounded-md capitalize text-[8px] h-[14px]",children:f})]}),j&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(A.q,{x:1}),(0,r.jsx)(H.z,{size:"sm",radius:"none",color:"danger",className:"rounded-md capitalize text-[8px] h-[14px]",children:j})]}),n&&l.k&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(A.q,{x:1}),(0,r.jsx)(ei,{node:l,isScrolling:t})]})]})})]})})},{forceReload:eo,storeFiber:ec,triggerFiber:ed,scrollIntoView:ex}=F.O.getActions(),eu=()=>{let e=(0,F.O)(e=>e.select),l=(0,j.K)(e=>e.nodes),t=y.useShallowStableSelector(e=>e.state),s=l.find(l=>l.i===e);return s?(0,r.jsxs)("div",{className:"p-2 ".concat("sm"===t?"text-[15px]":"md"===t?"text-[16px]":"text-[17px]"," sticky top-0 bg-content1 transition-transform-background z-50"),children:[(0,r.jsx)(ea,{node:s,withCollapse:!1,withSelect:!1,withKey:!1}),(0,r.jsxs)(X.g,{className:"absolute right-4 top-0",children:[(0,r.jsx)(Y.e,{content:"force scroll to select",showArrow:!0,color:"foreground",placement:"bottom-end",children:(0,r.jsx)(G.A,{isIconOnly:!0,size:"sm",variant:"flat",onPress:ex,children:(0,r.jsx)(p.TCQ,{width:"11",height:"11"})})}),(0,r.jsx)(Y.e,{content:"store fiber node",showArrow:!0,color:"foreground",placement:"bottom-end",children:(0,r.jsx)(G.A,{isIconOnly:!0,size:"sm",variant:"flat",onPress:ec,children:(0,r.jsx)(p.FMB,{width:"11",height:"11"})})}),(0,r.jsx)(Y.e,{content:"force trigger",showArrow:!0,color:"foreground",placement:"bottom-end",children:(0,r.jsx)(G.A,{isIconOnly:!0,size:"sm",variant:"flat",onPress:ed,children:(0,r.jsx)(p.o1U,{width:"11",height:"11"})})}),(0,r.jsx)(Y.e,{content:"force load",showArrow:!0,color:"foreground",placement:"bottom-end",children:(0,r.jsx)(G.A,{isIconOnly:!0,size:"sm",variant:"flat",onPress:eo,children:(0,r.jsx)(p.BGW,{width:"10",height:"10"})})})]}),(0,r.jsx)(C.j,{})]}):null},eh=()=>{var e;let l=(0,F.O)(e=>e.select),t=(0,j.K)(e=>e.nodes),s=y.useShallowStableSelector(e=>e.state),n=t.find(e=>e.i===l),i=Object.keys((null==n?void 0:null===(e=n.p)||void 0===e?void 0:e.v)||{}),a=null==n?void 0:n.i,o=i.length>0,c="sm"===s?"text-[11px]":"md"===s?"text-[12px]":"text-[13px]",d=z(e=>{var l,t;let s=i[e];return(0,r.jsx)("div",{className:"".concat(c,"  tree-wrapper"),children:(0,r.jsx)(B,{name:s,item:null==n?void 0:null===(t=n.p)||void 0===t?void 0:null===(l=t.v)||void 0===l?void 0:l[s]})},a+"-"+e)});return o?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{className:"flex items-center justify-between",children:(0,r.jsx)("span",{children:"props"})}),(0,r.jsx)(A.q,{y:1}),(0,r.jsx)("div",{className:"w-full",children:i.map((e,l)=>d(l))}),(0,r.jsx)(C.j,{})]}):null};var em=t(32465),ev=t(83548),ej=t(34389);let ep=()=>{let e=(0,F.O)(e=>e.select),l=(0,j.K)(e=>e.nodes),t=y.useShallowStableSelector(e=>e.state),s="sm"===t?"text-[11px]":"md"===t?"text-[12px]":"text-[13px]",n=l.find(l=>l.i===e),i=null==n?void 0:n._t,a=null==n?void 0:n._t,o=(0,ev.k)(e=>e.filter),d=(0,c.useMemo)(()=>Array.from(o).map(e=>+e),[o]),x=(0,em.p)(e=>e.list),u=null==a?void 0:a[(null==a?void 0:a.length)-1];(null==u?void 0:u.startsWith("@my-react"))?a=null==a?void 0:a.slice(0,-1):u=void 0;let h=null==a?void 0:a[(null==a?void 0:a.length)-1];(null==h?void 0:h.startsWith("@my-react"))?a=null==a?void 0:a.slice(0,-1):h=void 0;let m=(0,c.useMemo)(()=>null==a?void 0:a.map(e=>x.find(l=>l.i===e)),[x,a]),v=(0,c.useMemo)(()=>null==m?void 0:m.filter(e=>!(0,ej.VR)(e,d)),[d,m]),p=z(e=>{let l=null==v?void 0:v[e];return l?(0,r.jsx)("div",{className:"".concat(s," ml-2 "),children:(0,r.jsx)(ea,{node:l,withCollapse:!1})},l.i):null});return(null==i?void 0:i.length)?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{children:"renders"}),(0,r.jsx)(A.q,{y:1}),(0,r.jsxs)("div",{className:"w-full",children:[v.map((e,l)=>p(l)),h&&(0,r.jsx)("div",{className:"".concat(s," ml-2  px-[2px]"),children:h}),(0,r.jsx)("div",{className:"".concat(s," ml-2  px-[2px]"),children:u||"@my-react"})]}),(0,r.jsx)(C.j,{})]}):null},ef=()=>{let e=(0,F.O)(e=>e.select),l=(0,j.K)(e=>e.nodes),t=y.useShallowStableSelector(e=>e.state),s=l.find(l=>l.i===e),n=null==s?void 0:s._s;return(null==n?void 0:n.fileName)?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{children:"source"}),(0,r.jsx)(A.q,{y:1}),(0,r.jsx)("div",{className:"w-full",children:(0,r.jsx)("div",{className:"".concat("sm"===t?"text-[11px]":"md"===t?"text-[12px]":"text-[13px]"," ml-2  px-[2px] text-gray-600"),children:(null==n?void 0:n.fileName)+"".concat((null==n?void 0:n.lineNumber)?":"+(null==n?void 0:n.lineNumber):"")+"".concat((null==n?void 0:n.columnNumber)?":"+(null==n?void 0:n.columnNumber):"")})})]}):null},eg=()=>{var e,l,t;let s=(0,F.O)(e=>e.select),n=(0,j.K)(e=>e.nodes),i=y.useShallowStableSelector(e=>e.state),a=n.find(e=>e.i===s),o=Object.keys((null==a?void 0:null===(e=a.s)||void 0===e?void 0:e.t)!=="Null"&&(null==a?void 0:null===(l=a.s)||void 0===l?void 0:l.t)!=="Undefined"&&(null==a?void 0:null===(t=a.s)||void 0===t?void 0:t.v)||{}),c=null==a?void 0:a.i,d=o.length>0,x="sm"===i?"text-[11px]":"md"===i?"text-[12px]":"text-[13px]",u=z(e=>{var l,t;let s=o[e];return(0,r.jsx)("div",{className:"".concat(x,"  tree-wrapper"),children:(0,r.jsx)(B,{name:s,item:null==a?void 0:null===(t=a.s)||void 0===t?void 0:null===(l=t.v)||void 0===l?void 0:l[s]})},c+"-"+e)});return d?(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("div",{className:"flex items-center justify-between",children:(0,r.jsx)("span",{children:"states"})}),(0,r.jsx)(A.q,{y:1}),(0,r.jsx)("div",{className:"w-full",children:o.map((e,l)=>u(l))}),(0,r.jsx)(C.j,{})]}):null},ew=()=>{let{loading:e}=j.K.useShallowStableSelector(e=>({nodeList:e.nodes,loading:e.loading}));return e?(0,r.jsx)("div",{className:"node-view h-full p-1 flex items-center justify-center",children:(0,r.jsx)(v.c,{color:"primary"})}):(0,r.jsx)("div",{className:"node-view h-full p-1",children:(0,r.jsxs)("div",{className:"group h-full overflow-auto",children:[(0,r.jsx)(eu,{}),(0,r.jsx)(eh,{}),(0,r.jsx)(eg,{}),(0,r.jsx)(J,{}),(0,r.jsx)(W,{}),(0,r.jsx)(ep,{}),(0,r.jsx)(ef,{}),(0,r.jsx)(k,{})]})})};var eN=t(17931),ey=t(39890);let eS=function(e){let l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200,[t,s]=(0,c.useState)(e);return[t,(0,c.useMemo)(()=>(0,$.debounce)(s,l),[l])]},eb=[],ek={width:0,height:0,left:0,right:0,top:0,bottom:0,x:0,y:0};var eA=t(8585),eC=t(39589),ez=t(84608),eO=t(71009),eF=t(62057),eR=t(76089),eM=t(23425),eq=t(71981),eE=t(30794),eI=t(89670),eT=t(69459);let{setSelect:e_}=F.O.getActions(),{toggleHoverOnBrowser:eP}=eE.Z.getActions(),eL=(0,c.memo)(e=>{var l;let{handle:t}=e,[s,n]=(0,c.useState)(""),i=(0,em.p)(e=>e.list),[a,o]=(0,c.useState)(0),[x,u]=(0,c.useState)([]),[h,m]=(0,c.useState)([]),v=(0,ee.i)(e=>e.map),j=eE.Z.useShallowStableSelector(e=>e.state.enableHoverOnBrowser),f=x[a],g=null===(l=h[f])||void 0===l?void 0:l.i;return(0,c.useEffect)(()=>{o(0),u([])},[s]),(0,c.useEffect)(()=>{void 0!==f&&(null==t||t.scrollToIndex({index:f}),e_(g,!0))},[f,t,g]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(Y.e,{content:"hover on the browser",showArrow:!0,color:"foreground",children:(0,r.jsx)(G.A,{isIconOnly:!0,variant:"flat",onPress:eP,children:(0,r.jsx)(p.Ymj,{height:"14",className:j?"text-green-400":"text-gray-400"})})}),(0,r.jsx)(A.q,{x:2}),(0,r.jsx)("form",{onSubmit:e=>{var l;if(null==e||null===(l=e.preventDefault)||void 0===l||l.call(e),s){o(0);let e=i.map(e=>({...e,_name:v[e.n]})),l=e.map((e,l)=>e._name.includes(s)?l:-1).filter(e=>-1!==e);m(e),u(l),0===l.length?d.Am.error("Can't find current name",{position:"top-right"}):d.Am.success("Find ".concat(l.length," items"),{position:"top-right"})}},children:(0,r.jsx)(eT.Y,{placeholder:"Search component",className:"w-full",value:s,variant:"flat",onChange:e=>n(e.target.value),endContent:(0,r.jsx)("button",{className:"focus:outline-none",type:"submit",children:(0,r.jsx)(p._Ve,{className:"text-black/50 dark:text-white/90 text-slate-400 flex-shrink-0"})})})}),x.length>1&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(A.q,{x:2}),(0,r.jsxs)(X.g,{variant:"flat",children:[(0,r.jsx)(Y.e,{content:"Total ".concat(x.length,", current ").concat(a+1),showArrow:!0,color:"foreground",children:(0,r.jsx)(G.A,{isIconOnly:!0,onPress:()=>o(e=>(e-1+x.length)%x.length),isDisabled:0===a,children:(0,r.jsx)(p.Hf3,{})})}),(0,r.jsx)(Y.e,{content:"Total ".concat(x.length,", current ").concat(a+1),showArrow:!0,color:"foreground",children:(0,r.jsx)(G.A,{isIconOnly:!0,onPress:()=>o(e=>(e+1)%x.length),isDisabled:a===x.length-1,children:(0,r.jsx)(p.veu,{})})})]})]})]})});eL.displayName="TreeViewSearch";let eK=ev.k.getActions().onChange,eV=(0,c.memo)(e=>{let{handle:l}=e,{isOpen:t,onOpen:s,onClose:i,onOpenChange:a}=(0,R.q)(),{theme:c,setTheme:d}=(0,o.F)(),{state:x,setEnableHover:u,setEnableUpdate:h}=(0,eE.Z)(),{state:m,setUISize:v}=y(),{state:j,cb:f}=(0,eI.$)(e=>({state:e.state,cb:e.cb})),g=(0,ev.k)(e=>e.filter);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"fixed top-3 right-3 z-10 flex",children:[(0,r.jsx)(eL,{handle:l}),(0,r.jsx)(A.q,{x:2}),(0,r.jsxs)(X.g,{variant:"flat",children:[(0,r.jsx)(Y.e,{content:(0,r.jsx)("p",{className:j?"text-green-400":"text-red-400",children:j?"DevTool Connect":"DevTool DisConnect"}),showArrow:!0,children:(0,r.jsx)(G.A,{isIconOnly:!0,onPress:()=>null==f?void 0:f(),disabled:j,children:j?(0,r.jsx)(p.NhS,{className:"text-green-500"}):(0,r.jsx)(p.xrR,{className:" text-red-500"})})}),(0,r.jsx)(G.A,{isIconOnly:!0,onPress:()=>d("dark"===c?"light":"dark"),children:"dark"===c?(0,r.jsx)(p.kLh,{className:"text-gray-500"}):(0,r.jsx)(p.NWY,{className:"text-orange-500"})}),(0,r.jsx)(Y.e,{content:"Setting",showArrow:!0,color:"foreground",children:(0,r.jsx)(G.A,{isIconOnly:!0,onPress:s,children:(0,r.jsx)(p.UG6,{className:t?"text-green-500":"text-gray-500"})})})]})]}),(0,r.jsx)(M.R,{isOpen:t,size:"2xl",onClose:i,onOpenChange:a,placement:"top",children:(0,r.jsxs)(q.A,{children:[(0,r.jsx)(eA.k,{children:(0,r.jsxs)("h3",{className:"text-[1em]",children:["Setting - ",(0,r.jsx)(eC.z,{children:"@my-react/devtool"})]})}),(0,r.jsxs)(E.I,{className:"text-[14px]",children:[(0,r.jsxs)("div",{className:"flex flex-col gap-y-4",children:[(0,r.jsxs)("div",{className:"flex flex-col gap-y-2",children:[(0,r.jsx)("p",{className:"whitespace-nowrap text-[14px] text-foreground-500",children:"Filter Node: "}),(0,r.jsx)("div",{className:"flex items-center",children:(0,r.jsx)(ez.g,{selectionMode:"multiple",placeholder:"Select a Type",selectedKeys:g,"aria-label":"Filter Node",className:"flex items-center",onChange:e=>{eK(new Set(e.target.value.split(",")))},children:$.typeKeys.map(e=>(0,r.jsx)(eO.R,{value:e,children:(0,$.getTypeName)(e)},e))})})]}),(0,r.jsx)(C.j,{}),(0,r.jsxs)("div",{className:"flex flex-col gap-y-2",children:[(0,r.jsx)("p",{className:"whitespace-nowrap text-[14px] text-foreground-500",children:"UI Size: "}),(0,r.jsxs)(eF.X,{value:m,onValueChange:e=>v(e),orientation:"horizontal",classNames:{wrapper:"gap-x-6"},children:[(0,r.jsx)(eR.J,{value:n.sm,children:"Small Size"}),(0,r.jsx)(eR.J,{value:n.md,children:"Medium Size"}),(0,r.jsx)(eR.J,{value:n.lg,children:"Large Size"})]})]}),(0,r.jsx)(C.j,{}),(0,r.jsxs)("div",{className:"flex flex-col gap-y-2",children:[(0,r.jsx)("p",{className:"whitespace-nowrap text-[14px] text-foreground-500",children:"Config: "}),(0,r.jsx)(eM.K,{isSelected:x.enableUpdate,radius:"full",onValueChange:h,color:"primary",children:(0,r.jsxs)("div",{className:"flex items-center",children:["Highlight Update",(0,r.jsxs)("div",{className:"ml-4 gap-x-2 flex",children:[(0,r.jsx)(H.z,{style:{backgroundColor:$.color.update,mixBlendMode:"difference"},children:"update"}),(0,r.jsx)(H.z,{style:{backgroundColor:$.color.append,mixBlendMode:"difference"},children:"append"}),(0,r.jsx)(H.z,{style:{backgroundColor:$.color.setRef,mixBlendMode:"difference"},children:"setRef"}),(0,r.jsx)(H.z,{style:{backgroundColor:$.color.warn,mixBlendMode:"difference"},children:"warn"})]})]})}),(0,r.jsx)(eM.K,{isSelected:x.enableHover,radius:"full",onValueChange:u,color:"secondary",children:"Hover Overlay"})]})]}),(0,r.jsx)(A.q,{y:4})]}),(0,r.jsx)(eq.R,{children:(0,r.jsx)(G.A,{onPress:i,children:"Close"})})]})})]})});eV.displayName="TreeViewSetting";let eB=(e,l,t)=>{let s=Array.from(e.querySelectorAll("[data-depth]")),n=e.clientWidth,r=l.current||12;for(let e of(n>t.current&&(r=12),t.current=n,s)){var i;let l=parseInt(e.getAttribute("data-depth")||"0",10)||0;0!==l&&(r=Math.min(r,Math.max(0,n-((null===(i=e.querySelector("[data-content]"))||void 0===i?void 0:i.clientWidth)||0)-6)/l))}l.current=r,e.style.setProperty("--indentation-size","".concat(r,"px")),e.style.setProperty("--width-size","".concat(n,"px"))},eD=(0,c.memo)(e=>{let{onScroll:l,data:t,onMount:s}=e,[i,a]=(0,c.useState)(!1),o=(0,c.useRef)(null),d=(0,c.useRef)(t);d.current=t;let x=y.useShallowStableSelector(e=>e.state),u=z((e,l,s)=>{let{isScrolling:i}=s,a=t[e];return a?(0,r.jsx)(ea,{node:a,isScrolling:i,className:x===n.sm?"text-[12px]":x===n.md?"text-[14px]":"text-[16px]"}):null});(0,c.useEffect)(()=>F.O.subscribe(e=>e.scroll,()=>{var e,l;let t=F.O.getReadonlyState().select,s=null===(e=d.current)||void 0===e?void 0:e.findIndex(e=>e.i===t);-1!==s&&(null===(l=o.current)||void 0===l||l.scrollIntoView({index:s,align:"center"}))}),[]);let h=t.length>0;return((0,c.useEffect)(()=>(h&&s(o.current),()=>{s()}),[h,s]),t.length)?(0,r.jsx)(eN.OO,{ref:o,increaseViewportBy:500,isScrolling:a,context:{isScrolling:i},onScroll:l,totalCount:t.length,itemContent:u}):null});eD.displayName="TreeViewImpl";let eU=(0,c.memo)(()=>{let e=(0,c.useRef)(null),l=em.p.useShallowStableSelector(e=>e.list),{width:t,height:s}=function(e){let{ref:l,cssSelector:t,getEle:s,deps:n}=e,r=(0,c.useRef)(s);r.current=s;let[i,a]=eS(ek,100);return(0,ey.L)(()=>{var e;let s=l?l.current:t?document.querySelector(t):(null===(e=r.current)||void 0===e?void 0:e.call(r))||null;if(s){if(window.ResizeObserver){let e=new ResizeObserver(()=>{a(s.getBoundingClientRect())});return e.observe(s),()=>e.disconnect()}{let e=()=>a(s.getBoundingClientRect());return e(),window.addEventListener("resize",e,{passive:!0}),()=>window.removeEventListener("resize",e)}}},[l,t,a,...n||eb]),i}({ref:e}),[n,i]=(0,c.useState)(),a=(0,c.useRef)(12),o=(0,c.useRef)(t),d=(0,c.useCallback)(()=>{e.current&&eB(e.current,a,o)},[]);return(0,c.useEffect)(()=>{d()},[t,s,l.length,d]),(0,r.jsx)("div",{className:"tree-view h-full p-1",children:(0,r.jsxs)("div",{className:"group h-full transform-gpu",ref:e,children:[(0,r.jsx)(eD,{onScroll:d,data:l,onMount:i}),(0,r.jsx)(eV,{handle:n})]})})});function eW(){let e=(0,eI.$)(e=>e.error),{theme:l}=(0,o.F)();return(0,c.useEffect)(()=>{e&&d.Am.error(e,{position:"top-right"})},[e]),(0,r.jsxs)("main",{className:"flex p-1 h-screen",children:[(0,r.jsx)(a(),{children:(0,r.jsx)("title",{children:"@my-react devtools"})}),(0,r.jsx)(d.x7,{richColors:!0,theme:"dark"===l?"dark":"light"}),(0,r.jsx)(m,{left:(0,r.jsx)(eU,{}),right:(0,r.jsx)(ew,{})})]})}eU.displayName="TreeView"}},function(e){e.O(0,[4764,9040,9774,2888,179],function(){return e(e.s=78582)}),_N_E=e.O()}]);