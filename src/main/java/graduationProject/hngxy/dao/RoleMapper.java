package graduationProject.hngxy.dao;

import graduationProject.hngxy.model.Role;
import java.util.List;

public interface RoleMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Role record);

    Role selectByPrimaryKey(Integer id);

    List<Role> selectAll();

    List<Role> selectAllWithPermission();
    
    int updateByPrimaryKey(Role record);
    
    List<Role> selectByEmail(String email);
    
    int countSystemManagermentNum(String code);
    
    int deleteByEmail(String email);
    
}