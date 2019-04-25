<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<style>
.form-horizontal .control-label .control-label-left {
	text-align: left;
}
</style>
<div class="page-container page_size_control">
	<div class="container invite_box form-horizontal">
		<div class="form-body">
			<div class="portlet light bordered">
				<div class="portlet-title" style="border: none;">
					<div class="caption">
						<i class="fa fa-dashcube"></i>任务基本信息
					</div>
				</div>
				<div class="portlet-body form form-horizontal">
					<div class="row enterprise-border">
						<div class="col-md-12">
							<div class="form-group ">
								<label class="control-label col-md-1">任务详情</label>
								<div class="col-md-3">
									<p class="form-control-static">${taskInfo.taskDetail }</p>
								</div>
								<label class="control-label col-md-1">|</label> <label
									class="control-label col-md-2">任务创建时间</label>
								<div class="col-md-3">
									<p class="form-control-static">
										<fmt:formatDate value="${taskInfo.taskCreateTime }" pattern="yyyy-MM-dd"/>
									</p>
								</div>
							</div>
						</div>
						<div class="col-md-12">
							<div class="form-group ">
								<label class="control-label col-md-1">任务状态</label>
								<div class="col-md-3">
									<p class="form-control-static">
										${taskInfo.state }
									</p>
								</div>
								<label class="control-label col-md-1">|</label> <label
									class="control-label col-md-2">接收总人数</label>
								<div class="col-md-3">
									<p class="form-control-static">
										${taskInfo.userNum }
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="row enterprise-border">
						<div class="col-md-12">
							<div class="form-group ">
								<label class="control-label-left col-md-2">任务追踪：</label>
							</div>
							<div class="form-group ">
								<div class="col-md-12">
									<p class="form-control-static">
										<c:forEach var="tracking" items="${taskInfo.tackingInfos }">
											<fmt:formatDate value="${tracking.createTime }" pattern="yyyy-MM-dd HH:mm:dd"/>
											<i>${tracking.userName }</i> &nbsp;${tracking.message }<br>
										</c:forEach>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>