{% extends 'layout.swig' %}

{% block title %}
    <h4 class="page-title">대기 리스트</h4>
{% endblock %}

{% block body %}
    <div class="row">
        <div class="col-md-3 col-sm-6">
            <div class="white-box">
	            {% for doctor in doctorList %}
	                {{ doctor.id }} {{ doctor.name }} <br>
	            {% endfor %}  
            </div>
        </div>
    </div>
{% endblock %}
