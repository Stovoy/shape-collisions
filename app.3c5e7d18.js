parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"A2T1":[function(require,module,exports) {
function n(n,t){var o;if("undefined"==typeof Symbol||null==n[Symbol.iterator]){if(Array.isArray(n)||(o=i(n))||t&&n&&"number"==typeof n.length){o&&(n=o);var e=0,s=function(){};return{s:s,n:function(){return e>=n.length?{done:!0}:{done:!1,value:n[e++]}},e:function(n){throw n},f:s}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,l=!0,u=!1;return{s:function(){o=n[Symbol.iterator]()},n:function(){var n=o.next();return l=n.done,n},e:function(n){u=!0,r=n},f:function(){try{l||null==o.return||o.return()}finally{if(u)throw r}}}}function i(n,i){if(n){if("string"==typeof n)return t(n,i);var o=Object.prototype.toString.call(n).slice(8,-1);return"Object"===o&&n.constructor&&(o=n.constructor.name),"Map"===o||"Set"===o?Array.from(n):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?t(n,i):void 0}}function t(n,i){(null==i||i>n.length)&&(i=n.length);for(var t=0,o=new Array(i);t<i;t++)o[t]=n[t];return o}function o(n,i){for(var t=0;t<i.length;t++){var o=i[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}function e(n,i,t){return i&&o(n.prototype,i),t&&o(n,t),n}function s(n,i){if(!(n instanceof i))throw new TypeError("Cannot call a class as a function")}var r=50,l=!0,u=!0,a=function n(i,t){s(this,n),this.p1=i,this.p2=t},h=function n(i,t){s(this,n),this.x=i,this.y=t},d=function(){function i(n,t,o,e,r){s(this,i),this.id=n,this.points=t,this.x=o,this.y=e,this.color=r,this.xVel=0,this.yVel=0,this.baseBoundingBox=this.calcBoundingBox(),this.recalcBoundingBox()}return e(i,[{key:"draw",value:function(n,i){n.beginPath(),n.moveTo(this.points[0].x+this.x,this.points[0].y+this.y);for(var t=1;t<this.points.length;t++){var o=this.points[t];n.lineTo(o.x+this.x,o.y+this.y)}n.lineTo(this.points[0].x+this.x,this.points[0].y+this.y),n.strokeStyle="black",n.fillStyle=i?"red":this.color,n.stroke(),n.fill(),u&&(n.strokeStyle="purple",n.strokeRect(this.boundingBox.x,this.boundingBox.y,this.boundingBox.width,this.boundingBox.height))}},{key:"calcLines",value:function(){for(var n=[],i=0;i<this.points.length;i++){var t=this.points[i],o=void 0;o=i===this.points.length-1?this.points[0]:this.points[i+1],n.push(new a(new h(t.x+this.x,t.y+this.y),new h(o.x+this.x,o.y+this.y)))}return n}},{key:"calcBoundingBox",value:function(){var i,t=null,o=null,e=0,s=0,r=n(this.points);try{for(r.s();!(i=r.n()).done;){var l=i.value;(null==t||l.x<t)&&(t=l.x),(null==o||l.y<o)&&(o=l.y),l.x>e&&(e=l.x),l.y>s&&(s=l.y)}}catch(u){r.e(u)}finally{r.f()}return new c(t,o,e-t,s-o)}},{key:"recalcBoundingBox",value:function(){this.boundingBox=new c(this.baseBoundingBox.x+this.x,this.baseBoundingBox.y+this.y,this.baseBoundingBox.width,this.baseBoundingBox.height)}},{key:"collides",value:function(i){var t,o=n(this.calcLines());try{for(o.s();!(t=o.n()).done;){var e,s=t.value,r=n(i.calcLines());try{for(r.s();!(e=r.n()).done;){if(b(s,e.value))return!0}}catch(l){r.e(l)}finally{r.f()}}}catch(l){o.e(l)}finally{o.f()}return B(this.boundingBox.center,i.boundingBox)}}]),i}(),c=function(){function n(i,t,o,e){s(this,n),this.x=i,this.y=t,this.width=o,this.height=e,this.center=new h(this.x+this.width/2,this.y+this.height/2)}return e(n,[{key:"collides",value:function(n){return v(this,n)}}]),n}(),x=function(){function i(n,t,o,e){s(this,i),this.root=new y(n,t,o,e),this.capacity=1}return e(i,[{key:"insert",value:function(n){this.insertInto(this.root,n)}},{key:"insertInto",value:function(n,i){if(i.boundingBox.collides(n.boundingBox)){n.shapes.length>this.capacity&&!n.subdivided&&this.subdivideNode(n);var t=!0;n.subdivided&&(t=!1,i.boundingBox.collides(n.nw.boundingBox)?i.boundingBox.collides(n.ne.boundingBox)||i.boundingBox.collides(n.sw.boundingBox)||i.boundingBox.collides(n.se.boundingBox)?t=!0:this.insertInto(n.nw,i):i.boundingBox.collides(n.ne.boundingBox)?i.boundingBox.collides(n.sw.boundingBox)||i.boundingBox.collides(n.se.boundingBox)?t=!0:this.insertInto(n.ne,i):i.boundingBox.collides(n.sw.boundingBox)?i.boundingBox.collides(n.se.boundingBox)?t=!0:this.insertInto(n.sw,i):i.boundingBox.collides(n.se.boundingBox)&&this.insertInto(n.se,i)),t&&n.shapes.push(i)}}},{key:"subdivideNode",value:function(i){var t=i.boundingBox.width/2,o=i.boundingBox.height/2;i.nw=new y(i.boundingBox.x,i.boundingBox.y,t,o),i.ne=new y(i.boundingBox.x+t,i.boundingBox.y,t,o),i.sw=new y(i.boundingBox.x,i.boundingBox.y+o,t,o),i.se=new y(i.boundingBox.x+t,i.boundingBox.y+o,t,o),i.subdivided=!0;var e=i.shapes;i.shapes=[];var s,r=n(e);try{for(r.s();!(s=r.n()).done;){var l=s.value;this.insertInto(i,l)}}catch(u){r.e(u)}finally{r.f()}}},{key:"collisions",value:function(n){return this.collisionsFrom(this.root,n)}},{key:"collisionsFrom",value:function(i,t){var o,e=[],s=n(i.shapes);try{for(s.s();!(o=s.n()).done;){var r=o.value;t.id!==r.id&&(t.collides(r)&&e.push(r))}}catch(l){s.e(l)}finally{s.f()}return i.subdivided&&(t.boundingBox.collides(i.nw.boundingBox)&&(e=e.concat(this.collisionsFrom(i.nw,t))),t.boundingBox.collides(i.ne.boundingBox)&&(e=e.concat(this.collisionsFrom(i.ne,t))),t.boundingBox.collides(i.sw.boundingBox)&&(e=e.concat(this.collisionsFrom(i.sw,t))),t.boundingBox.collides(i.se.boundingBox)&&(e=e.concat(this.collisionsFrom(i.se,t)))),e}},{key:"draw",value:function(n,i){n.strokeStyle="black",n.strokeRect(i.boundingBox.x,i.boundingBox.y,i.boundingBox.width,i.boundingBox.height),i.subdivided&&(this.draw(n,i.nw),this.draw(n,i.ne),this.draw(n,i.sw),this.draw(n,i.se))}}]),i}(),y=function n(i,t,o,e){s(this,n),this.shapes=[],this.boundingBox=new c(i,t,o,e),this.nw=null,this.ne=null,this.sw=null,this.se=null,this.subdivided=!1};function f(n,i,t){return i.x<=Math.max(n.x,t.x)&&i.x>=Math.min(n.x,t.x)&&i.y<=Math.max(n.y,t.y)&&i.y>=Math.min(n.y,t.y)}function g(n,i,t){var o=(i.y-n.y)*(t.x-i.x)-(i.x-n.x)*(t.y-i.y);return o>0?1:o<0?2:0}function b(n,i){var t=g(n.p1,n.p2,i.p1),o=g(n.p1,n.p2,i.p2),e=g(i.p1,i.p2,n.p1),s=g(i.p1,i.p2,n.p2);return t!==o&&e!==s||(!(0!==t||!f(n.p1,i.p1,n.p2))||(!(0!==o||!f(n.p1,i.p2,n.p2))||(!(0!==e||!f(i.p1,n.p1,i.p2))||0===s&&f(i.p1,n.p2,i.p2))))}function v(n,i){return n.x<i.x+i.width&&n.x+n.width>i.x&&n.y<i.y+i.height&&n.y+n.height>i.y}function B(n,i){return n.x>i.x&&n.x<i.x+i.width&&n.y>i.y&&n.y<i.y+i.height}function p(){for(var i=document.getElementById("canvas").getContext("2d"),t=[],o=["blue","purple","pink","orange","black","green"],e=800,s=800,u=0;u<r;u++){for(var a=[],c=0;c<Math.floor(20*Math.random())+1;c++)a.push(new h(100*Math.random(),100*Math.random()));t.push(new d(u,a,400*Math.random(),400*Math.random(),o[Math.floor(Math.random()*o.length)]))}function y(){i.fillStyle="white",i.fillRect(0,0,e,s);var o,r=new x(0,0,e,s),u=n(t);try{for(u.s();!(o=u.n()).done;){var a=o.value;a.recalcBoundingBox(),r.insert(a)}}catch(m){u.e(m)}finally{u.f()}l&&r.draw(i,r.root);var h,d=new Set,c=n(t);try{for(c.s();!(h=c.n()).done;){var y=h.value;if(!d.has(y.id)){var f,g=r.collisions(y),b=n(g);try{for(b.s();!(f=b.n()).done;){var v=f.value;d.add(v.id)}}catch(m){b.e(m)}finally{b.f()}g.length>0&&d.add(y.id)}}}catch(m){c.e(m)}finally{c.f()}var B,p=n(t);try{for(p.s();!(B=p.n()).done;){var w=B.value;d.has(w.id)?w.draw(i,!0):w.draw(i)}}catch(m){p.e(m)}finally{p.f()}}y(),setInterval(function(){!function(){var i,o=n(t);try{for(o.s();!(i=o.n()).done;){var r=i.value;r.xVel+=2*(Math.random()-.5),r.yVel+=2*(Math.random()-.5),r.x+=r.xVel,r.y+=r.yVel,r.x<0&&(r.x=0,r.xVel=0),r.y<0&&(r.y=0,r.yVel=0),r.x>e&&(r.x=e,r.xVel=0),r.y>s&&(r.y=s,r.yVel=0)}}catch(l){o.e(l)}finally{o.f()}}(),y()},50)}p();
},{}]},{},["A2T1"], null)
//# sourceMappingURL=https://stovoy.github.io/shape-collisions/app.3c5e7d18.js.map