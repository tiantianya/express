var oBtn = document.getElementById("login");
var oUser = document.getElementById("phone");
var oPwd = document.getElementById("password");
// var oPwd = document.getElementById("password");
oBtn.onclick = function(){
    // var url = "http://localhost:8888/proxy/localhost/shunfeng/login.php";
    // ajaxPost(url,`username=${oUser.value}&password=${oPwd.value}`)
    // .then(function(res){
    //     console.log(res);
    //     window.location.href = 'http://localhost:8888/index.html';
        
                    
    // })
    $.ajax({
        type: 'GET',
        url: "http://localhost:8888/proxy/localhost/shunfeng/login.php",
        data: `username=${oUser.value}&password=${oPwd.value}`,			  
      })
      .then(function(res){
      console.log(res);
      if(res == "登录成功"){
          window.location.href = "http://localhost:8888";
      }
  })

}