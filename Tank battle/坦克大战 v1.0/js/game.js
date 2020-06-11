//玩家吃道具
function wochi ( o ,k ){
    if ( k.n === 0 ){
        tisu(o);
    } else if ( k.n === 1 ){
        fuhuo ++;	fuhuo = fuhuo > 5 ? 5 : fuhuo;
    } else if ( k.n === 2 ){
        if ( zhuangtai !== zt[2] && zhuangtai !== zt[6] ){
            zhuangtai = zt[2];
            jdtimer = setInterval( function(){
                bdtime --;
                if (bdtime < 0 ){
                    bdtime = 5; clearInterval(jdtimer);
                    if (zhuangtai !== zt[4] && zhuangtai !== zt[5] &&zhuangtai !== zt[6]){
                        zhuangtai = zt[1];
                    }
                }
            }, 1000);
        }
    } else if ( k.n === 3 ){
        shenggong(o);
    } else if ( k.n === 4 ){
        shengfang(o);
    } else if ( k.n === 5 ){
        homejiaxue(30);
    } else if ( k.n === 6 ){
        jiaxue(o);
    } else if ( k.n === 7 ){
        shixue(o);
    } else if ( k.n === 8 ){
        jd.hp += 30;	jd.hp = jd.hp >100 ? 100 :jd.hp;
    } else if ( k.n === 9 ){
        me.dilei += 2;	me.dilei = me.dilei >10 ? 10 : me.dilei;
    }
}

//敌人吃道具
function direnchi( o , k ){
    if ( k.n === 0 ){
        tisu(o);
    } else if ( k.n === 1 ){
        build(3);
    } else if ( k.n === 2 ){
        if ( zhuangtai !== zt[3] && zhuangtai !== zt[5] && zhuangtai !== zt[4] ){
            zhuangtai = zt[3];
            jdtimer = setInterval( function(){
                bdtime --;
                if (bdtime < 0 ){
                    bdtime = 5; clearInterval(jdtimer);
                    if (zhuangtai !== zt[4] && zhuangtai !== zt[5] &&zhuangtai !== zt[6]){
                        zhuangtai = zt[1];
                    }
                }
            }, 1000);
        }
    } else if ( k.n === 3 ){
        shenggong(o);
    } else if ( k.n === 4 ){
        shengfang(o);
    } else if ( k.n === 5 ){
        homejiaxue(-30);
    } else if ( k.n === 6 ){
        jiaxue(o);
    } else if ( k.n === 7 ){
        shixue(o);
    } else if ( k.n === 8 ){
        build(2);
    } else if ( k.n === 9 ){
        build(2);
    } else if ( k.n === 10){
        shixue(o);    //踩地雷
        var s = new Audio(); 	s.src = "sounds/bomb2.wav"; s.play();
    }
}

//吃道具效果
function chi ( o, k ){
    if ( o.hp <= 0 ) return;
    if ( k.type !== ZB && k.type !== DL ) return;
    k.die();
    var s = new Audio();		//音频对象
    if ( o.type === WJ ){
        wochi( o,k );
        if ( k.n ===0 || k.n ===3 || k.n === 4 || k.n === 5 || k.n === 6 || k.n === 8 || k.n === 9){
            s.src = "sounds/prop.wav";
        } else if ( k.n === 1 || k.n === 2)	s.src = "sounds/daxiao.wav";
        else if ( k.n ===7 ) 	s.src = "sounds/zeg.wav";
    } else {
        direnchi ( o, k );
    }
    s.play();
}

//基地加血
function homejiaxue (n){
    for ( var i = 0; i < qs.length; i++ ){
        if ( n>0 ){
            if ( qs[i].hp <= 0 ) st.add(qs[i]);
        } else {
            if ( qs[i].hp <= 0 ) continue;
        }
        qs[i].hp += n;
        qs[i].hp = qs[i].hp > 100 ? 100 : qs[i].hp;
        if ( qs[i].hp <= 0 ) qs[i].die();
    }
}

//致残
function shixue (o){
    o.hp -= 93;
    if (o.hp <= 0 ){
        o.die();
    }
}

//加血
function jiaxue (o){
    o.hp += 30;	o.hp = o.hp > 100 ? 100 : o.hp;
}

//升防御力
function shengfang (o){
    o.fang ++;	o.fang = o.fang >4 ? 4 :o.fang;
}

//升攻击力
function shenggong (o){
    o.gong ++;	o.gong = o.gong > 4 ? 4 :o.gong;
}

//提速
function tisu (o){
    o.speed += 1;	o.speed = o.speed >7 ? 7 : o.speed;
}

//增加敌人
function build(n){
    if ( enemycount > 25 ) return; //敌人上限25
    for (var i  =0 ; i < n; i ++ ){
        var x   = parseInt(Math.random() * (oCanvas.width - 200)) + 100;
        var y   = parseInt(Math.random() * (oCanvas.height - 200)) + 100;
        var o   = new FJ(x, y, "img/FD.png");
        while ( checkmove(o)){
            o.x = parseInt(Math.random()  * (oCanvas.width - 200)) + 100;
            o.y	=  parseInt(Math.random() * (oCanvas.height - 200)) + 100;
        }
        st.add( o );
        enemycount ++;
    }
}

//伤害计算
function shanghai(o,k){
    k.hp -= o.gong;				//减攻
    k.hp += fy[k.fang];			//加放
    if ( k.hp <= 0 ){
        k.die();
        if (k.type === DR ) {
            bomb2.play();
        }
    } else if ( k.type === JD){
        var s = new Audio();
        s.src = "sounds/hitcmd.wav";	s.play();
    }
}

//埋雷
function mailei(){
    if ( me.dilei <1 ) return;
    me.dilei--;
    var o = new Base(me.x, me.y, 40, 40, DL, "img/x10.gif", 0, 0 ,0);
    o.n = 10;
    st.add(o);
    var s = new Audio(); s.src = "sounds/bready.wav";
    s.play();
}

//复活
function huoguolai(){
    me.hp = 100;	me.speed = 3;	me.gong = 0;	me.fang = 0;	me.dilei = 2;
    fuhuo --;
    zhuangtai = zt[1];
    me.movetimer  = setInterval(function(){
        me.move();
    } , 20);
    clearInterval(fhtimer);
    djs = 9;
    st.add(me);
}

//爆炸效果
function boom(t) {				//当前被炸毁的对象
    var i  = 1;
    var o  = new Base( t.x, t.y, 10, 10,TP, "img/1.gif", 0, 0, 0);
    st.add(o);
    var tm = setInterval(function(){	//爆炸动画
        i++;
        if ( i === 6 ){
            o.die();
            clearInterval(tm);
            huadaoju(o);
            return;
        }
        o.w += 7 ;o.h += 7; o.src = "img/" + i + ".gif";
    }, 50);
}
