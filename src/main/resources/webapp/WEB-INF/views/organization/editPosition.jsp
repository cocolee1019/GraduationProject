<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>

<div class="modal-dialog modal-dialog-small">
	<div class="modal-content modal-sm-content">
		<div class="modal-header01">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
			<h4 class="modal-title">
				&nbsp;&nbsp;修改职位
			</h4>
		</div>
		<form id="form_in_editPosition" class="form-horizontal">
			<input type="hidden" name="id" value="${position.id }"/>
			<div class="row enterprise-border">
				<div class="row">
					<div class="col-md-12">
						<label class="control-label col-md-4">
							<span class="required" >*</span>
							职位名称
						</label>
						<div class="col-md-4">
							<input type="text" class="form-control" name="name" id="name_in_editPosition" value="${position.name }"/>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<label class="control-label col-md-4">
						<span class="required" >*</span>
							级别
						</label>
						<div class="col-md-4">
							<input type="text" class="form-control" name="level" id="level_in_editPosition" value="${position.level }" />
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
					<button type="button" data-dismiss="modal" class="btn cancel-btn" id="cancelBtn_in_editPosition">
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
		$("#form_in_editPosition").validate({
			focusInvalid : false,
			rules : {
				name:{
					required : true,
					maxlength : 20
				},
				level:{
					required : true,
					digits:true,
					range:[1,99]
				}
			},
			messages : {
				name:{
					required : "请输入职位名称",
					maxlength : "最大20个字符"
				},
				level:{
					required : "请输入等级",
					digits:"请输入整数",
					range:"等级为1~99"
				}
			},
			submitHandler : function() {
				$.ajax({
					type : "post",
					url : "/org/editPosition",
					data : $("#form_in_editPosition").serialize(),
					dataType : "json",
					success : function(data) {
						if(data.result == "fail"){
							alert(data.message);
						}else if(data.result == "success"){
							$("#cancelBtn_in_editPosition").click();
							$("#a_positionCenter_tab").find("i:first").click();
							$("#PositionCenter_table").click();
							g.success("修改部门成功");
						}
					}
				});
			}
		});
	});
</script>