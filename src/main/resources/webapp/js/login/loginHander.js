var loginHander = function() {
	var formValidate = function(form) {
		$("#"+form).validate({
			focusInvalid : false,
			rules : {
				userName:{
					required : true,
					maxlength : 100,
					email:true
				},
				passwd:{
					required : true,
					maxlength : 100
				}
			},
			messages : {
				userName:{
					required : '请输入账号',
					maxlength : '最大100字符',
					email:"不是正确的邮件格式"
				},
				passwd:{
					required : '请输入密码',
					maxlength : '最大100字符'
				}
			},
			submitHandler : function() {
				$.ajax({
					type : "post",
					url : "/login",
					data : $("#" + form).serializeArray(),
					dataType : "json",
					success : function(data) {
						console.log(data);
						if(data.result == "fail"){
							alert(data.message);
						}else if(data.result == "success"){
							window.location.replace("/home");
						}
					}
				});
			}
		});
	};
	return {
		formValidate : function(form){
			formValidate(form);
		}
	}
}();