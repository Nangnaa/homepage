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

  setTimeout(function () {
    // 로딩 영역 제거
    $('#loading').hide();
    $('#menu').show();

    $('#fullpage').fullpage({
      menu: '#menu', //anchors메뉴 지정
      anchors: ['main', 'profile', 'skill', 'portfolio', 'contact'], //클릭하면 그페이지이동
      sectionsColor: ['white', 'white', 'gray', 'white','white'],
      autoScrolling: true, //스크롤단위로 넘기기 기본값 true
      slidesNavigation: true,
      loopBottom: true,//스크롤 첫페이지에서 올릴때 맨마지막으로

      afterLoad: function (anchorLink, index, direction) {

        if (index == 1) {
          $('.firstline').animate({
            opacity: '1',
          }, 2000)
          $('.secondline').animate({
            // width: '100%',
            marginLeft:'200px'
          }, 2000, function(){
            $('.secondline').animate({
              margin:'0 200px 50px 0'
            },2000,'linear');
        })
        }
        $(".upani").removeClass("on");
        $(".upani").addClass("on");
      },
      // onLeave: function (index, nextIndex, direction) {
      // }
    }) //fullpage
  }, 1000);
});