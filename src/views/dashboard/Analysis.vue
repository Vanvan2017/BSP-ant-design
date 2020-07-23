<template>
  <div>
    <page-header-wrapper>
      <template v-slot:content>
        <div class="page-header-content">
          <div class="avatar">
            <a-avatar size="large" :src="currentUser.avatar" />
          </div>
          <div class="content">
            <div class="content-title">
              {{ timeFix }}{{ user.name }}
              <span class="welcome-text">，{{ welcome }}</span>
            </div>
            <!-- <div>蓝图的总工程师 | cross-boarder事业群 - 马kunkun国际</div> -->
          </div>
        </div>
      </template>

    </page-header-wrapper>
  </div>
</template>

<script>
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'
import storage from 'store'
import { STable, Ellipsis } from '@/components'

export default {
  name: 'Analysis',
  components: {
    STable,
    Ellipsis
  },
  data () {
    return {
      data: [],
      timeFix: timeFix(),
      avatar: '',
      user: {},
      MVOInfo: {},
      dataSource: [],
      loading: false,
      imageUrl: '',
      AddEditVisible: false,
      form: this.$form.createForm(this),
      // form: {
      // 	name: ''
      // },
      form1: {
        brdId: null,
        nameCn: '',
        nameEn: '',
        remark: ''
      }
    }
  },
  computed: {
    ...mapState({
      nickname: state => state.user.nickname,
      welcome: state => state.user.welcome
    }),
    currentUser () {
      return {
        name: storage.get('username'),
        avatar: this.$store.getters.avatar
      }
    },
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  created () {
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar
  },
  methods: {},
  mounted () {}
}
</script>

<style lang="less" scoped>
@import './Workplace.less';
@import '~@/components/index.less';

.card-list {
  /deep/ .ant-card-body:hover {
    .ant-card-meta-title > a {
      color: @primary-color;
    }
  }

  /deep/ .ant-card-meta-title {
    margin-bottom: 12px;

    & > a {
      display: inline-block;
      max-width: 100%;
      color: rgba(0, 0, 0, 0.85);
    }
  }

  /deep/ .meta-content {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 64px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

    margin-bottom: 1em;
  }
}

.card-avatar {
  width: 48px;
  height: 48px;
  border-radius: 48px;
}

.ant-card-actions {
  background: #f7f9fa;

  li {
    float: left;
    text-align: center;
    margin: 12px 0;
    color: rgba(0, 0, 0, 0.45);
    width: 50%;

    &:not(:last-child) {
      border-right: 1px solid #e8e8e8;
    }

    a {
      color: rgba(0, 0, 0, 0.45);
      line-height: 22px;
      display: inline-block;
      width: 100%;

      &:hover {
        color: @primary-color;
      }
    }
  }
}

.new-btn {
  background-color: #fff;
  border-radius: 2px;
  width: 100%;
  height: 188px;
}
</style>
