var Success = {
	dom:{},
	init:function(){
		this.initDom();
		this.bindEvent();
	},

	initDom:function(){
		var dom = this.dom;

		dom.payCash = $(".payCash");
		dom.dNum = $(".dNum");

	},

	bindEvent:function(){

		var dom = this.dom;
		var ttMoney = getCookie("totalMoney");

		dom.payCash.html(ttMoney);

		var day = new Date();
		var str = '';
		var year = day.getFullYear();
		str += year;
		var month = day.getMonth() + 1;
		str += month;
		var data = day.getDate();
		str += data;

		var arr = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9"];
		var str1 = "";
		for(var i=0;i<6;i++){
			var random = parseInt(Math.random()*arr.length);
			str1 += arr[random];
		}
		str += str1;
		dom.dNum.html(str);
	}
}


$(function(){
    Success.init();
})