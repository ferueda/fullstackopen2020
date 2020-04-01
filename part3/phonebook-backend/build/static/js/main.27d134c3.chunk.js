(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{17:function(e,t,n){e.exports=n(41)},40:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(16),o=n.n(c),u=n(3),l=n(6),s=function(e){var t=e.type,n=e.text;switch(t){case"h1":return r.a.createElement("h1",null,n);case"h2":return r.a.createElement("h2",null,n);case"h3":return r.a.createElement("h3",null,n)}},i=function(e){var t=e.addPerson,n=e.newName,a=e.handleNameChange,c=e.newPhone,o=e.handlePhoneChange,u=e.displayBlock;return r.a.createElement("div",null,r.a.createElement(s,{type:"h2",text:"Add new"}),r.a.createElement("form",{onSubmit:t},r.a.createElement("input",{type:"text",value:n,onChange:a,placeholder:"Enter name..."}),r.a.createElement("input",{type:"text",value:c,onChange:o,style:u,placeholder:"Enter phone number"}),r.a.createElement("button",{style:u,type:"submit"},"Add")))},h=function(e){var t=e.newSearch,n=e.handleSearchChange;return r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"search"},"Filter shown with: "),r.a.createElement("input",{type:"text",name:"search",value:t,onChange:n}))},d=function(e){var t=e.person,n=e.handleDeletion;return r.a.createElement("p",null,t.name," - ",t.number," ",r.a.createElement("button",{onClick:n},"Delete"))},f=function(e){var t=e.personsToShow,n=e.handleDeletionOf;return r.a.createElement("div",null,r.a.createElement(s,{type:"h2",text:"Numbers"}),r.a.createElement("div",null,t.map((function(e){return r.a.createElement(d,{key:e.id,person:e,handleDeletion:function(){return n(e.id,e.name)}})}))))},p=n(2),m=n.n(p),b=n(4),v=n(5),w=n.n(v),E="/api/persons",y={getAll:function(){var e=Object(b.a)(m.a.mark((function e(){var t;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.a.get(E);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),createPerson:function(){var e=Object(b.a)(m.a.mark((function e(t){var n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.a.post(E,t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),deletePerson:function(){var e=Object(b.a)(m.a.mark((function e(t){var n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.a.delete("".concat(E,"/").concat(t));case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),updatePerson:function(){var e=Object(b.a)(m.a.mark((function e(t,n){var a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.a.put("".concat(E,"/").concat(t),n);case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},g=function(e){var t=e.notification,n=e.message,a={backgroundColor:"lightgrey",padding:10,fontSize:20,border:"2px solid",marginTop:20};return"success"===t?r.a.createElement("div",{style:Object(l.a)({},a,{},{color:"green"})},n):"error"===t?r.a.createElement("div",{style:Object(l.a)({},a,{},{color:"red"})},n):null},O=function(){var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(""),d=Object(u.a)(o,2),p=d[0],m=d[1],b=Object(a.useState)(""),v=Object(u.a)(b,2),w=v[0],E=v[1],O=Object(a.useState)(""),j=Object(u.a)(O,2),k=j[0],x=j[1],C=Object(a.useState)(!0),S=Object(u.a)(C,2),P=S[0],A=S[1],D=Object(a.useState)(null),L=Object(u.a)(D,2),N=L[0],T=L[1],B=Object(a.useState)(""),F=Object(u.a)(B,2),J=F[0],z=F[1];Object(a.useEffect)((function(){y.getAll().then((function(e){c(e)}))}),[]);var I=function(e,t){T(e),z(t),setTimeout((function(){return T(null)}),2e3)},W=function(){m(""),E("")},q=P?n:n.filter((function(e){return e.name.toLowerCase().includes(k.toLowerCase())}));return r.a.createElement("div",null,r.a.createElement(s,{type:"h1",text:"Phonebook"}),r.a.createElement(h,{newSearch:k,handleSearchChange:function(e){x(e.target.value),A(!1)}}),r.a.createElement(g,{notification:N,message:J}),r.a.createElement(i,{addPerson:function(e){if(e.preventDefault(),n.find((function(e){return e.name.toLowerCase()===p.toLowerCase()}))){var t=n.find((function(e){return e.name.toLowerCase()===p.toLowerCase()}));if(window.confirm("".concat(p," is already added to the phonebook. Want to replace the old number with the new one? ").concat(w))){var a=Object(l.a)({},t,{number:w});y.updatePerson(t.id,a).then((function(e){c(e),W(),I("success","".concat(a.name," number was successfully updated"))})).catch((function(){W(),I("error","".concat(a.name," is deleted from the server")),y.getAll().then((function(e){return c(e)}))}))}}else if(""!==p){var r={name:p,id:n.length+1,number:w};y.createPerson(r).then((function(e){c(e),W(),I("success","".concat(r.name," was successfully added to phonebook"))}))}},newName:p,handleNameChange:function(e){m(e.target.value)},newPhone:w,handlePhoneChange:function(e){E(e.target.value)},displayBlock:{display:"block"}}),r.a.createElement(f,{personsToShow:q,handleDeletionOf:function(e,t){window.confirm("Are you sure you want to delete ".concat(t,"?"))&&y.deletePerson(e).then((function(e){c(e),I("success","".concat(t," was successfully deleted from phonebook"))})).catch((function(){I("error","Person is already deleted from the server"),y.getAll().then((function(e){return c(e)}))}))}}))};n(40);o.a.render(r.a.createElement(O,null),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.27d134c3.chunk.js.map