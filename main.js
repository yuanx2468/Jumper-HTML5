//定义全局变量
var stage;
var bgBox;//把bgBox变为一个全局变量，这样就可以在其他函数中引用它了
var ball;

//定义一个初始化函数init，这个函数被绑定到main.html的body标记的onload属性上，所以当body的内容完成加载时，该函数将被执行。
function init(){
	//全局参数设置
	
	//Ticker是createjs用于控制渲染频率的内部时钟
    createjs.Ticker.setFPS(60);
	
	//创建舞台引用
	//还记得main.html文件中有一个canvas标记么，其ID是gameCanvas
	//下面这行代码允许createjs把gameCanvas转化成一个舞台
	//对于所有后续工作来说，这是必不可少的一步
    stage = new createjs.Stage("gameCanvas");
	
	//创造一个变量bgBox，这个变量将存放我们创建的形状
	bgBox = new createjs.Shape();
	//形状的宽度等于舞台的宽度
	var boxWidth=stage.canvas.width;
	//形状的高度等于舞台的高度
	var boxHeight=stage.canvas.height;
	//现在开始绘制,beginFill设置了bgBox要填充的颜色，drawRect设置了bgBox的x,y,width,height
	bgBox.graphics.beginFill("#272c4d").drawRect(0,0,boxWidth,boxHeight);
	//把绘制好的box放置在舞台上，如果不做这一步，box就不会显示
	stage.addChild(bgBox);
	
	//绘制ball
	ball = new createjs.Shape();
	ball.graphics.beginFill("#fff").drawCircle(0,0,50);
	stage.addChild(ball);	
	
	//绑定事件处理
	stage.addEventListener("click",onClickStage);
	
	//Ticker是createjs用于控制渲染频率的内部时钟
	createjs.Ticker.addEventListener("tick",onTick);
}
function onClickStage(){
	console.log("你点击了stage");
}
function onTick(){
	ball.x += 1;
	ball.y += 1;
	
	//更新一下stage的显示，如果不做这一步，bgbox和ball就不会显示
	stage.update();	
}