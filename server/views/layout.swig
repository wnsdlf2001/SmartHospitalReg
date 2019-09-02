<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">

		<meta name="description" content="skkuproj">
		<meta name="author" content="Kang Seonghyeon">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

		<title>똑똑접수</title>

		<link rel="stylesheet" href="/components/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="/components/bootstrap/css/bootstrap-theme.min.css">
		<link rel="shortcut icon" href="/img/favicon/favicon.ico">

		{% block style %}{% endblock %}

		{% if env !== 'development' %}
		{% endif %}

	</head>
	<body>

		{% block body %}{% endblock %}

		{% block script %}{% endblock %}

		{% if env === 'development' %}
		{% endif %}

	</body>
</html>