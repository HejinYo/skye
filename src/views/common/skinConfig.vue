<template>
  <div class="theme-config" v-initSkin>
    <div class="theme-config-box">
      <div class="spin-icon" @click="ctrlSkin">
        <i class="fa fa-cogs fa-spin"></i>
      </div>
      <div class="skin-settings">
        <div class="title">布局设置</div>
        <div class="setings-item">
                    <span>
                      关闭菜单
                    </span>
          <div class="switch">
            <div class="onoffswitch">
              <input type="checkbox" name="collapsemenu" class="onoffswitch-checkbox" id="collapsemenu" @click="collapsemenu">
              <label class="onoffswitch-label" for="collapsemenu">
                <span class="onoffswitch-inner"></span>
                <span class="onoffswitch-switch"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="setings-item">
                    <span>
                      固定菜单
                    </span>
          <div class="switch">
            <div class="onoffswitch">
              <input type="checkbox" name="fixedsidebar" class="onoffswitch-checkbox" id="fixedsidebar" @click="fixedsidebar">
              <label class="onoffswitch-label" for="fixedsidebar">
                <span class="onoffswitch-inner"></span>
                <span class="onoffswitch-switch"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="setings-item">
                    <span>
                      固定顶栏
                    </span>
          <div class="switch">
            <div class="onoffswitch">
              <input type="checkbox" name="fixednavbar" class="onoffswitch-checkbox" id="fixednavbar" @click="fixednavbar">
              <label class="onoffswitch-label" for="fixednavbar">
                <span class="onoffswitch-inner"></span>
                <span class="onoffswitch-switch"></span>
              </label>
            </div>
          </div>
        </div>
        <!-- <div class="setings-item">
                     <span>
                       固定顶栏 v.2
                       <br/>
                       <small>*Primary layout</small>
                     </span>
           <div class="switch">
             <div class="onoffswitch">
               <input type="checkbox" name="fixednavbar2" class="onoffswitch-checkbox" id="fixednavbar2" @click="fixednavbar2">
               <label class="onoffswitch-label" for="fixednavbar2">
                 <span class="onoffswitch-inner"></span>
                 <span class="onoffswitch-switch"></span>
               </label>
             </div>
           </div>
         </div>-->
        <!--<div class="setings-item">
                    <span>
                      盒式布局
                    </span>
          <div class="switch">
            <div class="onoffswitch">
              <input type="checkbox" name="boxedlayout" class="onoffswitch-checkbox" id="boxedlayout" @click="boxedlayout">
              <label class="onoffswitch-label" for="boxedlayout">
                <span class="onoffswitch-inner"></span>
                <span class="onoffswitch-switch"></span>
              </label>
            </div>
          </div>
        </div>-->
        <div class="setings-item">
                    <span>
                      固定页脚
                    </span>
          <div class="switch">
            <div class="onoffswitch">
              <input type="checkbox" name="fixedfooter" class="onoffswitch-checkbox" id="fixedfooter" @click="fixedfooter">
              <label class="onoffswitch-label" for="fixedfooter">
                <span class="onoffswitch-inner"></span>
                <span class="onoffswitch-switch"></span>
              </label>
            </div>
          </div>
        </div>

        <div class="title">皮肤设置</div>
        <div class="setings-item default-skin">
           <span class="skin-name ">
             <a href="#" class="s-skin-0" @click.prevent="skin_default">
               深沉黑
             </a>
           </span>
        </div>
        <!--  <div class="setings-item blue-skin">
             <span class="skin-name ">
               <a href="#" class="s-skin-1" @click.prevent="skin_blue">
                 浅蓝皮肤
               </a>
             </span>
          </div>
          <div class="setings-item blue-skin">
             <span class="skin-name ">
               <a href="#" class="s-skin-1" @click.prevent="skin_dark_blue">
                 深蓝皮肤
               </a>
             </span>
          </div>
          <div class="setings-item yellow-skin">
             <span class="skin-name ">
               <a href="#" class="s-skin-3" @click.prevent="skin_yellow">
                 黄色/紫色
               </a>
             </span>
          </div>-->
        <div class="setings-item ultra-skin">
           <span class="skin-name ">
             <a href="#" class="md-skin" @click.prevent="skin_md">
               原谅绿
             </a>
           </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'skinConfig',
    methods: {
      ctrlSkin() {
        //打开皮肤设置
        $(".theme-config-box").toggleClass("show");
      },
      fix_height() {
        //重设布局高度
        let windowHeigth = $(window).height();
        let wrapper = $('#page-wrapper');
        if ($('body').hasClass('fixed-nav')) {
          wrapper.css("min-height", (windowHeigth - $('.navbar').height()) + "px");
        } else {
          wrapper.css("min-height", (windowHeigth) + "px");
        }
      },
      smoothlyMenu() {
        //重设菜单样式
        let body = $('body');
        let sidemenu = $('#side-menu');
        if (!body.hasClass('mini-navbar') || body.hasClass('body-small')) {
          sidemenu.hide();
          setTimeout(function () {
            sidemenu.fadeIn(400);
          }, 200);
        } else if (body.hasClass('fixed-sidebar')) {
          sidemenu.hide();
          setTimeout(
            function () {
              sidemenu.fadeIn(400);
            }, 100);
        } else {
          sidemenu.removeAttr('style');
        }
      },
      collapsemenu() {
        //关闭菜单
        if ($('#collapsemenu').is(':checked')) {
          $("body").addClass('mini-navbar');
          localStorage.setItem("collapse_menu", 'on');
        } else {
          $("body").removeClass('mini-navbar');
          localStorage.setItem("collapse_menu", 'off');
        }
        this.smoothlyMenu();
      },
      fixedsidebar() {
        //固定菜单
        if ($('#fixedsidebar').is(':checked')) {
          $("body").addClass('fixed-sidebar');
          $('.sidebar-collapse').slimScroll({height: '100%', railOpacity: 0.9});
          localStorage.setItem("fixedsidebar", 'on');
        } else {
          $('.sidebar-collapse').slimScroll({destroy: true}).attr('style', '');
          $("body").removeClass('fixed-sidebar');
          localStorage.setItem("fixedsidebar", 'off');
        }
      },
      fixednavbar() {
        //固定顶栏
        if ($('#fixednavbar').is(':checked')) {
          $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
          $("body").removeClass('boxed-layout').addClass('fixed-nav');
          $('#boxedlayout').prop('checked', false);
          localStorage.setItem("boxedlayout", 'off');
          localStorage.setItem("fixednavbar", 'on');
        } else {
          $(".navbar-fixed-top").removeClass('navbar-fixed-top').addClass('navbar-static-top');
          $("body").removeClass('fixed-nav').removeClass('fixed-nav-basic');
          $('#fixednavbar2').prop('checked', false);
          localStorage.setItem("fixednavbar", 'off');
          localStorage.setItem("fixednavbar2", 'off');
        }
        this.fix_height();
      },
      fixednavbar2() {
        //固定顶栏 v2
        if ($('#fixednavbar2').is(':checked')) {
          $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
          $("body").removeClass('boxed-layout').addClass('fixed-nav').addClass('fixed-nav-basic');
          $('#boxedlayout').prop('checked', false);
          localStorage.setItem("boxedlayout", 'off');
          localStorage.setItem("fixednavbar2", 'on');
        } else {
          $(".navbar-fixed-top").removeClass('navbar-fixed-top').addClass('navbar-static-top');
          $("body").removeClass('fixed-nav').removeClass('fixed-nav-basic');
          $('#fixednavbar').prop('checked', false);
          localStorage.setItem("fixednavbar2", 'off');
          localStorage.setItem("fixednavbar", 'off');
        }
        this.fix_height();
      },
      boxedlayout() {
        //盒式布局
        if ($('#boxedlayout').is(':checked')) {
          $("body").addClass('boxed-layout').removeClass('fixed-nav').removeClass('fixed-nav-basic');
          $(".navbar-fixed-top").removeClass('navbar-fixed-top').addClass('navbar-static-top');
          $(".footer").removeClass('fixed');
          $('#fixednavbar').prop('checked', false);
          $('#fixednavbar2').prop('checked', false);
          $('#fixedfooter').prop('checked', false);
          localStorage.setItem("fixednavbar", 'off');
          localStorage.setItem("fixednavbar2", 'off');
          localStorage.setItem("fixedfooter", 'off');
          localStorage.setItem("boxedlayout", 'on');
        } else {
          $("body").removeClass('boxed-layout');
          localStorage.setItem("boxedlayout", 'off');
        }
        this.fix_height();
      },
      fixedfooter() {
        //固定页脚
        if ($('#fixedfooter').is(':checked')) {
          $('#boxedlayout').prop('checked', false);
          $("body").removeClass('boxed-layout');
          $(".footer").addClass('fixed');
          localStorage.setItem("boxedlayout", 'off');
          localStorage.setItem("fixedfooter", 'on');
        } else {
          $(".footer").removeClass('fixed');
          localStorage.setItem("fixedfooter", 'off');
        }
        this.fix_height();
      },
      skin_default() {
        $("body").removeClass("md-skin skin-1 skin-2 skin-3");
      },
      skin_blue() {
        this.skin_default();
        $("body").addClass("skin-1");
      },
      skin_dark_blue() {
        this.skin_default();
        $("body").addClass("skin-2");
      },
      skin_yellow() {
        this.skin_default();
        $("body").addClass("skin-3");
      },
      skin_md() {
        this.skin_default();
        $("body").addClass("md-skin");
      }
    },
    directives: {
      initSkin: {
        inserted(el) {
          let collapse = localStorage.getItem("collapse_menu");
          let fixedsidebar = localStorage.getItem("fixedsidebar");
          let fixednavbar = localStorage.getItem("fixednavbar");
          let fixednavbar2 = localStorage.getItem("fixednavbar2");
          let boxedlayout = localStorage.getItem("boxedlayout");
          let fixedfooter = localStorage.getItem("fixedfooter");

          if (collapse === 'on') {
            $('#collapsemenu').prop('checked', 'checked')
          }
          if (fixedsidebar === 'on') {
            $('#fixedsidebar').prop('checked', 'checked')
          }
          if (fixednavbar === 'on') {
            $('#fixednavbar').prop('checked', 'checked')
          }
          if (fixednavbar2 === 'on') {
            $('#fixednavbar2').prop('checked', 'checked')
          }
          if (boxedlayout === 'on') {
            $('#boxedlayout').prop('checked', 'checked')
          }
          if (fixedfooter === 'on') {
            $('#fixedfooter').prop('checked', 'checked')
          }
        }
      }
    }
  }

</script>

<style scoped lang="scss">
  $url: '../..//assets/css/patterns/';
  @import '../../assets/css/scss/variables';
  @import '../../assets/css/scss/theme-config';

</style>
