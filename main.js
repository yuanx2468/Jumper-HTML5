//定义全局变量
var queue;//createjs加载后，将这个变量里放置一个资源加载器
var stage;

//这三个变量用于装载背景图形和图像
var blueSky;
var lowMountain;
var highMountain;

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
		{id:"highMountain", src:"images/highMountain.png"}
	])
	//开始加载
	queue.load();
	
}
function setupBackground(){
	//背景包括3层，由远到近分别是深蓝色天空、高山、矮山
	
	//天空的尺寸与舞台的尺寸一致
	blueSky = new createjs.Shape();
	var skyWidth=stage.canvas.width;
	var skyHeight=stage.canvas.height;
	blueSky.graphics.beginFill("#272c4d").drawRect(0,0,skyWidth,skyHeight);
	stage.addChild(blueSky);
	
	//从queue获取highMountain的图像资源
	highMountain = new createjs.Bitmap(queue.getResult("highMountain"));
	//底部对齐，140是highMountain.png的高度
	highMountain.y=stage.canvas.height-140;
	stage.addChild(highMountain);	
	
	//从queue获取lowMountain的图像资源
	lowMountain = new createjs.Bitmap(queue.getResult("lowMountain"));
	//底部对齐，110是lowMountain.png的高度
	lowMountain.y=stage.canvas.height-110;
	stage.addChild(lowMountain);
	
}
function onLoadQueueComplete (){
	//当各类资源加载完毕后，就可以开始着手绘制了
	
	//绘制背景
	setupBackground();
	
	//事件处理函数的绑定应该在所有绘制工作完成后进行
	createjs.Ticker.addEventListener("tick",onTick);
	stage.addEventListener("click",onClickStage);	
}
function onClickStage(){
	console.log("你点击了stage");
}
function onTick(){
	//更新一下stage的显示
	stage.update();	
}