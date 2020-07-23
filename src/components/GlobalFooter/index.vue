<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a href="https://www.github.com/" target="_blank">Copyright</a>
      <a href="https://www.github.com/" target="_blank">&copy; 2020</a>
      <a href="https://www.github.com/" target="_blank">Cross-Border E-Commerce BSP</a>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
