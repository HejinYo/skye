<template>
  <div>
    <h1>vuex 测试</h1>
    Clicked: {{ count }} times
    <button class="btn btn-primary" @click="increment">+</button>
    <button class="btn btn-info">
      Clicked: {{ count }} times
    </button>
    <button class="btn btn-danger" @click="decrement">-</button>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'

  export default {
    computed: {
      // 使用对象展开运算符...将 getters 混入 computed 对象中
      ...mapGetters([
        'count'
      ])
    },
    methods: {
      ...mapActions([
        'increment', // 映射 this.increment() 为 this.$store.dispatch('increment')
        'decrement'
      ])
    }
  }

</script>
