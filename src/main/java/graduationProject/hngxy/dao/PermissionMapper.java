package graduationProject.hngxy.dao;

import graduationProject.hngxy.model.Permission;
import java.util.List;

public interface PermissionMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Permission record);

    Permission selectByPrimaryKey(Integer id);

    List<Permission> selectAll();
    
    List<Permission> selectByRoleId(Integer roleId);
    
    int updateByPrimaryKey(Permission record);
}