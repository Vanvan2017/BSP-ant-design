<template>
  <div class="main user-layout-register">
    <h3>
      <span>SignUp</span>
    </h3>
    <a-form ref="formRegister" :form="form" id="formRegister">
      <a-form-item>
        <a-radio-group default-value="2" v-model="roleId" @change="onChangeRoleId">
          <a-radio-button value="2">BVO</a-radio-button>
          <a-radio-button value="3">MVO</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="email"
          v-decorator="['email', {rules: [{ required: true, type: 'email', message: 'Please enter your email address' }], validateTrigger: ['change', 'blur']}]"
        ></a-input>
      </a-form-item>

      <a-popover
        placement="rightTop"
        :trigger="['focus']"
        :getPopupContainer="(trigger) => trigger.parentElement"
        v-model="state.passwordLevelChecked"
      >
        <template slot="content">
          <div :style="{ width: '240px' }">
            <div :class="['user-register', passwordLevelClass]">
              Password Strength：
              <span>{{ passwordLevelName }}</span>
            </div>
            <a-progress
              :percent="state.percent"
              :showInfo="false"
              :strokeColor=" passwordLevelColor "
            />
            <div style="margin-top: 10px;">
              <span>Please enter at least 6 characters. Do not use passwords that are easy to guess.</span>
            </div>
          </div>
        </template>
        <a-form-item>
          <a-input-password
            size="large"
            @click="handlePasswordInputClick"
            placeholder="Passwords with at least 6 characters, case sensitive"
            v-decorator="['password', {rules: [{ required: true, message: 'Passwords with at least 6 characters, case sensitive'}, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"
          ></a-input-password>
        </a-form-item>
      </a-popover>

      <a-form-item>
        <a-input-password
          size="large"
          placeholder="Confirm password"
          v-decorator="['password2', {rules: [{ required: true, message: 'Passwords with at least 6 characters, case sensitive' }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"
        ></a-input-password>
      </a-form-item>

      <a-row :gutter="16">
        <a-col class="gutter-row" :span="16">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="Kaptcha"
              v-decorator="['captcha', {rules: [{ required: true, message: 'Please enter a Kaptcha' }], validateTrigger: 'blur'}]"
            >
              <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <img :src="kaptcha_src" @click="getkaptcha()" />
        </a-col>
      </a-row>

      <a-form-item>
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="register-button"
          :loading="registerBtn"
          @click.stop.prevent="handleSubmit"
          :disabled="registerBtn"
        >SignUp</a-button>
        <router-link class="login" :to="{ name: 'login' }">Log in with an existing account</router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { getSmsCaptcha, signup as signupAPI } from '@/api/login'
import { uuid } from '@/utils/util'

const levelNames = {
  0: '低',
  1: '低',
  2: '中',
  3: '强'
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}
export default {
  name: 'Register',
  components: {},
  mixins: [],
  data () {
    return {
      imageCodeToken: '',
      kaptcha_src: '',
      roleId: '2',
      form: this.$form.createForm(this),

      state: {
        time: 60,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      registerBtn: false
    }
  },
  computed: {
    passwordLevelClass () {
      return levelClass[this.state.passwordLevel]
    },
    passwordLevelName () {
      return levelNames[this.state.passwordLevel]
    },
    passwordLevelColor () {
      return levelColor[this.state.passwordLevel]
    }
  },
  mounted () {
    this.getkaptcha()
  },
  methods: {
    getkaptcha () {
      const imageCodeToken = uuid().split('-')[0]
      this.imageCodeToken = imageCodeToken
      this.kaptcha_src = process.env.VUE_APP_API_BASE_URL + 'system/kaptcha/image-code/' + imageCodeToken
    },

    onChangeRoleId (event) {
      this.roleId = event.target.value
    },

    handlePasswordLevel (rule, value, callback) {
      let level = 0

      // 判断这个字符串中有没有数字
      if (/[0-9]/.test(value)) {
        level++
      }
      // 判断字符串中有没有字母
      if (/[a-zA-Z]/.test(value)) {
        level++
      }
      // 判断字符串中有没有特殊符号
      if (/[^0-9a-zA-Z_]/.test(value)) {
        level++
      }
      this.state.passwordLevel = level
      this.state.percent = level * 30
      if (level >= 2) {
        if (level >= 3) {
          this.state.percent = 100
        }
        callback()
      } else {
        if (level === 0) {
          this.state.percent = 10
        }
        callback(new Error('Weak password'))
      }
    },

    handlePasswordCheck (rule, value, callback) {
      const password = this.form.getFieldValue('password')
      // console.log('value', value)
      if (value === undefined) {
        callback(new Error('Please enter your password.'))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error('The two passwords do not match'))
      }
      callback()
    },

    handlePhoneCheck (rule, value, callback) {
      // console.log('handlePhoneCheck, rule:', rule)
      // console.log('handlePhoneCheck, value', value)
      // console.log('handlePhoneCheck, callback', callback)

      callback()
    },

    handlePasswordInputClick () {
      if (!this.isMobile()) {
        this.state.passwordLevelChecked = true
        return
      }
      this.state.passwordLevelChecked = false
    },

    handleSubmit () {
      const {
        form: { validateFields },
        state,
        $router
      } = this
      validateFields({ force: true }, (err, values) => {
        if (!err) {
          state.passwordLevelChecked = false
          values.roleId = this.roleId
          values.imageCode = values.captcha
          values.imageCodeToken = this.imageCodeToken
          values.username = values.email
          delete values.email
          delete values.captcha
          delete values.password2
          signupAPI(values).then(res => {
            $router.push({ name: 'registerResult', params: { ...values } })
          })
        }
      })
    },

    getCaptcha (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        $message,
        $notification
      } = this

      validateFields(['mobile'], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true

          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)

          const hide = $message.loading('验证码发送中..', 0)

          getSmsCaptcha({ mobile: values.mobile })
            .then(res => {
              setTimeout(hide, 2500)
              $notification['success']({
                message: '提示',
                description: '验证码获取成功，您的验证码为：' + res.result.captcha,
                duration: 8
              })
            })
            .catch(err => {
              setTimeout(hide, 1)
              clearInterval(interval)
              state.time = 60
              state.smsSendBtn = false
              this.requestFailed(err)
            })
        }
      })
    },
    requestFailed (err) {
      this.$notification['error']({
        message: 'Error',
        description: ((err.response || {}).data || {}).message || 'There was an error in the request. Please try again later',
        duration: 4
      })
      this.registerBtn = false
    }
  },
  watch: {
    'state.passwordLevel' (val) {
      // console.log(val)
    }
  }
}
</script>
<style lang="less">
.user-register {
  &.error {
    color: #ff0000;
  }

  &.warning {
    color: #ff7e05;
  }

  &.success {
    color: #52c41a;
  }
}

.user-layout-register {
  .ant-input-group-addon:first-child {
    background-color: #fff;
  }
}
</style>
<style lang="less" scoped>
.user-layout-register {
  & > h3 {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .register-button {
    width: 50%;
  }

  .login {
    float: right;
    line-height: 40px;
  }
}
</style>
