<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<style>
 .btn{
 padding:0px 0px;
 }
</style>

<div class="page-container page_size_control">
	<div class="page-content">
		<div class="portlet-header">
			<div class="actions">
				<a href="javascript:;" class="button btn-circle" onclick="g.mainModal.open('/task/toAddTaskPlanPage/${taskId}')">
					<i class="fa fa fa-plus-circle"></i> <span class="hidden-480">
						制定任务
					</span>
				</a>
			</div>
			<div class="clear"></div>
		</div>
		<div class="list_table_scroll">
			<div class="portlet-body">
				<table class="table table-hover list_table">
					<thead>
						<tr>
							<th class="weight_width">计划详情</th>
							<th class="weight_width">开始时间</th>
							<th class="weight_width">结束时间</th>
							<th class="status_width">详情状态</th>
							<th class="operation_width">备注</th>
							<th class="operation_width">任务执行人</th>
							<th class="operation_width">操作</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach var="taskPlan" items="${taskPlans }" varStatus="status">
							<tr>
								<input type="hidden" value="${taskPlan.id }"/>
								<td title="">${taskPlan.taskPlanDetail }</td>
								<td title='<fmt:formatDate value="${taskPlan.startDate}" pattern="yyyy-MM-dd HH-mm-ss"/>'><fmt:formatDate value="${taskPlan.startDate}" pattern="yyyy-MM-dd HH-mm-ss"/></td>
								<td title='<fmt:formatDate value="${taskPlan.endDate}" pattern="yyyy-MM-dd HH-mm-ss"/>'><fmt:formatDate value="${taskPlan.endDate}" pattern="yyyy-MM-dd HH-mm-ss"/></td>
								<td title="${taskPlan.planState}">
								${taskPlan.planState=="INIT"?"待审核":
									(taskPlan.planState=="REJECT"?"未通过":
								 		 (taskPlan.planState=="ACCEPT"?"待开始":
								 			(taskPlan.planState=="PROCESSING"?"进行中":
								 				(taskPlan.planState=="DONE"?"完成":
								 					(taskPlan.planState=="OUTTIME"?"逾期":"未知")
								 				)	
								 			)
								 		)
								 	) 
								}
								</td>
								<td title="${taskPlan.mome}">${taskPlan.mome }</td>
								<td title="${taskPlan.receiveId}">${taskPlan.receiveName }</td>
								<td>
									<div class="operate_fa">
										<c:if test="${taskPlan.planState=='INIT' || taskPlan.planState=='REJECT'}">
											<a href="javascript:;" class="btn" title="编辑" onclick="g.mainModal.open('/task/toEditTaskPlanPage/${taskPlan.id }')"> 
												<i class="fa fa-edit"></i>
											</a>
											<a href="javascript:;" class="btn" title="删除" onclick="deleteTaskPlan(${taskPlan.id},${taskId})"> 
												<i class="fa fa-trash-o"></i>
											</a>
										</c:if>
										<c:if test="${taskPlan.planState=='ACCEPT'}">
											<a href="javascript:;" class="btn" title="开始" onclick="startTaskPlan(${taskPlan.id},${taskId})"> 
												<i class="glyphicon glyphicon-ok"></i>
											</a>
											<a href="javascript:;" class="btn" title="备注" onclick=""> 
												<i class="glyphicon glyphicon-list-alt"></i>
											</a>
										</c:if>
										<c:if test="${taskPlan.planState=='PROCESSING' || taskPlan.planState=='OUTTIME'}">
											<a href="javascript:;" class="btn" title="完成" onclick=""> 
												<i class="glyphicon glyphicon-ok"></i>
											</a>
											<a href="javascript:;" class="btn" title="备注" onclick=""> 
												<i class="glyphicon glyphicon-list-alt"></i>
											</a>
										</c:if>
										<c:if test="${taskPlan.planState=='DONE'}">
											<a href="javascript:;" class="btn" title="备注" onclick=""> 
												<i class="glyphicon glyphicon-list-alt"></i>
											</a>
										</c:if>
									</div>
								</td>
							</tr>
						</c:forEach>
					</tbody>
				</table>
			</div>
		</div>
	</div> <!-- page-content -->
</div>

<script>
	deleteTaskPlan=function(planId,taskId){
		if(planId){
			$.ajax({
				type : "post",
				url : "/task/delTaskPlan",
				data :{"planId":planId},
				dataType : "json",
				success : function(data) {
					if(data.result == "fail"){
						g.warning(data.message);
					}else if(data.result == "success"){
						$("#a_makeTaskPlan_tab").find("i:first").click();
						g.load('/task/toMakeTaskPlanPage/'+taskId,this,'任务计划详情','a_makeTaskPlan_tab')
						g.success("计划详情删除成功");
					}
				}
			});
		}
	};
	
	startTaskPlan = function(planId,taskId){
		console.log(planId,taskId);
		if(planId){
			$.ajax({
				type : "post",
				url : "/task/startTaskPlan",
				data :{"planId":planId},
				dataType : "json",
				success : function(data) {
					if(data.result == "fail"){
						g.warning(data.message);
					}else if(data.result == "success"){
						$("#a_makeTaskPlan_tab").find("i:first").click();
						g.load('/task/toMakeTaskPlanPage/'+taskId,this,'任务计划详情','a_makeTaskPlan_tab')
						g.success("修改成功");
					}
				}
			});
		}
	}
</script>