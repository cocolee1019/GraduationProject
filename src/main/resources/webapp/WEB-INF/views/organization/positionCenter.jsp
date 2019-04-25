<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>

<style>
 .btn{
 padding:0px 0px;
 }
</style>

<div class="page-container page_size_control" id="">
	<div class="page-content">
		<div class="portlet-header">
			<div class="actions">
				<shiro:hasPermission name="positionOperation">
					<a href="javascript:;" class="button btn-circle" onclick="g.mainModal.open('/org/toAddPositionPage')">
						<i class="fa fa fa-plus-circle"></i> <span class="hidden-480">
							添加职位
						</span>
					</a>
				</shiro:hasPermission>
			</div>
			<div class="clear"></div>
		</div>
		<div class="list_table_scroll">
			<div class="portlet-body">
				<table class="table table-hover list_table">
					<thead>
						<tr>
							<th class="code_width">名称</th>
							<th class="weight_width">级别</th>
							<th class="weight_width">操作</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach var="position" items="${list}" varStatus="status">
							<tr>
								<input type="hidden" value="${position.id }"/>
								<td title="${position.name}">${position.name}</td>
								<td title="${position.level}">${position.level }</td>
								<td>
									<div class="operate_fa">
										<shiro:hasPermission name="positionOperation">
											<a href="javascript:;" class="btn" title="修改" onclick="editPosition();return false;"> 
												<i class="fa fa-edit"></i>
											</a>	
											<a href="javascript:;" class="" title="删除" onclick="deletePosition(this);return false;">
												<i class="fa fa-trash-o"></i>
											</a>
										</shiro:hasPermission>
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

	editPosition = function(){
		var id = $("#positionId_positionCenter").val();
		g.mainModal.open('/org/toEditPositionPage',{"id":id});
	};
	
	deletePosition = function(obj){
		var id=$(obj).parent().parent().parent().find("input:first").val();
		if(id){
			$.ajax({
				type : "post",
				url : "/org/delPosition",
				data : {"id":id},
				dataType : "json",
				success : function(data) {
					if(data.result == "fail"){
						alert(data.message);
					}else if(data.result == "success"){
						$("#a_positionCenter_tab").find("i:first").click();
						$("#PositionCenter_table").click();
						g.success("删除部门成功");
					}
				}
			});
		};
	}
</script>