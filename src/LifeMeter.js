/*
LifeMeter.js负责控制游戏界面上的生命值指示器。
*/
function LifeMeter(queue, stage) {	
	//创建主角
	//首先创建一个空的容器
    var lifeMeter=new createjs.Container();
	//把加载好的life_meter.png添加到容器里面
	lifeMeter.addChild(new createjs.Bitmap(queue.getResult("lifeMeter")));
	//设置注册点到图像的中心位置，图像尺寸为50*50
	lifeMeter.regX=0;
	lifeMeter.regY=0;
	//处设置初始位置
    lifeMeter.x=10;
    lifeMeter.y=10;
	
	//创建一个记录分数的文本
	var textField = new createjs.Text("100", "bold 20px Verdana", "#272c4d");
	//文本居中对齐
	textField.textAlign="center"; 
	textField.x = 58; 
	textField.y = 8;
	lifeMeter.addChild(textField)
	
	//添加到舞台
    stage.addChild(lifeMeter);
	
	return {
		setValue:function(lifeValue){
			textField.text=lifeValue;
		}
	}
}