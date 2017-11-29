

window.onload=function(){

    var startBtn=document.querySelector('#button1');
    var nextBtn=document.querySelector('#button3');
    var stopBtn=document.querySelector('#button2');
    console.log(startBtn,fenshu);
//创建构造函数

    function Game(){
        this.box=document.querySelector('.box');
        this.str='';
        this.she=[
            {x:0,y:0},
            {x:1,y:0},
            {x:2,y:0}
        ];
        this.food={};
        this.direction='r';
        this.ta=200;
        this.fenshu=0;
        this.fen=document.querySelector('#fenshu');
    }

    Game.prototype={
        drawScene:function(){
            for(var i=0;i<20;i++){
                for(var j=0;j<20;j++){
                    this.str+=`<div id="c${j}-${i}"></div>`;

                }
            }
            this.box.innerHTML=this.str;
        },
        drawSnake:function(){

            this.she.forEach(function(value,index){
                var slect=`#c${value.x}-${value.y}`;    //获取div的id
                var tanchishe=document.querySelector(slect);  //从此id值取属性
                tanchishe.classList.add('she');     //对应的   对应id的div加从class  相当于蛇身
            });
        },
        getfood:function(){
                do{
                    var x=Math.floor(Math.random()*20);  // 生成随机数x
                    var y=Math.floor(Math.random()*20);  //生成随机数y
                }while (this.fzSheShen(x,y));    //while为真执行do

                var slectF=`#c${x}-${y}`;    //获取一个id值 利用随机数x 岁既相互y

                var Food=document.querySelector(slectF);   //获取此id值
                Food.classList.add('food');    //在随机生成的id值对应的div标签添加 food类名
                this.food={
                    x:x,
                    y:y
                };
        },
        fzSheShen:function(a,b){
            return this.she.some(function(value){     // 判断是否在蛇身  some
                return value.x==a&&value.y==b;
            });
        },
        moveSnake:function(){
            var that=this;
            function move() {
                var oldhead =that.she[that.she.length - 1];
                var newhead;
                switch (that.direction) {
                    case that.direction = 'r':
                        newhead = {x: oldhead.x + 1, y: oldhead.y};
                        break;
                    case that.direction = 'l':
                        newhead = {x: oldhead.x - 1, y: oldhead.y};
                        break;
                    case that.direction = 't':
                        newhead = {x: oldhead.x, y: oldhead.y - 1};
                        break;
                    case that.direction = 'b':
                        newhead = {x: oldhead.x, y: oldhead.y + 1};
                        break;
                }
                var newheadobj = document.querySelector(`#c${newhead.x}-${newhead.y}`);
                //将位置加到蛇头上
                if (newheadobj == null || that.fzSheShen(newhead.x, newhead.y)) {
                    alert('游戏结束');
                    clearInterval(t)
                    return;
                } else {
                    newheadobj.className = 'she';
                    that.she.push(newhead);
                    if (newhead.x == that.food.x && newhead.y == that.food.y) {
                        that.getfood();
                        that.fenshu++;
                        that.fen.innerHTML=that.fenshu;
                        if(that.fenshu==20){
                            that.ta=150;
                            t=setInterval(move,that.ta);
                        }
                    } else {
                        var endshe = that.she.shift();   //删除蛇头的第一个坐标
                        var endsheobj = document.querySelector(`#c${endshe.x}-${endshe.y}`)
                        endsheobj.classList.remove('she');
                    }
                }
            }
            var t=setInterval(move,this.ta);

        },
        controlDiv:function(){
            var that=this;
            document.onkeydown=function(e){
                var code=e.keyCode;
                switch (code){
                    case 37:
                        if( that.direction=='r'){
                            return
                        }
                        that.direction='l';
                        break;
                    case 38:
                        if( that.direction=='b'){
                            return
                        }
                        that.direction='t';
                        break;
                    case 39:
                        if( that.direction=='l'){
                            return
                        }
                        that.direction='r';
                        break;
                    case 40:
                        if( that.direction=='t'){
                            return
                        }
                        that.direction='b';
                        break;
                }
            }
        },
        nextPlay:function(){
            var that=this;
          nextBtn.onclick=function(){
              /*alert(1);*/
              clearInterval(that.moveSnake());
              that.t=setInterval(that.moveSnake(),550);
          }
        },
        stop:function () {
            stopBtn.onclick=function () {
                alert("暂停");
            }
        },
        play:function(){
            this.drawScene();
            this.drawSnake();
            this.getfood();
            this.fzSheShen();
            this.moveSnake();
            this.controlDiv();
            this.nextPlay();
            this.stop();
        }

    }

   startBtn.onclick=function(){
       var obj=new Game();
       obj.play();
   }

}


