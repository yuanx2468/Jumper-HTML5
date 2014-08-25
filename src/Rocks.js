//以下代码定义了全体石块障碍物的属性和行为
function Rocks(asset,stage){
	var rock = new createjs.Container();
	rock.addChild(new createjs.Bitmap(asset));
	rock.regX=50;
	rock.regY=50;
	//随机速度	
	var speed = 2+Math.random()*2;
	
	//随机缩放
	var rockScale = (Math.random()+1)/3;
	rock.scaleX=rock.scaleY=rockScale;	
	
	//随机位置
	rock.x=stage.canvas.width+40;
	rock.y=stage.canvas.height*(0.9-Math.random()*0.6);	
	rock.removable=false;	
	stage.addChild(rock);
	
	//碰撞检测用
	rock.getHotspot=function(){
		return {x:rock.x,y:rock.y,r:rockScale*50}
	};
	
	
	rock.update=function(){
		rock.x-=speed;
		rock.rotation+=2/rockScale;
		if(rock.x<=-rockScale*100){
			rock.removable=true;
		}
	}
	return rock;
}