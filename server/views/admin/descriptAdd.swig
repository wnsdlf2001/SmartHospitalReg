{% extends 'layout.swig' %}

{% block style %}
    <link href="/plugins/bower_components/custom-select/custom-select.css" rel="stylesheet" type="text/css" />
    <link href="/plugins/bower_components/bootstrap-select/bootstrap-select.min.css" rel="stylesheet" />
    <link href="/plugins/bower_components/multiselect/css/multi-select.css" rel="stylesheet" type="text/css" />
{% endblock %}

{% block title %}
    <h4 class="page-title">처방 등록</h4>
{% endblock %}

{% block body %}
    <div class="row">
        <div class="col-sm-12">
            <div class="white-box">
                <h3 class="box-title">처방전 등록하기</h3>
                <form class="form" method="post" action="./descriptAddProc" enctype="multipart/form-data">
                    <div class="form-group row">
                        <label for="example-text-input" class="col-2 col-form-label">환자</label>
                        <div class="col-10">
                            <select class="form-control select2" name="FamilyId">
                                {% for user in userList %}
	                                {% for family in user.Families %}
	                                    <option value="{{ family.id }}">{{ family.name }} 님 ({{user.name}} : {{family.text}})</option>
	                                {% endfor %}
                                {% endfor %}                                
                            </select>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="example-text-input" class="col-2 col-form-label">담당의</label>
                        <div class="col-10">
                            <select class="form-control select2" name="DoctorId">
                                {% for part in PartList %}
	                                {% for doctor in part.Doctors %}
	                                    <option value="{{ doctor.id }}">{{ part.name }} {{doctor.name}} 선생님</option>
	                                {% endfor %}
                                {% endfor %}                                
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="example-text-input" class="col-2 col-form-label">처방 내용</label>
                        <div class="col-10">
                            <textarea class="form-control" rows="5" name="title" placeholder="처방 내용을 상세히 적어주세요"></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="example-email-input" class="col-2 col-form-label">처방전 업로드</label>
                        <div class="col-10">
                            <input type="file" name="file">
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="offset-2 col-10">
                            <button type="submit" class="btn btn-info waves-effect waves-light m-t-10">전송</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
{% endblock %}

{% block script %}
    <script src="/plugins/bower_components/custom-select/custom-select.min.js" type="text/javascript"></script>
    <script src="/plugins/bower_components/bootstrap-select/bootstrap-select.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="/plugins/bower_components/multiselect/js/jquery.multi-select.js"></script>
    <script>
        jQuery(document).ready(function() {
            $(".select2").select2();
        });
    </script>

{% endblock %}
