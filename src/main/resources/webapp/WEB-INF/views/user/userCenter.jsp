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

<div class="page-container page_size_control" id="userCenter_father_div">
	<div class="page-content">
		<div class="portlet-header">
			<div class="actions">
				<shiro:hasPermission name="userOperation">
					<a href="javascript:;" class="button btn-circle" onclick="g.mainModal.open('/user/toAddUserPage')">
						<i class="fa fa fa-plus-circle"></i> <span class="hidden-480">
							添加用户
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
							<th class="code_width">姓名</th>
							<th class="weight_width">E-mail</th>
							<th class="weight_width">联系电话</th>
							<th class="weight_width">所在部门</th>
							<th class="status_width">职位</th>
							<th class="operation_width">入职日期</th>
							<th class="operation_width">账号角色</th>
							<th class="operation_width">最后登录时间</th>
							<th class="operation_width">状态</th>
							<th class="operation_width">操作</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach var="user" items="${list}" varStatus="status">
							<tr>
								<input type="hidden" value="${user.id }"/>
								<td title="${user.firstName}${user.lastName}">${user.firstName}&nbsp;${user.lastName}</td>
								<td title="${user.email}">${user.email }</td>
								<td title="${user.phone}">${user.phone }</td>
								<td >
									<select class="class_department_select" onchange="departmentOnChange(this)">
										<option value="">请选择</option>
										<c:forEach items="${departments }" var="dep" varStatus="var">
											<option value="${dep.id}" ${dep.id==user.departmentId?"selected":"" }>${dep.name}</option>
										</c:forEach>
									</select>
								</td>
								<input type="hidden" value="${user.positionId }"/>
								<td title="">
									<select class="">
										<option value="">请选择</option>
									</select>
								</td>
								<td title='<fmt:formatDate value="${user.createTime }" pattern="yyyy-MM-dd"/>'><fmt:formatDate value="${user.createTime }" pattern="yyyy-MM-dd"/></td>
								<td>
									<select class="form-control search_4 role_multipleSelect" multiple="multiple">
										 <c:forEach items="${roles }" var="role">
											<c:set var="iscontain" value="false" />
											<c:forEach items="${user.roles }" var="userRole">
												<c:if test="${userRole.id eq role.id}">
													<c:set var="iscontain" value="true" />
												</c:if>
											</c:forEach> 
											<option value="${role.id}" value2="${role.code}" ${iscontain eq true?"selected":"" }>${role.name}</option>
										</c:forEach>
									</select>
								</td>
								<td ><fmt:formatDate value="${user.account.lastLoginDate }" pattern="yyyy-MM-dd"/></td>
								<td title="${user.account.isLocked}">${user.account.isLocked==true?"锁定":"正常" }</td>
								<td>
									<div class="operate_fa">
										<shiro:hasPermission name="userOperation">
											<a href="javascript:;" class="btn" title="修改" onclick="okOnclick(this)"> 
												<i class="glyphicon glyphicon-ok"></i>
											</a>
											<c:choose>
												<c:when test="${user.account.isLocked eq true }">
													<a href="javascript:;" class="" title="删除" onclick="deleteUser(this)">
														<i class="fa fa-trash-o"></i>
													</a>
													<a class="btn" title="启用" onclick="lockOrUnlockAccount(this,false)">
														<i class="fa fa-unlock"></i>
													</a>
												</c:when>
												<c:otherwise>
													<a href="javascript:;" title="不允许删除" class="btn" onclick="alert('账户正在使用，不允许删除')"> 
														<i class="fa fa-trash-o disabled" >
														</i>
													</a>
													<a class="btn" title="停用" onclick="lockOrUnlockAccount(this,true)">
														<i class="fa fa-lock"></i>
													</a>
												</c:otherwise>
											</c:choose>
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

	/**
	*级联
	*/
	departmentOnChange = function(obj){
		if($(obj).val()){
			var $positionSelect=$(obj).parent().parent().find("td:eq(4)").find("select");
		 	$.ajax({
				type : "get",
				url : "/user/getPositonByDepartment",
				data : {"id":$(obj).val()},
				dataType : "json",
				success : function(data) {
					if(data.result == "fail"){
						g.warning(data.message);
					}else if(data.result == "success"){
						$positionSelect.empty();
						$positionSelect.append('<option value="">请选择</option>');
						var list = data.list;
						var positionIdSelected = $(obj).parent().parent().find("input:eq(1)").val();
						for(i=0; i<list.length; i++){
							var selected = "";
							if(list[i].id==positionIdSelected){
								selected = "selected";
							}
							$positionSelect.append('<option value="'+list[i].id+'" '+selected+'>'+list[i].name+'</option>');
						}
					}
				}
			});
		}
	};
	
	$(function(){
		$('.role_multipleSelect').multiselect({enableFiltering: true,
			nonSelectedText:'请选择角色',
        	filterPlaceholder:'搜索',
        	nSelectedText:'项被选中',
        	includeSelectAllOption:true,
        	enableFullValueFiltering: true,//能否全字匹配  
            enableCaseInsensitiveFiltering: true,//不区分大小写
        	selectAllText:'全选/取消全选',
        	allSelectedText:'已选中所有角色',//已选中所有店铺
		});
		
		var $fatherDiv = $("#userCenter_father_div");
		var $tbody = $("#userCenter_father_div").find("tbody");
		var trList = $tbody.children("tr");
		for (var i=0; i<trList.length; i++){
			var obj = trList.eq(i).find("td:eq(3) select");
			departmentOnChange(obj);  //调用级联
		}
		//departmentOnChange(".class_department_select");   //调用级联
	});
	
	/**
	* 提交修改
	*/
	okOnclick = function(obj){
		var user = {};
		var $tr = $(obj).parent().parent().parent();
		//id
		user.id=$tr.find("input:first").val();
		user.email= $tr.find("td:eq(1)").attr("title");
		//部门
		user.departmentId=$tr.find("td:eq(3)").find("select option:selected").val();
		user.departmentName=$tr.find("td:eq(3)").find("select option:selected").text();
		//职位
		user.positionId=$tr.find("td:eq(4)").find("select option:selected").val();
		user.positionName=$tr.find("td:eq(4)").find("select option:selected").text();
		//角色
		$tr.find("td:eq(6)").find("select :selected").each(function(i,selected){
			user['roles['+i+'].id']=$(selected).val();
			user['roles['+i+'].code']=$(selected).attr("value2");
		});
		$.ajax({
			type : "post",
			url : "/user/updateUserCompanyInfo",
			data :user,
			dataType : "json",
			success : function(data) {
				if(data.result == "fail"){
					g.warning(data.message);
				}else if(data.result == "success"){
					$("#a_userCenter_tab").find("i:first").click();
					$("#userCenter_table").click();
					g.success("用户修改成功");
				}
			}
		});
	};
	
	/**
	* 锁定或解锁账户
	*/
	lockOrUnlockAccount = function(obj,flag){
		var userEmail = $(obj).parent().parent().parent().find("td:eq(1)").attr("title");
		if(userEmail && typeof(flag)){
			//var $td = $(obj).parent().parent().parent(); 
			var params = {"operation":flag,"email":userEmail};
			$.ajax({
				type : "post",
				url : "/user/lockOperation",
				data : params,
				dataType : "json",
				success : function(data) {
					if(data.result == "fail"){
						g.warning(data.message);
					}else if(data.result == "success"){
						if(flag==true){
							g.success("用户锁定成功");
							$(obj).find("i").attr("class","fa fa-unlock");   //i标签改图标
							$(obj).attr("title","启用");
							$(obj).attr("onclick","lockOrUnlockAccount(this,false)");
							$(obj).prev().attr("title","不允许删除");	//当前a的前一个元素，即删除按钮
							$(obj).prev().attr("onclick","deleteUser(this);");
							$(obj).prev().find("i").attr("class","fa fa-trash-o");
							$(obj).parent().parent().prev().text("锁定");
						}else {
							g.success("用户解锁成功");	
							$(obj).find("i").attr("class","fa fa-lock");   //i标签改图标
							$(obj).attr("title","停用");
							$(obj).attr("onclick","lockOrUnlockAccount(this,true)");
							$(obj).prev().attr("title","删除");	//当前a的前一个元素，即删除按钮
							$(obj).prev().attr("onclick","alert('账户正在使用，不允许删除');return false;");
							$(obj).prev().find("i").attr("class","fa fa-trash-o disabled");
							$(obj).parent().parent().prev().text("正常");
						}
					}
				}
			});
		}
	};
	
	deleteUser = function(obj){
		//获得id
		var id = $(obj).parent().parent().parent().find("input:eq(0)").val();
		var email = $(obj).parent().parent().parent().find("td:eq(1)").attr("title");
		var param = {"id":id,"email":email};
		if(id){
			$.ajax({
				type : "post",
				url : "/user/deleteUser",
				data :param,
				dataType : "json",
				success : function(data) {
					if(data.result == "fail"){
						g.warning(data.message);
					}else if(data.result == "success"){
						$("#a_userCenter_tab").find("i:first").click();
						$("#userCenter_table").click();
						g.success("用户删除成功");
					}
				}
			});
		}
	}
</script>