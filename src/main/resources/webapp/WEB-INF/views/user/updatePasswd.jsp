<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<style>  
	.error{
		color:red;
	}
</style>
<div class="page-container page_size_control">
	<div class="container invite_box form-horizontal" >
		<div class="form-body">
			<form action="javascript:;" id="form_update_passwd">
				<div class="portlet light bordered">
					<div class="portlet-title" style="border:none;">
						<div class="caption">
							<i class="fa fa-dashcube"></i>修改密码
						</div>
					</div>
					<div class="portlet-body form form-horizontal">
						<div class="row enterprise-border">
							<div class="col-md-6">
								<div class="form-group ">
									<label class="control-label col-md-5">旧密码</label>
									<div class="col-md-7">
										<input type="password" class="form-control" data-required="1"
										name="oldPasswd" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="portlet-body form form-horizontal">
						<div class="row enterprise-border">
							<div class="col-md-6">
								<div class="form-group ">
									<label class="control-label col-md-5">新密码</label>
									<div class="col-md-7">
										<input type="password" id="newPasswd" class="form-control" data-required="1"
										name="newPasswd" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="portlet-body form form-horizontal">
						<div class="row enterprise-border">
							<div class="col-md-6">
								<div class="form-group ">
									<label class="control-label col-md-5">确认</label>
									<div class="col-md-7">
										<input type="password" class="form-control" data-required="1"
										name="confirmPasswd" placeholder="请再次输入新密码"/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="form_operate_box">
						<div class="row enterprise-border">
							 <div class="form_operate_box">
								<button type="submit" class="btn blue save-button-sku-add" >
								<i class="fa fa-check"></i>确定</button>
								<button type="button" class="btn cancel-btn" onclick="closePlan()">
								<i class="fa fa-times"></i>取消</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
<script>
	closePlan = function(){
		$("#a_updatePasswd_tab").find("i:first").click();
	};
	$(function(){
		$("#form_update_passwd").validate({
			focusInvalid : false,
			rules : {
				oldPasswd:{
					required : true,
					minlength : 5,
					maxlength : 100
				},
				newPasswd:{
					required : true,
					minlength : 5,
					maxlength : 100
				},
				confirmPasswd:{
					 equalTo: "#newPasswd"
				}
			},
			messages:{
				oldPasswd:{
					required : "请输入旧密码",
					minlength : "至少输入5位密码",
					maxlength : "最大长度100个字符"
				},
				newPasswd:{
					required : "请输入新密码",
					minlength : "至少输入5位密码",
					maxlength : "最大长度100个字符"
				},
				confirmPasswd:{
					equalTo : "两次密码不一样"
				}
			},
			submitHandler : function() {
				$.ajax({
					type : "post",
					url : "/user/updatePasswd",
					data : $("#form_update_passwd").serializeArray(),
					dataType : "json",
					success : function(data) {
						if(data.result == "fail"){
							alert(data.message);
						}else if(data.result == "success"){
							closePlan();
							g.success("密码更新成功");
						}
					}
				});
			}
		});
	});
</script>