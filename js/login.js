
$(function(){

    //导航菜单出现  隐藏
	var oList = $(".little_arrow");

	var mykede = $(".myKede");

	oList.hover(function(){
        $(this).children().eq(0).css("color","#f63")
        $(this).css("background","#fff");
		
		$(this).find("ul").show();
	
	},function(){
        $(this).find("ul").hide();
        $(this).children().eq(0).css("color","#666")
        $(this).css({background:"#f3f2f2",borderBottom:"1px solid #ccc"});
    })

    mykede.on("mouseenter","li",function(){
        $(this).css("text-decoration","underline")
        $(this).find("a").css("color","#f63")
    }).on("mouseleave","li",function(){
        $(this).css("text-decoration","none")
        $(this).find("a").css("color","#666")
    })


    //登录
    var remember = $(".gou");   //两个按钮

    //用户名 密码
    var username = $(".username input");
    var password = $(".password input");

    earnCookie();
    function earnCookie(){
        var user = getCookie("username");
        var pass = getCookie("password");

        if(user!="" && pass!=""){
            username.val(user);     //括号里放参数  为设置
            
            password.val(pass);
        }   
    }


    var auto = $(".auto input");
    
    auto.eq(1).click(function(){
        if($(this).prop("checked")==true){
            $(".feifa").show();
           
        }else{
            $(".feifa").hide();
        }
    })

    if(auto.eq(1).prop("checked") == true){
        earnCookie();
    }


    $(".denglu").click(function(){

        if(username.val() != "" && password.val() != ""){
            $.get("http://localhost/common/login.php",{name:username.val()},function(data){
                
                if(data && data.code == 1){
    
                    alert("用户名已存在,请注册新的用户");

                }else if(data.code == 0){

                    if(remember.prop("checked") == true){
        
                        setCookie("username",username.val(),7);
                        setCookie("password",password.val(),7);
                    }
                    alert("登录成功");
                    window.open("http://localhost/index.html");

                }

            },"json")
        }
    })


})

