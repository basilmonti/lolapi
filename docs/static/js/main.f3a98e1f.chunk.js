(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{169:function(e,t,n){e.exports=n(266)},174:function(e,t,n){},175:function(e,t,n){},266:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),o=n(65),i=n.n(o),r=(n(174),n(24)),l=n(14),u=n(15),s=n(17),h=n(16),m=n(6),d=n(18),p=(n(175),n(23)),g=n.n(p),b="https://euw1.api.riotgames.com/lol",f="RGAPI-8ef4769b-78a2-4b9b-b217-8def71b65f28",E=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(h.a)(t).call(this,e))).onChange=n.onChange.bind(Object(m.a)(n)),n.onChangeEnter=n.onChangeEnter.bind(Object(m.a)(n)),n.getSummonerId=n.getSummonerId.bind(Object(m.a)(n)),n.state={result:""},n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement("input",{type:"text",onKeyPress:this.onChangeEnter,onBlur:this.onChange}))}},{key:"onChange",value:function(e){this.getSummonerId(e.currentTarget.value)}},{key:"onChangeEnter",value:function(e){"Enter"===e.key&&this.getSummonerId(e.currentTarget.value)}},{key:"getSummonerId",value:function(e){var t=this,n=encodeURIComponent(e);g.a.get("".concat(b,"/summoner/v4/summoners/by-name/").concat(n,"?api_key=").concat(f)).then(function(e){t.props.onSelect(e.data)}).catch(function(e){console.log(e)})}}]),t}(c.a.Component),v=n(66),I=n(33),j=n.n(I),y=n(2),O=n.n(y),k=n(32),w=n.n(k),S=n(22),C=n.n(S),M=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(h.a)(t).call(this,e))).getMatchHst=n.getMatchHst.bind(Object(m.a)(n)),n.checkMatchWin=n.checkMatchWin.bind(Object(m.a)(n)),n.state={accountId:n.props.accountId,containerType:n.props.containerType,jsonData:null},n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidUpdate",value:function(e,t,n){e.accountId!==this.props.accountId&&this.getMatchHst(this.props.accountId)}},{key:"render",value:function(){return c.a.createElement("div",null,this.state.matches?c.a.createElement(v.a,null,c.a.createElement(w.a,null,c.a.createElement(C.a,null,c.a.createElement(O.a,null,"Champion"),c.a.createElement(O.a,{align:"right"},"Warteschlange"),c.a.createElement(O.a,{align:"right"},"Datum"),c.a.createElement(O.a,{align:"right"},"Rolle"),c.a.createElement(O.a,{align:"right"},"Lane"),c.a.createElement(O.a,{align:"right"},"Spielstand"))),c.a.createElement(j.a,null,this.state.matches.map(function(e){return c.a.createElement(C.a,{key:e.gameId},c.a.createElement(O.a,{component:"th",scope:"row"},e.champion),c.a.createElement(O.a,{align:"right"},e.queue),c.a.createElement(O.a,{align:"right"},e.timestamp),c.a.createElement(O.a,{align:"right"},e.role),c.a.createElement(O.a,{align:"right"},e.lane),c.a.createElement(O.a,{align:"right"},e.winstatus))}))):null)}},{key:"getMatchHst",value:function(e){var t=this,n="".concat(b,"/match/v4/matchlists/by-account/").concat(e,"?endIndex=10&api_key=").concat(f);g.a.get(n).then(function(e){var n=e.data.matches.map(function(e){return{champion:e.champion,gameId:e.gameId,lane:e.lane,queue:e.queue,role:e.role,timestamp:e.timestamp}});t.setState(Object(r.a)({},t.state,{matches:n}))}).catch(function(e){})}},{key:"checkMatchWin",value:function(e){var t=this;e.map(function(e){var n,a="".concat(b,"/match/v4/matches/").concat(e.gameId,"?api_key=").concat(f),c="",o="";g.a.get(a).then(function(a){return(n=a.data).participantIdentities.forEach(function(e){e.player===t.state.accountId&&(c=e.participantId)}),n.participants.forEach(function(e){e.participantId===c&&(o=e.stats.win?"Gewonnen!":"Verloren!")}),Object(r.a)({},e,{winstatus:o})}).catch(function(e){return null})})}}]),t}(c.a.Component),W=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(h.a)(t).call(this,e))).state={accountId:""},n.onSelect=n.onSelect.bind(Object(m.a)(n)),n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement(E,{onSelect:this.onSelect}),c.a.createElement(M,{accountId:this.state.accountId,containerType:"sdf"}))}},{key:"onSelect",value:function(e){this.setState(Object(r.a)({},this.state,{accountId:e.accountId}))}}]),t}(c.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(c.a.createElement(W,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[169,1,2]]]);
//# sourceMappingURL=main.f3a98e1f.chunk.js.map