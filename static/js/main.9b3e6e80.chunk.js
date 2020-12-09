(this["webpackJsonpsolitaire-react"]=this["webpackJsonpsolitaire-react"]||[]).push([[0],{10:function(t,e,n){},17:function(t,e,n){"use strict";n.r(e);var s=n(0),i=(n(10),n(1)),a=n(2),r=n(8),o=n(5),c=n(4),u=n(6),l=n(3),d=n.n(l),h=function(t){Object(o.a)(n,t);var e=Object(c.a)(n);function n(t){var s;return Object(i.a)(this,n),(s=e.call(this,t)).state={timeElapsed:null},s}return Object(a.a)(n,[{key:"componentDidMount",value:function(){var t=this;setInterval((function(){t.setState((function(e){var n=(t.props.end||Date.now())-t.props.started,s=Math.floor(n/1e3/60/60);n-=1e3*s*60*60;var i=Math.floor(n/1e3/60);n-=1e3*i*60;var a=Math.floor(n/1e3);return n-=1e3*a,e.timeElapsed=s?s+":"+i+":"+a:i+":"+a,Object(u.a)({},e)}))}),1e3)}},{key:"render",value:function(){return Object(s.jsxs)("span",{className:this.props.className,children:["Time Elapsed: ",this.state.timeElapsed]})}}]),n}(l.Component),p=function(t){Object(o.a)(n,t);var e=Object(c.a)(n);function n(){return Object(i.a)(this,n),e.apply(this,arguments)}return Object(a.a)(n,[{key:"componentDidMount",value:function(){var t=this;document.addEventListener("keydown",(function(e){var n=window.event?event:e;90==n.keyCode&&n.ctrlKey&&t.props.undo()}))}},{key:"render",value:function(){return Object(s.jsx)("div",{children:Object(s.jsxs)("button",{onClick:this.props.undo,children:["undo (penalty:-",this.props.undoLabel(),")"]})})}}]),n}(l.Component),f=function(t){return Object(s.jsx)("div",{className:"footer",children:Object(s.jsxs)("div",{className:"footer-grid-container",children:[Object(s.jsxs)("div",{className:"stats",children:["Game Stats",Object(s.jsxs)("div",{children:["Points: ",t.model.points]}),Object(s.jsx)(h,{className:"clock",started:t.model.started,end:t.model.end}),Object(s.jsxs)("div",{children:["Is Ended: ",t.model.isEnded?"Y":"N"]})]}),Object(s.jsxs)("div",{className:"actions",children:["Game Actions",Object(s.jsx)("div",{children:Object(s.jsx)("button",{onClick:t.reset,children:"reset"})}),Object(s.jsx)(p,{undo:t.undo,undoLabel:t.undoLabel}),Object(s.jsx)("div",{})]}),Object(s.jsxs)("div",{className:"entropy",children:["Entropy",Object(s.jsx)("div",{children:Object(s.jsx)("button",{onClick:t.beat,children:"beat on table"})}),Object(s.jsxs)("div",{children:["Base Level",Object(s.jsx)("select",{onChange:function(e){return t.setBaseEntropy(e.target.value)},value:t.settings.baseEntropy,children:t.settings.entropyLevels.map((function(t,e){return Object(s.jsx)("option",{value:e,children:t},t)}))})]}),Object(s.jsxs)("div",{children:["Interaction Level",Object(s.jsx)("select",{onChange:function(e){return t.setInteractionEntropy(e.target.value)},value:t.settings.interactionEntropy,children:t.settings.entropyLevels.map((function(t,e){return Object(s.jsx)("option",{value:e,children:t},t)}))})]})]}),Object(s.jsxs)("div",{className:"settings",children:["UI Settings",Object(s.jsxs)("div",{children:["Card",Object(s.jsx)("select",{onChange:function(e){return t.setMouseMode(e.target.value)},value:t.settings.mouseMode,children:t.settings.mouseModes.map((function(t){return Object(s.jsx)("option",{value:t,children:t},t)}))})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{onClick:t.toggle3d,children:"Toggle 3D"})})]}),Object(s.jsxs)("div",{className:"report",children:["Report Issues",Object(s.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://github.com/ckonig/solitaire/issues",children:"here"}),"."]})]})})},k=function(t){Object(o.a)(n,t);var e=Object(c.a)(n);function n(){return Object(i.a)(this,n),e.apply(this,arguments)}return Object(a.a)(n,[{key:"componentDidUpdate",value:function(){this.props.model.blinkFor&&this.props.model.unblink()}}]),n}(l.Component),b=function(t){Object(o.a)(n,t);var e=Object(c.a)(n);function n(t){var s;return Object(i.a)(this,n),(s=e.call(this,t)).onClick=function(t){for(var e=t.target;e&&!e.className.includes("card-base");)e=e.offsetParent;var n=e.getBoundingClientRect(),i={click:{x:t.clientX,y:t.clientY},element:{x:n.x,y:n.y}};s.props.onClick(Object(u.a)({},s.props.model),i)},s}return Object(a.a)(n,[{key:"render",value:function(){var t=this.props,e=t.model,n=t.className+" card card-base suit-"+e.type.icon;n+=t.isSelected?" card-selected":"",n+=t.blink?" blink":"";var i=Object(u.a)({zIndex:t.zIndex?t.zIndex:!!t.offsetTop+2,top:t.offsetTop?t.offsetTop/10+"vw":0},t.model.entropyStyle);if(!t.isSelected&&!t.blink&&(t.shadowOffsetX||!t.shadowOffsetX&&0===t.shadowOffsetX)){var a=t.shadowOffsetY||"-1";i.boxShadow=t.shadowOffsetX+"px "+a+"px 4px 4px rgba(0, 0, 0, 0.75)"}var r={};this.props.onClick||(i.pointerEvents="none",r.pointerEvents="none");var o=function(t){return Object(s.jsx)("div",{style:r,className:t.className,children:t.children})};return Object(s.jsx)(o,{className:"stack-base",children:Object(s.jsx)("div",{style:i,className:n,onClick:this.onClick?this.onClick:null,children:e.isHidden?Object(s.jsx)("div",{className:"card-back quarot",children:"\xa0"}):Object(s.jsxs)("div",{className:"card-grid-container",children:[Object(s.jsx)("div",{children:Object(s.jsx)("div",{className:"align-center",children:e.type.icon})}),Object(s.jsx)("div",{children:Object(s.jsx)("div",{className:"align-left",children:e.face})}),Object(s.jsx)("div",{children:"\xa0"}),Object(s.jsx)("div",{children:Object(s.jsx)("div",{className:"align-center",children:e.type.icon})}),Object(s.jsx)("div",{className:"mainface",children:Object(s.jsx)("div",{className:"align-center",children:e.face})}),Object(s.jsx)("div",{children:Object(s.jsx)("div",{className:"align-center",children:e.type.icon})}),Object(s.jsx)("div",{children:"\xa0"}),Object(s.jsx)("div",{children:Object(s.jsx)("div",{className:"align-right",children:e.face})}),Object(s.jsx)("div",{children:Object(s.jsx)("div",{className:"align-center",children:e.type.icon})})]})})})}}]),n}(l.Component),v=function(t){Object(o.a)(n,t);var e=Object(c.a)(n);function n(t){var s;return Object(i.a)(this,n),(s=e.call(this,t)).onMouseMove=function(t){s.state.positionFixed&&s.setState((function(t){return t.positionFixed=!1,Object(u.a)({},t)})),s.updateDisplay(t)},s.myRef=d.a.createRef(),s.state={positionFixed:!0},s.onMouseMove=s.onMouseMove.bind(Object(r.a)(s)),s.onKeyDown=s.onKeyDown.bind(Object(r.a)(s)),s}return Object(a.a)(n,[{key:"componentDidMount",value:function(){document.addEventListener("mousemove",this.onMouseMove,!1),this.props.putBack&&document.addEventListener("keydown",this.onKeyDown,!1),this.setState((function(){return{positionFixed:!0}}))}},{key:"componentWillUnmount",value:function(){document.removeEventListener("mousemove",this.onMouseMove,!1),document.addEventListener("keydown",this.onKeyDown,!1)}},{key:"updateDisplay",value:function(t){if(!this.state.positionFixed){var e=this.myRef.current;if(this.props.hand&&this.props.parent==this.props.hand.source&&t){var n=t.clientX-this.props.hand.position.click.x+this.props.hand.position.element.x,s=t.clientY-this.props.hand.position.click.y+this.props.hand.position.element.y;e.style.top=s+"px",e.style.left=n+"px",e.style.position="absolute"}}}},{key:"onKeyDown",value:function(t){27==(window.event?event:t).keyCode&&this.props.hand&&this.props.parent==this.props.hand.source&&this.props.putBack()}},{key:"render",value:function(){var t=this,e=function(e){return t.state.positionFixed?t.props.offsetTop+24*e:24*e};return this.props.hand&&this.props.parent===this.props.hand.source?Object(s.jsx)("div",{ref:this.myRef,style:{},children:this.props.hand&&this.props.hand.stack&&this.props.hand.stack.map((function(t,n){return Object(s.jsx)(b,{model:t,offsetTop:e(n),zIndex:1e3+20*n,isSelected:!0},n)}))}):null}}]),n}(l.Component),j=function(t){Object(o.a)(n,t);var e=Object(c.a)(n);function n(){return Object(i.a)(this,n),e.apply(this,arguments)}return Object(a.a)(n,[{key:"render",value:function(){var t=this;return this.props.hand&&this.props.parent===this.props.hand.source?[this.props.hand&&this.props.hand.stack&&this.props.hand.stack.map((function(e,n){return Object(s.jsx)(b,{model:e,shadowOffsetX:t.props.shadowOffsetX,shadowOffsetY:t.props.shadowOffsetY,offsetTop:t.props.offsetTop+24*n,zIndex:1e3+20*n,isSelected:!0,onClick:function(e){return t.props.onClick(e)}},n)}))]:null}}]),n}(l.Component),m=function(t){if(!t.model||t.parent!==t.model.source)return null;var e=function(e,n){return t.onClick(t.stack[t.stack.length-1],n,t.stack.length-1)};return"follow-cursor"==t.settings.mouseMode?Object(s.jsx)(v,{parent:t.parent,hand:t.model,offsetTop:t.offsetTop,putBack:e}):"remain-on-stack"==t.settings.mouseMode?Object(s.jsx)(j,{parent:t.parent,hand:t.model,shadowOffsetX:t.shadowOffsetX,shadowOffsetY:t.shadowOffsetY,offsetTop:t.offsetTop,onClick:e}):null},g=function(t){var e="card-base";return t.visible?t.blink?e+=" socket-blink":e+=" socket-empty":e+=" socket-full",Object(s.jsx)("div",{className:e,onClick:function(){return t.onClick()},children:t.children})},O=function(t){Object(o.a)(n,t);var e=Object(c.a)(n);function n(){return Object(i.a)(this,n),e.apply(this,arguments)}return Object(a.a)(n,[{key:"render",value:function(){var t=this.props,e=this.props.model,n=this.props.stackindex,i=this.props.settings;return Object(s.jsxs)("div",{children:[Object(s.jsx)(g,{blink:e.blinkFor,onClick:function(){return t.onClick(null,null,n)},visible:!e.stack.length,children:Object(s.jsx)("div",{className:"align-center foundation-base suit-"+e.icon,children:e.icon})}),e.stack.map((function(i,a){return Object(s.jsx)(b,{model:i,shadowOffsetX:2*n,shadowOffsetY:-3,blink:e.blinkFor,onClick:function(e,s){return t.onClick(e,s,n)}},a)})),Object(s.jsx)(m,{settings:i,parent:"foundation-"+n,shadowOffsetX:2*n,shadowOffsetY:-3,onClick:function(s,i){return t.onClick(e.stack[e.stack.length-1],i,n)},model:t.hand,stack:e.stack})]},n)}}]),n}(k);O.Stacks=function(t){return t.model.stacks.map((function(e,n){return Object(s.jsx)(O,{hand:t.hand,model:e,stackindex:n,settings:t.settings,onClick:function(e,s){return t.onClick(e,s,n)}},n)}))};var y=function(t){Object(o.a)(n,t);var e=Object(c.a)(n);function n(){return Object(i.a)(this,n),e.apply(this,arguments)}return Object(a.a)(n,[{key:"render",value:function(){var t=this.props;return Object(s.jsxs)("div",{children:[Object(s.jsx)(g,{blink:t.model.blinkFor,onClick:t.onClick,visible:!t.model.stack.length}),t.model.stack.map((function(e,n){return Object(s.jsx)(b,{model:e,offsetTop:n/2*-1,blink:t.model.blinkFor,shadowOffsetX:-6,shadowOffsetY:-3,onClick:t.onClick},n)}))]})}}]),n}(k),w=function(t){Object(o.a)(n,t);var e=Object(c.a)(n);function n(){return Object(i.a)(this,n),e.apply(this,arguments)}return Object(a.a)(n,[{key:"render",value:function(){var t=this.props,e=function(e){for(var n=0;n<=e;n++)if(t.model.stack[n]&&!t.model.stack[n].isHidden)return 12*n+24*(e-n);return 12*e};return Object(s.jsxs)("div",{children:[Object(s.jsx)(g,{blink:t.model.blinkFor,onClick:function(){return t.onClick(null,null,"tableau-"+t.index)},visible:!t.model.stack.length}),t.model.stack.map((function(n,i){return Object(s.jsx)(b,{model:n,blink:t.model.blinkFor,shadowOffsetX:2*(-3+t.index),offsetTop:e(i),onClick:t.onClick},i)})),Object(s.jsx)(m,{settings:t.settings,parent:"tableau-"+t.index,onClick:t.onClick,model:t.hand,stack:t.model.stack,shadowOffsetX:2*(-3+t.index),offsetTop:e(t.model.stack.length)})]})}}]),n}(k);w.Stacks=function(t){return t.model.stacks.map((function(e,n){return Object(s.jsx)(w,{settings:t.settings,index:n,model:e,hand:t.hand,onClick:function(e,s){return t.onClick(e,s,n)}},n)}))};var x=function(t){Object(o.a)(n,t);var e=Object(c.a)(n);function n(){return Object(i.a)(this,n),e.apply(this,arguments)}return Object(a.a)(n,[{key:"render",value:function(){var t=this.props;return Object(s.jsxs)("div",{children:[Object(s.jsx)(g,{blink:t.model.blinkFor,onClick:function(){return t.onClick(null,null)},visible:!t.model.stack.length}),t.model.stack.map((function(e,n){return Object(s.jsx)(b,{model:e,shadowOffsetX:-4,shadowOffsetY:-3,offsetTop:n/2*-1,blink:t.model.blinkFor,onClick:function(e,n){return t.onClick(e,n)}},n)})),Object(s.jsx)(m,{settings:t.model.settings,shadowOffsetX:-4,shadowOffsetY:-3,offsetTop:t.model.stack.length/2*-1,parent:"waste",onClick:t.onClick,model:t.hand,stack:t.model.stack})]})}}]),n}(k),C=function(t){var e="game-view",n="board-grid-container";return t.model.settings.is3D&&(e+=" game-view-3d",n+=" board-3d"),Object(s.jsx)("div",{children:Object(s.jsxs)("div",{className:"layout-grid-container",children:[Object(s.jsx)("div",{className:e,children:Object(s.jsxs)("div",{className:n,children:[Object(s.jsx)(y,{model:t.model.stock,onClick:t.handlers.clickStock}),Object(s.jsx)(x,{model:t.model.waste,hand:t.model.hand,onClick:t.handlers.clickWaste}),Object(s.jsx)("div",{className:"spacer",children:"\xa0"}),Object(s.jsx)(O.Stacks,{settings:t.model.settings,model:t.model.foundation,hand:t.model.hand,onClick:t.handlers.clickFoundation}),Object(s.jsx)(w.Stacks,{settings:t.model.settings,model:t.model.tableau,hand:t.model.hand,onClick:t.handlers.clickTableau})]})}),Object(s.jsx)(f,{reset:t.handlers.reset,undoLabel:t.handlers.undoLabel,undo:t.handlers.undo,setMouseMode:t.handlers.setMouseMode,setBaseEntropy:t.handlers.setBaseEntropy,setInteractionEntropy:t.handlers.setInteractionEntropy,toggle3d:t.handlers.toggle3d,beat:t.handlers.beat,settings:t.model.settings,model:t.model.game})]})})},E=n(7),M=function(){function t(e,n,s){var a=this;Object(i.a)(this,t),this.causeEntropy=function(t){var e=2*t,n=function(){return Math.random()<.5},s=function(t,e){return Math.random()*(e-t)+t};n()&&(n()?a.entropyStyle.left=s(0,e/2):a.entropyStyle.right=s(0,e/2),n()),a.entropyStyle.transform="rotate("+s(-1*e,e)+"deg)"},this.equals=function(e){return t.equals(a,e)},this.face=e,this.type=n,this.isHidden=s,this.entropyStyle={},this.offsetTop=0,this.causeEntropy(1)}return Object(a.a)(t,null,[{key:"equals",value:function(t,e){return!t&&!e||t&&e&&e.face==t.face&&e.type.icon==t.type.icon}}]),t}();M.copy=function(t){var e=new M(t.face,t.type,t.isHidden);return e.source=t.source,e.entropyStyle=t.entropyStyle,e},M.copyAll=function(t){return t.map((function(t){return M.copy(t)}))};var S=["2","3","4","5","6","7","8","9","10","J","Q","K","A"],T={heart:{icon:"\u2665",color:"red"},club:{icon:"\u2663",color:"black"},diamond:{icon:"\u2666",color:"red"},spade:{icon:"\u2660",color:"black"}},D=function(){function t(){Object(i.a)(this,t);var e=Object.keys(T);this.cards=S.map((function(t){return Object(E.a)(e.map((function(e){return new M(t,T[e],!0)})))})).flat()}return Object(a.a)(t,[{key:"shuffle",value:function(){return this.shuffleArray(this.cards),this}},{key:"shuffleArray",value:function(t){for(var e=t.length-1;e>0;e--){var n=Math.floor(Math.random()*(e+1)),s=[t[n],t[e]];t[e]=s[0],t[n]=s[1]}}}]),t}(),N=function(){function t(e){var n=this;Object(i.a)(this,t),this.getCurrentAccepted=function(t){var e=n.stacks[t].acceptedCards;return e[e.length-1]},this.accepts=function(t,e){var s=n.getCurrentAccepted(t);return n.stacks[t].icon==e.type.icon&&s==e.face},this.add=function(t,e){var s=e[0];return s.causeEntropy(Math.min(n.settings.interactionEntropy,3)),s.source="foundation-"+t,n.stacks[t].stack.push(s),n.stacks[t].usedCards.push(n.stacks[t].acceptedCards.pop())},this.remove=function(t,e){return n.stacks[t].acceptedCards.push(n.stacks[t].usedCards.pop()),e&&e.equals(n.getTop(t))&&n.stacks[t].stack.pop()},this.getPreviousUsed=function(t){return Object(E.a)(n.stacks[t].usedCards).pop()},this.countCards=function(){return n.stacks.map((function(t){return parseInt(t.stack.length)})).reduce((function(t,e){return t+e}),0)},this.setEntropy=function(t){return n.stacks.forEach((function(e){return e.stack.forEach((function(e){return e.causeEntropy(Math.min(3,t))}))})),n},this.settings=e;var s=Object.keys(T).map((function(t){return T[t]})).map((function(t){return Object(u.a)(Object(u.a)({},{stack:[],acceptedCards:Object(E.a)(["A"].concat(Object(E.a)(S.slice(0,S.length-1))).reverse()),usedCards:[],icon:null,color:null}),t)}));this.stacks=Object(E.a)(s)}return Object(a.a)(t,[{key:"getTop",value:function(t){return this.stacks[t].stack[this.stacks[t].stack.length-1]}}]),t}();N.copy=function(t){var e=new N(t.settings);return e.stacks=t.stacks.map((function(t){return{stack:M.copyAll(t.stack),acceptedCards:Object(E.a)(t.acceptedCards),usedCards:Object(E.a)(t.usedCards),icon:t.icon,color:t.color}})),e};var H=function(){function t(){var e=this;Object(i.a)(this,t),this.popPreviousState=function(t,n){for(var s=e.previousStates.length-1==t,i=function(){return s&&e.previousStates&&e.previousStates.pop()},a=i();a&&(!a.game.memorable||e.modelEquals(a,n))&&e.previousStates.length;)a=i();return a&&a.game&&(a.game.points=Math.min(a.game.points,e.points)-Math.pow(2,e.multiplicator),a.game.multiplicator=e.multiplicator+1),a},this.points=0,this.started=Date.now(),this.previousStates=[],this.memorable=!0,this.modified=!1,this.multiplicator=1}return Object(a.a)(t,[{key:"registerMove",value:function(t,e){this.memorable=!0,this.modified=!0;var n={source:e,target:t};return e==t&&(this.memorable=!1),this.points+=this.rateMove(n),!0}},{key:"stackEquals",value:function(t,e){return t.stack.every((function(t,n){return M.equals(t,e.stack[n])&&t.isHidden==e.stack[n].isHidden}))}},{key:"stacksEqual",value:function(t,e){var n=this;return t.stacks.every((function(t,s){return n.stackEquals(t,e.stacks[s])}))}},{key:"modelEquals",value:function(t,e){return this.stackEquals(t.stock,e.stock)&&this.stackEquals(t.waste,e.waste)&&this.stacksEqual(t.tableau,e.tableau)&&this.stacksEqual(t.foundation,e.foundation)}},{key:"pushPreviousState",value:function(t){var e=this.previousStates[this.previousStates.length-1];e&&this.modelEquals(t,e)||this.previousStates.push(t)}},{key:"registerPickup",value:function(){return this.modified=!0,this.memorable=!1,!0}},{key:"registerRecycle",value:function(){this.memorable=!0,this.modified=!0,this.points>0&&(this.points<100?this.points=0:this.points-=100),console.debug("RATING: subtract (max) 100 points for RECYCLE")}},{key:"registerUncover",value:function(){return this.memorable=!0,this.modified=!0,this.points+=5,console.debug("RATING: add 5 points for UNCOVER"),!0}},{key:"registerBlink",value:function(){return this.modified=!0,this.memorable=!1,!0}},{key:"rateMove",value:function(t){var e="tableau"==t.source.substr(0,7),n="tableau"==t.target.substr(0,7),s="foundation"==t.source.substr(0,10),i="foundation"==t.target.substr(0,10);if(e){if(i)return console.debug("RATING: add 10 points for MOVE tableau -> foundation"),10}else if("waste"==t.source){if(i)return console.debug("RATING: add 10 points for MOVE waste -> foundation"),10;if(n)return console.debug("RATING: add 5 points for MOVE waste -> tableau"),5}else if(s&&n)return console.debug("RATING: subtract 15 points for MOVE foundation -> tableau"),-15;return 0}}]),t}();H.copy=function(t){var e=new H;return e.points=t.points,e.started=t.started,e.modified=t.modified,e.multiplicator=t.multiplicator,e.memorable=t.memorable,e.previousStates=Object(E.a)(t.previousStates),e};var P=function(){function t(){var e=this;Object(i.a)(this,t),this.isHoldingCard=function(){return!!e.stack.length},this.currentCard=function(){return e.isHoldingCard()&&e.stack[0]},this.hasMoreThanOneCard=function(){return e.stack.length>1},this.isFromCurrentSource=function(t){return e.source&&t.source==e.source},this.stack=[],this.source=null,this.position=null}return Object(a.a)(t,[{key:"pickUp",value:function(t,e,n){return t&&t[0]&&(this.stack=t,this.source=e,this.position=n),t}},{key:"putDown",value:function(){return this.source=null,this.stack.splice(0,this.stack.length)}}]),t}();P.copy=function(t){var e=new P;return e.stack=M.copyAll(t.stack),e.source=t.source,e.position=t.position,e};var I=function(){function t(){Object(i.a)(this,t);var e=this.is_touch_device();this.mouseModes=["follow-cursor","remain-on-stack"],this.mouseMode=e?"remain-on-stack":"follow-cursor",this.entropyLevels=["none","low","regular","high","extreme"],this.baseEntropy=e?1:2,this.interactionEntropy=e?1:2,this.drawModes=["single"],this.drawMode="single",this.is3D=!1}return Object(a.a)(t,[{key:"is_touch_device",value:function(){try{var t=" -webkit- -moz- -o- -ms- ".split(" ");return"ontouchstart"in window||"undefined"!==typeof window.DocumentTouch&&document instanceof window.DocumentTouch||(e=["(",t.join("touch-enabled),("),"heartz",")"].join(""),window.matchMedia(e).matches)}catch(n){return console.error("(Touch detect failed)",n),!1}var e}}]),t}();I.copy=function(t){var e=new I;return e.is3D=t.is3D,e};var A=function(){function t(e,n){var s=this;Object(i.a)(this,t),this.isOnTop=function(t){return t&&t.equals(s.getTop())},this.getTop=function(){return s.stack[s.stack.length-1]},this.setEntropy=function(t){return s.stack.forEach((function(e){return e.causeEntropy(Math.min(t,1))})),s},this.settings=n,this.stack=e}return Object(a.a)(t,[{key:"recycle",value:function(t){var e=this;return!!t.length&&(this.stack=t.reverse().map((function(t){return t.causeEntropy(Math.min(e.settings.interactionEntropy,1)),t.isHidden=!0,t})),!0)}}]),t}();A.copy=function(t){var e=new A([],t.settings);return e.stack=M.copyAll(t.stack),e};var _=function(){function t(e,n){var s=this;Object(i.a)(this,t),this.getStack=function(t){return s.stacks[t]},this.accepts=function(t,e){var n=s.getTop(t);if(!n)return e&&"K"===e.face;if(n.isHidden)return!1;var i=Object(E.a)([].concat(S));return i.indexOf(e.face)+1==i.indexOf(n.face)&&e.type.color!==n.type.color},this.getCard=function(t,e){for(var n=0;n<s.stacks[t].stack.length;n++)if(e&&e.equals(s.stacks[t].stack[n])&&e.isHidden===s.stacks[t].stack[n].isHidden)return s.stacks[t].stack[n];return!1},this.popWithFollowing=function(t,e){for(var n=0;n<s.stacks[e].stack.length;n++)if(t&&t.equals(s.stacks[e].stack[n])){var i=s.stacks[e].stack.splice(n,s.stacks[e].stack.length);return s.stackEntropy(e),i}return[]},this.uncover=function(t,e){var n=s.getTop(t);return!!(n.isHidden&&e&&e.equals(s.getTop(t)))&&(n.isHidden=!1,s.stackEntropy(t),!0)},this.stackEntropy=function(t){for(var e=s.settings.interactionEntropy,n=1,i=s.getTop(t);e&&0!=e&&i;)i.causeEntropy(e),e--,i=s.getTop(t,n),n++},this.add=function(t,e){return s.stacks[t].stack=s.stacks[t].stack.concat(e.map((function(e){return s.setCardProperties(e,t)}))),s.stackEntropy(t),e},this.setCardProperties=function(t,e){return t.source="tableau-"+e,t},this.setEntropy=function(t){return s.stacks.forEach((function(e){return e.stack.forEach((function(e){return e.causeEntropy(Math.min(t,4))}))})),s},this.stacks=e?(new F).generateStacks(e):[],this.settings=n}return Object(a.a)(t,[{key:"getTop",value:function(t,e){return e||(e=0),this.stacks[t].stack[this.stacks[t].stack.length-1-e]}}]),t}();_.copy=function(t){var e=new _([],t.settings);return e.stacks=t.stacks.map((function(t){return{stack:M.copyAll(t.stack)}})),e};var F=function t(){var e=this;Object(i.a)(this,t),this.generateStacks=function(t){e.deck=t,e.pointer=0,e.oldpointer=e.pointer;var n=[0,1,2,3,4,5,6];return e.stacks=n.map((function(t){return e.template(t)})),n.reverse().forEach((function(t){e.generateStack(t)})),e.stacks},this.template=function(t){return{stack:[],id:t}},this.generateStack=function(t){e.pointer+=6-t+1,e.stacks[t].stack=e.deck.slice(e.oldpointer,e.pointer).map((function(e){return Object(u.a)(Object(u.a)({},e),{},{isHidden:!0,source:"tableau-"+t})})).reverse(),e.stacks[t].stack[e.stacks[t].stack.length-1]&&(e.stacks[t].stack[e.stacks[t].stack.length-1].isHidden=!1),e.oldpointer=e.pointer}},q=function t(e){var n=this;Object(i.a)(this,t),this.tryPutDown=function(t){return n.canAdd(t)&&(n.add(t)||!0)},this.add=function(t){return t&&n.stack.push(n.setCardProperties(t))},this.setCardProperties=function(t){return t.source="waste",t.isHidden=!1,t.causeEntropy(Math.min(n.settings.interactionEntropy,1)),t},this.canAdd=function(t){return t&&(!n.getTop()||!t.equals(n.getTop()))},this.popTop=function(t){return t&&t.equals(n.getTop())&&n.stack.pop()},this.recycle=function(){return n.stack.splice(0,n.stack.length)},this.getTop=function(){return n.stack[n.stack.length-1]},this.setEntropy=function(t){return n.stack.forEach((function(e){return e.causeEntropy(Math.min(t,1))})),n},this.settings=e,this.stack=[]};q.copy=function(t){var e=new q(t.settings);return e.stack=M.copyAll(t.stack),e};var B=function t(){Object(i.a)(this,t)};B.getInitialState=function(t){var e=new I;return{stock:new A(Object(E.a)(t.cards.slice(28)),e),waste:new q(e),foundation:new N(e),tableau:new _(Object(E.a)(t.cards.slice(0,28)),e),hand:new P,game:new H,settings:e}},B.copy=function(t){return{stock:A.copy(t.stock),waste:q.copy(t.waste),foundation:N.copy(t.foundation),tableau:_.copy(t.tableau),hand:P.copy(t.hand),game:H.copy(t.game),settings:I.copy(t.settings)}},B.setEntropy=function(t,e){return{stock:t.stock.setEntropy(e),waste:t.waste.setEntropy(e),foundation:t.foundation.setEntropy(e),tableau:t.tableau.setEntropy(e),hand:t.hand,game:t.game,settings:t.settings}};var L=function(){function t(e){var n=this;Object(i.a)(this,t),this.dispatchPutDown=function(t,e,s){n._setState((function(i){i.hand.isHoldingCard()&&n._dispatchPutDown(t,e,i,s)}),null,!0)},this.dispatchPickup=function(t,e,s){n._setState((function(i){i.hand.isHoldingCard()||n._dispatchPickup(t,e,i,s)}))},this._blink=function(t,e){return n.startBlink(t,10,e)},this.startBlink=function(t,e,s){t(s).blinkFor=e,s.game.registerBlink(),t(s).unblink=function(){return setTimeout((function(){return n.toggleBlink(t,0)}),100)}},this.toggleBlink=function(t,e){return n._setState((function(n){t(n).blinkFor=e,n.game.registerBlink()}))},this._setState=function(t,n){return e.setState((function(e){e.game.modified=!1;var n=B.copy(e);return t(e),e.game.modified?(e.game.pushPreviousState(n),Object(u.a)({},e)):null}),n)}}return Object(a.a)(t,[{key:"getHandler",value:function(t){var e="dispatchPickup";return t&&t.isHoldingCard()&&(e="dispatchPutDown"),this[e]}}]),t}(),X=function(t){Object(o.a)(n,t);var e=Object(c.a)(n);function n(){var t;Object(i.a)(this,n);for(var s=arguments.length,a=new Array(s),r=0;r<s;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a)))._dispatchPutDown=function(e,n,s,i){if(!s.hand.hasMoreThanOneCard()&&s.foundation.accepts(i,s.hand.currentCard())){var a=s.hand.source;s.foundation.add(i,s.hand.putDown())&&s.game.registerMove("foundation-"+i,a),t.tryDetectEnd(s)}else t.blink(i,s)},t._dispatchPickup=function(e,n,s,i){var a=s.foundation.getTop(i);a&&s.foundation.getPreviousUsed(i)===a.face?s.hand.pickUp([s.foundation.remove(i,a)],a.source,n)&&s.game.registerPickup():t.blink(i,s)},t.blink=function(e,n){return t._blink((function(t){return t.foundation.stacks[e]}),n)},t}return Object(a.a)(n,[{key:"tryDetectEnd",value:function(t){52===t.foundation.countCards()&&(t.game.isEnded=!0,t.game.end=Date.now())}}]),n}(L),R=function(){function t(e){var n=this;Object(i.a)(this,t),this.reset=function(t){return t.setState((function(t){return t.game.previousStates?t.game.previousStates[0]:Object(u.a)({},n.getInitialState())}))},this.undo=function(t,e,n){return e.setState((function(e){return e.game.popPreviousState(t,n)||null}))},this.undoLabel=function(t){return Math.pow(2,t.state.game.multiplicator)},this.getInitialState=e}return Object(a.a)(t,[{key:"getHandlers",value:function(t,e){var n=this;return{undo:function(){return n.undo(e.game.previousStates.length-1,t,e)},reset:function(){return n.reset(t)},undoLabel:function(){return Math.pow(2,t.state.game.multiplicator)}}}}]),t}(),U=function(){function t(){var e=this;Object(i.a)(this,t),this.beat=function(t){e.setBaseEntropy(t,4)},this.setBaseEntropy=function(t,e){t.setState((function(n){return n.settings.baseEntropy=e,t.setState((function(t){return B.setEntropy(t,t.settings.baseEntropy)})),n}))},this.setInteractionEntropy=function(t,e){t.setState((function(t){return t.settings.interactionEntropy=e,t}))},this.setMouseMode=function(t,e){t.setState((function(t){return t.settings.mouseMode=e,t}))},this.toggle3d=function(t,e){t.setState((function(t){return t.settings.is3D==e&&(t.settings.is3D=!t.settings.is3D),t}))}}return Object(a.a)(t,[{key:"getHandlers",value:function(t,e){var n=this;return{beat:function(){return n.beat(t)},setBaseEntropy:function(e){return n.setBaseEntropy(t,e)},setInteractionEntropy:function(e){return n.setInteractionEntropy(t,e)},setMouseMode:function(e){return n.setMouseMode(t,e)},toggle3d:function(){return n.toggle3d(t,e.settings.is3D)}}}}]),t}(),Y=function(t){Object(o.a)(n,t);var e=Object(c.a)(n);function n(){var t;Object(i.a)(this,n);for(var s=arguments.length,a=new Array(s),r=0;r<s;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a)))._dispatchPutDown=function(e,n,s){return t.blink(e,s)},t._dispatchPickup=function(e,n,s){return null!=e?t.moveToWaste(e,s):t.recycleWaste(e,s)},t.moveToWaste=function(t,e){return e.stock.isOnTop(t)&&e.waste.add(e.stock.stack.pop())&&e.game.registerMove("waste","stock")},t.recycleWaste=function(t,e){return!e.stock.getTop()&&!!e.waste.getTop()&&e.stock.recycle(e.waste.recycle())&&e.game.registerRecycle(e)},t.blink=function(e,n){return t._blink((function(t){return t.stock}),n)},t}return n}(L),W=function(t){Object(o.a)(n,t);var e=Object(c.a)(n);function n(){var t;Object(i.a)(this,n);for(var s=arguments.length,a=new Array(s),r=0;r<s;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a)))._dispatchPutDown=function(e,n,s,i){if(t.canPutDown(e,s,i)){var a=s.hand.source;s.tableau.add(i,s.hand.putDown())&&s.game.registerMove("tableau-"+i,a)}else t.blink(i,s)},t.canPutDown=function(t,e,n){return t&&t.isHidden&&e.hand.isFromCurrentSource(t)||e.tableau.accepts(n,e.hand.currentCard())||!t&&e.hand.source=="tableau-"+n},t._dispatchPickup=function(e,n,s,i){!e||t.tryUncover(e,i,s)||e.isHidden?e||t.blink(i,s):s.hand.pickUp(s.tableau.popWithFollowing(e,i),e.source,n)&&s.game.registerPickup()},t.tryUncover=function(t,e,n){return!n.hand.isHoldingCard()&&t.isHidden&&n.tableau.uncover(e,t)&&n.game.registerUncover()},t.blink=function(e,n){return t._blink((function(t){return t.tableau.stacks[e]}),n)},t}return n}(L),G=function(t){Object(o.a)(n,t);var e=Object(c.a)(n);function n(){var t;Object(i.a)(this,n);for(var s=arguments.length,a=new Array(s),r=0;r<s;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a)))._dispatchPutDown=function(e,n,s){return"waste"==s.hand.source&&s.waste.tryPutDown(s.hand.currentCard())&&s.hand.putDown()&&s.game.registerMove("waste","waste")||t.blink(s)},t._dispatchPickup=function(e,n,s){return e&&s.hand.pickUp([s.waste.popTop(e)],"waste",n)&&s.game.registerPickup()||t.blink(s)},t.blink=function(e){return t._blink((function(t){return t.waste}),e)},t}return n}(L),K=function(){function t(){var e=this;Object(i.a)(this,t),this.getInitialState=function(){return B.getInitialState(e.deck)},this.deck=new D,this.deck.shuffle()}return Object(a.a)(t,[{key:"getHandlers",value:function(t,e){return Object(u.a)(Object(u.a)(Object(u.a)({},new R(this.getInitialState).getHandlers(t,e)),(new U).getHandlers(t,e)),{},{clickTableau:new W(t,e.hand).getHandler(e.hand),clickFoundation:new X(t).getHandler(e.hand),clickStock:new Y(t).getHandler(e.hand),clickWaste:new G(t).getHandler(e.hand)})}}]),t}(),z=function(t){Object(o.a)(n,t);var e=Object(c.a)(n);function n(t){var s;return Object(i.a)(this,n),(s=e.call(this,t)).game=new K,s.state=s.game.getInitialState(Object(r.a)(s)),s}return Object(a.a)(n,[{key:"render",value:function(){var t=this.game.getHandlers(this,this.state);return Object(s.jsx)(C,{subscribe:this.subscribe,model:this.state,game:this.game,handlers:t})}}]),n}(l.Component),V=n(11);n.n(V).a.render(Object(s.jsx)(d.a.StrictMode,{children:Object(s.jsx)(z,{})}),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.9b3e6e80.chunk.js.map