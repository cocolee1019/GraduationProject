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

<div class="page-container page_size_control" id="roleCenter_father_div">
	<div class="page-content">
		<div class="portlet-header">
			<div class="actions">
				<shiro:hasPermission name="roleOperation">
					<a href="javascript:;" class="button btn-circle" onclick="g.mainModal.open('/role/toAddRolePage')">
						<i class="fa fa fa-plus-circle"></i> <span class="hidden-480">
							添加角色
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
							<th class="code_width">角色名</th>
							<th class="weight_width">code</th>
							<th class="weight_width">权限</th>
							<th class="operation_width">操作</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach var="role" items="${list}" varStatus="status">
							<tr>
								<input type="hidden" value="${role.id }"/>
								<td title="${role.name}">${role.name}</td>
								<td title="${role.code}">${role.code }</td>
								<td title="权限">${role.permissionNames}</td>
								<td>
									<div class="operate_fa">
										<shiro:hasPermission name="roleOperation">
											<a href="javascript:;" class="btn" titl	e="修改" onclick=""> 
												<i class="fa fa-edit"></i>
											</a>
											<a href="javascript:;" class="" title="删除" onclick="deleteRole(this);return false;">
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
	deleteRole = function(obj){
		var $id = $(obj).parent().parent().parent().find("input:first").val();
		if($id){
			$.ajax({
				type : "post",
				url : "/role/delRole",
				data : {"id":$id},
				dataType : "json",
				success : function(data) {
					if(data.result == "fail"){
						alert(data.message);
					}else if(data.result == "success"){
						$("#a_roleCenter_tab").find("i:first").click();
						$("#roleCenter_table").click();
						g.success("用户删除成功");
					}
				}
			});
		}
	}
</script>