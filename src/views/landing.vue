<template>
  <div id="page-top" class="landing-page">
    <div class="navbar-wrapper">
      <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header page-scroll">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" @click="gotoManage">{{username}}</a>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
              <li><a class="page-scroll" href="#page-top">主页</a></li>
              <li><a class="page-scroll" href="#features">特色</a></li>
              <li><a class="page-scroll" href="#contact">联系</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div id="inSlider" class="carousel carousel-fade" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#inSlider" data-slide-to="0" class="active"></li>
        <li data-target="#inSlider" data-slide-to="1"></li>
      </ol>
      <div class="carousel-inner" role="listbox">
        <div class="item active">
          <div class="container">
            <div class="carousel-caption">
              <h1>Skye<br/>
                综合管理<br/>
              </h1>
              <p>简单、快捷.</p>
              <p>
                <a class="btn btn-lg btn-primary" href="#">了解更多</a>
              </p>
            </div>
            <!--<div class="carousel-image wow zoomIn">
              <img src="../assets/img/landing/laptop.png" alt="laptop"/>
            </div>-->
          </div>
          <!-- Set background for slide in css -->
          <div class="header-back one"></div>

        </div>
        <div class="item">
          <div class="container">
            <div class="carousel-caption blank">
              <h1>我们创造 <br/> 有意义的管理方式</h1>
              <p>在此之前，我将在这里做一个简单的介绍.</p>
              <p><a class="btn btn-lg btn-primary" href="#" role="button">了解更多</a></p>
            </div>
          </div>
          <!-- Set background for slide in css -->
          <div class="header-back two"></div>
        </div>
      </div>
      <a class="left carousel-control" href="#inSlider" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      </a>
      <a class="right carousel-control" href="#inSlider" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      </a>
    </div>


    <section id="features" class="container services">
      <div class="row">
        <div class="col-sm-3">
          <h2>简单</h2>
          <p>是啊，没几个页面，就是简单</p>
          <p><a class="navy-link" href="#" role="button">详细 &raquo;</a></p>
        </div>
        <div class="col-sm-3">
          <h2>方便</h2>
          <p>什么都不用做，就是方便.</p>
          <p><a class="navy-link" href="#" role="button">详细 &raquo;</a></p>
        </div>
        <div class="col-sm-3">
          <h2>高效</h2>
          <p>根本没有做这件事，就是高效.</p>
          <p><a class="navy-link" href="#" role="button">详细 &raquo;</a></p>
        </div>
        <div class="col-sm-3">
          <h2>省心</h2>
          <p>贼省心.</p>
          <p><a class="navy-link" href="#" role="button">详细 &raquo;</a></p>
        </div>
      </div>
    </section>

    <section id="testimonials" class="navy-section testimonials" style="margin-top: 0">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center wow zoomIn">
            <i class="fa fa-comment big-icon"></i>
            <h1>
              很多用户在使用呢！
            </h1>
            <div class="testimonials-text">
              <i>"想多了，还没开发完呢..."</i>
            </div>
            <small>
              <strong>hejinyo - 2017.09.09</strong>
            </small>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="gray-section contact">
      <div class="container">
        <div class="row m-b-lg">
          <div class="col-lg-12 text-center">
            <div class="navy-line"></div>
            <h1>联系我们</h1>
            <p>无业游民，无法联系.</p>
          </div>
        </div>
        <div class="row m-b-lg">
          <div class="col-lg-3 col-lg-offset-3">
            <address>
              <strong><span class="navy">skye, Inc.</span></strong><br/>
              北京市 海淀区<br/>
              上地<br/>
              <abbr title="Phone">email:</abbr> hejinyo@gmail.com
            </address>
          </div>
          <div class="col-lg-4">
            <p class="text-color">

            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 text-center">
            <a href="mailto:test@email.com" class="btn btn-primary">发邮件给我们</a>
            <p class="m-t-sm">
              或者社交平台关注我们
            </p>
            <ul class="list-inline social-icon">
              <li><a href="http://weibo.com/234992665/"><i class="fa fa-weibo"></i></a>
              </li>
              <li><a href="http://weibo.com/234992665/"><i class="fa fa-facebook"></i></a>
              </li>
              <li><a href="http://weibo.com/234992665/"><i class="fa fa-linkedin"></i></a>
              </li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8 col-lg-offset-2 text-center m-t-lg m-b-lg">
            <p><strong>&copy; 2017 hejinyo </strong><br/></p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'landing',
    computed: {
      username() {
        let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
        if (loginUser) {
          return this.loginUser ? this.loginUser.userName : '登录'
        }
        return '登录';
      },
      ...mapGetters([
        'loginUser'
      ])
    },
    methods: {
      gotoManage() {
        if (this.username === '') {
          this.$router.replace({
            path: decodeURIComponent('/login')
          })
        } else {
          this.$router.replace({
            path: decodeURIComponent('/manage')
          })
        }
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        var cbpAnimatedHeader = (function () {

          var docElem = document.documentElement,
            header = document.querySelector('.navbar-default'),
            didScroll = false,
            changeHeaderOn = 200;

          function init() {
            window.addEventListener('scroll', function (event) {
              if (!didScroll) {
                didScroll = true;
                setTimeout(scrollPage, 250);
              }
            }, false);
          }

          function scrollPage() {
            var sy = scrollY();
            if (sy >= changeHeaderOn) {
              header.classList.add("navbar-scroll");
            }
            else {
              header.classList.remove("navbar-scroll");
            }
            didScroll = false;
          }

          function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
          }

          init();

        })();

        $('body').scrollspy({
          target: '.navbar-fixed-top',
          offset: 80
        })
        // Page scrolling feature
        $('a.page-scroll').bind('click', function (event) {
          var link = $(this);
          $('html, body').stop().animate({
            scrollTop: $(link.attr('href')).offset().top - 70
          }, 500);
          event.preventDefault();
        });
      })
    }
  }
</script>
<style scoped lang="scss">
  $url: '../assets/css/patterns/';
  @import '../assets/css/scss/variables.scss';

  .landing-page.pace .pace-progress {
    background: #fff;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    height: 2px;
    -webkit-transition: width 1s;
    -moz-transition: width 1s;
    -o-transition: width 1s;
    transition: width 1s;
  }

  .pace-inactive {
    display: none;
  }

  body.landing-page {
    color: $text-color;
    font-family: ' Open Sans
  ', helvetica, arial, sans-serif;
    background-color: #fff;
  }

  .landing-page {

    .container {
      overflow: hidden;
    }

    span.navy {
      color: $navy;
    }
    p.text-color {
      color: $text-color;
    }
    a.navy-link {
      color: $navy;
      text-decoration: none;
    }
    a.navy-link:hover {
      color: darken($navy, 5%);
    }
    section p {
      color: #aeaeae;
      font-size: 13px;
    }
    address {
      font-size: 13px;
    }
    h1 {
      margin-top: 10px;
      font-size: 30px;
      font-weight: 200;
    }
    .navy-line {
      width: 60px;
      height: 1px;
      margin: 60px auto 0;
      border-bottom: 2px solid $navy;
    }
    /* CUSTOMIZE THE NAVBAR
    -------------------------------------------------- */
    .navbar-wrapper {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: 200;
    }
    /* Flip around the padding for proper display in narrow viewports */
    .navbar-wrapper > .container {
      padding-right: 0;
      padding-left: 0;
    }
    .navbar-wrapper .navbar {
      padding-right: 15px;
      padding-left: 15px;
    }
    .navbar-default.navbar-scroll {
      background-color: #fff !important;
      border-color: #fff;
      padding: 15px 0;
    }
    .navbar-default {
      background-color: transparent !important;
      border-color: transparent;
      transition: all 0.3s ease-in-out 0s;
    }
    .navbar-default .nav li a {
      color: #fff;
      font-family: ' Open Sans ',
      helvetica, arial, sans-serif;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 14px;
    }
    .navbar-nav > li > a {
      padding-top: 25px;
      border-top: 6px solid transparent;
    }
    .navbar-default .navbar-nav > .active > a,
    .navbar-default .navbar-nav > .active > a:hover {
      background: transparent;
      color: #fff;
      border-top: 6px solid $navy;
    }
    .navbar-default .navbar-nav > li > a:hover,
    .navbar-default .navbar-nav > li > a:focus {
      color: $navy;
      background: inherit;
    }
    .navbar-default .navbar-nav > .active > a:focus {
      background: transparent;
      color: #fff;
    }

    .navbar-default .navbar-nav > .active > a:focus {
      background: transparent;
      color: #ffffff;
    }

    .navbar-default.navbar-scroll .navbar-nav > .active > a:focus {
      background: transparent;
      color: inherit;
    }
    .navbar-default .navbar-brand:hover,
    .navbar-default .navbar-brand:focus {
      background: darken($navy, 5%);
      color: #fff;
    }
    .navbar-default .navbar-brand {
      color: #fff;
      height: auto;
      display: block;
      font-size: 14px;
      background: $navy;
      padding: 15px 20px 15px 20px;
      border-radius: 0 0 5px 5px;
      font-weight: 700;
      transition: all 0.3s ease-in-out 0s;
    }
    .navbar-scroll.navbar-default .nav li a {
      color: $text-color;
    }
    .navbar-scroll.navbar-default .nav li a:hover {
      color: $navy;
    }
    .navbar-wrapper .navbar.navbar-scroll {
      padding-top: 0;
      padding-bottom: 5px;
      border-bottom: 1px solid $border-color;
      border-radius: 0;
    }

    .nav > li.active {
      border: none;
      background: inherit;
    }

    .nav > li > a {
      padding: 25px 10px 15px 10px;
    }
    .navbar-scroll .navbar-nav > li > a {
      padding: 20px 10px;
    }

    .navbar-default .navbar-nav > .active > a,
    .navbar-default .navbar-nav > .active > a:hover {
      border-top: 6px solid $navy;
    }

    .navbar-fixed-top {
      border: none !important;
    }

    .navbar-fixed-top.navbar-scroll {
      border-bottom: 1px solid $border-color !important;
    }

    .navbar.navbar-scroll .navbar-brand {
      margin-top: 15px;
      border-radius: 5px;
      font-size: 12px;
      padding: 10px;
      height: auto;
    }
    /* BACKGROUNDS SLIDER
    -------------------------------------------------- */
    .header-back {
      height: 470px;
      width: 100%;
    }
    .header-back.one {
      background: url("../assets/img/landing/header_one.jpg") 50% 0 no-repeat;
    }
    .header-back.two {
      background: url("../assets/img/landing/header_two.jpg") 50% 0 no-repeat;
    }
    /* CUSTOMIZE THE CAROUSEL
    -------------------------------------------------- */
    /* Carousel base class */
    .carousel {
      height: 470px;
    }
    /* Since positioning the image, we need to help out the caption */
    .carousel-caption {
      z-index: 10;
    }
    /* Declare heights because of positioning of img element */
    .carousel .item {
      height: 470px;
      background-color: #777;
    }
    .carousel-inner > .item > img {
      position: absolute;
      top: 0;
      left: 0;
      min-width: 100%;
      height: 470px;
    }
    .carousel-fade .carousel-inner .item {
      opacity: 0;
      -webkit-transition-property: opacity;
      transition-property: opacity;
    }
    .carousel-fade .carousel-inner .active {
      opacity: 1;
    }
    .carousel-fade .carousel-inner .active.left,
    .carousel-fade .carousel-inner .active.right {
      left: 0;
      opacity: 0;
      z-index: 1;
    }
    .carousel-fade .carousel-inner .next.left,
    .carousel-fade .carousel-inner .prev.right {
      opacity: 1;
    }
    .carousel-fade .carousel-control {
      z-index: 2;
    }
    .carousel-control.left,
    .carousel-control.right {
      background: none;
    }
    .carousel-control {
      width: 6%;
    }
    .carousel-inner .container {
      position: relative;
      overflow: visible;
    }
    .carousel-inner {
      overflow: visible;
    }
    .carousel-caption {
      position: absolute;
      top: 100px;
      left: 0;
      bottom: auto;
      right: auto;
      text-align: left;
    }
    .carousel-caption {
      position: absolute;
      top: 100px;
      left: 0;
      bottom: auto;
      right: auto;
      text-align: left;
    }
    .carousel-caption.blank {
      top: 140px;
    }
    .carousel-image {
      position: absolute;
      right: 10px;
      top: 150px;
    }
    .carousel-indicators {
      padding-right: 60px;
    }
    .carousel-caption h1 {
      font-weight: 700;
      font-size: 38px;
      text-transform: uppercase;
      text-shadow: none;
      letter-spacing: -1.5px;
    }
    .carousel-caption p {
      font-weight: 700;
      text-transform: uppercase;
      text-shadow: none;
    }
    .caption-link {
      color: #fff;
      margin-left: 10px;
      text-transform: capitalize;
      font-weight: 400;
    }
    .caption-link:hover {
      text-decoration: none;
      color: inherit;
    }
    /* Sections
    ------------------------- */
    .services {
      padding-top: 60px;
    }
    .services h2 {
      font-size: 20px;
      letter-spacing: -1px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .features-block {
      margin-top: 40px;
    }
    .features-text {
      margin-top: 40px;
    }
    .features small {
      color: $navy;
    }
    .features h2 {
      font-size: 18px;
      margin-top: 5px;
    }
    .features-text-alone {
      margin: 40px 0;
    }
    .features-text-alone h1 {
      font-weight: 200;
    }
    .features-icon {
      color: $navy;
      font-size: 40px;
    }
    .navy-section {
      margin-top: 60px;
      background: $navy;
      color: #fff;
      padding: 20px 0;
    }
    .gray-section {
      background: #f4f4f4;
      margin-top: 60px;
    }
    .team-member {
      text-align: center;
    }
    .team-member img {
      margin: auto;
    }
    .social-icon a {
      background: $navy;
      color: #fff;
      padding: 4px 8px;
      height: 28px;
      width: 28px;
      display: block;
      border-radius: 50px;
    }
    .social-icon a:hover {
      background: darken($navy, 5%);
    }
    .img-small {
      height: 88px;
      width: 88px;
    }
    .pricing-plan {
      margin: 20px 30px 0 30px;
      border-radius: 4px;
    }
    .pricing-plan.selected {
      transform: scale(1.1);
      background: #f4f4f4;
    }
    .pricing-plan li {
      padding: 10px 16px;
      border-top: 1px solid $border-color;
      text-align: center;
      color: #aeaeae;
    }
    .pricing-plan .pricing-price span {
      font-weight: 700;
      color: $navy;
    }
    li.pricing-desc {
      font-size: 13px;
      border-top: none;
      padding: 20px 16px;
    }
    li.pricing-title {
      background: $navy;
      color: #fff;
      padding: 10px;
      border-radius: 4px 4px 0 0;
      font-size: 22px;
      font-weight: 600;
    }
    .testimonials {
      padding-top: 80px;
      padding-bottom: 90px;
      background-color: $navy;
      background-image: url("../assets/img/landing/avatar_all.png");
    }
    .big-icon {
      font-size: 56px !important;
    }
    .features .big-icon {
      color: $navy !important;
    }
    .contact {
      background-image: url("../assets/img/landing/word_map.png");
      background-position: 50% 50%;
      background-repeat: no-repeat;
      margin-top: 60px;
    }

    section.timeline {
      padding-bottom: 30px;
    }
    section.comments {
      padding-bottom: 80px;
    }

    .comments-avatar {
      margin-top: 25px;
      margin-left: 22px;
      margin-bottom: 25px;
    }

    .comments-avatar .commens-name {
      font-weight: 600;
      font-size: 14px;
    }

    .comments-avatar img {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      margin-right: 10px;
    }

    .bubble {
      position: relative;
      height: 120px;
      padding: 20px;
      background: #FFFFFF;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      font-style: italic;
      font-size: 14px;
    }

    .bubble:after {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 15px 14px 0;
      border-color: #FFFFFF transparent;
      display: block;
      width: 0;
      z-index: 1;
      bottom: -15px;
      left: 30px;
    }

    /* Buttons - only primary custom button
    ------------------------- */
    .btn-primary.btn-outline:hover,
    .btn-success.btn-outline:hover,
    .btn-info.btn-outline:hover,
    .btn-warning.btn-outline:hover,
    .btn-danger.btn-outline:hover {
      color: #fff;
    }
    .btn-primary {
      background-color: $navy;
      border-color: $navy;
      color: #FFFFFF;
      font-size: 14px;
      padding: 10px 20px;
      font-weight: 600;
    }
    .btn-primary:hover,
    .btn-primary:focus,
    .btn-primary:active,
    .btn-primary.active,
    .open .dropdown-toggle.btn-primary {
      background-color: darken($navy, 5%);
      border-color: darken($navy, 5%);
      color: #FFFFFF;
    }
    .btn-primary:active,
    .btn-primary.active,
    .open .dropdown-toggle.btn-primary {
      background-image: none;
    }
    .btn-primary.disabled,
    .btn-primary.disabled:hover,
    .btn-primary.disabled:focus,
    .btn-primary.disabled:active,
    .btn-primary.disabled.active,
    .btn-primary[disabled],
    .btn-primary[disabled]:hover,
    .btn-primary[disabled]:focus,
    .btn-primary[disabled]:active,
    .btn-primary.active[disabled],
    fieldset[disabled] .btn-primary,
    fieldset[disabled] .btn-primary:hover,
    fieldset[disabled] .btn-primary:focus,
    fieldset[disabled] .btn-primary:active,
    fieldset[disabled] .btn-primary.active {
      background-color: #1dc5a3;
      border-color: #1dc5a3;
    }
    /* RESPONSIVE CSS
    -------------------------------------------------- */
    @media (min-width: 768px) {
      /* Navbar positioning foo */
      .navbar-wrapper {
        margin-top: 20px;
      }

      .navbar-wrapper .container {
        padding-right: 15px;
        padding-left: 15px;
      }

      .navbar-wrapper .navbar {
        padding-right: 0;
        padding-left: 0;
      }

      /* The navbar becomes detached from the top, so we round the corners */
      .navbar-wrapper .navbar {
        border-radius: 4px;
      }

      /* Bump up size of carousel content */
      .carousel-caption p {
        margin-bottom: 20px;
        font-size: 14px;
        line-height: 1.4;
      }

      .featurette-heading {
        font-size: 50px;
      }
    }
    @media (max-width: 992px) {
      .carousel-image {
        display: none;
      }
    }
    @media (max-width: 768px) {
      .carousel-caption,
      .carousel-caption.blank {
        left: 5%;
        top: 80px;
      }

      .carousel-caption h1 {
        font-size: 28px;
      }

      .navbar.navbar-scroll .navbar-brand {
        margin-top: 6px;
      }

      .navbar-default {
        background-color: #fff;
        border-color: #fff;
        padding: 15px 0;
      }

      .navbar-default .navbar-nav > .active > a:focus {
        background: transparent !important;
        color: inherit;
      }

      .navbar-default .nav li a {
        color: $text-color;
      }

      .navbar-default .nav li a:hover {
        color: $navy;
      }

      .navbar-wrapper .navbar {
        padding-top: 0;
        padding-bottom: 5px;
        border-bottom: 1px solid $border-color;
        border-radius: 0;
      }

      .nav > li > a {
        padding: 25px 10px 15px 10px;
      }

      .navbar-nav > li > a {
        padding: 20px 10px;
      }

      .navbar .navbar-brand {
        margin-top: 6px;
        border-radius: 5px;
        font-size: 12px;
        padding: 10px;
        height: auto;
      }

      .navbar-wrapper .navbar {
        padding-left: 15px;
        padding-right: 5px;
      }

      .navbar-default .navbar-nav > .active > a,
      .navbar-default .navbar-nav > .active > a:hover {
        color: inherit;
      }

      .carousel-control {
        display: none;
      }
    }
    @media (min-width: 992px) {
      .featurette-heading {
        margin-top: 120px;
      }
    }

    @media (max-width: 768px) {
      .navbar .navbar-header {
        display: block;
        float: none;
      }

      .navbar .navbar-header .navbar-toggle {
        background-color: #ffffff;
        padding: 9px 10px;
        border: none;
      }
    }

  }
</style>
