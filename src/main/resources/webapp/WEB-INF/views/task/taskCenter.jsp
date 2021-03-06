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

<div class="page-container page_size_control" id="taskCenter_father_div">
	<div class="page-content">
		<div class="portlet-header">
			<div class="actions">
				<a href="javascript:;" class="button btn-circle" onclick="g.mainModal.open('/task/toAddTaskPage')">
					<i class="fa fa fa-plus-circle"></i> <span class="hidden-480">
						发布任务
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
							<th class="code_width">任务描述</th>
							<!-- <th class="weight_width">状态</th> -->
							<th class="weight_width">接收对象</th>
							<th class="weight_width">紧急程度</th>
							<th class="status_width">父任务</th>
							<th class="operation_width">任务创建时间</th>
							<th class="operation_width">完成时间</th>
							<th class="operation_width">备注</th>
							<th class="operation_width">操作</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach var="task" items="${tasks }" varStatus="status">
							<tr>
								<input type="hidden" value="${task.id }"/>
								<td title="">${task.describe }</td>
								<%-- <td title="">${task.status }</td> --%>
								<td title="">${task.receiveObject=="department"?"部门":(task.receiveObject=="employee"?"职员":(task.receiveObject=="position"?"职位":"-")) }</td>
								<td title="${task.level}">${task.level }</td>
								<td title="${task.parentTaskId}">${task.parentTaskId }</td>
								<td title='<fmt:formatDate value="${task.createTime }" pattern="yyyy-MM-dd"/>'><fmt:formatDate value="${task.createTime }" pattern="yyyy-MM-dd"/></td>
								<td title='<fmt:formatDate value="${task.doneTime }" pattern="yyyy-MM-dd"/>'><fmt:formatDate value="${task.doneTime }" pattern="yyyy-MM-dd"/></td>
								<td title="${task.memo}">${task.memo }</td>
								<td>
									<div class="operate_fa">
										<a href="javascript:;" class="btn" title="查看详情" onclick="g.load('/task/toReceiveTaskCenter/${task.id }',this,'任务接收对象','a_receivetaskCenter_tab');return false;"> 
											<i class="glyphicon glyphicon-list-alt"></i>
										</a>
										<a href="javascript:;" class="btn" title="追踪任务" onclick="g.load('/task/toTrackingTaskPage/${task.id }',this,'任务追踪','a_taskTracking_tab');return false;"> 
											<i class="glyphicon glyphicon-screenshot"></i>
										</a>
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
</script>