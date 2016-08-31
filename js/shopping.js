
var Shopping = {

    dom:{},
    init:function(){
        this.initDom();
        this.bindEvent();
        this.cookies();
        this.count();   //全选  全不选
        this.delete();  //点击删除  取消这一订单  移除当次cookie

        this.addOne();
    },

    initDom:function(){
        var dom = this.dom;
        dom.many = $(".many")
        dom.prev = $(".leftArrow");
        dom.next = $(".rightArrow");
        dom.width = $(".tuijian_good").width();
        dom.goShop = $(".go_shop");

    },

    bindEvent:function(){

        var dom = this.dom;
        
        //向左走一帧
        dom.prev.click(function(){

            var oneStep = dom.many.children().first().outerWidth();
          
            var nowLeft = dom.many.position().left;

            var ansower = nowLeft - oneStep;
            
            if(nowLeft <= -dom.many.children().length*oneStep + dom.width){
               
                dom.many.position().left = -dom.many.children().length*oneStep + dom.width;
            }else{

                dom.many.stop(true,false).animate({left:ansower});
            }
        })

        //向右走一帧
        dom.next.click(function(){

            var oneStep = dom.many.children().first().outerWidth();
          
            var nowLeft = dom.many.position().left;
            
            var ansower = nowLeft + oneStep;  
            
            if(nowLeft >= 0){
               
                dom.many.position().left = 0;
            }else{

                dom.many.stop(true,true).animate({left:ansower});

            }
        })

     //点击去选择商品
        dom.goShop.click(function(){
            window.open("http://localhost/index.html","去选购");
        })
    },

    cookies:function(){
        var str = getCookie("num");
      
        if(str !="" || str !=null){
            var nArr = JSON.parse(str);

            $(".goodList").show();
            $(".cart_null_next").hide();

            $.each(nArr,function(index,obj){
                
                var div = $("<div>/").addClass("list_promote f-cb");

                var leftDiv = $("<div/>").addClass("left_div");
               
                var ipt = $("<input type='checkbox' checked='checked'>").addClass("ipt_checkbox");
               
                var aaa = $("<a/>");
                var aImg = $("<img/>").addClass("cpImg").attr("src",obj.copyImg).appendTo(aaa);


                var $jsh = $("<div/>").addClass("jsh");

                var goodName = $("<p/>").html(obj.choiceName).addClass("good_name");

                var goodSize = $("<p/>").html(obj.choiceSize + ' / ' + obj.choiceColor).addClass("good_size");

                var threeA = $("<p/>").addClass("three_a");
                var a1 = $("<a/>").addClass("a_1");
                var a2 = $("<a/>").addClass("a_2");
                var a3 = $("<a/>").addClass("a_3");
                threeA.append([a1,a2,a3]);

                //数量

                var aPlus = $("<a/>").addClass("add_plus");
                var aReduce = $("<a/>").addClass("reduce_a");
                var iptNum = $("<input/>").addClass("input_num").val(obj.cout);
                var div2 = $("<div/>").addClass("count_list").append([aReduce,iptNum,aPlus]);

                //单价
                var divPrice = $("<div/>").addClass("div_price");
                var moneyP = $("<p>￥" + obj.getPrice + "</p>");
                var vip = $("<p><strong>玛瑙会员0%: ￥" + obj.getPrice + "</strong></p>");

                //积分
                var jfen = $("<div/>").html("￥ ").addClass("jfen");
                var fen = $("<span/>").html(1).addClass("fen");
                jfen.append(fen);

                //小计
                var jiMoney = $("<div/>").html("￥" + obj.getPrice).addClass("jiMoney");

                divPrice.append([moneyP,vip]);

                $jsh.append([goodName,goodSize,threeA]);
                leftDiv.append($jsh)
                div.append([ipt,aaa,leftDiv,div2,divPrice,jfen,jiMoney]);
                //$(".cart_null").append(div);
                div.appendTo($(".cart_null"));

            })
        }
    },
    
    count:function(){

        var choice = $(".ipt_checkbox");
        var allSelect = $(".lb").find("input");
        allSelect.prop("checked",true);
        
        //当所有的  按钮选中  全选按钮自动选中
        choice.click(function(){
            var isChecked = choice.filter(":checked");
            if(isChecked.length == choice.length){

                allSelect.prop("checked",true);

            }else{
                allSelect.prop("checked",false);
            }  
        })

        //点击全选按钮  全部选中  再次点击 全部取消
        allSelect.click(function(){
            var alreadyCheck =  $(this).prop("checked");
            choice.prop("checked",alreadyCheck);
        })

    },

    //删除整列 移除cookie
    delete:function(){

        var sureDel = $(".a_3");
        var threeA = $(".three_a");

        sureDel.click(function(){
            var ord = $(this).closest(".list_promote").index();
           
            $(this).closest(".list_promote").remove();
        //获取到cookie
            var str = getCookie("num");
           
            if(str !="" || str !=null){
                var nArr = JSON.parse(str);
               
                for(var i=0;i<nArr.length;i++){
                    if(ord-1 == i){
                        
                        nArr.splice(i, 1);
                        $(".plusOne").html(nArr.length);
                        $(".carCnt").html(nArr.length);
                        $(".carCnt").css("color","#f63");
                        $(".plusOne").css("color","#f63");
                        // if (nArr == []) {
                        //     delCookie('num');
                        // } else {
                        setCookie('num', JSON.stringify(nArr), 1);
                        // }
                    }
                }
            }
        })
    },

    //小计
    addOne:function(){

        var reduceOne = $(".reduce_a");
        var addMore = $(".add_plus");   //加
        var choice = $(".ipt_checkbox");

        //页面加载先计算小计
        $(".count_list .input_num").each(function(){
           
            var oneprice = $(this).parent().next($(".div_price")).children().eq(0).html().substring(1);
       
            $(this).closest($(".list_promote")).find(".jiMoney").html("￥" + $(this).val()*oneprice);
        })

        //页面加载时总计
        var totalMoney = $(".total_money");
        var total = 0 ;
        $('.cart_null .jiMoney').each(function() {
            var self = this;
            total += parseInt($(this).html().substring(1));
            totalMoney.html("￥" + total);

        })
    //按减号
        reduceOne.click(function(){
            
            var shu = $(this).next(".input_num")[0];
          
            if(shu.value <= 1){
                shu.value = 1;
            }else{
                shu.value--;
            }
          
            var onePrice = $(this).parent().next().children().eq(0);
            
            var mmoney = onePrice.html().substring(1);
            
            $(this).parent().nextAll('.jiMoney').html("￥" + mmoney*shu.value);

        //总计
            var total = 0;

            $('.cart_null .jiMoney').each(function() {
             
               total += parseInt($(this).text().substring(1));
            });

            totalMoney.html('￥' + total);
        })

        addMore.click(function(){
            
            var shu = $(this).prev(".input_num")[0];
            shu.value++;
            
            var onePrice = $(this).parent().next().children().eq(0);
            var mmoney = onePrice.html().substring(1);
            
            $(this).parent().nextAll('.jiMoney').html("￥" + mmoney*shu.value);

            var total = 0;

            $('.cart_null .jiMoney').each(function() {
             
                total += parseInt($(this).text().substring(1));
            });

            totalMoney.html('￥' + total);
        })

    //点击选择按钮时的变化
        var total = 0;
        $(".ipt_checkbox").click(function(){
            var ttm = parseInt(totalMoney.html().substring(1));

            total = parseInt($(this).nextAll(".jiMoney").html().substring(1));
            
            if($(this).prop("checked") == false){

                totalMoney.html("￥" + (ttm - total));
             
            }else if($(this).prop("checked") == true){

                totalMoney.html("￥" + (ttm + total));
            }
        })

    //点击全选按钮时的总价变化
        
        $(".lb").find("input").click(function(){
        
            if($(this).prop("checked")){
                var total = 0;
                $('.cart_null .jiMoney').each(function() {
             
                   total += parseInt($(this).text().substring(1));
                });
                totalMoney.html("￥" + total);
            }else{
                totalMoney.html("￥" + 0);
            }
        })



    //结算按钮  把总数设置cookie  结算页面获取
        $(".go_js").click(function(){

            var totalMoney = $(".total_money").html();
            setCookie("totalMoney",totalMoney,1);
            console.log("设置cookie成功")
            window.open("http://localhost/html/account.html");

        })
    }
}

$(function(){
    Shopping.init();

})