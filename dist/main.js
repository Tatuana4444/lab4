!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="dist/",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var r={displayText:function(e){document.getElementById("news").innerHTML=e},displaySourcesList:function(e,t){for(var n=0;n<t;n++){var r=document.getElementById("header__list__btn"+String(n));r.innerHTML="<a href=#>"+e.sources[n].name,r.setAttribute("data-id",e.sources[n].id)}},hideButton:function(){document.getElementById("btn-load-more").removeAttribute("class"),document.getElementById("btn-load-more").innerHTML=""},showButton:function(){document.getElementById("btn-load-more").setAttribute("class","button"),document.getElementById("btn-load-more").innerHTML="<li >Load more</li>"},displayNothing:function(){document.getElementById("news").innerHTML="<h4>There are no articles matching your request</h4>"}},o={getContent:function(e,t,n){var i=new Request(e);fetch(i).then(function(e){return e.json()}).then(function(i){"ok"==i.status&&(console.log(e),console.log(i),"List"==t?r.displaySourcesList(i,n):o.doText(i,n))})},createText:function(e,t){for(var n="",o=0;o<t;o++){var i=e.articles[o].urlToImage,u=e.articles[o].title,a=e.articles[o].description,c=e.articles[o].source.name;null==a&&(a=""),null==i&&(i="./picture/pic.jpg"),n+="<li><img src="+i+"><a href="+e.articles[o].url+" <h3>"+u+"</h3></a><h6>"+c+"</h6><p>"+a+"</p></li>"}r.displayText(n)},doText:function(e,t){var n;if(0==(n=e.articles.length<t?e.articles.length:t))return r.displayNothing(),void r.hideButton();r.showButton(),e.articles.length!=e.totalResults&&40!=n||r.hideButton(),o.createText(e,n)}},i=o,u="apiKey=02f5fb5b27fd467cb014b23a2d18c566",a="",c=5;({init:function(){a="https://newsapi.org/v2/top-headlines?country=us",i.getContent("https://newsapi.org/v2/sources?"+u,"List",7),i.getContent(a+"&pageSize=5&"+u,"Text",c);for(var e=function(e){document.getElementById("header__list__btn"+String(e)).addEventListener("click",function(){c=5;var t=document.getElementById("header__list__btn"+String(e)).getAttribute("data-id");a="https://newsapi.org/v2/top-headlines?sources="+t,i.getContent(a+"&pageSize=5&"+u,"Text",c)})},t=0;t<7;t++)e(t);document.getElementById("btn-load-more").addEventListener("click",function(){return c+=5,i.getContent(a+"&pageSize="+c+"&"+u,"Text",c),!1}),document.getElementById("header__searth-btn").onclick=function(){var e=document.getElementById("header__searth-text");c=5,a="https://newsapi.org/v2/everything?q="+e.value,i.getContent(a+"&pageSize="+c+"&"+u,"q",c)},document.getElementById("header__searth-text").addEventListener("keyup",function(e){if(13===e.keyCode)return document.getElementById("header__searth-btn").click(),!1})}}).init()}]);