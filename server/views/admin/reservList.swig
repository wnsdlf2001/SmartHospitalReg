{% extends 'layout.swig' %}

{% block title %}
    <h4 class="page-title">예약 현황</h4>
{% endblock %}

{% block body %}
    <div class="row">
        <div class="col-sm-12">
            <div class="white-box">
                <h3 class="box-title">예약 리스트</h3>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>예약일</th>
                                <th>예약자</th>
                                <th>진료과</th>
                                <th>담당의</th>
                                <th>환자명</th>
                                <th>성별</th>
                                <th>생년월일</th>
                                <th>비고</th>
                                <th>-</th>
                            </tr>
                        </thead>
                        {% for reserv in reservList %}
                        <thead>
                            <tr>
                                <th>{{ reserv.id }}</th>
                                <th>{{ reserv.rdate_ }}</th>
                                <th>{{ reserv.Family.User.name }}</th>
                                <th>{{ reserv.Doctor.Part.name }}</th>
                                <th>{{ reserv.Doctor.name }}</th>
                                <th>{{ reserv.Family.name }}</th>
                                <th>{{ reserv.Family.sex }}</th>
                                <th>{{ reserv.FamilyBirth_ }}</th>
                                <th>{{ reserv.text }}</th>
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

