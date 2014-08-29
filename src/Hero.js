/*
Hero.js负责控制和管理游戏中所有与主角相关的元素。
*/
function Hero(queue, stage) {
	//创建主角
	//首先创建一个空的容器
    var hero=new createjs.Container();
	//把加载好的hero.png添加到容器里面
	hero.addChild(new createjs.Bitmap(queue.getResult("hero")));
	//设置注册点到图像的中心位置，图像尺寸为50*50
	hero.regX=25;
	hero.regY=25;
	//处设置初始位置
    hero.x=100;
    hero.y=200;
	//添加到舞台
    stage.addChild(hero);
	
	//创建火焰Sprite Sheet
	//获取图像数据
	var flameData = {
     	images: ["images/fire.png"],
     	frames: {width:60, height:20},
     	animations: {flameAnimation:[0,4]}
	 };
	//根据数据生成Sprite Sheet
	var flameSpriteSheet = new createjs.SpriteSheet(flameData);
	//根据Sprite Sheet生成火焰
	var flame = new createjs.Sprite(flameSpriteSheet, "flameAnimation");
	//调整火焰位置到火箭尾部
	flame.x=-55;
	flame.y=25;	
	//将火焰作为一个子元素添加到hero里
	hero.addChild(flame);
	
	return {
		update:function(){
			
		}
	};
}