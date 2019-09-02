 $(document).ready(function () {
    var marginBottom = $('div.container_my').innerHeight();
    console.log(marginBottom);
    $('.contents').css("margin-bottom", marginBottom + "px");

     if(localStorage.voice_check==="true"){
         $("input[name=voice_able]").attr("checked", true);
     }

    /*$('.gender').click(function(){
        var id = $(this).attr('id');
        console.log(id);
        if ( ( id == "male") && (id != null)) {
            $(this).addClass("active");
            $('#female').removeClass("active");
        }
        else{
            $(this).addClass("active");
            $('#male').removeClass("active");
        }
    });*/

    /*$('.sub_subject').click(function(){
        $('.remove').slideToggle("fast");
    });*/

    $('#myRange_2').on('change',function(){
        var val = $(this).val();
        val = val/10+8;
        $('#text_demo').css('font-size', val + 'pt').fadeIn("slow");
        localStorage.FontSize = val;
    });

    $("input[name=voice_able]").click(function(){
        if(this.checked){
            localStorage.voice_check=true;
        }
        else{
            localStorage.voice_check=false;
        }
    });

    $('#medical_record').click(function() {
        var url = "medical_record.html";
        $(location).attr('href', url);
    });

     $.get( "http://13.124.174.108:3000/api/getUser",{
         user: localStorage.user
     }).done(function(data){
         $("#account_id").text(data.user);
         $("#account_name").text(data.name);
         $("#account_address").text(data.address);
         $("#account_ph").text(data.phone);
         console.log(data);
     });

     $.get( "http://13.124.174.108:3000/api/getFamilyList",{
         user: localStorage.user
     }).done(function(data){
         if(data.length>1) {
             $.each(data, function(){
                 var family_id = this;
                 if(this.text !== "나"){
                     $.get("http://13.124.174.108:3000/api/getFamilyFile", {
                         FamilyId: family_id.id
                     }).done(function(imgdata){
                         console.log(imgdata);
                         if(imgdata.length === 1) {
                             $(".wrap_family").append("<div class=\"subject\" id=\"" + family_id.id + "\">\n" + "<img class=\"defaultimg\" src=\"http://13.124.174.108:3000/uploads/family/" + imgdata[0].filename + "\"/>\n" + "<p class=\"subjectname\" id=\"subject_" + family_id.id + "\">" + family_id.text + "</p>\n" + "</div>");
                         }
                         else{
                             $(".wrap_family").append("<div class=\"subject\" id=\"" + family_id.id + "\">\n" + "<img class=\"defaultimg\" src=\"img/default2@2x.png\"/>\n" + "<p class=\"subjectname\" id=\"subject_" + family_id.id + "\">" + family_id.text + "</p>\n" + "</div>");
                         }

                         $('#myModal2').dialog({
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

                         $("#myModal2").dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();

                         var del_subject = "";

                         $('.subject').click(function(){
                             var ele_id = $(this).attr('id');
                             if(ele_id !== 'my_account') {
                                 var subject_name = $('#subject_'+ele_id).text();
                                 for (var i = 1; i < data.length; i++) {
                                     if(data[i].text === subject_name){
                                         $("#modal_name").text(data[i].text);
                                         $("#modal_sex").text(data[i].sex);
                                         $("#modal_birth").text(data[i].birth.substring(0, 10));
                                         $("#modal_address").text(data[i].address);
                                         $("#modal_phone").text(data[i].phone);

                                         del_subject = data[i].text;
                                         break;

                                     }
                                 }

                                 $("#myModal2").dialog("open");
                             }
                         });

                         $('.family_cancel').click(function(){
                             for(var i=0;i<data.length;i++) {
                                 if(data[i].text === del_subject) {
                                     $.get("http://13.124.174.108:3000/api/delFamily", {
                                         id: data[i].id
                                     }).done(function (Deldata) {
                                         alert("대상을 삭제하였습니다.");
                                         $("#myModal2").dialog("close");
                                         location.reload();
                                     });
                                 }
                             }
                         });
                     });
                 }
             })
         }

         $('#myModal2').dialog({
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

         $("#myModal2").dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();

         var del_subject = "";

         $('.subject').click(function(){
             var ele_id = $(this).attr('id');
             if(ele_id !== 'my_account') {
                 var subject_name = $('#subject_'+ele_id).text();
                 for (var i = 1; i < data.length; i++) {
                     if(data[i].text === subject_name){
                         $("#modal_name").text(data[i].text);
                         $("#modal_sex").text(data[i].sex);
                         $("#modal_birth").text(data[i].birth.substring(0, 10));
                         $("#modal_address").text(data[i].address);
                         $("#modal_phone").text(data[i].phone);

                         del_subject = data[i].text;
                         break;

                     }
                 }

                 $("#myModal2").dialog("open");
             }
         });

         $('.family_cancel').click(function(){
             for(var i=0;i<data.length;i++) {
                 if(data[i].text === del_subject) {
                     $.get("http://13.124.174.108:3000/api/delFamily", {
                         id: data[i].id
                     }).done(function (Deldata) {
                         alert("대상을 삭제하였습니다.");
                         $("#myModal2").dialog("close");
                         location.reload();
                     });
                 }
             }
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


