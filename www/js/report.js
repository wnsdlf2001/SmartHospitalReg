$(document).ready(function () {
    var marginBottom = $('div.container_my').innerHeight();
    console.log(marginBottom);
    $('.contents').css("margin-bottom", marginBottom + "px");

    $(".prescription").click(function(){
        $("input[id='prescription_upload']").click();
    });

    var window_height = window.innerHeight;

    $(".prescription_show").css('height', window_height);

    $('#prescription_upload').on('change', function(){
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('.prescription_show').css('display','block');
                $('.prescription_show').html("<div class=\"shut_down_img\">이미지를 누르면 닫힙니다.</div><img src=\""+e.target.result+"\" class=\"uploaded\"/>");
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

    $('.prescription_show').click(function(){
        $('.prescription_show').css('display','none');
    });
});