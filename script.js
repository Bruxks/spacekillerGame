
  $(function(){
  $('#refresh').hide(0);
	$('#refresh').click(function(){
	timer=0;
	points=0;
	gameTime=0;
	bullets=[];
	explosion=[];
	enemies=[];
	 player.x=0; 
	  player.y=220; 
	  $('#refresh').hide(0);
	  gameOver=false;
	})
   var canvas = document.getElementById('img');
    var ctx = canvas.getContext('2d');
	var gameOver = false;
 var startLoad=0;
 var endLoad=0;
 var keyLeft=false;
 var keyRight=false;
 var keyUp=false;
 var keyDown=false;
 var lastTime;
 var obj;
 var bgImage;
 var player=[];
 var playerSpeed=0.2;
 var bg;
 var bullets=[];
 var bulletsSpeed=0.5;
 var enemies=[];
 var enemySpeed=0.1;
 var keySpace=false;
 var lastFire;
 var gameTime=0;
 var explosion=[];
 var points=0;
 var timer;
var min;
var sec;
 function startload(){
 startLoad++;
 
 startLoad++;
 obj= new Image();
 obj.src='sprites.png';
 obj.onload=function(){endload();};
  startLoad++;
 bgImage= new Image();
 bgImage.src='terrain.png';
 bgImage.onload=function(){endload();};
 
 player.x=0; 
 player.y=220;
 player.w=39; 
 player.h=39;
 player.row=0;
 player.col=39;
 player.count=2; 
 player.a=0;
 endload();
 }
 function main(){
 clear();
 
 var time=Date.now();
 var dt=time-lastTime;
 gameTime+=dt;
 ctx.fillStyle = bg;
 ctx.fillRect(0,0,canvas.width,canvas.height)
 if(gameOver){
	ctx.font = '72px Verdana';
	ctx.fillStyle='#fff';
	ctx.fillText('GAME OVER',40,250);	
 }
 else{
 drawPlayer(dt);
 drawBullet(dt);
 drawEnemies(dt);
 drawExplosion(dt);
 checkColision();
 	timer = Math.floor(gameTime/1000);
	min =Math.floor(timer/60);
	sec=timer%60
	if(min<10){
	min='0'+min;
	}
	if(sec<10){
	sec='0'+sec;
	}
 }

	
	/////////
 ctx.font='16px Verdana';
 ctx.fillStyle='#fff';
 ctx.fillText('Time '+ min+':'+sec,400,20);
	ctx.fillText('Killed :'+points,20,20)
 lastTime=time;
 requestAnimFrame(main);

 }
 function drawExplosion(dt){
	for(var i=0; i<explosion.length;i++){
	var x = explosion
	
	var x=explosion[i];
	ctx.drawImage(obj,(x.a*x.col),x.row,x.w,x.h,x.x,x.y,x.w,x.h);
	x.a++;
	if(x.a==x.c){
	explosion.splice(i,1);
	i--;
	}
	}
 }
 function checkColision(){
 for(var i=0; i<enemies.length;i++){
 if(collide(enemies[i].x,enemies[i].y,enemies[i].w, enemies[i].h,player.x,player.y,player.w,player.h)){
 gameover();
 break;
 }
 for(var j=0;j<bullets.length;j++){
 if(collide(enemies[i].x,enemies[i].y,enemies[i].w, enemies[i].h,bullets[j].x,bullets[j].y,bullets[j].w,bullets[j].h)){
 explosion.push({'x':enemies[i].x,'y':enemies[i].y,'row':117,'col':39,'w':39,'h':39,'a':0,'c':13});
			points++;
 enemies.splice(i,1);
 i--;
 bullets.splice(j,1);
 break;
 }
 }
 
 }
 }
 function collide(x1,y1,w1,h1,x2,y2,w2,h2){
 if((x1+w1)<=x2 || x1 >(x2+w2) || (y1+h1)<=y2 ||y1>(y2+h2)){
 return false;
 }
 else{
 return true;
 }
 }
 function gameover(){
 gameOver= true;
  ///////refresh
$('#refresh').show(0);
 

 }
 function drawPlayer(dt){

 if(keyLeft){
 
 player.x-=playerSpeed*dt;
	if(player.x<0){
	player.x=0;
	}
 }


  if(keyRight){
 player.x+=playerSpeed*dt;

	if(player.x>(canvas.width-player.w)){
	player.x=canvas.width-player.w;
	}
 }
 if(keySpace){
 if(Date.now()-lastFire>100){
 var x = player.x+player.w/2;
 var y = player.y+player.h/2;
 bullets.push({'x':x,'y':y,'type':'forward','row':39,'col':0,'w':18,'h':8});
 bullets.push({'x':x,'y':y,'type':'up','row':50,'col':0,'w':9,'h':5});
 bullets.push({'x':x,'y':y,'type':'down','row':60,'col':0,'w':9,'h':5});
 lastFire=Date.now();
 }
 }
  if(keyUp){
 player.y-=playerSpeed*dt;
	if(player.y<0){
	player.y=0;
	}
 }
  if(keyDown){
 player.y+=playerSpeed*dt;
	if(player.y>(canvas.height-player.h)){
	player.y=canvas.height-player.w;
	}
 }
 player.a++;
 if(player.a==player.count){
 player.a=0;
 }
ctx.drawImage(obj,(player.a*player.col),player.row,player.w,player.h,player.x,player.y,player.w,player.h);
 }
 
  
 function endload(){
 endLoad++;
 if(startLoad==endLoad){
 start();
 }
 }
 function start(){
 bg=ctx.createPattern(bgImage,'repeat');
 lastTime=Date.now();
 lastFire=Date.now();
 main();
 }
 var requestAnimFrame=(function(){
 return window.requestAnimFrame ||
 window.webkitRequestAnimationFrame ||
 window.mozRequestAnimationFrame ||
 window.oRequestAnimationFrame||
 window.msRequestAnimationFrame||
 function(callback){
 window.setTimeout(callback,1000/60);
 }
 })();

	function drawEnemies(dt){
		if(Math.random()<1-Math.pow(0.993,gameTime/1000)){
			enemies.push({'x':canvas.width,'y':(Math.random()*(canvas.height-39)),'row':78,'col':80,'w':80,'h':39,'action':0,'count':4});
		}	
	for(var i=0;i<enemies.length;i++){
			value=enemies[i];
			value.x-=enemySpeed*dt;
			value.action++;
			if(value.action==value.count)
			{
				value.action=0;
			}
			
			ctx.drawImage(obj,(value.col*value.action),value.row,value.w,value.h,value.x,value.y,value.w,value.h);
			
			if(value.x+value.w<0)
			{
			
				enemies.splice(i,1);
				i--;
			}
		}
	}
 function clear(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  function drawBullet(dt){
  for(var i=0;i<bullets.length;i++){
  var bullet =bullets[i];
  if(bullet.type=='up'){
  bullet.y-=bulletsSpeed*dt;
  }
   if(bullet.type=='down'){
  bullet.y+=bulletsSpeed*dt;
  }
   if(bullet.type=='forward'){
  bullet.x+=bulletsSpeed*dt;
  }
  ctx.drawImage(obj,bullet.col,bullet.row,bullet.w,bullet.h,bullet.x,bullet.y,bullet.w,bullet.h);
   if(bullet.y<0 || bullet.y>canvas.height ||bullet.x>canvas.width){
  bullets.splice(i,1)
  }
 
  }
  }
function timePoint(){

	if(gameSec>=60){
	gameSec=0;
	gameMin++;
	}
gameSec++
}


 startload();
///////////keydown\keyup		
$(window).keydown(function(e){
if(e.keyCode==37){
keyLeft=true;
}
if(e.keyCode==40){
keyDown=true;
}
if(e.keyCode==38){
keyUp=true;

}
if(e.keyCode==39){
keyRight=true;
}
if(e.keyCode==32){
keySpace=true;
}
})
$(window).keyup(function(e){
if(e.keyCode==32){
keySpace=false;
}
if(e.keyCode==40){
keyDown=false;
}
if(e.keyCode==39){
keyRight=false;
}
if(e.keyCode==38){
keyUp=false;
}
if(e.keyCode==37){
keyLeft=false;
}

})
startload();

})