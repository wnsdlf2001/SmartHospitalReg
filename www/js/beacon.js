

$(document).ready(function () {

    var voice_able = localStorage.getItem('voice_check');

    var url = "smart_reserve.html";

    if(voice_able === 'true'){
        url = "smart_voice.html";
    }


    $(".smart_button").click(function(){
        $(location).attr('href',url);
    });


    $.get("http://13.124.174.108:3000/api/getBeaconList",{
        HospitalId: localStorage.hospitalId
    }).done(function(hospitalinfo){
        console.log(hospitalinfo[0].text);
        var div = document.getElementById("hospital_intro");
        div.innerHTML = "'"+hospitalinfo[0].text +"'"+ " 에 내원하셨습니다."
        //$("#hospital_intro").text(hospitalinfo[0].text)
    });
});