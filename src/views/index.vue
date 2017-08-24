<template>
  <div id="wrapper" v-inspinia>

    <!-- Navigation -->
    <navigation></navigation>

    <!-- Page wraper -->
    <div id="page-wrapper" class="gray-bg dashbard-1">

      <!-- Page topnavbar -->
      <top-navbar></top-navbar>

      <!-- Main view  -->
      <router-view></router-view>

      <!-- Footer -->
      <!--<footer-comp></footer-comp>-->
    </div>
    <right-sidebar></right-sidebar>
    <skin-config></skin-config>
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


<style scoped="">
  /*@import '../assets/css/style.css';
  @import '../assets/css/animate.css';*/
</style>
