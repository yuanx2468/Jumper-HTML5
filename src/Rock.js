/*
Rocks.js负责控制和管理游戏中的各种陨石。
*/
function Rock(queue,stage){
	
	//从资源清单中创建rock
	var rock = new createjs.Bitmap(queue.getResult("rock"));
	
	//指定注册点
	rock.regX=50;
	rock.regY=50;
	
	//随机缩放尺寸 1/3 - 2/3
	rock.scaleX=rock.scaleY=(Math.random()+1)/3;
	
	//随机初始位置，确保其在舞台显示区域之外
	rock.x=stage.canvas.width+100;
	rock.y=stage.canvas.height*(0.9-Math.random()*0.6);
	
	//把rock添加到舞台
	stage.addChild(rock);
	
	function flyToLeft(flyTime,delayTime){
		//在flyTime指定的时间内，让rock从舞台右侧飞到舞台左侧
			TweenMax.to(rock,flyTime,{x:-100,
								  rotation:720,
								  ease:Linear.easeNone,
								  delay:delayTime});
	}
	
	return {
		fly:function(flyTime,delayTime){
			//flyToLeft()无法直接从Rock的外部调用
			//这里的fly()可以被理解成开放给外部调用的一个快捷方式
			flyToLeft(flyTime,delayTime);
		},
		update:function(){
			//让陨石循环移动
			//如果陨石的位置已经到达了舞台最左侧，就重置其位置、速度和尺寸
			if(rock.x<=-100){
				//先移除之前的Tween动画和状态
				TweenMax.killTweensOf(rock);				
				rock.x=stage.canvas.width+100;
				rock.y=stage.canvas.height*(0.9-Math.random()*0.6);
				rock.scaleX=rock.scaleY=(Math.random()+1)/3;
				rock.rotation=0;
				
				//然后开始新的飞行
				var flyTime=Math.random()*5+3;
				var delayTime = 0;
				flyToLeft(flyTime,delayTime);
			}
		},		
		getHotspot:function(){
			//获取rock的碰撞检测热区
			return {x:rock.x,y:rock.y,r:50*rock.scaleX}
		},
		getX:function(){
			return rock.x
		},
		getY:function(){
			return rock.y
		}
	}
}