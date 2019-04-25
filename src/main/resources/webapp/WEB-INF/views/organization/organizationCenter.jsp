<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>

<script src="/js/treegrid.js"></script>
<!-- <script src="/js/global2.js"></script> -->
<link href="/js/uniform/css/uniform.default.css" rel="stylesheet" type="text/css">
<script src="/js/uniform/jquery.uniform.min.js" type="text/javascript"></script>
<script src="/js/uniform/jquery.uniform.min.js" type="text/javascript"></script>  
<div class="page-container">
	<div class="page-content">
		<div class="container">
			<div class="portlet-header">
				<div class="actions" style="margin-bottom: 8px;">
					<!-- 顶部菜单 -->
					<shiro:hasPermission name="departmentOperation">
						<a href="javascript:void(0);" onclick="g.mainModal.open('/org/toAddOrgPage');return false;" class="button btn-circle "> 
							<i class="fa fa-plus-circle"></i> <span
							class="hidden-480"><span class="hidden-480">新 增</span></span>
						</a>
					</shiro:hasPermission>
				</div>
				<div id="organizationCategoryList_Div">
				</div>
			</div>
		</div>
	</div>
</div>

<script>
	addPosition = function(id){
		alert(id);
	};
	
	selectCategoryInit = function() {
		categoryTree = new treegrid({
			proxyId : "organizationCategoryList_Div",
			url : '/org/getAllDepartment',
			// expandUrl : '/companyCategory/tree?id=',
			allowNoneSelect : true,
			isMultiSelect : true,
			checkbox : true,// 是否存在多选框
			isRelationCheck : true,// 是否级联选中
			displayType : "normal",
			idField : "id",
			textField : "name",
			parentIdField : "parentId",
			onClick : function(event) {
			// 点击事件
			},
			header : [ 
				{
					field : 'name',
					text : '部门'
				}, {
					field : 'positions',
					text : '职位'
				}, {
					field : 'responsibility',
					text : '职责描述'
				}, 
				 //<shiro code="FUNC_MODULE_GOODS_CONFIG_CATEGORY_EDIT_EDIT">, 
				{
				 	field : '',
				 	text : '操作',
					render : function(data) {
						var head = '<div class="operate_fa">';
						var startPermission = "<shiro:hasPermission name='departmentOperation'>";
						var addRow = '<a href="javascript:;" onclick="delOrg(' + data.id + ');return false;" title="添加职位"> <i class="fa fa-trash-o"></i></a>';
						var edit = '<a href="javascript:;" onclick="g.mainModal.open(\'/org/toEditOrgPage\',{\'id\':'+data.id+'});return false;" title="编辑部门"> <i class="fa fa-edit"></i> </a>';
						var endPermission = "</shiro:hasPermission>";
						var tail = '</div>';
						return head + addRow + edit + tail;
					}
				} 
				// </shiro>
			],
		}); //new treegrid(
		categoryTree.init();
	};
	
	jQuery(document).ready(function() {
		selectCategoryInit();
	});
	
	delOrg = function(departmentId){
		var param = {"departmentId":departmentId};
		$.ajax({
			type : "post",
			url : "/org/delOrg",
			data : param,
			dataType : "json",
			success : function(data) {
				if(data.result == "fail"){
					alert(data.message);
				}else if(data.result == "success"){
					$("#a_OrganitionCenter_tab").find("i:first").click();
					$("#OrgCenter_table").click();
					g.success("删除部门成功");
				}
			}
		});
	};
</script>