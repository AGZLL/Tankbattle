//敌人
function huadiren(){
    var x = (oCanvas.width-enemycount*(tanksize+7)) / 2,y = 80;			//利用表达式   使内容居中
    for (var i = 0;i<enemycount;i++){
        var f = new FJ(x,y,"img/FD.png");
        st.add(f);  x += tanksize + 7;		//每次循环显示一个敌人的尺寸
    }
}

//墙体
function huaqiang(){
    var x = (oCanvas.width-wallcount*wallsize) / 2,y = 140;			//利用表达式   使内容居中    中间墙
    for (var i = 0; i < wallcount; i++){		//上墙
        if(i === 3 || i === 4 || i ===10 || i === 15 || i === 16){
            var w = new Base(x,y,wallsize,wallsize,TQ,"img/tqiang.gif",0,35,0);
            st.add(w);
            x += wallsize;
        }else{
            var w = new Base(x,y,wallsize,wallsize,Q,"img/qiang.gif",0,1,0);
            st.add(w);  x += wallsize;		//每次循环显示一个墙的尺寸
        }
    }

    var x1 = 0,y1 = 240;
    for (var i1 = 0; i1 < 10; i1++){				//左上墙
        if(i1 === 4 || i1 === 5){
            var w1 = new Base(x1,y1,wallsize,wallsize,TQ,"img/tqiang.gif",0,35,0);
            st.add(w1);  x1 += wallsize;
        }else{
            var w1 = new Base(x1,y1,wallsize,wallsize,Q,"img/qiang.gif",0,1,0);
            st.add(w1);  x1 += wallsize;		//每次循环显示一个墙的尺寸
        }
    }

    var x2 = 900,y2 = 240;
    for (var i2 = 0; i2 < 10; i2++){				//右上墙
        if(i2 === 4 || i2 === 5){
            var w2 = new Base(x2,y2,wallsize,wallsize,TQ,"img/tqiang.gif",0,35,0);
            st.add(w2);  x2 += wallsize;
        }else{
            var w2 = new Base(x2,y2,wallsize,wallsize,Q,"img/qiang.gif",0,1,0);
            st.add(w2);  x2 += wallsize;		//每次循环显示一个墙的尺寸
        }
    }

    var x3 = 270,y3 = 300;
    for (var i3 = 0; i3 < 10; i3++){	//左下墙
        if(i3 === 4 || i3 ===5){
            st.add(w3);  y3 += wallsize+5;
        }else{
            var w3 = new Base(x3,y3,wallsize,wallsize,Q,"img/qiang.gif",0,1,0);
            st.add(w3);  y3 += wallsize+5;		//每次循环显示一个墙的尺寸
        }
    }
    var x4 = 900,y4 = 300;
    for (var i4 = 0; i4 < 10; i4++){				//右下墙
        if(i4 === 4 || i4 ===5){
            st.add(w4);  y4 += wallsize+5;		//每次循环显示一个墙的尺寸
        }else{
            var w4 = new Base(x4,y4,wallsize,wallsize,Q,"img/qiang.gif",0,1,0);
            st.add(w4);  y4 += wallsize+5;		//每次循环显示一个墙的尺寸
        }
    }
}

//基地
function huahome(){				/***1-4***/
var x = jd.x - wallsize ,y = jd.y - 5 - wallsize;

    var w = new Base(x,y,wallsize,wallsize,Q,"img/qiang.gif",0,2,0);
    st.add(w);	x += wallsize;	qs.push(w);

    w = new Base(x,y,wallsize,wallsize,Q,"img/qiang.gif",0,2,0);
    st.add(w);	x += wallsize;	qs.push(w);

    w = new Base(x,y,wallsize,wallsize,Q,"img/qiang.gif",0,2,0);
    st.add(w);	x += wallsize;	qs.push(w);

    w = new Base(x,y,wallsize,wallsize,Q,"img/qiang.gif",0,2,0);
    st.add(w);	x += wallsize;	qs.push(w);


    x = jd.x - wallsize;	y += wallsize;			/****5-6****/
    w = new Base(x,y,wallsize,wallsize+5,Q,"img/qiang.gif",0,2,0);
    st.add(w);	x += wallsize * 3;	qs.push(w);

    w = new Base(x,y,wallsize,wallsize+5,Q,"img/qiang.gif",0,2,0);
    st.add(w);	x += wallsize * 3;	qs.push(w);

    x = jd.x - wallsize;	y += wallsize + 10;		/****7-8****/
    w = new Base(x,y,wallsize,wallsize+5,Q,"img/qiang.gif",0,2,0);
    st.add(w);	x += wallsize * 3;	qs.push(w);

    w = new Base(x,y,wallsize,wallsize+5,Q,"img/qiang.gif",0,2,0);
    st.add(w);	x += wallsize * 3;	qs.push(w);

}

//游戏说明显示
function huashuoming(){
    if (zhuangtai !== zt[0]) return;
    var x = 20,y = 330;
    oCtx.fillStyle  = "#fff536";
    oCtx.font	    = "18px 楷体";
    oCtx.fillText("欢迎大家来到坦克大战~",	x,y); y+=20;
    oCtx.fillText("第一次设计，请多指教~",	x,y); y+=20;
    oCtx.fillText("按'R'键复活~",		 	x,y); y+=20;
    oCtx.fillText("按'M'键开启背景音乐~",	x,y); y+=20;
    oCtx.fillText("按'K'键攻击~",		x,y); y+=20;
    oCtx.fillText("按'WASD'键控制方向~",		x,y); y+=20;
    oCtx.fillText("按 空格键 控制埋雷~",		x,y);

}

//上方显示信息
function huaxinxi(){
    var x = 50,y = 20;
    oCtx.fillStyle = "#fff";
    oCtx.font = "12px 宋体";
    oCtx.fillText("敌军数量："+ enemycount,		x,y); x+=120;
    oCtx.fillText("歼灭数量："+ jianmie,		 	x,y); x+=120;
    oCtx.fillText("我的HP："+ me.hp,		 		x,y); x+=120;
    oCtx.fillText("复活次数："+ fuhuo,		 		x,y); x+=120;
    oCtx.fillText("攻击："+ me.gong,			 	x,y); x+=100;
    oCtx.fillText("防御："+ me.fang,		 	 	x,y); x+=100;
    oCtx.fillText("移动速度："+ me.speed,		 	x,y); x+=120;
    oCtx.fillText("可用地雷："+ me.dilei,		 	x,y); x+=120;
    oCtx.fillText("游戏状态："+ zhuangtai,		 	x,y); x+=120;
    oCtx.fillText("坐标："+ me.x + "," + me.y,	x,y);

}

//显示作者信息
function huazuozhe(){
    var x = 20,y = 590;
    oCtx.fillStyle = "cyan";
    oCtx.font = "13px 楷体";
    oCtx.fillText("作者：钟亮亮",		 		x,y);y+=20;
    oCtx.fillText("Q Q ：1037559647",		x,y);
}

//显示道具
function huadaoju(o){
    var n = parseInt(Math.random() * 10);	//随即产生一个0-9的数字
    var p = new Base(o.x, o.y, 38, 38, ZB, "img/x" + n + ".gif", 0, 0, 0);
    p.n = n;
    st.add(p);
}

//游戏胜利
function huashengli(){
    if (zhuangtai !== zt[6]) return;
    var x =(oCanvas.width - 55*8) / 2 ,y = 300;
    oCtx.fillStyle = "blue";
    oCtx.font = "70px 楷体";
    oCtx.fillText("恭喜获得胜利！",x,y);
    oCtx.fillStyle = "yellow";
    oCtx.font = "25px 楷体";
    oCtx.fillText( "按F5重新游戏",  x + 145,y + 150 );
    var obgm = document.querySelector('#bgm');
    if (obgm.played){
        obgm.pause();
    }
}

//游戏结束
function huaover(){
    if (zhuangtai !== zt[5] ) return;
    var x =(oCanvas.width - 450) / 2 ;
    oCtx.fillStyle = "red";
    oCtx.font = "100px consolas";
    oCtx.fillText( "Game over",  x,overy );
    oCtx.fillStyle = "yellow";
    oCtx.font = "25px consolas";
    oCtx.fillText( "按F5重新游戏",  x + 160,overy + 40 );
    var obgm = document.querySelector('#bgm');
    if (obgm.played){
        obgm.pause();
    }
}
