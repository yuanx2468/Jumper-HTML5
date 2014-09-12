/*
GameOverScreen.js 负责控制游戏的结束画面。
*/
function GameOverScreen(queue,stage) {
	//创建一个空的容器gameOverScreen，随后我们会往里面添加开始屏幕的子元素
	var gameOverScreen = new createjs.Container();
	
	//添加banner
	gameOverScreen.addChild(new createjs.Bitmap(queue.getResult("bannerGameOver")));	
	
	//生成按钮
	var btnData = {
     	images: ["images/btn_replay.png"],
     	frames: {width:160, height:75},
     	animations: {normal:[0],clicked:[1]}
	 };
	//根据数据生成Sprite Sheet
	var btnSpriteSheet = new createjs.SpriteSheet(btnData);
	//根据SpriteSheet生成按钮
	var replayBtn = new createjs.Sprite(btnSpriteSheet);
	//居中定位
	replayBtn.x = 80
	replayBtn.y = 250;	
	//将按钮的初始状态设为normal
	replayBtn.gotoAndStop("normal");	
	//将按钮添加到开始屏幕
	gameOverScreen.addChild(replayBtn)
	
	//按下按钮时切换到clicked状态
	replayBtn.addEventListener("mousedown",function(){
		replayBtn.gotoAndStop("clicked");
	})
	//松开按钮后切换到normal状态
	replayBtn.addEventListener("pressup",function(){
		replayBtn.gotoAndStop("normal");
	})
	
	//点击开始按钮开始游戏
	replayBtn.addEventListener("click",function(){
		//先隐藏自己
		TweenMax.to(gameOverScreen,0.5,{
				scaleX:0,
				scaleY:0,
				ease:Expo.easeOut,
				onComplete:function(){
					gameOverScreen.visible=false;
				}
			})
		//startGame()是定义在main.js里的一个全局函数
		//所以这里可以直接调用
		startGame();
	})
	
	//将开始屏幕添加到舞台
	gameOverScreen.regX=160;
	gameOverScreen.regY=160;
	gameOverScreen.x=160;
	gameOverScreen.y=240;	
	stage.addChild(gameOverScreen);
	
	//先暂时隐藏开始屏幕,等调用下面的show()函数时再显示
	gameOverScreen.visible=false;
	
	return {
		show:function(){
			//显示gameover屏幕			
			gameOverScreen.visible=true;
			gameOverScreen.scaleX = gameOverScreen.scaleY =0;
			TweenMax.to(gameOverScreen,0.5,{
				scaleX:1,
				scaleY:1,
				ease:Bounce.easeOut
			})
		}
	}
}