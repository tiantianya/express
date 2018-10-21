 
onscroll = function(){
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if(scrollTop >= 5000){
		 pagination.handleEvent();
    }
}
 
function Pagination(){
    }
    Pagination.prototype.init = function(){
        // 进度条;
        this.progress = document.querySelector("#progress-bar");
        this.ul = document.querySelector("#wrap ul");
        // 加载第几页;
        this.page = 0;
        // 是否加载完了;
        this.loaded = false;
        // 绑定事件;
        // 渲染页面;
        this.handleEvent();
        this.loadMsg()
        .then((res)=>{
            // console.log(res);
            //json.parse 用于从一个字符串中解析出json 对象
            res = typeof res == "string" ? JSON.parse(res) : res;
            this.renderPag(res);
        })
    }      
    Pagination.prototype.handleEvent = function(){
        // 滚动事件判定是否应该加载数据;
//      onscroll = this.iflLoad.bind(this);
        this.iflLoad();
    }
    Pagination.prototype.loadMsg = function(){
        // 让进度条归零;
        // this.progress.style.width = 0;
        
        // 请求的加载;
        return new Promise((succ)=>{
            // this => 实例化对象;
            var xhr = new XMLHttpRequest();
            var path = "http://localhost:8888/data.json?start="+this.page * 25 + "&count=25";
            xhr.open("GET",path);
            xhr.send(null);
            xhr.onload = function(){
                succ(xhr.response);
            }
            xhr.onprogress = (event) => {
                let {loaded,total} = event;
                let prop = loaded / total;
                // this.progress.style.width = prop * 1130 + "px";
            }

            this.page++;
//          console.log(this.page);

        })
    }
    Pagination.prototype.renderPag = function(json){
        // console.log(json);
        var moveList = json.subjects;
        var html = "";
        for(var i = 0 ; i < moveList.length ; i ++){
            html +=  `<li class="item">
                        <div class="pic">
                            <a href="#">
                                <img src="${moveList[i].images.small}" alt="">
                             </a>    
                        </div>
                        <p><a>${moveList[i].title}</a></p>
                        <div class="price">
                            <i>¥</i>
                            <span>${moveList[i].rating.average}</span>
                        </div>
                        <button data-id=${moveList[i].id} class="buy" href="#">加入购物车</button>
                    </li>`
         }
        // 把渲染好的字符串放入页面之中;
        this.ul.innerHTML += html;

        // 渲染结束;
        this.loaded = true;
    }
    Pagination.prototype.iflLoad = function(){
        if(this.loaded == false){
            return 0;
        }
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        // 显示的高度有多高;
        var showHeight = document.documentElement.clientHeight + scrollTop;
        // 最后一个元素;
        var aLi = document.querySelectorAll("#wrap li");
        var lastLi = aLi[aLi.length - 1];
        if(lastLi.offsetTop <= showHeight + 300){
            // 加载数据
            this.loadMsg()
            .then((res)=>{
                res = typeof res == "string" ? JSON.parse(res) : res;
                this.renderPag(res);
            })
            this.loaded = false;
        }
    }
    var pagination = new Pagination();
    pagination.init();
// **********************购物车***************************
function ShopCar(){

}
$.extend(ShopCar.prototype,{
    init:function(){
        this.main = $(".container ul")
        this.loadJson()
        .then(function(res){
            // console.log(res);
            this.json = res.subjects;
            this.renderPage()
        })
        this.bindEvent();
        this.listSum();
    },
    loadJson:function(){
        var opt = {
            url:"http://localhost:8888/proxy/api.douban.com/v2/movie/top250",
            data:{start:0,count:10},
            type:"GET",
            context : this
        }
        return $.ajax(opt);
    },
    renderPage:function(){
       console.log(this.json)
        var html = "";
        for(var i = 0 ; i < this.json.length ; i ++){
            html += `<li>
                        <img src="${this.json[i].images.small.replace(/\.jpg/g,".webp")}" alt="">
                        <h3>${this.json[i].title}</h3>
                        <button data-id=${this.json[i].id}>加入购物车</button>
                    </li>`
        }
        this.main.html(html);
    },
    bindEvent:function(){
        $(".container ul").on("click","button",this.addCar.bind(this));

        $(".shopCar>div").on("mouseenter",this.showList.bind(this));
        $(".shopCar>div").on("mouseleave",function(){
            $(".goods-list").children().remove();
        });
        $(".shopCar>div").on("click",function(event){
            var target = event.target ; 
            if(target != $(".shopCar>div")[0]) return 0;

            $.removeCookie("shopCar");
            // 执行鼠标移出事件;
            $(".shopCar>div").triggerHandler("mouseleave");
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
        if((cookie = $.cookie("shopCar"))){
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
            $.cookie("shopCar",JSON.stringify(cookieArray));
        }else{
            $.cookie("shopCar",`[{"id":"${goodsId}","num":"1"}]`);
        }
        console.log($.cookie("shopCar"));
        this.listSum();
    }
    ,
    showList:function(event){
        // 判定是否存在购物车,如果不存在购物车就没必要拼接列表了;
        var target = event.target;
        if(target != $(".shopCar>div")[0]) return 0;
        var cookie;
        if(!(cookie = $.cookie("shopCar"))){ return 0; };
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
                                <h3>${this.json[j].title}</h3>
                                <strong>${cookieArray[i].num}</strong>
                            </li>`;
                    break;
                }
            }
        }    
        $(".goods-list").html(html);
    },
    listSum:function(){
        var cookie;
        if(!(cookie = $.cookie("shopCar"))){ 
            $(".shopCar").find("span").html(0);
            return 0;
        };
        var cookieArray = JSON.parse(cookie);
        var sum = 0;
        for(var i = 0 ; i < cookieArray.length ; i ++){
            sum += Number(cookieArray[i].num);
        }
        $(".shopCar").find("span").html(sum);
    }
})
var car = new ShopCar();
car.init();












