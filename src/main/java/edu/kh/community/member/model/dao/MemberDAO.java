package edu.kh.community.member.model.dao;

import static edu.kh.community.common.JDBCTemplate.close;

import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import edu.kh.community.member.model.vo.Member;

public class MemberDAO {

	private Statement stmt;
	private PreparedStatement pstmt;
	private ResultSet rs;
	private Properties prop;
	
	public MemberDAO() {
		try {
			prop = new Properties();
			
			String filePath = MemberDAO.class.getResource("/edu/kh/community/sql/member-sql.xml").getPath();
			
			prop.loadFromXML(new FileInputStream(filePath));
			
			
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	
	public Member selectOne(Connection conn, String memberEmail) throws Exception {
		
		Member member = null;
		
		try {
			String sql = prop.getProperty("selectOne");
			
			
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, memberEmail);
			
			rs = pstmt.executeQuery();
			
			if(rs.next()) {
				
				member = new Member();
				
				member.setMemberEmail(rs.getString(1));
				member.setMemberNickname(rs.getString(2));
				member.setMemberTel(rs.getString(3));
				member.setMemberAddress(rs.getString(4));
				member.setEnrollDate(rs.getString(5));
			}
			
		} finally {
			close(rs);
			close(pstmt);
		}
		return member;
	}


	public List<Member> memberList(Connection conn) throws Exception{
		
		List<Member> member = new ArrayList<>();
					
			try {
				String sql = prop.getProperty("list");
				
				stmt=conn.createStatement();
				
				rs = stmt.executeQuery(sql);
				
				while(rs.next()) {
					int memberNo = rs.getInt(1);
					String memberEmail= rs.getString(2);
					String memberNick = rs.getString(3);
					
					member.add(new Member(memberNo, memberEmail, memberNick));
				}
				
				
				
			} finally {
				// 사용한 JDBC 객체 자원 반환
				close(rs);
				close(stmt);
			}
			
			// 결과 반환
			return member;
		}
	
	/** 인증번호, 발급일 수정 DAO
	 * 
	 * @param conn
	 * @param inputEmail
	 * @param cNumber
	 * @return
	 */
	public int updateCertification(Connection conn, String inputEmail, String cNumber) throws Exception{
		
		int result = 0;
		
		try {
			String sql = prop.getProperty("updateCertification");
			
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, cNumber);
			pstmt.setString(2, inputEmail);
			
			result = pstmt.executeUpdate();
			
		} finally {
			close(pstmt);
		}
		
		return result;
	}


	/** 인증번호 생성 DAO
	 * 
	 * @param conn
	 * @param inputEmail
	 * @param cNumber
	 * @return result
	 */
	public int insertCertification(Connection conn, String inputEmail, String cNumber) throws Exception {
		int result = 0;
		
		try {
			String sql = prop.getProperty("insertCertification");
			
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, inputEmail);
			pstmt.setString(2, cNumber);
			
			result = pstmt.executeUpdate();
			
			
		} finally {
			close(pstmt);
		}
		return result;
	}


	public Member certification(Connection conn, String memberEmail, String cNum) throws Exception {
		Member member = null;
		
		try {
			String sql = prop.getProperty("certification");
			
			
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, memberEmail);
			
			rs = pstmt.executeQuery();
			
			if(rs.next()) {
				
				member = new Member();
				
				member.setcNum(rs.getString("C_NUMBER"));
				
			}
			
		} finally {
			close(rs);
			close(pstmt);
		}
		return member;
	}


	

}	


	


