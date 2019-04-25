package graduationProject.hngxy.dao;

import graduationProject.hngxy.model.DepartmentPosition;
import java.util.List;

public interface DepartmentPositionMapper {
    int deleteByPrimaryKey(Integer id);

    int deleteByDepartmentId(Integer id);
    
    int insert(DepartmentPosition record);

    DepartmentPosition selectByPrimaryKey(Integer id);

    List<DepartmentPosition> selectAll();

    int updateByPrimaryKey(DepartmentPosition record);
}