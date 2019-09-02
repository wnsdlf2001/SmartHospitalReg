<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">

		<meta name="description" content="skkuproj">
		<meta name="author" content="Kang Seonghyeon">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

		<link rel="icon" type="image/png" sizes="16x16" href="plugins/images/favicon.png">
		<title>똑똑접수 - 어드민</title>

	    <!-- Bootstrap Core CSS -->
	    <link href="/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
	    <link href="/plugins/bower_components/bootstrap-extension/css/bootstrap-extension.css" rel="stylesheet">
	    <!-- Menu CSS -->
	    <link href="/plugins/bower_components/sidebar-nav/dist/sidebar-nav.min.css" rel="stylesheet">
	    <!-- morris CSS -->
	    <link href="/plugins/bower_components/morrisjs/morris.css" rel="stylesheet">	    
	    <!-- animation CSS -->
	    <link href="/css/animate.css" rel="stylesheet">
	    <!-- Custom CSS -->
	    <link href="/css/style.css" rel="stylesheet">
	    <!-- color CSS -->
	    <link href="/css/colors/blue.css" id="theme" rel="stylesheet">
	    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
	    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	    <!--[if lt IE 9]>
		    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->

		{% block style %}{% endblock %}
	</head>
	<body>

	    <!-- Preloader -->
	    <div class="preloader">
	        <div class="cssload-speeding-wheel"></div>
	    </div>
	    <div id="wrapper">
	        <!-- Navigation -->
	        <nav class="navbar navbar-default navbar-static-top m-b-0">
	            <div class="navbar-header"> <a class="navbar-toggle hidden-sm hidden-md hidden-lg " href="javascript:void(0)" data-toggle="collapse" data-target=".navbar-collapse"><i class="ti-menu"></i></a>
	                <div class="top-left-part">
	                    <a class="logo" href="index.html"><b><img src="../plugins/images/eliteadmin-logo.png" alt="home" /></b><span class="hidden-xs"><strong>elite</strong>hospital</span></a>
	                </div>
	                <ul class="nav navbar-top-links navbar-right pull-right">

	                </ul>
	            </div>
	        </nav>
	        <!-- Left navbar-header -->
	        <div class="navbar-default sidebar" role="navigation">
	            <div class="sidebar-nav navbar-collapse slimscrollsidebar">
	                <ul class="nav" id="side-menu">
	                    <li class="user-pro">
	                        <a href="#" class="waves-effect"><img src="../plugins/images/users/d1.jpg" alt="user-img" class="img-circle"> <span class="hide-menu">병원이름 쓸곳<span class="fa arrow"></span></span>
	                        </a>
	                        <ul class="nav nav-second-level">
	                            <li><a href="javascript:void(0)"><i class="ti-user"></i> My Profile</a></li>
	                            <li><a href="javascript:void(0)"><i class="ti-email"></i> Inbox</a></li>
	                            <li><a href="javascript:void(0)"><i class="ti-settings"></i> Account Setting</a></li>
	                            <li><a href="javascript:void(0)"><i class="fa fa-power-off"></i> Logout</a></li>
	                        </ul>
	                    </li>

	                    <li class="nav-small-cap m-t-10">--- 병원 현황</li>
	                    <li> <a href="javascript:void(0);" class="waves-effect"><i class="ti-calendar p-r-10"></i> <span class="hide-menu"> 환자 <span class="fa arrow"></span></span></a>
	                        <ul class="nav nav-second-level">
	                            <li> <a href="userList">환자 현황</a> </li>
	                            <li> <a href="userAdd">환자 추가</a> </li>
	                        </ul>
	                    </li>
	                    <li> <a href="javascript:void(0);" class="waves-effect"><i class="ti-calendar p-r-10"></i> <span class="hide-menu"> 진료과 <span class="fa arrow"></span></span></a>
	                        <ul class="nav nav-second-level">
	                            <li> <a href="partList">진료과 현황</a> </li>
	                            <li> <a href="partAdd">진료과 추가</a> </li>
	                        </ul>
	                    </li>
	                    <li> <a href="javascript:void(0);" class="waves-effect"><i class="ti-calendar p-r-10"></i> <span class="hide-menu"> 담당의 <span class="fa arrow"></span></span></a>
	                        <ul class="nav nav-second-level">
	                            <li> <a href="doctorList">담당의 현황</a> </li>
	                            <li> <a href="doctorAdd">담당의 추가</a> </li>
	                        </ul>
	                    </li>

	                    <li class="nav-small-cap m-t-10">--- 진료 현황</li>
	                    <li> <a href="reservList" class="waves-effect"><i class="ti-calendar p-r-10"></i> <span class="hide-menu">예약 현황</span></a> </li>
	                    <li> <a href="waitList" class="waves-effect"><i class="ti-calendar p-r-10"></i> <span class="hide-menu">대기 현황</span></a> </li>
	                    <li> <a href="descriptList" class="waves-effect"><i class="ti-calendar p-r-10"></i> <span class="hide-menu">처방 현황</span></a> </li>

	                    <li class="nav-small-cap m-t-10">--- 관리 도구</li>
	                    <li> <a href="reservAdd" class="waves-effect"><i class="ti-calendar p-r-10"></i> <span class="hide-menu">예약 추가</span></a> </li>
	                    <li> <a href="waitAdd" class="waves-effect"><i class="ti-calendar p-r-10"></i> <span class="hide-menu">대기 추가</span></a> </li>
	                    <li> <a href="descriptAdd" class="waves-effect"><i class="ti-calendar p-r-10"></i> <span class="hide-menu">처방 등록</span></a> </li>
	                    <li> <a href="push" class="waves-effect"><i class="ti-calendar p-r-10"></i> <span class="hide-menu">유처 호출</span></a> </li>

	                    <li class="nav-small-cap m-t-10">--- 비톤 관리</li>
	                    <li> <a href="javascript:void(0);" class="waves-effect"><i class="ti-calendar p-r-10"></i> <span class="hide-menu"> 비콘 <span class="fa arrow"></span></span></a>
	                        <ul class="nav nav-second-level">
	                            <li> <a href="beaconList">비콘 리스트</a> </li>
	                            <li> <a href="beaconAdd">비콘 추가</a> </li>
	                        </ul>
	                    </li>

	                    <li><a href="logout" class="waves-effect"><i class="icon-logout fa-fw"></i> <span class="hide-menu">Log out</span></a></li>
	                </ul>
	            </div>
	        </div>
	        <!-- Left navbar-header end -->
	        <!-- Page Content -->
	        <div id="page-wrapper">
	            <div class="container-fluid">
	                <div class="row bg-title">
	                    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
	                    	{% block title %}{% endblock %}	                        
	                    </div>
	                    <!-- /.col-lg-12 -->
	                </div>
	                <!--row -->
	                {% block body %}{% endblock %}
	                <!--/row -->
	            </div>
	            <!-- /.container-fluid -->
	            <footer class="footer text-center"> 2017 &copy; Elite Admin brought to you by themedesigner.in </footer>
	        </div>
	        <!-- /#page-wrapper -->
	    </div>
		

	    <!-- jQuery -->
	    <script src="/plugins/bower_components/jquery/dist/jquery.min.js"></script>
	    <!-- Bootstrap Core JavaScript -->
	    <script src="/bootstrap/dist/js/tether.min.js"></script>
	    <script src="/bootstrap/dist/js/bootstrap.min.js"></script>
	    <script src="/plugins/bower_components/bootstrap-extension/js/bootstrap-extension.min.js"></script>
	    <!-- Menu Plugin JavaScript -->
	    <script src="/plugins/bower_components/sidebar-nav/dist/sidebar-nav.min.js"></script>
	    <!--slimscroll JavaScript -->
	    <script src="/js/jquery.slimscroll.js"></script>
	    <!--Wave Effects -->
	    <script src="/js/waves.js"></script>
	    <!--Morris JavaScript -->
	    <script src="/plugins/bower_components/raphael/raphael-min.js"></script>
	    <script src="/plugins/bower_components/morrisjs/morris.js"></script>
	    <!-- Sparkline chart JavaScript -->
	    <script src="/plugins/bower_components/jquery-sparkline/jquery.sparkline.min.js"></script>
	    <!-- jQuery peity -->
	    <script src="/plugins/bower_components/peity/jquery.peity.min.js"></script>
	    <script src="/plugins/bower_components/peity/jquery.peity.init.js"></script>
	    <!-- Custom Theme JavaScript -->
	    <script src="/js/custom.min.js"></script>
	    <script src="/js/dashboard1.js"></script>
	    <!--Style Switcher -->
	    <script src="/plugins/bower_components/styleswitcher/jQuery.style.switcher.js"></script>
		{% block script %}{% endblock %}
		<script>
			setInterval(function(){
				$.get( "/api/isClientCall", function( data ) {
					if(data&&data[0]) alert(data[0].user+"님이 호출하였습니다.");
				}, "json" );
			},300);

		</script>
	</body>
</html>