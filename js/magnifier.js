$(function(){

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

        nX = e.clientX - nLeft - $block.width()/2;
        nY = e.clientY - nTop ;

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


})