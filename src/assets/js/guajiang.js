class Gua{

    canvas;
    context;

    onGuaComplete;

     run() {
        this.canvas = document.getElementById('mask');
         this.context = this.canvas.getContext("2d");
         this.context.fillStyle = "#d1d1d1";
         this.context.fillRect(0, 0, 280, 65);
         this.context.globalCompositeOperation = 'destination-out';
// 鼠标按下 增加mousemove的事件监听
         this.canvas.addEventListener('mousedown', this.drawArcMouseHandle.bind(this));
         this.canvas.addEventListener('mouseup', function(event) {
            // 鼠标抬起之后，把mousemove的事件监听撤销掉
            this.canvas.removeEventListener('mousemove', this.mousemoveHandle.bind(this));
        }.bind(this));
         this.canvas.addEventListener('touchmove', this.drawArcTouchHandle.bind(this));

    }

// 根据鼠标的move画圆
     drawArcMouseHandle(event) {
        event.preventDefault();
        event.target.addEventListener("mousemove", this.mousemoveHandle.bind(this));
    }
// 为了能够移除movesemove的事件需要单独处理一下
     mousemoveHandle(event) {
        event.preventDefault();
        this.drawArcByPoint(event.pageX, event.pageY);
    }
// 根据触摸点画圆
     drawArcTouchHandle(event) {
        event.preventDefault();
        var touch = event.touches[0];
         this.drawArcByPoint(touch.pageX, touch.pageY);
    }
// 根据某个点在canvas上画圆
// x 坐标和 y 坐标 两个坐标是触摸点的坐标而不是画圆的圆心
// 圆心通过计算得出
     drawArcByPoint(x, y) {
         this.context.beginPath();
         this.context.arc(x - this.canvas.offsetLeft, y - this.canvas.offsetTop, 20, 0, Math.PI * 2);
         this.context.closePath();
         this.context.fillStyle = '#dddddd';
         this.context.fill();
         this.checkComplete();
    }
// 判断是否完成刮奖 点数大于80%
     checkComplete() {
        var imgData = this.context.getImageData(0, 0, 280, 65);
        var pxData = imgData.data; // 获取字节数据
        var len = pxData.length; // 获取字节长度
        var count = 0; // 记录透明点的个数
        // 主要的思想是 一个像素由四个数据组成，每个数据分别是 rgba() 所以第四个数据 a 表示alpha透明度
        for (var i = 0; i < len; i += 4) {
            var alpha = pxData[i + 3]; // 获取每个像素的透明度
            if (alpha < 10) {
                // 透明度小于10
                count++;
            }
        }
        var percent = count / (len / 4); // 计算百分比
        // 如果百分比大于0.8 则表示成功
        if (percent >= 0.8) {
            this.showResult()
        }
    }
// 显示刮奖结果
     showResult(msg) {
        this.onGuaComplete();
    }

    addOnGuaCompleteListener(onGuaComplete){
         this.onGuaComplete = onGuaComplete
    }
}

export default Gua;






