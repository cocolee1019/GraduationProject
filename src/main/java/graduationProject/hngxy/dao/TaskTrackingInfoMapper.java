package graduationProject.hngxy.dao;

import graduationProject.hngxy.model.TaskTrackingInfo;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

public interface TaskTrackingInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TaskTrackingInfo record);
    
    int insert(@Param("taskId") Integer taskId,@Param("userId") Integer userId,@Param("userName") String userName,@Param("message") String message,@Param("createTime") Date createTime);
    
    TaskTrackingInfo selectByPrimaryKey(Integer id);

    List<TaskTrackingInfo> selectAll();
    
    List<TaskTrackingInfo> selectByTaskId(Integer taskId);

    int updateByPrimaryKey(TaskTrackingInfo record);
}