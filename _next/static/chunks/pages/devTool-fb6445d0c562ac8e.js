(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[374],{5834:function(e,l,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/devTool",function(){return t(8231)}])},8231:function(e,l,t){"use strict";t.r(l),t.d(l,{default:function(){return eR}});var n,s,i=t(4746),r=t(2700),a=t.n(r),o=t(2551),c=t(4177),d=t(4153),x=t(6139),u=t(1026),m=t(7960);let h=e=>{let{left:l,right:t}=e;return(0,i.jsx)(x.w,{className:"w-full",radius:"sm",children:(0,i.jsx)(u.G,{className:"w-full p-0",children:(0,i.jsxs)(m.oL,{children:[l,t]})})})};var v=t(7954),j=t(3105),p=t(1773),f=t(6734),g=t(6388),N=t(3799),w=t(3498),y=t(6721),b=t(5316);(n=s||(s={})).sm="sm",n.md="md",n.lg="lg";let S=(0,b.eK)(()=>({state:"sm"}),{withActions:e=>({setUISize:l=>e.state=l}),withDeepSelector:!1}),k=e=>{let l=null==e?void 0:e.v,t=null==e?void 0:e.t;if("Element"===t||"Date"===t||"Boolean"===t||"Error"===t||"Number"===t||"Symbol"===t)return l;if((null==e?void 0:e.l)===!1)return"Array"===e.t||"Set"===e.t?"[…]":"Map"===e.t||"Object"===e.t?"{…}":"…";if(null!==l&&"object"==typeof l&&!Array.isArray(l)&&"function"==typeof l[window.Symbol.iterator])return"(…)";if(Array.isArray(l))return l.length>0?"[…]":"[]";if("Null"===t)return"null";if("Undefined"===t)return"undef";if("object"==typeof l)return Object.keys(l).length>0?"{…}":"{}";if("Function"===t)return"".concat(l.substr(0,10)+(l.length>10?"…":""));if("string"==typeof l)return'"'.concat(l.substr(0,10)+(l.length>10?"…":""),'"');else return l};function C(e,l){if("Object"===e){let e=Object.keys(l),t=e.slice(0,3).map(e=>"".concat(e,": ").concat(k(l[e]))).concat(e.length>3?["…"]:[]).join(", ");return"{ ".concat(t," }")}if("Array"!==e)return e;{let e=l.slice(0,4).map(e=>k(e)).concat(l.length>4?["…"]:[]).join(", ");return"[".concat(e,"]")}}let A=e=>{var l;let{item:t}=e,[n,s]=(0,c.useState)(!1),r=t.h,a=n?(0,i.jsx)(w.AS7,{width:"16",height:"16"}):(0,i.jsx)(w.VZf,{width:"16",height:"16"});return r?(0,i.jsx)(z,{name:t.n,item:t.v,prefix:(0,i.jsx)(f.z,{classNames:{content:"p-0"},size:"sm",className:"rounded-sm text-center mr-1 flex-shrink-0 font-[300] !px-1 text-gray-800 dark:text-gray-200 !h-[1.4em] !max-w-[initial] !min-w-[initial]",children:t.i})}):(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("div",{className:"hook-stack-view",children:[(0,i.jsxs)("div",{className:"flex w-full my-0.5",children:[(0,i.jsx)("span",{className:"text-gray-400 hover:text-gray-700",onClick:()=>s(!n),children:a}),(0,i.jsxs)("div",{className:"max-w-full line-clamp-1",children:[t.n,":"]})]}),(0,i.jsx)("div",{className:"".concat(n?"block":"hidden"," ml-4 my-0.5"),children:null===(l=t.c)||void 0===l?void 0:l.map((e,l)=>(0,i.jsx)(A,{item:e},e.n+"-"+l))})]})})},z=e=>{var l,t,n;let{name:s,item:r,prefix:a}=e,[o,d]=(0,c.useState)(!1),x=y.F.useShallowStableSelector(e=>{var l,t;return null===(t=e.data)||void 0===t?void 0:null===(l=t[(null==r?void 0:r.i)||""])||void 0===l?void 0:l.loaded}),u=null!==(l=null==x?void 0:x.v)&&void 0!==l?l:null==r?void 0:r.v,m=null!==(t=null==x?void 0:x.n)&&void 0!==t?t:null==r?void 0:r.n,h=null!==(n=null==x?void 0:x.t)&&void 0!==n?n:null==r?void 0:r.t,j=(0,c.useMemo)(()=>m||("Array"===h||"Set"===h?C("Array",null!=u?u:[]):"Iterable"===h||"Map"===h||"Object"===h?C("Object",null!=u?u:{}):void 0),[h,m,u]);if((0,c.useEffect)(()=>{o&&(null==r?void 0:r.l)===!1&&r.i&&!x&&y.F.getActions().setLoading(r.i)},[x,o,null==r?void 0:r.i,null==r?void 0:r.l]),!r)return null;let p=r.e,f=o?(0,i.jsx)(w.AS7,{width:"16",height:"16"}):(0,i.jsx)(w.VZf,{width:"16",height:"16"});if(p)return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("div",{className:"hook-value-view",children:[(0,i.jsxs)("div",{className:"flex w-full my-0.5 items-center",children:[(0,i.jsx)("span",{className:"text-gray-400 hover:text-gray-700",onClick:()=>d(!o),children:f}),a,(0,i.jsxs)("div",{className:"max-w-full line-clamp-1 break-all",children:[s,": ",(0,i.jsx)("span",{className:"hook-value-placeholder",children:u?j:(0,i.jsx)(w.nWS,{className:"inline-block"})})]})]}),(0,i.jsx)("div",{className:"".concat(o?"block":"hidden"," ml-6 my-0.5"),children:u?Array.isArray(u)?(0,i.jsx)(i.Fragment,{children:u.map((e,l)=>(0,i.jsx)(z,{name:l.toString(),item:e},l))}):(0,i.jsx)(i.Fragment,{children:Object.keys(u).map(e=>(0,i.jsx)(z,{name:e,item:u[e]},e))}):(0,i.jsx)(v.c,{size:"sm"})})]})});{let e=null;return"Element"===r.t&&(e=(0,i.jsx)("span",{className:"node-element",children:r.v})),"String"===r.t&&(e=(0,i.jsx)("span",{className:"node-string",children:'"'.concat(r.v,'"')})),"Boolean"===r.t&&(e=(0,i.jsx)("span",{className:"node-boolean",children:r.v})),"Date"===r.t&&(e=(0,i.jsx)("span",{className:"node-date",children:r.v})),"Error"===r.t&&(e=(0,i.jsx)("span",{className:"node-error",children:r.v})),"Function"===r.t&&(e=(0,i.jsx)("span",{className:"node-function",children:r.v})),"Undefined"===r.t&&(e=(0,i.jsx)("span",{className:"node-undefined",children:r.v})),"Null"===r.t&&(e=(0,i.jsx)("span",{className:"node-null",children:r.v})),"Number"===r.t&&(e=(0,i.jsx)("span",{className:"node-number",children:r.v})),"Promise"===r.t&&(e=(0,i.jsx)("span",{className:"node-promise",children:r.v})),("WeakMap"===r.t||"WeakSet"===r.t)&&(e=(0,i.jsx)("span",{className:"node-weak",children:r.v})),"RegExp"===r.t&&(e=(0,i.jsx)("span",{className:"node-regexp",children:r.v})),"Symbol"===r.t&&(e=(0,i.jsx)("span",{className:"node-symbol",children:r.v})),(0,i.jsx)("div",{className:"hook-value-view",children:(0,i.jsxs)("div",{className:"flex w-full my-0.5 items-center",children:[(0,i.jsx)("span",{className:"text-transparent",children:f}),a,(0,i.jsxs)("div",{className:"max-w-full line-clamp-1 break-all",children:[s,": ",(0,i.jsx)("span",{className:"hook-value-placeholder",children:e})]})]})})}},O=()=>{let e=(0,p.O)(e=>e.select),l=(0,j.K)(e=>e.nodes),t=S.useShallowStableSelector(e=>e.state),n=l.find(l=>l.i===e),s=null==n?void 0:n.i,r=(null==n?void 0:n._h)||[];return r.length>0?(0,i.jsxs)("div",{className:"p-2",children:[(0,i.jsx)("div",{children:"hooks"}),(0,i.jsx)(g.q,{y:1}),(0,i.jsx)("div",{className:"w-full ".concat("sm"===t?"text-[11px]":"md"===t?"text-[12px]":"text-[13px]"," tree-wrapper"),children:r.map((e,l)=>(0,i.jsx)(A,{item:e},s+"-"+l))}),(0,i.jsx)(N.j,{})]}):null};var M=t(715),R=t(154),F=t(1463),E=t(4688),_=t(2825);let T=(0,b.eK)(()=>({state:{}}),{withActions:e=>({highlightNode:(l,t)=>{e.state[l]=t,setTimeout(()=>{delete e.state[l]},3e3)}})});_.s||(window.useHighlightNode=T);var q=t(5720),K=t(5993),I=t(4736),V=t(872);let{setSelect:L,setClose:D,setHover:B}=p.O.getActions(),{add:U,remove:P}=F.M.getActions(),W=(0,c.memo)(e=>{let{node:l}=e,t=(0,M.getFiberTag)(l.t);return(null==t?void 0:t.length)?(0,i.jsx)("div",{className:" gap-x-[2px] flex items-center",children:t.map(e=>(0,i.jsx)(f.z,{size:"sm",radius:"none",className:"rounded-md capitalize text-[8px] h-[14px]",children:e},e))}):null});W.displayName="RenderTag";let H=(0,c.memo)(e=>{let{node:l,isScrolling:t}=e,n=(0,K.i)((0,c.useCallback)(e=>{var t;return null===(t=e.map)||void 0===t?void 0:t[l.k]},[l.k]));return(0,i.jsxs)("div",{"data-key":!0,className:"flex items-center gap-x-[1px] text-[12px]",children:[(0,i.jsx)("div",{className:" text-[#40af2c]",children:"key"}),(0,i.jsx)("div",{className:" text-gray-400",children:"="}),(0,i.jsxs)("div",{className:"flex",children:['"',t?(0,i.jsx)("div",{className:"text-gray-600 max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap",children:n}):(0,i.jsx)(R.e,{content:n,delay:800,showArrow:!0,color:"foreground",children:(0,i.jsx)("div",{className:"text-gray-600 max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap",children:n})}),'"']})]})});H.displayName="RenderKey";let Z=e=>{let{node:l,isScrolling:t,className:n,withKey:s=!0,withTag:r=!0,withHMR:a=!0,withSelect:o=!0,withTrigger:d=!0,withCollapse:x=!0}=e,{enableCount:u,enableMis:m}=E.Z.useShallowStableSelector(e=>({enableCount:e.state.enableRuntimeCount,enableMis:e.state.enableRuntimeMis}));(0,c.useLayoutEffect)(()=>(u&&U(l.i),()=>{P(l.i)}),[l,u]);let{c:h,t:v}=I.g.useShallowStableSelector(e=>{var t;return u&&(null===(t=e.state)||void 0===t?void 0:t[l.i])||{}}),j=(0,V.P)((0,c.useCallback)(e=>{var t;return null===(t=e.state)||void 0===t?void 0:t[l.i]},[l.i])),N=(0,q.m)((0,c.useCallback)(e=>{var t;return null===(t=e.state)||void 0===t?void 0:t[l.i]},[l.i])),y=T((0,c.useCallback)(e=>{var t;return null===(t=e.state)||void 0===t?void 0:t[l.i]},[l.i])),b=(0,K.i)((0,c.useCallback)(e=>e.map[l.n],[l.n])),{select:S,closeList:k,selectList:C}=(0,p.O)((0,c.useCallback)(e=>({select:e.select,closeList:e.closeList,selectList:e.selectList}),[])),A=o&&l.i===S,z=x&&(null==k?void 0:k[l.i]),O=(0,c.useMemo)(()=>o&&S&&!A&&(null==C?void 0:C[l.i]),[o,S,A,C,l.i]),M=Array.isArray(null==l?void 0:l.c),F=M?z?(0,i.jsx)(w.VZf,{width:16,height:16}):(0,i.jsx)(w.AS7,{width:16,height:16}):null;return(0,i.jsx)("div",{id:"node-"+l.i.toString(),"data-depth":l._d,onClick:()=>{o&&L(l.i)},onMouseEnter:()=>{o&&B(l.i)},onMouseOut:()=>{o&&B("")},className:"w-full h-full node-item cursor-pointer rounded-sm select-none transition-background "+(n||"")+"".concat(o?" node-item-hover":"")+"".concat(O?" node-item-select":"")+"".concat(A?" node-item-selected":""),children:(0,i.jsxs)("div",{className:"flex items-center h-full w-full px-[2px] relative",children:[A&&(0,i.jsx)("div",{className:"absolute top-0 left-[1px] h-full border-l-2 border-blue-400 rounded-sm pointer-events-none"}),(0,i.jsx)("div",{className:"flex-grow",style:{width:"calc(100%-calc(".concat(l._d,"*var(--indentation-size)))"),marginLeft:"calc(".concat(l._d," * var(--indentation-size)")},children:(0,i.jsxs)("div",{"data-content":!0,className:"flex items-center w-fit",children:[x&&(0,i.jsx)("span",{className:" text-gray-400 min-w-[18px]"+(M?" hover:text-gray-700":""),onClick:e=>{e.stopPropagation(),D(l.i)},children:M?t?F:(0,i.jsx)(R.e,{content:z?"Toggle to open":"Toggle to close",delay:800,showArrow:!0,color:"foreground",children:F}):null}),(0,i.jsx)("p",{className:"node-name line-clamp-1",children:b}),r&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(g.q,{x:1}),(0,i.jsx)(W,{node:l})]}),d&&j>0&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(g.q,{x:1}),(0,i.jsx)(R.e,{content:"trigger update",showArrow:!0,color:"primary",children:(0,i.jsx)(f.z,{size:"sm",radius:"none",color:"primary",className:"rounded-md capitalize text-[8px] h-[14px]",children:j})})]}),u&&h&&h>0&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(g.q,{x:1}),(0,i.jsx)(R.e,{content:"run count",showArrow:!0,color:"secondary",children:(0,i.jsxs)(f.z,{size:"sm",radius:"none",color:"secondary",className:"rounded-md capitalize text-[8px] h-[14px]",children:[h,m&&v?" (".concat(v,"ms)"):""]})})]}),a&&N>0&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(g.q,{x:1}),(0,i.jsx)(R.e,{content:"hmr update",showArrow:!0,color:"success",children:(0,i.jsx)(f.z,{size:"sm",radius:"none",color:"success",className:"rounded-md capitalize text-[8px] h-[14px]",children:N})})]}),y&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(g.q,{x:1}),(0,i.jsx)(f.z,{size:"sm",radius:"none",color:"warning",className:"rounded-md capitalize text-[8px] h-[14px]",children:y})]}),s&&l.k&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(g.q,{x:1}),(0,i.jsx)(H,{node:l,isScrolling:t})]})]})})]})})},J=()=>{let e=(0,p.O)(e=>e.select),l=(0,j.K)(e=>e.nodes),t=S.useShallowStableSelector(e=>e.state),n=l.find(l=>l.i===e);return n?(0,i.jsxs)("div",{className:"p-2 ".concat("sm"===t?"text-[15px]":"md"===t?"text-[16px]":"text-[17px]"," sticky top-0 bg-content1 z-50"),children:[(0,i.jsx)(Z,{node:n,withCollapse:!1,withSelect:!1,withKey:!1}),(0,i.jsx)(N.j,{})]}):null},X=e=>{let l=(0,c.useRef)(e);return l.current=e,(0,c.useCallback)(function(){for(var e,t,n=arguments.length,s=Array(n),i=0;i<n;i++)s[i]=arguments[i];return s.length?null===(e=l.current)||void 0===e?void 0:e.call(l,...s):null===(t=l.current)||void 0===t?void 0:t.call(l)},[])},G=()=>{var e;let l=(0,p.O)(e=>e.select),t=(0,j.K)(e=>e.nodes),n=S.useShallowStableSelector(e=>e.state),s=t.find(e=>e.i===l),r=Object.keys((null==s?void 0:null===(e=s.p)||void 0===e?void 0:e.v)||{}),a=null==s?void 0:s.i,o=r.length>0,c="sm"===n?"text-[11px]":"md"===n?"text-[12px]":"text-[13px]",d=X(e=>{var l,t;let n=r[e];return(0,i.jsx)("div",{className:"".concat(c,"  tree-wrapper"),children:(0,i.jsx)(z,{name:n,item:null==s?void 0:null===(t=s.p)||void 0===t?void 0:null===(l=t.v)||void 0===l?void 0:l[n]})},a+"-"+e)});return o?(0,i.jsxs)("div",{className:"p-2",children:[(0,i.jsx)("div",{children:"props"}),(0,i.jsx)(g.q,{y:1}),(0,i.jsx)("div",{className:"w-full",children:r.map((e,l)=>d(l))}),(0,i.jsx)(N.j,{})]}):null};var Y=t(9676),$=t(5696),Q=t(8344);let ee=()=>{let e=(0,p.O)(e=>e.select),l=(0,j.K)(e=>e.nodes),t=S.useShallowStableSelector(e=>e.state),n="sm"===t?"text-[11px]":"md"===t?"text-[12px]":"text-[13px]",s=l.find(l=>l.i===e),r=null==s?void 0:s._t,a=(0,$.k)(e=>e.filter),o=(0,c.useMemo)(()=>Array.from(a).map(e=>+e),[a]),d=(0,Y.p)(e=>e.list),x=null==r?void 0:r[(null==r?void 0:r.length)-1];(null==x?void 0:x.startsWith("@my-react"))?r=null==r?void 0:r.slice(0,-1):x=void 0;let u=(0,c.useMemo)(()=>null==r?void 0:r.map(e=>d.find(l=>l.i===e)),[d,r]),m=(0,c.useMemo)(()=>null==u?void 0:u.filter(e=>!(0,Q.VR)(e,o)),[o,u]),h=X(e=>{let l=null==m?void 0:m[e];return l?(0,i.jsx)("div",{className:"".concat(n," ml-2 "),children:(0,i.jsx)(Z,{node:l,withCollapse:!1})},l.i):null});return(null==m?void 0:m.length)?(0,i.jsxs)("div",{className:"p-2",children:[(0,i.jsx)("div",{children:"renders"}),(0,i.jsx)(g.q,{y:1}),(0,i.jsxs)("div",{className:"w-full",children:[m.map((e,l)=>h(l)),(0,i.jsx)("div",{className:"".concat(n," ml-2  px-[2px]"),children:x||"@my-react"})]}),(0,i.jsx)(N.j,{})]}):null},el=()=>{let e=(0,p.O)(e=>e.select),l=(0,j.K)(e=>e.nodes),t=S.useShallowStableSelector(e=>e.state),n=l.find(l=>l.i===e),s=null==n?void 0:n._s;return(null==s?void 0:s.fileName)?(0,i.jsxs)("div",{className:"p-2",children:[(0,i.jsx)("div",{children:"source"}),(0,i.jsx)(g.q,{y:1}),(0,i.jsx)("div",{className:"w-full",children:(0,i.jsx)("div",{className:"".concat("sm"===t?"text-[11px]":"md"===t?"text-[12px]":"text-[13px]"," ml-2  px-[2px] text-gray-600"),children:(null==s?void 0:s.fileName)+"".concat((null==s?void 0:s.lineNumber)?":"+(null==s?void 0:s.lineNumber):"")+"".concat((null==s?void 0:s.columnNumber)?":"+(null==s?void 0:s.columnNumber):"")})})]}):null},et=()=>{var e,l,t;let n=(0,p.O)(e=>e.select),s=(0,j.K)(e=>e.nodes),r=S.useShallowStableSelector(e=>e.state),a=s.find(e=>e.i===n),o=Object.keys((null==a?void 0:null===(e=a.s)||void 0===e?void 0:e.t)!=="Null"&&(null==a?void 0:null===(l=a.s)||void 0===l?void 0:l.t)!=="Undefined"&&(null==a?void 0:null===(t=a.s)||void 0===t?void 0:t.v)||{}),c=null==a?void 0:a.i,d=o.length>0,x="sm"===r?"text-[11px]":"md"===r?"text-[12px]":"text-[13px]",u=X(e=>{var l,t;let n=o[e];return(0,i.jsx)("div",{className:"".concat(x,"  tree-wrapper"),children:(0,i.jsx)(z,{name:n,item:null==a?void 0:null===(t=a.s)||void 0===t?void 0:null===(l=t.v)||void 0===l?void 0:l[n]})},c+"-"+e)});return d?(0,i.jsxs)("div",{className:"p-2",children:[(0,i.jsx)("div",{children:"states"}),(0,i.jsx)(g.q,{y:1}),(0,i.jsx)("div",{className:"w-full",children:o.map((e,l)=>u(l))}),(0,i.jsx)(N.j,{})]}):null},en=()=>{let e=(0,p.O)(e=>e.select),{nodeList:l,loading:t}=(0,j.K)(e=>({nodeList:e.nodes,loading:e.loading}));return!l.find(l=>l.i===e)&&t?(0,i.jsx)("div",{className:"node-view h-full p-1 flex items-center justify-center",children:(0,i.jsx)(v.c,{color:"primary"})}):(0,i.jsx)("div",{className:"node-view h-full p-1",children:(0,i.jsxs)("div",{className:"group h-full overflow-auto",children:[(0,i.jsx)(J,{}),(0,i.jsx)(G,{}),(0,i.jsx)(et,{}),(0,i.jsx)(O,{}),(0,i.jsx)(ee,{}),(0,i.jsx)(el,{})]})})};var es=t(7014),ei=t(2570);let er=function(e){let l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200,[t,n]=(0,c.useState)(e);return[t,(0,c.useMemo)(()=>(0,M.debounce)(n,l),[l])]},ea=[],eo={width:0,height:0,left:0,right:0,top:0,bottom:0,x:0,y:0};var ec=t(3586),ed=t(40),ex=t(418),eu=t(9634),em=t(9798),eh=t(5017),ev=t(3396),ej=t(3404),ep=t(1638),ef=t(6560),eg=t(8214),eN=t(4180),ew=t(8485),ey=t(4874),eb=t(3256);let{setSelect:eS}=p.O.getActions(),ek=(0,c.memo)(e=>{var l;let{handle:t}=e,[n,s]=(0,c.useState)(""),r=(0,Y.p)(e=>e.list),[a,o]=(0,c.useState)(0),[x,u]=(0,c.useState)([]),[m,h]=(0,c.useState)([]),v=(0,K.i)(e=>e.map),j=x[a],p=null===(l=m[j])||void 0===l?void 0:l.i,f=e=>{if(null==e||e.preventDefault(),n){o(0);let e=r.map(e=>({...e,_name:v[e.n]})),l=e.map((e,l)=>e._name.includes(n)?l:-1).filter(e=>-1!==e);h(e),u(l),0===l.length?d.Am.error("Can't find current name",{position:"top-right"}):d.Am.success("Find ".concat(l.length," items"),{position:"top-right"})}};return(0,c.useEffect)(()=>{o(0),u([])},[n]),(0,c.useEffect)(()=>{void 0!==j&&(null==t||t.scrollToIndex({index:j}),eS(p,!0))},[j,t,p]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("form",{onSubmit:f,children:(0,i.jsx)(eb.Y,{placeholder:"Search component",className:"w-full",value:n,variant:"flat",onChange:e=>s(e.target.value),endContent:(0,i.jsx)(ex.A,{isIconOnly:!0,variant:"light",onClick:f,children:(0,i.jsx)(w._Ve,{className:"text-black/50 dark:text-white/90 text-slate-400 flex-shrink-0"})})})}),x.length>1&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(g.q,{x:2}),(0,i.jsxs)(ed.g,{variant:"flat",children:[(0,i.jsx)(R.e,{content:"Total ".concat(x.length,", current ").concat(a+1),showArrow:!0,color:"foreground",children:(0,i.jsx)(ex.A,{isIconOnly:!0,onClick:()=>o(e=>(e-1+x.length)%x.length),isDisabled:0===a,children:(0,i.jsx)(w.Hf3,{})})}),(0,i.jsx)(R.e,{content:"Total ".concat(x.length,", current ").concat(a+1),showArrow:!0,color:"foreground",children:(0,i.jsx)(ex.A,{isIconOnly:!0,onClick:()=>o(e=>(e+1)%x.length),isDisabled:a===x.length-1,children:(0,i.jsx)(w.veu,{})})})]})]})]})});ek.displayName="TreeViewSearch";let eC=$.k.getActions().onChange,eA=(0,c.memo)(e=>{let{handle:l}=e,{isOpen:t,onOpen:n,onClose:r,onOpenChange:a}=(0,ec.q)(),{theme:c,setTheme:d}=(0,o.F)(),{state:x,setEnableHover:u,setEnableUpdate:m,setEnableRuntimeCount:h,setEnableRuntimeMis:v}=(0,E.Z)(),{state:j,setUISize:p}=S(),{state:y,cb:b}=(0,ey.$)(e=>({state:e.state,cb:e.cb})),k=(0,$.k)(e=>e.filter);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("div",{className:"fixed top-3 right-3 z-10 flex",children:[(0,i.jsx)(ek,{handle:l}),(0,i.jsx)(g.q,{x:2}),(0,i.jsxs)(ed.g,{variant:"flat",children:[(0,i.jsx)(R.e,{content:(0,i.jsx)("p",{className:y?"text-green-400":"text-red-400",children:y?"DevTool Connect":"DevTool DisConnect"}),showArrow:!0,children:(0,i.jsx)(ex.A,{isIconOnly:!0,onClick:()=>null==b?void 0:b(),disabled:y,children:y?(0,i.jsx)(w.NhS,{className:"text-green-500"}):(0,i.jsx)(w.xrR,{className:" text-red-500"})})}),(0,i.jsx)(ex.A,{isIconOnly:!0,onClick:()=>d("dark"===c?"light":"dark"),children:"dark"===c?(0,i.jsx)(w.kLh,{className:"text-gray-500"}):(0,i.jsx)(w.NWY,{className:"text-yellow-500"})}),(0,i.jsx)(R.e,{content:"Setting",showArrow:!0,color:"foreground",children:(0,i.jsx)(ex.A,{isIconOnly:!0,onClick:n,children:(0,i.jsx)(w.UG6,{className:" text-gray-500"})})})]})]}),(0,i.jsx)(eu.R,{isOpen:t,size:"xl",onClose:r,onOpenChange:a,isDismissable:!1,placement:"top",children:(0,i.jsxs)(em.A,{children:[(0,i.jsx)(eh.k,{children:(0,i.jsxs)("h3",{className:"text-[1em]",children:["Setting ",(0,i.jsx)("small",{children:"@my-react"})]})}),(0,i.jsx)(ev.I,{className:"text-[14px]",children:(0,i.jsxs)("div",{className:"flex flex-col gap-y-4",children:[(0,i.jsxs)("div",{className:"flex flex-col gap-y-2",children:[(0,i.jsx)("p",{className:"whitespace-nowrap text-[14px] text-foreground-500",children:"Filter Node: "}),(0,i.jsx)("div",{className:"flex items-center",children:(0,i.jsx)(ej.g,{selectionMode:"multiple",placeholder:"Select a Type",selectedKeys:k,"aria-label":"Filter Node",className:"flex items-center",radius:"sm",variant:"bordered",size:"lg",onChange:e=>{eC(new Set(e.target.value.split(",")))},children:M.typeKeys.map(e=>(0,i.jsx)(ep.R,{value:e,children:(0,M.getTypeName)(e)},e))})})]}),(0,i.jsx)(N.j,{}),(0,i.jsxs)("div",{className:"flex flex-col gap-y-2",children:[(0,i.jsx)("p",{className:"whitespace-nowrap text-[14px] text-foreground-500",children:"UI Size: "}),(0,i.jsxs)(ef.X,{value:j,onValueChange:e=>p(e),orientation:"horizontal",classNames:{wrapper:"gap-x-6"},children:[(0,i.jsx)(eg.J,{value:s.sm,children:"Small Size"}),(0,i.jsx)(eg.J,{value:s.md,children:"Medium Size"}),(0,i.jsx)(eg.J,{value:s.lg,children:"Large Size"})]})]}),(0,i.jsx)(N.j,{}),(0,i.jsxs)("div",{className:"flex flex-col gap-y-2",children:[(0,i.jsx)(eN.K,{isSelected:x.enableUpdate,onValueChange:m,color:"primary",children:(0,i.jsxs)("div",{className:"flex",children:["Highlight Update",(0,i.jsxs)("div",{className:"ml-4 gap-x-2 flex",children:[(0,i.jsx)(f.z,{style:{backgroundColor:M.color.update,mixBlendMode:"difference"},children:"update"}),(0,i.jsx)(f.z,{style:{backgroundColor:M.color.append,mixBlendMode:"difference"},children:"append"}),(0,i.jsx)(f.z,{style:{backgroundColor:M.color.setRef,mixBlendMode:"difference"},children:"setRef"}),(0,i.jsx)(f.z,{style:{backgroundColor:M.color.warn,mixBlendMode:"difference"},children:"warn"})]})]})}),(0,i.jsx)(eN.K,{isSelected:x.enableHover,onValueChange:u,color:"secondary",children:"Hover Overlay"}),(0,i.jsx)(eN.K,{isSelected:x.enableRuntimeCount,onValueChange:h,color:"success",children:"RuntimeCount (DevMode only)"}),(0,i.jsx)(eN.K,{isSelected:x.enableRuntimeMis,isDisabled:!x.enableRuntimeCount,onValueChange:v,color:"warning",children:"RuntimeMis (DevMode only)"})]})]})}),(0,i.jsx)(ew.R,{children:(0,i.jsx)(ex.A,{onClick:r,variant:"bordered",children:"Close"})})]})})]})});eA.displayName="TreeViewSetting";let ez=(e,l,t)=>{let n=Array.from(e.querySelectorAll("[data-depth]")),s=e.clientWidth,i=l.current||12;for(let e of(s>t.current&&(i=12),t.current=s,n)){var r;let l=parseInt(e.getAttribute("data-depth")||"0",10)||0;0!==l&&(i=Math.min(i,Math.max(0,s-((null===(r=e.querySelector("[data-content]"))||void 0===r?void 0:r.clientWidth)||0)-6)/l))}l.current=i,e.style.setProperty("--indentation-size","".concat(i,"px")),e.style.setProperty("--width-size","".concat(s,"px"))},eO=(0,c.memo)(e=>{let{onScroll:l,data:t,onMount:n}=e,[r,a]=(0,c.useState)(!1),o=(0,c.useRef)(null),d=p.O.useShallowStableSelector(e=>e.select),x=S.useShallowStableSelector(e=>e.state),u=X((e,l,n)=>{let{isScrolling:r}=n,a=t[e];return a?(0,i.jsx)(Z,{node:a,isScrolling:r,className:x===s.sm?"text-[12px]":x===s.md?"text-[14px]":"text-[16px]"}):null}),m=(0,c.useMemo)(()=>t.findIndex(e=>e.i===d),[t,d]);(0,c.useEffect)(()=>{if(-1!==m){var e;null===(e=o.current)||void 0===e||e.scrollIntoView({index:m})}},[m]);let h=t.length>0;return((0,c.useEffect)(()=>(h&&n(o.current),()=>{n()}),[h,n]),t.length)?(0,i.jsx)(es.OO,{ref:o,overscan:60,isScrolling:a,context:{isScrolling:r},onScroll:l,totalCount:t.length,itemContent:u}):null});eO.displayName="TreeViewImpl";let eM=(0,c.memo)(()=>{let e=(0,c.useRef)(null),l=Y.p.useShallowStableSelector(e=>e.list),{width:t,height:n}=function(e){let{ref:l,cssSelector:t,getEle:n,deps:s}=e,i=(0,c.useRef)(n);i.current=n;let[r,a]=er(eo,100);return(0,ei.L)(()=>{var e;let n=l?l.current:t?document.querySelector(t):(null===(e=i.current)||void 0===e?void 0:e.call(i))||null;if(n){if(window.ResizeObserver){let e=new ResizeObserver(()=>{a(n.getBoundingClientRect())});return e.observe(n),()=>e.disconnect()}{let e=()=>a(n.getBoundingClientRect());return e(),window.addEventListener("resize",e,{passive:!0}),()=>window.removeEventListener("resize",e)}}},[l,t,a,...s||ea]),r}({ref:e}),[s,r]=(0,c.useState)(),a=(0,c.useRef)(12),o=(0,c.useRef)(t),d=(0,c.useCallback)(()=>{e.current&&ez(e.current,a,o)},[]);return(0,c.useEffect)(()=>{d()},[t,n,l.length,d]),(0,i.jsx)("div",{className:"tree-view h-full p-1",children:(0,i.jsxs)("div",{className:"group h-full transform-gpu",ref:e,children:[(0,i.jsx)(eO,{onScroll:d,data:l,onMount:r}),(0,i.jsx)(eA,{handle:s})]})})});function eR(){let e=(0,ey.$)(e=>e.error),{theme:l}=(0,o.F)();return(0,c.useEffect)(()=>{e&&d.Am.error(e,{position:"top-right"})},[e]),(0,i.jsxs)("main",{className:"flex p-1 h-screen",children:[(0,i.jsx)(a(),{children:(0,i.jsx)("title",{children:"@my-react devtools"})}),(0,i.jsx)(d.x7,{richColors:!0,theme:"dark"===l?"dark":"light"}),(0,i.jsx)(h,{left:(0,i.jsx)(eM,{}),right:(0,i.jsx)(en,{})})]})}eM.displayName="TreeView"}},function(e){e.O(0,[44,774,888,179],function(){return e(e.s=5834)}),_N_E=e.O()}]);