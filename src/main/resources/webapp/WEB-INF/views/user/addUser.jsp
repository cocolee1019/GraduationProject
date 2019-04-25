<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<style>
.modal-title{
	margin-left:10px;
}
.close{
	margin:10px
}
.modal{
	overflow:hidden!important;
}
.error{
	color:red;
}
</style>
<div class="modal-dialog modal-dialog-small">
	<div class="modal-content modal-sm-content">
		<div class="modal-header01">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
			<h4 class="modal-title">
				新增用户
			</h4>
		</div>
		<form id="add_user_form_in_add_user_page" class="form-horizontal">
				<div class="row enterprise-border">
					<div class="row">
						<div class="col-md-12">
							<label class="control-label col-md-4">
								<span class="required" >*</span>
								姓&nbsp;名
							</label>
							<div class="col-md-2">
								<input type="text" class="form-control	" data-required="1"
								id="first_name_in_addUser_page" name="firstName" />
							</div>
							<div class="col-md-5">
								<input type="text" class="form-control" data-required="1"
								 id="last_name_in_addUser_page" name="lastName" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<label class="control-label col-md-4">
								<span class="required" >*</span>
								邮箱
							</label>
							<div class="col-md-8 input-icon right">
								<input name="email" id="email_in_addUser_page" type="text" class="form-control">
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<label class="control-label col-md-4">
								角色
							</label>
							<div class="col-md-8 input-icon right">
								<select class="form-control search_4 role_multipleSelect" id="RoleSelect_addUserPage" multiple="multiple">
									<c:forEach items="${roles }" var="role">
										<option value="${role.id}" value2="${role.code}" }>${role.name}</option>
									</c:forEach>
								</select>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<label class="control-label col-md-4">
								部门
							</label>
							<div class="col-md-8 input-icon right">
								<select class="class_department_select" id="department_in_add_user_page" onchange="departmentOnChange(this)">
									<option value="">请选择</option>
									<c:forEach items="${departments }" var="dep" varStatus="var">
										<option value="${dep.id}" ${dep.id==user.departmentId?"selected":"" }>${dep.name}</option>
									</c:forEach>
								</select>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<label class="control-label col-md-4">
								职位
							</label>
							<div class="col-md-8 input-icon right">
								<select class="" id="pos_select_adduser_page">
									<option value="">请选择</option>
								</select>
							</div>
						</div>
					</div>	
					<div class="row">
					</div>
					<div class="row">
					</div>
					<div class="row">
					</div>
					
					<div class="right">
						<button type="submit" class="btn blue ">
							<i class="fa fa-check">	</i>
							确定
						</button>
						<button type="button" data-dismiss="modal" class="btn cancel-btn" id="cancle_btn_in_addUserPage">
							<i class="fa fa-times"></i>
							取消
						</button>
				   </div>
			</div>
		</form>
	</div>
</div>

<script>
	$(function(){
		$('#RoleSelect_addUserPage').multiselect({enableFiltering: true,
			nonSelectedText:'请选择角色',
	    	filterPlaceholder:'搜索',
	    	nSelectedText:'项被选中',
	    	includeSelectAllOption:true,
	    	enableFullValueFiltering: true,//能否全字匹配  
	        enableCaseInsensitiveFiltering: true,//不区分大小写
	    	selectAllText:'全选/取消全选',
	    	allSelectedText:'已选中所有角色',//已选中所有店铺
		});
		
		$("#add_user_form_in_add_user_page").validate({
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
					email:true
				}
			},
			messages:{
				firstName:{
					required : "请输入姓氏",
					maxlength : "只能输入10个字符"
				},
				lastName:{
					required : "请输入名",
					maxlength : "只能输入10个字符"
				},
				email:{
					required : "请输入邮箱",
					email:"请输入正确的邮箱"
				}
			},
			submitHandler : function() {
				var user={};
				user.firstName=$("#first_name_in_addUser_page").val();
				user.lastName=$("#last_name_in_addUser_page").val();
				user.email=$("#email_in_addUser_page").val();
				user.departmentId=$("#department_in_add_user_page").find("option:selected").val();
				user.departmentName=$("#department_in_add_user_page").find("option:selected").text();
				user.positionId=$("#pos_select_adduser_page").find("option:selected").val();
				user.positionName=$("#pos_select_adduser_page").find("option:selected").text();
				$("#RoleSelect_addUserPage").find(":selected").each(function(i,selected){
					user['roles['+i+'].id']=$(selected).val();
					user['roles['+i+'].code']=$(selected).attr("value2");
				});
				$.ajax({
					type : "post",
					url : "/user/addUser",
					data :user,
					dataType : "json",
					success : function(data) {
						if(data.result == "fail"){
							g.warning(data.message);
						}else if(data.result == "success"){
							$("#a_userCenter_tab").find("i:first").click();
							$("#userCenter_table").click();
							$("#cancle_btn_in_addUserPage").click();
							g.success("添加用户成功");
						}
					}
				});
			}
		});
	});
	
	/**
	*级联
	*/
	departmentOnChange = function(obj){
		if($(obj).val()){
			var $positionSelect=$("#pos_select_adduser_page");
			$.ajax({
				type : "get",
				url : "/user/getPositonByDepartment",
				data : {"id":$(obj).val()},
				dataType : "json",
				success : function(data) {
					if(data.result == "fail"){
						g.warning(data.message);
					}else if(data.result == "success"){
						$positionSelect.empty();
						$positionSelect.append('<option>请选择</option>');
						var list = data.list;
						var positionIdSelected = $(obj).parent().parent().find("input:eq(1)").val();
						for(i=0; i<list.length; i++){
							var selected = "";
							if(list[i].id==positionIdSelected){
								selected = "selected";
							}
							$positionSelect.append('<option value="'+list[i].id+'" '+selected+'>'+list[i].name+'</option>');
						}
					}
				}
			});
		}
	};
</script>