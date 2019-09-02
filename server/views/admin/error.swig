{% extends 'layout.swig' %}

{% block body %}
	{{ message }}<br><br>
	{{ error.status }}<br><br>
	{{ error.stack }}
{% endblock %}



