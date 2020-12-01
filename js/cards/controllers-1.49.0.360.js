function chunk(n,t){for(var r=[],i=0;i<n.length;i+=t)r.push(n.slice(i,i+t));return r}function chunkArticles(n,t,i){for(var u=[],f=1,r=0;r<n.length;)f==1||f==2?(u.push(n.slice(r,r+3)),r+=3):f%2==0?(u.push(n.slice(r,r+i)),r+=i):(u.push(n.slice(r,r+t)),r+=t),f++;return u}var CardHomepage=angular.module("CardHomepage",[]);angular.module("CardHomepage").filter("to_trusted",["$sce",function(n){return function(t){return n.trustAsHtml(t)}}]);CardHomepage.controller("CardHomepageCtrl",["$timeout","$scope","$http",function(n,t,i){t.increaseBy=function(n){t.displayNum+=n};i({url:"/js/general/CardHandler.ashx",dataType:"json",method:"GET",params:{pageId:document.getElementById("hiddenPageId").value},headers:{"Content-Type":"application/json"}}).success(function(n){t.cards=chunkArticles(n.cards,4,3);t.displayNum=4;t.max=t.cards.length}).error(function(n){t.error=n});i({url:"/js/general/LatestThreadsHandler.ashx",dataType:"json",method:"GET",headers:{"Content-Type":"application/json"}}).success(function(n){t.threads=n.threads}).error(function(n){t.error=n});i({url:"/js/general/TimeLineHandler.ashx",dataType:"json",method:"GET",headers:{"Content-Type":"application/json"}}).success(function(n){t.timelines=n.timeLines}).error(function(n){t.error=n});i({url:"/js/general/AuthorHandler.ashx",dataType:"json",method:"GET",params:{pageId:document.getElementById("hiddenPageId").value},headers:{"Content-Type":"application/json"}}).success(function(n){t.authors=chunk(n.authors,4)}).error(function(n){t.error=n})}]);angular.module("CardHomepage").filter("truncate",function(){return function(n,t,i,r){if(!n)return"";if((i=parseInt(i,10),!i)||n.length<=i)return n;if(n=n.substr(0,i),t){var u=n.lastIndexOf(" ");u!=-1&&((n.charAt(u-1)=="."||n.charAt(u-1)==",")&&(u=u-1),n=n.substr(0,u))}return n+(r||"…")}})