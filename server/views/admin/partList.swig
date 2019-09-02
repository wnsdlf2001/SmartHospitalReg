{% extends 'layout.swig' %}

{% block title %}
    <h4 class="page-title">진료과 현황</h4>
{% endblock %}

{% block body %}
    <div class="row">
        <div class="col-sm-12">
            <div class="white-box">
                <h3 class="box-title">진료과 리스트</h3>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>진료과</th>
                                <th>의사수</th>
                                <th>비고</th>
                                <th>-</th>
                            </tr>
                        </thead>
                        {% for part in partList %}
                        <thead>
                            <tr>
                                <th>{{ part.id }}</th>
                                <th>{{ part.name }}</th>
                                <th>{{ part.count }}</th>
                                <th>{{ part.text }}</th>
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
