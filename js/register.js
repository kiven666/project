
var index = {

    dom:{},

    init:function(){
        this.initDom();
        this.bindEvent();

    },
    initDom:function(){
        var dom = this.dom;

        dom.yys = $(".yys");    //用户名
        dom.mm = $(".mm");  //密码
        dom.certainmm = $(".certainmm");    //确认密码
        dom.sub = $(".sub");    //提交注册

        dom.slider = $(".slider");  //滑动的块
        dom.empty = $(".empty");       //改变的背景色
        dom.slide = $(".slide");    //整个框

        dom.captcha = $(".picImg");
        dom.inp = $(".yanzhengma");

        dom.allIpt = $(".set").find("input");
    },

    bindEvent:function(){
        var dom = this.dom;

        dom.yys.blur(function(){
            console.log(909)   
            //用户名  不能为空  长度5-14  字母数字下划线开头
            if($(this).val() == ''){
                $(this).next(".error").html("用户名不能为空");
                return false;
            }else if(!/^\w{5,14}$/.test($(this).val())){
                $(this).next(".error").html("用户名只能以字母数字,下划线.并在5-14之间");

                return false;
            } else {

                $(this).next('.error').html('');
            }
            
        });


        dom.allIpt.focus(function(){
            $(this).addClass("boxShadow");
        })

        dom.mm.blur(function(){
            //密码  不能为空  长度6-16 
           
            if($(this).val() == ''){
                $(this).next(".error").html("密码不能为空");
                return false;
            }else if(!/.{6,16}/.test($(this).val())){
                $(this).next(".error").html("密码在6-16位");
                return false;
            } else {
                $(this).next('.error').html('');
            }

        });

        dom.certainmm.blur(function(){
            if($(this).val() != dom.mm.val()){

                $(this).next(".error").html("密码不一致");
                return false;
            }else{
                $(this).next('.error').html('');
            }
        });



        //滑动的事件

        dom.slider.on('mousedown', function(e){
                e = e || event;
                e.preventDefault();
                
                var offsetX = e.offsetX;
                var offsetY = e.offsetY;
                // console.log(offsetX,offsetY)
            dom.slide.on('mousemove', function(e){
                e = e || event;
                var nLeft = e.clientX - offsetX - $(this).offset().left;
                var nTop = e.clientY - offsetY - $(this).offset().top;
                
                if(nLeft<0){
                    nLeft = 0;
                }else if(nLeft > dom.slide.width() - dom.slider.width()){
                    nLeft = dom.slide.width() - dom.slider.width();
                }

                if(nTop <0 ){
                    nTop = 0;
                }else if(nTop > dom.slide.height() - dom.slider.height()){
                    nTop = dom.slide.height() - dom.slider.height();
                }

                dom.slider.css({left:nLeft,top:nTop - 1});
                dom.empty.width(nLeft);
                if(nLeft == dom.slide.width() - dom.slider.width()){

                    dom.empty.html("通过验证").css({textAlign:'center',color:"#fff"});
                    dom.sub.css({background:"#f63"});
                    
                }
            })
            dom.slider.mouseup(function(){
                dom.slide.off('mousemove');
                // console.log(dom.slide.mousemove);
            })
            
        })

        

        //"图片验证码"
        var numArr = ["YCLF","ADWI","VCOB","LIBI","TESQ","CDIC","UEIO","CGBO"];
        var imgArr = ["../images/ma1.jpg","../images/ma2.jpg","../images/ma3.jpg","../images/ma4.jpg","../images/ma5.jpg","../images/ma6.jpg","../images/ma7.jpg","../images/ma8.jpg"];
        
        var ord = parseInt(Math.random()*numArr.length);    //0-7的下标

        dom.captcha.attr("src",imgArr[ord]);
        dom.num = numArr[ord];

        dom.captcha.click(function(){
            var ord = parseInt(Math.random()*numArr.length);
            
            $(this).attr("src",imgArr[ord]);
            dom.num = numArr[ord];
        })


        dom.inp.blur(function(){

            if($(this).val().toUpperCase() == dom.num){
                console.log($(this).next(".error"))
                $(this).parent().find(".error").html("验证成功").css({color:"green"});
            }else{
                $(this).parent().find(".error").html("验证码错误");
            }
        })

    }

}

$(function(){
    index.init();
})