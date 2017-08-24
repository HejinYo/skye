<template>
  <div id="right-sidebar" class="animated" v-resetScroll>
    <div class="sidebar-container" v-initScroll>
      <ul class="nav nav-tabs navs-3">
        <li class="active">
          <a data-toggle="tab" href="#tab-1">
            Notes
          </a>
        </li>
        <li>
          <a data-toggle="tab" href="#tab-2">
            Projects
          </a>
        </li>
        <li class="">
          <a data-toggle="tab" href="#tab-3">
            <i class="fa fa-gear"></i>
          </a>
        </li>
      </ul>
      <div class="tab-content">


        <div id="tab-1" class="tab-pane active">
          <div class="sidebar-title">
            <h3><i class="fa fa-comments-o"></i> Latest Notes</h3>
            <small><i class="fa fa-tim"></i> You have 10 new message.</small>
          </div>
          <div>
            <div class="sidebar-message">
              <a href="#">
                <div class="pull-left text-center">
                  <img alt="image" class="img-circle message-avatar" src="../../assets/img/a1.jpg">

                  <div class="m-t-xs">
                    <i class="fa fa-star text-warning"></i>
                    <i class="fa fa-star text-warning"></i>
                  </div>
                </div>
                <div class="media-body">

                  There are many variations of passages of Lorem Ipsum available.
                  <br>
                  <small class="text-muted">Today 4:21 pm</small>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div id="tab-2" class="tab-pane">
          <div class="sidebar-title">
            <h3><i class="fa fa-cube"></i> Latest projects</h3>
            <small><i class="fa fa-tim"></i> You have 14 projects. 10 not completed.</small>
          </div>
          <ul class="sidebar-list">
            <li>
              <a href="#">
                <div class="small pull-right m-t-xs">9 hours ago</div>
                <h4>Business valuation</h4>
                It is a long established fact that a reader will be distracted.

                <div class="small">Completion with: 22%</div>
                <div class="progress progress-mini">
                  <div style="width: 22%;" class="progress-bar progress-bar-warning"></div>
                </div>
                <div class="small text-muted m-t-xs">Project end: 4:00 pm - 12.06.2014</div>
              </a>
            </li>
          </ul>
        </div>

        <div id="tab-3" class="tab-pane">

          <div class="sidebar-title">
            <h3><i class="fa fa-gears"></i> Settings</h3>
            <small><i class="fa fa-tim"></i> You have 14 projects. 10 not completed.</small>
          </div>

          <div class="setings-item">
                          <span>
                              Show notifications
                          </span>
            <div class="switch">
              <div class="onoffswitch">
                <input type="checkbox" name="collapsemenu" class="onoffswitch-checkbox" id="example">
                <label class="onoffswitch-label" for="example">
                  <span class="onoffswitch-inner"></span>
                  <span class="onoffswitch-switch"></span>
                </label>
              </div>
            </div>
          </div>
          <div class="setings-item">
                          <span>
                              Disable Chat
                          </span>
            <div class="switch">
              <div class="onoffswitch">
                <input type="checkbox" name="collapsemenu" checked class="onoffswitch-checkbox" id="example2">
                <label class="onoffswitch-label" for="example2">
                  <span class="onoffswitch-inner"></span>
                  <span class="onoffswitch-switch"></span>
                </label>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'rightSidebar',
    data: function () {
      return {}
    },
    directives: {
      initScroll: {
        inserted(el) {
          $(el).slimScroll({
            height: '100%',
            railOpacity: 0.4,
            wheelStep: 10
          });
        }
      },
      resetScroll: {
        bind(el) {
          $(window).scroll(function () {
            if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
              $(el).addClass('sidebar-top');
            } else {
              $(el).removeClass('sidebar-top');
            }
          });
        }
      }
    }
  }
</script>
