package edu.kh.community.common.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;



	@WebFilter(filterName="encodingFilter", urlPatterns="/*")
	public class EncodingFilter extends HttpFilter implements Filter {

		public void init(FilterConfig fConfig) {
			System.out.println("문자 인코딩 필터 초기화");
		}
		
		public void destroy() {
			System.out.println("문자 인코딩 필터 파괴");
		}
		
		public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
				throws IOException, ServletException {
			
			request.setCharacterEncoding("UTF-8");
			
			response.setCharacterEncoding("UTF-8");
			
			ServletContext application = request.getServletContext();
			
			String contextPath = ((HttpServletRequest)request).getContextPath();
		
			application.setAttribute("contextPath", contextPath);
			
			chain.doFilter(request, response);
			
			
		}
		
}
