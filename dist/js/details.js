
var oSmall = document.getElementById("small");
	// 小框;
	var oFrame = document.getElementById("frame");
	var oBig = document.getElementById("big");
	var oBigImg = oBig.children[0];

	oSmall.onmouseenter = function(){
        // 小框和大图都显示出来;
        console.log(1);
		oBig.style.display = "block";
		oFrame.style.display = "block";
	}
	oSmall.onmouseleave = function(){
		// 小框和大图都隐藏;
		oBig.style.display = "none";
		oFrame.style.display = "none";
	}
	oSmall.onmousemove = function(event){
		// 1. 获取定位的x,y 值;
		var e = event || window.event;
		var offsetX = e.offsetX;
		var offsetY = e.offsetY;
		// 2. 给元素设置的left 值 和top值;
		var nLeft = offsetX  - 50;
		var nTop = offsetY - 50;
		// 边界检测;  最小值 ; 最大值;
		
		// 最小值;
		nLeft = nLeft < 0 ? 0 : nLeft;
		nTop = nTop < 0 ? 0 : nTop;

		// 最大值;
		var maxLeft = oSmall.offsetWidth - oFrame.offsetWidth;
		var maxTop = oSmall.offsetHeight - oFrame.offsetHeight;
		
		nLeft = nLeft > maxLeft ? maxLeft : nLeft;
		nTop = nTop > maxTop ? maxTop : nTop;

		oFrame.style.left = nLeft +"px";
		oFrame.style.top = nTop +  "px";

		// 边界检测;
		
		// 比例 已知 是4;
		// 比例分成两部分;
		var propX = oBig.offsetWidth / oFrame.offsetWidth;
		var propY = oBig.offsetHeight / oFrame.offsetHeight;

		// console.log(propX,propY);
		
		oBigImg.style.left = -nLeft * propX + "px";
		oBigImg.style.top = -nTop * propY + "px";
	}	
