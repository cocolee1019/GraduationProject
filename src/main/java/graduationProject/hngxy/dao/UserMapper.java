package graduationProject.hngxy.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import graduationProject.hngxy.model.User;

public interface UserMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(User record);

    User selectByPrimaryKey(Integer id);

    List<User> selectAll();
    
    int updateCompanyInfoByPrimaryKey(User record);
    
    int updateUserInfoByPrimaryKey(User record);
    
    User selectByEmail(String email);
    
    List<Map<String,Object>> selectByPositionId(Integer positionId);
    
    List<User> selectByDepartmentId(Integer id);
    
    Integer countByDepartmentId(Integer depId);
    
    Integer countByPosition(Integer positionId);
    
    List<User> selectByDepartmentIdAndPositionId(@Param("depId") Integer depId ,@Param("positionLevel") Integer positionLevel);
}