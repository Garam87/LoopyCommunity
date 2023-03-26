package edu.kh.community.member.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import edu.kh.community.member.model.vo.Member;
import edu.kh.community.member.service.MemberService;

@WebServlet("/member/selectOne")
public class SelectOneServlet extends HttpServlet {
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		// 파라미터 얻어오기
		String memberEmail = req.getParameter("memberEmail");
		
		try {
			MemberService service = new MemberService();
			
			Member member = service.selectOne(memberEmail);
			
			new Gson().toJson(member, resp.getWriter());

			
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
}
