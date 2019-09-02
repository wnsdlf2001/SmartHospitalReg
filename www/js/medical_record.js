$(document).ready(function () {
    var marginBottom = $('div.container_my').innerHeight();
    console.log(marginBottom);
    $('.contents').css("margin-bottom", marginBottom + "px");

    $.get( "http://13.124.174.108:3000/api/getUser",{
        user: localStorage.user
    }).done(function(data1){
        $.get( "http://13.124.174.108:3000/api/getDescriptList",{
            user: data1.id
        }).done(function(data){

            $.each(data, function(){
                var date = this.ddate.substring(0, 10);
                var f_id =this.FamilyId;
                var hosname ="";
                var partname="";
                var docname="";
                var hos_id = this.HospitalId;
                var doc_id = this.DoctorId;
                var img_src = this.DescriptFile.filename;
                $.get("http://13.124.174.108:3000/api/getHospital",{
                    id: hos_id
                }).done(function (hospital) {
                    hosname = hospital.name;
                    $.get("http://13.124.174.108:3000/api/getDoctor",{
                        id: doc_id
                    }).done(function (doctor) {
                        docname = doctor.name;
                        $.get("http://13.124.174.108:3000/api/getPart",{
                            id: doctor.PartId
                        }).done(function (part) {
                            partname = part.name;
                            $.get("http://13.124.174.108:3000/api/getFamilyList",{
                                user: localStorage.user
                            }).done(function (famlist) {
                                $.each(famlist, function () {
                                    if(this.id === f_id){
                                       var ul = "<li class=\"show_div\"><div class=\"prescription_show\" id=\"show_"+f_id+"\">\n" +
                                           "<div class=\"shut_down_img\">이미지를 누르면 닫힙니다.</div><img src=\"http://13.124.174.108:3000/uploads/descript/"+img_src+"\" class=\"uploaded\"/>"+
                                           "    </div></li><li class=\"add_subject_info\">\n" +
                                           "                <div class=\"element_list\">\n" +
                                           "                    <div class=\"list_name\">진료일시</div>\n" +
                                           "                    <div class=\"list_line\">"+date+"</div>\n" +
                                           "                </div>\n" +
                                           "                <div class=\"element_list\">\n" +
                                           "                    <div class=\"list_name\">진료대상</div>\n" +
                                           "                    <div class=\"list_line\">"+this.name+"</div>\n" +
                                           "                </div>\n" +
                                           "                <div class=\"element_list\">\n" +
                                           "                    <div class=\"list_name\">진료병원</div>\n" +
                                           "                    <div class=\"list_line\">"+hosname+"</div>\n" +
                                           "                </div>\n" +
                                           "                <div class=\"element_list\">\n" +
                                           "                    <div class=\"list_name\">진료과</div>\n" +
                                           "                    <div class=\"list_line\">"+partname+"</div>\n" +
                                           "                </div>\n" +
                                           "                <div class=\"element_list\">\n" +
                                           "                    <div class=\"list_name\">담당의사</div>\n" +
                                           "                    <div class=\"list_line\">"+docname+"</div>\n" +
                                           "                </div>\n" +
                                           "                <div class=\"element_button\">\n" +
                                           "                    <button type=\"button\" class=\"prescription\" id=\""+f_id+"\">처방전 보기</button>\n" +
                                           "                    <input type=\"file\" id=\"prescription_upload\" accept=\"file_extension|image/*\"/>\n" +
                                           "                </div>\n" +
                                           "            </li>";
                                       $(".add_subject_content").append(ul);

                                        var window_height = window.innerHeight;

                                        $(".prescription_show").css('height', window_height);

                                        $(".prescription").click(function(){
                                            var img_id = $(this).attr('id');
                                            $('#show_'+img_id).css('display','block');
                                        });

                                        $('.prescription_show').click(function(){
                                            $('.prescription_show').css('display','none');
                                        });
                                   }
                                });
                            });
                        });
                    });
                });
            });

        });
    });



    $('.close_btn').click(function(){
        $("#myModal2").dialog("close");
    });

    $('#logout_btn').click(function(){
        localStorage.autoLogin=false;
        delete localStorage.user;
        delete localStorage.password;
        document.location="index.html";
    });
});


