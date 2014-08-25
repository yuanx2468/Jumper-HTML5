//定义全局变量
var queue;//资源加载器
var stage; //舞台
var bg; //背景
var hero; //玩家控制的角色
var rockList=[];//陨石数组
var sparkList=[];//火花数组
var move;
var lockHero=false;
var gameState="STARTED";//"STARTED","PAUSED"

//初始化，加载资源
function init() {
	//全局参数设置
    createjs.Ticker.setFPS(60);
	
    //加载资源
	//先构建一个资源加载器
	queue = new createjs.LoadQueue(false);
	//绑定加载事件处理
	queue.on("complete", setupStage, this);
	//开始加载
	queue.loadFile({id:"hero_asset", src:"images/hero.png"});
	queue.loadFile({id:"meteor_asset", src:"images/meteor.png"});
	queue.loadFile({id:"bgB_asset", src:"images/bgB.png"});
	queue.loadFile({id:"bgC_asset", src:"images/bgC.png"});
    }

//构建场景
function setupStage(){
	//创建舞台
    stage = new createjs.Stage("gameCanvas");
	createjs.Touch.enable(stage);
    
	//创建背景
    bg = Background(queue,stage);
	
	//创建角色
	hero = Hero(queue,stage);
	
	//生成三个陨石
	generateRock();
	generateRock();
	generateRock();
	
	
	//绑定舞台点击事件
    stage.addEventListener("click",handleStageClick); 
    //心跳启动
    createjs.Ticker.addEventListener("tick",tick);	
	hero.fall()
}

//函数
function generateRock(speed){
	var rock = Rocks(queue.getResult("meteor_asset"),stage,speed);
	rockList.push(rock);
}
function generateSpark(xpos,ypos){
	var spark = Spark(xpos,ypos,stage)
	sparkList.push(spark);
}

//球形算法
function checkCollision(ballA,ballB){
	var dxy=(ballA.x-ballB.x)*(ballA.x-ballB.x)+(ballA.y-ballB.y)*(ballA.y-ballB.y)
	var dr=(ballA.r+ballB.r)*(ballA.r+ballB.r)
	if(dxy>dr){
		return false;
	}else{
		return true;
	}
}

//事件处理
function tick(evt){	
	
	
	//陨石的移动和更新
	var newRockList=[]
	for (var i = 0;i<rockList.length;i++){
		rockList[i].update();
		if(!rockList[i].removable){
		newRockList.push(rockList[i])
		}else{
			stage.removeChild(rockList[i])
			generateRock()
		}
	}
	rockList = newRockList;
	
	//玩家撞到屏幕边界
	if(hero.y<=20){
		hero.knockOnCeiling()
		generateSpark(hero.x,hero.y);
	}else if(hero.y>=520){		
		hero.knockOnBottom();
	}	
	
	//碰撞检测
	for (var i = 0;i<rockList.length;i++){
		if(checkCollision(hero.getHotspot(),rockList[i].getHotspot())){
			var collidingPointX=rockList[i].x+(hero.x-rockList[i].x)/2;
			var collidingPointY=rockList[i].y+(hero.y-rockList[i].y)/2;
			generateSpark(collidingPointX,collidingPointY);			
			if(hero.y>=rockList[i].y){
				hero.pushDown()
			}else{
				hero.pushUp()
			}
		}		
	}
	
	//火花的清理
	var newSparkList=[]
	for (var i = 0;i<sparkList.length;i++){
		if(!sparkList[i].removable){
		newSparkList.push(sparkList[i])
		}else{
			stage.removeChild(sparkList[i])
		}
	}
	sparkList = newSparkList;
	
	//循环更新视图
	bg.update()
    stage.update();
}
function handleStageClick(evt){
	if(!hero.stunned){
		hero.jump()
	}    
}