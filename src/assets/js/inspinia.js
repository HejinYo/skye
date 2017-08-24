/*
 *
 *   INSPINIA - Responsive Admin Theme
 *   version 2.7.1
 *
 */
var inspinia = {
  init: function () {
    $(document).ready(function () {
      // Add body-small class if window less than 768px
      /*if ($(this).width() < 769) {
        $('body').addClass('body-small').removeClass('fixed-sidebar')
      } else {
        $('body').removeClass('body-small').addClass('fixed-sidebar')
      }*/

      // 初始化菜单
      /*$('#side-menu').metisMenu();*/

      //从浏览器中获得皮肤设置
      /*localStorageConfig();*/

      // canvas菜单打开关闭 ：off_canvas_menu.html Close menu in canvas mode
      /*$('.close-canvas-menu').on('click', function () {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
      });
      // Run menu of canvas
      $('body.canvas-menu .sidebar-collapse').slimScroll({
        height: '100%',
        railOpacity: 0.9
      });*/

      // 右侧栏控制 Open close right sidebar
      /*$('.right-sidebar-toggle').on('click', function () {
        $('#right-sidebar').toggleClass('sidebar-open');
      });
      // Initialize slimscroll for right sidebar
      $('.sidebar-container').slimScroll({
        height: '100%',
        railOpacity: 0.4,
        wheelStep: 10
      });*/

      /*  // 菜单栏控制 Minimalize menu
        $('.navbar-minimalize').on('click', function (event) {
          event.preventDefault();
          $("body").toggleClass("mini-navbar");
          SmoothlyMenu();
        });*/

      // 悬停提示 Tooltips demo
      /* $('.tooltip-demo').tooltip({
         selector: "[data-toggle=tooltip]",
         container: "body"
       });*/


      //重设页面内容高度
      /*fix_height();*/

      /*// 如果固定菜单，则生成滚动条 Fixed Sidebar
      $(window).bind("load", function () {
        if ($("body").hasClass('fixed-sidebar')) {
          $('.sidebar-collapse').slimScroll({
            height: '100%',
            railOpacity: 0.9
          });
        }
      });*/

      // 页面如果滚动条滚动，右侧边栏固定 Move right sidebar top after scroll
      /*$(window).scroll(function () {
        if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
          $('#right-sidebar').addClass('sidebar-top');
        } else {
          $('#right-sidebar').removeClass('sidebar-top');
        }
      });*/

      //bootstrap 的 popover 弹出框
      /* $("[data-toggle=popover]").popover();*/

      //这个样式的滚动条设置高度100%
      $('.full-height-scroll').slimscroll({
        height: '100%'
      });

      // 窗口大小变化动态添加样式 Minimalize menu when screen is less than 768px
      /*  $(window).bind("resize", function () {
          if ($(this).width() < 769) {
            $('body').addClass('body-small').removeClass('fixed-sidebar')
          } else {
            $('body').removeClass('body-small').addClass('fixed-sidebar')
          }
          fix_height();
        });*/

      //dom加载完全后，窗口变化或滚动条事件，重置页面内容高度
      /*  $(window).bind("load resize scroll", function () {
          if (!$("body").hasClass('body-small')) {
            fix_height();
          }
        });*/
    });
  }
};

//读取本地皮肤设置
function localStorageConfig() {
  if (localStorageSupport()) {
    let collapse = localStorage.getItem("collapse_menu");
    let fixedsidebar = localStorage.getItem("fixedsidebar");
    let fixednavbar = localStorage.getItem("fixednavbar");
    let boxedlayout = localStorage.getItem("boxedlayout");
    let fixedfooter = localStorage.getItem("fixedfooter");

    let body = $('body');

    if (fixedsidebar === 'on') {
      body.addClass('fixed-sidebar');
      $('.sidebar-collapse').slimScroll({
        height: '100%',
        railOpacity: 0.9
      });
    }

    if (collapse === 'on') {
      if (body.hasClass('fixed-sidebar')) {
        if (!body.hasClass('body-small')) {
          body.addClass('mini-navbar');
        }
      } else {
        if (!body.hasClass('body-small')) {
          body.addClass('mini-navbar');
        }

      }
    }

    if (fixednavbar === 'on') {
      $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
      body.addClass('fixed-nav');
    }

    if (boxedlayout === 'on') {
      body.addClass('boxed-layout');
    }

    if (fixedfooter === 'on') {
      $(".footer").addClass('fixed');
    }
  }
}

//菜单样式切换
function SmoothlyMenu() {
  let body = $('body');
  if (!body.hasClass('mini-navbar') || body.hasClass('body-small')) {
    $('#side-menu').hide();
    setTimeout(
      function () {
        $('#side-menu').fadeIn(400);
      }, 200);
  } else if (body.hasClass('fixed-sidebar')) {
    $('#side-menu').hide();
    setTimeout(
      function () {
        $('#side-menu').fadeIn(400);
      }, 100);
  } else {
    $('#side-menu').removeAttr('style');
  }
}

// Full height of sidebar
function fix_height() {
  let windowHeigth = $(window).height();
  let navbarHeigth = $('.navbar').height();
  let wrapper = $('#page-wrapper');
  if ($('body').hasClass('fixed-nav')) {
    wrapper.css("min-height", (windowHeigth - navbarHeigth) + "px");
  } else {
    wrapper.css("min-height", (windowHeigth) + "px");
  }
}

/*function fix_heighto() {
  var heightWithoutNavbar = $("body > #wrapper").height() - 61;
  $(".sidebar-panel").css("min-height", heightWithoutNavbar + "px");

  var navbarheight = $('nav.navbar-default').height();
  var wrapperHeight = $('#page-wrapper').height();

  if (navbarheight > wrapperHeight) {
    $('#page-wrapper').css("min-height", navbarheight + "px");
  }

  if (navbarheight < wrapperHeight) {
    $('#page-wrapper').css("min-height", $(window).height() + "px");
  }

  if ($('body').hasClass('fixed-nav')) {
    if (navbarheight > wrapperHeight) {
      $('#page-wrapper').css("min-height", navbarheight + "px");
    } else {
      $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
    }
  }

}*/

// check if browser support HTML5 local storage
function localStorageSupport() {
  return (('localStorage' in window) && window['localStorage'] !== null)
}

// For demo purpose - animation css script
function animationHover(element, animation) {
  element = $(element);
  element.hover(
    function () {
      element.addClass('animated ' + animation);
    },
    function () {
      //wait for animation to finish before removing classes
      window.setTimeout(function () {
        element.removeClass('animated ' + animation);
      }, 2000);
    });
}

// Dragable panels
function WinMove() {
  var element = "[class*=col]";
  var handle = ".ibox-title";
  var connect = "[class*=col]";
  $(element).sortable(
    {
      handle: handle,
      connectWith: connect,
      tolerance: 'pointer',
      forcePlaceholderSize: true,
      opacity: 0.8
    })
    .disableSelection();
}

export default inspinia;


