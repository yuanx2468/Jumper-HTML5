//-----注释
/*	
	双斜杠用于注释单行代码。
	如果需要注释的代码有许多行,
	最好使用斜杠和星号添加首尾注释，
	注意，首尾注释的样式是对称的。
	程序运行的时候，代码中被注释的部分不会被执行。
*/

//-----调试
/*
	//控制台日志
	//console.log() 是很常用的调试工具
	//可以让特定内容显示在浏览器的控制台，比如
	console.log("你好！");
*/

//-----数据类型
/*
	//程序运行的过程就是一种数据运算的过程
	//但数据有不同的类型，其运算处理的方式有差异
	//JavaScript中，经常用到的数据类型包括Number,String,Boolean等等

	//---Number,数值型数据，例如 1，20，40
	//数值型数据可以进行数学计算
	//例如1+1，40/2，20*8
	console.log(20*8/3);

	//---String,字符串型数据
	//例如 "你好"，"Hello", "1"
	//字符串型数据不能进行数学计算
	//但可以进行字符处理，例如
	console.log("你"+"好");

	//---Boolean,布尔型数据
	//布尔型数据只有两种值
	//true 代表 真
	//false 代表 假
	//布尔型数据是布尔计算的结果，经常用于代码中的逻辑判断
	console.log(1<2);
*/

//-----变量
/*
	//在数据处理过程中
	//变量是用来存放数据的容器
	//如果把数据处理比喻成烹饪
	//那么数据就是食物
	//而变量就是装食物的盘子
	//例如，下面的代码声明了若干变量，同时给变量赋了不同的值
	var a=100;
	var b=2;
	var c="Hello";
	var d=true;
	
	//当然，也可以分两个步骤来声明和赋值
	var e;
	e=99;
	
	//还记得console.log()么？可以用它来查看变量这个盒子里装了什么值
	console.log(e);
	
	//变量这个盒子里可以装各种各样的数据，除了数值、字符串等类型的数据外，还可以是函数、图片、视频等等
	//我们会在今后用到这些类型时介绍具体的用法。
*/

//-----数组
/*
	//数组的作用跟变量很相似，也是存放数据的一种容器。
	//不同的是，一个数组中可以存放多个数据，并且使用数字编号索引这些数据
	//声明一个空的数组
	var skills = [];
	//现在开始往数组里加东西
	skills.push("小型枪械");
	skills.push("开锁");
	skills.push("修理");
	skills.push("急救");
	skills.push("采药");
	//然后我们可以通过编号索引这些数据
	console.log(skills[0]);//"小型枪械"
	console.log(skills[3]);//"急救"
	//注意，索引是从0开始的
	//通过skills.length可以获知当前数组里有多少个数据
	console.log(skills.length);//5
	
	//数组除了push指令来添加数据外，还有许多其他的操作，比如删除、合并、排序等等。
	//我们会在今后用到这些指令的地方介绍其用法。
*/

//-----条件与判断
/*
	//在编写脚本时，经常需要根据布尔运算的结果执行不同的代码，比如
	var health = 100;
	var damage = 100;
	if(health-damage<=0){
		console.log("英雄挂了！")
	}else if (health-damage<=20) {
		console.log("英雄：咔，好痛！")
	}else if (health-damage<=80){
		console.log("英雄：还有两下子！")
	}else {
		console.log("英雄：你在挠痒痒么！")
	}
*/

//-----函数
/*
	//函数是一组定义了特定功能的程序代码块，以下定义了一个函数 sayHello
	function sayHello(){
		console.log("Hello World!");
	}
	//函数定义后可被重复调用，以下代码连续调用了两次sayHello
	sayHello();
	sayHello();

	//函数可能包含零个或多个参数，
	function sayHiTo(who){
		console.log("Hi "+who+"!");
	}

	//函数可能返回一个值
	function getCircleArea(r){
		var area= Math.PI*r*r;
		return area;
	}
	console.log(getCircleArea(12));
	//注意，上面代码中的area是函数getCircleArea的一个内部变量，其作用域只在函数getCircleArea内部有效。对于函数定义之外的代码来说，函数的内部就像一个黑盒子，无法直接访问和调用。
*/