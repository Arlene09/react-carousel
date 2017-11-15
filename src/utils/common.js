
function getAngle(dx, dy) {
    return Math.atan2(dy, dx) * 180 / Math.PI;
}

//获取手势方向
export const getTouchDirection = (startX, startY, endX, endY) => {
    var dy = startY - endY;
    var dx = startX - endX;
    var result = 0;	//没滑动
    //如果滑动距离太短
    if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return result;
    }

    var angle = getAngle(dx, dy);

    if(angle >= -45 && angle < 45) {
    	//向左
        result = 4;
    }else if (angle >= 45 && angle < 135) {
    	//向上
        result = 1;
    }else if (angle >= -135 && angle < -45) {
    	//向下
        result = 2;
    }
    else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
    	//向右
        result = 3;
    }
    return result;
}


//获取 指定查询参数(eg.?phone=1861)中 的参数
export const getQueryString = (search, name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}


