<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>

<div class="modal-dialog modal-dialog-small">
	<div class="modal-content modal-sm-content">
		<div class="modal-header01">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
			<h4 class="modal-title">
				&nbsp;&nbsp;编辑部门
			</h4>
		</div>
		<form id="form_in_editOrg" class="form-horizontal">
			<div class="row enterprise-border">
				<div class="row">
					<div class="col-md-12">
						<label class="control-label col-md-2">
							<span class="required" >*</span>
							部门名称
						</label>
						<input type="hidden" name="id" id="id_editOrg_page" value="${currentDep.id }">
						<div class="col-md-4">
							<input type="text" class="form-control" name="name" id="name_in_editOrg" value="${currentDep.name }"/>
						</div>
						<label class="control-label col-md-2">
							父部门
						</label>
						<div class="col-md-4">
							<select class="" name="parent_department_id" id="parentDepartmentId_in_page">
								<option value="">请选择</option>
								<c:forEach items="${departments }" var="department">
									<option value="${department.id }" ${currentDep.parentDepartmentId eq department.id?"selected":"" }>${department.name }</option>
								</c:forEach>
							</select>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<label class="control-label col-md-2">
							职位
						</label>
						<div class="col-md-8 input-icon right">
							<select class="form-control" multiple="multiple role_multipleSelect" id="multipleSelect_editOrg">
								<c:forEach items="${positions }" var="position">
									<c:set var="iscontain" value="false" />
										<c:forEach  items="${currentDep.positions }" var="depPosition">
											<c:if test="${depPosition.id eq position.id}">
												<c:set var="iscontain" value="true" />
											</c:if>
										</c:forEach>
									<option value="${position.id }" ${iscontain eq true?"selected":"" } >${position.name }</option>
								</c:forEach>
							</select>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<label class="control-label col-md-2">
							职责描述
						</label><br>
						<div class="col-md-8 input-icon right">
							<textarea name="responsibility" id="responsibility_in_editOrg" class="form-control" rows="3">
							</textarea>
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
					<button type="button" data-dismiss="modal" class="btn cancel-btn" id="cancelBtn_in_editOrg">
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
		$('#multipleSelect_editOrg').multiselect({enableFiltering: true,
			nonSelectedText:'请选择职位',
        	filterPlaceholder:'搜索',
        	nSelectedText:'项被选中',
        	includeSelectAllOption:true,
        	enableFullValueFiltering: true,//能否全字匹配  
            enableCaseInsensitiveFiltering: true,//不区分大小写
        	selectAllText:'全选/取消全选',
        	allSelectedText:'已选中所有职位',//已选中所有店铺
		});
		
		$("#form_in_editOrg").validate({
			focusInvalid : false,
			rules : {
				name:{
					required : true,
					maxlength : 20
				}
			},
			messages : {
				name:{
					required : "请输入部门名称",
					maxlength : "最大20个字符"
				}
			},
			submitHandler : function() {
				var department={};
				department.id=$("#id_editOrg_page").val();
				department.name=$("#name_in_editOrg").val();
				department.parentDepartmentId=$("#parentDepartmentId_in_page").find("option:selected").val();
				department.responsibility=$("#responsibility_in_editOrg").val();
				//职位
				$("#multipleSelect_editOrg").find(":selected").each(function(i,selected){
					department['positions['+i+'].id']=$(selected).val();
				});
				console.log("department:"+department);
				$.ajax({
					type : "post",
					url : "/org/editOrg",
					data : department,
					dataType : "json",
					success : function(data) {
						if(data.result == "fail"){
							alert(data.message);
						}else if(data.result == "success"){
							$("#cancelBtn_in_editOrg").click();
							$("#a_OrganitionCenter_tab").find("i:first").click();
							$("#OrgCenter_table").click();
							g.success("部门修改成功");
						}
					}
				});
			}
		});
	});
</script>