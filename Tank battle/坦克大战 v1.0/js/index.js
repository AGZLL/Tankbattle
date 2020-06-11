var oCanvas = document.createElement("canvas");	//定义画布
var oCtx = oCanvas.getContext("2d");	//从canvas标签中获取绘图工具
oCanvas.width = 1200;		//定义画布宽度
oCanvas.height = 650;		//定义画布高度

var wallcount = 20;		//墙的数量
var wallsize = 30;		//墙的尺寸
var enemycount = 14;		//敌军数量
var tanksize = 50;		//坦克或飞机的尺寸
var bdtime = 5;		//冰冻时间长度                变量     可能会改变
var jdtimer	= null;		//解冻定时器
var jianmie	= 0;		//歼灭敌人计数
var fuhuo = 3;		//复活机会次数
var zhuangtai = "未开始";	//游戏状态
var number = 0;		//编号计数器
var overy = oCanvas.height;		//结束语高度
var djs = 9;		//倒计时
var fhtimer	= null;		//复活定时器

var DR = "敌人";
var WJ = "我军";
var JD = "基地";			//常量    不改变
var ZD = "子弹";
var ZB = "装备";
var TP = "图片";
var DL = "地雷";
var Q  = "墙";
var TQ  = "铁墙";

var qs = [];
var kill = [12,16,21,27,35];		//子弹伤害
var fy = [1,3,5,7,9];			//防御值
var zt = ["未开始","激战中","冰冻","被冰冻","待复活","失败","胜利"];		//状态

var st 	 = new Stage();

var logo = new Base(490, 350, 200, 130, TP, "img/logo.gif", 0, 0, 0 );
var jd	 = new Base( 570, 580, 59, 70, JD, "img/jd.png", 0, 3, 0 );
var me 	 = new Tank(420, 520,"img/tU.png");

var bomb2 = new Audio();
bomb2.src = "sounds/bomb2.wav";

onload = function () {
	document.getElementById("mydiv").appendChild(oCanvas);
	begin();		//调用begin函数
};

function begin() {
	
	var list = st.list;
	
	st.add(jd);
	
	st.add(logo);
	
	st.add(me);
	
	huaqiang();
	
	huadiren();
	
	huahome();

	function hua(){
		oCtx.fillStyle = "rgba(123,121,127,0.76)";		//指定画笔的颜色
		oCtx.fillRect(0,0,oCanvas.width,oCanvas.height);
		oCtx.fillRect(0,0,oCanvas.width,oCanvas.height);
		huaxinxi();
		huazuozhe();
		huashengli();
		huashijian();
		huaover();
		huadjs();
		huashuoming();

		list.forEach(function(o){  o.show(); });

		requestAnimationFrame(hua);		//间隔一段时间去执行一下hua函数
	}

	hua();		//调用“hua”这个函数
}

function Stage() {
	this.list = [];	
}
Stage.prototype.add = function(o){
	this.list.push(o);		//把o放入list
};
Stage.prototype.del = function(o){
	var i = this.list.indexOf(o);		//查找
	if(i !== -1){
		this.list.splice(i,1);			//删除
	}
};

// 	物体构造函数
function Base(x,y,w,h,type,src,gong,fang,speed) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.type   = type;
	this.src  	= src;
	this.gong 	= gong;
	this.fang 	= fang;
	this.speed  = speed;	
	this.index  = number ++;	//每个物体在构造时分配一个唯一的编号
	this.hp 	= 100;
	
	//显示自己的行为
	this.show = function(){
		if(this.hp <= 0) return;  
		var img = new Image();	//在内存中创建一个图片对象
		img.src = this.src;
		oCtx.drawImage(img, this.x, this.y, this.w,this.h);
		this.blood();
	};
	
	this.blood = function(){
		if (this.type === TP || this.type === ZD || this.type === ZB || this.type === DL || this.type === TQ) return;
		var w = this.hp / 100.0 * this.w;		//注意：语法中必须有小数，整数除整数，只得到整数，所以需要用100.0    血量条长度随血量改变显示
		oCtx.fillStyle = "springgreen";								//默认生命值100      显示绿色
		if( this.hp < 45)			oCtx.fillStyle = "red";			//生命值为45以下     显示红色
		else if (this.hp < 65)		oCtx.fillStyle = "orangered";	//生命值为65以下     显示深橙色
		else if (this.hp < 85)		oCtx.fillStyle = "orange";		//生命值为85以下     显示橙色
		oCtx.fillRect(this.x,this.y - 5, w, 5);				//y-5：血条自身有5个高度，需要向上走5个高度
	};
	
	this.die = function(){
		this.hp = 0;
		st.del(this);
		if ( this.type === WJ || this.type === DR ){
			boom(this);
			clearInterval(this.movetimer);
		}
		if (this.type === WJ && fuhuo >0){
			zhuangtai = zt[4];
			daojishi();
		} else if (this.type === WJ && fuhuo === 0){
			zhuangtai = zt[5];
		 }
		if ( this.type === DR ) {
		clearInterval(this.changtimer);
		jianmie++; 
			if ( jianmie === enemycount ){
				zhuangtai = zt[6];
				var s = new Audio();
				s.src = "sounds/hitcmd.wav";
				s.play();
			}
		}
	 
		if ( this.type === JD ){
			fuhuo = 0;
			me.die();
			var overtimer = setInterval( function(){
				overy -= 5 ;
				if (overy <= 350 ){
					clearInterval(overtimer);
				}
			}, 30 );		
		}
	}
}

//     设计一个飞机构造函数(敌人)
function FJ(x, y, src) {
	var o 		= new Base(x, y, tanksize, tanksize, DR, src, 0, 0, 3);
	o.left  	= false;
	o.right 	= false;
	o.up 		= false;
	o.down 		= false;
	
	o.move = function() {
		if (zhuangtai !== zt[1] && zhuangtai !== zt[3] && zhuangtai !== zt[4] && zhuangtai !==zt[5] ) return;
		var ox = o.x,	oy = o.y;
		if (o.left){ 		  o.src = "img/FL.png";
			o.x -= o.speed;
		}else if (o.right) {  o.src = "img/FR.png";
			o.x += o.speed;
		}else if (o.up) {	  o.src = "img/FU.png";
			o.y -= o.speed;
		}else if (o.down) {	  o.src = "img/FD.png";
			o.y += o.speed;
		}
		if (o.x < 0 || o.y <0 || o.x > oCanvas.width - o.w || o.y > oCanvas.height - o.h) {
			o.x = ox;	o.y = oy;		//超出屏幕，回到旧坐标
		}
		if ( checkmove(o) ){
			o.x = ox;	o.y = oy;		//发生碰撞，回到旧坐标
		}
	};
	o.movetimer  = setInterval(function(){o.move();},20);
	o.changtimer = setInterval( function(){
		if (zhuangtai !== zt[1] && zhuangtai !== zt[3] && zhuangtai !== zt[4] && zhuangtai !== zt[5] ) return;
		var n = parseInt(Math.random()*100);
		if ( n % 29 === 0) {
			var i = parseInt(Math.random()*4);
			o.left 	= i === 0;
			o.right = i === 1;
			o.up 	= i === 2;
			o.down 	= i === 3;
		}
		if ( n % 19 === 0 ) {
			fire(o);
		}
	}, 30);
	return o;
}

//     设计一个坦克构造函数(我军)
function Tank(x, y, src) {
	var o 	= new Base(x, y, tanksize, tanksize, WJ, src, 0, 0, 3);
	o.left 	= false;
	o.right = false;
	o.up 	= false;
	o.down 	= false;
	o.dilei = 2;
	
	o.move = function() {
		var ox = o.x,	oy = o.y;
		if (o.left){
			o.x -= o.speed;
		}else if (o.right) {
			o.x += o.speed;
		}else if (o.up) {
			o.y -= o.speed;
		}else if (o.down) {
			o.y += o.speed;
		}
		if (o.x < 0 || o.y <0 || o.x > oCanvas.width - o.w || o.y > oCanvas.height - o.h) {
			o.x = ox;	o.y = oy;		//超出屏幕，回到旧坐标
		}
		if ( checkmove(o) ){
			o.x = ox;	o.y = oy;		//发生碰撞，回到旧坐标
		}
	};
	o.movetimer = setInterval(function(){o.move();} , 20);
	return o;
}

//-----------按键事件处理---------
onkeydown = function(event){
	var c = event.keyCode;
	if ( c === 89 && zhuangtai === zt[0]){   	//按下Y建开始游戏
		zhuangtai  = zt[1];
		var kaishi = new Audio();
		kaishi.src = "sounds/kaishi.mp3";
		kaishi.play();
		logo.die();

		var oh3 = document.querySelector('h3');	//开始游戏去除h3
		oh3.parentNode.removeChild(oh3);
	} else if ( c === 77 && zhuangtai === zt[1]){		//按下M键开启背景音乐
		var obgm = document.querySelector('#bgm');
		if (obgm.paused){
			obgm.play();
		}
		else{
			obgm.pause();
		}
	}
	if (zhuangtai === zt[0] || zhuangtai === zt[3] || zhuangtai === zt[4] || zhuangtai === zt[5] ) return;
	if (c === 37 || c === 65 ){
		me.left = true;		me.right = false; me.down = false; me.up = false;	//左移
		me.src  = "img/tL.png";
	} else if (c === 38 || c === 87 ){
		me.left = false;	me.right = false; me.down = false; me.up = true;	//上移
		me.src  = "img/tU.png";
	} else if (c === 39 || c === 68 ){
		me.left = false;	me.right = true; me.down  = false; me.up = false;	//右移
		me.src  = "img/tR.png";
	} else if (c === 40 || c === 83 ){
		me.left = false;	me.right = false; me.down = true; me.up  = false;	//下移
		me.src  = "img/tD.png";
	}	
};

//-----------松开键触发事件---------
onkeyup = function (e){
	var c  = e.keyCode;
	if ( c === 37 || c === 65 )			me.left  = false;
	else if ( c === 38 || c === 87 )		me.up 	 = false;
	else if ( c === 39 || c === 68 )		me.right = false;
	else if ( c === 40 || c === 83 )		me.down  = false;
	if ( c === 82 && zhuangtai === zt[4]){
		huoguolai();
	}
	if ( zhuangtai !== zt[1] && zhuangtai !== zt[2] ) return;
	if ( c === 75 ){
		fire(me);		//开火
	}
	if ( c === 32 ){
		mailei();
	}
};


