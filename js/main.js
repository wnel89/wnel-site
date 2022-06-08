let nsts = 0;
let rsts = 0;
let ists = 0;
let dsts = 0;
let zsts = 0;

function calcu(val) {

  if (nsts === 1 && isNaN(val)) {
    return false;
  }
  if (rsts === 1) {
    return false;
  }
  if (ists === 0 && isNaN(val) && val !== "－") {
    return false;
  }
  if (dsts === 1 && val === ".") {
    return false;
  }
  if (zsts === 1 && !isNaN(val)) {
    return false;
  }

  let tg = document.getElementById("exep");
  let res = tg.innerHTML;

  if (val === "＝") {
    res = res.replace(/＋/g, "+").replace(/－/g, "-")
      .replace(/×/g, "*").replace(/÷/g, "/");

    tg.innerHTML += val + eval(res);

    rsts = 1;
    console.log("결과값이 나온여부(rsts):" + rsts);

  } else {
    tg.innerHTML += val;

    if ((ists === 0 || nsts === 1) && val === 0 && dsts === 0) {
      zsts = 1;
    } else {
      zsts = 0;
    }

    isNaN(val) ? nsts = 1 : nsts = 0;
    console.log("기호입력여부(nsts):" + nsts);

    ists = 1;
    console.log("처음인지 상태값(ists):" + ists);

    if (val === ".") dsts = 1;

    if (isNaN(val) && val !== ".") {
      dsts = 0;
    }

  }

  console.log("\n1.기호사용여부(nsts):" + nsts +
    "\n2.결과값여부(rsts):" + rsts +
    "\n3.처음상태여부(ists):" + ists +
    "\n4.점사용여부(dsts):" + dsts +
    "\n5.0사용여부(zsts):" + zsts);

} ////////// calcu함수 ////////////////////////


function delNum() {

  if (rsts === 1) {
    return false;
  }

  let tg = document.getElementById("exep");
  let res = tg.innerHTML;
  let cnt = res.length;

  tg.innerHTML = res.substr(0, cnt - 1);
  let res2 = res.substr(0, cnt - 1);
  let cnt2 = res2.length;

  let last = res2.substr(cnt2 - 1, 1)
  console.log("마지막문자열:" + last);

  if (isNaN(last)) {
    nsts = 1;
  } else {
    nsts = 0;
  }

  let filter = res2.replace(/＋/g, "/").replace(/－/g, "/").replace(/×/g, "/").replace(/÷/g, "/");
  filter = filter.split("/");
  filter = filter[filter.length - 1];
  filter = filter.indexOf(".");
  console.log("점검사:" + filter);

  if (filter !== -1) {
    dsts = 1;
  } else {
    dsts = 0;
  }

  if (cnt2 === 0) {
    ists = 0;
  }

  console.log("1.기호사용여부(nsts):" + nsts +
    "\n2.결과값여부(rsts):" + rsts +
    "\n3.처음상태여부(ists):" + ists +
    "\n4.점사용여부(dsts):" + dsts);

} //// delNum함수 ///////////////////////////////

$(document).ready(function () {

  $("a").on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {
        window.location.hash = hash;
      });
    }
  });
});
// 부드럽게 스크롤

$(function() {
  $(window).scroll(function() {
      if ($(this).scrollTop() > 600) {
          $('.ScrollButton').fadeIn();
      } else {
          $('.ScrollButton').fadeOut();
      }
  });
      
  $("#TopButton").click(function() {
      $('html').animate({scrollTop : 0}, 600);
  });

  $("#BottomButton").click(function() {
      $('html').animate({scrollTop : ($('#footer').offset().top)}, 600);
  });
});
// back to top 버튼 설정