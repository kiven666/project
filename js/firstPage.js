
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

})