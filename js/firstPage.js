
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

        if($sideBar.hasClass("right_left")){
            $sideBar.removeClass("right_left");
        }else{
            $sideBar.addClass("right_left");
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


    /*var use = getCookie("username");
    if(use !="" && use !=null){
        console.log(1);
        $("#yonghuming").html('你好');
    }*/
    //点击登录 到登录页面
    $("#_denglu1").click(function(){
        location.href = "http://localhost/html/login.html";
    })

    //点击图片到详情页面
    $(".detail_img").click(function(){
        localhost.href = "http://localhost/js/details.html";
    })




    $(function(){
        var _user = getCookie('username');
        //console.log(_user);
        if(_user != "" && _user != null){
           
        }else{
          
        }
    })

})
