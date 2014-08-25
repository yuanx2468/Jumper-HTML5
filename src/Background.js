//以下代码定义了背景的属性和行为
function Background (queue,stage){
	var bgA=new createjs.Shape();
	bgA.graphics.beginFill("#272c4d").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
	stage.addChild(bgA);
	
	var bgB=new createjs.Container();
	bgB.addChild(new createjs.Bitmap(queue.getResult("bgB_asset")));
	bgB.x=0;	
	bgB.y=stage.canvas.height-140;
	bgB.alpha=0.4;
	stage.addChild(bgB);
	
	var bgC=new createjs.Container();	
	bgC.addChild(new createjs.Bitmap(queue.getResult("bgC_asset")));
	bgC.x=0;
	bgC.y=stage.canvas.height-110;
	stage.addChild(bgC);
	
	return {		
		update:function(){
			//bgB的循环
			bgB.x-=1;
			if(bgB.x<=-stage.canvas.width){
				bgB.x=0
			}
			//bgC的循环
			bgC.x-=2;
			if(bgC.x<=-stage.canvas.width){
				bgC.x=0
			}
		}
	}
}