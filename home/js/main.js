//loading
(function () {
  const spanEl = document.querySelector("#writeTxt");
  const txtArr = ['Web Publisher', 'Front-End Developer'];
  let index = 0;
  let currentTxt = txtArr[index].split("");
  function writeTxt() {
    spanEl.textContent += currentTxt.shift();
    if (currentTxt.length !== 0) {
      setTimeout(writeTxt, Math.floor(Math.random() * 100));
    } else {
      currentTxt = spanEl.textContent.split("");
      setTimeout(deleteTxt, 2500);
    }
  }
  function deleteTxt() {
    currentTxt.pop();
    spanEl.textContent = currentTxt.join("");
    if (currentTxt.length !== 0) {
      setTimeout(deleteTxt, Math.floor(Math.random() * 100))
    } else {
      index = (index + 1) % txtArr.length;
      currentTxt = txtArr[index].split("");
      writeTxt();
    }
  }
  writeTxt();
})();

$(document).ready(function () {
  // 사전 스크롤 방지
  $('body').css('overflow', 'hidden');
  $('#menu').hide();
  $('#section3').hide();


  setTimeout(function () {
    // 로딩 영역 제거
    $('#loading').hide();
    $('#menu').show();
    $('#section3').show();

    $('#fullpage').fullpage({
      menu: '#menu', //anchors메뉴 지정
      anchors: ['main', 'profile', 'skill', 'portfolio', 'contact'], //클릭하면 그페이지이동
      sectionsColor: ['white', 'white', '#b6e4fe', 'white', 'white'],
      slidesNavigation: true,
      loopBottom: true,//스크롤 첫페이지에서 올릴때 맨마지막으로

      afterLoad: function (anchorLink, index, direction) {

        if (index == 1) {
          $('.firstline').animate({
            opacity: '1',
          }, 2000)
          $('.secondline').animate({
            marginLeft: '200px'
          }, 2000, function () {
            $('.secondline').animate({
              margin: '0 200px 50px 0'
            }, 2000, 'linear');
          })

        }

        if (index == 4) {
          $(".leftani").removeClass("on");
          $(".leftani").addClass("on");
        }
        $(".upani").removeClass("on");
        $(".upani").addClass("on");

      },


      onLeave: function (index, nextIndex, direction) {
        if (index == 1) {
          $('.firstline').animate({
            opacity: '0',
          }, 2000)
          $('.secondline').animate({
            // width: '100%',
            marginLeft: '200px'
          }, 2000, function () {
            $('.secondline').animate({
              margin: '0 200px 50px 0'
            }, 2000, 'linear');
          })
        }
      },

      // afterSlideLoad: function (section, origin, destination, direction, trigger) {
      //   var loadedSlide = this;  
      // },
      // onSlideLoad: function (anchorLink, index, slideAnchor, slideIndex, destination) {   
      // },

    }) //fullpage
  }, 1000);
});

//skill
var skillValue = [80, 75, 60, 50]; //좌표값
var waveId; //setInterval대한 정보
$("#section3 .wrap-link a").mouseover(function () {
  var _idx = $(this).parent().index(); //순서값 찾기
  var _rev = 100 - skillValue[_idx]; //좌표값 100기준으로 반전시킴
  $("#section3 .wrap-wave .unit").css("transform", "translateY(" + _rev + "%)"); //높이값 제어


  clearInterval(waveId);//중복 setInterval호출 방지를 위해 미리 setInterval을 클리어 시켜줌
  //카운팅 효과
  waveId = setInterval(checkNum, 10);
});

$("#section3 .wrap-link a").mouseout(function () {
  $("#section3 .wrap-wave .unit").css("transform", "translateY(calc(100% - 50px))");
});

//높이값을 체크해서 숫자를 업데이트 해주는 함수
function checkNum() {
  var _t = $("#section3 .wrap-wave .unit").css("transform").split(",")[5]; //파도(unit)에 대한 transform값(matrix) 중에서 6번째 값만 가져욤(translateY)
  _t = _t.replace(")", ""); //replace통해서 불필요한 문자 제거
  var _th = $("#section3 .wrap-wave").height() //부모의 높이값
  var _val = 100 - Math.round(_t / _th * 100); //트랜지션값과 부모높이값으로 나눈 비율을 소수점에서 반올림시켜 배분율
  //console.log(_val);
  $("#section3 .wrap-wave .num > strong").text(_val); //html 업데이트
};
//setInterval을 멈추기 위한 애니메이션 끝시점 체크 이벤트
$("#section3 .wrap-wave .unit").on("transitionend", function () {
  clearInterval(waveId);
});
