<template>
  <div class="border-bottom">
    <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
      <div class="navbar-header">
        <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" @click.prevent="ctrlMenu"><i class="fa fa-bars"></i> </a>
        <form role="search" class="navbar-form-custom" action="search_results.html">
          <div class="form-group">
            <input type="text" placeholder="搜索..." class="form-control" name="top-search" id="top-search">
          </div>
        </form>
      </div>
      <ul class="nav navbar-top-links navbar-right">
        <li>
          <span class="m-r-sm text-muted welcome-message">Welcome to skye.</span>
        </li>
        <li class="dropdown">
          <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#">
            <i class="fa fa-bell"></i> <span class="label label-primary">8</span>
          </a>
          <ul class="dropdown-menu dropdown-alerts">
            <li>
              <a href="mailbox.html">
                <div>
                  <i class="fa fa-envelope fa-fw"></i> You have 16 messages
                  <span class="pull-right text-muted small">4 minutes ago</span>
                </div>
              </a>
            </li>
            <li class="divider"></li>
            <li>
              <a href="profile.html">
                <div>
                  <i class="fa fa-twitter fa-fw"></i> 3 New Followers
                  <span class="pull-right text-muted small">12 minutes ago</span>
                </div>
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#" @click="logout">
            <i class="fa fa-sign-out"></i> 退出
          </a>
        </li>
        <li>
          <a class="right-sidebar-toggle" @click.prevent="ctrlRightSidebar">
            <i class="fa fa-tasks"></i>
          </a>
        </li>
      </ul>

    </nav>
  </div>
</template>

<script>
  export default {
    name: 'topNavbar',
    data() {
      return {}
    },
    methods: {
      ctrlMenu() {
        $("body").toggleClass("mini-navbar");
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
      },
      ctrlRightSidebar() {
        $('#right-sidebar').toggleClass('sidebar-open');
      },
      logout() {
        this.$store.commit('logout');
        this.$router.push({path: '/login'});
        this.$http.get('/api/logout')
          .then(response => {
          })
      }
    }
  }
</script>
