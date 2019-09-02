window.inFlag=1;

$(document).ready(function(){
    if(localStorage.user) $("input[name=id]").val(localStorage.user);
	if(localStorage.autoLogin=="true"){
		$("input[name=auto_login]").attr("checked", true);
		if(localStorage.password) $("input[name=password]").val(localStorage.password);

	}

	if(localStorage.autoLogin=="true"){
		$.get("http://13.124.174.108:3000/api/isLogin",{
            user: $("input[name=id]").val(),
            password: $("input[name=password]").val(),
            uuid: localStorage.uuid  // 이부분 순서 수정해야함 일단 가라로
        }).done(function(data){
            if(data.isLogin){
        		document.location="myaccount.html";
        	}
        	else{
        		if(data.isExist) alert("로그인 실패");
        		else alert("존재하지 않는 유저");
        	}
        });
	}

	$("input[name=auto_login]").click(function(){
		if(this.checked) localStorage.autoLogin=true;
		else localStorage.autoLogin=false; 
	});

	$("#start").click(function(){
		$.get("http://13.124.174.108:3000/api/isLogin",{
            user: $("input[name=id]").val(),
            password: $("input[name=password]").val(),
			uuid: localStorage.uuid // 이부분 순서 수정해야함 일단 가라로
        }).done(function(data){
        	if(data.isLogin){
				if($("input[name=auto_login]").is(":checked")){
					localStorage.autoLogin=true;
					localStorage.user=$("input[name=id]").val();
					localStorage.password=$("input[name=password]").val();
				}
				else{
					localStorage.autoLogin=false;
					localStorage.user=$("input[name=id]").val();
				}
        		document.location="myaccount.html";
        	}
        	else{
        		if(data.isExist) alert("로그인 실패");
        		else alert("존재하지 않는 유저");
        	}
        });
	});
});   
