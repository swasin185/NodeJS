for(var ComplexNumber=function(){function a(e,t){this.re=e,this.im=t}return a.prototype.absolute=function(){return Math.sqrt(this.re*this.re+this.im*this.im)},a.prototype.add=function(e){this.re=Math.round((this.re+e.re)*a.PRECISION)/a.PRECISION,this.im=Math.round((this.im+e.im)*a.PRECISION)/a.PRECISION},a.prototype.getImage=function(){return this.im},a.prototype.getReal=function(){return this.re},a.prototype.multiply=function(e){var t=this.re*e.re-this.im*e.im,e=this.re*e.im+this.im*e.re;this.re=Math.round(t*a.PRECISION)/a.PRECISION,this.im=Math.round(e*a.PRECISION)/a.PRECISION},a.prototype.power2=function(){this.multiply(this)},a.PRECISION=1e15,a}(),canvas=document.getElementById("cpxCanvas"),ctx=canvas.getContext("2d"),boxReal=document.getElementById("realValue"),boxImage=document.getElementById("imageValue"),boxBoundary=document.getElementById("boundary"),txtRunTime=document.getElementById("runTime"),WIDTH=canvas.width,HEIGHT=canvas.height,MID_WIDTH=canvas.width/2,MID_HEIGHT=canvas.height/2,MAX_N=51,PALETTE=new Array(MAX_N),level=0,x=Math.floor(3*Math.random()),i=0;i<MAX_N;i++)PALETTE[i]=new Array(3),PALETTE[i][x+i%3]=level=5*i,PALETTE[i][(x+i+1)%3]=Math.floor(Math.random()*level/2+level/2),PALETTE[i][(x+i+2)%3]=Math.floor(Math.random()*level/2+level/2);var boundary,center_real,center_image,center,imgData=ctx.createImageData(WIDTH,HEIGHT),data=imgData.data;function calculate(){console.log("calculate");var e=(new Date).getTime();boundary=Number(boxBoundary.value),center_real=Number(boxReal.value),center_image=Number(boxImage.value),center=new ComplexNumber(center_real,center_image);new ComplexNumber(-.5,-.5);for(var t,a,o,r,n,I,i=0,m=Math.round(WIDTH*HEIGHT/100),u=0,l=0;l<HEIGHT;l++)for(var T=Math.round(((l-MID_HEIGHT)*boundary/HEIGHT+center_image)*ComplexNumber.PRECISION)/ComplexNumber.PRECISION,c=0;c<WIDTH;c++){for(++u%m==0&&console.log(u/m+" %"),o=Math.round(((c-MID_WIDTH)*boundary/WIDTH+center_real)*ComplexNumber.PRECISION)/ComplexNumber.PRECISION,t=new ComplexNumber(o,T),a=new ComplexNumber(o,T),i=1;i<MAX_N&&a.absolute()<2;)n=a.getReal(),I=a.getImage(),a.power2(),a.add(t),a.getReal()==n&&a.getImage()==I?i=MAX_N:i++;i--,data[r=4*(l*WIDTH+c)]=PALETTE[i][0],data[++r]=PALETTE[i][1],data[++r]=PALETTE[i][2],data[++r]=255}paint(),e=(new Date).getTime()-e,txtRunTime.innerHTML="run time = "+e/1e3+" seconds"}function clickXY(e){var t=e.offsetX,a=e.offsetY;boxReal.value=String(center_real+Math.round((t-MID_WIDTH)*boundary/WIDTH*ComplexNumber.PRECISION)/ComplexNumber.PRECISION),boxImage.value=String(center_image+Math.round((a-MID_HEIGHT)*boundary/HEIGHT*ComplexNumber.PRECISION)/ComplexNumber.PRECISION),0==e.button?boundary/=2:boundary*=2,boxBoundary.value=String(boundary),calculate()}function paint(){ctx.putImageData(imgData,0,0);for(var e=0;e<=WIDTH;e+=100)ctx.moveTo(e,0),ctx.lineTo(e,5),ctx.moveTo(e,HEIGHT),ctx.lineTo(e,HEIGHT-5);for(var t=0;t<=HEIGHT;t+=100)ctx.moveTo(0,t),ctx.lineTo(5,t),ctx.moveTo(WIDTH,t),ctx.lineTo(WIDTH-5,t);ctx.moveTo(MID_WIDTH-5,MID_HEIGHT),ctx.lineTo(MID_WIDTH+5,MID_HEIGHT),ctx.moveTo(MID_WIDTH,MID_HEIGHT-5),ctx.lineTo(MID_WIDTH,MID_HEIGHT+5),ctx.stroke()}paint(),calculate();