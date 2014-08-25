(function(window) {
spark_mc = function() {
	this.initialize();
}
spark_mc._SpriteSheet = new createjs.SpriteSheet({images: ["walkingmangame.png"], frames: [[0,0,103,104,0,50.5,55.6],[103,0,103,104,0,50.5,55.6],[206,0,103,104,0,50.5,55.6],[309,0,103,104,0,50.5,55.6],[0,104,103,104,0,50.5,55.6],[103,104,103,104,0,50.5,55.6],[206,104,103,104,0,50.5,55.6],[309,104,103,104,0,50.5,55.6],[0,208,103,104,0,50.5,55.6],[103,208,103,104,0,50.5,55.6],[206,208,103,104,0,50.5,55.6],[309,208,103,104,0,50.5,55.6],[0,312,103,104,0,50.5,55.6],[103,312,103,104,0,50.5,55.6],[206,312,103,104,0,50.5,55.6]]});
var spark_mc_p = spark_mc.prototype = new createjs.Sprite();
spark_mc_p.Sprite_initialize = spark_mc_p.initialize;
spark_mc_p.initialize = function() {
	this.Sprite_initialize(spark_mc._SpriteSheet);
	this.paused = false;
}
window.spark_mc = spark_mc;
}(window));

