package edu.kh.community.member.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import edu.kh.community.member.model.vo.Member;
import edu.kh.community.member.service.MemberService;

@WebServlet("/member/list")
public class MemberListServlet extends HttpServlet {
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		List<Member> member = new ArrayList<>();
		
		try {
			MemberService service = new MemberService();
			
			member = service.memberList();
			
			new Gson().toJson(member, resp.getWriter());

			
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

}
