(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{40:function(e,n,t){"use strict";t.r(n);var c=t(1),r=t(16),a=t.n(r),u=(t(7),t(6)),o=t(3),i=t(0),s=function(e){var n=e.value,t=e.onChange;return Object(i.jsxs)("div",{children:["filter shown with ",Object(i.jsx)("input",{value:n,onChange:t})]})},b=function(e){var n=e.onSubmit,t=e.name,c=e.number,r=e.handleNameChange,a=e.handleNumberChange;return Object(i.jsxs)("form",{onSubmit:n,children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:t,onChange:r})]}),Object(i.jsxs)("div",{children:["number ",Object(i.jsx)("input",{value:c,onChange:a})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})]})},l=function(e){var n=e.personsToShow,t=e.deletePerson;return Object(i.jsx)("div",{children:n.map((function(e){return Object(i.jsxs)("p",{children:[e.name," ",e.number," ",Object(i.jsx)("button",{onClick:function(){return t(e.id)},children:"delete"})," "]},e.number)}))})},j=t(4),d=t.n(j),h="/api/persons",f=function(){return d.a.get(h).then((function(e){return e.data}))},m=function(e){return d.a.post(h,e).then((function(e){return e.data}))},O=function(e){return d.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},v=function(e,n){return d.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){var n=e.message;return null===n?null:Object(i.jsx)("div",{className:"message",children:n})},x=function(){var e=Object(c.useState)([]),n=Object(o.a)(e,2),t=n[0],r=n[1],a=Object(c.useState)(""),j=Object(o.a)(a,2),d=j[0],h=j[1],x=Object(c.useState)(""),g=Object(o.a)(x,2),w=g[0],S=g[1],C=Object(c.useState)([]),N=Object(o.a)(C,2),k=N[0],y=N[1],P=Object(c.useState)(""),T=Object(o.a)(P,2),A=T[0],E=T[1],J=Object(c.useState)(null),B=Object(o.a)(J,2),D=B[0],I=B[1];Object(c.useEffect)((function(){f().then((function(e){console.log(e),r(e),y(e)}))}),[]);return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(p,{message:D}),Object(i.jsx)(s,{value:A,onChange:function(e){E(e.target.value);var n=new RegExp(A,"i");y((function(){return t.filter((function(e){return e.name.match(n)}))}))}}),Object(i.jsx)("h3",{children:"Add New"}),Object(i.jsx)(b,{onSubmit:function(e){e.preventDefault();var n=t.filter((function(e){return e.name===d})),c=n[0],a=Object(u.a)(Object(u.a)({},c),{},{number:w}),o=!1;(0!==n.length&&(o=!0),o)?window.confirm("A person with the number ".concat(n.number," already exists, replace this number with new one?"))&&(v(a.id,a).then((function(e){r(t.map((function(n){return n.id!==c?n:e}))),I("Person ".concat(a.name," has been updated"))})).catch((function(e){console.log(e),I("Person ".concat(a.name," has been already been deleted from the server"))})),setTimeout((function(){I(null)}),5e3)):m({name:d,number:w}).then((function(e){r(t.concat(e)),y(t),I("Person ".concat(e.name," has been added")),setTimeout((function(){I(null)}),5e3)}));h(""),S("")},name:d,handleNameChange:function(e){h(e.target.value)},number:w,handleNumberChange:function(e){S(e.target.value)}}),Object(i.jsx)("h3",{children:"Numbers"}),Object(i.jsx)(l,{personsToShow:k,deletePerson:function(e){var n=t.filter((function(n){return n.id===e}));console.log(n);var c=n[0].id;window.confirm("Are you sure you want to delete ".concat(n[0].name,"?"))&&(O(c),r(t.filter((function(e){return e.id!==c}))))}})]})};a.a.render(Object(i.jsx)(x,{}),document.getElementById("root"))},7:function(e,n,t){}},[[40,1,2]]]);
//# sourceMappingURL=main.4efafcc2.chunk.js.map