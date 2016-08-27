
var index = {

    dom:{},
    init:function(){
        this.initDom();
        this.bindEvent();
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
        
        //向前翻译帧
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
        //向后翻一帧
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

     //点击 去购物
        dom.goShop.click(function(){
            location.href = "http://localhost/index.html";
        })
    }
    

}

$(function(){
    index.init();

})