function antimate(obj, target, callback) {
    clearInterval(obj.timer)
    obj.timer = setInterval(function () {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        obj.style.left = obj.offsetLeft + step + 'px';
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
        }
    }, 15)
    if(callback) {
        callback();
    }

}

