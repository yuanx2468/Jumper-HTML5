//以下代码定义了背景的属性和行为
function Background (queue,stage){
	//背景包括3层，由远到近分别是深蓝色天空、高山、矮山
	var blueSky;
	var lowMountain;
	var highMountain;
	
	//天空的尺寸与舞台的尺寸一致
	blueSky = new createjs.Shape();
	var skyWidth=stage.canvas.width;
	var skyHeight=stage.canvas.height;
	blueSky.graphics.beginFill("#272c4d").drawRect(0,0,skyWidth,skyHeight);
	stage.addChild(blueSky);
	
	//从queue获取highMountain的图像资源
	highMountain = new createjs.Bitmap(queue.getResult("highMountain"));
	//底部对齐，140是highMountain.png的高度
	highMountain.y=stage.canvas.height-140;
	stage.addChild(highMountain);	
	
	//从queue获取lowMountain的图像资源
	lowMountain = new createjs.Bitmap(queue.getResult("lowMountain"));
	//底部对齐，110是lowMountain.png的高度
	lowMountain.y=stage.canvas.height-110;
	stage.addChild(lowMountain);
	
	//对于舞台来说，Background就是一个负责计算各类背景元素的经理
	//舞台不需要关心背景具体的运行机制，舞台只需要向Background发号施令即可
	//具体来说，舞台只需要在每帧开始渲染前，通知背景更新显示即可，所以这个号施令也只有一个，那就是“更新”
	//下面的return命令返回了一个update函数，这个函数其实就是Background提供给舞台的更新口令
	//因为update是每帧调用一次，所以update函数中移动的位置是每帧背景需要移动的距离
	return {		
		update:function(){
			//highMountain的循环
			highMountain.x-=0.5;
			if(highMountain.x<=-stage.canvas.width){
				highMountain.x=0
			}
			//lowMountain的循环
			lowMountain.x-=1;
			if(lowMountain.x<=-stage.canvas.width){
				lowMountain.x=0
			}
		}
	}
}