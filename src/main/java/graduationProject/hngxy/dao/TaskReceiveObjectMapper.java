package graduationProject.hngxy.dao;

import graduationProject.hngxy.model.TaskReceiveObject;
import java.util.List;

public interface TaskReceiveObjectMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TaskReceiveObject record);

    TaskReceiveObject selectByPrimaryKey(Integer id);

    List<TaskReceiveObject> selectAll();

    int updateByPrimaryKey(TaskReceiveObject record);
    
    List<TaskReceiveObject> selectAllByTaskId(Integer id);

}