<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" tab="Account Password Login">
          <a-alert
            v-if="isLoginError"
            type="error"
            showIcon
            style="margin-bottom: 24px;"
            message="username or password wrong"
          />
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="Username: admin"
              v-decorator="[
                'username',
                {rules: [{ required: true, message: 'Please enter your account name or email address' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input-password
              size="large"
              placeholder="Password: admin "
              v-decorator="[
                'password',
                {rules: [{ required: true, message: 'Please enter your password.' }], validateTrigger: 'blur'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input-password>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input
                  size="large"
                  type="text"
                  placeholder="Kaptcha"
                  v-decorator="['kaptcha', {rules: [{ required: true, message: 'Please enter a Kaptcha' }], validateTrigger: 'blur'}]"
                >
                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input>
              </a-form-item>
            </a-col>

            <a-col class="gutter-row" :span="8">
              <img :src="kaptcha_src" @click="getkaptcha()" />
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="tab2" tab="Phone number login">
          <a-form-item>
            <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }" />This service has not been activated yet
          </a-form-item>
        </a-tab-pane>
      </a-tabs>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >Login</a-button>
      </a-form-item>

      <div class="user-login-other">
        <router-link class="register" :to="{ name: 'register' }">Sign up for an account</router-link>
      </div>
    </a-form>
  </div>
</template>

<script>
// import md5 from 'md5'
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'
import { timeFix, uuid } from '@/utils/util'

export default {
  components: {
    TwoStepCaptcha
  },
  data () {
    return {
      imageCodeToken: '',
      kaptcha_src: '',
      customActiveKey: 'tab1',
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      }
    }
  },
  created () {
  },
  mounted () {
    this.getkaptcha()
  },
  methods: {
    ...mapActions(['Login', 'Logout']),

    getkaptcha () {
      const imageCodeToken = uuid().split('-')[0]
      this.imageCodeToken = imageCodeToken
      this.kaptcha_src = process.env.VUE_APP_API_BASE_URL + 'system/kaptcha/image-code/' + imageCodeToken
    },

    // handler
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    handleTabClick (key) {
      this.customActiveKey = key
      // this.form.resetFields()
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this

      state.loginBtn = true

      const validateFieldsKey = customActiveKey === 'tab1' ? ['username', 'password', 'kaptcha'] : ['mobile', 'kaptcha']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const loginParams = { ...values }
          delete loginParams.username
          loginParams[!state.loginType ? 'email' : 'username'] = values.username
          // loginParams.password = md5(values.password)
          loginParams.imageCode = loginParams.kaptcha
          loginParams.imageCodeToken = this.imageCodeToken
          delete loginParams.kaptcha
          loginParams.username = loginParams.email ? loginParams.email : loginParams.username
          console.log('login form', loginParams)
          Login(loginParams)
            .then(res => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    loginSuccess (res) {
      // check res.homePage define, set $router.push name res.homePage
      // Why not enter onComplete
      this.$router.push({ name: 'Workplace' }, () => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      })
      this.isLoginError = false
    },
    requestFailed (err) {
      this.isLoginError = true
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
