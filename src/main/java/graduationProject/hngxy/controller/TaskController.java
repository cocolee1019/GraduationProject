package graduationProject.hngxy.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;

import graduationProject.hngxy.dao.DepartmentMapper;
import graduationProject.hngxy.dao.DepartmentPositionMapper;
import graduationProject.hngxy.dao.PositionMapper;
import graduationProject.hngxy.dao.TaskMapper;
import graduationProject.hngxy.dao.TaskPlanMapper;
import graduationProject.hngxy.dao.TaskReceiveObjectMapper;
import graduationProject.hngxy.dao.TaskTrackingInfoMapper;
import graduationProject.hngxy.dao.UserMapper;
import graduationProject.hngxy.model.Department;
import graduationProject.hngxy.model.Position;
import graduationProject.hngxy.model.Task;
import graduationProject.hngxy.model.TaskPlan;
import graduationProject.hngxy.model.TaskReceiveObject;
import graduationProject.hngxy.model.TaskTrackingInfo;
import graduationProject.hngxy.model.User;
import graduationProject.hngxy.model.type.TaskPlanStatus;
import graduationProject.hngxy.model.type.TaskStatus;
import graduationProject.hngxy.service.impl.MailSendServiceImpl;

@Controller
public class TaskController {

	@Autowired
	TaskMapper taskMapper;
	
	@Autowired
	DepartmentMapper departmentMapper;
	
	@Autowired
	DepartmentPositionMapper departmentPositionMapper;
	
	@Autowired
	PositionMapper positionMapper;
	
	@Autowired
	UserMapper userMapper;
	
	@Autowired
	TaskReceiveObjectMapper taskReceiveObjectMapper;
	
	@Autowired
	TaskPlanMapper taskPlanMapper;
	
	@Autowired
	MailSendServiceImpl mailSendServiceImpl;
	
	@Autowired
	TaskTrackingInfoMapper taskTrackingInfoMapper;
	
	@RequestMapping(value="/task/toTaskCenterPage",method=RequestMethod.GET)
	private ModelAndView toTaskCenterPage(HttpSession session) {
		ModelAndView mav = new ModelAndView();
		Integer userId = ((User)session.getAttribute("CURRENT_LOGIN_USER")).getId();
		List<Task> tasks = taskMapper.selectAllByReleaseId(userId);
		mav.addObject("tasks",tasks);
		mav.setViewName("/task/taskCenter");
		return mav;
	}
	
	@RequestMapping(value="/task/toReceiveTaskCenterPage",method=RequestMethod.GET)
	private ModelAndView toReceiveTaskCenterPage(HttpSession session) {
		ModelAndView mav = new ModelAndView();
		Integer userId = ((User)session.getAttribute("CURRENT_LOGIN_USER")).getId();
		List<Task> tasks = taskMapper.selectAllByReceiveId(userId);
		mav.addObject("tasks",tasks);
		mav.setViewName("/task/receiveTaskCenter");
		return mav;
	}
	
	@RequestMapping(value="/task/toAddTaskPage",method=RequestMethod.GET)
	private ModelAndView toAddTaskPage(HttpSession session) {
		ModelAndView mav = new ModelAndView();
		Integer userId = ((User)session.getAttribute("CURRENT_LOGIN_USER")).getId();
		List<Integer> tasks = taskMapper.selectFatherTask(userId);
		mav.addObject("tasks",tasks);
		mav.setViewName("/task/addTask");
		return mav;
	}
	
	@ResponseBody
	@RequestMapping(value="/task/getReceiveObject",method=RequestMethod.POST)
	private String getReceiveObject(String receiveObject,HttpSession session) {
		JSONObject res = new JSONObject();
		if("department".equals(receiveObject)) {
			//查找部门
			List<Department> list = departmentMapper.selectAll();
			res.put("list", list);
		}else if("position".equals(receiveObject)){
			Integer userId = ((User)session.getAttribute("CURRENT_LOGIN_USER")).getId();
			User user = userMapper.selectByPrimaryKey(userId);
			Position position = positionMapper.selectByPrimaryKey(user.getPositionId());
			List<Position> list = new ArrayList<Position>();
			if(position!=null) {
				list.addAll(positionMapper.selectByLevel(position.getLevel()));
			}
			res.put("list", list);
		}else if("employee".equals(receiveObject)) {
			//比该用户职位低或平级的用户
			User user = (User)session.getAttribute("CURRENT_LOGIN_USER");
			Position position = positionMapper.selectByPrimaryKey(user.getPositionId());
			List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
			if(position!=null) {
				List<Position> listPosition = positionMapper.selectByLevel(position.getLevel());
				for (Position position2 : listPosition) {
					list.addAll(userMapper.selectByPositionId(position2.getId()));
				}
				Iterator<Map<String, Object>> itor = list.iterator();
				while(itor.hasNext()) {
					Map<String,Object> us = itor.next();
					if(((Long)us.get("id")).intValue()==user.getId().intValue()) {
						itor.remove();
					}
				}
			}
			res.put("list", list);
		}
		res.put("result", "success");
		return res.toJSONString();
	}
	
	@ResponseBody
	@RequestMapping(value="/task/addTask",method=RequestMethod.POST)
	private String addTask(Task task,Integer specificObjectInPage,HttpSession session) {
		JSONObject resp = new JSONObject();
		if(specificObjectInPage == null || task == null) {
			resp.put("result", "fail");
			resp.put("message", "参数错误");
			return resp.toJSONString();
		}

		Integer userId = ((User)session.getAttribute("CURRENT_LOGIN_USER")).getId();
		User user = userMapper.selectByPrimaryKey(userId);
		task.setCreateTime(new Date());
		task.setStatus(TaskStatus.INIT.name());
		task.setUserId(user.getId());
		task.setUserName(user.getFirstName()+user.getLastName());
		taskMapper.insert(task);
		
		//存储接收对象	
		String receiveObj = task.getReceiveObject();
		if("department".equals(receiveObj)) {
			//获得部门id
			int departmentId = specificObjectInPage;
			Department department = departmentMapper.selectByPrimaryKey(departmentId);
			taskTrackingInfoMapper.insert(task.getId(),user.getId(),user.getFirstName()+user.getLastName(),"向"+department.getName()+"部门分配了任务。任务详情：'"+task.getDescribe()+"'。",new Date());
			
			//获得需要接收任务的对象  depId  userId
			Position userPosition = positionMapper.selectByPrimaryKey(user.getPositionId());
			if(userPosition == null) {
				resp.put("result", "fail");
				resp.put("message", "你没有发布任务的权限,请先你的设置职位");
				return resp.toJSONString();
			}
			
			List<User> users = userMapper.selectByDepartmentIdAndPositionId(departmentId, userPosition.getLevel());
			if(users != null && users.size()>0) {
				for (User user2 : users) {
					//生成任务
					if(user2.getId() == user.getId()) {
						continue;
					}
					TaskReceiveObject recObj = new TaskReceiveObject();
					recObj.setTaskId(task.getId());
					recObj.setReleaseId(user.getId());
					recObj.setReleaseName(user.getFirstName()+user.getLastName());
					recObj.setReceiveId(user2.getId());
					recObj.setReceiveName(user2.getFirstName()+user2.getLastName());
					taskReceiveObjectMapper.insert(recObj);
					mailSendServiceImpl.sendReceiveTaskMessageEmail(user2.getEmail(), task.getDescribe());
					resp.put("result", "success");
					taskTrackingInfoMapper.insert(task.getId(),user2.getId(),user2.getFirstName()+user2.getLastName(),"接收了任务。任务编号为："+task.getId(),new Date());
				}
			}else {
				resp.put("result", "fail");
				resp.put("message", "该部门没有任何可接收任务的员工");
			}
		}else if("position".equals(receiveObj)) {
			int positionId = specificObjectInPage;
			Position position = positionMapper.selectByPrimaryKey(positionId);
			taskTrackingInfoMapper.insert(task.getId(),user.getId(),user.getFirstName()+user.getLastName(),"向"+position.getName()+"职位分配了任务。任务详情：'"+task.getDescribe()+"'。",new Date());

			List<Map<String,Object>> users = userMapper.selectByPositionId(positionId);
			for (Map<String, Object> map : users) {
				if(user.getId().equals(map.get("id")) ) {
					continue;
				}
				TaskReceiveObject recObj = new TaskReceiveObject();
				recObj.setTaskId(task.getId());
				recObj.setReleaseId(user.getId());
				recObj.setReleaseName(user.getFirstName()+user.getLastName());
				recObj.setReceiveId(((Long)map.get("id")).intValue());
				recObj.setReceiveName(map.get("name").toString());
				taskReceiveObjectMapper.insert(recObj);
				mailSendServiceImpl.sendReceiveTaskMessageEmail(map.get("email").toString(), task.getDescribe());
				taskTrackingInfoMapper.insert(task.getId(),recObj.getReceiveId(),recObj.getReceiveName(),"向"+position.getName()+"接收了任务。任务编号为："+task.getId(),new Date());
			}
			resp.put("result", "success");
		}else if("employee".equals(receiveObj)) {
			int targetUser = specificObjectInPage;
			User userDesc = userMapper.selectByPrimaryKey(targetUser);
			taskTrackingInfoMapper.insert(task.getId(),user.getId(),user.getFirstName()+user.getLastName(),"向"+userDesc.getFirstName()+userDesc.getLastName()+"用户分配了任务。任务详情：'"+task.getDescribe()+"'。",new Date());
			if(targetUser != user.getId()) {
				TaskReceiveObject recObj = new TaskReceiveObject();
				recObj.setTaskId(task.getId());
				recObj.setReleaseId(user.getId());
				recObj.setReleaseName(user.getFirstName()+user.getLastName());
				recObj.setReceiveId(userDesc.getId());
				recObj.setReceiveName(userDesc.getFirstName()+userDesc.getLastName());
				taskReceiveObjectMapper.insert(recObj);
				mailSendServiceImpl.sendReceiveTaskMessageEmail(userDesc.getEmail(), task.getDescribe());
				taskTrackingInfoMapper.insert(task.getId(),userDesc.getId(),userDesc.getFirstName()+userDesc.getLastName(),"接收了任务。任务编号为："+task.getId(),new Date());
			}
			resp.put("result", "success");
		}
		return resp.toJSONString();
	}
	
	@RequestMapping(value="/task/toTaskDetailPage/{taskId}",method=RequestMethod.GET)
	private ModelAndView toTaskDetailPage(HttpSession session,@PathVariable("taskId") Integer taskId) {
		ModelAndView mav = new ModelAndView();
		List<TaskPlan> plans = taskPlanMapper.selectByTaskId(taskId);
		mav.addObject("taskPlans",plans);
		mav.addObject("taskId",taskId); 
		mav.setViewName("/task/taskDetail");
		return mav;
	}
	
	@RequestMapping(value="/task/toReceiveTaskCenter/{taskId}",method=RequestMethod.GET)
	private ModelAndView toReceiveTaskCenter(HttpSession session,@PathVariable("taskId") Integer taskId) {
		ModelAndView mav = new ModelAndView();
		List<Map<String, Object>> map = new ArrayList<Map<String,Object>>();
		//要所taskId找出接收对象
		Task task = taskMapper.selectByPrimaryKey(taskId);
		List<TaskReceiveObject> tos = taskReceiveObjectMapper.selectAllByTaskId(taskId);
		for (TaskReceiveObject taskReceiveObject : tos) {
			//根据taskId和接收者id查找，该用户有不有制定计划
			List<TaskPlan> plans = taskPlanMapper.selectByTaskIdAndReceiveId(taskReceiveObject.getTaskId(), taskReceiveObject.getReceiveId());
			Map<String, Object> receiveObj = new HashMap<String, Object>();
			receiveObj.put("name", taskReceiveObject.getReceiveName());
			receiveObj.put("receiveTime", task.getCreateTime());
			receiveObj.put("isMakePlan", plans.size()>0?true:false);
			receiveObj.put("taskId", task.getId());
			map.add(receiveObj);
		}
		mav.addObject("taskReceiveObjects",map);
		mav.setViewName("task/taskReceiveDetail");
		return mav;
	}
	
	@RequestMapping(value="/task/toMakeTaskPlanPage/{taskId}",method=RequestMethod.GET)
	private ModelAndView toMakeTaskPlanPage(HttpSession session,@PathVariable("taskId") Integer taskId) {
		ModelAndView mav = new ModelAndView();
		Integer crrentUserId = ((User)session.getAttribute("CURRENT_LOGIN_USER")).getId();
		List<TaskPlan> taskPlans = taskPlanMapper.selectByTaskIdAndReceiveId(taskId, crrentUserId);
		mav.addObject("taskPlans",taskPlans);
		mav.addObject("taskId",taskId);
		mav.setViewName("task/makeTaskPlan");
		return mav;
	}
	
	@RequestMapping(value="/task/toAddTaskPlanPage/{taskId}",method=RequestMethod.GET)
	private ModelAndView toAddTaskPlanPage(HttpSession session,@PathVariable("taskId") Integer taskId) {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("task/addTaskPlan");
		return mav;
	}
	

	@RequestMapping(value="/task/addTaskPlan",method=RequestMethod.POST)
	@ResponseBody
	private String addTaskPlan(HttpSession session,TaskPlan taskPlan) {
		JSONObject resp = new JSONObject();
		Integer taskId = taskPlan.getTaskId();
		User user = (User) session.getAttribute("CURRENT_LOGIN_USER");
		Task task = taskMapper.selectByPrimaryKey(taskId);
		//发布任务用户
		taskPlan.setPlanState(TaskPlanStatus.INIT.name()); 
		taskPlan.setReceiveId(user.getId());
		taskPlan.setReceiveName(user.getFirstName()+user.getLastName());
		taskPlan.setReleaseId(task.getUserId());
		taskPlan.setReleaseName(task.getUserName());
		
		User releaseUser = userMapper.selectByPrimaryKey(task.getUserId());
		long planStartDate = taskPlan.getStartDate().getTime();
		long planEndDate = taskPlan.getEndDate().getTime();
		
		taskPlanMapper.insert(taskPlan);
		taskTrackingInfoMapper.insert(task.getId(),user.getId(),user.getFirstName()+user.getLastName(),"为该任务添加了计划。预计用时："+(planEndDate-planStartDate)/1000/60/60+"个小时。计划编号为："+taskPlan.getId()+"。计划详情为："+taskPlan.getTaskPlanDetail(),new Date());
		mailSendServiceImpl.sendMakeTaskPlanEmail(releaseUser.getEmail(), task.getDescribe(), user.getFirstName()+user.getLastName());
		resp.put("result", "success");
		return resp.toString();
	}
	
	@RequestMapping(value="/task/toEditTaskPlanPage/{taskPlanId}",method=RequestMethod.GET)
	private ModelAndView toEditTaskPlanPage(@PathVariable("taskPlanId") Integer taskPlanId) {
		ModelAndView mav = new ModelAndView();
		if(taskPlanId!=null) {
			TaskPlan taskPlan = taskPlanMapper.selectByPrimaryKey(taskPlanId);
			mav.addObject("taskPlan",taskPlan);
			mav.addObject("taskId",taskPlan.getTaskId());
			mav.setViewName("/task/editTaskPlan");
		}
		return mav;
	}
	
	@RequestMapping(value="/task/editTaskPlan",method=RequestMethod.POST)
	@ResponseBody
	private String editTaskPlan(TaskPlan taskPlan,HttpSession session) {
		JSONObject resp = new JSONObject();
		taskPlan.setPlanState(TaskPlanStatus.INIT.name());
		taskPlanMapper.updateByPrimaryKey(taskPlan);
		resp.put("result", "success");
		User user = (User) session.getAttribute("CURRENT_LOGIN_USER");
		long userTime = (taskPlan.getEndDate().getTime()-taskPlan.getStartDate().getTime())/1000/60/60;
		taskTrackingInfoMapper.insert(taskPlan.getTaskId(),user.getId(),user.getFirstName()+user.getLastName(),"修改了计划编号为"+taskPlan.getId()+"的计划。预计用时："+userTime+"个小时。计划详情为："+taskPlan.getTaskPlanDetail(),new Date());
		return resp.toJSONString();
	}
	
	@RequestMapping(value="/task/delTaskPlan",method=RequestMethod.POST)
	@ResponseBody
	private String delTaskPlan(Integer planId,HttpSession session) {
		JSONObject resp = new JSONObject();
		User user = (User) session.getAttribute("CURRENT_LOGIN_USER");
		TaskPlan taskPlan = taskPlanMapper.selectByPrimaryKey(planId);
		if(taskPlan.getPlanState().equals(TaskPlanStatus.INIT.name()) ||
				taskPlan.getPlanState().equals(TaskPlanStatus.REJECT.name())) {
			taskPlanMapper.deleteByPrimaryKey(planId);
			taskTrackingInfoMapper.insert(taskPlan.getTaskId(),user.getId(),user.getFirstName()+user.getLastName(),"删除了计划编号为"+taskPlan.getId()+"的计划。计划详情为："+taskPlan.getTaskPlanDetail(),new Date());
			resp.put("result", "success");
		}else {
			resp.put("result", "success");
			resp.put("message", "状态不允许删除");
		}
		return resp.toString();
	}
	
	@RequestMapping(value="/task/startTaskPlan",method=RequestMethod.POST)
	@ResponseBody
	private String startTaskPlan(Integer planId,HttpSession session) {
		JSONObject resp = new JSONObject();
		User user = (User) session.getAttribute("CURRENT_LOGIN_USER");
		TaskPlan taskPlan = taskPlanMapper.selectByPrimaryKey(planId);
		if(taskPlan.getPlanState().equals(TaskPlanStatus.ACCEPT.name())) {
			taskPlanMapper.updatePlanStateById(planId,"PROCESSING");
			taskTrackingInfoMapper.insert(taskPlan.getTaskId(),user.getId(),user.getFirstName()+user.getLastName(),"启动了计划编号为"+taskPlan.getId()+"的计划。计划详情为："+taskPlan.getTaskPlanDetail(),new Date());
			resp.put("result", "success");
		}else {
			resp.put("result", "fail");
			resp.put("message", "状态不允许启动");
		}
		return resp.toString();
	}
	
	@RequestMapping(value="/task/updatePlanState",method=RequestMethod.POST)
	@ResponseBody
	private String updatePlanState(Integer planId,String status,HttpSession session) {
		JSONObject resp = new JSONObject();
		User user = (User) session.getAttribute("CURRENT_LOGIN_USER");
		TaskPlan taskPlan = taskPlanMapper.selectByPrimaryKey(planId);
		if(status!=null && !"".equals(status)) {
			if("REJECT".equals(status) || "ACCEPT".equals(status)) { 
				if(taskPlan.getPlanState().equals(TaskPlanStatus.INIT.name())) {
					taskPlanMapper.updatePlanStateById(planId, status);
					String mes = null;
					if("REJECT".equals(status)) {
						mes = "驳回";
					}else {
						mes = "通过";
					}
					taskTrackingInfoMapper.insert(taskPlan.getTaskId(),user.getId(),user.getFirstName()+user.getLastName(),mes+"了计划编号为"+taskPlan.getId()+"的计划。计划详情为："+taskPlan.getTaskPlanDetail(),new Date());
					resp.put("result", "success");
				}else {
					resp.put("result", "fail");
					resp.put("message", "状态不允许操作");
				}
			}
		}else {
			resp.put("result", "fail");
			resp.put("message", "参数错误");
		}
		return resp.toString();
	}
	
	@RequestMapping(value="/task/toTrackingTaskPage/{taskId}",method=RequestMethod.GET)
	private ModelAndView toTrackingTaskPage(HttpSession session,@PathVariable("taskId") Integer taskId) {
		ModelAndView mav = new ModelAndView();
		if(taskId != null) {
			Map<String,Object> info = new HashMap<String,Object>();
			List<TaskTrackingInfo> trackingInfos = taskTrackingInfoMapper.selectByTaskId(taskId);
			info.put("tackingInfos", trackingInfos);
			Task task = taskMapper.selectByPrimaryKey(taskId);
			info.put("taskDetail", task.getDescribe());
			info.put("taskCreateTime", task.getCreateTime());
			info.put("state", task.getStatus());
			List<TaskReceiveObject> taskReceiveObjects = taskReceiveObjectMapper.selectAllByTaskId(taskId);
			info.put("userNum",taskReceiveObjects.size());
			mav.addObject("taskInfo",info);
		}
		mav.setViewName("/task/taskTracking");
		return mav;
	}
}
