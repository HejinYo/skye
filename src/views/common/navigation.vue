<template>
  <nav class="navbar-default navbar-static-side" role="navigation">
    <div class="sidebar-collapse">
      <ul class="nav metismenu" id="side-menu" v-metisMenu>
        <li class="nav-header">
          <div class="dropdown profile-element">
                <span>
                  <img alt="image" class="img-circle" src="../../assets/img/profile_small.jpg"/>
                </span>
            <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                  <span class="clear">
                    <span class="block m-t-xs">
                      <strong class="font-bold">{{username}}</strong>
                    </span>
                    <span class="text-muted text-xs block">Java 开发 <b class="caret"></b></span>
                  </span>
            </a>
            <ul class="dropdown-menu animated fadeInRight m-t-xs">
              <li><a href="profile.html">简介</a></li>
              <li><a href="contacts.html">联系人</a></li>
              <li><a href="mailbox.html">邮箱</a></li>
              <li class="divider"></li>
              <li><a href="login.html">退出</a></li>
            </ul>
          </div>
          <div class="logo-element">
            IN+
          </div>
        </li>
        <menuComp :model="model" v-for="model in menuList" :key="model.mid"></menuComp>
      </ul>
    </div>
  </nav>
</template>

<script>
  import axios from 'axios';
  import {mapGetters} from 'vuex'
  import 'metisMenu/dist/metisMenu.min.js'
  import menu from '../../components/menuComp'

  export default {
    name: 'navigation',
    data() {
      return {
        menuList: []
      }
    },
    computed: {
      username() {
        return this.loginUser ? this.loginUser.username : ''
      },
      ...mapGetters([
        'loginUser'
      ])
    },
    components: {
      'menuComp': menu,
    },
    mounted: function () {
      this.$nextTick(function () {
        //获取用户菜单
        axios.get('/api/menu/list')
          .then(response => {
            this.menuList = response.data.result;
          })
      })
    },
    directives: {
      metisMenu: {
        //被绑定元素所在模板完成一次更新周期时调用。
        componentUpdated(el) {
          $(el).metisMenu();
        }
      }
    }

  }
</script>
