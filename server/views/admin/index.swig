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

    </head>
    <body>

        <!-- Preloader -->
        <div class="preloader">
            <div class="cssload-speeding-wheel"></div>
        </div>
        <section id="wrapper" class="login-register">
            <div class="login-box">
                <div class="white-box">
                    <form class="form-horizontal form-material" id="loginform" action="/admin/loginProc" method="post">
                        <h3 class="box-title m-b-20">Admin Sign In</h3>
                        <div class="form-group ">
                            <div class="col-xs-12">
                                <input name="user" class="form-control" type="text" required="" placeholder="Username">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12">
                                <input name="password" class="form-control" type="password" required="" placeholder="Password">
                            </div>
                        </div>
                        <div class="form-group text-center m-t-20">
                            <div class="col-xs-12">
                                <button class="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light" type="submit">Log In</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>  

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

    </body>
</html>