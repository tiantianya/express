 
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
                        <div class="p-btn">
                            <a class="buy" href="#">加入购物车</a>
                        </div>
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













// function ajaxGet(path,callback){
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET",path);
//     xhr.send(null);
//     xhr.onload = function(){
//         if(xhr.status == 200){
//             //执行某些代码;
//             callback(xhr.response);
//         }
//     }
// }
// ajaxGet("http://localhost:8888/data.json",function(res){
//     // console.log(res);
//     var json = JSON.parse(res);
//     console.log(json);
//     var html = "";
//     var moveList = json.subjects;
//      for(var i = 0 ; i < moveList.length ; i ++){
//         html +=  `<li class="item">
//                     <div class="pic">
//                         <a href="#">
//                             <img src="${moveList[i].images.small}" alt="">
//                          </a>    
//                     </div>
//                     <p><a>${moveList[i].title}</a></p>
//                     <div class="price">
//                         <i>¥</i>
//                         <span>${moveList[i].rating.average}</span>
//                     </div>
//                     <div class="p-btn">
//                         <a class="buy" href="#">加入购物车</a>
//                     </div>
//                 </li>`
//      }
//      document.querySelector("#wrap ul").innerHTML += html;
// })