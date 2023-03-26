// 유효성 검사 여부를 기록할 객체 생성
const checkObj = {
  memberEmail: true, // 1)정규표현식 이메일 형식(@)맞는지 체크 -> 2) ajax통신(중복검사)
  memberPw: false, // 정규표현식 체크
  memberPwConfirm: false, // 비밀번호랑 맞는지 체크
  memberNickname: false, // 1)정규표현식(영어/숫자/한글 2~10글자 사이)형식맞는지 체크 -> 2) ajax통신(중복검사)
  memberTel: false, // 정규표현식 체크
  sendEmail: false,
};

const memberEmail = document.getElementById("memberEmail");
const memberPw = document.getElementById("memberPw");
const memberPwConfirm = document.getElementById("memberPwConfirm");
const memberPwCheck = document.getElementById("pwMessage");
const memberNickname = document.getElementById("memberNickname");
const memberTel = document.getElementById("memberTel");

memberEmail.addEventListener("keyup", function () {
  const regEx = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@(?:\w+\.)+\w+$/;

  const result1 = document.getElementById("emailMessage");
  if (regEx.test(this.value)) {
    result1.innerText = "유효성 형식 입니다.";
    result1.style.color = "green";
    checkObj.memberEmail = "true";
  } else {
    result1.innerText = "잘못된 형식입니다";
    result1.style.color = "red";
    checkObj.memberEmail = "false";

    if (this.value == "") {
      result1.innerText = "메일을 받을 수 있는 이메일을 입력해주세요.";
      result1.style.color = "black";
      checkObj.memberEmail = "false";
    }
  }
});

memberPw.addEventListener("keyup", function () {
  const regEx2 = /^(?=.[a-zA-Z])((?=.\d)|(?=.*\W)).{6,30}$/;

  if (regEx2.test(this.value)) {
    memberPwCheck.innerText = "사용가능한 비밀번호 형식입니다.";
    memberPwCheck.style.color = "green";
    checkObj.memberPw = "true";
  } else {
    memberPwCheck.innerText =
      "영어, 숫자, 특수문자(!,@,#,-,_) 6~30글자 사이로 작성해주세요";
    memberPwCheck.style.color = "red";
    checkObj.memberPw = "false";

    if (this.value == "") {
      memberPwCheck.innerText =
        "영어, 숫자, 특수문자(!,@,#,-,_) 6~30글자 사이로 작성해주세요";
      memberPwCheck.style.color = "black";
      checkObj.memberPw = "false";
    }
  }
});

memberPwConfirm.addEventListener("keyup", function () {
  if (this.value === memberPw.value) {
    memberPwCheck.innerText = "비밀번호가 일치합니다";
    memberPwCheck.style.color = "green";
    checkObj.memberPwConfirm = "true";
  } else {
    memberPwCheck.innerText = "비밀번호 불일치";
    memberPwCheck.style.color = "red";
    checkObj.memberPwConfirm = "false";

    if (this.value == "") {
      memberPwCheck.innerText =
        "영어, 숫자, 특수문자(!,@,#,-,_) 6~30글자 사이로 작성해주세요";
      memberPwCheck.style.color = "black";
      checkObj.memberPwConfirm = "false";
    }
  }
});

memberNickname.addEventListener("keyup", function () {
  const reqEx3 = /^[a-zA-Z0-9ㄱ-ㅎ가-힣]{2,10}/g;

  const result2 = document.getElementById("nicknameMessage");
  if (reqEx3.test(this.value)) {
    result2.innerText = "사용가능한 닉네임입니다.";
    result2.style.color = "green";
    checkObj.memberNickname = "true";
  } else {
    result2.innerText = "사용불가능한 닉네임입니다.";
    result2.style.color = "red";
    checkObj.memberNickname = "false";

    if (this.value == "") {
      result2.innerText = "영어/숫자/한글 2~10글자 사이로 작성해주세요.";
      result2.style.color = "black";
      checkObj.memberNickname = "false";
    }
  }
});

memberTel.addEventListener("keyup", function () {
  const reqEx4 = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/;

  const result3 = document.getElementById("telMessage");
  if (reqEx4.test(this.value)) {
    result3.innerText = "사용가능한 전화번호 형식입니다.";
    result3.style.color = "green";
    checkObj.memberTel = "true";
  } else {
    result3.innerText = "사용불가능";
    result3.style.color = "red";
    checkObj.memberTel = "false";

    if (this.value == "") {
      result3.innerText = "전화번호를 입력해주세요.(- 제외)";
      result3.style.color = "black";
      checkObj.memberTel = "false";
    }
  }
});

// 인증번호 보내기
const sendBtn = document.getElementById("sendBtn");
const cMessage = document.getElementById("cMessage");

// 타이머에 사용될 변수
let checkInterval; // setInterval을 저장할 변수
let min = 4;
let sec = 59;

sendBtn.addEventListener("click", function () {
  if (checkObj.memberEmail) {
    // 유효한 이메일이 작성되어 있을 경우에만 메일 보내기

    $.ajax({
      url: "sendEmail",
      data: { inputEmail: memberEmail.value },
      type: "GET",
      success: function (result) {
        console.log("이메일 발송 성공");
        console.log(result);

        const cNumber = document.getElementById("cNumber");
        const cBtn = document.getElementById("cBtn");
        cBtn.addEventListener("click", function () {
          $.ajax({
            url: "certification",
            data: {
              memberEmail: memberEmail.value,
              cNum: cNumber.value,
            },
            type: "GET",
            dataType: "JSON",
            success: function (member) {
              console.log(member.cNum);
              console.log(cNumber.value);
              if (cNumber.value == member.cNum) {
                alert("인증성공");
                clearInterval(checkInterval);
                cMessage.innerText = "인증완료";
                cMessage.style.color = "green";
                checkObj.sendEmail = "true";
              } else {
                alert("인증번호를 다시 확인해 주세요");
              }
            },
          });
        });
      },
      error: function () {
        console.log("이메일 발송 실패");
      },
    });

    // Mail 발송 ajax코드는 동작이 느림...
    // -> ajax 코드가 비동기이기 때문에 메일이 보내지는 것을 기다리지 않고
    // 바로 다음 코드 수행!

    // 5분 타이머
    // setInterval(함수, 지연시간)
    cMessage.innerText = "5:00"; // 초기값 5분
    min = 4;
    sec = 59;

    cMessage.classList.remove("confirm");
    cMessage.classList.remove("error");

    checkInterval = setInterval(function () {
      if (sec < 10) sec = "0" + sec;
      cMessage.innerText = min + ":" + sec;

      if (Number(sec) === 0) {
        min--;
        sec = 59;
      } else {
        sec--;
      }

      if (min === -1) {
        // 만료
        cMessage.classList.add("error");
        cMessage.innerText = "인증번호가 만료되었습니다.";

        clearInterval(checkInterval); // checkInterval 반복 지움
      }
    }, 1000); // 1초 지연 후 수행

    alert("인증번호가 발송되었습니다. 이메일을 확인해주세요");
  }
});

document.getElementById("signUp-btn").addEventListener("click", () => {
  if (
    checkObj.memberEmail &&
    checkObj.memberPw &&
    checkObj.memberPwConfirm &&
    checkObj.memberNickname &&
    checkObj.memberTel &&
    checkObj.sendEmail
  ) {
    alert("가입성공");
  } else {
    alert("다시확인하여주세요");
  }
});
