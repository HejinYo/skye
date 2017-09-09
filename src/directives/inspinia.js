import Vue from 'vue'

Vue.directive('test', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // el.focus()
    var s = " ";
    s += "\r\n<br>网页可见区域宽： " + document.body.clientWidth;
    s += "\r\n<br>网页可见区域高： " + document.body.clientHeight;
    s += "\r\n<br>网页可见区域宽： " + document.body.offsetWidth + "   (包括边线的宽) ";
    s += "\r\n<br>网页可见区域高： " + document.body.offsetHeight + "   (包括边线的宽) ";
    s += "\r\n<br>网页正文全文宽： " + document.body.scrollWidth;
    s += "\r\n<br>网页正文全文高： " + document.body.scrollHeight;
    s += "\r\n<br>网页被卷去的高： " + document.body.scrollTop;
    s += "\r\n<br>网页被卷去的左： " + document.body.scrollLeft;
    s += "\r\n<br>网页正文部分上： " + window.screenTop;
    s += "\r\n<br>网页正文部分左： " + window.screenLeft;
    s += "\r\n<br>屏幕分辨率的高： " + window.screen.height;
    s += "\r\n<br>屏幕分辨率的宽： " + window.screen.width;
    s += "\r\n<br>屏幕可用工作区高度： " + window.screen.availHeight + " （去掉状态栏）";
    s += "\r\n<br>屏幕可用工作区宽度： " + window.screen.availWidth;
    //alert(s);
    //console.log(s);
  }
});

Vue.directive('inspinia', {
  // 当绑定元素插入到 DOM 中。
  bind: initFirst(),
  inserted: init,
  //updated: init,
  componentUpdated: init
});

function initFirst() {
  // 窗口大小变化动态添加样式 Minimalize menu when screen is less than 768px
  $(window).bind("resize", function () {
    if ($(this).width() < 769) {
      $('body').addClass('body-small')/*.removeClass('fixed-sidebar')*/
    } else {
      $('body').removeClass('body-small')/*.addClass('fixed-sidebar')*/
    }
    fix_height();
  });

  //dom加载完全后，窗口变化或滚动条事件，重置页面内容高度
  $(window).bind("load resize scroll", function () {
    if (!$("body").hasClass('body-small')) {
      fix_height();
    }
  });

  window.onload = function () {
    let bodyHasClass = document.body.classList;
    // 如果固定菜单，则生成滚动条 Fixed Sidebar
    bodyHasClass.forEach(function (value, index, array) {
      if ('fixed-sidebar' === value) {
        $('.sidebar-collapse').slimScroll({
          height: '100%',
          railOpacity: 0.9
        });
        return true;
      }
    });
  }
}


function init() {
  //localStorage.setItem("fixedsidebar", 'on');
  //localStorage.setItem("fixednavbar", 'on');
  localStorageConfig();
  let clientWidth = document.body.clientWidth;
  //根据窗口大小初始化样式
  if (clientWidth < 769) {
    document.body.classList.add('body-small');
    localStorage.setItem("fixedsidebar", 'off');
    localStorage.setItem("fixednavbar", 'on');
  } else {
    document.body.classList.remove('body-small');
  }
  fix_height();
}

function fix_height() {
  $('body').height('100%');
  let windowHeigth = document.body.clientHeight;
  let navbarHeigth = $('.navbar').height();
  let wrapper = $('#page-wrapper');
  if ($('body').hasClass('fixed-nav')) {
    wrapper.css("min-height", (windowHeigth - navbarHeigth) + "px");
  } else {
    wrapper.css("min-height", (windowHeigth) + "px");
  }
}


//读取本地皮肤设置
function localStorageConfig() {
  let collapse = localStorage.getItem("collapse_menu");
  let fixedsidebar = localStorage.getItem("fixedsidebar");
  let fixednavbar = localStorage.getItem("fixednavbar");
  let fixednavbar2 = localStorage.getItem("fixednavbar2");
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
        body.addClass('mini-navbar')
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

  if (fixednavbar2 === 'on') {
    $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
    body.addClass('fixed-nav').addClass('fixed-nav-basic');
  }

  if (boxedlayout === 'on') {
    body.addClass('boxed-layout');
  }

  if (fixedfooter === 'on') {
    $(".footer").addClass('fixed');
  }
}
