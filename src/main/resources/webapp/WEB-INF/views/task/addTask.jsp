<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>

<div class="modal-dialog modal-dialog-small">
	<div class="modal-content modal-sm-content">
		<div class="modal-header01">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
			<h4 class="modal-title">
				&nbsp;&nbsp;创建任务
			</h4>
		</div>
		<form id="form_in_addTask" class="form-horizontal">
			<div class="row enterprise-border">
				<div class="row">
					<div class="col-md-12">
						<label class="control-label col-md-4">
							<span class="required" >*</span>
							任务描述
						</label>
						<div class="col-md-4">
							<textarea name="describe" rows="3" cols="2" class="form-control"></textarea>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<label class="control-label col-md-4">
							父任务
						</label>
						<div class="col-md-4">
							<select class="class_department_select" name="parentTaskId">
								<option value="">请选择</option>
								<c:forEach items="${tasks }" var="task" varStatus="var">
									<option value="${task}">${task}</option>
								</c:forEach>
							</select>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<label class="control-label col-md-4">
						<span class="required" >*</span>
							接收对象
						</label>
						<div class="col-md-4">
							<select class="class_department_select" name="receiveObject" id="receiveObject_in_addTaskPage" onchange="receiveObjectOnchange();return false;">
								<option value="department">部门</option>
								<option value="position">职位</option>
								<option value="employee">员工</option>
							</select>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<label class="control-label col-md-4">
						<span class="required" >*</span>
							具体对象
						</label>
						<div class="col-md-4">
							<select class="class_department_select" id="specific_object_in_page" name="specificObjectInPage">
							</select>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<label class="control-label col-md-4">
						<span class="required" >*</span>
							紧急程度
						</label>
						<div class="col-md-4">
							<select class="class_department_select" name="level">
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
							</select>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<label class="control-label col-md-4">
							备注
						</label>
						<div class="col-md-4">
							<textarea rows="3" cols="2" class="form-control" name="memo"></textarea>
						</div>
					</div>
				</div>
				<div class="row">
				</div>
				<div class="row">
				</div>
				<div class="row">
				</div>
				
				<div class="right">
					<button type="submit" class="btn blue ">
						<i class="fa fa-check">	</i>
						确定
					</button>
					<button type="button" data-dismiss="modal" class="btn cancel-btn" id="cancelBtn_in_addTask">
						<i class="fa fa-times"></i>
						取消
					</button>
			   </div>
			</div>
		</form>
	</div>
</div>

<script>
	
	/**
	* 级联
	*/
	receiveObjectOnchange = function(){
		var receiveObject = $("#receiveObject_in_addTaskPage").val();
		if(receiveObject){
				$.ajax({
					type : "post",
					url : "/task/getReceiveObject",
					data : {"receiveObject":receiveObject},
					dataType : "json",
					success : function(data) {
						if(data.result == "fail"){
							g.warning(data.message);
						}else if(data.result == "success"){
							var $objectSelect = $("#specific_object_in_page");
							$objectSelect.empty();
							var list = data.list;
							for(i=0; i<list.length; i++){
								$objectSelect.append('<option value="'+list[i].id+'" >'+list[i].name+'</option>');
							}
						}
					}
				});
			}
	}
	
	$(function(){
		receiveObjectOnchange();//调用级联
		$("#form_in_addTask").validate({
			focusInvalid : false,
			rules : {
				describe:{
					required : true,
					maxlength : 100
				},
				receiveObject:{
					required : true
				},
				specificObjectInPage:{
					required : true
				},
				level:{
					required : true,
					digits:true,
					range:[1,9]
				}
			},
			messages:{
				describe:{
					required : "请输入任务描述",
					maxlength : "最长100个字符"
				},
				receiveObject:{
					required : "请选择接收对象"
				},
				specificObjectInPage:{
					required : "请选择目标对象"
				},
				level:{
					required : "请选择等级",
					digits: "请输入数字",
					range: "可输入范围[1~9]"
				},
			},
			submitHandler : function() {
				$.ajax({
					type : "post",
					url : "/task/addTask",
					data :$("#form_in_addTask").serialize(),
					dataType : "json",
					success : function(data) {
						if(data.result == "fail"){
							g.warning(data.message);
						}else if(data.result == "success"){
							$("#a_taskCenter_tab").find("i:first").click();
							$("#cancelBtn_in_addTask").click();
							$("#taskCenter_table").click();
							g.success("任务发布成功");
						}
					}
				});
			}
		});
	});
</script>