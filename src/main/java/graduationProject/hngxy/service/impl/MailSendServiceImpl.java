package graduationProject.hngxy.service.impl;

import org.springframework.stereotype.Service;

import graduationProject.hngxy.service.MailSendService;
import graduationProject.hngxy.utils.MailSendThread;

@Service
public class MailSendServiceImpl implements MailSendService {

	public void sendInvitationEmail(String toEmail, String toName, String passwd) {
		String content = "<b>"+toName+","
				+ "<p>&nbsp;&nbsp;&nbsp;&nbsp;你好，欢迎您加入我们，请登录后，立即修改密码。</p>"
				+ "<p>&nbsp;&nbsp;&nbsp;&nbsp;下面是你的账号，</p>"
				+"<p>&nbsp;&nbsp;&nbsp;&nbsp;<i>账号："+toEmail+"</i></p>"
				+"<p>&nbsp;&nbsp;&nbsp;&nbsp;<i>密码:"+passwd+"</i></p>"
				+"<p>&nbsp;&nbsp;&nbsp;&nbsp;网址：<a herf='http://0.0.0.0:8081'>http://0.0.0.0:8081</a></p>";
		MailSendThread mailSend = new MailSendThread(toEmail, " 欢迎邮件", content);
		mailSend.start();
	}

	
	public void sendReceiveTaskMessageEmail(String toEmail,String taskDetail) {
		String content = 
				"<p>&nbsp;&nbsp;&nbsp;&nbsp同学，你收到一条任务，赶紧去制定任务计划吧！</p>"
				+ "<p>&nbsp;&nbsp;&nbsp;&nbsp;任务详情:</p>"
				+"<p>&nbsp;&nbsp;&nbsp;&nbsp;<i>"+taskDetail+"</i></p>"
				+"<p>&nbsp;&nbsp;&nbsp;&nbsp;网址：<a herf='http://0.0.0.0:8081'>http://0.0.0.0:8081</a></p>";
		MailSendThread mailSend = new MailSendThread(toEmail, " 任务提醒邮件", content);
		mailSend.start();
	}
	
	public void sendMakeTaskPlanEmail(String toEmail,String taskDetail,String userName) {
		String content = 
				"<p>&nbsp;&nbsp;&nbsp;&nbsp你发布的任务:\""+taskDetail+"\",<i>"+userName+"</i>已经制定计划了。</p>"
				+ "<p>赶快去核审吧!</p>";
		MailSendThread mailSend = new MailSendThread(toEmail, "任务接收者制定计划提醒", content);
		mailSend.start();
	}
}
