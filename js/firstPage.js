
//轮播图的js

$(function(){

    var $lunbo = $(".lunbo");
    var oImg = $lunbo.find("ul").children();
    var oSpan = $(".btns").children();

    var index = 0;
    var timer = setInterval(start,3000);

    $lunbo.hover(function(){
        clearInterval(timer);
    },function(){
        clearInterval(timer);
        timer = setInterval(start,3000);
    })

    function start(){  
    
            index++;
            if(index>=oImg.length){
                index = 0;
            }
            change();
           
    }
    function change(){
        oImg.eq(index).show().siblings().hide();
        oSpan.eq(index).addClass("active").siblings().removeClass("active");
    }


    oSpan.click(function(){
        index = $(this).index();
        clearInterval(timer);
        change();
        timer = setInterval(start,3000);
    })



    /*========== 吸顶导航  ==============*/
    var $sideBar = $(".side_bar");
    var top_nav = $(".top_nav");
    $(window).scroll(function(){
        var scrollTop = $(window).scrollTop();
        if(scrollTop>0){
            top_nav.slideDown(600);
            $sideBar.stop().animate({'top': 40});
        }else {
            top_nav.slideUp(600);
            $sideBar.stop().animate({'top': 126});
        }
    })


    /*=========   侧边栏   ============*/

    
    var $button = $(".back_top");

    $button.click(function(){

        var scrollTop = $(window).scrollTop();
        $('body').animate({scrollTop:0},2000);
        return false;
    })

    var $sideOut = $(".biubiu");
    $sideOut.click(function(){
       
        if($sideBar.offset().left + $sideBar.width() == $(window).width()){
            $sideBar.animate({right:-$sideBar.width()});
        }else if($sideBar.offset().left == $(window).width()){
            $sideBar.animate({right:0});
        }
        return false;
    })


    var weixin = $(".weixin");
    var focusWeixin = $(".lia2");
    var timer;
    focusWeixin.hover(function(){
            weixin.show();    
        
    },function(){    
        weixin.hide();  
    })

    weixin.hover(function(){
        
        weixin.show();
    },function(){
        weixin.hide();
    })


    /*========  半透明定位介绍   ==========*/
    var btPic = $(".bt_pic").find("li");
    // var pShow = btPic.find("p");

    btPic.hover(function(){
        $(this).find("p").show();
    },function(){
        $(this).find("p").hide();
    })


    //点击搜索按钮  出搜索框
    
    var $search = $(".pa2");
    $search.click(function(){

        //e.stopPropagation();

        $(".search").show();
        $('.shuru').click(function(){

            //e.stopPropagation();
            $(this).val("");

        })

        $(".shuru").blur(function(){
            
            $(".search").hide();
        })

        $("body").click(function(e){
            if(e.target == document.documentElement){
                $(".search").hide();
            }
        })

    })

    //点击登录 到登录页面
    $("#_denglu1").click(function(){
        window.open("http://localhost/html/login.html");
    })

    //点击注册按钮 跳转到注册页面
    
    $("#_denglu1").next().click(function(){
        window.open("http://localhost/html/register.html","注册页面");
    })

    //点击图片到详情页面
    $(".detail_img").click(function(){
        window.open("http://localhost/js/details.html");
    })





    var _user = getCookie('username');
    console.log(_user);
    if(_user != "" && _user != null){
        
        var _span = $("<span/>").html("您好: ").css({textAlign:"left",textIndent:"4px",fontSize:"12px"});
        var _a = $("<a/>").html(_user).css({color:"orange"});
        var _p = $("<p/>").append([_span,_a]);

        var _quit = $("<a/>").html("退出").css({color:"orange",fontSize:"12px"});
        var _qt = $("<p/>").append(_quit);

        $(".zhuce").html([_p,_qt]).css({textAlign:"center",lineHeight:"16px",marginTop:"16px"});

        //点击退出  删除cookie   注册内容返回为原样
        _quit.click(function(){
            delCookie("username");
            var login = $("<a/>").html("登录");
            var reg = $("<a/>").html("注册");
            $(".zhuce").css({width:"90px",height:"50px",lineHeight:"50px",textAlign:"right",marginTop:0}).html([login,"/",reg]);
           // <a id="_denglu1" href="#">登录</a>/<a href="#">注册</a>
        })

    }

})
