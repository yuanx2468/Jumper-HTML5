/*
Mine.js负责控制和管理游戏中的各种能量矿石
*/
function Mine(stage){
	//创建闪烁效果（SpriteSheet）
	var mineData = {
     	images: ["images/energy_mine.png"],
     	frames: {width:30, height:30},
     	animations: {mineAnimation:[0,3]}
	 };
	var mineSpriteSheet = new createjs.SpriteSheet(mineData);
	
	//根据SpriteSheet生成mine
	var mine = new createjs.Sprite(mineSpriteSheet,"mineAnimation");
	mine.regX=15;
	mine.regY=15;
	mine.x=stage.canvas.width+30;
	mine.y=stage.canvas.height*(0.9-Math.random()*0.6);
	
	//添加到舞台
	stage.addChild(mine);
	
	//当能量矿石与hero碰撞后并飞向能量槽的过程中
	//能量矿石有可能再次与hero产生交叠
	//而我们应该避免重复进行碰撞检测
	//通过设置isCollidable变量，我们可以避免不必要的重复进行碰撞检测
	var collidable=true;
	
	
	function flyToLeft(flyTime,delayTime){
		//在flyTime指定的时间内，让mine从舞台右侧飞到舞台左侧
			TweenMax.to(mine,flyTime,{x:-50,
								  rotation:720,
								  ease:Linear.easeNone,
								  delay:delayTime});
	}
	function reset(){
		//清理Tween动画
		TweenMax.killTweensOf(mine);
		
		//重置mine的位置、透明度、旋转和缩放
		mine.x=stage.canvas.width+30;
		mine.y=stage.canvas.height*(0.9-Math.random()*0.6);
		mine.alpha=1;
		mine.rotation=0;
		mine.scaleX=mine.scaleY=1;
		collidable=true;
		
		
		//自动重新开始Tween动画
		var flyTime=Math.random()*5+3;
		var delayTime = Math.random()*3+3;
		flyToLeft(flyTime,delayTime);
	}	
	
	return{
		getX:function(){
			return mine.x
		},
		getY:function(){
			return mine.y
		},
		getHotspot:function(){
			//获取mine的碰撞检测热区
			return {x:mine.x,y:mine.y,r:15}
		},
		update:function(){
			//判断能量矿石是否已经飞出了显示区域
			//如果飞出显示区域就重置能量矿石
			if(mine.x<=-30){
				reset()
			}
		},
		addToEnergyTank:function(){
			//让能量矿石飞向屏幕上方的能量槽里
			//当玩家成功捕获能量矿石后将激发这个函数			
			TweenMax.killTweensOf(mine);
			TweenMax.to(mine,1,{x:(stage.canvas.width-30),
							y:-30,
							rotation:720,
							alpha:0.5,
							scaleX:0.5,
							scaleY:0.5,
							ease:Sine.easeOut,
							onComplete:reset,
							});
			//飞向能量槽的过程中，应避免再次碰撞检测
			collidable=false;
						
		},
		fly:function(){
			var flyTime=Math.random()*5+3;
			var delayTime = Math.random()*3+3;
			flyToLeft(flyTime,delayTime)
		},
		isCollidable:function(){
			//判断是否可以进行碰撞检测
			if(collidable){
				return true;
			}else{
				return false;
			}
		}
	}
}