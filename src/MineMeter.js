/*
MineMeter.js负责控制游戏界面上的生命值指示器。
*/
function MineMeter(queue, stage) {	
	//创建主角
	//首先创建一个空的容器
    var mineMeter=new createjs.Container();
	//把加载好的life_meter.png添加到容器里面
	mineMeter.addChild(new createjs.Bitmap(queue.getResult("mineMeter")));
	//设置注册点到图像的中心位置，图像尺寸为50*50
	mineMeter.regX=0;
	mineMeter.regY=0;
	//处设置初始位置
    mineMeter.x=stage.canvas.width-94;
    mineMeter.y=10;
	
	//创建一个记录分数的文本
	var textField = new createjs.Text("0", "20px Verdana bold", "#272c4d");
	//文本居中对齐
	textField.textAlign="center"; 
	textField.x = 25; 
	textField.y = 8;
	mineMeter.addChild(textField)
	
	//添加到舞台
    stage.addChild(mineMeter);
	
	return {
		setValue:function(mineValue){
			textField.text=mineValue;
		}
	}
}