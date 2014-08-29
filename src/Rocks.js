/*
Rocks.js负责控制和管理游戏中的各种陨石。
*/
function Rocks(queue,stage){
	
	//陨石不只一块，为了能引用到每一个陨石，我们将使用数组来存放对陨石的引用
	var rocks = [];
	//陨石的数量
	var ROCK_NUM = 4;
	
	function generateRocks(){
		//使用循环语句，根据数量生成陨石
		for (var i=0;i<ROCK_NUM;i++){
			var rock = new createjs.Bitmap(queue.getResult("hero"));
			//随机位置
			rock.x=stage.canvas.width+40;
			rock.y=stage.canvas.height*(0.9-Math.random()*0.6);
			rock.regX=50;
			rock.regY=50;
			rock.scaleX=rock.scaleY=(Math.random()+1)/3;
			
			stage.addChild(rock);
			rocks.push(rock);			
		}	
	}
	
	return {
		update:function(){
		/*rock.x-=speed;
		rock.rotation+=2/rockScale;
		if(rock.x<=-rockScale*100){
			rock.removable=true;
		}*/
	};
}