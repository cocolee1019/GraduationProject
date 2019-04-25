package graduationProject.hngxy.service.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import graduationProject.hngxy.dao.AccountMapper;
import graduationProject.hngxy.dao.RoleMapper;
import graduationProject.hngxy.dao.UserMapper;
import graduationProject.hngxy.dao.UserRoleMapper;
import graduationProject.hngxy.model.Account;
import graduationProject.hngxy.model.Role;
import graduationProject.hngxy.model.User;
import graduationProject.hngxy.model.UserRole;
import graduationProject.hngxy.service.UserService;
import graduationProject.hngxy.utils.MailSendThread;
import graduationProject.hngxy.utils.PasswordUtil;

@Service
public class UserServiceImpl implements UserService{

	Logger logger = Logger.getLogger(UserServiceImpl.class);
	
	@Autowired
	UserMapper userMapper;
	
	@Autowired
	RoleMapper roleMapper;
	
	@Autowired
	UserRoleMapper userRoleMapper;
	
	@Autowired
	AccountMapper accountMapper;
	
	@Autowired
	MailSendServiceImpl mailSendServer;
	
	@Transactional  //TODO 事务没有生效
	public JSONObject updateUserCompanyInfo(User user) {
		JSONObject resp = new JSONObject();
		List<Role> roles = user.getRoles();
		
		List<Role> userRoles = roleMapper.selectByEmail(user.getEmail());
		boolean isExistSystemManagerRole = false;
		int systemManagermentId = -1;
		for (Role role : userRoles) {
			if("SYSTEM_MANAGERMENT".equals(role.getCode())) {
				isExistSystemManagerRole = true;
				systemManagermentId = role.getId();
				break;
			}
		}
		
		//如果该用户是系统管理员角色，则判断用户的操作是否有删除管理员
		if(isExistSystemManagerRole) {
			boolean isSystemManagermentDelete = true;
			if(roles != null) {
				for(Role role:roles) {
					if(role.getId() == systemManagermentId) {
						isSystemManagermentDelete = false;
						break;
					}
				}
			}
		
			if(isSystemManagermentDelete) { //删除了系统管理员角色
				//判断系统有几个系统管理员，必须要1个以上才可以删除
				int systemManagermentNum = roleMapper.countSystemManagermentNum("SYSTEM_MANAGERMENT");
				if(systemManagermentNum < 2) {
					resp.put("result", "fail");
					resp.put("message", "必须要有一位系统管理员");
					return resp;
				}
			}
		}
		//删除原有的角色
		userRoleMapper.deleteByEmail(user.getEmail());
		
		//新增最新的角色
		if(roles!=null) {
			for (Role role : roles) {
				UserRole userRole = new UserRole();
				userRole.setUserEmail(user.getEmail());
				userRole.setRoleCode(role.getCode());
				userRole.setRoleId(role.getId());
				userRole.setUserId(user.getId());
				userRoleMapper.insert(userRole);
			}
		}
		
		int i = userMapper.updateCompanyInfoByPrimaryKey(user);
		if(i>0) {
			resp.put("result", "success");
		}else {
			resp.put("result","fail");
			resp.put("message", "已更新，但数据库结果返回为0，请刷新后再试");
		}
		return resp;
	}

	public JSONObject lockOrUnlockAccount(String email, boolean oper) {
		JSONObject resp = new JSONObject();
		//判断该账户是否是企业管理员
		List<Role> userRoles = roleMapper.selectByEmail(email);
		boolean isExistSystemManagerRole = false;
		for (Role role : userRoles) {
			if("SYSTEM_MANAGERMENT".equals(role.getCode())) {
				isExistSystemManagerRole = true;
				break;
			}
		}
		
		if(oper && isExistSystemManagerRole) {
			resp.put("result", "fail");
			resp.put("message", "不能锁定系统管理员角色的账号");
		}else {
			int i = accountMapper.updateLockByEmail(email, oper);
			if(i>0) {
				resp.put("result", "success");
			}else {
				resp.put("result", "fail");
				resp.put("message", "已正确更新，但似乎没有返回修改条数");
			}
		}
		return resp;
	}

	public JSONObject addUser(User user) {
		JSONObject resp = new JSONObject();
		//账户表
		//1、先判断Email是否可用
		Account account = accountMapper.selectAccountByEmail(user.getEmail());
		if(account != null) {
			resp.put("result", "fail");
			resp.put("message", "email已被注册");
		}else {
			account = new Account();
			account.setEmail(user.getEmail());
			String passwd = PasswordUtil.randomPassword();  //密码可能需要全局保存
			logger.info("email:"+user.getEmail()+",passwd:"+passwd);
			String salt = PasswordUtil.randomSalt();
			account.setPasswd(PasswordUtil.getEncryptionPasswd(passwd, salt));
			account.setIsLocked(false);
			account.setSalt(salt);
			accountMapper.insert(account);
			userMapper.insert(user);
			List<Role> roles = user.getRoles();
			if(roles!=null) {
				for (Role role : roles) {
					UserRole userRole = new UserRole();
					userRole.setUserEmail(user.getEmail());
					userRole.setRoleCode(role.getCode());
					userRole.setRoleId(role.getId());
					userRole.setUserId(user.getId());
					userRoleMapper.insert(userRole);
				}
			}
			resp.put("result", "success");
			mailSendServer.sendInvitationEmail(user.getEmail(), user.getLastName(), passwd);
		}
		return resp;
	}

	@Transactional
	public JSONObject deleteUser(User user) {
		JSONObject resp = new JSONObject();
		if(user == null || user.getId() == null || user.getEmail()==null) {
			resp.put("result", "fail");
			resp.put("message", "参数错误");
		}else {
			Account account = accountMapper.selectAccountByEmail(user.getEmail());
			if(!account.getIsLocked()) {
				resp.put("result", "fail");
				resp.put("message", "账户正在使用，不允许删除");
			}else {
				//判断该账户是否是企业管理员
				List<Role> userRoles = roleMapper.selectByEmail(user.getEmail());
				boolean isExistSystemManagerRole = false;
				for (Role role : userRoles) {
					if("SYSTEM_MANAGERMENT".equals(role.getCode())) {
						isExistSystemManagerRole = true;
						break;
					}
				}
				
				if(!isExistSystemManagerRole) {
					//删除账号
					accountMapper.deleteByPrimaryKey(account.getId());
					//删除用户
					userMapper.deleteByPrimaryKey(user.getId());
					//删除权限
					userRoleMapper.deleteByEmail(user.getEmail());
					resp.put("result", "success");
				}else {
					resp.put("result", "fail");
					resp.put("message", "不能删除系统管理员角色的账户");
				}
			}
		}
		return resp;
	}
}
