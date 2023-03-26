// 회원 정보 조회 비동기 통신 (AJAX)
document.getElementById("select1").addEventListener("click", () => {
  const input = document.getElementById("in1");
  const div = document.getElementById("result1");

  // AJAX 코드 작성 (jQuery 방식) -> jQuery 라이브러리가 추가 되어있는지 확인!!
  $.ajax({
    url: "member/selectOne",
    data: { memberEmail: input.value },
    type: "POST",
    dataType: "JSON", // dataType : 응답데이터 형식 지정
    // -> JSON으로 지정 시 자동으로 JS객체로 변환
    success: function (member) {
      console.log(member);
      if (member != null) {
        // 회원 정보 존재 O

        // 2) ul 요소 생성
        const ul = document.createElement("ul");

        // 3) li 요소 생성 * 5 + 내용 추가
        const li1 = document.createElement("li");
        li1.innerText = "이메일 : " + member.memberEmail;

        const li2 = document.createElement("li");
        li2.innerText = "닉네임 : " + member.memberNickname;

        const li3 = document.createElement("li");
        li3.innerText = "전화번호 : " + member.memberTel;

        const li4 = document.createElement("li");
        li4.innerText = "주소 : " + member.memberAddress;

        const li5 = document.createElement("li");
        li5.innerText = "가입일 : " + member.enrollDate;

        // 4) ul에 li를 순서대로 추가
        ul.append(li1, li2, li3, li4, li5);

        // 5) div에 ul 추가
        div.append(ul);
      } else {
        // 회원 정보 존재 X

        // 1) h4 요소 생성
        const h4 = document.createElement("h4");

        // 2) 내용 추가
        h4.innerText = "일치하는 회원이 없습니다";

        // 3) 색 추가
        h4.style.color = "red";

        // 4) div에 추가
        div.append(h4);
      }
    },
    error: function (request, status, error) {
      console.log("ajax 에러발생");
      console.log("상태코드 :  " + request.status); // 404, 500
    },
  });
});

setTimeout(function () {
  location.reload();
}, 10000);

$.ajax({
  url: "member/list",
  type: "POST",
  dataType: "JSON",
  success: function (member) {
    console.log(member[0]);

    const table = document.createElement("table");
    table.setAttribute("border", "1");
    const tr1 = document.createElement("tr");
    const th1 = document.createElement("th");
    th1.textContent = "회원번호";
    const th2 = document.createElement("th");
    th2.textContent = "이메일";

    const th3 = document.createElement("th");
    th3.textContent = "닉네임";

    tr1.append(th1, th2, th3);
    table.append(tr1);

    for (const memList of member) {
      const tr2 = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.textContent = memList.memberNo;
      console.log(td1);
      const td2 = document.createElement("td");
      td2.textContent = memList.memberEmail;
      const td3 = document.createElement("td");
      td3.textContent = memList.memberNickname;

      tr2.append(td1, td2, td3);
      table.append(tr2);
    }
    document.getElementById("list-table").append(table);
  },
  error: function () {
    console.log("에러발생");
  },
});
