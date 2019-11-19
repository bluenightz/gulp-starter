// document.createElement('picture');

import './common.js';
import $ from 'jquery';
import Glide from '@glidejs/glide';
// import 'picturefill';


$(document).ready(() => {
  var elements;
  var windowHeight;
  var max;
  var hero_video = document.querySelector('#hero_video');
  var hero_video_height = hero_video.clientHeight;
  var controller = new ScrollMagic.Controller();
  var screen_offest = (!Modernizr.mq('only all and (min-width: 768px)'))? 0 : 300;

  function prepare_animation() {

    var video_shape_tween = gsap.to('#video_shape', { duration: 2, ease: 'expo.out', x: 0, y: 0, rotation: 0,});
    
    var video_shape_scene = new ScrollMagic.Scene({
      //triggerElement: '#video_shape_trigger', duration: 1000
    })
      .setTween(video_shape_tween)
      .addTo(controller);


    var carousel_shape_tween = gsap.from('#carousel_shape', { duration: 2, ease: 'expo.out', x: 1700, y: 300, rotation: 80});

    var carousel_shape_scene = new ScrollMagic.Scene({
      triggerElement: '#carousel_shape_trigger', duration: 4000, 
    })
      .setTween(carousel_shape_tween)
      .addTo(controller);


    var fav_shape_tween = gsap.from('#fav_shape', { duration: 2, ease: 'expo.out', x: 1200, y: -300, rotation: -80});

    var fav_shape_scene = new ScrollMagic.Scene({
      triggerElement: '.main', duration: 4000, 
    })
      .setTween(fav_shape_tween)
      .addTo(controller);


    var fav_box1_tween = gsap.from('#fav_box1', { duration: 2, ease: 'expo.out', y: 200 });

    var fav_box1_scene = new ScrollMagic.Scene({
      triggerElement: '#fav_trigger', reverse: true, duration: 2000
    })
      .setTween(fav_box1_tween)
      .addTo(controller);


    var fav_box3_tween = gsap.from('#fav_box3', { duration: 4, ease: 'expo.out', y: 480 });

    var fav_box3_scene = new ScrollMagic.Scene({
      triggerElement: '#fav_trigger', reverse: true, duration: '120%'
    })
      .setTween(fav_box3_tween)
      .addTo(controller);



    var mobile_wrapper_tween = gsap.from('#mobile_wrapper', { duration: 2, ease: 'expo.out', backgroundPosition: '50% -300%' });

    var mobile_wrapper_scene = new ScrollMagic.Scene({
      triggerElement: '#mobile_shape_trigger' 
    })
      .setTween(mobile_wrapper_tween)
      .addTo(controller);


    var mobile_text_tween = gsap.from('#mobile_text', { duration: 2, ease: 'expo.out', y: 200, opacity: 0, delay: 0.5 });
    var mobile_text_scene = new ScrollMagic.Scene({
      triggerElement: '#mobile_shape_trigger' 
    })
      .setTween(mobile_text_tween)
      .addTo(controller);


    // carousel_wrapper__img_wrapper
    // carousel_wrapper__desc_wrapper
    var carousel_img_tween = gsap.from('.carousel_wrapper__img_wrapper', { duration: 2, ease: 'expo.out', y: 100 });
    var carousel_img_scene = new ScrollMagic.Scene({
      triggerElement: '#carousel_trigger', duration: 2000
    })
      .setTween(carousel_img_tween)
      .addTo(controller);  

    var carousel_desc_tween = gsap.to('.carousel_wrapper__desc_wrapper', { duration: 2, ease: 'expo.out', y: 100 });
    var carousel_desc_scene = new ScrollMagic.Scene({
      triggerElement: '#carousel_trigger', duration: 4000
    })
      .setTween(carousel_desc_tween)
      .addTo(controller);  
    
    var arrow_left_tl = gsap.timeline({repeat: -1, repeatDelay: 1});
    arrow_left_tl
      .to('#arrow_left', {duration: 0.3, ease: 'ease.out', x: -15, scale: 1.2})
      .to('#arrow_left', {duration: 0.3, ease: 'ease.out', x: 15, scale: 1})
      .to('#arrow_left', {duration: 0.5, ease: 'ease.out', x: 0});

    var arrow_right_tl = gsap.timeline({repeat: -1, repeatDelay: 1});
    arrow_right_tl
      .to('#arrow_right', {duration: 0.3, ease: 'ease.out', x: 15, scale: 1.2})
      .to('#arrow_right', {duration: 0.3, ease: 'ease.out', x: -15, scale: 1})
      .to('#arrow_right', {duration: 0.5, ease: 'ease.out', x: 0});

  }

  function init() {
    elements = document.querySelectorAll('.isInView');
    windowHeight = window.innerHeight;
    max = elements.length;
  }

  function checkVideoPosition() {
    var positionFromTop = hero_video.getBoundingClientRect().top;
    if ( (positionFromTop + hero_video_height - screen_offest) <= 0 ) {
      hero_video.pause();
    } else {
      hero_video.play();
    }
  }
  
  function checkPosition() {
    checkVideoPosition();
    for (var i = 0; i < max; i++) {
      var element = elements[i];
      var positionFromTop = elements[i].getBoundingClientRect().top;
      // var elementH = (document.querySelector('.zoom_wrapper__img_wrapper').clientHeight + windowHeight) * -1;

      //   console.log(
      //     positionFromTop - windowHeight, 
      //     positionFromTop - windowHeight <= 0 &&
      //     positionFromTop - windowHeight >= elementH
      //   );
      if (
        positionFromTop - windowHeight <= 0
        // && positionFromTop - windowHeight >= elementH  
      ) {
        // element.classList.add('fade-in-element');
        element.classList.add('isInView');
      } else {
        element.classList.remove('isInView');
      }
    }
  }
  
  window.addEventListener('scroll', checkPosition);
  window.addEventListener('resize', init);
  
  init();
  checkPosition();

  
  function sanitizeString(str) {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,'');
    return str.trim();
  }

  var item_length = sanitizeString( document.querySelectorAll('.carousel_wrapper__item').length.toString() );
  var item_number_dom = document.querySelector('#item_number');
  var _currentItem = 0;

  function renderItemNumber() {
    item_number_dom.innerHTML = `${_currentItem + 1}/${item_length}`;
  }

  renderItemNumber();

  // carousel_wrapper
  var glide = new Glide('#carousel_wrapper', {
    animationDuration: 1000,
    rewindDuration: 1200,
    animationTimingFunc: 'cubic-bezier(.1, .93, .51, .99)'
  }).mount();


  glide.on('move', function(e) {
    console.log('move', e);
    console.log(glide.index);
    
    if ( _currentItem !== glide.index ) { 
    
      _currentItem = glide.index;
      var container = $('.carousel_wrapper__item').eq(_currentItem);
      var x1 = container.children('.carousel_wrapper__img_wrapper');
      var x2 = container.children('.carousel_wrapper__desc_wrapper');
      // gsap.from(x1, { ease: 'expo.out', x: 25, duration: 1, opacity:0 });
      // gsap.from(x2,{ ease: 'expo.out', x: 45, duration: 5, opacity:1 });



      var tl = gsap.timeline();
      tl.from(x1, {x: 55, duration: 0.8});
      tl.from(x2, {x: 100, duration: 1.2}, '-=.5' );
      
      renderItemNumber();

    }

  });

  if (Modernizr.mq('only all and (min-width: 768px)')) {
    document.querySelector('body').classList.add('large_screen');
    prepare_animation();
  }

  // small screen
  if (!Modernizr.mq('only all and (min-width: 768px)')) {
    glide.update({
      animationDuration: 800,
    });
  }

  
}); 



