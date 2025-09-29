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
  }else{
    //배지 숨기기
    // badgeEl.style.display='block'
    gsap.to(badgeEl, .6, {
      opacity : 1,
      display : 'block' 
    });
  }
}, 300));

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