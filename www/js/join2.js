var makeId =  function(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var i = 0; i < 32; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

$(document).ready(function () {
    var asex;
    $('.gender').click(function(){
        var id = $(this).attr('id');
        console.log(id);
        if ( ( id == "male") && (id != null)) {
            $(this).addClass("active");
            $('#female').removeClass("active");
            asex= "남자";
        }
        else{
            $(this).addClass("active");
            $('#male').removeClass("active");
            asex="여자";
        }

    });
        var auser = document.getElementById("subject_id");
        var apassword=document.getElementById("subject_password");
        var aname=document.getElementById("subject_name");
        var abirth=document.getElementById("subject_birth");
        var aaddress=document.getElementById("subject_address");
        var aaddress_detail =document.getElementById("subject_address_detail");
        var aphone_front=document.getElementById("phone_number_front");
        var aphone_middle=document.getElementById("phone_number_middle");
        var aphone_end=document.getElementById("phone_number_end");

        $('.complete_btn').click(function(){
            console.log({
                user : auser.value,
                password : apassword.value,
                name: aname.value,
                sex: asex,
                birth: abirth.value,
                address: aaddress.value +" " +aaddress_detail.value,
                phone : aphone_front.value +"-"+aphone_middle.value +"-"+aphone_end.value
            });
            $.get( "http://13.124.174.108:3000/api/setUser",{
                user : auser.value,
                password : apassword.value,
                name: aname.value,
                sex: asex,
                birth: abirth.value,
                address: aaddress.value +" " +aaddress_detail.value,
                phone : aphone_front.value +"-"+aphone_middle.value +"-"+aphone_end.value
            }).done(function(result){
                console.log(result);
                alert("회원 가입이 완료되었습니다.");
                document.location.href="index.html";
            });
        })

    var id = makeId(); // 아이디값 생성
    document.getElementById("daumIframe").src="http://13.124.174.108:3000/api/daumJuso?id="+id; // 생성된 아이디값으로 iframe 주소 바꿔서 페이지 접속
    var interTmp = setInterval(function(){ // 0.1초마다 체크해서 주소 선택 완료됬으면
        // 여기서 iframe 없애야함
        $.get("http://13.124.174.108:3000/api/daumJusoGet",{
            "id": id
        }).done(function(data){
            if(data!=""&&data.length>3){
                $("#subject_address").val(data);
                $("#myModal_hospital").dialog("close");
                console.log(data);
                clearInterval(interTmp);
            }
        });
    },1000);

    $('#myModal_hospital').dialog({
        modal: true,
        autoOpen:false,
        resizable:false,
        closeOnEscape: true,
        show: {
            effect: "slide",
            direction: "up"
        },
        hide: {
            effect: "slide",
            direction: "down"
        },
        my: "center",
        at: "center",
        of: window
    });

    $("#myModal_hospital").dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();

    $('#subject_address').mouseover(function(){
        $("#myModal_hospital").dialog("open");
    });

    $('.close_btn').click(function(){
        $("#myModal_hospital").dialog("close");
    });


});


