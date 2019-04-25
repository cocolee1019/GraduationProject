package graduationProject.hngxy.security;

import java.util.List;

import org.apache.log4j.Logger;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import graduationProject.hngxy.dao.PermissionMapper;
import graduationProject.hngxy.dao.RoleMapper;
import graduationProject.hngxy.model.Permission;
import graduationProject.hngxy.model.Role;

public class UserRealm extends AuthorizingRealm{

	private Logger logger = Logger.getLogger(UserRealm.class);
	
	@Autowired
	RoleMapper roleMapper;

	@Autowired
	PermissionMapper permissionMapper;
	
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
		logger.info("用户权限加载");
		String email = (String) principalCollection.getPrimaryPrincipal();
		List<Role> roles = roleMapper.selectByEmail(email);
		SimpleAuthorizationInfo info=new SimpleAuthorizationInfo();
		for (Role role : roles) {  //添加角色权限
			List<Permission> permissions = permissionMapper.selectByRoleId(role.getId());
			for (Permission permission : permissions) {
				info.addStringPermission(permission.getCode());
			}
		}
        return info;
	}

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
		logger.info("用户身份验证");
		String userName = (String) authenticationToken.getPrincipal();
		String userPasswd = new String((char[])authenticationToken.getCredentials());
        if (userName == null || "".equals(userName)) {
            return  null;
        }
        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(userName,userPasswd,this.getName());
        return info;
	}

}
