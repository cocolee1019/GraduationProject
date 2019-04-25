<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="/css/fusionzoom.css">
<link rel="stylesheet" href="/css/globle.css">
<link rel="stylesheet" href="/css/toastr.css">
<link rel="stylesheet" href="/css/toastr.min.css">
<link rel="stylesheet" href="/css/components-md.css">
<link rel="stylesheet" href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css">
<script src="/js/jquery.js"></script>
<script src="/js/bootstrap.min.js"></script>
<script src="/js/jquery.validate.min.js"></script>
<script src="/js/global.js"></script>
<script src="/js/bootstrap-toastr/toastr.min.js"></script>
<link rel="stylesheet" href="/css/bootstrap-multiselect/css/bootstrap-multiselect.css">
<script src="/css/bootstrap-multiselect/js/bootstrap-multiselect.js"></script>
<script src="/css/bootstrap-multiselect/js/bootstrap-multiselect-collapsible-groups.js"></script> 

<title>企业任务分配系统</title>
<style type="text/css">
	.name-a {
  		margin-left: 0px;
	}
	.greetings-text {
 		margin-right: 0px;
  		margin-left: 0px;
	}
	 #helangFrame{
         height: 600px;
     }
     #helangFrame>iframe{
         height: 100%;
         width: 100%;
         border: #dddddd solid 1px;
         padding: 0;
         margin: 0;
     }
</style>
</head>

<body class="">
<div class="container">
    <div>
        <h2>企业任务分配系统</h2>
        <nav class="navbar navbar-default" id="helangNav">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">导航切换</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand">欢迎</a>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li class="dropdown">
                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">我的任务 <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="javascript:;" class="h_nav" id="" onclick="g.load('/task/toReceiveTaskCenterPage',this,null,'a_receivetaskCenter_tab');return false;">我收到的任务</a></li>
                                <li><a href="javascript:;" class="h_nav" id="taskCenter_table" onclick="g.load('/task/toTaskCenterPage',this,null,'a_taskCenter_tab');return false;"" >我发布的任务</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">组织架构设置 <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="javascript:;" class="h_nav" id="PositionCenter_table" onclick="g.load('/org/toPositionCenterPage',this,null,'a_positionCenter_tab');return false;">职位设置</a></li>
                                <li><a href="javascript:;" class="h_nav" id="OrgCenter_table" onclick="g.load('/org/toOrgCenter',this,null,'a_OrganitionCenter_tab');return false;" >部门设置</a></li>
                            </ul>
                        </li>
                         <li class="dropdown">
                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">系统设置 <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                            	<li><a href="javascript:;" class="h_nav" id="userCenter_table" onclick="g.load('/user/toUserCenter',this,null,'a_userCenter_tab');return false;">用户设置</a></li>
                                <li><a href="javascript:;" class="h_nav" id="roleCenter_table" onclick="g.load('/role/toRoleCenter',this,null,'a_roleCenter_tab');return false;">角色设置</a></li>
                            </ul>
                        </li>
                    </ul>

                    <ul class="nav navbar-nav navbar-right">
                        <li><p class="navbar-text greetings-text">${(nowTime>=4 && nowTime<6)?'凌晨好':(nowTime>=6 && nowTime<11)?'早上好':(nowTime>=11 && nowTime<14)?'中午好':(nowTime>=14 && nowTime<19)?'下午好':'晚上好'}，</p></li>
	                    <li class="dropdown">
	                    	<a href="#" class="dropdown-toggle" data-toggle="dropdown">
									<h id="h_name">${sessionScope.CURRENT_LOGIN_USER.lastName}</h>
								<b class="caret"></b>
							</a>
	                        <ul class="dropdown-menu">
	                            <li>
	                           <!--  <a href="javascript:;" class="h_nav" data-url=""> -->
	                            <a href="javascript:;" class="h_nav" id="userInfo_tab" onclick="g.load('/user/getUserInfo',this,null,'a_userInfo_tab');return false;">个人档案</a>
	                            </li>
	                            <li><a href="javascript:;" class="h_nav" onclick="g.load('/user/toUpdatePasswd',this,null,'a_updatePasswd_tab');return false;">修改密码</a></li>
	                        </ul>
	                   	</li>
                        <li>
                        	<a href="/logout"><span class="glyphicon glyphicon-log-out"></span> 登出</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
      	<!-- 选项卡加载 -->
      	<div id="page-wrapper" class="gray-bg dashbard-1">
      		<div class="row  border-bottom white-bg dashboard-header">
				<ul class="nav nav-tabs" id="navTabPanel">
				   <li class="active" data-id="div1">
					   	<a href="#div1" data-toggle="tab">
					   		<span>首页</span>
					   	</a>
				   </li>
				</ul>
				<div id="navTabPanelDiv" class="tab-content">
					<div id="div1" class="tab-pane fade active in">首页内容</div>
				</div>
			</div>
      	</div>
    </div>
    <div id="helangFrame"></div>
</div>

<!-- 公共主弹出框 -->
<div id="publicMainModal" class="modal fade bs-modal-lg" role="dialog" aria-hidden="true"></div>
<!-- 公共副弹出框 -->
<div id="publicAssistModal" class="modal fade bs-modal-lg" role="dialog" aria-hidden="true"></div>
<!-- <script type="text/javascript" src="/js/helangSingle.js"></script> -->
<!-- <script type="text/javascript">
    /* 调用插件 */
    $.helangSingle({
        url:"/user/info",
        title:"首页"
    });
</script> -->
</body>

<%-- 
<nav class="navbar navbar-default" role="navigation">
	<div class="container-fluid">
	<div class="navbar-header">
		<a class="navbar-brand" href="#">企业任务分配系统</a>
	</div>
	<div>
		<ul class="nav navbar-nav nav-tabs">
			<li class="active"><a href="#">我的任务</a></li>
			<shiro:hasRole name="SYSTEM_MANAGERMENT">
				<li class="dropdown">
				<a href="#" class="dropdown-toggle" data-toggle="dropdown">
					
					<b class="caret"></b>
				</a>
				<ul class="dropdown-menu">
					<li><a href="javascript:;" onclick="g.load('/user/info',this);return false;">用户设置</a></li>
					<li class="divider"></li>
					<li><a href="#">权限设置</a></li>
					<li class="divider"></li>
					<li><a href="#">组织构架设置</a></li>
				</ul>
			</li>
			</shiro:hasRole>
		</ul>
		<ul class="nav navbar-nav navbar-right">
			<li><p class="navbar-text greetings-text">${(nowTime>=4 && nowTime<6)?'凌晨好':(nowTime>=6 && nowTime<11)?'早上好':(nowTime>=11 && nowTime<14)?'中午好':(nowTime>=14 && nowTime<19)?'下午好':'晚上好'}，</p></li>
		 	<li class="dropdown">
				<a href="#" class="dropdown-toggle" data-toggle="dropdown">
					${sessionScope.CURRENT_LOGIN_USER.userName}
					<b class="caret"></b>
				</a>
				<ul class="dropdown-menu">
					<li><a href="#">个人档案</a></li>
					<li><a href="#">修改密码</a></li>
				</ul>
			</li>
		  <li><a href="/logout"><span class="glyphicon glyphicon-log-out"></span> 登出</a></li>
		</ul>
	</div>
	</div>
</nav> --%>
</html>