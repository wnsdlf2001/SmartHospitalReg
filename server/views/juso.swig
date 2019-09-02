

<div id="wrap">
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script>
    new daum.Postcode({
        oncomplete: function(data) {
			$.get( "http://13.124.174.108:3000/api/daumJusoDone",{
				id : "{{ id }}",
				data : data.address
			},function(data){
				
			});
        }
    }).embed(document.getElementById('wrap'));
</script>