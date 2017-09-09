<template>
  <div id="login">
    <div class="login">
      <form id="form" action="" method="post" class="container loginform">
        <div id="owl-login" :class="{ 'password':nosee}">
          <div id="hand" class="hand"></div>
          <div class="hand hand-r"></div>
          <div class="arms">
            <div class="arm"></div>
            <div class="arm arm-r"></div>
          </div>
        </div>
        <div class="pad">
          <div class="input-group m-b">
            <span class="input-group-btn">
              <button type="button" class="btn btn-info"><i class="fa fa-user"></i></button>
            </span>
            <input v-model="account.username" class="form-control" tabindex="1" placeholder="用户名" required="">
          </div>
          <div class="input-group m-b">
            <span class="input-group-btn">
              <button type="button" class="btn btn-info"><i class="fa fa-lock"></i></button>
            </span>
            <input type="password" @focus="nosee = true" @blur="nosee = false" tabindex="2" id="password" v-model="account.userpwd" class="form-control" placeholder="密码" required="">
          </div>
          <div>
            <div class="checkbox clip-check check-success">
              <input type="hidden" id="rememberMe" name="rememberMe" value="false">
              <input type="checkbox" id="remember" value="false">
              <label for="remember">
                保持登录状态
              </label>
              <a class="forget" href="#">
                <small>忘记密码?</small>
              </a>
            </div>
          </div>
        </div>
        <div class="form-actions">
          <a href="#" class="btn pull-left btn-left btn-link text-muted">还没有账户? 注册</a>
          <button type="button" class="btn btn-info" @click.prevent="doLogin">登录</button>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        nosee: false,
        account: {
          username: 'admin',
          userpwd: '123456'
        }
      };
    },
    mounted: function () {
      this.$nextTick(function () {

      })
    },
    methods: {
      doLogin() {
        this.$http.post('/api/login', this.account)
          .then(response => {
            let {code, message, result} = response.data;
            if (code === 1) {
              this.$store.commit('login', result);
              this.$router.replace({
                path: decodeURIComponent(this.$route.query.redirect || '/manage')
              })
            } else {
              this.$message.info({
                message: message
              });
            }
          })
      }
    }
  }

</script>

<style scoped>

  body {
    background-color: #f3f3f4;
    height: auto;
  }

  .forget {
    float: right;
  }

  .clip-check {
    margin-bottom: 10px;
    margin-top: 10px;
    padding-left: 0;
  }

  .clip-check label {
    cursor: pointer;
    display: inline-block;
    font-size: 13px;
    margin-right: 15px;
    padding-left: 30px !important;
    position: relative;
    line-height: 23px;
    transition: border 0.2s linear 0s, color 0.2s linear 0s;
    white-space: nowrap;
  }

  .clip-check label:before {
    background-color: #ffffff;
    border: 1px solid #c8c7cc;
    content: "";
    display: inline-block;
    height: 20px;
    left: 0;
    margin-right: 10px;
    position: absolute;
    width: 20px;
    border-radius: 0;
    top: 1px;
    transition: border 0.2s linear 0s, color 0.2s linear 0s;
  }

  .clip-check label:after {
    display: inline-block;
    font-size: 11px;
    height: 19px;
    left: 4px;
    position: absolute;
    top: -1px;
    transition: border 0.2s linear 0s, color 0.2s linear 0s;
    width: 19px;
  }

  .clip-check input[type="checkbox"] {
    display: none;
  }

  .clip-check input[type="checkbox"]:checked + label:before {
    border-width: 10px;
  }

  .clip-check input[type="checkbox"]:checked + label:after {
    color: #fff;
    content: "\f00c";
    font-family: "FontAwesome", serif;
  }

  .clip-check input[type="checkbox"][disabled] + label {
    opacity: 0.65;
  }

  .clip-check input[type="checkbox"][disabled] + label:before {
    background-color: #F8F8F8;
  }

  .clip-check.check-success input[type="checkbox"]:checked + label:before {
    border-color: #23c6c8;
  }

  #login {
    background-color: #eee;
  }

  #login header {
    position: relative;
  }

  #login .loginform {
    margin-top: 0;
    top: 100px;
    position: relative;
    border: 1px solid #ddd;
    background-color: #fff;
    max-width: 350px; /*登录框宽度*/
    padding: 0;
  }

  #login .loginform .pad {
    overflow: hidden;
    padding: 30px 30px 10px 30px;
  }

  #login .loginform .form-actions {
    border-top: 1px solid #e4e4e4;
    background-color: #f7f7f7;
    padding: 10px 30px;
    text-align: right;
  }

  .login {
    padding-top: 10%;
  }

  #login #owl-login {
    width: 211px;
    height: 108px;
    background-image: url("../assets/img/login/owl-login.png");
    position: absolute;
    top: -100px;
    left: 50%;
    margin-left: -111px;
  }

  @media all and (-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 1.5/1), (min-device-pixel-ratio: 1.5), (min-resolution: 138dpi), (min-resolution: 1.5dppx) {
    #login #owl-login {
      background-image: url("../assets/img/login/owl-login@2x.png");
      -webkit-background-size: 211px 108px;
      -moz-background-size: 211px 108px;
      background-size: 211px 108px;
    }
  }

  #login #owl-login .hand {
    width: 34px;
    height: 34px;
    -webkit-border-radius: 40px;
    border-radius: 40px;
    background-color: #472d20;
    -webkit-transform: scaleY(0.6);
    -moz-transform: scaleY(0.6);
    -o-transform: scaleY(0.6);
    -ms-transform: scaleY(0.6);
    transform: scaleY(0.6);
    -webkit-transition: 0.3s ease-out;
    -moz-transition: 0.3s ease-out;
    -o-transition: 0.3s ease-out;
    -ms-transition: 0.3s ease-out;
    transition: 0.3s ease-out;
    position: absolute;
    left: 14px;
    bottom: -8px;
  }

  #login #owl-login .hand.hand-r {
    left: 170px;
  }

  #login #owl-login.password .hand {
    -webkit-transform: translateX(42px) translateY(-15px) scale(0.7);
    -moz-transform: translateX(42px) translateY(-15px) scale(0.7);
    -o-transform: translateX(42px) translateY(-15px) scale(0.7);
    -ms-transform: translateX(42px) translateY(-15px) scale(0.7);
    transform: translateX(42px) translateY(-15px) scale(0.7);
  }

  #login #owl-login.password .hand.hand-r {
    -webkit-transform: translateX(-42px) translateY(-15px) scale(0.7);
    -moz-transform: translateX(-42px) translateY(-15px) scale(0.7);
    -o-transform: translateX(-42px) translateY(-15px) scale(0.7);
    -ms-transform: translateX(-42px) translateY(-15px) scale(0.7);
    transform: translateX(-42px) translateY(-15px) scale(0.7);
  }

  #login #owl-login .arms {
    top: 58px;
    position: absolute;
    width: 100%;
    height: 41px;
    overflow: hidden;
  }

  #login #owl-login .arms .arm {
    width: 40px;
    height: 65px;
    position: absolute;
    left: 20px;
    top: 40px;
    background-image: url("../assets/img/login/owl-login-arm.png");
    -webkit-transition: 0.3s ease-out;
    -moz-transition: 0.3s ease-out;
    -o-transition: 0.3s ease-out;
    -ms-transition: 0.3s ease-out;
    transition: 0.3s ease-out;
    -webkit-transform: rotate(-20deg);
    -moz-transform: rotate(-20deg);
    -o-transform: rotate(-20deg);
    -ms-transform: rotate(-20deg);
    transform: rotate(-20deg);
  }

  @media all and (-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 1.5/1), (min-device-pixel-ratio: 1.5), (min-resolution: 138dpi), (min-resolution: 1.5dppx) {
    #login #owl-login .arms .arm {
      background-image: url("../assets/img/login/owl-login-arm@2x.png");
      -webkit-background-size: 40px 65px;
      -moz-background-size: 40px 65px;
      background-size: 40px 65px;
    }
  }

  #login #owl-login .arms .arm.arm-r {
    -webkit-transform: rotate(20deg) scaleX(-1);
    -moz-transform: rotate(20deg) scaleX(-1);
    -o-transform: rotate(20deg) scaleX(-1);
    -ms-transform: rotate(20deg) scaleX(-1);
    transform: rotate(20deg) scaleX(-1);
    left: 158px;
  }

  #login #owl-login.password .arms .arm {
    -webkit-transform: translateY(-40px) translateX(40px);
    -moz-transform: translateY(-40px) translateX(40px);
    -o-transform: translateY(-40px) translateX(40px);
    -ms-transform: translateY(-40px) translateX(40px);
    transform: translateY(-40px) translateX(40px);
  }

  #login #owl-login.password .arms .arm.arm-r {
    -webkit-transform: translateY(-40px) translateX(-40px) scaleX(-1);
    -moz-transform: translateY(-40px) translateX(-40px) scaleX(-1);
    -o-transform: translateY(-40px) translateX(-40px) scaleX(-1);
    -ms-transform: translateY(-40px) translateX(-40px) scaleX(-1);
    transform: translateY(-40px) translateX(-40px) scaleX(-1);
  }

</style>
