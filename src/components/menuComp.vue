<template>
  <li>
    <a v-bind:href="model.murl">
      <i v-bind:class="micon(model)"></i>
      <span class="nav-label" v-text="model.mname" v-if="model.mlevel==1"></span>
      {{model.mlevel != 1 ? model.mname : ''}}
      <span class="fa arrow" v-if="haveChildren(model)"></span>
    </a>
    <ul :class="childrenClass(model)" v-if="haveChildren(model)">
      <menuComp :model="item" v-for="item in model.childrenMenu" :key="model.mid"></menuComp>
    </ul>
  </li>
</template>

<script>
  export default {
    name: 'menuComp',
    props: ['model'],
    methods: {
      micon: function (thisMenu) {
        let micon = thisMenu.micon;
        if (micon) {
          return micon;
        } else {
          return 'fa fa-cube';//如果没有，设置默认菜单图标
        }
      },
      haveChildren: function (thisMenu) {
        return thisMenu.childrenMenu.length > 0 && thisMenu.mlevel < 3;//最高支持三级菜单，样式限制
      },
      childrenClass: function (thisMenu) {
        let _this = this;
        let mlevel = thisMenu.mlevel;
        if (_this.haveChildren(thisMenu)) {
          if (mlevel === 1) {
            return "nav collapse nav-second-level";
          } else if (mlevel === 2) {
            return "nav collapse nav-third-level";
          }
        }
      }
    }
  }
</script>
