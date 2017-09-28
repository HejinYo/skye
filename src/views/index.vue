<template>
  <div id="wrapper" v-inspinia>

    <!-- Navigation -->
    <navigation></navigation>

    <!-- Page wraper -->
    <div id="page-wrapper" class="gray-bg dashbard-1">

      <!-- Page topnavbar -->
      <top-navbar></top-navbar>

      <!--<el-col :span="24" class="breadcrumb-container">
        <strong class="title">{{$route.name}}</strong>
        <el-breadcrumb separator="/" class="breadcrumb-inner">
          <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>-->

      <!--<div class="row border-bottom white-bg">
        <div class="col-lg-6">
          <h2><strong class="title">{{$route.name}}</strong></h2>
        </div>
        <div class="col-lg-6" style="float: right">
          &lt;!&ndash;<el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" :to="{ path: item.path }">
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>&ndash;&gt;
          <ol class="breadcrumb">
            <li>
              <a href="index.html">Home</a>
            </li>
            <li>
              <a>Tables</a>
            </li>
            <li class="active">
              <strong>Data Tables</strong>
            </li>
          </ol>
        </div>
      </div>-->
      <div class="white-bg">
        <div class="content-header">
          <h1>
            {{$route.name}}
          </h1>
          <!--<el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" :to="item">
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>-->
          <Breadcrumb class="breadcrumb">
            <BreadcrumbItem v-for="item in $route.matched" :key="item.path" :href="item">
              {{ item.name }}
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      <div class="wrapper wrapper-content animated fadeInRight">
        <!-- Main view  -->
        <router-view></router-view>
      </div>

      <!-- Footer -->
      <footer-comp></footer-comp>
    </div>
    <right-sidebar></right-sidebar>
    <skin-config></skin-config>
    <BackTop></BackTop>
  </div>
</template>


<script>
  import navigation from '@/views/common/navigation'
  import topNavbar from '@/views/common/topNavbar'
  import pageFooter from '@/views/common/pageFooter'
  import rightSidebar from '@/views/common/rightSidebar'
  import skinConfig from '@/views/common/skinConfig'
  import quiBtn from '@/components/quiButton'

  export default {
    name: 'index',
    data() {
      return {
        menuList: []
      }
    },
    components: {
      'navigation': navigation,
      'top-navbar': topNavbar,
      'footer-comp': pageFooter,
      'right-sidebar': rightSidebar,
      'qui-btn': quiBtn,
      'skin-config': skinConfig
    },
    methods: {},
    mounted: function () {
      this.$nextTick(function () {
       /* this.$router.replace({
          path: decodeURIComponent('/manage/main')
        })*/
      })
    }
    ,
    beforeCreate: function () {
      //组件实例化之前
    },
    created: function () {
      //组件实例化了
    },
    beforeMount: function () {
      //组件写入dom结构之前
    },
    beforeUpdate: function () {
      //组件更新前
    },
    updated: function () {
      //组件更新比如修改了文案
    },
    beforeDestroy: function () {
      //组件销毁之前
    },
    destroyed: function () {
      //组件已经销毁
    }
  }

</script>

<style lang="scss">

  .content-header {
    position: relative;
    padding: 10px 15px 10px 15px;
  }

  .content-header > h1 {
    margin: 0;
    font-size: 24px;
  }

  .content-header > .breadcrumb {
    float: right;
    background: transparent;
    margin-top: 0;
    margin-bottom: 0;
    font-size: 12px;
    padding: 7px 5px;
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 2px;
  }

  @media (max-width: 991px) {
    .content-header > .breadcrumb {
      position: relative;
      margin-top: 5px;
      top: 0;
      right: 0;
      float: none;
      background: #f2f2f3;
      /*padding-left: 10px;*/
    }
    .content-header > .breadcrumb li:before {
      color: #97a0b3;
    }
  }
</style>
