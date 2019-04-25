<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>

<div class="modal-dialog modal-dialog-small">
	<div class="modal-content modal-sm-content">
		<div class="modal-header01">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
			<h4 class="modal-title">
				&nbsp;&nbsp;新增角色
			</h4>
		</div>
		<form id="addRole_form_in_addaddRole" class="form-horizontal">
			<div class="row enterprise-border">
				<div class="row">
					<div class="col-md-12">
						<label class="control-label col-md-4">
							<span class="required" >*</span>
							角色名称
						</label>
						<div class="col-md-4">
							<input type="text" class="form-control" name="name" id="name_in_addRole" />
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<label class="control-label col-md-4">
						<span class="required" >*</span>
							CODE
						</label>
						<div class="col-md-4">
							<input type="text" class="form-control" name="code" id="code_in_addRole" />
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<label class="control-label col-md-4">
							权限
						</label>
						<div class="col-md-4">
							<select id="select_permission_in_addRole_page" class="form-control search_4 role_multipleSelect" multiple="multiple">
								<c:forEach items="${list }" var="permis">
									<option value="${permis.id }" value2="${permis.name }" value3="${permis.code }"}>${permis.name }</option>
								</c:forEach>
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
					<button type="button" data-dismiss="modal" class="btn cancel-btn" id="cancelBtn_in_addRole">
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
		$('.role_multipleSelect').multiselect({enableFiltering: true,
			nonSelectedText:'请选择权限',
        	filterPlaceholder:'搜索',
        	nSelectedText:'项被选中',
        	includeSelectAllOption:true,
        	enableFullValueFiltering: true,//能否全字匹配  
            enableCaseInsensitiveFiltering: true,//不区分大小写
        	selectAllText:'全选/取消全选',
        	allSelectedText:'已选中所有权限',//已选中所有店铺
		});
		
		$("#addRole_form_in_addaddRole").validate({
			focusInvalid : false,
			rules : {
				name:{
					required : true,
					maxlength : 50
				},
				code:{
					required : true
				}
			},
			messages : {
				name:{
					required : "请输入角色名称",
					maxlength : "最大50个字符"
				},
				code:{
					required : "请输入编码"
				}
			},
			submitHandler : function() {
				var role={};
				role.name=$("#name_in_addRole").val();
				role.code=$("#code_in_addRole").val();
				$("#select_permission_in_addRole_page").find(":selected").each(function(i,selected){
					role['permissions['+i+'].id']=$(selected).val();
					role['permissions['+i+'].name']=$(selected).attr("value2");
					role['permissions['+i+'].code']=$(selected).attr("value3");
				});
				$.ajax({
					type : "post",
					url : "/role/addRole",
					data : role,
					dataType : "json",
					success : function(data) {
						if(data.result == "fail"){
							alert(data.message);
						}else if(data.result == "success"){
							$("#cancelBtn_in_addRole").click();
							$("#a_roleCenter_tab").find("i:first").click();
							$("#roleCenter_table").click();
							g.success("新增角色成功");
						}
					}
				});
			}
		});
	});
</script>