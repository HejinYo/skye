<template>
  <button class="btn btn-primary" v-on:click="btnClickEvent">
    <span>{{msg}}</span>
  </button>
</template>

<script>
  export default {
    props: {
      msg: {
        default: '下载'
      }
    },
    methods: {    //绑定事件的关键代码
      btnClickEvent: function () {
        alert(this.msg);
      }
    },
    mounted: function () {
      let _this = this;
      this.$nextTick(function () {
        console.log("完成 quiButon.vue");
      })
    }
  }
</script>
