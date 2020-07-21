<template>
  <a-result
    :isSuccess="true"
    :content="false"
    :title="username"
    :sub-title="description">

    <template #extra>
      <a-button size="large" type="primary" @click="goHomeHandle">前去登录</a-button>
      <a-button size="large" style="margin-left: 8px" @click="goHomeHandle">返回首页</a-button>
    </template>

  </a-result>
</template>

<script>
export default {
  name: 'RegisterResult',
  data () {
    return {
      description: '您注册的账户已激活，可前往首页进行登录',
      form: {}
    }
  },
  computed: {
    email () {
      const v = this.form && this.form.email || 'xxx'
      return `你的账户：${v} 注册成功`
    },
    username () {
      const v = this.form && this.form.username || 'xxx'
      return `你的账户：${v} 注册成功`
    }
  },
  created () {
    this.form = this.$route.params
  },
  methods: {
    goHomeHandle () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>

</style>
