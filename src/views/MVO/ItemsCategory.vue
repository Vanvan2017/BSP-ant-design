<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <info title="商品数量" value="50个商品" :bordered="true" />
        </a-col>
        <a-col :sm="8" :xs="24">
          <info title="已上架商品" value="5个商品" :bordered="true" />
        </a-col>
        <a-col :sm="8" :xs="24">
          <info title="已入仓商品" value="20个商品" />
        </a-col>
      </a-row>
    </a-card>

    <a-card style="margin-top: 24px" :bordered="false" title="商品列表">
      <div slot="extra">
        <a-radio-group v-model="status">
          <a-radio-button value="all">全部</a-radio-button>
          <a-radio-button value="processing">Amazon</a-radio-button>
          <a-radio-button value="waiting">Ebay</a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" />
      </div>

      <div class="operate">
        <a-button type="dashed" style="width: 100%" icon="plus" @click="add">添加</a-button>
      </div>

      <a-list
        size="large"
        :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}"
      >
        <a-list-item :key="index" v-for="(item, index) in data">
          <a-list-item-meta :description="item.description">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.avatar" />
            <a slot="title">{{ item.title }}</a>
          </a-list-item-meta>
          <div slot="actions">
            <a @click="edit(item)">编辑</a>
          </div>
          <div slot="actions">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a>入仓</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="sub(item)">删除</a>
                </a-menu-item>
              </a-menu>
              <a>
                更多
                <a-icon type="down" />
              </a>
            </a-dropdown>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <span>品牌</span>
              <p>{{ item.owner }}</p>
            </div>
            <div class="list-content-item">
              <span>创建时间</span>
              <p>{{ item.startAt }}</p>
            </div>
            <div class="list-content-item">
              <a-progress
                :show-info="false"
                :percent="item.progress.value"
                :status="!item.progress.status ? null : item.progress.status"
                style="width: 180px"
              />
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </page-header-wrapper>
</template>

<script>
// 演示如何使用 this.$dialog 封装 modal 组件
import TaskForm from './modules/TaskForm'
import Info from './components/Info'
import axios from 'Axios'

const data = []
data.push({
  title: 'Alipay',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
  description: '支付工具',
  owner: 'Ma Kun',
  startAt: '2018-07-26 22:44',
  progress: {
    value: 100
  }
})
// data.push({
//   title: 'Angular',
//   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
//   description: '前端框架',
//   owner: 'Ma Kun',
//   startAt: '2018-07-26 22:44',
//   progress: {
//     value: 25
//   }
// })
// data.push({
//   title: 'Ant Design',
//   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
//   description: 'UI框架',
//   owner: 'Ma Kun',
//   startAt: '2018-07-26 22:44',
//   progress: {
//     value: 75
//   }
// })
// data.push({
//   title: 'Ant Design Pro',
//   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
//   description: '懒人福利',
//   owner: 'Ma Kun',
//   startAt: '2018-07-26 22:44',
//   progress: {
//     value: 50
//   }
// })
// data.push({
//   title: 'Bootstrap',
//   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
//   description: '啥也不是',
//   owner: 'Ma Kun',
//   startAt: '2018-07-26 22:44',
//   progress: {
//     status: 'exception',
//     value: 100
//   }
// })

export default {
  name: 'StandardList',
  components: {
    TaskForm,
    Info
  },
  data() {
    return {
      data,
      status: 'all'
    }
  },
  mounted() { // 我加的
    this.getData() 
  },
  methods: {
    add() {
      var _this = this
      this.$dialog(
        TaskForm,
        // component props
        {
          record: {},
          on: {
            ok() {
              axios
                .post('http://localhost:9000/system/mvo/productCategory/insert', {
                  title: 'reno',
                  categoryName: 'electronic',
                  createdBy: 'naultilss',
                  uri: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
                  stsCd: 'I'
                })
                .then(function(response) {
                  console.log(response)
                  if (response.data.success == true) {
                    _this.$message.info(`Add Succeed`)
                  } else {
                    _this.$message.error(`Add Failed`)
                  }
                })
                .catch(function(error) {
                  console.log(error)
                })
              console.log('ok 回调')
            },
            cancel() {
              console.log('cancel 回调')
            },
            close() {
              console.log('modal close 回调')
            }
          }
        },
        // modal props
        {
          title: '新增',
          width: 700,
          centered: true,
          maskClosable: false
        }
      )
    },
    edit(record) {
      console.log('record', record)
      var _this = this
      this.$dialog(
        TaskForm,
        // component props
        {
          record,
          on: {
            ok() {
              axios
                .post('http://localhost:9000/system/mvo/productCategory/update', {
                  prcId: '3',
                  categoryName: 'drink',
                  uri: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
                  stsCd: 'A',
                  lastUpdateBy: 'ptryyy'
                })
                .then(function(response) {
                  console.log(response)
                  if (response.data.success == true) {
                    _this.$message.info(`Update Succeed`)
                  } else {
                    _this.$message.error(`Update Failed`)
                  }
                })
                .catch(function(error) {
                  console.log(error)
                })
              console.log('ok 回调')
            },
            cancel() {
              console.log('cancel 回调')
            },
            close() {
              console.log('modal close 回调')
            }
          }
        },
        // modal props
        {
          title: '操作',
          width: 700,
          centered: true,
          maskClosable: false
        }
      )
    },
    sub(record) {
      var _this = this
      axios
        .post('http://localhost:9000/system/mvo/productCategory/delete', {
          prcId: '7',
          lastUpdateBy: 'rain'
        })
        .then(function(response) {
          console.log(response)
          if (response.data.success == true) {
            _this.$message.info(`Delete Succeed`)
          } else {
            _this.$message.error(`Delete Failed`)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getData(){
      axios
        .post('http://localhost:9000/system/mvo/productCategory/list', {
          page: 0,
          size: 10,
          userId: '3'
        })
        .then(function(response) {
          console.log(response)
          //response.data.content.list
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-avatar-lg {
  width: 48px;
  height: 48px;
  line-height: 48px;
}

.list-content-item {
  color: rgba(0, 0, 0, 0.45);
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 100px;
  span {
    line-height: 20px;
  }
  p {
    margin-top: 4px;
    margin-bottom: 0;
    line-height: 22px;
  }
}
</style>
