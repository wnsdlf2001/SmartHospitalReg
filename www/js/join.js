function id_check(){
    var id=document.getElementById("subject_id").value;
    var idcheck=document.getElementById("element_idcheck");
    var chkStyle=/[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{3,10}$/;
    if(chkStyle.test(id)){
        idcheck.style.backgroundColor="#84d2e6";
        idcheck.innerHTML='사용 가능';
    }
    else{
        idcheck.style.backgroundColor="#F17676";
        idcheck.innerHTML='사용 불가능';
    }
}
function password_check(){
    var password=document.getElementById("subject_password").value;
    var passwordcheck=document.getElementById("element_passwordcheck");
    var chkStyle=/[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{6,}$/;
    if(chkStyle.test(password)){
        passwordcheck.style.backgroundColor="#84d2e6";
        passwordcheck.innerHTML="사용 가능";
    }
    else{
        passwordcheck.style.backgroundColor="#F17676";
        passwordcheck.innerHTML='사용 불가능';
    }
}
function repassword_check() {
    var password=document.getElementById("subject_password").value;
    var repassword=document.getElementById("subject_repassword").value;
    var repasswordcheck=document.getElementById("element_repasswordcheck");
    if(password==repassword){
        repasswordcheck.style.backgroundColor="#84d2e6";
        repasswordcheck.innerHTML='일치';
    }
    else{
        repasswordcheck.style.backgroundColor="#F17676";
        repasswordcheck.innerHTML='불일치';
    }
}
document.getElementById("subject_id").onkeyup=id_check;
document.getElementById("subject_password").onkeyup=password_check;
document.getElementById("subject_repassword").onkeyup=repassword_check;


