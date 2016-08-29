
var index = {

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
        
        //ÏòÇ°·­ÒëÖ¡
        dom.prev.click(function(){

            var oneStep = dom.many.children().first().outerWidth();
          
            var nowLeft = dom.many.position().left;

            var ansower = nowLeft - oneStep;
            
             
            if(nowLeft <= -dom.many.children().length*oneStep + dom.width){
               
                dom.many.position().left = -dom.many.children().length*oneStep + dom.width;
            }else{

                dom.many.animate({left:ansower});
            }
        })
        //Ïòºó·­Ò»Ö¡
        dom.next.click(function(){

            var oneStep = dom.many.children().first().outerWidth();
          
            var nowLeft = dom.many.position().left;
            console.log(nowLeft)
            var ansower = nowLeft + oneStep;  
            console.log(ansower)
            if(nowLeft >= 0){
               
                dom.many.position().left = 0;
            }else{

                dom.many.animate({left:ansower});

            }
        })

     //µã»÷ È¥¹ºÎï
        dom.goShop.click(function(){
            location.href = "http://localhost/index.html";
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
                var moneyP = $("<p>" + obj.getPrice + "</p>");
                var vip = $("<p><strong>玛瑙会员0%: " + obj.getPrice + "</strong></p>");

                //积分
                var jfen = $("<div/>").html("￥ ").addClass("jfen");
                var fen = $("<span/>").html(1).addClass("fen");
                jfen.append(fen);

                //小计
                var jiMoney = $("<div/>").html(obj.getPrice).addClass("jiMoney");

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

    //删除整列
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
                    if(ord == (i+1)){
                        delCookie(nArr[i]);
                    }
                }
            }
        })
    },

    //小计
    addOne:function(){

        var reduceOne = $(".reduce_a");
        var addMore = $(".add_plus");   //加


        //总计
        var totalMoney = $(".total_money");
        totalMoney.html( $(".jiMoney").html());



        reduceOne.click(function(){
            
            var shu = $(this).next(".input_num")[0];
          
            if(shu.value <= 1){
                shu.value = 1;
            }else{
                shu.value--;
            }
          
            var onePrice = $(this).closest(".list_promote").find(".div_price").children().eq(0);
            
            var mmoney = onePrice.html().substring(1);
            
            $(".jiMoney").html("￥" + mmoney*shu.value);

                    //总计
            totalMoney.html( $(".jiMoney").html());

        })

        addMore.click(function(){
            
            var shu = $(this).prev(".input_num")[0];
            shu.value++;
            
            var onePrice = $(".div_price").children().eq(0);
            var mmoney = onePrice.html().substring(1);
            
            $(".jiMoney").html("￥" + mmoney*shu.value);

                    //总计
        totalMoney.html( $(".jiMoney").html());

        })

    }


}

$(function(){
    index.init();

})