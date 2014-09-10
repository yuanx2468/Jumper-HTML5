//定义全局变量
var queue;//createjs加载后，将这个变量里放置一个资源加载器
var stage;
var bg;//对Background的引用
var hero;//对Hero的引用
var rocks=[];//rock不止一块，所以我们用一个数组rocks来存放对所有rock的引用
var MAX_ROCK_NUM = 4;//游戏画面中最多同时出现的石头数量

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
		{id:"rock", src:"images/rock.png"}
	])
	//开始加载
	queue.load();
	
	
}


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
	
	
	
	console.log(rocks)
	
	//事件处理函数的绑定应该在所有绘制工作完成后进行
	createjs.Ticker.addEventListener("tick",onTick);
	stage.addEventListener("click",onClickStage);
	
	
	
}
function onClickStage(){
	console.log("你点击了stage");
	//每点击一次屏幕，就让hero跳起一次
	hero.jump()
}
function onTick(){
	//更新显示
	//每一块石头都要更新
	for(var i=0;i<MAX_ROCK_NUM;i++){
		rocks[i].update();
	}
	hero.update();
	bg.update();
	stage.update();	
}