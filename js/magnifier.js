

$(function(){

/*==========     放大镜    ==============*/

    var $smallPic = $(".magnifier");
    var $block = $(".block");
    var $bigPic = $(".bigPic");
    var $bigImg = $(".bigPic").find("img");


    $smallPic.on("mousemove",function(e){

        $block.show();
        $bigPic.show();
       
        e = e || event;
        nLeft = $smallPic.offset().left;
        nTop = $smallPic.offset().top;

        nX = e.pageX - nLeft - $block.width()/2;
        nY = e.pageY - nTop - $block.height()/2;

        if(nX<0){
            nX = 0;
        }else if(nX > $smallPic.width() - $block.width()){
            nX = $smallPic.width() - $block.width();
        }
        if(nY<0){
            nY = 0;
        }else if(nY > $smallPic.height() - $block.height()){
            nY = $smallPic.height() - $block.height();
        }

        $block.css({left:nX,top:nY,cursor:"move"});

        $bigImg.css({left:-2*nX,top:-2*nY})
    }).on("mouseout",function(){
        $block.hide();
        $bigPic.hide();
    })



/*==========     商品评论    ==============*/

    var oLi = $(".china_comment").children();
    

    oLi.on("click","a",function(){

        var $comment = $(".says");
        
        if ($(this).parent().parent().next().is(':hidden')) {
            $comment.hide();
            $(this).parent().parent().next().show();    
        } else {
            $comment.hide();
            $(this).parent().parent().next().hide();
        }
         // return false;
    })


    //商品数量选择
    //数量++
    $(".plus").click(function(){
       $(".shul")[0].value++;
        
    });

    //数量--
    $(".reduce").click(function(){
        if($(".shul")[0].value <= 1){
            $(".shul")[0].value = 1;
        }else{
            $(".shul")[0].value--;
        }
    })

    //点击购物车 跳到购物车界面

    $(".b2").click(function(){
        location.href = "http://localhost/html/shoppingCar.html";
    })


    //定义一个数组   储存cookie
  
   var arr = getCookie("num");
   
    console.log(arr)

    if(getCookie("num") == null || getCookie("num") == ""){
     
        arr = [];
    }else{

        arr = getCookie("num");
       
    }

    //点击加入购物车
    $(".join").click(function(){

        var cout = $(".shul").val();    //数量
        var choiceColor = $("#color").val();    //颜色
        var choiceSize = $("#size").val();  //尺寸
        var getPrice = $(".rmb").html();    //价格
        var choiceName = $(".choiceName").html();
        var copyImg = $(".copyImg");
       

        //如果这些选项都选择了  才操作
        if(choiceColor == "请选择颜色"){
            alert("请选择颜色");
            return false;
        }else if(choiceSize == "请选择尺寸"){
            alert("请选择尺寸");
            return false;
        }else{

            //克隆一张图片
            var cloneImg = copyImg.clone();
            //克隆的图片设置样式并写入页面
            cloneImg.css({
                position:"absolute",
                left:copyImg.offset().left,
                top:copyImg.offset().top,

            }).appendTo("body");

            cloneImg.animate({
                left:$(".side_bar").offset().left,
                top:$(".side_bar").offset().top + 180,
                width:0,
                height:0
            },800,function(){
                $(".plusOne")[0].innerHTML++;
                $(".carCnt")[0].innerHTML++;
                $(".carCnt").css("color","#f63");
                $(".plusOne").css("color","#f63");
                cloneImg.remove();

            })
            
            //定义一个对象 把需要储存的cookie 的值放到对象中  然后添加到数组

            var obj = {};
            obj.cout = cout;
            obj.choiceColor = choiceColor;
            obj.choiceSize = choiceSize;
            obj.getPrice = getPrice;
            obj.copyImg = copyImg;
            obj.choiceName = choiceName;
        
           
            arr.push(obj);
           
            //设置cookie
            setCookie("num",arr.join(";"),1);
            removeCookie("num")
            alert("设置成功")
        }
    })    

    
})