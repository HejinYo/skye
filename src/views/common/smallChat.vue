<template>
  <div>
    <div class="small-chat-box fadeInRight animated" :class="{'active':chatState}">

      <div class="heading" draggable="true">
        <small class="chat-date pull-right">
          02.19.2015
        </small>
        Small chat
      </div>

      <div class="content">

        <div class="left">
          <div class="author-name">
            Monica Jackson
            <small class="chat-date">
              10:02 am
            </small>
          </div>
          <div class="chat-message active">
            Lorem Ipsum is simply dummy text input.
          </div>

        </div>
        <div class="right">
          <div class="author-name">
            Mick Smith
            <small class="chat-date">
              11:24 am
            </small>
          </div>
          <div class="chat-message">
            Lorem Ipsum is simpl.
          </div>
        </div>


      </div>
      <div class="form-chat">
        <div class="input-group input-group-sm">
          <input type="text" class="form-control">
          <span class="input-group-btn"> <button
            class="btn btn-primary" type="button">Send
                    </button> </span></div>
      </div>

    </div>
    <div id="small-chat">
      <span class="badge badge-warning pull-right">5</span>
      <a class="open-small-chat" @click.prevent="switchSmallChat">
        <i :class="[chatState ? 'fa fa-remove':'fa fa-comments']"></i>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'smallChat',
    data: function () {
      return {
        chatState: false
      }
    }
  }
</script>
