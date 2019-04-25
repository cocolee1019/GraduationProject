<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>

<script type="text/javascript" src="js//datepicker/WdatePicker.js"></script>

<div class="modal-dialog modal-dialog-small">
	<div class="modal-content modal-sm-content">
		<div class="modal-header01">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
			<h4 class="modal-title">
				&nbsp;&nbsp;创建任务计划
			</h4>
		</div>
		<form id="form_in_addTaskPlan" class="form-horizontal">
			<input type="hidden" value="${taskId }" name="taskId" id="taskId_in_addTaskPlan">
			<div class="row enterprise-border">
				<div class="row">
					<div class="col-md-12">
						<label class="control-label col-md-4">
							<span class="required" >*</span>
							计划详情
						</label>
						<div class="col-md-4">
							<textarea name="taskPlanDetail" rows="3" cols="2" class="form-control"></textarea>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<label class="control-label col-md-4">
							开始时间
						</label>
						<div class="col-md-4">
							<input type="text" name=startDate class="Wdate form-control" onClick="WdatePicker({realDateFmt:'yyyy-MM-dd HH:mm:ss',dateFmt:'yyyy-MM-dd HH:mm:ss'})">
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<label class="control-label col-md-4">
							结束时间
						</label>
						<div class="col-md-4">
							<input type="text" name=endDate class="Wdate form-control" onClick="WdatePicker({realDateFmt:'yyyy-MM-dd HH:mm:ss',dateFmt:'yyyy-MM-dd HH:mm:ss'})">
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<label class="control-label col-md-4">
							备注
						</label>
						<div class="col-md-4">
							<textarea name="mome" rows="3" cols="2" class="form-control"></textarea>
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
					<button type="button" data-dismiss="modal" class="btn cancel-btn" id="cancelBtn_in_addTaskPlan">
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
		$("#form_in_addTaskPlan").validate({
			focusInvalid : false,
			rules : {
				taskPlanDetail:{
					required : true,
					maxlength : 200
				},
				startDate:{
					required : true
				},
				endDate:{
					required : true
				}
			},
			messages:{
				taskPlanDetail:{
					required : "请输入计划详情",
					maxlength : "最大200字"
				},
				startDate:{
					required : "请输入开始时间"
				},
				endDate:{
					required : "请输入结束时间"
				}
			},
			submitHandler : function() {
				var dataVar = $("#form_in_addTaskPlan").serialize();
				console.log(dataVar);
				$.ajax({
					type : "post",
					url : "/task/addTaskPlan",
					data :dataVar,
					dataType : "json",
					success : function(data) {
						if(data.result == "fail"){
							g.warning(data.message);
						}else if(data.result == "success"){
							var taskId = $("#taskId_in_addTaskPlan").val();
							$("#a_makeTaskPlan_tab").find("i:first").click();
							$("#cancelBtn_in_addTaskPlan").click();
							g.load('/task/toMakeTaskPlanPage/'+taskId,this,'任务计划详情','a_makeTaskPlan_tab')
							g.success("计划详情新建成功");
						}
					}
				});
			}
		});
	});
</script>