package graduationProject.hngxy.dao;

import graduationProject.hngxy.model.Account;
import java.util.List;

import org.apache.ibatis.annotations.Param;

public interface AccountMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Account record);

    Account selectByPrimaryKey(Integer id);

    List<Account> selectAll();

    int updateByPrimaryKey(Account record);
    
    int updateLastLoginDateByPrimaryKey(Integer id);
    
    int updateIsFirstLoginByPrimaryKey(Integer id);
    
    int updatePasswdById(@Param("id") Integer id,@Param("passwd") String passwd);
    
    Account selectAccountByEmail(String email);
    
    int updateLockByEmail(@Param("email") String email, @Param("operation") Boolean operation);
}