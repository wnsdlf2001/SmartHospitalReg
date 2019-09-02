{% extends 'layout.swig' %}

{% block style %}
    <link href="/plugins/bower_components/custom-select/custom-select.css" rel="stylesheet" type="text/css" />
    <link href="/plugins/bower_components/bootstrap-select/bootstrap-select.min.css" rel="stylesheet" />
    <link href="/plugins/bower_components/multiselect/css/multi-select.css" rel="stylesheet" type="text/css" />
{% endblock %}

{% block title %}
    <h4 class="page-title">{{title}}123123</h4>
{% endblock %}

{% block body %}
    <div class="row">
        <div class="col-sm-12">
            <div class="white-box">
                <h3 class="box-title m-b-0">유저 푸쉬푸쉬 </h3>
                <p class="text-muted m-b-30 font-13"> 푸쉬하자요요요요요 </p>
                <form class="form" method="post" action="./pushProc">
                    <div class="form-group row">
                        <label for="example-text-input" class="col-2 col-form-label">유저</label>
                        <div class="col-10">
                            <select class="form-control select2" name="UserId">
                                {% for user in userList %}
                                    <option value="{{ user.id }}">{{ user.name }}</option>
                                {% endfor %}                                
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="example-email-input" class="col-2 col-form-label">제목</label>
                        <div class="col-10">
                            <input class="form-control" type="text" name="title" placeholder="요청 제목">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="example-url-input" class="col-2 col-form-label">내용</label>
                        <div class="col-10">
                            <input class="form-control" type="text" name="text" placeholder="요청 내용">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="example-url-input" class="col-2 col-form-label">데이터</label>
                        <div class="col-10">
                            <input class="form-control" type="text" name="data" placeholder="요청 데이터 ex) {isMove:true}">
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
