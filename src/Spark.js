//这是一个生产火花的工厂
function Spark(x,y,stage){
	//创建火焰效果（SpriteSheet）
	var sparkData = {
     	images: ["images/spark.png"],
     	frames: {width:105, height:105},
     	animations: {sparkAnimation:[0,15]}
	 };
	var sparkSpriteSheet = new createjs.SpriteSheet(sparkData);
	var spark = new createjs.Sprite(sparkSpriteSheet, "sparkAnimation");
	spark.regX=53;
	spark.regY=53;
	spark.x=x;
	spark.y=y;
	spark.scaleX=spark.scaleY=0.6;
	stage.addChild(spark);
	
	spark.removable=false;
	spark.addEventListener("animationend",function(evt){
		spark.stop();
		spark.removable=true;
	});
	
	return spark;
}