package graduationProject.hngxy.dao;

import graduationProject.hngxy.model.Department;
import java.util.List;
import java.util.Map;

public interface DepartmentMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Department record);

    Department selectByPrimaryKey(Integer id);
    
    Department selectWithPostionByPrimaryKey(Integer id);

    List<Department> selectByParenDepartmentId(Integer id);
    
    List<Department> selectAll();
    
    List<Map<String,Object>> selectAllMap();

    int updateByPrimaryKey(Department record);
}