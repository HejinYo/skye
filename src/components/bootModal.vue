<template>

  <div class="modal-open">
    <div class="modal-backdrop fade in"></div>
    <transition name="fade">
      <div class="modal" style="display: block">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" @click="$emit('close')"><span aria-hidden="true">&times;</span></button>
              <slot name="modal-title">
                <h4 class="modal-title">
                  模态框
                </h4>
              </slot>
            </div>
            <div class="modal-body">
              <slot name="modal-body"></slot>
            </div>
            <div class="modal-footer">
              <slot name="modal-footer">
                <button type="button" class="btn btn-default" @click="$emit('close')">关闭</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
  export default {
    name: 'bootModal'
  }
</script>


<style lang="scss" scoped>
  .clobody {
    padding-right: 17px;
    overflow: hidden;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }
</style>
