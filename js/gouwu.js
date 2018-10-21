function ShopCar(){
}
$.extend(ShopCar.prototype,{
    init:function(){
        this.page = 0;
        this.loaded = false;
        this.main = $("#wrap ul")
        this.loadJson()
        .then(function(res){
            // console.log(res);
            this.json = res.subjects;

            this.page ++;
            this.renderPage()
        })
        this.bindEvent();
        this.listSum();
    },
    loadJson:function(){
        var opt = {
            url:"http://localhost:8888/data.json?",
            // +this.page * 1 + "&count=4",
            data:{start:10,count:10},
            type:"GET",
            context : this
        }
        return $.ajax(opt);
    },
    renderPage:function(){
    //    console.log(this.json)
        var html = "";
        for(var i = 0 ; i < this.page*10 ; i ++){
            html += `<li class="item">
                        <div class="pic">
                            <a href="#">
                                <img src="${this.json[i].images.small}" alt="">
                            </a>    
                        </div>
                        <p><a>${this.json[i].title}</a></p>
                        <div class="price">
                            <i>¥</i>
                            <span>${this.json[i].rating.average}</span>
                        </div>
                        <button data-id=${this.json[i].id} class="buy" href="#">加入购物车</button>
                    </li>`
                    // `<li>
                    //     <img src="${this.json[i].images.small.replace(/\.jpg/g,".webp")}" alt="">
                    //     <h3>${this.json[i].title}</h3>
                    //     <button data-id=${this.json[i].id}>加入购物车</button>
                    // </li>`
        }
        this.main.html(html);
        this.loaded = true;
        // this.main.html(html);
        
    },
    bindEvent:function(){
        onscroll = this.iflLoad.bind(this);
        $("#wrap ul").on("click","button",this.addCar.bind(this));

        $(".shopingcar").on("mouseenter",this.showList.bind(this));
        $(".shopingcar").on("mouseleave",function(){
            $(".goods-list").children().remove();
        });
        $(".shopingcar").on("click",function(event){
            var target = event.target ; 
            if(target != $(".shopingcar")[0]) return 0;

            $.removeCookie("shopingcar");
            // 执行鼠标移出事件;
            $(".shopingcar").triggerHandler("mouseleave");
            this.listSum();
        }.bind(this));
    },
    addCar:function(event){
        // 我怎么知道把谁加入到购物车之中那?;
        var target = event.target ;
        var goodsId = $(target).attr("data-id");
        // console.log(goodsId);
        // 如何把id加入cookie;
        // $.cookie("shopCar",goodsId);

        // cookie 是纯文本;          JSON.parse()  string => array;
        // 加入购物车需要 array 数组; JSON.stringify()  array  => string;
        
        // $.cookie("shopCar",`[${goodsId}]`);
        // console.log($.cookie("shopCar"));

        // 分成两种情况;
        // 1. cookie之中没有 shopCar cookie 或者 shopCarcookie里面的值为空数组;

        // 建立数组结构;

        // 2. cookie 之中有了shopCar cookie shopCarCookie里面的数组不为空;

        // 把cookie转换成数组 进行push操作 ;  转换成字符串 放入cookie之中;
        var cookie;
        if((cookie = $.cookie("shopingcar"))){
            // 将字符串转换为数组, 方便插入操作;
            // console.log(cookie);
            var cookieArray = JSON.parse(cookie);
            // 判定当前要添加的商品 是否已经存在在购物车里;
            // 表示是否存在商品;
            var hasGoods = false;
            for(var i = 0 ; i < cookieArray.length ; i ++){
                if(cookieArray[i].id == goodsId ) {
                    // 存在 商品;
                    hasGoods = true;
                    cookieArray[i].num ++;
                    break;
                }
            }
            // 如果没有商品;
            if(hasGoods == false){
                var goods = {
                    id : goodsId,
                    num : "1"
                }
                cookieArray.push(goods);
            }

            // 将数组 转为字符串 方便 储存cookie;

            // console.log(JSON.stringify(cookieArray));
            $.cookie("shopingcar",JSON.stringify(cookieArray));
        }else{
            $.cookie("shopingcar",`[{"id":"${goodsId}","num":"1"}]`);
        }
        // console.log($.cookie("shopingcar"));
        this.listSum();
    }
    ,
    iflLoad : function(){
        if(this.loaded == false){
            return 0;
        }
        if(this.page>=10){
            return 0;
        }
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        // 显示的高度有多高;
        var showHeight = document.documentElement.clientHeight + scrollTop;
        // 最后一个元素;
        var aLi = document.querySelectorAll(".item");
        var lastLi = aLi[aLi.length - 1];
        console.log(aLi);
        if(lastLi.offsetTop <= showHeight){
            // 加载数据
            this.loadJson()
            .then((res)=>{
                res = typeof res == "string" ? JSON.parse(res) : res;
                this.page++;
                this.renderPage(res);
            })
            this.loaded = false;
        }
    },
    showList:function(event){
        // 判定是否存在购物车,如果不存在购物车就没必要拼接列表了;
        var target = event.target;
        // if(target != $(".shopCar>div")[0]) return 0;
        // if(target != $(".shopingcar>b")) return 0;
        var cookie;
        if(!(cookie = $.cookie("shopingcar"))){ return 0; };
        var cookieArray = JSON.parse(cookie);
        var html = "";
        // for 购物车里有多少商品就拼接多少个;
        for(var i = 0 ; i < cookieArray.length ; i ++){
            // console.log(cookieArray[i]);
            // for 判断哪一个商品是购物车里的商品;
            for(var j = 0 ; j < this.json.length ; j ++){
                if(cookieArray[i].id == this.json[j].id){
                    html += `<li data-id="${cookieArray[i].id}">
                                <img src="${this.json[j].images.small}" alt="">
                                <strong>${cookieArray[i].num}</strong>
                                <h3>${this.json[j].title}</h3>
                            </li>`;
                    break;
                }
            }
        }   
        $(".goods-list").html(html);
    },
    listSum:function(){
        var cookie;
        if(!(cookie = $.cookie("shopingcar"))){ 
            $(".shopingcar").find("b").html(0);
            return 0;
        };
        var cookieArray = JSON.parse(cookie);
        var sum = 0;
        for(var i = 0 ; i < cookieArray.length ; i ++){
            sum += Number(cookieArray[i].num);
        }
        $(".shopingcar").find("b").html(sum);
    }
})
var car = new ShopCar();
car.init();