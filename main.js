//定义全局变量
var queue;//createjs加载后，将这个变量里放置一个资源加载器
var stage;
var bg;//对Background的引用
var hero;//对Hero的引用
var rocks=[];//rock不止一块，所以我们用一个数组rocks来存放对所有rock的引用
var mine;
var MAX_ROCK_NUM = 4;//游戏画面中最多同时出现的石头数量
var lifeMeter;
var mineMeter;
var startScreen;
var gameOverScreen;
var gameWinScreen;

var mineCollected=0;//能量矿石采集值初始为0;
var life=100;//生命值初始为100;
var gamePaused = true;

//定义一个初始化函数init，这个函数被绑定到main.html的body标记的onload属性上，所以当body的内容完成加载时，该函数将被执行。
function init(){
	//全局参数设置	
	//Ticker是createjs用于控制渲染频率的内部时钟
    createjs.Ticker.setFPS(60);
	
	//创建舞台引用
    stage = new createjs.Stage("gameCanvas");
	
	
	//加载资源
	//先构建一个资源加载器
	queue=new createjs.LoadQueue(false);
	
	//绑定加载完成后要执行的事件处理
	queue.on("complete",onLoadQueueComplete,this);
	
	//设置加载清单
	queue.loadManifest([
		{id:"lowMountain", src:"images/lowMountain.png"},
		{id:"highMountain", src:"images/highMountain.png"},
		{id:"hero", src:"images/hero.png"},
		{id:"rock", src:"images/rock.png"},
		{id:"lifeMeter", src:"images/life_meter.png"},
		{id:"mineMeter", src:"images/mine_meter.png"},
		{id:"bannerTitle", src:"images/banner_title.png"},
		{id:"bannerGameOver", src:"images/banner_gameover.png"},
		{id:"bannerWin", src:"images/banner_win.png"}
	])
	//开始加载
	queue.load();
}
//加载完毕事件处理
function onLoadQueueComplete (){
	//当各类资源加载完毕后，就可以开始着手绘制了
	
	//绘制背景
	bg=Background(queue,stage);
	
	//绘制主角
	hero=Hero(queue,stage);
	
	//绘制陨石
	for (var i=0;i<MAX_ROCK_NUM;i++){		
		var rock = Rock(queue,stage);
		var flyTime=Math.random()*5+3;
		var delayTime = i;
		rock.fly(flyTime,delayTime)
		rocks.push(rock);
	}
	
	//绘制能量矿石
	mine=Mine(stage);
	mine.fly();
	
	//绘制UI部件
	lifeMeter=LifeMeter(queue,stage);
	mineMeter=MineMeter(queue,stage);
	
	//开始屏幕
	startScreen= StartScreen(queue,stage);
	startScreen.show();
	
	//gameover屏幕
	gameOverScreen= GameOverScreen(queue,stage);
	
	//胜利屏幕
	gameWinScreen= GameWinScreen(queue,stage);
	
	//事件处理函数的绑定应该在所有绘制工作完成后进行
	createjs.Ticker.addEventListener("tick",onTick);
	stage.addEventListener("click",onClickStage);
	
}
//点击舞台事件处理
function onClickStage(){
	console.log("你点击了stage");
	//每点击一次屏幕，就让hero跳起一次
	if(!gamePaused){
		hero.jump()
	}
	
}
//滴答
function onTick(){
	if(!gamePaused){
		//每次刷新显示时都要碰撞检测
		//检测hero与每一块陨石的碰撞情况
		for (var i = 0;i<rocks.length;i++){
			if(checkCollision(hero.getHotspot(),rocks[i].getHotspot())){
				if(hero.getY()>=rocks[i].getY()){
					hero.pushDown();
					loseLife(5);
				}else{
					hero.pushUp();
					loseLife(1);
				}
				//在碰撞的坐标处生成火花
				var collidingX=rocks[i].getX()+(hero.getX()-rocks[i].getX())/2;
				var collidingY=rocks[i].getY()+(hero.getY()-rocks[i].getY())/2;
				drawSpark(stage,collidingX,collidingY);	
			}		
	}	
		
		//检测hero与mine的碰撞情况
		if(checkCollision(hero.getHotspot(),mine.getHotspot())){			
			mine.addToEnergyTank();
			addMine(50);
			}
	}
	
	
	//更新显示
	//每一块石头都要更新
	for(var i=0;i<MAX_ROCK_NUM;i++){
		rocks[i].update();
	}
	mine.update();
	hero.update();
	bg.update();
	stage.update();
}

//碰撞检测球形算法
function checkCollision(ballA,ballB){
	var dxy=(ballA.x-ballB.x)*(ballA.x-ballB.x)+(ballA.y-ballB.y)*(ballA.y-ballB.y)
	var dr=(ballA.r+ballB.r)*(ballA.r+ballB.r)
	if(dxy>dr){
		return false;
	}else{
		return true;
	}
}
//损失生命值
function loseLife(value){
	life-=value;
	if(life<=0){		
		life=0;
		gameOver();
	}
	lifeMeter.setValue(life);
	
}
//采矿得分
function addMine(value){
	mineCollected+=value;
	if(mineCollected>=100){
		mineCollected=100;
		win();
	}
	mineMeter.setValue(mineCollected);
	
}

//开始游戏
function startGame(){
	//重置游戏数值
	gamePaused = false;
	mineCollected = 0
	life = 100;
	//重置UI
	mineMeter.setValue(mineCollected);
	lifeMeter.setValue(life);
	//显示hero
	hero.show();
}
//gameOver
function gameOver(){
	gamePaused=true;
	//hero死亡
	hero.die();
	//显示gameover屏幕
	gameOverScreen.show();
}
//玩家胜利
function win(){
	gamePaused=true;
	//hero死亡
	hero.return();
	//显示gameover屏幕
	gameWinScreen.show();
}