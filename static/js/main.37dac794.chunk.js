(this["webpackJsonpsolitaire-react"]=this["webpackJsonpsolitaire-react"]||[]).push([[0],{13:function(t,e,n){},17:function(t,e,n){"use strict";n.r(e);var c=n(0),a=n(1),r=n(2),i=n(8),s=n(4),o=n(3),u=(n(13),n(5)),l=n.n(u),d=n(6),h=function(t){Object(s.a)(n,t);var e=Object(o.a)(n);function n(t){var c;return Object(a.a)(this,n),(c=e.call(this,t)).state={timeElapsed:null},c}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var t=this;setInterval((function(){t.setState((function(e){var n=(t.props.end||Date.now())-t.props.started,c=Math.floor(n/1e3/60/60);n-=1e3*c*60*60;var a=Math.floor(n/1e3/60);n-=1e3*a*60;var r=Math.floor(n/1e3);return n-=1e3*r,e.timeElapsed=c?c+":"+a+":"+r:a+":"+r,Object(d.a)({},e)}))}),1e3)}},{key:"render",value:function(){return Object(c.jsxs)("span",{className:this.props.className,children:["Time Elapsed: ",this.state.timeElapsed]})}}]),n}(u.Component),f=function(t){return Object(c.jsx)("div",{className:"footer",children:Object(c.jsxs)("div",{className:"footer-grid-container",children:[Object(c.jsxs)("span",{children:["Points: ",t.model.points]}),Object(c.jsx)(h,{className:"clock",started:t.model.started,end:t.model.end}),Object(c.jsxs)("span",{children:["Is Ended: ",t.model.isEnded?"Y":"N"]}),Object(c.jsx)("button",{onClick:t.reset,children:"reset"}),Object(c.jsxs)("span",{className:"report",children:["Report Issues ",Object(c.jsx)("a",{href:"https://github.com/ckonig/solitaire/issues",children:"here"}),"."]})]})})},b=function(t){Object(s.a)(n,t);var e=Object(o.a)(n);function n(){return Object(a.a)(this,n),e.apply(this,arguments)}return Object(r.a)(n,[{key:"componentDidUpdate",value:function(){this.props.model.blinkFor&&this.props.model.unblink()}}]),n}(u.Component),k=function(t){var e=t.model,n="card card-base suit-"+e.type.icon;n+=t.isSelected?" card-selected":"",n+=t.blink?" blink":"";var a={zIndex:t.zIndex?t.zIndex:!!t.offsetTop+2,top:t.offsetTop?t.offsetTop/10+"vw":0};return Object(c.jsx)("div",{className:"stack-base",children:Object(c.jsx)("div",{style:a,className:n,onClick:function(){return t.onClick(Object(d.a)(Object(d.a)({},t),e))},children:e.isHidden?Object(c.jsx)("div",{className:"card-back quarot",children:"\xa0"}):Object(c.jsxs)("div",{className:"card-grid-container",children:[Object(c.jsx)("div",{children:Object(c.jsx)("div",{className:"align-center",children:e.type.icon})}),Object(c.jsx)("div",{children:Object(c.jsx)("div",{className:"align-left",children:e.face})}),Object(c.jsx)("div",{children:"\xa0"}),Object(c.jsx)("div",{children:Object(c.jsx)("div",{className:"align-center",children:e.type.icon})}),Object(c.jsx)("div",{className:"mainface",children:Object(c.jsx)("div",{className:"align-center",children:e.face})}),Object(c.jsx)("div",{children:Object(c.jsx)("div",{className:"align-center",children:e.type.icon})}),Object(c.jsx)("div",{children:"\xa0"}),Object(c.jsx)("div",{children:Object(c.jsx)("div",{className:"align-right",children:e.face})}),Object(c.jsx)("div",{children:Object(c.jsx)("div",{className:"align-center",children:e.type.icon})})]})})})},p=function(t){var e="card-base socket-empty";return t.blink&&(e+=" blink"),Object(c.jsx)("div",{className:e,onClick:function(){return t.onClick()},children:t.children})},j=function(t){Object(s.a)(n,t);var e=Object(o.a)(n);function n(t){var c;return Object(a.a)(this,n),(c=e.call(this,t)).isTouch=c.is_touch_device(),c}return Object(r.a)(n,[{key:"is_touch_device",value:function(){try{var t=" -webkit- -moz- -o- -ms- ".split(" ");return"ontouchstart"in window||"undefined"!==typeof window.DocumentTouch&&document instanceof window.DocumentTouch||(e=["(",t.join("touch-enabled),("),"heartz",")"].join(""),window.matchMedia(e).matches)}catch(n){return console.error("(Touch detect failed)",n),!1}var e}},{key:"shouldShowHand",value:function(t){return this.isTouch&&this.props.hand.isHoldingCard()&&this.props.hand.source===t}}]),n}(u.Component),v=function(t){Object(s.a)(n,t);var e=Object(o.a)(n);function n(){return Object(a.a)(this,n),e.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){var t=this;return this.isTouch&&this.props.hand&&this.props.parent===this.props.hand.source?Object(c.jsx)("div",{children:this.props.hand&&this.props.hand.stack&&this.props.hand.stack.map((function(e,n){return Object(c.jsx)(k,{model:e,offsetTop:t.props.offset+20*n,zIndex:1e3+20*n,isSelected:!0,onClick:function(e){return t.props.onClick(e)}},n)}))}):null}}]),n}(j),O=function(t){Object(s.a)(n,t);var e=Object(o.a)(n);function n(){return Object(a.a)(this,n),e.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){var t=this.props;return Object(c.jsxs)("div",{children:[Object(c.jsx)(p,{blink:t.model.blinkFor,onClick:function(){return t.onClick()},children:Object(c.jsx)("div",{className:"align-center foundation-base suit-"+t.model.icon,children:t.model.icon})}),t.model.stack.map((function(e,n){return Object(c.jsx)(k,{model:e,blink:t.model.blinkFor,onClick:t.onClick},n)})),Object(c.jsx)(v,{parent:"foundation-"+t.index,hand:t.hand,onClick:function(){return t.onClick(t.model.stack[t.model.stack.length-1])}})]})}}]),n}(b),m=n(7),g=["2","3","4","5","6","7","8","9","10","J","Q","K","A"],y=function(){function t(e){Object(a.a)(this,t),this.cards=e}return Object(r.a)(t,[{key:"shuffle",value:function(){return this.shuffleArray(this.cards),this}},{key:"shuffleArray",value:function(t){for(var e=t.length-1;e>0;e--){var n=Math.floor(Math.random()*(e+1)),c=[t[n],t[e]];t[e]=c[0],t[n]=c[1]}}}]),t}(),C=function(){function t(){Object(a.a)(this,t)}return Object(r.a)(t,null,[{key:"cardEquals",value:function(t,e){return!t&&!e||t&&e&&e.face==t.face&&e.type.icon==t.type.icon}},{key:"cardNotEquals",value:function(t,e){return e.face!==t.face||e.type.icon!==t.type.icon}},{key:"filterOut",value:function(e,n){for(var c=0;c<e.length;c++)e[c].stack=t.filterNotEqual(e[c].stack,n);return e}},{key:"filterNotEqual",value:function(e,n){return e.filter((function(e){return t.cardNotEquals(e,n)}))}}]),t}(),x=function(){function t(e){Object(a.a)(this,t),this.stacks=e}return Object(r.a)(t,[{key:"getTop",value:function(t){return this.stacks[t].stack[this.stacks[t].stack.length-1]}}]),t}(),w=function(t){Object(s.a)(n,t);var e=Object(o.a)(n);function n(){var t;Object(a.a)(this,n);for(var c=arguments.length,r=new Array(c),i=0;i<c;i++)r[i]=arguments[i];return(t=e.call.apply(e,[this].concat(r))).filterOut=function(e){t.stacks=C.filterOut(t.stacks,e)},t.getCurrentAccepted=function(e){var n=t.stacks[e].acceptedCards;return n[n.length-1]},t.accepts=function(e,n){var c=t.getCurrentAccepted(e);return t.stacks[e].icon==n.type.icon&&c==n.face},t.add=function(e,n){n.source="foundation-"+e,t.stacks[e].stack.push(n),t.stacks[e].usedCards.push(t.stacks[e].acceptedCards.pop())},t.remove=function(e,n){t.filterOut(n),t.stacks[e].acceptedCards.push(t.stacks[e].usedCards.pop())},t.getPreviousUsed=function(e){return Object(m.a)(t.stacks[e].usedCards).pop()},t.countCards=function(){t.stacks.map((function(t){return parseInt(t.stack.length)})).reduce((function(t,e){return t+e}),0)},t}return n}(x),T=function(){function t(){Object(a.a)(this,t),this.moves=[],this.currentMove=null,this.points=0,this.started=Date.now()}return Object(r.a)(t,[{key:"registerMove",value:function(t,e){var n={source:e.source,card:e,target:t};return this.points+=this.rateMove(n),this.moves.push(Object(d.a)({},n)),!0}},{key:"registerRecycle",value:function(){this.moves.push({source:"waste",target:"stock",card:null}),this.points-=100,this.points<0&&(this.points=0),console.debug("RATING: subtract 100 points for RECYCLE")}},{key:"registerUncover",value:function(t){return this.moves.push({source:null,target:null,card:t}),this.points+=5,console.debug("RATING: add 5 points for UNCOVER"),!0}},{key:"rateMove",value:function(t){var e="tableau"==t.source.substr(0,7),n="tableau"==t.target.substr(0,7),c="foundation"==t.source.substr(0,10),a="foundation"==t.target.substr(0,10);if(e){if(a)return console.debug("RATING: add 10 points for MOVE tableau -> foundation"),10}else if("waste"==t.source){if(a)return console.debug("RATING: add 10 points for MOVE waste -> foundation"),10;if(n)return console.debug("RATING: add 5 points for MOVE waste -> tableau"),5}else if(c&&n)return console.debug("RATING: subtract 15 points for MOVE foundation -> tableau"),-15;return console.debug("tried to rate move",t),0}}]),t}(),N=function(){function t(){var e=this;Object(a.a)(this,t),this.isHoldingCard=function(){return!!e.stack.length},this.isHoldingKing=function(){return e.currentCard()&&"K"==e.currentCard().face},this.isCurrentCard=function(t){return t&&e.currentCard()==t},this.currentCard=function(){return e.isHoldingCard()&&e.stack[0]},this.hasMoreThanOneCard=function(){return e.stack.length>1},this.containsCurrentCard=function(t){return t&&-1!==t.indexOf(e.currentCard())},this.isFromCurrentSource=function(t){return e.source&&t.source==e.source},this.stack=[],this.source=null}return Object(r.a)(t,[{key:"pickUp",value:function(t,e){return t&&(this.stack=t,this.source=e),t}},{key:"putDown",value:function(){var t=Object(m.a)(this.stack);return this.stack=[],this.source=null,t}}]),t}(),S=function(){function t(e){Object(a.a)(this,t),this.stack=Object(m.a)(e)}return Object(r.a)(t,[{key:"getTop",value:function(){return this.stack[this.stack.length-1]}}]),t}(),E=function(t){Object(s.a)(n,t);var e=Object(o.a)(n);function n(){return Object(a.a)(this,n),e.apply(this,arguments)}return Object(r.a)(n,[{key:"recycle",value:function(t){return!!t.length&&(this.stack=Object(m.a)(t).reverse().map((function(t){return Object(d.a)(Object(d.a)({},t),{},{isHidden:!0})})),!0)}},{key:"isOnTop",value:function(t){return C.cardEquals(t,this.getTop())}}]),n}(S),D={heart:{icon:"\u2665",color:"red"},diamond:{icon:"\u2666",color:"red"},club:{icon:"\u2663",color:"black"},spade:{icon:"\u2660",color:"black"}},H=function(t){Object(s.a)(n,t);var e=Object(o.a)(n);function n(){var t;Object(a.a)(this,n);for(var c=arguments.length,r=new Array(c),i=0;i<c;i++)r[i]=arguments[i];return(t=e.call.apply(e,[this].concat(r))).getStack=function(e){return t.stacks[e]},t.accepts=function(e,n){var c=t.getTop(e),a=Object(m.a)(g);return a.indexOf(n.face)+1==a.indexOf(c.face)&&n.type.color!=c.type.color},t.popWithFollowing=function(e,n){for(var c=0;c<t.stacks[n].stack.length;c++)if(e&&C.cardEquals(t.stacks[n].stack[c],e))return t.stacks[n].stack.splice(c,t.stacks[n].stack.length);return[]},t.uncover=function(e,n){var c=t.getTop(e);return!(!c.isHidden||!C.cardEquals(n,t.getTop(e)))&&(c.isHidden=!1,!0)},t.add=function(e,n){t.stacks[e].stack=t.stacks[e].stack.concat(n.map((function(t){return t.source="tableau-"+e,t})))},t}return n}(x),M=function(t){Object(s.a)(n,t);var e=Object(o.a)(n);function n(){return Object(a.a)(this,n),e.call(this,[])}return Object(r.a)(n,[{key:"tryPutDown",value:function(t){return this.canAdd(t)&&(this.add(t)||!0)}},{key:"add",value:function(t){if(t)return t.source="waste",t.isHidden=!1,this.stack.push(t),!0}},{key:"canAdd",value:function(t){var e=this.getTop();return t&&(!e||C.cardNotEquals(t,e))}},{key:"popTop",value:function(t){if(C.cardEquals(t,this.getTop()))return this.stack.pop()}},{key:"recycle",value:function(){var t=Object(m.a)(this.stack);return this.stack=[],t}}]),n}(S),_=function(){function t(){Object(a.a)(this,t)}return Object(r.a)(t,null,[{key:"generateDeck",value:function(){for(var t=[],e=Object.keys(D),n=0;n<g.length;n++)for(var c=0;c<e.length;c++){var a=D[e[c]];t.push({face:g[n],type:a,isHidden:!0})}return new y(t)}},{key:"generateFoundations",value:function(){return new w(Object.keys(D).map((function(t){return D[t]})).map((function(t){return Object(d.a)(Object(d.a)({},{stack:[],acceptedCards:Object(m.a)(["A"].concat(Object(m.a)(g.slice(0,g.length-1))).reverse()),usedCards:[],icon:null,color:null}),t)})))}},{key:"generateTableau",value:function(t){return new H((new I).getStacks(t))}}]),t}();_.getInitialState=function(t){return{stock:new E(Object(m.a)(t.cards.slice(28))),waste:new M,foundation:_.generateFoundations(),tableau:_.generateTableau(Object(m.a)(t.cards.slice(0,28))),hand:new N,game:new T}};var I=function t(){var e=this;Object(a.a)(this,t),this.getStacks=function(t){e.deck=t,e.pointer=0,e.oldpointer=e.pointer;var n=[0,1,2,3,4,5,6];return e.stacks=n.map((function(t){return function(t){return{stack:[],id:t}}(t)})),n.reverse().forEach((function(t){e.generateStack(t)})),e.stacks},this.generateStack=function(t){e.pointer+=6-t+1,e.stacks[t].stack=e.deck.slice(e.oldpointer,e.pointer).map((function(e){return Object(d.a)(Object(d.a)({},e),{},{isHidden:!0,source:"tableau-"+t})})).reverse(),e.stacks[t].stack[e.stacks[t].stack.length-1]&&(e.stacks[t].stack[e.stacks[t].stack.length-1].isHidden=!1),e.oldpointer=e.pointer},this.getRndInteger=function(t,e){return Math.floor(Math.random()*(e-t))+t}},P=function t(e){var n=this;Object(a.a)(this,t),this.dispatchPutDown=function(t,e){n._setState((function(c){c.hand.isHoldingCard()?n._dispatchPutDown(t,c,e):console.debug("partially avoided double execution putdown (thx 2 strict mode)")}))},this.dispatchPickup=function(t,e){n._setState((function(c){c.hand.isHoldingCard()?console.debug("partially avoided double execution pickup (thx 2 strict mode)"):n._dispatchPickup(t,c,e)}))},this._blink=function(t,e){return n.startBlink(t,10,e)},this.startBlink=function(t,e,c){t(c).blinkFor=e,t(c).unblink=function(){return setTimeout((function(){return n.toggleBlink(t,0)}),100)}},this.toggleBlink=function(t,e){return n._setState((function(n){t(n).blinkFor=e}))},this._setState=function(t,n){return e.setState((function(e){return t(e),Object(d.a)({},e)}),n)}},A=function(t){Object(s.a)(n,t);var e=Object(o.a)(n);function n(){var t;Object(a.a)(this,n);for(var c=arguments.length,r=new Array(c),i=0;i<c;i++)r[i]=arguments[i];return(t=e.call.apply(e,[this].concat(r)))._dispatchPutDown=function(e,n,c){!n.hand.hasMoreThanOneCard()&&n.foundation.accepts(c,n.hand.currentCard())?(n.game.registerMove("foundation-"+c,n.hand.currentCard()),n.foundation.add(c,n.hand.currentCard()),n.hand.putDown(),t.tryDetectEnd(n)):t.blink(c,n)},t._dispatchPickup=function(e,n,c){var a=n.foundation.getTop(c);a&&n.foundation.getPreviousUsed(c)===a.face?(n.foundation.remove(c,a),n.hand.pickUp([a],a.source)):t.blink(c,n)},t.blink=function(e,n){return t._blink((function(t){return t.foundation.stacks[e]}),n)},t}return Object(r.a)(n,[{key:"tryDetectEnd",value:function(t){52===t.foundation.countCards()&&(t.game.isEnded=!0,t.game.end=Date.now())}}]),n}(P),F=function(t){Object(s.a)(n,t);var e=Object(o.a)(n);function n(){var t;Object(a.a)(this,n);for(var c=arguments.length,r=new Array(c),i=0;i<c;i++)r[i]=arguments[i];return(t=e.call.apply(e,[this].concat(r)))._dispatchPutDown=function(e,n){return t.blink(e,n)},t._dispatchPickup=function(e,n){return e?t.moveToWaste(e,n):t.recycleWaste(e,n)},t.moveToWaste=function(t,e){return e.stock.isOnTop(t)&&e.waste.add(e.stock.stack.pop())&&e.game.registerMove("stock",e.waste.getTop())},t.recycleWaste=function(t,e){return!e.stock.getTop()&&!!e.waste.getTop()&&e.stock.recycle(e.waste.recycle())&&e.game.registerRecycle(e)},t.blink=function(e,n){return t._blink((function(t){return t.stock}),n)},t}return n}(P),R=function(t){Object(s.a)(n,t);var e=Object(o.a)(n);function n(){var t;Object(a.a)(this,n);for(var c=arguments.length,r=new Array(c),i=0;i<c;i++)r[i]=arguments[i];return(t=e.call.apply(e,[this].concat(r)))._dispatchPutDown=function(e,n,c){t.canPutDown(e,n,c)?(n.game.registerMove("tableau-"+c,n.hand.currentCard()),n.tableau.add(c,n.hand.putDown())):t.blink(c,n)},t.canPutDown=function(t,e,n){return!e.hand.containsCurrentCard(e.tableau.stacks[n].stack)&&(t&&e.hand.isFromCurrentSource(t)&&t.isHidden||t&&e.tableau.accepts(n,e.hand.currentCard())||!t&&(e.hand.isHoldingKing()||e.hand.source=="tableau-"+n))},t._dispatchPickup=function(e,n,c){!e||t.tryUncover(e,c,n)||e.isHidden?e||t.blink(c,n):n.hand.pickUp(n.tableau.popWithFollowing(e,c),e.source)},t.tryUncover=function(t,e,n){return!n.hand.isHoldingCard()&&t.isHidden&&n.tableau.uncover(e,t)&&n.game.registerUncover(t,n)},t.blink=function(e,n){return t._blink((function(t){return t.tableau.stacks[e]}),n)},t}return n}(P),U=function(t){Object(s.a)(n,t);var e=Object(o.a)(n);function n(){var t;Object(a.a)(this,n);for(var c=arguments.length,r=new Array(c),i=0;i<c;i++)r[i]=arguments[i];return(t=e.call.apply(e,[this].concat(r)))._dispatchPutDown=function(e,n){return"waste"==n.hand.source&&n.waste.tryPutDown(n.hand.currentCard())&&n.game.registerMove("waste",n.hand.currentCard())&&n.hand.putDown()||t.blink(e,n)},t._dispatchPickup=function(e,n){return e&&n.hand.pickUp([n.waste.popTop(e)],"waste")||t.blink(e,n)},t.blink=function(e,n){return t._blink((function(t){return t.waste}),n)},t}return n}(P),q=function(){function t(e){var n=this;Object(a.a)(this,t),this.getInitialState=function(){return _.getInitialState(n.deck)},this.reset=function(){n.stateholder.setState((function(){return Object(d.a)({},n.getInitialState())}))},this.stateholder=e,this.deck=_.generateDeck(),this.deck.shuffle(),this.services={tableauStack:new R(e),foundation:new A(e),stock:new F(e),waste:new U(e)}}return Object(r.a)(t,[{key:"getHandlers",value:function(){var t="dispatchPickup";return this.stateholder.state&&this.stateholder.state.hand&&this.stateholder.state.hand.isHoldingCard()&&(t="dispatchPutDown"),{clickTableauStack:this.services.tableauStack[t],clickFoundation:this.services.foundation[t],clickStock:this.services.stock[t],clickWaste:this.services.waste[t]}}}]),t}(),W=function(t){Object(s.a)(n,t);var e=Object(o.a)(n);function n(t){var c;return Object(a.a)(this,n),(c=e.call(this,t)).myRef=l.a.createRef(),c}return Object(r.a)(n,[{key:"componentDidMount",value:function(){if(!this.isTouch){var t=this.myRef.current;document.addEventListener("mousemove",(function(e){var n=e.clientX,c=e.clientY;t.style.top=c+25+"px",t.style.left=n+25+"px",t.style.position="relative"}))}}},{key:"render",value:function(){return this.isTouch?null:Object(c.jsx)("div",{ref:this.myRef,children:this.props.stack&&this.props.stack.map((function(t,e){return Object(c.jsx)(k,{model:t,onClick:function(){console.error("clicked card in mouse hand")},offsetTop:20*e,zIndex:1e3+20*e,isSelected:!0},"H"+e)}))})}}]),n}(j),z=function(t){Object(s.a)(n,t);var e=Object(o.a)(n);function n(){return Object(a.a)(this,n),e.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){var t=this.props;return Object(c.jsxs)("div",{children:[Object(c.jsx)(p,{blink:t.model.blinkFor,onClick:t.onClick}),t.model.stack.map((function(e,n){return Object(c.jsx)(k,{model:e,blink:t.model.blinkFor,source:"main",onClick:t.onClick},n)}))]})}}]),n}(b),G=function(t){Object(s.a)(n,t);var e=Object(o.a)(n);function n(){return Object(a.a)(this,n),e.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){var t=this.props,e=function(e){for(var n=0;n<=e;){if(t.model.stack[n]&&!t.model.stack[n].isHidden)return 12*n+24*(e-n);n++}return 12*e};return Object(c.jsxs)("div",{children:[Object(c.jsx)(p,{blink:t.model.blinkFor,onClick:function(){return t.onClick(null,"tableau-"+t.index)}}),t.model.stack.map((function(n,a){return Object(c.jsx)(k,{model:n,blink:t.model.blinkFor,offsetTop:e(a),onClick:t.onClick},a)})),Object(c.jsx)(v,{parent:"tableau-"+t.index,hand:t.hand,offset:e(t.model.stack.length),onClick:function(){return t.onClick(t.model.stack[t.model.stack.length-1])}})]})}}]),n}(b),B=function(t){Object(s.a)(n,t);var e=Object(o.a)(n);function n(){return Object(a.a)(this,n),e.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){var t=this.props;return Object(c.jsxs)("div",{children:[Object(c.jsx)(p,{blink:t.model.blinkFor,onClick:t.onClick}),t.model.stack.map((function(e,n){return Object(c.jsx)(k,{model:e,blink:t.model.blinkFor,onClick:function(e){return t.onClick(e)}},n)})),Object(c.jsx)(v,{parent:"waste",hand:t.hand,onClick:function(e){return t.onClick(e,"waste")}})]})}}]),n}(b),V=function(t){Object(s.a)(n,t);var e=Object(o.a)(n);function n(t){var c;return Object(a.a)(this,n),(c=e.call(this,t)).game=new q(Object(i.a)(c)),c.state=c.game.getInitialState(),c}return Object(r.a)(n,[{key:"render",value:function(){var t=this,e=this.game.getHandlers();return Object(c.jsxs)("div",{children:[Object(c.jsx)(W,{stack:this.state.hand.stack}),Object(c.jsxs)("div",{className:"layout-grid-container",children:[Object(c.jsx)(z,{model:this.state.stock,onClick:e.clickStock}),Object(c.jsx)(B,{model:this.state.waste,hand:this.state.hand,onClick:e.clickWaste}),Object(c.jsx)("div",{className:"spacer",children:"\xa0"}),this.state.foundation.stacks.map((function(n,a){return Object(c.jsx)(O,{index:a,model:n,hand:t.state.hand,onClick:function(t){return e.clickFoundation(t,a)}},"f"+a)})),this.state.tableau.stacks.map((function(n,a){return Object(c.jsx)(G,{index:a,model:n,hand:t.state.hand,onClick:function(t){return e.clickTableauStack(t,a)}},"t"+a)})),Object(c.jsx)(f,{reset:this.game.reset,model:this.state.game})]})]})}}]),n}(u.Component),K=n(10);n.n(K).a.render(Object(c.jsx)(l.a.StrictMode,{children:Object(c.jsx)(V,{})}),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.37dac794.chunk.js.map