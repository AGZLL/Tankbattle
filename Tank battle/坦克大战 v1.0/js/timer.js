//显示倒计时
function huadjs(){
    if (zhuangtai !== zt[4] ) return;
    var x =(oCanvas.width - 170) / 2 ,y = 450;
    oCtx.fillStyle = "green";
    oCtx.font = "300px consolas";
    oCtx.fillText( djs,  x,y );
}

//显示被冻时间
function huashijian(){
    if (zhuangtai !== zt[2] && zhuangtai !== zt[3] ) return;
    var x =(oCanvas.width - 50) / 2 ,y = 500;
    oCtx.fillStyle = "mediumslateblue";
    oCtx.font = "90px 黑体";
    oCtx.fillText( bdtime,  x,y );
}

//倒计时
function daojishi(){
    fhtimer = setInterval( function(){
        djs --;
        if ( djs <0 ){
            fuhuo = 0;
            clearInterval(fhtimer);
            zhuangtai = zt [5];
            jd.die();
        }
    }, 1200 );
}
