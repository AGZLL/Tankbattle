//子弹
function Zidan( t ){
    var fx = "D";
    var x = t.x + 18, y = t.y + 40;
    var w = 16 , h = 28;
    if ( t.src.indexOf("U") !== -1 ){
        fx = "U";	x =t.x + 16; y= t.y - 22;
    } else if ( t.src.indexOf("L") !== -1 ){
        fx = "L";	w = 25 ; h = 16;	x = t.x - 15; y = t.y + 18;
    } else if ( t.src.indexOf("R") !== -1 ){
        fx = "R";	w = 25 ; h = 16;	x = t.x + 40; y = t.y + 17;
    }
//	console.log(t.src);
    var o 	= new Base(x, y, w, h, ZD, "img/"+ t.gong + fx + ".png", kill[t.gong], 0, 13); //子弹
    o.left 	= fx ==="L";
    o.right = fx ==="R";
    o.up 	= fx ==="U";
    o.down 	= fx ==="D";
    o.tank  = t;

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
            o.die();	clearInterval(o.movetimer);
            return;
        }
        if ( checkmove(o) ){
            o.x = ox;	o.y = oy;		//发生碰撞，回到旧坐标
            o.die();	clearInterval(o.movetimer);
            return;
        }
    };
    o.movetimer = setInterval(function(){o.move();} , 20);
    return o;
}

//攻击
function fire(t){
    var m = new Zidan(t);
    st.add(m);
}

//选择移动
function checkmove(o){
    var list = st.list;
    for (var i = 0;i < list.length;i++){
        if ( o.index === list[i].index )				continue;
        if ( o.type === WJ && list[i].type === DL )		continue;
        if ( o.type === WJ && list[i].type === DR )		continue;
        if ( o.type === DR && list[i].type === WJ )		continue;
        if ( o.type === ZD && list[i].type === ZB )		continue;
        if ( o.type === DR && list[i].type === DR )		continue;
        if ( o.type === ZD && o.tank.type  === list[i].type ) continue;
        if ( o.type === ZD && list[i].type === DL)		continue;
        if ( list[i].type === ZD )						continue;
        if ( list[i].type === TP )						continue;
        if (hit( o , list[i] ) ){			//表示与墙或基地发生了碰撞
            if (o.type === ZD ){
                shanghai (o, list[i] );
            } else {
                chi (o, list[i]);
            }
            return true;
        }
    }
    return false;
}

//碰撞
function hit(o1,o2){
    if ( o1.x < o2.x )
    {
        if ( o2.x - o1.x <= o1.w ){
            if ( o1.y < o2.y ){
                return o2.y - o1.y <= o1.w;
            } else if ( o1.y > o2.y ){
                return o1.y - o2.y <= o2.w;
            } else
                return o1.y === o2.y;
        }
    } else if ( o1.x > o2.x )
    {
        if ( o1.x - o2.x <= o2.w ){
            if ( o1.y < o2.y ){
                return o2.y - o1.y <= o1.w;
            } else if ( o1.y > o2.y ){
                return o1.y - o2.y <= o2.w;
            } else
                return o1.y === o2.y;
        }
    } else {
        if ( o1.y < o2.y ){
            return o2.y - o1.y <= o1.w;
        } else if ( o1.y > o2.y ){
            return o1.y - o2.y <= o2.w;
        } else
            return o1.y === o2.y;
    }
    return false;
}
