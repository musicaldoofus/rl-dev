(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,function(e,t,a){e.exports=a(20)},,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(2),o=a.n(s),l=a(8),i=a(6),p=a(3),c=a(4),u=a(7),y=a(5),d=a(9),m={open:{type:"open",isVisible:!0,isKnown:!0},player:{type:"player"},wall:{type:"wall",isVisible:!0,isKnown:!0},door:{type:"door",status:"closed",isVisible:!0,isKnown:!0},item:{type:"item",item:{type:"potion"}}},h=(a(16),function(e){return r.a.createElement("div",{className:"player-display-wrapper display-box"},r.a.createElement("span",{className:"display-title"},"Player"),r.a.createElement("p",null,r.a.createElement("span",null,"HP:"),r.a.createElement("span",null,e.stats.hp)),r.a.createElement("p",null,r.a.createElement("span",null,"SP:"),r.a.createElement("span",null,e.stats.sp)))}),f=(a(17),14),g=18,v=function(e){var t={gridTemplateRows:"repeat(".concat(e.mapState.length,", ").concat(g,"px)"),gridTemplateColumns:"repeat(".concat(e.mapState[0].length,", ").concat(f,"px)")},a=function(e){var t=[];return t.push("cell"),t.push(e.type),"door"===e.type&&t.push(e.status),t.join(" ")},n=e.mapState.map(function(e){return e.map(function(e){var t=e[0],n=e.filter(function(e){return"player"===e.type});return n.length>0&&(t=n[0]),r.a.createElement("div",{className:a(t)})})});return r.a.createElement("div",{className:"map-wrapper display-box"},r.a.createElement("span",{className:"display-title"},"Map"),r.a.createElement("div",{className:"map",style:t},n))},E=(a(18),function(e){var t=e.logs.length>10?e.logs.length-10:0,a=e.logs.length>10?e.logs.length-1:void 0,n=e.logs.slice(t,a).map(function(e,t){return r.a.createElement("p",{key:t,className:"heads-up-display-log"},r.a.createElement("span",null,e.turn),r.a.createElement("span",null,e.message))}),s=e.logs.length>10?"...":null;return r.a.createElement("div",{className:"heads-up-display display-box"},r.a.createElement("span",{className:"display-title"},"Logs"),s,n)}),x=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],w=function(e){var t=e.inv.map(function(e,t){return r.a.createElement("p",{key:t,className:"inventory-item ".concat(e.type)},r.a.createElement("span",null,x[t]),r.a.createElement("span",null,e.label))});return r.a.createElement("div",{className:"inventory-wrapper display-box"},r.a.createElement("span",{className:"display-title"},"Inventory"),r.a.createElement("div",{className:"inventory"},t))},k=(a(19),[{description:"up",keyCode:38},{description:"down",keyCode:40},{description:"right",keyCode:39},{description:"left",keyCode:37}]),b=[{description:"close",keyCode:67}],C=function(e){function t(){var e;Object(p.a)(this,t),(e=Object(u.a)(this,Object(y.a)(t).call(this))).getCell=function(t,a){return e.state.mapState[a][t]};for(var a=[[],[],[],[]],n=function(e){var t=[];return t.push(m[e]),t},r=0;r<10;r++)a[0].push(n("wall"));a[1].push(n("wall"));for(var s=1;s<8;s++)a[1].push(n("open"));a[1].push(n("player")),a[1].push(n("door")),a[2].push(n("wall"));for(var o=1;o<9;o++)a[2].push(n("open"));a[2].push(n("wall"));for(var l=0;l<10;l++)a[3].push(n("wall"));return e.state={turnCount:0,playerStats:{hp:10,sp:0},inventory:[{label:"Wooden torch",type:"light"}],displayLogs:[{turn:0,message:"You find yourself alone in a dark room."}],mapState:a},window.addEventListener("keydown",function(t){var a=k.filter(function(e){return e.keyCode===t.keyCode});if(a.length>0)e.handleInput(a[0].description);else{var n=b.filter(function(e){return e.keyCode===t.keyCode});n.length>0&&e.handleInteraction(n[0].description)}}),e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"updateGameDisplay",value:function(e){var t,a=this.state.turnCount+1;if("map"===e.engine){var n=JSON.parse(JSON.stringify(this.state.mapState));if(e.hasOwnProperty("to")){var r=this.getPlayerPos();n[r.y][r.x]=n[r.y][r.x].filter(function(e){return"player"!==e.type}),0===n[r.y][r.x].length&&(n[r.y][r.x]=n[r.y][r.x].concat(Object.assign({},m.open))),n[e.to.y][e.to.x]=n[e.to.y][e.to.x].concat(Object.assign({},m.player))}if(e.hasOwnProperty("door")){var s=Object.assign({},m.door,{status:e.doorUpdate});n[e.door.y][e.door.x]=n[e.door.y][e.door.x].filter(function(e){return"door"!==e.type}).concat(s),t={turn:a,message:"You open the door."}}var o=this.state.displayLogs;void 0!==t&&(o=this.state.displayLogs.concat(t)),this.setState({turnCount:a,mapState:n,displayLogs:o})}}},{key:"getPlayerPos",value:function(){var e=0,t=0;return this.state.mapState.forEach(function(a,n){a.forEach(function(a,r){a.filter(function(e){return"player"===e.type}).length>0&&(e=r,t=n)})}),{x:e,y:t}}},{key:"handleInput",value:function(e){var t="right"===e?1:"left"===e?-1:0,a="down"===e?1:"up"===e?-1:0,n=this.getPlayerPos(),r=n.x+t,s=n.y+a;this.handleMove(r,s)}},{key:"handleInteraction",value:function(e){if("close"===e){var t=this.getClosest("door");if(!(t&&t.hasOwnProperty("x")&&t.x))return;this.attemptDoorHandle(t.x,t.y,"closed")}}},{key:"getClosest",value:function(e){var t,a,n,r=this,s=this.getPlayerPos();return[[s.x+1,s.y],[s.x-1,s.y],[s.x,s.y+1],[s.x,s.y-1],[s.x+1,s.y+1],[s.x+1,s.y-1],[s.x-1,s.y+1],[s.x-1,s.y-1]].forEach(function(s){var o=r.getCell.apply(r,Object(i.a)(s));o.forEach(function(r){r.type===e&&(t=o,a=s[0],n=s[1])})}),Object(l.a)({},t,{x:a,y:n})}},{key:"handleMove",value:function(e,t){var a=this.getCell(e,t);a.filter(function(e){return"open"===e.type}).length>0&&this.move({engine:"map",to:{x:e,y:t}}),a.filter(function(e){return"door"===e.type}).length>0&&this.attemptDoorHandle(e,t)}},{key:"move",value:function(e){this.updateGameDisplay(e)}},{key:"attemptDoorHandle",value:function(e,t,a){var n=this.getCell(e,t).filter(function(e){return"door"===e.type})[0];n&&"door"===n.type&&("open"===n.status&&(a?this.updateGameDisplay({engine:"map",doorUpdate:a,door:{x:e,y:t}}):this.updateGameDisplay({engine:"map",to:{x:e,y:t}})),"crushed"===n.status&&this.updateGameDisplay({engine:"hud",message:"Door's straight crushed, brah."}),"closed"===n.status&&this.updateGameDisplay({engine:"map",doorUpdate:"open",door:{x:e,y:t}}))}},{key:"render",value:function(){return r.a.createElement("div",{className:"game-wrapper"},r.a.createElement("div",{className:"display-wrapper"},r.a.createElement(h,{stats:this.state.playerStats}),r.a.createElement(v,{mapState:this.state.mapState})),r.a.createElement("div",{className:"display-wrapper"},r.a.createElement(E,{logs:this.state.displayLogs}),r.a.createElement(w,{inv:this.state.inventory})))}}]),t}(n.Component);o.a.render(r.a.createElement(C,null),document.getElementById("root"))}],[[10,1,2]]]);
//# sourceMappingURL=main.90a066bd.chunk.js.map