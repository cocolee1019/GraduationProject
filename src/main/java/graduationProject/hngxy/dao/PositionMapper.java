package graduationProject.hngxy.dao;

import graduationProject.hngxy.model.Position;
import java.util.List;

public interface PositionMapper {
	
    int deleteByPrimaryKey(Integer id);

    int insert(Position record);

    Position selectByPrimaryKey(Integer id);

    List<Position> selectAll();

    int updateByPrimaryKey(Position record);
    
    List<Position> selectByDepartmentId(Integer departmenId);
    
    List<Position> selectByLevel(Integer level);
}