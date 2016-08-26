
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

        var isName = false;
        var isPass = false;
        var eCode = false;
        var isCertain = false;
        var isSlide = false;
        var isExit = false;
        dom.yys.blur(function(){
            
            //用户名  不能为空  长度5-14  字母数字下划线开头
            if($(this).val() == ''){
                $(this).next(".error").html("用户名不能为空");
                return false;
            }else if(!/^\w{5,14}$/.test($(this).val())){
                $(this).next(".error").html("用户名只能以字母数字,下划线.并在5-14之间");

                return false;
            } else {

                $(this).next('.error').html('');

                $.get('http://localhost/common/checkname.php', {
                        name: dom.yys.val()
                    }, function(data) {

                        if (data && data.code == 0) {
                            isName = true;
                           
                        } else {

                            dom.yys.next(".error").html("用户名已存在");
                            isName = false;
                            isExit = true;
                        }

                }, 'json');
                return false;
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
                isPass = true;
            }

        });

        dom.certainmm.blur(function(){
            if($(this).val() != dom.mm.val()){

                $(this).next(".error").html("密码不一致");
                return false;
            }else{
                $(this).next('.error').html('');
                isCertain = true;
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

                dom.slider.css({left:nLeft,top:nTop});
                dom.empty.width(nLeft);
                if(nLeft == dom.slide.width() - dom.slider.width()){

                    dom.empty.html("通过验证").css({textAlign:'center',color:"#fff"});
                    dom.sub.css({background:"#f63"});
                    dom.slider.off("mousedown");
                    isSlide = true;
                }
            })
            $(document).mouseup(function(){
                dom.slide.off('mousemove');
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

                $(this).parent().find(".error").html("验证成功").css({color:"green"});
                eCode = true;
            }else{
                $(this).parent().find(".error").html("验证码错误");
            }
        })


        //用户注册验证ajax
        dom.read = $(".read input");
        dom.sub.click(function(){

            var usn = $(".yys").val();
            var psw = $(".mm").val();
            
            if(isName == false && isExit == true){
                alert("用户名已存在");
            }else if(isName == false){
                alert("用户名不能为空");
            }else if(isPass == false){
                 alert("密码不能为空");
            }else if(isCertain == false){
                 alert("密码不正确");
            }else if(isSlide == false){
                alert("请通过解锁验证");
            }else if(eCode == false){
                 alert("验证码错误");
            }else if(dom.read.prop("checked") !=true){
                alert("请阅读协议并同意后才能注册");
            }else{
                
                $.ajax({

                    type:"post",
                    url:"http://localhost/common/register.php",
                    dataType:"json",
                    data:{name:usn,password:psw},
                    success:function(data){
                        if(data && data.code == 0){
                            alert("注册成功！");
                            window.location.href = "login.html";
                        }else if(data.code == 1){
                            alert("抱歉,用户名已被抢占啦")
                        }
                        
                    }

                })
            }
        })

    }

}

$(function(){
    index.init();
})