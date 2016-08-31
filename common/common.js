
// 工具类
var Util = {
    _timer: null,
    showTip: function(str) {
        var dom = $('<div class="f-tips"></div>').text(str),
            old = $('.f-tips');
        if (old.length) {
            old.replaceWith(dom); // replaceWith() 方法用指定的 HTML 内容或元素替换被选元素。
        } else {
            $(document.body).append(dom);
        }
        clearTimeout(this._timer);
        this._time = setTimeout(function() {
            dom.css("opacity", "0").remove();
        }, 2000);
    },

    getQuery: function(name, url) {
        var u = url || location.search,
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            r = u.substr(u.indexOf("\?") + 1).match(reg);
        return r != null ? r[2] : "";
    }
}

function isMobile(tel) {
    return /^1\d{10}$/.test(tel);
}

function getCookie(name) {
    
    var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"),
      
        val = document.cookie.match(reg);
        console.log(reg);
    return val ? (val[2] ? unescape(val[2]) : "") : null;
}

function setCookie(name, value, expires, path, domain, secure) {
    var exp = new Date(),
        expires = arguments[2] || null,
        path = arguments[3] || "/",
        domain = arguments[4] || null,
        secure = arguments[5] || false;
    expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : "";
    document.cookie = name + '=' + escape(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
        console.log(document.cookie);

}

function delCookie(name, path, domain, secure) {
    var value = getCookie(name);
    if (value != null) {
        var exp = new Date();
        exp.setMinutes(exp.getMinutes() - 1000);
        path = path || "/";
        document.cookie = name + '=;expires=' + exp.toGMTString() + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
    }
}


function setCookie(name, val, iDay) {

    var obj = new Date();

    // 得到10天后的日期
    obj.setDate( obj.getDate() + iDay );

    // "expires=" + obj
    // "expires=" + 日期对象
    // 【注意】 expires 前一定是 分号！
    // document.cookie = "user=jobs;expires=" + obj;
    document.cookie = "" + name + "=" + val + ";expires=" + obj + ";path=/";
}


// 获取 cookie 的值
function getCookie(searchName) {

    //user=jobs; psw=123; age=18; 

    // 获取当前的cookie值
    var str = document.cookie;

    // 先分割字符串
    var arr = str.split("; ");

    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");

        var name = arr2[0];
        var val = arr2[1];

        if (name == searchName) {
            return val;
            //alert(val);
        }
    }

    // 如果找不到名字，那么返回空字符串
    return "";
}


// 删除 cookie
// 将时间设置成当前时间的值就可以了
function removeCookie(name) {

    // 设置 名字为 name 的cookie的过期时间为 【1天前】
    setCookie(name, "", -1);

    // document.cookie = "name=123;expires=" + obj;

}

/*$(function(){
    var _user = getCookie('username');
    console.log(_user);
    if(_user != "" && _user != null){
       
    }else{
      
    }
})

// $(function(){

//     var use = getCookie("username");
//     if(use !="" && use !=null){
//         console.log(1);
//          $("#yonghuming").html('你好');
       
//     }else{
//         alert(1);
//     }


// })*/