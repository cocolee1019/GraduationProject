package graduationProject.hngxy.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;

import graduationProject.hngxy.dao.DepartmentMapper;
import graduationProject.hngxy.dao.DepartmentPositionMapper;
import graduationProject.hngxy.dao.PositionMapper;
import graduationProject.hngxy.dao.UserMapper;
import graduationProject.hngxy.model.Department;
import graduationProject.hngxy.model.DepartmentPosition;
import graduationProject.hngxy.model.Position;
import graduationProject.hngxy.model.User;
import graduationProject.hngxy.service.OrganizationService;

@Controller
public class OrganizationController {

	@Autowired
	DepartmentMapper departmentMapper;
	
	@Autowired
	PositionMapper positionMapper;
	
	@Autowired
	DepartmentPositionMapper departmentPositionMapper;
	
	@Autowired
	UserMapper userMapper;
	
	@Autowired
	OrganizationService organizationService;
	
	@RequestMapping(value="/org/toOrgCenter",method=RequestMethod.GET)
	private ModelAndView info() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("/organization/organizationCenter");
		return mav;
	}
	
	
	@RequestMapping(value="/org/getAllDepartment",method=RequestMethod.POST)
	private @ResponseBody Map<String, Object> getAllDepartment() {
		Map<String, Object> tree = new HashMap<String, Object>();
		List<Map<String,Object>> resultMap = departmentMapper.selectAllMap();
		//查询部门的职位
		for (Map<String, Object> map : resultMap) {
			List<Position> roles = positionMapper.selectByDepartmentId(Integer.valueOf(map.get("id").toString()));
			StringBuilder sber = new StringBuilder();
			for (Position position : roles) {
				sber.append(position.getName()).append(",");
			}
			String positions;
			if(sber.toString().endsWith(",")) {
				positions = sber.toString().substring(0, sber.toString().length()-1);
			}else {
				positions = sber.toString();
			}
			map.put("positions", positions);
		}
		tree.put("tree", resultMap);
		return tree;
	}
	
	@RequestMapping(value="/org/toAddOrgPage",method=RequestMethod.GET)
	private ModelAndView toAddOrgPage() {
		ModelAndView mav = new ModelAndView();
		//position
		List<Position> positions = positionMapper.selectAll();
		//derartment
		List<Department> departments = departmentMapper.selectAll();
		mav.addObject("positions",positions);
		mav.addObject("departments",departments);
		mav.setViewName("/organization/addOrg");
		return mav;
	}
	
	@ResponseBody
	@RequestMapping(value="/org/addOrg",method=RequestMethod.POST)
	private String addOrg(Department department, HttpServletRequest request) {
		
		System.out.println(request.getParameter("name"));
		
		JSONObject resp = new JSONObject();
		//新增部门 
		departmentMapper.insert(department);
		List<Position> positions = department.getPositions();
		if(positions!=null && positions.size()>0) {
			//新增职位关系
			for (Position position : positions) {
				DepartmentPosition dp = new DepartmentPosition();
				dp.setDepartmentId(department.getId());
				dp.setPositionId(position.getId());
				departmentPositionMapper.insert(dp);
			}
		}
		resp.put("result", "success");
		return resp.toJSONString();
	}
	
	//删除部门
	@ResponseBody
	@RequestMapping(value="/org/delOrg",method=RequestMethod.POST)
	private String delOrg(Integer departmentId) {
		JSONObject resp = new JSONObject();
		resp.putAll(organizationService.delDepartmentByid(departmentId));
		return resp.toJSONString();
	}
	
	@RequestMapping(value="/org/toEditOrgPage",method=RequestMethod.POST)
	private ModelAndView toEditOrgPage(Integer id) {
		ModelAndView mav = new ModelAndView();
		//position
		List<Position> positions = positionMapper.selectAll();
		//derartment
		List<Department> departments = departmentMapper.selectAll();
		Department currentDep = departmentMapper.selectWithPostionByPrimaryKey(id);
		mav.addObject("positions",positions);
		mav.addObject("departments",departments);
		mav.addObject("currentDep",currentDep);
		mav.setViewName("/organization/editOrg");
		return mav;
	}
	
	@ResponseBody
	@RequestMapping(value="/org/editOrg",method=RequestMethod.POST)
	private String editOrg(Department department) {
		JSONObject resp = new JSONObject();
		resp.putAll(organizationService.editDepartmentByid(department));
		return resp.toJSONString();
	}
	
	@RequestMapping(value="/org/toPositionCenterPage",method=RequestMethod.GET)
	private ModelAndView toPositionCenterPage() {
		ModelAndView mav = new ModelAndView();
		List<Position> list = positionMapper.selectAll();
		mav.addObject("list",list);
		mav.setViewName("/organization/positionCenter");
		return mav;
	}
	
	@RequestMapping(value="/org/toAddPositionPage",method=RequestMethod.GET)
	private ModelAndView toAddPositionPage() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("/organization/addPosition");
		return mav;
	}
	
	@ResponseBody
	@RequestMapping(value="/org/addPosition",method=RequestMethod.POST)
	private String addPosition(Position position) {
		JSONObject resp = new JSONObject();
		positionMapper.insert(position);
		resp.put("result", "success");
		return resp.toJSONString();
	}
	
	@RequestMapping(value="/org/toEditPositionPage",method=RequestMethod.POST)
	private ModelAndView toEditPositionPage(Integer id) {
		ModelAndView mav = new ModelAndView();
		Position position = positionMapper.selectByPrimaryKey(id);
		mav.addObject("position",position);
		mav.setViewName("/organization/editPosition");
		return mav;
	}
	
	@ResponseBody
	@RequestMapping(value="/org/editPosition",method=RequestMethod.POST)
	private String editPosition(Position position) {
		JSONObject resp = new JSONObject();
		positionMapper.updateByPrimaryKey(position);
		resp.put("result", "success");
		return resp.toJSONString();
	}
	
	@ResponseBody
	@RequestMapping(value="/org/delPosition",method=RequestMethod.POST)
	private String delPosition(Integer id) {
		JSONObject resp = new JSONObject();
		positionMapper.deleteByPrimaryKey(id);
		resp.put("result", "success");
		return resp.toJSONString();
	}
}
