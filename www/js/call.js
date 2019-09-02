$(document).ready(function () {
    var marginBottom = $('div.container_my').innerHeight();
    console.log(marginBottom);
    $('.contents').css("margin-bottom", marginBottom + "px");

    $('.call_button').click(function() {
        $.get( "http://13.124.174.108:3000/api/getUser",{
            user: localStorage.user
        }).done(function(data) {
            $.get("http://13.124.174.108:3000/api/clientCall", {
                user: data.id
            }).done(function () {
                document.location.href = "call_process.html";
            });
        });
    });
});