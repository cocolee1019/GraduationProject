<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<script type="text/javascript" src="js//datepicker/WdatePicker.js"></script>
<style>  
	.error{
		color:red;
	}
</style>
<div class="page-container page_size_control">
	<div class="container invite_box form-horizontal" >
		<div class="form-body" id="showUserInfo">
			<div class="portlet light bordered">
				<div class="portlet-title" style="border:none;">
					<div class="caption">
						<i class="fa fa-dashcube"></i>基本信息
					</div>
				</div>
				<div class="portlet-body form form-horizontal">
						<div class="row enterprise-border">
							<div class="col-md-6">
								<div class="form-group ">
									<label class="control-label col-md-5">姓名</label>
									<div class="col-md-7">
										<p class="form-control-static">
											${user.firstName}&nbsp;${user.lastName}
										</p>
									</div>
								</div>
							</div>
						</div>
						<div class="row enterprise-border">
							<div class="col-md-6">
								<div class="form-group ">
									<label class="control-label col-md-5">性别</label>
									<div class="col-md-7">
										<p class="form-control-static">
											${user.gender==false?"女":"男" }
										</p>
									</div>
								</div>
							</div>
						</div>
						<div class="row enterprise-border">
							<div class="col-md-6">
								<div class="form-group ">
									<label class="control-label col-md-5">E-mail</label>
									<div class="col-md-7">
										<p class="form-control-static">
											${user.email==null?"-":user.email}
										</p>
									</div>
								</div>
							</div>
						</div>
						<div class="row enterprise-border">
							<div class="col-md-6">
								<div class="form-group ">
									<label class="control-label col-md-5">联系电话</label>
									<div class="col-md-7">
										<p class="form-control-static">
											${user.phone==null?"-":user.phone}
										</p>
									</div>
								</div>
							</div>
						</div>
						<div class="row enterprise-border">
							<div class="col-md-6">
								<div class="form-group ">
									<label class="control-label col-md-5">出生年月</label>
									<div class="col-md-7">
										<p class="form-control-static">
											<fmt:formatDate value="${user.birthday}" pattern="yyyy-MM-dd"/> 
										</p>
									</div>
								</div>
							</div>
						</div>
						<div class="row enterprise-border">
							<div class="col-md-6">
								<div class="form-group ">
									<label class="control-label col-md-5">所在部门</label>
									<div class="col-md-7">
										<p class="form-control-static">
											${user.departmentName==null?"-":user.departmentName }
										</p>
									</div>
								</div>
							</div>
						</div>
						<div class="row enterprise-border">
							<div class="col-md-6">
								<div class="form-group ">
									<label class="control-label col-md-5">职位</label>
									<div class="col-md-7">
										<p class="form-control-static">
											${user.positionName==null?"-":user.positionName }
										</p>
									</div>
								</div>
							</div>
						</div>
						<div class="row enterprise-border">
							<div class="col-md-6">
								<div class="form-group ">
									<label class="control-label col-md-5">入职日期</label>
									<div class="col-md-7">
										<p class="form-control-static">
											<c:if test="${user.createTime ne null}">
												<fmt:formatDate value="${user.createTime }" pattern="yyyy-MM-dd"/>
											</c:if>
											<c:if test="${user.createTime eq null}">
												-
											</c:if>
										</p>
									</div>
								</div>
							</div>
						</div>
						<div class="row enterprise-border">
							<div class="col-md-6">
								<div class="form-group ">
									<label class="control-label col-md-5">账号角色</label>
									<div class="col-md-7">
										<p class="form-control-static">
											${roles==null?"-":roles}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>	<!-- form body -->
			</div>
			<div class="form_operate_box">
				<button type="button"id="userinfomodf" class="btn blue save-button-cofig" id="mybuttonmoy" onclick="openEditPlan()"><i class="fa fa-check"></i>
				修改</button>
			</div>
		</div>
		
		<div class="page-content invite_box"  id="editUserInfo" style="display: none;">
			<form id="modifyInfoForm" method="POST">
				<div class="portlet light bordered">
					<div class="portlet-title" style="border:none;">
						<div class="caption">
							<i class="fa fa-dashcube"></i>基本信息
						</div>
						<div class="tools">
							<a href="javascript:;" class="collapse"> </a>
						</div>
					</div> <!-- portlet-title -->
					<div class="portlet-body form form-horizontal">
							<div class="row enterprise-border">
								<div class="col-md-6">
									<div class="form-group ">
										<label class="control-label col-md-5">姓-名</label>
										<div class="col-md-2">
											<input type="text" class="form-control" data-required="1"
											name="firstName" value="${user.firstName}" />
										</div>
										<div class="col-md-5">
											<input type="text" id="form_userName" class="form-control" data-required="1"
											name="lastName" value="${user.lastName}" />
										</div>
									</div>
								</div>
							</div>
							<div class="row enterprise-border">
								<div class="col-md-6">
									<div class="form-group ">
										<label class="control-label col-md-5">性别</label>
										<div class="col-md-7">
											<label class="radio-inline">
												<input type="radio" name="gender" value="true" ${user.gender!=false?'checked':'' }>男
											</label>
											&nbsp;&nbsp;
											<label class="radio-inline">
												<input type="radio" name="gender" value="false" ${user.gender==false?'checked':'' }>女
											</label>
										</div>
									</div>
								</div>
							</div>
							<div class="row enterprise-border">
							<div class="col-md-6">
								<div class="form-group ">
									<label class="control-label col-md-5">E-mail</label>
									<div class="col-md-7">
										<input type="text" name="email" class="form-control" value="${user.email}" readonly>
									</div>
								</div>
							</div>
						</div>
						<div class="row enterprise-border">
							<div class="col-md-6">
								<div class="form-group ">
									<label class="control-label col-md-5">联系电话</label>
									<div class="col-md-7">
										<input type="text" name="phone" class="form-control" value="${user.phone}">
									</div>
								</div>
							</div>
						</div>
						<div class="row enterprise-border">
							<div class="col-md-6">
								<div class="form-group ">
									<label class="control-label col-md-5">出生年月</label>
									<div class="col-md-7">
										<input type="text" name="birthday" class="Wdate form-control" value="<fmt:formatDate value="${user.birthday}" pattern="yyyy-MM-dd"/>" onClick="WdatePicker({realDateFmt:'yyyy-MM-dd',dateFmt:'yyyy-MM-dd',startDate:'1995-01-01'})">
									</div>
								</div>
							</div>
						</div>
						<div class="row enterprise-border">
							<div class="col-md-6">
								<div class="form-group ">
									<label class="control-label col-md-5">所在部门</label>
									<div class="col-md-7">
										<p class="form-control-static">
											${user.departmentName==null?'-':user.departmentName }
										</p>
									</div>
								</div>
							</div>
						</div>
						<div class="row enterprise-border">
							<div class="col-md-6">
								<div class="form-group ">
									<label class="control-label col-md-5">职位</label>
									<div class="col-md-7">
										<p class="form-control-static">
											${user.positionName==null?'-':user.positionName }
										</p>
									</div>
								</div>
							</div>
						</div>
						<div class="row enterprise-border">
							<div class="col-md-6">
								<div class="form-group ">
									<label class="control-label col-md-5">入职日期</label>
									<div class="col-md-7">
										<p class="form-control-static">
											<c:if test="${user.createTime ne null}">
												<fmt:formatDate value="${user.createTime }" pattern="yyyy-MM-dd"/>
											</c:if>
											<c:if test="${user.createTime eq null}">
												-
											</c:if>
										</p>
									</div>
								</div>
							</div>
						</div>
						<div class="row enterprise-border">
							<div class="col-md-6">
								<div class="form-group ">
									<label class="control-label col-md-5">账号角色</label>
									<div class="col-md-7">
										<p class="form-control-static">
											${roles==null?"-":roles}
										</p>
									</div>
								</div>
							</div>
						</div>
						</div>  <!-- portlet-body -->
				</div><!-- portlet light bordered -->
				<div class="form_operate_box">
					<div class="row enterprise-border">
						 <div class="form_operate_box">
							<button type="submit" class="btn green save-button-sku-add" >
							<i class="fa fa-check"></i>确定</button>
							<button type="button" class="btn cancel-btn" onclick="closePlan()">
							<i class="fa fa-times"></i>取消</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

<script type="text/javascript">
	openEditPlan = function(){
		$("#showUserInfo").hide();
		$("#editUserInfo").show();
	};
	closePlan = function(){
		$("#showUserInfo").show();
		$("#editUserInfo").hide();
	};
	$(function(){
		$("#modifyInfoForm").validate({
			focusInvalid : false,
			rules : {
				firstName:{
					required : true,
					maxlength : 10
				},
				lastName:{
					required : true,
					maxlength : 10
				},
				email:{
					required : true,
					email : true,
					maxlength : 50
				},
				phone:{
					required : true,
					maxlength : 13	
				},
				birthday:{
					required : true,
					dateISO:true
				}
			},
			messages : {
				firstName:{
					required : "请输入姓氏",
					maxlength : "最大10个字符"
				},
				lastName:{
					required : "请输入名字",
					maxlength : "最大10个字符"
				},
				email:{
					required : "请输入E-mail",
					email : "E-mail格式错误",
					maxlength : "最大50个字符"
				},
				phone:{
					required : "请输入手机号码",
					maxlength : "最大13个字符"
				},
				birthday:{
					required : "请选择出身年月",
					dateISO: "日期格式错误"
				}
			},
			submitHandler : function() {
				$.ajax({
					type : "post",
					url : "/user/modifyUserInfo",
					data : $("#modifyInfoForm").serializeArray(),
					dataType : "json",
					success : function(data) {
						if(data.result == "fail"){
							alert(data.message);
						}else if(data.result == "success"){
							var userName = $("#form_userName").val();
							$("#h_name").html(userName);
							$("#a_userInfo_tab").find("i:first").click();
							$("#userInfo_tab").click();
							g.success("个人档案更新成功");
						}
					}
				});
			}
		});
	});
	
</script>
