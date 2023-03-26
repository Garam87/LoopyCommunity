package edu.kh.community.member.service;

import static edu.kh.community.common.JDBCTemplate.*;

import java.sql.Connection;
import java.util.List;

import edu.kh.community.member.model.dao.MemberDAO;
import edu.kh.community.member.model.vo.Member;

public class MemberService {

	MemberDAO dao = new MemberDAO();
	
	public Member selectOne(String memberEmail) throws Exception {

		Connection conn = getConnection();
		
		Member member = dao.selectOne(conn, memberEmail);
		
		close(conn);
		
		return member;
	}

	public List<Member> memberList() throws Exception {
		
		Connection conn = getConnection();

		List<Member> member = dao.memberList(conn);

		close(conn);
		
		return member;
	}

	/** 인증 번호 DB 추가 Service
	 * 
	 * @param inputEmail
	 * @param cNumber
	 * @return
	 */
	public int insertCertification(String inputEmail, String cNumber) throws Exception {
		
		Connection conn = getConnection();
		
		// 1) 입력한 이메일과 일치하는 값이 있으면 수정 (UPDATE)
		int result = dao.updateCertification(conn, inputEmail, cNumber);
		
		
				
		// 2) 입력한 이메일이 없는 경우 -> 처음으로 인증번호를 발급 받음 -> 삽입 (INSERT)		
		if(result == 0) {
			result = dao.insertCertification(conn, inputEmail, cNumber);
		}
		
		if(result > 0) commit(conn);
		else			rollback(conn);
		
		close(conn);
		
		
		return result;
	}

	public Member certification(String memberEmail, String cNum) throws Exception{
		Connection conn = getConnection();
		
		Member member = dao.certification(conn, memberEmail, cNum);
		
		close(conn);
		
		return member;
		
	}

	




	

}
