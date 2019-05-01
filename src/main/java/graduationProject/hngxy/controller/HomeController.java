package graduationProject.hngxy.controller;

import java.io.IOException;
import java.util.Calendar;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;

import graduationProject.hngxy.model.User;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

@Controller
public class HomeController {
	
	@Autowired
	private JedisPool jedisPool;
	
	private static Logger logger = Logger.getLogger(HomeController.class);
	
	@RequestMapping(value="/home",method=RequestMethod.GET)
	public ModelAndView home(HttpSession session) {
		ModelAndView mav = new ModelAndView("home");
		Calendar calendar = Calendar.getInstance();
		mav.addObject("nowTime",calendar.get(Calendar.HOUR_OF_DAY));

		try(Jedis jedis = jedisPool.getResource();) {
			System.out.println(jedis.ping());
		}
		
		return mav;
	}
	
	@RequestMapping(value="/",method=RequestMethod.GET)
	public void goLoginPage(HttpServletRequest quest,HttpServletResponse response) {
		try {
			response.sendRedirect("/login");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value="/login",method=RequestMethod.GET)
	public ModelAndView goLoginPage2(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("login");	
		return mav;
	}
	
	@ResponseBody
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public String loginValidate(String userName,String passwd,HttpServletResponse response) {
		//logger.info("收到用户登录请求："+userName+","+passwd);
		JSONObject resp = new JSONObject();
		Subject subject = SecurityUtils.getSubject();
		UsernamePasswordToken token = new UsernamePasswordToken(userName,passwd);
		try{
			subject.login(token);
		}catch (UnknownAccountException e) {
			resp.put("result", "fail");
			resp.put("message", "用户名不能为空");
			return resp.toJSONString();
		}catch (IncorrectCredentialsException e) {
			resp.put("result", "fail");
			resp.put("message", "账号或密码错误");
			return resp.toJSONString();
		}catch (ExcessiveAttemptsException e) {
			resp.put("result", "fail");
			resp.put("message", "账号被锁定");
			return resp.toJSONString();
		}
		resp.put("result", "success");
		return resp.toJSONString();
	}
	
	@RequestMapping(value="/fail",method=RequestMethod.GET)
	public void fail(HttpServletResponse response) {
		try {
			response.sendRedirect("/login");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
