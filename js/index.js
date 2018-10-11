// *****************顶部点击事件****************
var oTopclose = document.getElementById("topclose");
var oTopmenu = document.getElementById("topmenu");
oTopclose.onclick = function(){
    // $("#topmenu").animate({ top: "-300px" }, 200);
    console.log(1);
    // oTopmenu.style.op = 0 +"px";
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
           // 获取列表中第一个元素的宽度值;
           this.item_width = this.item_list.width();
                       
           if(this.left_btn.length == 0 && this.right_btn.length == 0 && this.btn_list.length == 0){
               this.autoPlay();
               return 0;
           }          
		    this.bala = $("#bg");
		    
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
    btn:"#anniu"
})
//*****************美食底部背景颜色***********************
//var banner1= new Banner();
//banner1.autoPlay();
//banner1.init({
//  item_list : "#bg li",
//  ul : "#bg ul"
////  btn_list:".anniu i"
//})