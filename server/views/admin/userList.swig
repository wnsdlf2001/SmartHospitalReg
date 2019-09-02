{% extends 'layout.swig' %}

{% block title %}
    <h4 class="page-title">환자 현황</h4>
{% endblock %}

{% block body %}
    <div class="row">
        <div class="col-sm-12">
            <div class="white-box">
                <h3 class="box-title">환자 리스트</h3>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>아이디</th>
                                <th>이름</th>
                                <th>성별</th>
                                <th>생일</th>
                                <th>연락처</th>
                                <th>주소</th>
                                <th>-</th>
                            </tr>
                        </thead>
                        {% for user in userList %}
                        <thead>
                            <tr>
                                <th>{{ user.id }}</th>
                                <th>{{ user.user }}</th>
                                <th>{{ user.name }}</th>
                                <th>{{ user.sex }}</th>
                                <th>{{ user.birth_ }}</th>
                                <th>{{ user.phone }}</th>
                                <th>{{ user.address }}</th>
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
