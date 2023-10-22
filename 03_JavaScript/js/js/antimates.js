function antimates(obj, target,callback) {
    clearInterval(obj.timer)
    obj.timer = setInterval(function () {
        // 把步长值写到定时器里面
        // 把我们步长值改为整数，不要出现小数问题
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            if(callback){
                callback();
            }
        } 
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}