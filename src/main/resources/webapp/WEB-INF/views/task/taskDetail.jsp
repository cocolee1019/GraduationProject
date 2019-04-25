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
		<!-- <div class="portlet-header">
			<div class="actions">
				<a href="javascript:;" class="button btn-circle" onclick="">
					<i class="fa fa fa-plus-circle"></i> <span class="hidden-480">
						发布任务
					</span>
				</a>
			</div>
			<div class="clear"></div>
		</div> -->
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
								<td title='<fmt:formatDate value="${taskPlan.startDate}" pattern="yyyy-MM-dd"/>'><fmt:formatDate value="${taskPlan.startDate}" pattern="yyyy-MM-dd"/></td>
								<td title='<fmt:formatDate value="${taskPlan.endDate}" pattern="yyyy-MM-dd"/>'><fmt:formatDate value="${taskPlan.endDate}" pattern="yyyy-MM-dd"/></td>
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
								<td title="">${taskPlan.mome }</td>
								<td title="${taskPlan.receiveId}">${taskPlan.receiveName }</td>
								<td>
									<div class="operate_fa">
										<c:if test="${taskPlan.planState=='INIT'}">
											<a href="javascript:;" class="btn" title="通过" onclick="updateThePlan(${taskPlan.id },'ACCEPT',${taskId})"> 
												<i class="glyphicon glyphicon-ok"></i>
											</a>
											<a href="javascript:;" class="btn" title="驳回" onclick="updateThePlan(${taskPlan.id },'REJECT',${taskId})"> 
												<i class="glyphicon glyphicon-ban-circle"></i>
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
	updateThePlan = function(planId,status,taskId){
		if(planId){
			$.ajax({
				type : "post",
				url : "/task/updatePlanState",
				data :{"planId":planId,"status":status},
				dataType : "json",
				success : function(data) {
					if(data.result == "fail"){
						g.warning(data.message);
					}else if(data.result == "success"){
						$("#a_taskDetail_tab").find("i:first").click();
						g.load('task/toTaskDetailPage/'+taskId,this,'查计划详情','a_taskDetail_tab')
						g.success("操作成功");
					}
				}
			});
		}
	}
</script>