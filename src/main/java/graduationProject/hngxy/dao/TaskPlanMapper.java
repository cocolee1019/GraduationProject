package graduationProject.hngxy.dao;

import graduationProject.hngxy.model.TaskPlan;
import java.util.List;

import org.apache.ibatis.annotations.Param;

public interface TaskPlanMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TaskPlan record);

    TaskPlan selectByPrimaryKey(Integer id);

    List<TaskPlan> selectAll();

    int updateByPrimaryKey(TaskPlan record);
    
    int updatePlanStateById(@Param("planId") Integer planId,@Param("status") String status);
    
    List<TaskPlan> selectByTaskId(Integer taskId);
    
    List<TaskPlan> selectByTaskIdAndReceiveId(@Param("taskId") Integer taskId,@Param("receiveId") Integer receiveId);
}