//以下代码定义了玩家角色的属性和能力
function Hero(queue, stage) {
	//创建角色	
    var hero=new createjs.Container();
	hero.addChild(new createjs.Bitmap(queue.getResult("hero_asset")));
	hero.regX=25;
	hero.regY=25;
    hero.x=100;
    hero.y=200;	
    stage.addChild(hero);
	
	//创建火焰效果（SpriteSheet）
	var flameData = {
     	images: ["images/fire.png"],
     	frames: {width:60, height:20},
     	animations: {flameAnimation:[0,4]}
	 };
	var flameSpriteSheet = new createjs.SpriteSheet(flameData);
	var flame = new createjs.Sprite(flameSpriteSheet, "flameAnimation");
	flame.x=-55;
	flame.y=25;
	hero.addChild(flame);
	
	//定义角色行为
	hero.stunned=false;
	hero.jump=function(){
		TweenMax.killTweensOf(hero);
		TweenMax.to(hero,0.3,{y:(hero.y-80),rotation:-30,ease:Sine.easeOut,onComplete:hero.fall});	
	}
	hero.fall=function(){
		TweenMax.to(hero,0.6,{y:540,rotation:0,ease:Sine.easeIn});
	}
	hero.knockOnCeiling=function(){
		hero.stunned=true;
		TweenMax.killTweensOf(hero);
		TweenMax.to(hero,1.2,{y:460,rotation:360,ease:Back.easeOut,onComplete:function(){
			hero.stunned=false;
			hero.rotation=0;
		}});
	}
	hero.knockOnBottom=function(){
		hero.stunned=true;
		TweenMax.killTweensOf(hero);
		TweenMax.to(hero,0.8,{y:460,rotation:0,ease:Back.easeOut,onComplete:function(){
			hero.stunned=false;
		}});
	}
	hero.pushUp=function(){
		hero.stunned=true;
		TweenMax.to(hero,0.8,{y:(hero.y-100),rotation:-360,ease:Back.easeOut,onComplete:function(){
				hero.stunned=false;
				hero.rotation=0;				
				hero.fall();
		}});
	}
	hero.pushDown=function(){
		hero.stunned=true;
		TweenMax.to(hero,0.8,{y:(hero.y+100),rotation:360,ease:Back.easeOut,onComplete:function(){
				hero.stunned=false;
				hero.rotation=0;				
				hero.fall();
		}});
	}
	hero.getHotspot=function(){
		return {x:hero.x,y:hero.y,r:25}
	}
	
	return hero;
}