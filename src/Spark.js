/*
Spark.js负责在碰撞时动态生成火花。
*/
function drawSpark(stage,x,y){
	
	//创建火焰效果（SpriteSheet）
	var sparkData = {
     	images: ["images/spark.png"],
     	frames: {width:105, height:105},
     	animations: {sparkAnimation:[0,15]}
	 };
	var sparkSpriteSheet = new createjs.SpriteSheet(sparkData);
	
	//生成一个新的spark
	var spark = new createjs.Sprite(sparkSpriteSheet,"sparkAnimation");
	spark.regX=53;
	spark.regY=53;
	spark.x=x;
	spark.y=y;
	spark.scaleX=spark.scaleY=0.6;
	stage.addChild(spark);
	
	//绑定一个事件处理函数，当spark动画结束时，自动从stage移除。
	spark.addEventListener("animationend",function(){
		spark.stop();
		stage.removeChild(spark);
	});	
	
	//spark不需要与外部脚本代码进行互动，所以不用return
	//return {};
}