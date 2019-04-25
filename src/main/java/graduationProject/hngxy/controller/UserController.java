package graduationProject.hngxy.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;

import graduationProject.hngxy.dao.AccountMapper;
import graduationProject.hngxy.dao.DepartmentMapper;
import graduationProject.hngxy.dao.PositionMapper;
import graduationProject.hngxy.dao.RoleMapper;
import graduationProject.hngxy.dao.UserMapper;
import graduationProject.hngxy.dao.UserRoleMapper;
import graduationProject.hngxy.model.Account;
import graduationProject.hngxy.model.Department;
import graduationProject.hngxy.model.Position;
import graduationProject.hngxy.model.Role;
import graduationProject.hngxy.model.User;
import graduationProject.hngxy.service.UserService;
import graduationProject.hngxy.utils.PasswordUtil;

@Controller
public class UserController {

//	private static Logger logger = Logger.getLogger(UserController.class);
	
	@Autowired
	private RoleMapper roleMapper;
	
	@Autowired
	private UserMapper userMapper;
	
	@Autowired
	private AccountMapper accountMapper;
	
	@Autowired
	private DepartmentMapper departmentMapper;
	
	@Autowired
	private PositionMapper positionMapper;
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value="/user/info",method=RequestMethod.GET)
	private ModelAndView info() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("info");
		return mav;
	}
	
	@RequestMapping(value="/user/getUserInfo",method=RequestMethod.GET)
	private ModelAndView getUserInfo(HttpSession session) {
		ModelAndView mav = new ModelAndView();
		String email = ((User)session.getAttribute("CURRENT_LOGIN_USER")).getEmail();
		User user = userMapper.selectByEmail(email);
		List<Role> roles = roleMapper.selectByEmail(email);
		mav.setViewName("/user/userInfo");
		mav.addObject("user",user);
		StringBuilder sb = new StringBuilder();
		for (Role role : roles) {
			sb.append(role.getName()).append(",");
		}
		if(sb.toString().endsWith(",")) {
			mav.addObject("roles",sb.substring(0, sb.length()-1));
		}
		return mav;
	}
	
	@ResponseBody
	@RequestMapping(value="/user/modifyUserInfo",method=RequestMethod.POST)
	private String modifyUserInfo(User user,HttpSession session) {
		JSONObject res = new JSONObject();
		Integer userId = ((User)session.getAttribute("CURRENT_LOGIN_USER")).getId();
		if(userId == null) {
			res.put("result", "fail");
			res.put("message", "请刷新后再试");
		}else {
			user.setId(userId);
			int i = userMapper.updateUserInfoByPrimaryKey(user);
			if(i>0) {
				res.put("result", "success");
				User thelastedUser = userMapper.selectByPrimaryKey(user.getId());
				session.setAttribute("CURRENT_LOGIN_USER", thelastedUser);
			}else {
				res.put("result", "fail");
				res.put("message", "已更新，但条数为零");
			}
		}
		return res.toJSONString();
	}
	
	@RequestMapping(value="/user/toUpdatePasswd",method=RequestMethod.GET)
	private ModelAndView toUpdatePasswd() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("/user/updatePasswd");
		return mav;
	}
	
	@ResponseBody
	@RequestMapping(value="/user/updatePasswd",method=RequestMethod.POST)
	private String updatePasswd(String oldPasswd,String newPasswd,HttpSession session) {
		JSONObject res = new JSONObject();
		String email = ((User)session.getAttribute("CURRENT_LOGIN_USER")).getEmail();
		if(email == null) {
			res.put("result", "fail");
			res.put("message", "请刷新后再试");
		}else {
			Account account = accountMapper.selectAccountByEmail(email);
			String encyPasswd = PasswordUtil.getEncryptionPasswd(oldPasswd, account.getSalt());
			if(encyPasswd.equals(account.getPasswd())) {
				int i = accountMapper.updatePasswdById(account.getId(), PasswordUtil.getEncryptionPasswd(newPasswd,account.getSalt()));
				if(i>0) {
					res.put("result", "success");
				}else {
					res.put("result", "fail");
					res.put("message", "已更新，但条数为零");
				}
			}else {
				res.put("result", "fail");
				res.put("message", "旧密码错误");
			}
		}
		return res.toJSONString();
	}
	
	@RequestMapping(value="/user/toUserCenter",method=RequestMethod.GET)
	private ModelAndView toUserCenter() {
		ModelAndView mav = new ModelAndView();
		List<User> users = userMapper.selectAll();
		List<Department> departments = departmentMapper.selectAll();
		List<Role> roles = roleMapper.selectAll();
		mav.addObject("list",users);
		mav.addObject("departments",departments);
		mav.addObject("roles",roles);
		
		mav.setViewName("/user/userCenter");
		return mav;
	}
	
	@RequestMapping(value="/user/getPositonByDepartment",method=RequestMethod.GET)
	@ResponseBody
	private String getPositonByDepartment(Integer id) {
		JSONObject resp = new JSONObject();
		if(id == null) {
			id=-1;
		}
		List<Position> positions = positionMapper.selectByDepartmentId(id);
		resp.put("list", positions);
		resp.put("result", "success");
		return resp.toString();
	}
	
	@RequestMapping(value="/user/updateUserCompanyInfo",method=RequestMethod.POST)
	@ResponseBody
	private String updateUserCompanyInfo(User user) {
		JSONObject resp = new JSONObject();
		if(user.getEmail() == null || "".equals(user.getEmail())) {
			resp.put("result", "fail");
			resp.put("message", "请刷新后再试");
			return resp.toString();
		}
		if(user.getDepartmentId()==null) {
			user.setDepartmentName(null);
		}
		if(user.getPositionId() == null) {
			user.setPositionName(null);
		}
		resp.putAll(userService.updateUserCompanyInfo(user));
		return resp.toString();
	}
	
	@RequestMapping(value="/user/lockOperation",method=RequestMethod.POST)
	@ResponseBody
	private String lockOperation(Boolean operation,String email) {
		JSONObject resp = new JSONObject();
		if(email == null || "".equals(email)) {
			resp.put("result", "fail");
			resp.put("message", "请刷新后再试");
			return resp.toString();
		}else if(operation == null) {
			resp.put("result", "fail");
			resp.put("message", "参数不正确");
		}else {
			resp.putAll(userService.lockOrUnlockAccount(email, operation));
		}
		return resp.toString();
	}
	
	@RequestMapping(value="/user/toAddUserPage",method=RequestMethod.GET)
	private ModelAndView toAddUserPage() {
		ModelAndView mav = new ModelAndView();
		List<Department> departments = departmentMapper.selectAll();
		List<Role> roles = roleMapper.selectAll();
		mav.addObject("departments",departments);
		mav.addObject("roles",roles);
		mav.setViewName("/user/addUser");
		return mav;
	}
	
	@RequestMapping(value="/user/addUser",method=RequestMethod.POST)
	@ResponseBody
	private String addUser(User user) {
		JSONObject resp = new JSONObject();
		resp.putAll(userService.addUser(user));
		return resp.toString();
	}
	
	@RequestMapping(value="/user/deleteUser",method=RequestMethod.POST)
	@ResponseBody
	private String deleteUser(User user) {
		JSONObject resp = new JSONObject();
		resp.putAll(userService.deleteUser(user));
		return resp.toString();
	}
}
