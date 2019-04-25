package graduationProject.hngxy.dao;

import graduationProject.hngxy.model.UserRole;
import java.util.List;

public interface UserRoleMapper {
	
    int deleteByRoleId(Integer roleId);

    int deleteByEmail(String email);
    
    int insert(UserRole record);

    UserRole selectByPrimaryKey(Integer id);

    List<UserRole> selectAll();

    int updateByPrimaryKey(UserRole record);
}