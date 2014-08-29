/*
Rocks.js负责控制和管理游戏中的各种陨石。
*/
function Rocks(queue,stage){
	
	//陨石不只一块，为了能引用到每一个陨石，我们将使用数组来存放对陨石的引用
	var rocks = [];
	
	//陨石的数量
	var ROCK_NUM = 5;
	
	//使用循环语句，根据ROCK_NUM数量生成陨石
	for (var i=0;i<ROCK_NUM;i++){
		var rock = new createjs.Bitmap(queue.getResult("rock"));
		//添加到舞台
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
		TweenMax.to(rock,flyTime,{x:-100,delay:i});

		//把对rock的引用存储到rocks数组里
		rocks.push(rock);
	}
	
	return {
		update:function(){
			for (var i=0;i<rocks.length;i++){
				//让陨石循环移动
				//如果陨石的位置已经到达了舞台最左侧，就重置其位置、速度和尺寸
				if(rocks[i].x<=-100){
					//先移除之前的Tween动画
					TweenMax.killTweensOf(rocks[i])
					rocks[i].x=stage.canvas.width+100;
					rocks[i].y=stage.canvas.height*(0.9-Math.random()*0.6);
					rocks[i].scaleX=rocks[i].scaleY=(Math.random()+1)/3;
					var flyTime = Math.random()*5+3;
					TweenMax.to(rocks[i],flyTime,{x:-100});
				}
			}
		}
	}
}