$( document ).ready(function() {
    var marginBottom = $('div.container_my').innerHeight();
    console.log(marginBottom);
    $('.contents').css("margin-bottom", marginBottom + "px");

    $.get( "http://13.124.174.108:3000/api/getReserv",{
        user: localStorage.user
    }).done(function(reserve){
        $.each(reserve, function(){
            var time;
            var text=this.text;
            var rdate=(this.rdate).substring(0,10);
            var reserve_id = this.id;
            var part_name="";
            var hospital_name="";
            if(this.rindex == 0){
                time = "9 : 30 AM";
            }
            else if(this.rindex == 1){
                time = "10 : 00 AM";
            }
            else if(this.rindex == 2){
                time = "10 : 30 AM";
            }
            else if(this.rindex == 3){
                time = "11 : 00 AM";
            }
            else if(this.rindex == 4){
                time = "1 : 00 PM";
            }
            else if(this.rindex == 5){
                time = "1 : 30 PM";
            }
            else if(this.rindex == 6){
                time = "2 : 00 PM";
            }
            else if(this.rindex == 7){
                time = "2 : 30 PM";
            }
            else if(this.rindex == 8){
                time = "3 : 00 PM";
            }
            else if(this.rindex == 9){
                time = "3 : 30 PM";
            }
            else if(this.rindex == 10){
                time = "4 : 00 PM";
            }
            else if(this.rindex == 11){
                time = "4 : 30 PM";
            }
            else{
                time = "5 : 00 PM";
            }

            $.get("http://13.124.174.108:3000/api/getHospital",{
                id: this.HospitalId
            }).done(function(hospital){
                hospital_name = hospital.name
            });
            $.get("http://13.124.174.108:3000/api/getDoctor",{
                id: this.DoctorId
            }).done(function(part){
                $.get("http://13.124.174.108:3000/api/getPart",{
                    id: part.PartId
                }).done(function(part){
                    part_name = part.name;
                    var ul ="<ul class=\"add_subject_content\" id=\"ul" + reserve_id + "\"><li class=\"add_subject_info\"> <div class=\"element_list\"><div class=\"list_name\">접수대상</div><div class=\"list_line\"> " + text + "</div></div><div class=\"element_list\"> <div class=\"list_name\">접수일시</div><div class=\"list_line\"> " + rdate + "</div></div><div class=\"element_list\"><div class=\"list_name\">접수시간</div><div class=\"list_line\">" + time + "</div></div><div class=\"element_list\"><div class=\"list_name\">접수병원</div><div class=\"list_line\">" + hospital_name + "</div></div><div class=\"element_list\"><div class=\"list_name\">진료과</div><div class=\"list_line\">"+part_name+ "</div></div><div class=\"element_button\"><button type=\"button\" class=\"reserve_cancel\" id=\""+ reserve_id +"\"> 예약 취소 </button></div></li></ul>";
                    $('#list_contents').append(ul);
                    $("button").click(function(){
                        var reserve_id = this.id;
                        $.get("http://13.124.174.108:3000/api/delReserv",{
                            id: reserve_id
                        });
                        $("#ul"+this.id).hide();
                        alert("예약이 취소되었습니다.");
                        document.location.href = 'list.html';
                    });
                });
            });
        });
    });
});