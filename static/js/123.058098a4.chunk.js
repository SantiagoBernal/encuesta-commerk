"use strict";(self.webpackChunkstarter_bt5=self.webpackChunkstarter_bt5||[]).push([[123],{123:(e,t,n)=>{n.r(t),n.d(t,{default:()=>B});var r=n(5043),i=n(9157),s=n(5299),o=n(8353),a=n(5173),l=n.n(a),c=n(8139),u=n.n(c),p=n(6794),f=n(9998),d=["tag","baseClass","baseClassActive","className","cssModule","children","innerRef"];function h(){return h=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},h.apply(this,arguments)}function b(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(Object(n),!0).forEach((function(t){g(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function g(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var O=y(y({},f.Ay.propTypes),{},{children:l().oneOfType([l().arrayOf(l().node),l().node]),tag:p.Wx,baseClass:l().string,baseClassActive:l().string,className:l().string,cssModule:l().object,innerRef:l().oneOfType([l().object,l().string,l().func])}),j=y(y({},f.Ay.defaultProps),{},{tag:"div",baseClass:"fade",baseClassActive:"show",timeout:p.Q6.Fade,appear:!0,enter:!0,exit:!0,in:!0});function x(e){var t=(0,r.useRef)(null),n=e.tag,i=e.baseClass,s=e.baseClassActive,o=e.className,a=e.cssModule,l=e.children,c=e.innerRef,m=void 0===c?t:c,y=b(e,d),g=(0,p.Up)(y,p.PS),O=(0,p.cJ)(y,p.PS);return r.createElement(f.Ay,h({nodeRef:m},g),(function(e){var t="entered"===e,c=(0,p.qO)(u()(o,i,t&&s),a);return r.createElement(n,h({className:c},O,{ref:m}),l)}))}x.propTypes=O,x.defaultProps=j;const v=x;var E=["className","closeClassName","closeAriaLabel","cssModule","tag","color","isOpen","toggle","children","transition","fade","innerRef"];function k(){return k=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},k.apply(this,arguments)}function w(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function N(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?N(Object(n),!0).forEach((function(t){A(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):N(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function A(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var T={children:l().node,className:l().string,closeClassName:l().string,closeAriaLabel:l().string,color:l().string,cssModule:l().object,fade:l().bool,innerRef:l().oneOfType([l().object,l().string,l().func]),isOpen:l().bool,tag:p.Wx,toggle:l().func,transition:l().shape(v.propTypes)},S={color:"success",isOpen:!0,tag:"div",closeAriaLabel:"Close",fade:!0,transition:P(P({},v.defaultProps),{},{unmountOnExit:!0})};function C(e){var t=e.className,n=e.closeClassName,i=e.closeAriaLabel,s=e.cssModule,o=e.tag,a=e.color,l=e.isOpen,c=e.toggle,f=e.children,d=e.transition,h=e.fade,b=e.innerRef,m=w(e,E),y=(0,p.qO)(u()(t,"alert","alert-".concat(a),{"alert-dismissible":c}),s),g=(0,p.qO)(u()("btn-close",n),s),O=P(P(P({},v.defaultProps),d),{},{baseClass:h?d.baseClass:"",timeout:h?d.timeout:0});return r.createElement(v,k({},m,O,{tag:o,className:y,in:l,role:"alert",innerRef:b}),c?r.createElement("button",{type:"button",className:g,"aria-label":i,onClick:c}):null,f)}C.propTypes=T,C.defaultProps=S;const R=C;function M(e){return M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},M(e)}function D(){return D=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},D.apply(this,arguments)}function I(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _(e,t){return _=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},_(e,t)}function G(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=W(e);if(t){var i=W(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return function(e,t){if(t&&("object"===M(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return L(e)}(this,n)}}function L(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function W(e){return W=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},W(e)}const q=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&_(e,t)}(o,e);var t,n,i,s=G(o);function o(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),(t=s.call(this,e)).state={isOpen:!0},t.toggle=t.toggle.bind(L(t)),t}return t=o,(n=[{key:"toggle",value:function(){this.setState((function(e){return{isOpen:!e.isOpen}}))}},{key:"render",value:function(){return r.createElement(R,D({isOpen:this.state.isOpen,toggle:this.toggle},this.props))}}])&&I(t.prototype,n),i&&I(t,i),Object.defineProperty(t,"prototype",{writable:!1}),o}(r.Component);var U=n(579);const B=()=>{const[e,t]=(0,r.useState)(!0),n=()=>{t(!1)};return(0,U.jsxs)("div",{children:[(0,U.jsxs)(i.A,{children:[(0,U.jsxs)(s.A,{tag:"h6",className:"border-bottom p-3 mb-0",children:[(0,U.jsx)("i",{className:"bi bi-bell me-2",children:" "}),"Alert"]}),(0,U.jsx)(o.A,{className:"",children:(0,U.jsxs)("div",{className:"mt-3",children:[(0,U.jsx)(R,{color:"primary",children:"This is a primary alert\u2014 check it out!"}),(0,U.jsx)(R,{color:"secondary",children:"This is a secondary alert\u2014 check it out!"}),(0,U.jsx)(R,{color:"success",children:"This is a success alert\u2014 check it out!"}),(0,U.jsx)(R,{color:"danger",children:"This is a danger alert\u2014 check it out!"}),(0,U.jsx)(R,{color:"warning",children:"This is a warning alert\u2014 check it out!"}),(0,U.jsx)(R,{color:"info",children:"This is a info alert\u2014 check it out!"}),(0,U.jsx)(R,{color:"light",children:"This is a light alert\u2014 check it out!"}),(0,U.jsx)(R,{color:"dark",children:"This is a dark alert"})]})})]}),(0,U.jsxs)(i.A,{children:[(0,U.jsxs)(s.A,{tag:"h6",className:"border-bottom p-3 mb-0",children:[(0,U.jsx)("i",{className:"bi bi-bell me-2"}),"Alert with Links"]}),(0,U.jsx)(o.A,{className:"",children:(0,U.jsxs)("div",{children:[(0,U.jsxs)(R,{color:"primary",children:["This is a primary alert with",(0,U.jsx)("a",{href:"/",className:"alert-link",children:"an example link"}),". Give it a click if you like."]}),(0,U.jsxs)(R,{color:"secondary",children:["This is a secondary alert with",(0,U.jsx)("a",{href:"/",className:"alert-link",children:"an example link"}),". Give it a click if you like."]}),(0,U.jsxs)(R,{color:"success",children:["This is a success alert with",(0,U.jsx)("a",{href:"/",className:"alert-link",children:"an example link"}),". Give it a click if you like."]}),(0,U.jsxs)(R,{color:"danger",children:["This is a danger alert with",(0,U.jsx)("a",{href:"/",className:"alert-link",children:"an example link"}),". Give it a click if you like."]}),(0,U.jsxs)(R,{color:"warning",children:["This is a warning alert with",(0,U.jsx)("a",{href:"/",className:"alert-link",children:"an example link"}),". Give it a click if you like."]}),(0,U.jsxs)(R,{color:"info",children:["This is a info alert with",(0,U.jsx)("a",{href:"/",className:"alert-link",children:"an example link"}),". Give it a click if you like."]}),(0,U.jsxs)(R,{color:"light",children:["This is a light alert with",(0,U.jsx)("a",{href:"/",className:"alert-link",children:"an example link"}),". Give it a click if you like."]}),(0,U.jsxs)(R,{color:"dark",children:["This is a dark alert with",(0,U.jsx)("a",{href:"/",className:"alert-link",children:"an example link"}),". Give it a click if you like."]})]})})]}),(0,U.jsxs)(i.A,{children:[(0,U.jsxs)(s.A,{tag:"h6",className:"border-bottom p-3 mb-0",children:[(0,U.jsx)("i",{className:"bi bi-bell me-2"}),"Alert with Additional content"]}),(0,U.jsx)(o.A,{className:"",children:(0,U.jsx)("div",{children:(0,U.jsxs)(R,{color:"success",children:[(0,U.jsx)("h4",{className:"alert-heading",children:"Well done!"}),(0,U.jsx)("p",{children:"Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content."}),(0,U.jsx)("hr",{}),(0,U.jsx)("p",{className:"mb-0",children:"Whenever you need to, be sure to use margin utilities to keep things nice and tidy."})]})})})]}),(0,U.jsxs)(i.A,{children:[(0,U.jsxs)(s.A,{tag:"h6",className:"border-bottom p-3 mb-0",children:[(0,U.jsx)("i",{className:"bi bi-bell me-2"}),"Alert with Dissmissing"]}),(0,U.jsx)(o.A,{className:"",children:(0,U.jsx)("div",{children:(0,U.jsx)(R,{color:"info",isOpen:e,toggle:n.bind(null),children:"I am an alert and I can be dismissed!"})})})]}),(0,U.jsxs)(i.A,{children:[(0,U.jsxs)(s.A,{tag:"h6",className:"border-bottom p-3 mb-0",children:[(0,U.jsx)("i",{className:"bi bi-bell me-2"}),"Alert with Uncontrolled [disable] Alerts"]}),(0,U.jsx)(o.A,{className:"",children:(0,U.jsx)("div",{children:(0,U.jsx)(q,{color:"info",children:"I am an alert and I can be dismissed!"})})})]}),(0,U.jsxs)(i.A,{children:[(0,U.jsxs)(s.A,{tag:"h6",className:"border-bottom p-3 mb-0",children:[(0,U.jsx)("i",{className:"bi bi-bell me-2"}),"Alerts without fade"]}),(0,U.jsx)(o.A,{className:"",children:(0,U.jsxs)("div",{children:[(0,U.jsx)(R,{color:"primary",isOpen:e,toggle:n.bind(null),fade:!1,children:"I am a primary alert and I can be dismissed without animating!"}),(0,U.jsx)(q,{color:"warning",fade:!1,children:"I am an alert and I can be dismissed without animating!"})]})})]})]})}},9998:(e,t,n)=>{n.d(t,{Ay:()=>m});var r=n(8587),i=n(5540),s=n(5043),o=n(7950);const a=!1;var l=n(8726),c="unmounted",u="exited",p="entering",f="entered",d="exiting",h=function(e){function t(t,n){var r;r=e.call(this,t,n)||this;var i,s=n&&!n.isMounting?t.enter:t.appear;return r.appearStatus=null,t.in?s?(i=u,r.appearStatus=p):i=f:i=t.unmountOnExit||t.mountOnEnter?c:u,r.state={status:i},r.nextCallback=null,r}(0,i.A)(t,e),t.getDerivedStateFromProps=function(e,t){return e.in&&t.status===c?{status:u}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(e){var t=null;if(e!==this.props){var n=this.state.status;this.props.in?n!==p&&n!==f&&(t=p):n!==p&&n!==f||(t=d)}this.updateStatus(!1,t)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var e,t,n,r=this.props.timeout;return e=t=n=r,null!=r&&"number"!==typeof r&&(e=r.exit,t=r.enter,n=void 0!==r.appear?r.appear:t),{exit:e,enter:t,appear:n}},n.updateStatus=function(e,t){if(void 0===e&&(e=!1),null!==t)if(this.cancelNextCallback(),t===p){if(this.props.unmountOnExit||this.props.mountOnEnter){var n=this.props.nodeRef?this.props.nodeRef.current:o.findDOMNode(this);n&&function(e){e.scrollTop}(n)}this.performEnter(e)}else this.performExit();else this.props.unmountOnExit&&this.state.status===u&&this.setState({status:c})},n.performEnter=function(e){var t=this,n=this.props.enter,r=this.context?this.context.isMounting:e,i=this.props.nodeRef?[r]:[o.findDOMNode(this),r],s=i[0],l=i[1],c=this.getTimeouts(),u=r?c.appear:c.enter;!e&&!n||a?this.safeSetState({status:f},(function(){t.props.onEntered(s)})):(this.props.onEnter(s,l),this.safeSetState({status:p},(function(){t.props.onEntering(s,l),t.onTransitionEnd(u,(function(){t.safeSetState({status:f},(function(){t.props.onEntered(s,l)}))}))})))},n.performExit=function(){var e=this,t=this.props.exit,n=this.getTimeouts(),r=this.props.nodeRef?void 0:o.findDOMNode(this);t&&!a?(this.props.onExit(r),this.safeSetState({status:d},(function(){e.props.onExiting(r),e.onTransitionEnd(n.exit,(function(){e.safeSetState({status:u},(function(){e.props.onExited(r)}))}))}))):this.safeSetState({status:u},(function(){e.props.onExited(r)}))},n.cancelNextCallback=function(){null!==this.nextCallback&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(e,t){t=this.setNextCallback(t),this.setState(e,t)},n.setNextCallback=function(e){var t=this,n=!0;return this.nextCallback=function(r){n&&(n=!1,t.nextCallback=null,e(r))},this.nextCallback.cancel=function(){n=!1},this.nextCallback},n.onTransitionEnd=function(e,t){this.setNextCallback(t);var n=this.props.nodeRef?this.props.nodeRef.current:o.findDOMNode(this),r=null==e&&!this.props.addEndListener;if(n&&!r){if(this.props.addEndListener){var i=this.props.nodeRef?[this.nextCallback]:[n,this.nextCallback],s=i[0],a=i[1];this.props.addEndListener(s,a)}null!=e&&setTimeout(this.nextCallback,e)}else setTimeout(this.nextCallback,0)},n.render=function(){var e=this.state.status;if(e===c)return null;var t=this.props,n=t.children,i=(t.in,t.mountOnEnter,t.unmountOnExit,t.appear,t.enter,t.exit,t.timeout,t.addEndListener,t.onEnter,t.onEntering,t.onEntered,t.onExit,t.onExiting,t.onExited,t.nodeRef,(0,r.A)(t,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]));return s.createElement(l.A.Provider,{value:null},"function"===typeof n?n(e,i):s.cloneElement(s.Children.only(n),i))},t}(s.Component);function b(){}h.contextType=l.A,h.propTypes={},h.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:b,onEntering:b,onEntered:b,onExit:b,onExiting:b,onExited:b},h.UNMOUNTED=c,h.EXITED=u,h.ENTERING=p,h.ENTERED=f,h.EXITING=d;const m=h},8726:(e,t,n)=>{n.d(t,{A:()=>r});const r=n(5043).createContext(null)},9157:(e,t,n)=>{n.d(t,{A:()=>h});var r=n(5043),i=n(5173),s=n.n(i),o=n(8139),a=n.n(o),l=n(6794),c=["className","cssModule","color","body","inverse","outline","tag","innerRef"];function u(){return u=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u.apply(this,arguments)}function p(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var f={body:s().bool,className:s().string,color:s().string,cssModule:s().object,innerRef:s().oneOfType([s().object,s().string,s().func]),inverse:s().bool,outline:s().bool,tag:l.Wx};function d(e){var t=e.className,n=e.cssModule,i=e.color,s=e.body,o=e.inverse,f=e.outline,d=e.tag,h=e.innerRef,b=p(e,c),m=(0,l.qO)(a()(t,"card",!!o&&"text-white",!!s&&"card-body",!!i&&"".concat(f?"border":"bg","-").concat(i)),n);return r.createElement(d,u({},b,{className:m,ref:h}))}d.propTypes=f,d.defaultProps={tag:"div"};const h=d},8353:(e,t,n)=>{n.d(t,{A:()=>h});var r=n(5043),i=n(5173),s=n.n(i),o=n(8139),a=n.n(o),l=n(6794),c=["className","cssModule","innerRef","tag"];function u(){return u=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u.apply(this,arguments)}function p(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var f={className:s().string,cssModule:s().object,innerRef:s().oneOfType([s().object,s().string,s().func]),tag:l.Wx};function d(e){var t=e.className,n=e.cssModule,i=e.innerRef,s=e.tag,o=p(e,c),f=(0,l.qO)(a()(t,"card-body"),n);return r.createElement(s,u({},o,{className:f,ref:i}))}d.propTypes=f,d.defaultProps={tag:"div"};const h=d},5299:(e,t,n)=>{n.d(t,{A:()=>h});var r=n(5043),i=n(5173),s=n.n(i),o=n(8139),a=n.n(o),l=n(6794),c=["className","cssModule","tag"];function u(){return u=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u.apply(this,arguments)}function p(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var f={className:s().string,cssModule:s().object,tag:l.Wx};function d(e){var t=e.className,n=e.cssModule,i=e.tag,s=p(e,c),o=(0,l.qO)(a()(t,"card-title"),n);return r.createElement(i,u({},s,{className:o}))}d.propTypes=f,d.defaultProps={tag:"div"};const h=d},5540:(e,t,n)=>{function r(e,t){return r=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},r(e,t)}function i(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,r(e,t)}n.d(t,{A:()=>i})},8587:(e,t,n)=>{function r(e,t){if(null==e)return{};var n,r,i={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}n.d(t,{A:()=>r})}}]);
//# sourceMappingURL=123.058098a4.chunk.js.map