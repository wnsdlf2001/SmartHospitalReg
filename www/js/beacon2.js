$(document).ready(function () {
    $('#beacon_dialog').dialog({
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

    $("#beacon_dialog").dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();

    $("#beacon_dialog").dialog("open");

    $('.dialog_ok').click(function(){
        $("#beacon_dialog").dialog("close");
        document.location.href="wait.html";
    });
    var marginBottom = $('div.container_my').innerHeight() + $(window).height()*0.03;
    console.log(marginBottom);
    $('.contents_wait').css("margin-bottom", marginBottom + "px");

    $.get("http://13.124.174.108:3000/api/getWait",{
        user:localStorage.user
    }).done(function(data){
        if(data.id === null ){
            alert("접수 현황이 존재하지 않습니다");
            document.location.href="myaccount.html";
        }
        else {
            $.get("http://13.124.174.108:3000/api/getDoctor", {
                id: data.DoctorId
            }).done(function (docdata) {
                $("#wait_doctor").text(docdata.name);
                console.log(docdata);
                $.get("http://13.124.174.108:3000/api/getHospital", {
                    id: docdata.HospitalId
                }).done(function (hosdata) {
                    $("#wait_hospital").text(hosdata.name);
                    console.log(hosdata);
                });
                $.get("http://13.124.174.108:3000/api/getPart", {
                    id: docdata.PartId
                }).done(function (partdata) {
                    $("#wait_department").text(partdata.name);
                    console.log(partdata);
                });
            });
            $("#wait_target").text(data.Family.name);
            $("#dialog_name").text("\""+data.Family.name+"\"님, 진료 차례입니다.");
            $("#wait_date").text(data.rdatetime.substring(0, 10) + " " + data.rdatetime.substring(11, 16));
            $("#waiting_number").text(data.waitCnt);
            $("#waiting_time").text("예상 대기시간 : " + data.waitCnt * 10 + "분");

            $('.reception_cancel').click(function () {
                $.get("http://13.124.174.108:3000/api/delWait", {
                    id: data.id
                }).done(function (result) {
                    console.log(result);
                    alert("접수가 취소되었습니다");
                })
            });
            console.log(data);
        }
    });



});