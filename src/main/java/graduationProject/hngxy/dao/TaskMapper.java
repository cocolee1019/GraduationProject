package graduationProject.hngxy.dao;

import graduationProject.hngxy.model.Task;
import java.util.List;

public interface TaskMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Task record);

    Task selectByPrimaryKey(Integer id);

    List<Task> selectAll();

    int updateByPrimaryKey(Task record);
    
    List<Integer> selectFatherTask(Integer userId);
    
    List<Task> selectAllByReleaseId(Integer userId);
    
    List<Task> selectAllByReceiveId(Integer userId);
}