var oBtn = document.getElementById("login");
var oPhone = document.getElementById("phone");
// var oPwd = document.getElementById("password");
oBtn.onclick = function(){
    var url = "http://localhost/1815phpnow/jingdong.html/php/login.php";
    ajaxPost(url,`username=${oPhone.value}`)
    .then(function(res){
        console.log(res);
        window.location.href = 'http://localhost:8888/index.html';
        
                    
    })
}