package graduationProject.hngxy.security;

import java.util.concurrent.atomic.AtomicInteger;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.crypto.hash.DefaultHashService;
import org.apache.shiro.crypto.hash.HashRequest;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

import graduationProject.hngxy.dao.AccountMapper;
import graduationProject.hngxy.dao.UserMapper;
import graduationProject.hngxy.model.Account;
import graduationProject.hngxy.model.User;
import graduationProject.hngxy.utils.PasswordUtil;

public class CheckOutThePasswd extends HashedCredentialsMatcher {

	@Autowired
	AccountMapper accountMapper;
	
	@Autowired
	UserMapper userMapper;
		
	/**账号登录次数缓存*/
	private Cache<String, AtomicInteger> passwordRetryCache;
	
	/**
	 * 获取cache
	 * 
	 */
	public CheckOutThePasswd(CacheManager cacheManager) {
		passwordRetryCache = cacheManager.getCache("passwordRetryCache");
	}
	
	
	@Override
	public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
		boolean match = false;
		
		String email = (String) token.getPrincipal();
		String password = new String((char[]) token.getCredentials());
		
		Account account = accountMapper.selectAccountByEmail(email);
		
		if(account == null) {
			match = false;
			return match;
		}
		
		if(email != null && email.equals(account.getEmail())) {
			if(password!=null) {
				String encyPasswd = PasswordUtil.getEncryptionPasswd(password, account.getSalt());
				System.out.println(encyPasswd + ","+account.getPasswd());
				if(encyPasswd.equals(account.getPasswd())) {
					if(account.getIsLocked()) {
						throw new ExcessiveAttemptsException("账号被锁定");
					}
					match = true;
					User user = userMapper.selectByEmail(account.getEmail());
					Subject currentUser = SecurityUtils.getSubject();
					Session session = currentUser.getSession();
					session.setAttribute("CURRENT_LOGIN_USER", user);
					if(account.getIsFirstLogin()) {
						session.setAttribute("IS_FIRST_LOGIN", true);
						accountMapper.updateIsFirstLoginByPrimaryKey(account.getId());
					}
					accountMapper.updateLastLoginDateByPrimaryKey(account.getId());
				}
			}
		}
		return match;
	}
}
