<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<style>
.multiple_select .btn-group{border: 1px solid #e5e5e5; width:100%;-webkit-border-radius: 2px;-moz-border-radius: 2px;-ms-border-radius: 2px;-o-border-radius: 2px;border-radius: 2px;}
.multiple_select input.form-control.multiselect-search{-webkit-border-radius: 0px;-moz-border-radius: 0px;-ms-border-radius: 0px;-o-border-radius: 0px;border-radius: 0px;background: url('/theme/assets/global/plugins/select2/select2.png') no-repeat 100% -22px;}
.multiple_select .input-group .input-group-addon{-webkit-border-radius: 2px 0px;-moz-border-radius:2px 0px;-ms-border-radius: 2px 0px;-o-border-radius:2px 0px;border-radius:2px 0px;}
.multiple_select button.btn.btn-default.multiselect-clear-filter{padding:3px 5px 2px 5px; line-height: 22px;-webkit-border-radius: 0px; -moz-border-radius: 0px; -ms-border-radius: 0px; -o-border-radius: 0px; border-radius: 0px;}
.multiple_select .multiselect-clear-filter.btn > i{margin-top:6px;}
.multiple_select .multiselect-container>li>a>label>input[type=checkbox]{margin:0;vertical-align: middle;display:block;float:left;width: 24px; height:15px;}
.multiple_select button.multiselect.dropdown-toggle.btn.btn-default{background-color:#fff;padding:0 0 0 10px;width: 100%;text-align: left;}
.multiple_select span.multiselect-selected-text{display:block;text-align: left;overflow-x: hidden;margin-right: 20px;font-weight:normal;text-transform: capitalize;height:28px;line-height:28px;}
.multiple_select ul.multiselect-container.dropdown-menu{max-height: 300px;overflow-y: auto;}
.multiple_select .multiselect-container>li>a>label{line-height:15px;padding:5px 0 4px 10px;white-space:normal;}
.multiple_select .btn .caret{margin-top:-6px;}
.multiple_select .btn-group{border: 1px solid #e5e5e5; width:100%;-webkit-border-radius: 2px;-moz-border-radius: 2px;-ms-border-radius: 2px;-o-border-radius: 2px;border-radius: 2px;}
.multiple_select input.form-control.multiselect-search{-webkit-border-radius: 0px;-moz-border-radius: 0px;-ms-border-radius: 0px;-o-border-radius: 0px;border-radius: 0px;background: url('/theme/assets/global/plugins/select2/select2.png') no-repeat 100% -22px;}
.multiple_select .input-group .input-group-addon{-webkit-border-radius: 2px 0px;-moz-border-radius:2px 0px;-ms-border-radius: 2px 0px;-o-border-radius:2px 0px;border-radius:2px 0px;}
 </style>
<div class="modal-dialog modal-dialog-small">
	<div class="modal-content modal-sm-content">
		<div class="modal-header01">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
			<h4 class="modal-title">
				&nbsp;&nbsp;新增部门
			</h4>
		</div>
		<form id="form_in_addOrg" class="form-horizontal">
			<div class="row enterprise-border">
				<div class="row">
					<div class="col-md-12">
						<label class="control-label col-md-2">
							<span class="required" >*</span>
							部门名称
						</label>
						<div class="col-md-4">
							<input type="text" class="form-control" name="name" id="name_in_addOrg" />
						</div>
						<label class="control-label col-md-2">
							父部门
						</label>
						<div class="col-md-4">
							<select class="" name="parent_department_id" id="parentDepartmentId_in_page">
								<option value="">请选择</option>
								<c:forEach items="${departments }" var="department">
									<option value="${department.id }">${department.name }</option>
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
							<div class="search_group multiple_select">
								<select class="form-control" multiple="multiple" id="multipleSelect_addOrg">
									<c:forEach items="${positions }" var="position">
										<option value="${position.id }">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${position.name }</option>
									</c:forEach>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<label class="control-label col-md-2">
							职责描述
						</label><br>
						<div class="col-md-8 input-icon right">
							<textarea name="responsibility" id="responsibility_in_addOrg" class="form-control" rows="3">
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
					<button type="button" data-dismiss="modal" class="btn cancel-btn" id="cancelBtn_in_addOrg">
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
		$('#multipleSelect_addOrg').multiselect({enableFiltering: true,
			nonSelectedText:'请选择职位',
        	filterPlaceholder:'搜索',
        	nSelectedText:'项被选中',
        	includeSelectAllOption:true,
        	enableFullValueFiltering: true,//能否全字匹配  
            enableCaseInsensitiveFiltering: true,//不区分大小写
        	selectAllText:'全选/取消全选',
        	allSelectedText:'已选中所有职位',//已选中所有店铺
		});
		
		$(".multiselect-container").css("width", "100%");
		$(".multiselect-container label.checkbox input").addClass("icheck");
		
		$("#form_in_addOrg").validate({
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
				department.name=$("#name_in_addOrg").val();
				department.parentDepartmentId=$("#parentDepartmentId_in_page").find("option:selected").val();
				department.responsibility=$("#responsibility_in_addOrg").val();
				//职位
				$("#multipleSelect_addOrg").find(":selected").each(function(i,selected){
					department['positions['+i+'].id']=$(selected).val();
				});
				console.log("department:"+department);
				$.ajax({
					type : "post",
					url : "/org/addOrg",
					data : department,
					dataType : "json",
					success : function(data) {
						if(data.result == "fail"){
							alert(data.message);
						}else if(data.result == "success"){
							$("#cancelBtn_in_addOrg").click();
							$("#a_OrganitionCenter_tab").find("i:first").click();
							$("#OrgCenter_table").click();
							g.success("新增部门成功");
						}
					}
				});
			}
		});
	});
</script>