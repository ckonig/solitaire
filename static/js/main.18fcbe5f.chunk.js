(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{22:function(t,e,n){},26:function(t,e,n){},28:function(t,e,n){"use strict";n.r(e);var r=n(0),c=(n(22),n(1)),s=n.n(c),i=n(16),a=n.n(i),o=n(2),u=n(3),l=n(4),d=n(13),h=n(10),p=n(9),f=(n(26),n(27),n(19)),k=n(12),b=n(17),v=function(t){Object(h.a)(n,t);var e=Object(p.a)(n);function n(t){var r;return Object(u.a)(this,n),(r=e.call(this,t)).state={timeElapsed:null},r}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var t=this;setInterval((function(){t.setState((function(e){var n=(t.props.end||Date.now())-t.props.started,r=Math.floor(n/1e3/60/60);n-=1e3*r*60*60;var c=Math.floor(n/1e3/60);n-=1e3*c*60;var s=Math.floor(n/1e3);return n-=1e3*s,e.timeElapsed=r?r+":"+c+":"+s:c+":"+s,Object(o.a)({},e)}))}),1e3)}},{key:"render",value:function(){return Object(r.jsxs)("span",{children:["Time Elapsed: ",this.state.timeElapsed]})}}]),n}(c.Component);function j(t){return Object(r.jsxs)("div",{children:["Points: ",t.points,Object(r.jsx)("br",{}),Object(r.jsx)(v,{started:t.started,end:t.end}),Object(r.jsx)("br",{}),"Is Ended: ",t.isEnded?"Y":"N",Object(r.jsx)("br",{}),"Report Issues ",Object(r.jsx)("a",{href:"https://github.com/ckonig/solitaire/issues",children:"here"}),"."]})}var O={borderStyle:"solid",borderWidth:"1px",borderColor:"black",width:"9.45vw",height:"13.2vw",float:"left",margin:"0.1vw",borderRadius:"0.5vw",position:"relative",backgroundColor:"white"},y={textAlign:"center",position:"absolute",left:"0vw",top:"2vw",width:"9.45vw",fontSize:"6vw",fontWeight:"bold"},g={position:"absolute",display:"inline-block",fontSize:"2vw"},x={tl:Object(o.a)(Object(o.a)({},g),{},{left:"0.5vw",top:"0vw"}),tr:Object(o.a)(Object(o.a)({},g),{},{right:"0.5vw",top:"0vw"}),bl:Object(o.a)(Object(o.a)({},g),{},{left:"0.5vw",bottom:"0vw"}),br:Object(o.a)(Object(o.a)({},g),{},{right:"0.5vw",bottom:"0vw"})},C={textAlign:"center",position:"absolute",top:"6.5vw",width:"6.45vw"},w={cardStyle:{borderStyle:"dashed",borderColor:"gray",width:"9.45vw",height:"13.2vw",float:"left",borderRadius:"0.3vw",position:"relative"},faceStyle:Object(o.a)({},C),faceStyleRed:Object(o.a)(Object(o.a)({},C),{},{color:"red"})},m={table:{backgroundColor:"darkgreen",zIndex:-1},stackbox:{width:"9.45vw",height:"13.2vw",float:"left"}},S=n(18),E=function(t){Object(h.a)(n,t);var e=Object(p.a)(n);function n(){return Object(u.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var t=this,e=Object(o.a)(Object(o.a)({},O),{},{boxShadow:"2px 2px 2px 2px black"});this.props.isSelected&&(e.backgroundColor="lightgray",e.borderColor="yellow");var n="";this.props.isHidden&&(n="karo"),this.props.offset&&(e.top=this.props.offset,e.left=this.props.offset),this.props.offsetTop&&(e.top=this.props.offsetTop);var c={tl:Object(o.a)({},x.tl),br:Object(o.a)({},x.br)};c.tl.left="2vw",c.br.right="2vw";var s=Object(r.jsx)("div",{});return this.props.isHidden||(s=Object(r.jsxs)("div",{children:[Object(r.jsxs)("div",{style:x.tl,children:[" ",this.props.type.icon]}),Object(r.jsxs)("div",{style:c.tl,children:[" ",this.props.face]}),Object(r.jsxs)("div",{style:x.tr,children:[" ",this.props.type.icon]}),Object(r.jsxs)("div",{style:y,children:[" ",Object(r.jsx)("a",{children:this.props.face})]}),Object(r.jsxs)("div",{style:x.bl,children:[" ",this.props.type.icon]}),Object(r.jsxs)("div",{style:c.br,children:[" ",this.props.face]}),Object(r.jsxs)("div",{style:x.br,children:[" ",this.props.type.icon]})]})),Object(r.jsx)(S.a,{style:function(n){var r=Object(o.a)({},e);return r.color=n,r.zIndex=t.props.offsetTop+2,t.props.zIndex&&(r.zIndex=t.props.zIndex),t.props.blink&&(r.borderColor="red",r.boxShadow="2px 2px 2px 2px red"),r}(this.props.type.color),className:n,onClick:function(e){return t.props.onClick(t)},children:s})}}]),n}(c.Component);function _(t){var e=Object(o.a)({},w),n={position:"absolute",left:"0px",top:"0px"},c=Object(o.a)(Object(o.a)({},e.faceStyle),{},{top:"0px"}),s=Object(o.a)({},e.cardStyle);return t.model.blinkFor>0&&(s.borderColor="red"),Object(r.jsxs)("div",{style:{position:"relative"},children:[Object(r.jsx)("div",{style:s,onClick:function(){return t.onClick()},children:Object(r.jsx)("div",{style:c,children:Object(r.jsx)("h1",{children:t.model.icon})})}),t.model.stack.map((function(e){return Object(r.jsx)("div",{style:n,children:Object(r.jsx)(E,{blink:t.model.blinkFor,type:e.type,source:"foundation-"+t.index,face:e.face,onClick:function(e){return t.onClick(e)}})})}))]})}var T=function(t){Object(h.a)(n,t);var e=Object(p.a)(n);function n(t){var r;return Object(u.a)(this,n),(r=e.call(this,t)).myRef=s.a.createRef(),r}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var t=this.myRef.current;document.addEventListener("mousemove",(function(e){var n=e.clientX,r=e.clientY;t.style.top=r+"px",t.style.left=n+"px",t.style.position="relative"}))}},{key:"render",value:function(){Object(o.a)({},w);var t={position:"absolute",left:"0px",top:"0px"};return Object(r.jsx)("div",{style:{position:"absolute",left:"0px",top:"0px",width:"0px",height:"0px"},children:Object(r.jsx)("div",{ref:this.myRef,children:this.props.stack&&this.props.stack.map((function(e,n){return Object(r.jsx)("div",{style:t,children:Object(r.jsx)(E,{offsetTop:20*n,zIndex:1e3+20*n,type:e.props.type,face:e.props.face,isSelected:!0})})}))})})}}]),n}(c.Component),M=n(14),I=function(){function t(){Object(u.a)(this,t),this.moves=[],this.currentMove=null}return Object(l.a)(t,[{key:"registerMove",value:function(t,e,n){var r={source:n.props.source,card:n.props,target:t};return e.moves.push(Object(o.a)({},r)),e.points+=this._rateMove(r),!0}},{key:"registerRecycle",value:function(t){t.moves.push({source:"waste",target:"stock",card:null}),t.points-=100,console.debug("RATING: subtract 100 points for RECYCLE")}},{key:"registerUncover",value:function(t,e){e.moves.push({source:null,target:null,card:t}),e.points+=5,console.debug("RATING: add 5 points for UNCOVER")}},{key:"_rateMove",value:function(t){var e="tableau"==t.source.substr(0,7),n="tableau"==t.target.substr(0,7);if(console.log("is tableau",e,n),e){if("foundation"==t.target)return console.debug("RATING: add 10 points for MOVE tableau -> foundation"),10}else if("waste"==t.source){if("foundation"==t.target)return console.debug("RATING: add 10 points for MOVE waste -> foundation"),10;if(n)return console.debug("RATING: add 5 points for MOVE waste -> tableau"),5}else if("foundation"==t.source&&n)return console.debug("RATING: subtract 15 points for MOVE foundation -> tableau"),-15;return 0}}]),t}(),D=function(){function t(e){var n=this;Object(u.a)(this,t),this._blink=function(t){return n._toggleBlink(t,10,(function(){return setTimeout((function(){return n._toggleBlink(t,0)}),100)}))},this.actions=new I,this._setState=function(t,n){return e.setState((function(e){return t(e),Object(o.a)({},e)}),n)},this.hand=function(){return e.state.hand},this.state=function(){return e.state}}return Object(l.a)(t,[{key:"_toggleBlink",value:function(t,e,n){this._setState((function(n){t(n).blinkFor=e}),n)}}]),t}(),A=function(t){Object(h.a)(n,t);var e=Object(p.a)(n);function n(){var t;Object(u.a)(this,n);for(var r=arguments.length,c=new Array(r),s=0;s<r;s++)c[s]=arguments[s];return(t=e.call.apply(e,[this].concat(c))).click=function(e){return t.hand().isHoldingCard()?t.tryPutDown(e):t.pickup(e)},t.blink=function(e){return t._blink((function(t){return t.foundation.stacks[e]}))},t}return Object(l.a)(n,[{key:"pickup",value:function(t){var e=this.state().foundation.getTop(t);if(e){var n={props:e};this._setState((function(e){e.foundation.getPreviousUsed(t)==n.props.face&&(e.foundation.add(t,n),e.hand.pickUp([n],n.props.source))}))}else this.blink(t)}},{key:"tryPutDown",value:function(t){var e=this;!this.hand().hasMoreThanOneCard()&&this.state().foundation.accepts(t,this.hand().currentCard())?this._setState((function(n){n.hand.isHoldingCard()&&!n.foundation.contains(t,n.hand.currentCard())&&(n.foundation.remove(t,n.hand.currentCard().props),e.actions.registerMove("foundation",n,n.hand.currentCard()),n.hand.putDown(),e._tryDetectEnd(n))})):this.blink(t)}},{key:"_tryDetectEnd",value:function(t){52==t.foundation.stacks.map((function(t){return parseInt(t.stack.length)})).reduce((function(t,e){return t+e}),0)&&(t.isEnded=!0,t.end=Date.now())}}]),n}(D),F=new(function(){function t(){Object(u.a)(this,t)}return Object(l.a)(t,[{key:"cardEquals",value:function(t,e){return!t&&!e||t&&e&&e.face==t.face&&e.type.icon==t.type.icon}},{key:"cardNotEquals",value:function(t,e){return e.face!==t.face||e.type.icon!==t.type.icon}},{key:"filterNotEqual",value:function(t,e){return t.filter((function(t,n,r){return F.cardNotEquals(t,e.props)}))}},{key:"filterOut",value:function(t,e){for(var n=0;n<t.length;n++)t[n].stack=F.filterNotEqual(t[n].stack,e);return t}}]),t}()),H=F,R=function(t){Object(h.a)(n,t);var e=Object(p.a)(n);function n(){var t;Object(u.a)(this,n);for(var r=arguments.length,c=new Array(r),s=0;s<r;s++)c[s]=arguments[s];return(t=e.call.apply(e,[this].concat(c))).click=function(e){t.hand().isHoldingCard()?t.blink():e?t.moveToWaste(e):t.recycleWaste()},t.blink=function(){return t._blink((function(t){return t.stock}))},t}return Object(l.a)(n,[{key:"moveToWaste",value:function(t){var e=this;this._setState((function(n){H.cardEquals(t.props,n.stock.getTop())&&(n.waste.stack.push(n.stock.stack.pop()),e.actions.registerMove("stock",n,Object(o.a)(Object(o.a)({},t),{},{source:"waste"})))}))}},{key:"recycleWaste",value:function(){var t=this;this._setState((function(e){e.stock.recycle(e.waste.recycle())&&t.actions.registerRecycle(e)}))}}]),n}(D),N=n(6),U=["2","3","4","5","6","7","8","9","10","J","Q","K","A"],P=function(t){Object(h.a)(n,t);var e=Object(p.a)(n);function n(){var t;Object(u.a)(this,n);for(var r=arguments.length,c=new Array(r),s=0;s<r;s++)c[s]=arguments[s];return(t=e.call.apply(e,[this].concat(c))).click=function(e,n,r){return e?t.clickCard(e,n):t.clickEmpty(r,n)},t.validateTableauStackMove=function(t,e){var n=Object(N.a)(U);return n.indexOf(t.props.face)+1==n.indexOf(e.props.face)&&t.props.type.color!=e.props.type.color},t.pickup=function(e){t._setState((function(t){if(!t.hand.isHoldingCard()){var n=t.tableau.findFollowing(e);t.hand.pickUp([e].concat(Object(N.a)(n)),e.props.source),t.tableau.filterOut(e)}}))},t.tryPutDown=function(e){t._setState((function(n){var r;n.hand.isHoldingCard()&&!n.hand.containsCurrentCard(n.tableau.stacks[e].stack)&&(n.tableau.filterOut(n.hand.currentCard()),t.actions.registerMove("tableau-"+e,n,n.hand.currentCard()),(r=n.tableau.stacks[e].stack).push.apply(r,Object(N.a)(n.hand.putDown().map((function(t){return t.props})))))}))},t.tryUncover=function(e,n){return!(t.hand().isHoldingCard()||!e.props.isHidden||!e.props.canUncover)&&(t._setState((function(r){r.tableau.uncover(n,e)&&t.actions.registerUncover(e,r)})),!0)},t.blink=function(e){return t._blink((function(t){return t.tableau.stacks[e]}))},t}return Object(l.a)(n,[{key:"clickCard",value:function(t,e){this.hand().isHoldingCard()?!this.tryUncover(t,e)&&this.hand().isFromCurrentSource(t)&&t.props.isHidden||this.validateTableauStackMove(this.hand().currentCard(),t)?this.tryPutDown(e):this.blink(e):this.tryUncover(t,e)||this.pickup(t)}},{key:"clickEmpty",value:function(t,e){this.hand().isHoldingKing()||this.hand().source==t?this.tryPutDown(e):this.blink(e)}}]),n}(D),q=function(t){Object(h.a)(n,t);var e=Object(p.a)(n);function n(){var t;Object(u.a)(this,n);for(var r=arguments.length,c=new Array(r),s=0;s<r;s++)c[s]=arguments[s];return(t=e.call.apply(e,[this].concat(c))).click=function(e){t.hand().isHoldingCard()?t.tryPutDown(e):e?t.pickup(e):t.blink()},t.blink=function(){return t._blink((function(t){return t.waste}))},t}return Object(l.a)(n,[{key:"pickup",value:function(t){this._setState((function(e){e.hand.isHoldingCard()||(e.hand.pickUp([t],t.props.source),e.waste.filterOut(t))}))}},{key:"tryPutDown",value:function(){var t=this;"waste"==this.state().hand.source?this._setState((function(e){e.waste.tryPutDown(e.hand.currentCard())&&t.actions.registerMove("waste",e,e.hand.currentCard())&&e.hand.putDown()})):this.blink()}}]),n}(D),z=function t(e){Object(u.a)(this,t),this.clickTableauStack=new P(e).click,this.clickFoundation=new A(e).click,this.clickStock=new R(e).click,this.clickWaste=new q(e).click};function W(t){var e={position:"absolute",left:"0px",top:"0px"},n=Object(o.a)({},w.cardStyle);return t.blinkFor>0&&(n.borderColor="red"),Object(r.jsxs)("div",{style:{position:"relative"},children:[Object(r.jsx)("div",{style:n,onClick:function(){return t.onClick()},children:"\xa0"}),t.model.stack.map((function(n,c){return Object(r.jsx)("div",{style:e,children:Object(r.jsx)(E,{type:n.type,face:n.face,blink:t.model.blinkFor,source:"main",isHidden:n.hidden,canUncover:c==t.model.stack.length-1,onClick:t.onClick})})}))]})}function G(t){var e=Object(o.a)({},w),n={position:"absolute",left:"0px",top:"0px"},c=Object(o.a)({},e.cardStyle);return t.model.blinkFor>0&&(c.borderColor="red"),Object(r.jsxs)("div",{style:{position:"relative"},children:[Object(r.jsx)("div",{style:c,onClick:function(){return t.onClick(null,"tableau-"+t.stackIndex)},children:"\xa0"}),t.model.stack.map((function(e,c){return Object(r.jsx)("div",{style:n,children:Object(r.jsx)(E,{type:e.type,face:e.face,blink:t.model.blinkFor,offsetTop:20*c,source:"tableau-"+t.stackIndex,isHidden:e.hidden,canUncover:c==t.model.stack.length-1,onClick:function(e){return t.onClick(e,"tableau-"+t.stackIndex)}})})}))]})}function B(t){var e={position:"absolute",left:"0px",top:"0px"},n=Object(o.a)({},w.cardStyle);return t.model.blinkFor>0&&(n.borderColor="red"),Object(r.jsxs)("div",{style:{position:"relative"},children:[Object(r.jsx)("div",{style:n,onClick:function(){return t.onClick()},children:"\xa0"}),t.model.stack.map((function(n,c){return Object(r.jsx)("div",{style:e,children:Object(r.jsx)(E,{type:n.type,face:n.face,blink:t.model.blinkFor,source:"waste",onClick:function(e){return t.onClick(e)}})})}))]})}var V=function(){function t(e){Object(u.a)(this,t),this.cards=e}return Object(l.a)(t,[{key:"shuffle",value:function(){return this._shuffleArray(this.cards),this}},{key:"take",value:function(t){if(t){var e=this.cards.slice(0,t);return this.cards=this.cards.slice(t),e}e=Object(N.a)(this.cards);return this.cards=[],e}},{key:"_shuffleArray",value:function(t){for(var e=t.length-1;e>0;e--){var n=Math.floor(Math.random()*(e+1)),r=[t[n],t[e]];t[e]=r[0],t[n]=r[1]}}}]),t}(),K={heart:{icon:"\u2665",color:"red"},diamond:{icon:"\u2666",color:"red"},club:{icon:"\u2663",color:"black"},spade:{icon:"\u2660",color:"black"}};var L=function(){function t(){Object(u.a)(this,t),this.stack=[],this.source=null}return Object(l.a)(t,[{key:"pickUp",value:function(t,e){this.stack=t,this.source=e}},{key:"putDown",value:function(){var t=Object(N.a)(this.stack);return this.stack=[],this.source=null,t}},{key:"isHoldingCard",value:function(){return!!this.stack.length}},{key:"isHoldingKing",value:function(){return this.currentCard()&&this.currentCard().props&&"K"==this.currentCard().props.face}},{key:"isCurrentCard",value:function(t){return t&&this.currentCard()==t}},{key:"currentCard",value:function(){return this.isHoldingCard()&&this.stack[0]}},{key:"hasMoreThanOneCard",value:function(){return this.stack.length>1}},{key:"containsCurrentCard",value:function(t){return t&&-1!==t.indexOf(this.currentCard().props)}},{key:"isFromCurrentSource",value:function(t){return this.source&&t.props.source==this.source}}]),t}(),J=function(){function t(e){Object(u.a)(this,t),this.stack=Object(N.a)(e)}return Object(l.a)(t,[{key:"recycle",value:function(t){return!!t.length&&(this.stack=Object(N.a)(t).reverse().map((function(t){return Object(o.a)(Object(o.a)({},t),{},{hidden:!0})})),!0)}},{key:"getTop",value:function(){return this.stack[this.stack.length-1]}}]),t}(),Y=function(){function t(){Object(u.a)(this,t),this.stack=[]}return Object(l.a)(t,[{key:"tryPutDown",value:function(t){return this.canAdd(t)&&(this.add(t)||!0)}},{key:"add",value:function(t){this.stack.push(t.props)}},{key:"canAdd",value:function(t){var e=this.getTopCard();return t&&t.props&&(!e||H.cardNotEquals(t.props,e))}},{key:"getTopCard",value:function(){return this.stack[this.stack.length-1]}},{key:"filterOut",value:function(t){this.stack=H.filterNotEqual(this.stack,t)}},{key:"recycle",value:function(){var t=Object(N.a)(this.stack);return this.stack=[],t}}]),t}(),Q=function(){function t(e){Object(u.a)(this,t),this.stacks=e}return Object(l.a)(t,[{key:"filterOut",value:function(t){this.stacks=H.filterOut(this.stacks,t)}},{key:"getCurrentAccepted",value:function(t){var e=this.stacks[t].acceptedCards;return e[e.length-1]}},{key:"accepts",value:function(t,e){var n=this.getCurrentAccepted(t);return this.stacks[t].icon==e.props.type.icon&&n==e.props.face}},{key:"contains",value:function(t,e){return-1!==this.stacks[t].stack.indexOf(e)}},{key:"remove",value:function(t,e){this.stacks[t].stack.push(e),this.stacks[t].usedCards.push(this.stacks[t].acceptedCards.pop())}},{key:"add",value:function(t,e){this.filterOut(e),this.stacks[t].acceptedCards.push(this.stacks[t].usedCards.pop())}},{key:"getTop",value:function(t){return this.stacks[t].stack[this.stacks[t].stack.length-1]}},{key:"getPreviousUsed",value:function(t){return Object(N.a)(this.stacks[t].usedCards).pop()}}]),t}(),X=function t(e){Object(u.a)(this,t),this.stack=[],this.acceptedCards=Object(N.a)(["A"].concat(Object(N.a)(U.slice(0,U.length-1))).reverse()),this.usedCards=[],this.icon=e};var Z=function(){function t(e){var n=this;Object(u.a)(this,t),this.filterOut=function(t){return H.filterOut(n.stacks,t)},this.stacks=e}return Object(l.a)(t,[{key:"getStack",value:function(t){return this.stacks[t]}},{key:"findFollowing",value:function(t){for(var e=0;e<this.stacks.length;e++)for(var n=0;n<this.stacks[e].stack.length;n++)if(t.props&&this.stacks[e].stack[n].face==t.props.face&&this.stacks[e].stack[n].type.icon==t.props.type.icon)return this.stacks[e].stack.splice(n+1,this.stacks[e].stack.length-1).map((function(t){return{props:t}}));return[]}},{key:"uncover",value:function(t,e){for(var n=0;n<this.stacks[t].stack.length;n++)if(H.cardEquals(this.stacks[t].stack[n],e.props)&&this.stacks[t].stack[n].hidden)return this.stacks[t].stack[n].hidden=!1,!0;return!1}}]),t}(),$=function t(){var e=this;Object(u.a)(this,t),this.getStacks=function(t){e.deck=t,e.pointer=0,e.oldpointer=e.pointer;var n=[0,1,2,3,4,5,6];return e.stacks=n.map((function(t){return e._getStack(t)})),n.reverse().forEach((function(t){e._generateStack(t)})),e.stacks},this._generateStack=function(t){e.pointer+=6-t+1,e.stacks[t].stack=e.deck.slice(e.oldpointer,e.pointer).map((function(t){return t.hidden=!0,t})).reverse(),e.stacks[t].stack[e.stacks[t].stack.length-1]&&(e.stacks[t].stack[e.stacks[t].stack.length-1].hidden=!1),e.oldpointer=e.pointer},this._getRndInteger=function(t,e){return Math.floor(Math.random()*(e-t))+t},this._getStack=function(t){var e={stack:[],id:t};return Object(o.a)({},e)}};var tt=function(t){return{stock:new J(t.cards.slice(28)),waste:new Y,foundation:new Q(Object.keys(K).map((function(t){return K[t]})).map((function(t){return new X(t.icon)}))),tableau:(e=t.cards.slice(0,28),new Z((new $).getStacks(e))),hand:new L,currentMove:null,moves:[],points:0,started:Date.now()};var e},et=function(t){Object(h.a)(n,t);var e=Object(p.a)(n);function n(t){var r;return Object(u.a)(this,n),(r=e.call(this,t)).reset=function(){return r.setState((function(){return Object(o.a)({},tt(r.deck))}))},r.deck=function(){for(var t=[],e=Object.keys(K),n=0;n<U.length;n++)for(var r=0;r<e.length;r++){var c=K[e[r]],s=U[n]+""+c.icon;t.push({face:U[n],type:c,key:s,hidden:!0,toString:function(){return s}})}return new V(t)}(),r.deck.shuffle(),r.state=tt(r.deck),r.service=new z(Object(d.a)(r)),r}return Object(l.a)(n,[{key:"render",value:function(){var t=this,e=m;return Object(r.jsxs)("div",{style:e.table,children:[Object(r.jsx)(T,{stack:this.state.hand.stack}),Object(r.jsxs)(b.a,{fluid:!0,children:[Object(r.jsxs)(M.a,{xs:7,sm:7,children:[Object(r.jsx)(k.a,{children:Object(r.jsx)(W,{onClick:this.service.clickStock,model:this.state.stock})}),Object(r.jsx)(k.a,{children:Object(r.jsx)(B,{onClick:this.service.clickWaste,model:this.state.waste})}),Object(r.jsx)(k.a,{}),this.state.foundation.stacks.map((function(e,n){return Object(r.jsx)(k.a,{children:Object(r.jsx)(_,{model:e,index:n,onClick:function(e){return t.service.clickFoundation(n,e)}})})}))]}),Object(r.jsx)(M.a,{xs:7,children:this.state.tableau.stacks.map((function(e,n){return Object(r.jsx)(k.a,{children:Object(r.jsx)(G,{stackIndex:n,model:e,onClick:function(e,r){return t.service.clickTableauStack(e,n,r)}})})}))}),Object(r.jsx)(M.a,{children:Object(r.jsxs)(k.a,{children:[Object(r.jsx)(j,{end:this.state.end,started:this.state.started,points:this.state.points,isEnded:this.state.isEnded}),Object(r.jsx)(f.a,{variant:"secondary",onClick:this.reset,children:"reset"})]})})]})]})}}]),n}(c.Component),nt=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,29)).then((function(e){var n=e.getCLS,r=e.getFID,c=e.getFCP,s=e.getLCP,i=e.getTTFB;n(t),r(t),c(t),s(t),i(t)}))};a.a.render(Object(r.jsx)(s.a.StrictMode,{children:Object(r.jsx)(et,{})}),document.getElementById("root")),nt()}},[[28,1,2]]]);
//# sourceMappingURL=main.18fcbe5f.chunk.js.map