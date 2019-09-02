{% extends 'layout.swig' %}

{% block title %}
    <h4 class="page-title">처방 현황</h4>
{% endblock %}

{% block body %}
    <div class="row">
        <div class="col-sm-12">
            <div class="white-box">
                <h3 class="box-title">처방 리스트</h3>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>처방일</th>
                                <th>진료과</th>
                                <th>담당의</th>
                                <th>예약자</th>
                                <th>환자명</th>
                                <th>처방내용</th>
                                <th>처방전</th>
                            </tr>
                        </thead>
                        {% for descript in descriptList %}
                        <thead>
                            <tr>
                                <th>{{ descript.id }}</th>
                                <th>{{ descript.ddate_ }}</th>
                                <th>{{ descript.Doctor.Part.name }}</th>
                                <th>{{ descript.Doctor.name }}</th>
                                <th>{{ descript.User.name }}</th>
                                <th>{{ descript.Family.name }}</th>
                                <th>{{ descript.text }}</th>
                                <th>
                                	<a href="/uploads/descript/{{ descript.DescriptFile.filename }}">
                                		<button class="btn btn-block btn-rounded btn-info">보기</button>
                                	</a>
                                </th>
                            </tr>
                        </thead>
                        {% endfor %}
                    </table>
                </div>
            </div>
        </div>
    </div>
{% endblock %}
