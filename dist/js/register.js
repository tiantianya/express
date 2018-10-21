
window.onload=function(){
	var oP = document.getElementById("p");
	var oInp1 = document.getElementById("inp1");
	var oInp2 = document.getElementById("inp2");
	var oInp3 = document.getElementById("inp3");
	var oInp4 = document.getElementById("inp4");
	var oSpan1 = document.getElementById("span1");
	var oSpan2 = document.getElementById("span2");
	var oSpan3 = document.getElementById("span3");
	var oSpan4 = document.getElementById("span4");
    var oBtn = document.getElementById("instaint")
    var oSpa1 = document.getElementById("spa1");
    var oSpa2 = document.getElementById("spa2");
    var oSpa3 = document.getElementById("spa3");
    var oSpa4 = document.getElementById("spa4");
    var oOk1 = document.getElementById("regok");
    var oOk2 = document.getElementById("regok2");
    var oOk3 = document.getElementById("regok3");
    var oOk4 = document.getElementById("regok4");
    var oWeak = document.querySelector(".weak");
    var oKind = document.querySelector(".kind");
    var oBetter = document.querySelector(".better");
	var num1 = oInp2.value;
	var num2 = oInp3.value;
	//登录账号
	oInp1.onclick=function(){
		oSpan1.style.display = "block";
	}
    oInp1.onblur = function(){  //失去焦点时候发生的事件
        var oRes = this.value;
		var oReg = /^1[34578]\d{9}$/;
		if(oReg.test(oRes)){
			oSpan1.innerHTML = "";
            var f= this.pass = true;
            // oRegok.style.display = "block";
            oOk1.style.display = "block";
			oSpa1.style.borderColor = "#666";
		}else{
			var a = this.pass = false;
            oSpan1.style.color = "#ff4800";
            oSpan1.innerHTML = "请输入正确的手机号码";
            oSpa1.style.borderColor = "#ff4800";
        }
    }
	//密码强度
	oInp2.onclick=function(){
		oSpan2.style.display = "block";
	}
	oInp2.onblur = function(){  //
		var  oRes = this.value;
		oInp2.value =oRes;  //
		var oReg = /^[a-zA-z-_0-9!@#$%^*.-]{6,20}$/;  //
			if(oReg.test(oRes)){  //
				if(/[0-9]/.test(oRes)){  //
                    oSpan2.innerHTML = "密码太简单，建议使用数字、字母、下划线组合";
                    oOk2.style.display = "block";	
					oWeak.style.background = "#f79100";
					oSpa2.style.borderColor = "#666";
				}
				if(/[a-zA-Z]/.test(oRes)){  //
                    oSpan2.innerHTML = "密码中,有被盗风险，建议使用数字、字母、下划线及两种以上组合";
                    oOk2.style.display = "block";	
                    oWeak.style.background = "#f79100";
					oKind.style.background = "#f79100";
					oSpa2.style.borderColor = "#666";
				}	
				if(/[!@#$%^*.-]/.test(oRes)){  //
                    oSpan2.innerHTML = "密码强,可放心注册";
                    oOk2.style.display = "block";
                    oWeak.style.background = "#f79100";
                    oKind.style.background = "#f79100";
					oBetter.style.background = "#f79100";
					oSpa2.style.borderColor = "#666";
				}		
				this.pass = true;  
			}else{
                oSpan2.style.color = "#ff4800";
				oSpan2.innerHTML = "密码只能为6-20位字母数字下划线组合";  //
                oSpa2.style.borderColor = "#ff4800";
				this.pass = false  
			}
	}
	//确认密码
	oInp3.onclick=function(){
		oSpan3.style.display = "block";
		oInp3.placeholder = "";
	}
	oInp3.onblur = function(){  
		var oRes = this.value;
		oInp3.value = oRes; 
		if(oInp2.value == oInp3.value){
			var s = this.pass = true;
            oSpan3.innerHTML = "";
            oOk3.style.display = "block";
			
		}else{
            oSpan3.style.color = "#ff4800";
            oSpan3.innerHTML = "两次输入不一致，请重新输入";
            oSpa3.style.borderColor = "#ff4800";
			var d=this.pass = false
		}
	}
	//验证码验证
	oInp4.onclick = function(){
		oSpan4.style.display = "block";
		oInp4.placeholder = "";
	}
	oInp4.onblur = function(){
		var oRes = this.value;
		var oReg = /^[a-zA-Z0-9]{4}$/;
		if(oReg.test(oRes)){
            var f= this.pass = true;
			oSpan4.innerHTML = "验证码正确";
			oSpan4.style.color = "#666";
            oInp4.style.borderColor = "#666";
			//console.log(f);
		}else{
			var a = this.pass = false;
			//console.log(a)
			oSpan4.innerHTML = "验证码不正确,四位验证码";
			oSpan4.style.color = "#ff4800";
            oInp4.style.borderColor = "#ff4800";

		}
	}

	//提交验证
		oBtn.onclick =function(event){  
			var evt = event || window.event;  
			var pass = true;  
			var aInp = document.querySelectorAll("input[data=reg]")  
		for(var i = 0;i < aInp.length;i++){  
			if(!aInp[i].pass){  
				pass=false;
				break;  	
			}			
		}

		if(!pass){  
			if(evt.preventDefault){  
				evt.preventDefault()  
			}else{
				window.returnValue = false  
			}
		}
		// var url = "http://localhost:8888/proxy/localhost/shunfeng/register.php";
		// ajaxGet(url,`username=${oInp1.value}&password=${oInp2.value}&email=${oInp2.value}&qq=${oInp2.value}&phone=${oInp2.value}`)
        //         .then(function(res){
		// 			console.log(res);
        //             // if(res == "注册成功"){
 	    //             //  	window.location.href = 'http://localhost:8888/index.html';
                    	
                    	
        //             // }
		//         })
		// console.log(oInp1.value);
		// console.log(oInp2.value);
		$.ajax({
			
			type: 'GET',
			url: "http://localhost:8888/proxy/localhost/shunfeng/register.php",
			data: `username=${oInp1.value}&password=${oInp2.value}`,	
					  
		  })
		  .then(function(res){
		  console.log(res);
		  
		  if(res == "注册成功"){
			  window.location.href = "http://localhost:8888/index.html"
		  }
	  })

	}	
    }
