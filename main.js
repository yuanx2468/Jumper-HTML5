//定义全局变量
var stage;

//定义一个初始化函数init，这个函数被绑定到main.html的body标记的onload属性上，所以当body的内容完成加载时，该函数将被执行。
function init(){
	
	//创建舞台引用
	//还记得main.html文件中有一个canvas标记么，其ID是gameCanvas
	//下面这行代码允许createjs把gameCanvas转化成一个舞台
	//对于所有后续工作来说，这是必不可少的一步
    stage = new createjs.Stage("gameCanvas");
	
	//创造一个变量bgBox，这个变量将存放我们创建的形状
	var bgBox = new createjs.Shape();
	//形状的宽度等于舞台的宽度
	var boxWidth=stage.canvas.width;
	//形状的高度等于舞台的高度
	var boxHeight=stage.canvas.height;
	//现在开始绘制,beginFill设置了bgBox要填充的颜色，drawRect设置了bgBox的x,y,width,height
	bgBox.graphics.beginFill("#272c4d").drawRect(0,0,boxWidth,boxHeight);
	//把绘制好的box放置在舞台上，如果不做这一步，box就不会显示
	stage.addChild(bgBox);
	//更新一下stage的显示，如果不做这一步，box就不会显示
	stage.update();	
	
	//绑定事件处理
	stage.addEventListener("click",onClickStage)
}
function onClickStage(){
	console.log("你点击了stage");
}