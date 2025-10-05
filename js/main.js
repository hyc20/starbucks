const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');//seachEl 안에 있는 input 요소 찾기

searchEl.addEventListener('click', function(){
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus',function(){
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

searchInputEl.addEventListener('blur',function(){
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

// window.addEventListener('scroll', function(){
//   console.log('scoll');
// })

//._throttle(함수, 시간)
window.addEventListener('scroll',_.throttle(function(){
  console.log(window.scrollY);

  if(window.scrollY > 500 ){
    //배지 숨기기
    // badgeEl.style.display='none';
    // gsap.to(요소, 지속시간, 옵션)
    gsap.to(badgeEl, .6, {
      opacity : 0,
      display : 'none'
    });
    //위로 올라가기 버튼 보이기
    gsap.to(toTopEl,.2,{
      x: 0,
    });
    
  }else{
    //배지 숨기기
    // badgeEl.style.display='block'
    gsap.to(badgeEl, .6, {
      opacity : 1,
      display : 'block' 
    });
    //위로 올라가기 버튼 숨기기
    gsap.to(toTopEl,.2,{
      x: 100,
    });
  }
}, 300));

toTopEl.addEventListener('click', function(){
  gsap.to(window, .7, {
    scrollTo : 0
  });
})


//visual 영역 애니메이션 효과
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index){
  gsap.to(fadeEl, 1, {
    delay : (index+1)*.7, /* 순차적으로 실행 되게 index 값에 +1을 해서 다음 요소는 +1 후에 시작되게 설정*/
    opacity : 1
  });
});

// 슬라이드 기능 시작
new Swiper('.notice-line .swiper-container',{
  direction: 'vertical',
  autoplay: true,
  loop: true, //반복재생 여부

});

//프로모션 슬라이드 시작
new Swiper('.promotion .swiper-container',{
  direction: 'horizontal', //horizontal이 디폴트
  slidesPerView:3, //3개의 슬라이드
  spaceBetween : 10, //슬라이드 사이 여백
  centeredSlides: true, //1번 슬라이드가 가운데에 보이기
  loop: true,
  // autoplay: {
  //   delay: 5000
  // }
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable : true //사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl:'.promotion .swiper-prev',
    nextEl:'.promotion .swiper-next'
  }
});

//토글 영역 시작
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', function(){
  isHidePromotion = !isHidePromotion; //클릭 될 때마다 플래그 변경
  if(isHidePromotion){
    //숨기기
    promotionEl.classList.add('hide');  
  }else{
    //보이기
    promotionEl.classList.remove('hide');
  }
});

//어워즈 영역 Swiper 기능 추가
new Swiper('.awards .swiper-container', {
  direction : 'horizontal', //수평이 기본 값
  autoplay: true,
  loop : true,
  spaceBetween : 30, 
  slidesPerView : 5,
  navigation: {
    prevEl : '.awards .swiper-prev',
    nextEl : '.awards .swiper-next'
  }
})


//소수점 두번째 자리까지 랜덤 값 만들기
//toFixed(2)를 통해 반복된 문자 데이터를 parseFloat로 소수점 가지는 숫자 데이터로 변환
function random(min,max){
  return parseFloat((Math.random() * (max-min) + min).toFixed(2));
}

//유튜브 영역 플로팅 기능 추가
function floatingObject(selector, delay, size){
  // gsap.to(요소 ,시간 ,옵션 );
  gsap.to(
    selector,//선택자
    random(1.5, 2.5),{ //애니메이션 동작시간
    //옵션영역  
    // y: 20, //y 축
    y:size,
    repeat: -1, //무한반복
    yoyo: true, //기능 반복 
    ease: Power1.easeInOut,
    // delay: 1//1초 후 움직이 시작
    delay: random(0, delay)
  });
}
// floatingObject('.floating');

floatingObject('.floating1',1,15);
floatingObject('.floating2',0.5,15);
floatingObject('.floating3',1.5,20);

//ScrollMagic 기능 추가
const spyEls = document.querySelectorAll('section.scroll-spy')
spyEls.forEach(function(spyEl){
  //메소드 체이닝
  new ScrollMagic
      .Scene({
        triggerElement : spyEl, //보이는 여부를 감시할 요소 지정
        triggerHook : .8, //뷰포트의 처음은 0 끝은 1, 그 사이의 0.8 부분에서 감시를 시작하는 옵션
      })
      .setClassToggle(spyEl, 'show') //뷰포트의 0.8 지점에 도달하면 show 클래스 추가
      .addTo(new ScrollMagic.Controller())
});

// 연도 자동 계산
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();
