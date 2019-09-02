$(document).ready(function(){
    $(function() {
        if (typeof webkitSpeechRecognition != 'function') {
            alert('크롬에서만 동작 합니다.');
            return false;
        }

        var recognition = new webkitSpeechRecognition();
        var isRecognizing = false;
        var ignoreOnend = false;
        var finalTranscript = '';
        //var audio = document.getElementById('audio');
        var $btnMic = $('#btn-mic');
        var $result = $('#result');
        //var $iconMusic = $('#icon-music');
        var img_id_one = $('#number_one');
        var img_id_two = $('#number_two');
        var img_id_three = $('#number_three');
        var total_result = [3];
        total_result = ["", "", ""];
        var family_id = -1;
        var department_id = -1;
        var doctor_id = -1;

        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onstart = function() {
            console.log('onstart', arguments);
            isRecognizing = true;
            $btnMic.attr('class', 'on btn btn-danger btn-lg');
        };

        recognition.onend = function() {
            console.log('onend', arguments);
            isRecognizing = false;

            if (ignoreOnend) {
                return false;
            }

            $btnMic.attr('class', 'off btn btn-danger btn-lg');
            if (!finalTranscript) {
                console.log('empty finalTranscript');
                return false;
            }

            /*if (window.getSelection()) {
                window.getSelection().removeAllRanges();
                var range = document.createRange();
                range.selectNode(document.getElementById('final_span'));
                window.getSelection().addRange(range);
            }*/
        };

        recognition.onresult = function(event) {
            console.log('onresult', event);

            var interimTranscript = '';
            if (typeof(event.results) === 'undefined') {
                recognition.onend = null;
                recognition.stop();
                return;
            }

            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            var height_of_span= $('#result').height();
            finalTranscript = capitalize(finalTranscript);
            $('#final_span').css('color', 'black').css("line-height",  (height_of_span+"px")).text(linebreak(finalTranscript));
            var img_one_src = img_id_one.attr('src');
            var img_two_src = img_id_two.attr('src');
            var img_three_src = img_id_three.attr('src');

            if(img_one_src === "img/number-one-in-a-circle.png"){
                total_result[0] = finalTranscript;
            }
            else if(img_two_src === "img/number-two-in-a-circle.png"){
                total_result[1] = finalTranscript;
            }
            else{
                total_result[2] = finalTranscript;
            }

            console.log('finalTranscript', finalTranscript);
            preCommand(finalTranscript);
        };

        function preCommand(string){
            var img_one_src = img_id_one.attr('src');
            var img_two_src = img_id_two.attr('src');
            var img_three_src = img_id_three.attr('src');
            if(img_one_src === "img/number-one-in-a-circle.png") {
                $.get("http://13.124.174.108:3000/api/getFamilyList", {
                    user: localStorage.user
                }).done(function (Fdata) {
                    console.log(Fdata);
                    var family_name = total_result[0].replace(/ /g, '')
                    family_id= -1;
                    for (var i = 0; i < Fdata.length; i++) {
                        if (Fdata[i].name === family_name || Fdata[i].text === family_name) {
                            family_id = Fdata[i].id;
                            break;
                        }
                    }

                    if(family_id === -1){
                        $('#final_span').css('color', 'red').text('등록되지 않은 대상입니다.');
                    }
                });
            }
            else if(img_two_src === "img/number-two-in-a-circle.png" || img_three_src === "img/number-three-in-a-circle.png"){
                $.get("http://13.124.174.108:3000/api/getPartList",{
                    name: 'XX 종합병원'
                }).done(function (data) {
                    console.log(data);
                    department_id = -1;
                    for(var i=0; i<data.length;i++){
                        if(data[i].name === total_result[1]) {
                            department_id = data[i].id;
                            break;
                        }
                    }

                    if(department_id === -1) {
                        $('#final_span').css('color', 'red').text('존재하지 않는 진료과입니다.');
                    }
                    else if(department_id !== -1 && img_two_src === "img/checked.png"){
                        var doctor_name = total_result[2].replace(/ /g, '');
                        doctor_id = -1;
                        $.get("http://13.124.174.108:3000/api/getDoctorList", {
                            id: department_id
                        }).done(function (doctor_list) {
                            console.log(doctor_list);
                            for (var j = 0; j < doctor_list.length; j++) {
                                if (doctor_list[j].name === doctor_name) {
                                    doctor_id = doctor_list[j].id;
                                    break;
                                }
                            }

                            if(doctor_id === -1){
                                $('#final_span').css('color', 'red').text('존재하지 않는 의사명입니다.');
                            }
                        });
                    }
                });
            }
        }

        recognition.onerror = function(event) {
            console.log('onerror', event);

            if (event.error === 'no-speech') {
                ignoreOnend = true;
            } else if (event.error === 'audio-capture') {
                ignoreOnend = true;
            } else if (event.error === 'not-allowed') {
                ignoreOnend = true;
            }

            $btnMic.attr('class', 'off btn btn-danger btn-lg');
        };

        var two_line = /\n\n/g;
        var one_line = /\n/g;
        var first_char = /\S/;

        function linebreak(s) {
            return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
        }

        function capitalize(s) {
            return s.replace(first_char, function(m) {
                return m.toUpperCase();
            });
        }

        function start(event) {
            if (isRecognizing) {
                recognition.stop();
                return;
            }
            recognition.lang = 'ko-KR';
            recognition.start();
            ignoreOnend = false;

            finalTranscript = '';
            $('#final_span').text('');
            //interim_span.innerHTML = '';
        }

        function textToSpeech(text) {
            console.log('textToSpeech', arguments);

            // simple version
            speechSynthesis.speak(new SpeechSynthesisUtterance(text));
        }

        /**
         * requestServer
         * key - AIzaSyDiMqfg8frtoZflA_2LPqfGdpjmgTMgWhg
         */
        function requestServer() {
            $.ajax({
                method: 'post',
                url: 'https://www.google.com/speech-api/v2/recognize?output=json&lang=en-us&key=3426053b7ba5e296cbdabca3be6029d2c2ff050e',
                success: function(data) {

                },
                error: function(xhr) {

                }
            });
        }

        $btnMic.click(start);

        textToSpeech($('.description').text());

        $('.category_detail').click(function() {
            textToSpeech($('.description').text());
        });

        $('.prev_text').click(function(){
            var img_one_src = img_id_one.attr('src');
            var img_two_src = img_id_two.attr('src');
            var img_three_src = img_id_three.attr('src');
            if(img_one_src !== "img/number-one-in-a-circle.png"){
                if(img_two_src === "img/number-two-in-a-circle.png"){
                    img_id_one.attr('src', "img/number-one-in-a-circle.png");
                    $('.description').html("접수할 대상의 저장된 이름 혹은 실명을 말씀해주세요. <span class=\"glyphicon glyphicon-volume-up\"></span>");
                    $('.response_examples').text("예시: 엄마, 홍길동");
                    textToSpeech($('.description').text());
                    $('#final_span').text(total_result[0]);
                }
                else{
                    if(img_three_src === "img/number-three-in-a-circle.png") {
                        img_id_two.attr('src', "img/number-two-in-a-circle.png");
                        $('.description').html("접수하고자 하는 진료과를 말씀해주세요. <span class=\"glyphicon glyphicon-volume-up\"></span>");
                        $('.response_examples').text("예시: 내과, 소아과");
                        textToSpeech($('.description').text());
                        $('#final_span').text(total_result[1]);
                    }
                    else{
                        img_id_three.attr('src', "img/number-three-in-a-circle.png");
                        $('.description').html("진료받고자 하는 의사의 실명을 말씀해주세요. <span class=\"glyphicon glyphicon-volume-up\"></span>");
                        $('.response_examples').text("예시: 김철수");
                        textToSpeech($('.description').text());
                        var height_of_span= $('#result').height();
                        $('#final_span').css("line-height",  (height_of_span+"px")).text(total_result[2]);
                        $('.next_text').text('다음');
                        var button_joinus = document.getElementById('btn-mic');
                        button_joinus.disabled = false;
                    }
                }
            }
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

        $('.next_text').click(function(){
            var img_one_src = img_id_one.attr('src');
            var img_two_src = img_id_two.attr('src');
            if($(this).text() === "접수하기"){
                var d=new Date();
                var date = leadingZeros(d.getFullYear(), 4) + '-' + leadingZeros(d.getMonth() + 1, 2) + '-' + leadingZeros(d.getDate(), 2) + ' ' + leadingZeros(d.getHours(), 2) + ':' + leadingZeros(d.getMinutes(), 2) + ':' + leadingZeros(d.getSeconds(), 2);
                console.log("접수할 내용: "+date + '\n' + '\n' + doctor_id + '\n' + family_id);
                $.get("http://13.124.174.108:3000/api/setWait", {
                    rdate: date,
                    DoctorId: doctor_id,
                    FamilyId: family_id
                }).done(function(){
                    var url = "wait.html";
                    alert("접수가 완료되었습니다.");
                    $(location).attr('href', url);
                });
                /*console.log("doctor_name: "+doctor_name);

                $.get( "http://13.124.174.108:3000/api/getFamilyList",{
                    user: localStorage.user
                }).done(function(Fdata){
                    console.log(Fdata);
                    var family_name = total_result[0].replace(/ /g, '');
                    for(var i=0;i<Fdata.length;i++){
                        if(Fdata[i].name === family_name || Fdata[i].text === family_name){
                            family_id = Fdata[i].id;
                        }
                    }
                });

                $.get("http://13.124.174.108:3000/api/getPartList",{
                    name: 'XX 종합병원'
                }).done(function (data) {
                    console.log(data);
                    for(var i=0; i<data.length;i++){
                        if(data[i].name === total_result[1]) {
                            $.get("http://13.124.174.108:3000/api/getDoctorList", {
                                id: data[i].id
                            }).done(function (doctor_list) {
                                console.log(doctor_list);
                                for (var j = 0; j < doctor_list.length; j++) {
                                    if (doctor_list[j].name === doctor_name) {
                                        var doctor_id = doctor_list[j].id;

                                        if(family_id !== -1) {
                                            console.log("접수: "+date + ' ' + ' ' + doctor_id + ' ' + family_id);
                                            $.get("http://13.124.174.108:3000/api/setWait", {
                                                rdate: date,
                                                text: null,
                                                DoctorId: doctor_id,
                                                FamilyId: family_id
                                            }).done(function(){
                                                var url = "wait.html";
                                                alert("접수가 완료되었습니다.");
                                                $(location).attr('href', url);
                                            });
                                        }

                                        break;
                                    }
                                }
                            });
                        }
                    }
                });
                */
            }
            else if(img_one_src === "img/number-one-in-a-circle.png"){
                if($('#final_span').text()!=="등록되지 않은 대상입니다." && $('#final_span').text()!==''){
                    //total_result[0] = $('#final_span').text();
                    img_id_one.attr('src', 'img/checked.png');
                    $('.description').html("접수하고자 하는 진료과를 말씀해주세요. <span class=\"glyphicon glyphicon-volume-up\"></span>");
                    $('.response_examples').text("예시: 내과, 소아과");
                    textToSpeech($('.description').text());
                    $('#final_span').text(total_result[1]);
                }
            }
            else if (img_two_src === "img/number-two-in-a-circle.png") {
                if ($('#final_span').text() !== '존재하지 않는 진료과입니다.' && $('#final_span').text()!=='') {
                    //total_result[1] = $('#final_span').text();
                    img_id_two.attr('src', 'img/checked.png');
                    $('.description').html("진료받고자 하는 의사의 실명을 말씀해주세요. <span class=\"glyphicon glyphicon-volume-up\"></span>");
                    $('.response_examples').text("예시: 김철수");
                    textToSpeech($('.description').text());
                    $('#final_span').text(total_result[2]);
                }
            }
            else{
                if($('#final_span').text() !== '존재하지 않는 의사명입니다.' && $('#final_span').text()!=='') {
                    //total_result[2] = $('#final_span').text();
                    img_id_three.attr('src', 'img/checked.png');
                    $('.description').html("다음 입력된 정보로 접수하시겠습니까? <span class=\"glyphicon glyphicon-volume-up\"></span>");
                    $('.response_examples').text("");
                    textToSpeech($('.description').text());
                    var font_of_span=$("#result").css('fontSize');
                    console.log(font_of_span);
                    $('#final_span').css("line-height", font_of_span).html("이름: "+total_result[0]+"<br>"+"진료과: "+total_result[1]+"<br>"+"진료의사: "+total_result[2]);
                    $(this).text('접수하기');
                    var button_joinus = document.getElementById('btn-mic');
                    button_joinus.disabled = true;
                }
            }
        });
    });
});