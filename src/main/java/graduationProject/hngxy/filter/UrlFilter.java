package graduationProject.hngxy.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import graduationProject.hngxy.model.User;

public class UrlFilter implements Filter{

	public void init(FilterConfig filterConfig) throws ServletException {
		
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest httpReq = (HttpServletRequest)request;
		HttpServletResponse httpRes = (HttpServletResponse)response;
		HttpSession session = httpReq.getSession();
		String url = httpReq.getRequestURL().toString();
		System.out.println("url-------------------->"+url);
		if(url.endsWith("/login")) {
			User user = (User)session.getAttribute("CURRENT_LOGIN_USER");
			if(user!=null) {
				System.out.println("---------->user != null");
				httpRes.sendRedirect("/home");
				System.out.println("---------->sendRedirect");
			}
		}
		chain.doFilter(request, response);
	}

	public void destroy() {
		
	}

}
