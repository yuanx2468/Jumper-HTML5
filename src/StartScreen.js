/*
StartScreen.js 负责控制游戏的启动画面。
*/
function StartScreen(queue,stage) {
	//创建一个空的容器startScreen，随后我们会往里面添加开始屏幕的子元素
	var startScreen = new createjs.Container();
	var startBanner = new createjs.Bitmap(queue.getResult("bannerTitle"));
	var howTo1 = new createjs.Bitmap(queue.getResult("howTo1"));
	var howTo2 = new createjs.Bitmap(queue.getResult("howTo2"));
	var howTo3 = new createjs.Bitmap(queue.getResult("howTo3"));
	
	//将startBanner添加到startScreen
	startScreen.addChild(startBanner);
	
	//将howTo添加到startScreen，但同时隐藏他们，这样画面上就只有startBanner显示出来
	startScreen.addChild(howTo1);
	startScreen.addChild(howTo2);
	startScreen.addChild(howTo3);
	howTo1.alpha=0;
	howTo2.alpha=0;
	howTo3.alpha=0;
	
	//用TimeLineMax定义走马灯动画
	var timeline = new TimelineMax({onComplete:function(){
		//自动循环
		timeline.restart();
	}});
	timeline.to(startBanner,0.5,{alpha:0,delay:3})
			.to(howTo1,0.5,{alpha:1})
			.to(howTo1,0.5,{alpha:0,delay:3})
			.to(howTo2,0.5,{alpha:1})
			.to(howTo2,0.5,{alpha:0,delay:3})
			.to(howTo3,0.5,{alpha:1})
			.to(howTo3,0.5,{alpha:0,delay:3})
			.to(startBanner,0.5,{alpha:1})
	
	
	//生成按钮
	var btnData = {
     	images: ["images/btn_start.png"],
     	frames: {width:160, height:75},
     	animations: {normal:[0],clicked:[1]}
	 };
	//根据数据生成Sprite Sheet
	var btnSpriteSheet = new createjs.SpriteSheet(btnData);
	//根据SpriteSheet生成按钮
	var startBtn = new createjs.Sprite(btnSpriteSheet);
	//居中定位
	startBtn.x = 80
	startBtn.y = 250;	
	//将按钮的初始状态设为normal
	startBtn.gotoAndStop("normal");	
	//将按钮添加到开始屏幕
	startScreen.addChild(startBtn)
	
	//按下按钮时切换到clicked状态
	startBtn.addEventListener("mousedown",function(){
		startBtn.gotoAndStop("clicked");
	})
	//松开按钮后切换到normal状态
	startBtn.addEventListener("pressup",function(){
		startBtn.gotoAndStop("normal");
	})
	
	//点击开始按钮开始游戏
	startBtn.addEventListener("click",function(){
		//点击开始游戏后先停止走马灯动画
		timeline.stop();
		//再隐藏自己
		TweenMax.to(startScreen,0.5,{
				scaleX:0,
				scaleY:0,
				ease:Expo.easeOut,
				onComplete:function(){
					startScreen.visible=false;
				}
			})
		
		//startGame()是定义在main.js里的一个全局函数
		//所以这里可以直接调用
		startGame();
	})
	
	//将开始屏幕添加到舞台
	startScreen.regX=160;
	startScreen.regY=160;
	startScreen.x=160;
	startScreen.y=240;	
	stage.addChild(startScreen);
	
	//先暂时隐藏开始屏幕,等调用下面的show()函数时再显示
	startScreen.visible=false;
	
	return {
		show:function(){
			//显示开始屏幕			
			startScreen.visible=true;			
		}
	}
}