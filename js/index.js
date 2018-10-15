// *****************顶部点击事件****************
var oTopclose = document.getElementById("topclose");
var oBan = document.getElementById("banner");
oTopclose.onclick = function(){
    oBan.style.height = "0";
}
//*********************轮播图***************
function Banner(){}
    $.extend(Banner.prototype,{
        init : function(options){   
           // 所有的图片;
           this.item_list = $(options.item_list);
           // 左按钮 ;
           this.left_btn = $(options.left_btn);
           // 右按钮 ;
           this.right_btn = $(options.right_btn);
           // 按钮列表;
           this.btn_list = $(options.btn_list);
           this.nowIndex = 0;          
           // 有多少元素;
           this.item_num = this.item_list.length;
//         this.ul = $("#show ul");
			this.ul = $(options.ul);
			this.wrap = $(options.wrap);
            this.btn = $(options.btn);
            this.bala = $(options.bala);
           // 获取列表中第一个元素的宽度值;
           this.item_width = this.item_list.width();
                       
           if(this.left_btn.length == 0 && this.right_btn.length == 0 && this.btn_list.length == 0){
               this.autoPlay();
               return 0;
           }          
		    // this.bala = $("#bg ul");
		    
           this.bindEvent();
        },
        bindEvent : function(){
            // this.left_btn.click(this.prev.bind(this))
            this.left_btn.click($.proxy(this.prev , this));
            this.right_btn.click($.proxy(this.next , this));
            this.btn_list.mouseover($.proxy(this.toIndex , this));
            this.wrap.mouseenter($.proxy(this.stopPlay, this ));
            this.wrap.mouseleave($.proxy(this.autoPlay, this ));
            this.btn.mouseenter($.proxy(this.stopPlay, this ));
            this.btn.mouseleave($.proxy(this.autoPlay, this ));
        },
        next:function(){
            if( this.nowIndex == this.item_num - 1){
                this.nowIndex = 1;
                this.ul.css({
                    left : 0
                })
            }else{
                this.nowIndex ++;
            }
            this.animate();
        },
        prev:function(){
            // console.log(this);
            if( this.nowIndex == 0){
                this.nowIndex = this.item_num - 2;
                this.ul.css({
                    left : -(this.item_num - 1) * this.item_width
                })
            }else{
                this.nowIndex --;
            }

            this.animate();
        },
        toIndex:function(event){
            // 要获取当前元素的下标么;
            this.target = event.target || event.srcElement;
            // console.log(event);
             console.log($(this.target).index());
            // index();
            this.nowIndex = $(this.target).index();
            this.animate();   
        },
        animate:function(){
            // console.log(this.nowIndex);
            this.ul.stop().animate({
                left : -this.item_width * this.nowIndex
            })
            var index = this.nowIndex == this.item_num - 1 ? 0 : this.nowIndex; 
            this.btn_list.eq(index).addClass("active")
            .siblings("i").removeClass("active");
            
            this.bala.stop().animate({
            	left : -1349 * this.nowIndex
            })
            
        },
        autoPlay:function(){
            this.autoTimer = setInterval(function(){
                this.next();
            }.bind(this),3000)
        },
        stopPlay:function(){
                clearInterval(this.autoTimer);
            }
    })
//*****************************美食轮播图*************************
var banner = new Banner();
banner.autoPlay();
banner.init({
    item_list : "#slider-wrap li",
    ul : "#slider-wrap ul",
    btn_list:"#anniu i",
    wrap:"#slider-wrap",
    btn:"#anniu",
    bala:"#bg ul"
})
// *************************优选味道轮播图*********************
var banner1 = new Banner();
banner1.init({
    item_list : "#slider1 li",
    ul : "#slider1 ul",
    left_btn:"btn-left",
    right_btn:"btn-right",
    btn_list:"#btn-list i",
    wrap:"#slider1",
    btn:"#btn-list"
})
// *****************************热门晒单****************************

    var oTop = $("#toplist");
    var i = 0;
    // var top1 = $("#toplist").position().top;
    var top1 = parseInt($("#toplist").css("top"));
    console.log(top1);
    function auto(){
        this.autoTimer = setInterval(function(){           
            if(top1 > -390 ){
                oTop.animate(
                    {top:-130*i},1000
                    )               
                i++;
            }       
            if(top1 <= -390){
                console.log(1);
                oTop.animate(
                    {top:0},0
                    )
                i=1;
            }            
        }.bind(this),3000)
    }
 auto();
//***********************************倒计时********************************************
var d2 = new Date("2018/10/17 17:41:00")
// 截止的事件;
function time(){
    var d =new Date() 
    var  a = (d2.getTime()-d.getTime()) / 1000;
    if(a > 0){
        var nhour1 = parseInt(((a / (60*60)) % 24) / 10);
        var nhour2 = parseInt(((a / (60*60)) % 24) % 10);
        var nmin1 = parseInt(((a / 60) % 60) / 10);
        var nmin2 = parseInt(((a / 60) % 60) % 10);
        var nsecond1 = parseInt((a % 60) / 10);
        var nsecond2 = parseInt((a % 60) % 10);
        hour1.innerHTML = nhour1
        hour2.innerHTML = nhour2
        min1.innerHTML = nmin1
        min2.innerHTML = nmin2
        second1.innerHTML = nsecond1
        second2.innerHTML = nsecond2
    }else{
        alert("活动结束")
    }
}
setInterval(function(){
        time()
}, 1000)
time();
// ***********************右侧固定栏鼠标移入移出事件************************
// $(function(){
//     $(".side").click(function(){
//         $(".cart-wrap").animate({
//             display:"block",
//         })
//         $(".cart-list").animate({
//             right:"0",
//         }).queue(function(next){
//             $(this).css('background','#ddd');
//             next();
//         })
//     })
// })

   
  
