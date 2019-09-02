{% extends 'layout.swig' %}

{% block title %}
    <h4 class="page-title">담당의 현황</h4>
{% endblock %}

{% block body %}
    <div class="row">
        <div class="col-sm-12">
            <div class="white-box">
                <h3 class="box-title">담당의 리스트</h3>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>진료과</th>
                                <th>이름</th>
                                <th>비고</th>
                                <th>-</th>
                            </tr>
                        </thead>
                        {% for doctor in doctorList %}
                        <thead>
                            <tr>
                                <th>{{ doctor.id }}</th>
                                <th>{{ doctor.Part.name }}</th>
                                <th>{{ doctor.name }}</th>
                                <th>{{ doctor.text }}</th>
                                <th>(버튼)</th>
                            </tr>
                        </thead>
                        {% endfor %}
                    </table>
                </div>
            </div>
        </div>
    </div>
{% endblock %}
