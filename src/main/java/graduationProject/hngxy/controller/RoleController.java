package graduationProject.hngxy.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;

import graduationProject.hngxy.dao.PermissionMapper;
import graduationProject.hngxy.dao.RoleMapper;
import graduationProject.hngxy.dao.RolePermissionMapper;
import graduationProject.hngxy.dao.UserRoleMapper;
import graduationProject.hngxy.model.Permission;
import graduationProject.hngxy.model.Role;
import graduationProject.hngxy.model.RolePermission;

@Controller
public class RoleController {

	@Autowired
	RoleMapper roleMapper;
	
	@Autowired
	PermissionMapper permissionMapper;
	
	@Autowired
	RolePermissionMapper rpMapper;
	
	@Autowired
	UserRoleMapper userRoleMapper;
	
	@RequestMapping(value="/role/toRoleCenter",method=RequestMethod.GET)
	private ModelAndView toRoleCenter() {
		ModelAndView mav = new ModelAndView();
		List<Role> roles = roleMapper.selectAllWithPermission();
		for (Role role : roles) {
			List<Permission> pers = role.getPermissions();
			if(pers!=null && pers.size()>0) {
				StringBuffer sbf = new StringBuffer();
				for (Permission permission : pers) {
					sbf.append(permission.getName()).append(",");
				}
				if(sbf.toString().endsWith(",")) {
					role.setPermissionNames(sbf.substring(0, sbf.length()-1));
				}else {
					role.setPermissionNames(sbf.toString());	
				}
			}
		}
		mav.addObject("list",roles);
		mav.setViewName("/role/RoleCenter");
		return mav;
	}
	
	@RequestMapping(value="/role/toAddRolePage",method=RequestMethod.GET)
	private ModelAndView toAddRolePage() {
		ModelAndView mav = new ModelAndView();
		List<Permission> pers = permissionMapper.selectAll();
		mav.addObject("list",pers);
		mav.setViewName("/role/addRole");
		return mav;
	}
	
	@ResponseBody
	@RequestMapping(value="/role/addRole",method=RequestMethod.POST)
	private String addRole(Role role) {
		JSONObject resp = new JSONObject();
		roleMapper.insert(role);
		List<Permission> perms = role.getPermissions();
		if(perms!=null && perms.size()>0) {
			for (Permission permission : perms) {
				RolePermission rp = new RolePermission();
				rp.setRoleId(role.getId());
				rp.setPermissionId(permission.getId());
				rpMapper.insert(rp);
			}
		}
		resp.put("result", "success");
		return resp.toJSONString();
	}
	
	@ResponseBody
	@RequestMapping(value="/role/delRole",method=RequestMethod.POST)
	private String delRole(Integer id, HttpServletRequest request, HttpServletResponse response) {
		request.getHeader("4343");
		request.getAttribute("");
		request.getParameter("");
		JSONObject resp = new JSONObject();
		//删除角色
		Role role = roleMapper.selectByPrimaryKey(id);
		if(role!=null) {
			roleMapper.deleteByPrimaryKey(id);
			userRoleMapper.deleteByRoleId(id);
			resp.put("result", "success");
		}else {
			resp.put("result", "fail");
			resp.put("message", "参数错误");
		}
		return resp.toJSONString();
	}
	
}
