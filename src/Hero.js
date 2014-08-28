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
	
	//定义角色的下落动作，这个动作是hero的“内部动作”，没有必要直接提供给舞台调用
	function fall(){
		//不完美地模拟自由落体
		TweenMax.to(hero,0.6,{y:540,rotation:0,ease:Quad.easeIn});
	};
	
	return {
		//需要提供给舞台调用的“外部”动作，写在return里
		//当点击舞台时，stage需要指示Hero跳起
		jump:function(){
			TweenMax.killTweensOf(hero);
			TweenMax.to(hero,0.3,{y:(hero.y-80),rotation:-30,ease:Sine.easeOut,onComplete:fall});	
		},
		update:function(){
			
		}
	};
}