var Accout = {

    dom:{},

    init:function(){
        this.initDom();
        this.bindEvent();
        this.finalMoney();
    },

    initDom:function(){

        var dom = this.dom;
        dom.overlay = $(".overlay");
        dom.moreAdd = $(".moreAdd");
        dom.error = $(".error");
        dom.baocun = $(".baocun");
        dom.popover = $(".popover");
    },

    bindEvent:function(){
        var dom = this.dom;
        
        dom.moreAdd.click(function(){
            dom.overlay.show();
        })

        dom.baocun.click(function(){
            if($(".xingming").val() == ""){
                alert("姓名不能为空！");
                return false;
            }else if($(".s_province").val() == "省份"){
                alert("请选择省份！");
                return false;
            }else if($(".s_city").val() == "省份"){
                alert("请选择市区！");
                return false;
            }else if($(".s_county").val() == "省份"){
                alert("请选择县！");
                return false;
            }else if($(".stress") == ""){
                alert("请填写详细地址！")
                return false;
            }else if($(".phone") == ""){
                alert("请填写练习方式！")
                return false;
            }else{
                var coverP = $("<p/>").addClass("oneMsg");
                var spanNick = $("<span/>").html($(".xingming").val()).addClass("bord");
                
                var spanProvince = $("<span/>").html(" " + $("#s_province").val() + " ");
                var spanCity = $("<span/>").html($("#s_city").val() + " ");
                var spanCountry = $("<span/>").html($("#s_county").val() + " ");

                var detailAddress = $("<span/>").html($(".stress").val() + " ");
                var phone = $("<span/>").html($(".phone").val() + " ");

                coverP.append([spanNick,spanProvince,spanCity,spanCountry,detailAddress,phone]);

                ($(".addAddress")).before(coverP);

                $(".xingming").val("");
                $("#s_province").val("");
                $("#s_city").val("");
                $("#stress").val("");
                $(".stress").val("");
                $(".phone").val("");

                dom.overlay.hide();
            }
        });

        dom.error.click(function(){
            dom.overlay.hide();
        })

    },

    finalMoney:function(){

        var money = getCookie("totalMoney");
        console.log(money);
        $(".final_money").html(money.substring(1));

        $(".rightnow").click(function(){
            location.href = "http://localhost/html/success.html";
        })


    }

}

$(function(){

    Accout.init();

})