window.addEventListener('load',function(){
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    

    focus.addEventListener('mouseover',function(){
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
    })
    focus.addEventListener('mouseleave',function(){
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
    })

    // 动态生成小圆圈
    var ul = document.querySelector('.focus ul');
    var ol = document.querySelector('.focus ol');

    for( var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
        // 记录当前小圆圈的索引号，通过自定义属性来做
        li.setAttribute('index',i);

        li.addEventListener('click',function(){
            for( var i = 0; i < ol.children.length;i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';

            // 点击小圆圈，移动图片
            
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            
            antimates(ul,-index * focusWidth);
        })
    }
    ol.children[0].className =  'current';

    // 克隆第一张图片（li）放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    // 点击右侧图片滚动一张
    var num = 0;
    // 控制小圆圈的播放
    var circle = 0;
    arrow_r.addEventListener('click',function(){
        if(num == ul.children.length-1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        antimates(ul, -num*focusWidth);

        circle++;
        if( circle == ul.children.length-1) {
            circle = 0;
        }
        for(var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    })

})