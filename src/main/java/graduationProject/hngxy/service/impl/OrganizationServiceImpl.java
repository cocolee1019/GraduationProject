package graduationProject.hngxy.service.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;

import graduationProject.hngxy.dao.DepartmentMapper;
import graduationProject.hngxy.dao.DepartmentPositionMapper;
import graduationProject.hngxy.dao.PositionMapper;
import graduationProject.hngxy.dao.UserMapper;
import graduationProject.hngxy.model.Department;
import graduationProject.hngxy.model.DepartmentPosition;
import graduationProject.hngxy.model.Position;
import graduationProject.hngxy.service.OrganizationService;

@Service
public class OrganizationServiceImpl implements OrganizationService {

	@Autowired
	DepartmentPositionMapper departmentPositionMapper;
	
	@Autowired
	UserMapper userMapper;
	
	@Autowired
	DepartmentMapper departmentMapper;
	
	@Autowired
	PositionMapper positionMapper;
	
	public JSONObject delDepartmentByid(Integer id) {
		JSONObject resp = new JSONObject();
		Department dep = departmentMapper.selectByPrimaryKey(id);
		if(dep==null) {
			resp.put("result", "fail");
			resp.put("message", "部门不存在");
		}else {
				if(checkCanDelDepartment(id)) {
					deleteDepartmentR(id);
					resp.put("result", "success");
				}else {
					resp.put("result", "fail");
					resp.put("message", "部门存在职工，或者下级部门存在职工");
				}
		}
		return resp;
	}

	public JSONObject editDepartmentByid(Department dep) {
		JSONObject resp = new JSONObject();
		//职位信息修改
		List<Position> positions = dep.getPositions(); //修改后的职位
		List<Position> oldPositions = positionMapper.selectByDepartmentId(dep.getId());
		List<Position> deletePositions = new ArrayList<Position>();
		for (Position position : oldPositions) {
			boolean flag = true;  //表示要删除
			if(positions!=null && positions.size()>0) {
				for (Position position2 : positions) {
					if(position.getId().intValue() == position2.getId().intValue()) {
						flag = false;
						break;
					}
				}
			}
			if(flag) {
				deletePositions.add(position);
			}
		}
		for (Position position : deletePositions) { //检查这些职位是否存在员工
			int userNum = userMapper.countByPosition(position.getId());
			if(userNum>0) {
				resp.put("result", "fail");
				resp.put("message", "该职位还有员工正在担任，不能修改该部门的职位");
				return resp;
			}
		}
		departmentPositionMapper.deleteByDepartmentId(dep.getId());
		if(positions!=null && positions.size()>0) {
			for (Position position : positions) {
				DepartmentPosition dp = new DepartmentPosition();
				dp.setDepartmentId(dep.getId());
				dp.setPositionId(position.getId());
				departmentPositionMapper.insert(dp);
			}
		}
		//部门信息修改
		departmentMapper.updateByPrimaryKey(dep);
		resp.put("result", "success");
		return resp;
	}

	/**
	 * 循环检查部门是否存在员工和下级部门是否存在员工
	 */
	private boolean checkCanDelDepartment(Integer id) {
		List<Department> childDep = departmentMapper.selectByParenDepartmentId(id);
		if(childDep!=null && childDep.size()>0) {
			Iterator<Department> itor = childDep.iterator();
			boolean flag = true;
			while(itor.hasNext() && flag) {
				Department dep = itor.next();
				flag = checkCanDelDepartment(dep.getId());
			}
			return flag;
		} else {
			Integer userNum = userMapper.countByDepartmentId(id);
			if(userNum != null && userNum.intValue()>0) {
				return false;
			}
			return true;
		}
	}
	
	/**
	 * 循环删除子部门 
	 */
	private void deleteDepartmentR(Integer id) {
		List<Department> childDep = departmentMapper.selectByParenDepartmentId(id);
		if(childDep!=null && childDep.size()>0) {
			for (Department department : childDep) {
				deleteDepartmentR(department.getId());
			}
		}
		departmentPositionMapper.deleteByDepartmentId(id);
		departmentMapper.deleteByPrimaryKey(id);
	}
}
