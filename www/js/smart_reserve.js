$(document).ready(function(){
    var family_id = -1;

    $(".subtitle").css('font-size', localStorage.FontSize+'pt');
    $(".extra_text").css('font-size', localStorage.FontSize+'pt');
    $("#part_doctor").css('font-size', localStorage.FontSize+'pt');
    $("#hospital_part").css('font-size', localStorage.FontSize+'pt');
    $(".subjectname").css('font-size', localStorage.FontSize+'pt');

    $.get( "http://13.124.174.108:3000/api/getFamilyList",{
        user: localStorage.user
    }).done(function(data){
        if(data.length>1){
            $.each(data, function(){
                if(this.text!=='나'){
                    var famdata = this;
                    $.get("http://13.124.174.108:3000/api/getFamilyFile",{
                        FamilyId: famdata.id
                    }).done(function (filedata) {
                        if(filedata.length != 0){
                            $(".wrap_family").append("<div class=\"subject\">\n" + "<img class=\"defaultimg img_click\" src=\"http://13.124.174.108:3000/uploads/family/"+filedata[0].filename+"\" id=\"subject_"+(famdata.id)+"\"/>\n" + "<p class=\"subjectname\" id=\"p_subject_"+(famdata.id)+"\">"+famdata.text+"</p>\n" + "</div>");
                        }
                        else{
                            $(".wrap_family").append("<div class=\"subject\">\n" + "<img class=\"defaultimg img_click\" src=\"img/default2@2x.png\" id=\"subject_"+(famdata.id)+"\"/>\n" + "<p class=\"subjectname\" id=\"p_subject_"+(famdata.id)+"\">"+famdata.text+"</p>\n" + "</div>");
                        }

                        $('.img_click').click(function(){
                            var img_id = $(this).attr('id');
                            console.log(img_id);
                            $("p[class=subjectname_my]").removeClass("subjectname_my").addClass("subjectname");
                            $("#p_"+img_id).removeClass("subjectname").addClass("subjectname_my");
                            $(this).removeClass("defaultimg").addClass("clicked_img");
                            $('.img_click').not(this).removeClass("clicked_img").addClass("defaultimg");
                            var subject_name =  $("#p_"+img_id).text();
                            console.log(subject_name);

                            var final_subject_name = subject_name;

                            for(var i=0;i<data.length;i++) {
                                if(data[i].text === final_subject_name){
                                    family_id = data[i].id;
                                    break;
                                }
                            }
                            /*
                            for(var i=0;i<data.length;i++) {
                                if(data[i].text == subject_name){
                                    final_subject_id = data[i].id;
                                    final_subject_name = data[i].text;
                                    break;
                                }
                            }*/
                        });
                    })
                }
            })
        }
    });
    $.get("http://13.124.174.108:3000/api/getBeaconList",{
        HospitalId: localStorage.hospitalId
    }).done(function(hospitalinfo){
    $.get("http://13.124.174.108:3000/api/getPartList",{
        name: hospitalinfo[0].text
    }).done(function (part_list) {

        for(var i=0;i<part_list.length;i++){
            $("#hospital_part").append("<option id=\""+part_list[i].id+"\">"+part_list[i].name+"</option>");
        }
        $("#hospital_part").change(function () {
            $("#part_doctor").remove();
            $(".hospital_detail").append("<select id=\"part_doctor\"><option>진료의사 선택</option></select>");
            var part_name = $(this).val();
            var part_id;
            for(var j=0;j<part_list.length;j++){
                if(part_list[j].name == part_name){
                    part_id = part_list[j].id;
                }
            }

            $("#hospital_part").css('font-size', localStorage.FontSize+'pt');

            $.get("http://13.124.174.108:3000/api/getDoctorList", {
                id: part_id
            }).done(function(doctor_list){
                for(var i=0;i<doctor_list.length;i++){
                    $("#part_doctor").append("<option>"+doctor_list[i].name+"</option>");
                }
                $("#part_doctor").css('font-size', localStorage.FontSize+'pt');
            });
        });
    });
    });

    function leadingZeros(n, digits) {
        var zero = '';
        n = n.toString();

        if (n.length < digits) {
            for (i = 0; i < digits - n.length; i++)
                zero += '0';
        }
        return zero + n;
    }

    $(".register_button").click(function () {
        var d= new Date();
        var date = leadingZeros(d.getFullYear(), 4) + '-' + leadingZeros(d.getMonth() + 1, 2) + '-' + leadingZeros(d.getDate(), 2) + ' ' + leadingZeros(d.getHours(), 2) + ':' + leadingZeros(d.getMinutes(), 2) + ':' + leadingZeros(d.getSeconds(), 2);
        var text = $(".extra_text").val();
        var doctor_name = $("#part_doctor").val();
        if(family_id === '-1'){
            alert("접수 대상을 설정해 주세요.");
        }
        else{
            $.get("http://13.124.174.108:3000/api/getBeaconList",{
                HospitalId: localStorage.hospitalId
            }).done(function(hospitalinfo){
            $.get("http://13.124.174.108:3000/api/getPartList",{
                name: hospitalinfo[0].text
            }).done(function (data) {
                for(var i=0; i<data.length;i++){
                    $.get("http://13.124.174.108:3000/api/getDoctorList",{
                        id: data[i].id
                    }).done(function (doctor_list) {
                        for(var j=0;j<doctor_list.length;j++){
                            if(doctor_list[j].name === doctor_name){
                                var doctor_id = doctor_list[j].id;
                                console.log(date+' '+text+' '+doctor_id+' '+family_id);
                                $.get("http://13.124.174.108:3000/api/setWait",{
                                    rdate: date,
                                    text: text,
                                    DoctorId: doctor_id,
                                    FamilyId: family_id
                                });
                                alert("접수가 완료되었습니다.");
                                //document.location.href = 'wait.html';
                            }
                        }
                    });
                }
            });
        });
        }
    })
});