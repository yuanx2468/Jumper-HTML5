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
	
	//定义一个变量，用于判断hero是否处于昏迷状态，默认是false（未昏迷）
	var isStunned = false;
	
	
	//游戏设定hero只能在显示区域的范围内活动，
	//所以，当hero碰到舞台顶部时就要被反弹下来，
	//作为惩罚，我们要让hero处于短暂的昏迷，直到反弹结束
	//昏迷过程中，玩家是不能与hero互动的（点击无法让hero跳跃）
	function knockOnCeiling(){
		isStunned = true;
		TweenMax.killTweensOf(hero);
		TweenMax.to(hero,1.2,{
			y:460,
			rotation:360,
			ease:Back.easeOut,
			onComplete:function(){
				//反弹结束后，isStunned应恢复成false，允许玩家继续控制
				isStunned=false;
				hero.rotation=0;
				fall();
		}});
	}
	//始终让hero沉在舞台底部，也不是我们希望的结果
	//所以，当hero触碰到底部时，可以让它自动轻跳一定高度，然后再自动下落再轻跳，如此循环
	//在这个过程中，不必让hero处于昏迷状态，玩家随时可以通过点击提升hero的飞行高度
	function knockOnBottom(){
		TweenMax.killTweensOf(hero);
		TweenMax.to(hero,0.8,{
			y:460,
			rotation:0,
			ease:Back.easeOut,
			onComplete:function(){
				fall();
				isStunned=false;
		}});
	}
	
	//定义角色的下落动作，这个动作是hero的“内部动作”，没有必要直接提供给舞台调用
	function fall(){
		//不完美地模拟自由落体
		TweenMax.to(hero,0.6,{
			y:stage.canvas.height,
			rotation:0,
			ease:Quad.easeIn
		});
	};
	
	return {
		//需要提供给舞台调用的“外部”动作，写在return里
		//当点击舞台时，stage需要指示Hero跳起
		jump:function(){
			//在进行跳跃之前，必须确认hero没有处于昏迷状态
			if(!isStunned){
				//清除原有之前添加的动画效果
				TweenMax.killTweensOf(hero);
				//跳跃动作，向上移动80px，逆时针旋转30度
				TweenMax.to(hero,0.3,{
					y:(hero.y-80),
					rotation:-30,
					ease:Sine.easeOut,
					onComplete:fall
				});
			}				
		},
		update:function(){
			//判断hero的位置是否撞到舞台顶部
			if(hero.y<=25){
				knockOnCeiling();
			} else if(hero.y>=stage.canvas.height-25){
				knockOnBottom();
			}
			
		},
		pushDown:function(){
			isStunned=true;
			TweenMax.to(hero,0.8,{
				y:(hero.y+100),
				rotation:360,
				ease:Back.easeOut,
				onComplete:function(){
					isStunned=false;
					hero.rotation=0;				
					fall();
				}});
		},
		pushUp:function(){
			isStunned=true;
			TweenMax.to(hero,0.8,{
				y:(hero.y-100),
				rotation:-360,
				ease:Back.easeOut,
				onComplete:function(){
					isStunned=false;
					hero.rotation=0;				
					fall();
				}});
		},
		getHotspot:function(){
			//获取hero的碰撞检测热区
			return {x:hero.x,y:hero.y,r:25}
		},
		getY:function(){
			return hero.y
		}
	};
}