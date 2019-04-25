<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>LH | MySupermarket</title>
<base href="/MySupermarket/">
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="font-awesome/css/font-awesome.css" rel="stylesheet">
<!-- Toastr style -->
<link href="css/plugins/toastr/toastr.min.css" rel="stylesheet">
<!-- Gritter -->
<link href="js/plugins/gritter/jquery.gritter.css" rel="stylesheet">
<!-- select2 -->
<link rel="stylesheet" type="text/css" href="theme/select2/select2.css"/>
<link rel="stylesheet" type="text/css" href="theme/bootstrap-multiselect/css/bootstrap-multiselect.css"/>
<!-- jsTree -->
<link href="css/plugins/jsTree/style.min.css" rel="stylesheet">
<link href="css/animate.css" rel="stylesheet" type="text/css">
<link href="css/style.css" rel="stylesheet" type="text/css">
<link href="css/golab.css" rel="stylesheet" type="text/css">
<link href="css/globle.css" rel="stylesheet" type="text/css">
<link href="css/global.css" rel="stylesheet" type="text/css">
<link href="css/fusionzoom.css" rel="stylesheet" type="text/css">
<!-- 提示框 -->
<link rel="stylesheet" href="theme/jquery-ui.min.css">
<link rel="stylesheet" href="theme/assets/global/css/components-md.css">
<link rel="stylesheet" href="theme/common.css">
<link rel="stylesheet" href="theme/english.css">
</head>
<body>
	<div id="wrapper">
		<nav class="navbar-default navbar-static-side" role="navigation">
			<div class="sidebar-collapse">
				<ul class="nav metismenu" id="side-menu">
					<li class="nav-header">
						<div class="dropdown profile-element">
							<span> <img alt="image" class="img-circle"
								src="img/profile_small.jpg" />
							</span> <a data-toggle="dropdown" class="dropdown-toggle"
								href="index.html#"> <span class="clear"> <span
									class="block m-t-xs"> <strong class="font-bold">David
											Williams</strong>
								</span> <span class="text-muted text-xs block">Art Director <b
										class="caret"></b></span>
							</span>
							</a>
							<ul class="dropdown-menu animated fadeInRight m-t-xs">
								<li><a href="profile.html">Profile</a></li>
								<li><a href="contacts.html">Contacts</a></li>
								<li><a href="mailbox.html">Mailbox</a></li>
								<li class="divider"></li>
								<li><a href="login.html">Logout</a></li>
							</ul>
						</div>
						<div class="logo-element">IN+</div>
					</li>
					<li class="active">
                        <a href="javascript:;">
                        	<i class="fa fa-bars"></i>
                       		<span class="nav-label">
                       			<spring:message code="" text="首页" />
                       		</span>
                        </a>
                    </li>
                    <!-- 商品模块权限 -->
                  	<shiro:hasPermission name="COMMODITY_MODULE">
						<li>
							<a href="javascript:;">
								<i class="fa fa-edit"></i>
								<span class="nav-label"><spring:message code="" text="商品" /></span>
								<span class="fa arrow"></span>
							</a>
							<ul class="nav nav-second-level">
								<!-- 商品列表权限 -->
								<shiro:hasPermission name="COMMODITY_MODULE_LIST_OF_GOODS">
								<li>
									<a href="javascript:;" onclick="g.load('commodity/list',this);return false;">
										<spring:message code="" text="商品列表" />
									</a>
								</li>
								</shiro:hasPermission>
								<!-- 商品录入权限 -->
								<shiro:hasPermission name="COMMODITY_MODULE_COMMODITY_ENTRY">
								<li>
									<a href="javascript:;" onclick="g.load('commodity/addCommodity',this);return false;">
										<spring:message code="" text="商品录入" />
									</a>
								</li>
								</shiro:hasPermission>
							</ul>
						</li>
					</shiro:hasPermission>
					<!-- 仓库模块权限 -->
					<shiro:hasPermission name="WAREHOUSE_MODULE">
					<li>
						<a href="javascript:;">
							<i class="fa fa-square"></i>
							<span class="nav-label"><spring:message code="" text="仓库" /></span>
							<span class="fa arrow"></span>
						</a>
						<ul class="nav nav-second-level">
							<!-- 仓库列表权限 -->
							<shiro:hasPermission name="WAREHOUSE_MODULE_WAREHOUSE_LIST">
							<li>
								<a href="javascript:;" onclick="g.load('warehouse/list',this);return false;">
									<spring:message code="" text="仓库列表" />
								</a>
							</li>
							</shiro:hasPermission>
							<!-- 仓库录入权限 -->
							<shiro:hasPermission name="WAREHOUSE_MODULE_WAREHOUSE_ENTRY">
							<li>
								<a href="javascript:;" onclick="g.load('warehouse/add',this);return false;">
									<spring:message code="" text="仓库添加" />
								</a>
							</li>
							</shiro:hasPermission>
						</ul>	
					</li>
					</shiro:hasPermission>
					<!-- 库存模块权限 -->
					<shiro:hasPermission name="INVENTORY_MODULE">
					<li>
						<a href="javascript:;">
							<i class="fa fa-book"></i>
							<span class="nav-label"><spring:message code="" text="库存" /></span>
							<span class="fa arrow"></span>
						</a>
						<ul class="nav nav-second-level">
							<!-- 库存列表权限 -->
							<shiro:hasPermission name="INVENTORY_MODULE_INVENTORY_LIST">
							<li>
								<a href="javascript:;" onclick="g.load('stock/list',this);return false;">
									<spring:message code="" text="库存列表" />
								</a>
							</li>
							</shiro:hasPermission>
							<!-- 库存录入权限 -->
							<shiro:hasPermission name="INVENTORY_MODULE_INVENTORY_ENTRY">
							<li>
								<a href="javascript:;" onclick="g.load('stock/addCommodity',this);return false;">
									<spring:message code="" text="库存录入" />
								</a>
							</li>
							</shiro:hasPermission>
							<!-- 库存明细权限 -->
							<shiro:hasPermission name="INVENTORY_MODULE_INVENTORY_DETAIL">
							<li>
								<a href="javascript:;" onclick="g.load('stock/list',this);return false;">
									<spring:message code="" text="库存明细" />
								</a>
							</li>
							</shiro:hasPermission>
						</ul>	
					</li>
					</shiro:hasPermission>
					<!-- 小票模块 -->
					<shiro:hasPermission name="SMALL_TICKET_MODULE">
					<li>
						<a href="javascript:;">
							<i class="fa fa-th-large"></i>
							<span class="nav-label"><spring:message code="" text="小票" /></span>
							<span class="fa arrow"></span>
						</a>
						<ul class="nav nav-second-level">
							<!-- 小票列表权限 -->
							<shiro:hasPermission name="SMALL_TICKET_MODULE_LIST_OF_SMALL_TICKETS">
							<li>
								<a href="javascript:;" onclick="g.load('commodity/addCommodity',this);return false;">
									<spring:message code="" text="小票列表" />
								</a>
							</li>
							</shiro:hasPermission>
							<!-- 小票明细 -->
							<shiro:hasPermission name="SMALL_TICKET_MODULE_SMALL_TICKET_DETAIL">
							<li>
								<a href="javascript:;" onclick="g.load('commodity/addCommodity',this);return false;">
									<spring:message code="" text="小票明细" />
								</a>
							</li>
							</shiro:hasPermission>
							<!-- 小票录入权限 -->
							<shiro:hasPermission name="SMALL_TICKET_MODULE_SMALL_TICKET_ENTRY">
							<li>
								<a href="javascript:;" onclick="g.load('commodity/addCommodity',this);return false;">
									<spring:message code="" text="小票录入" />
								</a>
							</li>
							</shiro:hasPermission>
						</ul>
					</li>
					</shiro:hasPermission>
					<!-- 销售权限 -->
					<shiro:hasPermission name="SALES_MODULE">
					<li>
						<a href="javascript:;">
							<i class="fa fa-money"></i>
							<span class="nav-label"><spring:message code="" text="销售" /></span>
							<span class="fa arrow"></span>
						</a>
						<ul class="nav nav-second-level">
							<!-- 销售列表权限 -->
							<shiro:hasPermission name="SALES_MODULE_SALES_LIST">
							<li>
								<a href="javascript:;" onclick="g.load('commodity/addCommodity',this);return false;">
									<spring:message code="" text="销售列表" />
								</a>
							</li>
							</shiro:hasPermission>
							<!-- 销售推荐 -->
							<shiro:hasPermission name="SALES_MODULE_SALES_RECOMMENDATION">
							<li>
								<a href="javascript:;" onclick="g.load('commodity/addCommodity',this);return false;">
									<spring:message code="" text="销售推荐" />
								</a>
							</li>
							</shiro:hasPermission>
						</ul>
					</li>
					</shiro:hasPermission>
					<!-- 用户管理模块权限 -->
					<shiro:hasPermission name="USER_MANAGEMENT_MODULE">
					<li class="landing_link">
						<a href="javascript:;">
							<i class="fa fa-cog"></i>
							<span class="nav-label"><spring:message code="" text="用户管理" /></span>
							<span class="fa arrow"></span>
						</a>
						<ul class="nav nav-second-level">
							<!-- 用户权限管理-->
							<shiro:hasPermission name="USER_MANAGEMENT_MODULE_AUTHORITY_MANAGEMENT">
							<li>
								<a href="javascript:;" onclick="g.load('user/list',this);return false;">
									<spring:message code="" text="用户权限管理" />
								</a>
							</li>
							</shiro:hasPermission>
						</ul>
					</li>
					</shiro:hasPermission>
				</ul>
			</div>
		</nav>

		<div id="page-wrapper" class="gray-bg dashbard-1">
			<div class="row border-bottom">
				<nav class="navbar navbar-static-top" role="navigation"
					style="margin-bottom: 0">
					<ul class="nav navbar-top-links navbar-right">
						<li>
							<span class="m-r-sm text-muted welcome-message">
								Welcome to INSPINIA+ Admin Theme.
							</span>
						</li>
						<!-- 消息提示 -->
						<li class="dropdown">
							<a class="dropdown-toggle count-info" data-toggle="dropdown" href="javascript:;">
								<i class="fa fa-bell"></i>
								<span class="label label-primary">8</span>
							</a>
							<ul class="dropdown-menu dropdown-alerts">
								<li><a href="javascript:;">
										<div>
											<i class="fa fa-envelope fa-fw"></i> You have 16 messages <span
												class="pull-right text-muted small">4 minutes ago</span>
										</div>
								</a></li>
								<li class="divider"></li>
								<li><a href="javascript:;">
										<div>
											<i class="fa fa-twitter fa-fw"></i> 3 New Followers <span
												class="pull-right text-muted small">12 minutes ago</span>
										</div>
								</a></li>
								<li class="divider"></li>
								<li><a href="javascript:;">
										<div>
											<i class="fa fa-upload fa-fw"></i> Server Rebooted <span
												class="pull-right text-muted small">4 minutes ago</span>
										</div>
								</a></li>
								<li class="divider"></li>
								<li>
									<div class="text-center link-block">
										<a href="javascript:;">
											<strong>See All Alerts</strong><i class="fa fa-angle-right"></i>
										</a>
									</div>
								</li>
							</ul>
						</li>
						<li>
							<a href="logout" onclick="g.info('退出系统')">
								<i class="fa fa-sign-out"></i>
								Log out
							</a>
						</li>
						<li>
							<a class="right-sidebar-toggle"> <i
								class="fa fa-tasks"></i>
							</a>
						</li>
					</ul>

				</nav>
			</div>
			<!-- 选项卡加载 -->
			<div class="row  border-bottom white-bg dashboard-header">
				<ul class="nav nav-tabs" id="navTabPanel">
				   <li class="active" data-id="div1">
					   	<a href="#div1" data-toggle="tab">
					   		<span><spring:message code="" text="首页" /></span>
					   		<!-- <i class="fa fa-close tab-close navTabPanelClose"></i> -->
					   	</a>
				   </li>
				</ul>
				<div id="navTabPanelDiv" class="tab-content">
					<div id="div1" class="tab-pane fade active in">首页内容</div>
				</div>
			</div>
		</div>
	</div>
<!-- 公共主弹出框 -->
<div id="publicMainModal" class="modal fade bs-modal-lg" role="dialog" aria-hidden="true"></div>
<!-- 公共副弹出框 -->
<div id="publicAssistModal" class="modal fade bs-modal-lg" role="dialog" aria-hidden="true"></div>
<!-- 弹出确认-->
<a data-toggle="modal" id="global-confirm-model-a" data-target="#global-confirm-model"></a>
<div class="modal fade bs-modal-sm" id="global-confirm-model" role="dialog" aria-hidden="true" style="display: none; padding-right: 17px;">
	<div class="modal-dialog modal-sm" style="top:20px;z-index:1000000000">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title"></h4>
			</div>
			<div class="modal-body">
			</div>
			<div class="modal-footer">
				<button type="button" class="btn cancel-btn" data-dismiss="modal"><i class="fa fa-times"></i><spring:message code="i18n.pages.permissionTemplate.button.close" text="取消" /></button>
				<button type="button" class="btn preservation-btn2"><i class="fa fa-check"></i><spring:message code="i18n.pages.permissionTemplate.button.ok" text="确定1111" /></button>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
</body>
<!-- Mainly scripts -->
<script src="js/jquery-2.1.1.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/plugins/metisMenu/jquery.metisMenu.js"></script>
<script src="js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
<!-- Flot -->
<script src="js/plugins/flot/jquery.flot.js"></script>
<script src="js/plugins/flot/jquery.flot.tooltip.min.js"></script>
<script src="js/plugins/flot/jquery.flot.spline.js"></script>
<script src="js/plugins/flot/jquery.flot.resize.js"></script>
<script src="js/plugins/flot/jquery.flot.pie.js"></script>
<!-- Peity -->
<script src="js/plugins/peity/jquery.peity.min.js"></script>
<script src="js/demo/peity-demo.js"></script>
<!-- Custom and plugin javascript -->
<script src="js/inspinia.js"></script>
<script src="js/plugins/pace/pace.min.js"></script>
<!-- jQuery UI -->
<script src="js/plugins/jquery-ui/jquery-ui.min.js"></script>
<!-- GITTER -->
<script src="js/plugins/gritter/jquery.gritter.min.js"></script>
<!-- Sparkline -->
<script src="js/plugins/sparkline/jquery.sparkline.min.js"></script>
<!-- Sparkline demo data  -->
<script src="js/demo/sparkline-demo.js"></script>
<!-- ChartJS-->
<script src="js/plugins/chartJs/Chart.min.js"></script>
<!-- Toastr -->
<script src="js/plugins/toastr/toastr.min.js"></script>
<!-- select2 -->
<script src="theme/select2/select2.min.js"></script>
<!-- 树节点 -->
<script src="js/plugins/jsTree/jstree.min.js"></script>
<script src="js/global.js"></script>
<script src="theme/jquery-validation/js/jquery.validate.min.js"></script>
<script src="theme/jquery-validation/js/localization/messages_zh.js"></script>
<!-- 提示框 -->
<script src="theme/jquery-ui.js"></script>
<!-- 多选框 -->
<script src="theme/bootstrap-multiselect/js/bootstrap-multiselect.js"></script>
<!-- 页面 -->
<script src="js/pages/commodity/commodityHandle.js"></script>
<script src="js/pages/user/userHandle.js"></script>
<script src="js/pages/warehouse/warehouseHandler.js"></script>
<script src="js/pages/stock/stock.js"></script>
<script type="text/javascript">
jQuery(document).ready(function() {   
});
</script>
</html>