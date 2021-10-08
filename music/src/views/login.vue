<template>
  <div class="gcs-login">
    <div class="gcs-login-panel">
      <div class="login-title">
        <h2>用户登陆</h2>
      </div>

      <div class="gcs-login-container">
        <input
          type="text"
          class="input"
          placeholder="请输入用户名"
          v-model="phone"
        />
      </div>

      <div class="gcs-login-container">
        <input
          type="password"
          class="input"
          placeholder="请输入密码"
          v-model="password"
        />
      </div>

      <div class="gcs-login-container">
        <input
          type="button"
          value="立即登录"
          class="btn-login"
          @click="login"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      phone: null,
      password: null,
    };
  },
  methods: {
    login() {
      this.axios(
        `http://apis.netstart.cn/music/login/cellphone?phone=${this.phone}&password=${this.password}`
      ).then((data) => {
        // console.log(data.data);
        localStorage.setItem("token", data.data.cookie);
        localStorage.setItem("id", data.data.account.id);
        this.$router.push("/");
      });
    },
  },
};
</script>

<style lang="less">
.gcs-login {
  position: absolute;
  right: 0px;
  box-sizing: border-box;
  width: 470px;
  height: 100%;
  background-color: skyblue;
  z-index: 100;
  .gcs-login-panel{
    height: 360px;
    position:absolute;
    margin:auto;
    left: 0;
    right: 0;
    top:0;
    bottom: 0;
    .login-title {
      text-align: center;
      color: #fff;
      h2 {
  l      letter-spacing: 10px;
         font-size: 20px;
      }
    }
  }

  .gcs-login-container {
  width: 100%;
  box-sizing: border-box;
  width: 100%;
  margin: 20px 0 0;
  text-align: center;
    .input {
    border: 1px solid white;
    display: inline-block;
    box-sizing: border-box;
    width: 80%;
    height: 46px;
    padding-left: 10px;
    margin: 0 auto;
    font-size: 14px;
    outline: none;
    color:  #76838f;
    }
  
    .input:focus {
    outline: none;
    border: 1px solid #62a8ea;
    }

    .btn-login {
    background-color: #62a8ea;
    border: none;
    width: 80%;
    height: 45px;
    line-height: 45px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    }

    .btn-login:hover{
     opacity: 0.9;
    }
  }
}

</style>