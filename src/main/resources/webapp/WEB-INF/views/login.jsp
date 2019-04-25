<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<title>企业任务分配系统</title>
<style>  
.col-center-block {  
    float: none;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.error{
	color:red;
}
</style> 
</head>
<body>
	 <div class="container">  
	  <div class="row">  
	    <div class="col-xs-6 col-md-4 col-center-block">  
	      <form class="form-signin" id="loginForm"> 
	      <br>
	      <br>
	      <br>
	      <br>
	        <h2 class="form-signin-heading">请登录</h2>  
	        <div class="form-group">
		        <label for="username" class="sr-only">用户名</label>  
	        	<input type="text" id="userName" name="userName" class="form-control" placeholder="用户名">  
        	</div>
            
            <div class="form-group">
		        <label for="inputPassword" class="sr-only">密码</label> 
				<input type="password" id="paaswd" name="passwd" class="form-control" placeholder="密码">  
			</div>
			
	        <div class="checkbox">  `
	          <label>  
	            <input type="checkbox" value="remember-me">  
	            记住我 </label>  
	        </div>  
	        <button class="btn btn-lg btn-primary btn-block" type="submit">登录</button>  
	      </form>  
	    </div>  
	  </div>  
	</div>  
</body>
<script src="/js/jquery.js"></script>
<script src="/js/jquery.validate.min.js"></script>
<script src="/js/login/loginHander.js"></script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
<script>
	$().ready(function() {
		loginHander.formValidate("loginForm");
	});
</script>

</html>