/*
Rocks.js负责控制和管理游戏中的各种陨石。
*/
function Rock(queue,stage){
	
	//从资源清单中创建rock
	var rock = new createjs.Bitmap(queue.getResult("rock"));
	
	//把rock添加到舞台
	stage.addChild(rock);
	
	//指定注册点
	rock.regX=50;
	rock.regY=50;
	
	//随机缩放尺寸 1/3 - 2/3
	rock.scaleX=rock.scaleY=(Math.random()+1)/3;
	
	//随机初始位置，确保其在舞台显示区域之外
	rock.x=stage.canvas.width+100;
	rock.y=stage.canvas.height*(0.9-Math.random()*0.6);

	//随机生成rock穿越舞台所需的移动时间,这个时间决定了rock的移动速度
	var flyTime = Math.random()*5+3;
	
	//让rock从舞台右侧飞到舞台左侧
	TweenMax.to(rock,flyTime,{x:-100,rotation:720,ease:Linear.easeNone});
	
	return {
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
				var flyTime = Math.random()*5+3;
				TweenMax.to(rock,flyTime,{x:-100,
										  rotation:720,
										  ease:Linear.easeNone});
			}
		}
	}
}