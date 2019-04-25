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
							<th class="weight_width">接收人</th>
							<th class="weight_width">任务接收日期</th>
							<th class="weight_width">是否制定计划</th>
							<th class="operation_width">操作</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach var="taskReceiveObject" items="${taskReceiveObjects }">
							<tr>
								<td title="${taskReceiveObject.name}">${taskReceiveObject.name }</td>
								<td title=""><fmt:formatDate value="${taskReceiveObject.receiveTime}" pattern="yyyy-MM-dd"/></td>
								<td title="">${taskReceiveObject.isMakePlan == true?"是":"否"}</td>
								<td>
									<div class="operate_fa">
										<c:if test="${taskReceiveObject.isMakePlan==true}">
											<a href="javascript:;" class="btn" title="查看详情" onclick="g.load('task/toTaskDetailPage/${taskId}',this,'查计划详情','a_taskDetail_tab')"> 
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
	
</script>