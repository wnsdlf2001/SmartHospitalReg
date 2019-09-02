$(document).ready(function() {
    var flag_1 = 0;
    var flag_2 = 0;
    var flag_3 = 0;
    var doctor_id; // for get timetable

    var final_doctor_id;
    var final_date;
    var final_rindex;
    var final_subject_id;
    var final_subject_name;
    var final_hospital_id;


    var button_joinus = document.getElementById('reserve_btn');
    button_joinus.disabled = true;

    var marginBottom = $('div.container_my').innerHeight();
    console.log(marginBottom);
    $('.contents').css("margin-bottom", marginBottom + "px");




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

                            /*final_subject_name = $(".subjectname_my").text();*/

                            final_subject_name = subject_name;
                            for(var i=0;i<data.length;i++) {
                                if(data[i].text === final_subject_name){
                                    final_subject_id = data[i].id;
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

    $.get( "http://13.124.174.108:3000/api/getHospitalList").done(function(data){
        console.log(data);

        for(var i=0;i<data.length;i++) {
            $(".famliyinfodialog .dialog_body .search_list").append("<p class=\"hospital_name\">"+data[i].name+"</p>");
        }

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

        $('#hospital_address').mouseover(function(){
            $("#myModal_hospital").dialog("open");
        });

        var original_content = $(".famliyinfodialog .dialog_body .search_list").html();

        $(".popup_search").on('keyup', function(){
            var searchresult = $("#popup_search").val();

            if(searchresult.length > 0){
                $(".hospital_name").css('display', 'none');
                $(".hospital_name:contains("+searchresult+")").css('display', 'inline-block');

                $(".hospital_name").click(function(){
                    var thistext = $(this).text();
                    $("#hospital_address").val(thistext);
                    $("#myModal_hospital").dialog("close");
                });
            }
            else{
                $(".famliyinfodialog .dialog_body .search_list").html(original_content);
                $(".hospital_name").click(function(){
                    var thistext = $(this).text();
                    $("#hospital_address").val(thistext);
                    $("#myModal_hospital").dialog("close");
                });
            }

        });

        $(".hospital_name").click(function(){
            var thistext = $(this).text();
            $("#hospital_address").val(thistext);
            $("#myModal_hospital").dialog("close");
            $("#department_sel").html("<option selected=\"selected\">진료과 선택</option>");
            $("#ul_schedule").css("display", "none");
            $("#doctor_sel").css("display", "none");
            $('input.time_choice').prop('checked', false);
            for(var i=0;i<data.length;i++) {
                if(data[i].name == thistext){
                    final_hospital_id = data[i].id;
                    $.get("http://13.124.174.108:3000/api/getPartList", {
                        name: data[i].name
                    }).done(function(departmentdata){
                        for(var i=0;i<departmentdata.length;i++) {
                            $("#department_sel").append("<option>"+departmentdata[i].name+"</option>");
                        }

                        $("#department_sel").css("display", "block");
                        $("#doctor_sel").css("display", "none");
                        $("#ul_schedule").css("display", "none");
                        $('input.time_choice').prop('checked', false);
                        $("#department_sel").on('change', function(){
                            var index = $("#department_sel option").index($("#department_sel option:selected"));
                            var selected_department = $("#department_sel option:selected").val();
                            if(index != 0){
                                flag_1=1;
                                for(var i=0;i<departmentdata.length;i++) {
                                    if(departmentdata[i].name == selected_department){
                                        $.get("http://13.124.174.108:3000/api/getDoctorList", {
                                            id: departmentdata[i].id
                                        }).done(function(docterdata){
                                            $("#doctor_sel").html("<option selected=\"selected\">진료의사 선택</option>");
                                            console.log(docterdata);
                                            for(var i=0;i<docterdata.length;i++) {
                                                $("#doctor_sel").append("<option>"+docterdata[i].name+"</option>");
                                            }

                                            $("#doctor_sel").css("display", "block");
                                            $("#ul_schedule").css("display", "none");
                                            $('input.time_choice').prop('checked', false);
                                            $("#doctor_sel").on('change', function(){
                                                var index = $("#doctor_sel option").index($("#doctor_sel option:selected"));
                                                var selected_doctor = $("#doctor_sel option:selected").val();
                                                if(index!=0){
                                                    flag_2=1;
                                                    for(var i=0;i<docterdata.length;i++) {
                                                        if(docterdata[i].name == selected_doctor){
                                                            doctor_id = docterdata[i].id;
                                                            var now = new Date();

                                                            var day = ("0" + now.getDate()).slice(-2);
                                                            var month = ("0" + (now.getMonth() + 1)).slice(-2);

                                                            var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

                                                            $('#reserve_date').val(today);

                                                            $("#ul_schedule").css("display", "block");
                                                            $('input.time_choice').prop('checked', false);

                                                            $("#reserve_date").on('change', function(){
                                                                var selected_date = $(this).val();
                                                                console.log(selected_date);
                                                                $(".reserve_tbl").css("display", "block");
                                                                $(".time_category").removeClass("possession");
                                                                $(".time_choice").attr('disabled', false);
                                                                $('input.time_choice').prop('checked', false);

                                                                $.get("http://13.124.174.108:3000/api/getReservDate", {
                                                                    DoctorId: doctor_id,
                                                                    rdate: selected_date
                                                                }).done(function(scheduledata){
                                                                    console.log(scheduledata);
                                                                    for(var i=0;i<scheduledata.length;i++) {
                                                                        var already_chk = scheduledata[i].rindex;
                                                                        already_chk +=1;
                                                                        $("#td_time_chk_"+already_chk).addClass("possession");
                                                                        $("#time_chk_"+already_chk).attr('disabled', true);
                                                                    }

                                                                    $('input.time_choice').on('change', function() {
                                                                        $('input.time_choice').not(this).prop('checked', false);

                                                                        $("td[class=time_category]").css('background-color', '#ffffff');
                                                                        $("td[class=time_category]").css('color', '#8E8E8E');

                                                                        if($("input[id^=time_chk_]:checkbox:checked").length>0){
                                                                            flag_3=1;
                                                                            var chk_id = $(this).attr('id');
                                                                            final_rindex = $(this).val()-1;
                                                                            $("#td_"+chk_id).css('background-color', '#84d2e6');
                                                                            $("#td_"+chk_id).css('color', '#ffffff');
                                                                        }
                                                                        else{
                                                                            flag_3=0;
                                                                        }

                                                                        if((flag_1==1) && (flag_2==1) && (flag_3==1)){
                                                                            button_joinus.disabled = false;
                                                                            $('#reserve_btn').removeClass('btn-reserve_incomplete').addClass('btn-reserve_complete');
                                                                        }
                                                                        else{
                                                                            button_joinus.disabled = true;
                                                                            $('#reserve_btn').removeClass('btn-reserve_complete').addClass('btn-reserve_incomplete');
                                                                        }
                                                                    });
                                                                });
                                                            });
                                                            break;
                                                        }
                                                    }
                                                }
                                                else{
                                                    flag_2=0;
                                                }

                                                if((flag_1==1) && (flag_2==1) && (flag_3==1)){
                                                    button_joinus.disabled = false;
                                                    $('#reserve_btn').removeClass('btn-reserve_incomplete').addClass('btn-reserve_complete');
                                                }
                                                else{
                                                    button_joinus.disabled = true;
                                                    $('#reserve_btn').removeClass('btn-reserve_complete').addClass('btn-reserve_incomplete');
                                                }
                                            });
                                        });
                                        break;
                                    }
                                }
                            }
                            else{
                                flag_1=0;
                            }

                            if((flag_1==1) && (flag_2==1) && (flag_3==1)){
                                button_joinus.disabled = false;
                                $('#reserve_btn').removeClass('btn-reserve_incomplete').addClass('btn-reserve_complete');
                            }
                            else{
                                button_joinus.disabled = true;
                                $('#reserve_btn').removeClass('btn-reserve_complete').addClass('btn-reserve_incomplete');
                            }
                        });
                    });
                    break;
                }
            }
        });
    });

    $('#reserve_btn').click(function(){
        final_doctor_id = doctor_id;
        final_date =  $("#reserve_date").val();
        //final_rindex = $("input[id^=time_chk_]:checkbox:checked").val()-1;

        $.get( "http://13.124.174.108:3000/api/setReserv",{
            rdate: final_date,
            rindex: final_rindex,
            text: final_subject_name,
            DoctorId: final_doctor_id,
            FamilyId: final_subject_id,
            HospitalId: final_hospital_id
        }).done(function(result){
            console.log(result);
            alert("예약이 완료되었습니다.");
            var url = "list.html";
            $(location).attr('href',url);
        });
    });

    var selected_subject = document.getElementsByClassName("subjectname_my");

    $('.close_btn').click(function(){
        $("#myModal_hospital").dialog("close");
    });
});
