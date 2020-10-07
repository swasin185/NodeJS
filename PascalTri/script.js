var __extends=this&&this.__extends||function(){var n=function(t,i){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,i){t.__proto__=i}||function(t,i){for(var e in i)i.hasOwnProperty(e)&&(t[e]=i[e])})(t,i)};return function(t,i){function e(){this.constructor=t}n(t,i),t.prototype=null===i?Object.create(i):(e.prototype=i.prototype,new e)}}(),__awaiter=this&&this.__awaiter||function(t,o,a,l){return new(a=a||Promise)(function(e,i){function n(t){try{r(l.next(t))}catch(t){i(t)}}function s(t){try{r(l.throw(t))}catch(t){i(t)}}function r(t){var i;t.done?e(t.value):((i=t.value)instanceof a?i:new a(function(t){t(i)})).then(n,s)}r((l=l.apply(t,o||[])).next())})},__generator=this&&this.__generator||function(e,n){var s,r,o,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]},t={next:i(0),throw:i(1),return:i(2)};return"function"==typeof Symbol&&(t[Symbol.iterator]=function(){return this}),t;function i(i){return function(t){return function(i){if(s)throw new TypeError("Generator is already executing.");for(;a;)try{if(s=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=0<(o=a.trys).length&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=n.call(e,a)}catch(t){i=[6,t],r=0}finally{s=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,t])}}},cv=document.getElementById("cpxCanvas"),cx=cv.getContext("2d"),WIDTH=cv.width,HEIGHT=cv.height,MID_WIDTH=cv.width/2,MID_HEIGHT=cv.height/2,COLORS=["magenta","cyan","red","lime","yellow","orange","blue"],PI2=2*Math.PI,PI_2=Math.PI/2,GRAVITY=.1,RESISTANCE=.6,Sprite=function(){function t(t,i,e,n){this.radius=5,this.color="yellow",this.setXY(t,i),this.setRadius(n),this.color=e}return t.prototype.setXY=function(t,i){this.x=t,this.y=i},t.prototype.setRadius=function(t){this.radius=t},t.prototype.draw=function(){cx.fillStyle=this.color,cx.beginPath(),cx.arc(this.x,this.y,this.radius,0,PI2),cx.closePath(),cx.fill()},t.prototype.getX=function(){return this.x},t.prototype.getY=function(){return this.y},t.prototype.getRadius=function(){return this.radius},t.prototype.isClickIn=function(t,i){var e=this.x-t,n=this.y-i;return this.radius*this.radius>=e*e+n*n},t.prototype.getAngle=function(t,i){var e=0;return 0!=t?(e=Math.atan(i/t),Math.sign(t)<0&&(e<0?e+=Math.PI:e-=Math.PI)):e=Math.sign(i)*PI_2,e},t}(),Ball=function(n){function s(t,i){var e=n.call(this,t,i,COLORS[s.ID%7],12)||this;return e.speed=0,e.direction=0,e.gravity=GRAVITY,e.removed=!1,s.ID++,e.setDirection(e.direction),e}return __extends(s,n),s.prototype.move=function(){0<this.dy&&this.dy<=this.gravity?(this.dy-=this.gravity,this.gravity=GRAVITY):(this.dy-=this.gravity,this.gravity*=1.01),this.speed=Math.sqrt(this.dx*this.dx+this.dy*this.dy),this.setDirection(this.getAngle(this.dx,this.dy)),this.x+=this.dx,this.y-=this.dy},s.prototype.setDirection=function(t){this.direction=t,this.dx=Math.cos(this.direction)*this.speed,this.dy=Math.sin(this.direction)*this.speed,-1e-4<this.dy&&this.dy<1e-4&&(this.dy=0),-1e-4<this.dx&&this.dx<1e-4&&(this.dx=0)},s.prototype.setSpeed=function(t){this.speed=t,this.setDirection(this.direction)},s.prototype.reflect=function(t){var i=2*t-this.direction;i<0?i+=Math.PI:i-=Math.PI,this.setDirection(i),0!=this.dx?this.dx*=RESISTANCE+Math.random()/10:this.dx=Math.random()/10-.05,this.dy*=RESISTANCE+Math.random()/10},s.prototype.getCollideAngle=function(t){var i=t.getX()-this.x,e=-(t.getY()-this.y);return this.getAngle(i,e)},s.prototype.bounce=function(t,i,e,n){var s=!1;return(this.x<t+this.radius||this.x>e-this.radius)&&(this.x<t+this.radius?this.x=t+this.radius:this.x=e-this.radius,this.reflect(0),s=!0),(this.y<i+this.radius||this.y>n-this.radius)&&(this.y<i+this.radius?this.y=i+this.radius:this.y=n-this.radius,this.reflect(PI_2),s=!0),s},s.prototype.isCollided=function(t){if(this==t||null==t)return!1;var i,e=t.getX()-this.x,n=-(t.getY()-this.y),s=Math.sqrt(e*e+n*n),r=t.getRadius()+this.radius,o=r-s;return 0<o&&!(t instanceof Box)&&(i=this.getAngle(e,n),this.x-=o*Math.cos(i),this.y+=o*Math.sin(i)),s<=r},s.prototype.remove=function(){this.removed=!0},s.prototype.isRemoved=function(){return this.removed},s.prototype.setRemove=function(t){this.removed=t},s.ID=0,s}(Sprite),Pin=function(e){function t(t,i){return e.call(this,t,i,COLORS[Math.floor(Math.random()*COLORS.length)],3)||this}return __extends(t,e),t}(Sprite),Box=function(n){function s(t,i){var e=n.call(this,t,i,"black",25)||this;return e.id=s.ID++,e.count=0,e.size=2*e.radius,e}return __extends(s,n),s.prototype.draw=function(){cx.strokeStyle="lime",cx.strokeText(String(this.count),this.x-10,this.y+this.radius+5)},s.prototype.countBall=function(){this.count++},s.ID=0,s}(Sprite),n=16,allPins=new Array((n*n+n)/2),pin_n=0,boxs=new Array(n),balls=new Array(0),size=45,mid=size/2,x=MID_WIDTH,y=20;size*=Math.sqrt(3)/2;var six=mid/Math.cos(Math.PI/6);allPins[pin_n++]=new Pin(x,y);for(var i=0;i<n;i++){var x_1=MID_WIDTH-i*mid;allPins[pin_n++]=new Pin(x_1-mid,y+size),allPins[pin_n++]=new Pin(x_1-mid,y+size-six);for(var j=0;j<=i;j++)allPins[pin_n++]=new Pin(x_1+mid,y+size),x_1+=2*mid;allPins[pin_n++]=new Pin(x_1-mid,y+size-six),y+=size}y+=mid,x=MID_WIDTH-(n*mid-mid);for(i=0;i<n;i++)boxs[i]=new Box(x,y),x+=2*mid;function calculate(){return __awaiter(this,void 0,void 0,function(){var i,e,s,r,o,a,l,h,c;return __generator(this,function(t){switch(t.label){case 0:e=!(i=!1),t.label=1;case 1:for(0,e=!1,c=0;c<balls.length&&!e;c++)e=balls[c].getY()<MID_HEIGHT/2;if(!e){for(i=!1,c=0;c<balls.length&&!i;c++)balls[c].isRemoved()&&(i=!0,balls[c].setXY(MID_WIDTH,50),balls[c].setRemove(!1));i||(balls[balls.length]=new Ball(MID_WIDTH,50))}for(s=0,r=balls;s<r.length;s++)for(h=r[s],c=0;c<pin_n;c++)h.isCollided(allPins[c])&&h.reflect(h.getCollideAngle(allPins[c]));for(c=0;c<balls.length-1;c++)for(o=c+1;o<balls.length;o++)balls[c].isCollided(balls[o])&&(balls[c].reflect(balls[c].getCollideAngle(balls[o])),balls[o].reflect(balls[o].getCollideAngle(balls[c])));for(a=0,l=balls;a<l.length;a++){for(h=l[a],c=0;c<n&&!h.isRemoved();c++)h.isCollided(boxs[c])&&(boxs[c].countBall(),h.remove());h.bounce(0,0,WIDTH,HEIGHT),h.move()}return paint(),[4,new Promise(function(t){return setTimeout(t,5)})];case 2:return t.sent(),[3,1];case 3:return[2]}})})}function paint(){cx.clearRect(0,0,cv.width,cv.height);cx.shadowBlur=10,cx.shadowColor="blue";Math.sqrt(3);Math.cos(Math.PI/6);for(var t=0;t<n;t++)boxs[t].draw();for(var i=0,e=balls;i<e.length;i++){var s=e[i];s.isRemoved()||s.draw()}}function round(t){return Math.round(1e3*t)/1e3}function clickXY(t){for(var i=0,e=balls;i<e.length;i++){var n=e[i];n.isClickIn(t.offsetX,t.offsetY)&&console.log(n)}}paint(),calculate();