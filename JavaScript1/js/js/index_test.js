window.addEventListener('load', function () {
    var focus = document.querySelector('.focus');
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focusWidth = focus.offsetWidth;

    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function(){
            arrow_r.click();
        },2000);
    })

    // 1、动态生成小圆圈
    var ul = document.querySelector('.focus ul');
    var ol = document.querySelector('.focus ol');

    for(var i=0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
        
        // 给每个小园圈自定义一个属性index
        li.setAttribute('index', i);

        //2、点击小圆圈,小圆圈发生变化，排他思想
        li.addEventListener('click',function(){
            for(var i = 0; i< ol.children.length; i++){
                ol.children[i].className = '';
            }
            this.className = 'current';

            //3、点击小圆圈移动图片
            var index = this.getAttribute('index');
            // 当我们点击了某个小li，就拿到当前的小li的索引号给num
            num = index;
            circle = index;
            antimate(ul,-index*focusWidth);


        })
    }
    ol.children[0].className = 'current';

    // 克隆第一张图片放在li的最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    // 4、点击右箭头移动图片
    // 点击右侧按钮图片滚动一张
    var num = 0;
    // 控制小圆圈的播放
    var circle = 0;
    arrow_r.addEventListener('click',function(){
        //如果走到了最后复制的一张图片，此时ul要快速复原left改为0
        if(num == ul.children.length-1){
            ul.style.left = 0;
            num = 0;
        }
        num++;
        antimate(ul,-num*focusWidth);

        // 5、点击右侧按钮和小圆圈播放同步
        //先清除其余小圆圈的current类名，留下当前的小圆圈
        circle++;
        if(circle == ol.children.length){
            circle = 0;
        }
        circleChange();


    })

    //6、左侧按钮点击
    arrow_l.addEventListener('click',function(){
        //如果走到了最后复制的一张图片，此时ul要快速复原left改为0
        if(num == 0){
            num = ul.children.length-1;
            ul.style.left = -num*focusWidth + 'px';
            
        }
        num--;
        antimate(ul,-num*focusWidth);

        // 5、点击右侧按钮和小圆圈播放同步
        //先清除其余小圆圈的current类名，留下当前的小圆圈
        circle--;
        // if(circle < 0){
        //     circle = ol.children.length-1;
        // }
        circle = circle < 0 ? ol.children.length - 1 : circle;
        circleChange();

    })

    function circleChange(){
        for(var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';

    }

    var timer = setInterval(function(){
        arrow_r.click();
    },2000);
    
})