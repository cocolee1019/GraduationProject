package graduationProject.hngxy.schedule;

import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class Jobs {

	private static Logger logger = Logger.getLogger(Jobs.class);
	
	//@Scheduled(cron="0/1 * * * * ?")
	public void job1() {
		logger.info("------------------------------------------------------------------");
		logger.info(new Date());
		logger.info("fffflelkfje进轩圾");
		logger.info("eeeeeeeeeeeeeeeeexxxxxxxxxxxxxxxxxxx");
		logger.info("ffffffffffffffefefefefe");
		logger.info("xxxxxxxxxxxxxxxfefefefe");
		logger.info("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
		logger.info("eeeeeeeeeeeeeeeeexxxxxxxxxxxxxxxxxxx");
		logger.info("ffffffffffffffefefefefe");
		logger.info("xxxxxxxxxxxxxxxfefefefe");
		logger.info("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
		logger.info("xxxxxxxxxxxxxxxxxxxxxxxxxxx");
		logger.info("eeeeeeeeeeeeeeeeexxxxxxxxxxxxxxxxxxx");
		logger.info("ffffffffffffffefefefefe");
		logger.info("xxxxxxxxxxxxxxxfefefefe");
		logger.info("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
		logger.info("eeeeeeeeeeeeeeeeexxxxxxxxxxxxxxxxxxx");
		logger.info("ffffffffffffffefefefefe");
		logger.info("xxxxxxxxxxxxxxxfefefefe");
		logger.info("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
		logger.info("------------------------------------------------------------------");
	}
	
	//@Scheduled(fixedDelay=1*60*60*1000)
	public void job2() {
		System.out.println("定时狂刷任务启动");
		while(true) {
			logger.info("------------------------------------------------------------------");
			logger.info(new Date());
			logger.info("xxxxxxxxxxxxxxxxxxxxxxxxxxx");
			logger.info("eeeeeeeeeeeeeeeeexxxxxxxxxxxxxxxxxxx");
			logger.info("ffffffffffffffefefefefe");
			logger.info("xxxxxxxxxxxxxxxfefefefe");
			logger.info("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
			logger.info("eeeeeeeeeeeeeeeeexxxxxxxxxxxxxxxxxxx");
			logger.info("ffffffffffffffefefefefe");
			logger.info("xxxxxxxxxxxxxxxfefefefe");
			logger.info("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
			logger.info("xxxxxxxxxxxxxxxxxxxxxxxxxxx");
			logger.info("eeeeeeeeeeeeeeeeexxxxxxxxxxxxxxxxxxx");
			logger.info("ffffffffffffffefefefefe");
			logger.info("xxxxxxxxxxxxxxxfefefefe");
			logger.info("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
			logger.info("eeeeeeeeeeeeeeeeexxxxxxxxxxxxxxxxxxx");
			logger.info("ffffffffffffffefefefefe");
			logger.info("xxxxxxxxxxxxxxxfefefefe");
			logger.info("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
			logger.info("------------------------------------------------------------------");
		}
		
	}
}
