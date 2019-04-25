package graduationProject.hngxy.service;

import com.alibaba.fastjson.JSONObject;

import graduationProject.hngxy.model.Department;

public interface OrganizationService {
	
	public JSONObject delDepartmentByid(Integer id);
	
	public JSONObject editDepartmentByid(Department dep);
}
