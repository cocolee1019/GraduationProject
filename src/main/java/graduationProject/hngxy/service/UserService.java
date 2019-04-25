package graduationProject.hngxy.service;

import com.alibaba.fastjson.JSONObject;

import graduationProject.hngxy.model.User;

public interface UserService {
	
	JSONObject updateUserCompanyInfo(User user);
	
	JSONObject lockOrUnlockAccount(String email,boolean oper);
	
	JSONObject addUser(User user);
	
	JSONObject deleteUser(User user);
}
