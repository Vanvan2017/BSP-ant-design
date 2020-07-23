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
      <!-- <template v-slot:extraContent>
        <div class="extra-content">
          <div class="stat-item">
            <a-statistic title="商品数" :value="56" />
          </div>
          <div class="stat-item">
            <a-statistic title="订单数" :value="8" suffix="/ 24" />
          </div>
          <div class="stat-item">
            <a-statistic title="访问量" :value="2223" />
          </div>
        </div>
      </template> -->
      <div style="margin-bottom: 24px">
        <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
          <a-table :columns="columns" :data-source="data" :pagination="false">
            <a slot="action" @click="toMVOInfo">编辑</a>
            <p
              slot="expandedRowRender"
              slot-scope="record"
              style="margin: 0"
            >{{ record.description }}</p>
          </a-table>
        </a-card>
      </div>

      <div style="margin-top: 24px">
        <a-list
          rowKey="id"
          :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}"
          :dataSource="dataSource"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <template v-if="!item || item.brdId === undefined">
              <a-button class="new-btn" type="dashed" @click="AddEditVisible=true">
                <a-icon type="plus" />新增品牌
              </a-button>
            </template>
            <template v-else>
              <a-card :hoverable="true">
                <a-card-meta>
                  <a slot="title">{{ item.nameEn }}</a>
                  <!-- <a-avatar class="card-avatar" slot="avatar" :src="item.avatar" size="large" /> -->
                  <div class="meta-content" slot="description">{{ item.nameCn }}</div>
                  <div class="meta-content" slot="description">{{ item.remark }}</div>
                </a-card-meta>
                <template class="ant-card-actions" slot="actions">
                  <a @click="saveBrand(item)">编辑</a>
                  <a @ @click="removeBrand(item)">删除</a>
                </template>
              </a-card>
            </template>
          </a-list-item>
        </a-list>
      </div>
    </page-header-wrapper>
    <a-modal v-model="AddEditVisible" title="Brand Information" @ok="handleOk">
      <a-form :form="form">
        <a-form-item
          label="id"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            v-decorator="[
              'brdId',
              {rules: [{ required: false, message: 'input brand name(En)' }],
               initialValue: form1.brdId}
            ]"
            disabled="true"
            name="brdId"
            placeholder="input brand name(En)"
          />
        </a-form-item>
        <a-form-item
          label="brandName(Cn)"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            v-decorator="[
              'nameCn',
              {rules: [{ required: true, message: 'input brand name(Cn)' }],
               initialValue: form1.nameCn}
            ]"
            name="nameCn"
            placeholder="input brand name(Cn)"
          />
        </a-form-item>
        <a-form-item
          label="brandName(En)"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            v-decorator="[
              'nameEn',
              {rules: [{ required: true, message: 'input brand name(En)' }],
               initialValue: form1.nameEn}
            ]"
            name="nameEn"
            placeholder="input brand name(En)"
          />
        </a-form-item>
        <a-form-item
          label="description"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            placeholder="input description"
            v-decorator="[
              'remark',
              {rules: [{ required: false, message: 'input description' }],
               initialValue: form1.remark}
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'
import { axios as request } from '@/utils/request'
import storage from 'store'
import { getRoleList, getServiceList } from '@/api/manage'
// const DataSet = require('@antv/data-set')
import { STable, Ellipsis } from '@/components'

const columns = [
  {
    title: '公司名称（中文）',
    dataIndex: 'name_cn',
    key: 'name_cn'
  },
  {
    title: '公司名称（英文）',
    dataIndex: 'name_en',
    key: 'name_en'
  },
  {
    title: '品牌商认证类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '证书地址',
    dataIndex: 'certificate',
    key: 'certificate'
  },

  {
    title: '操作',
    dataIndex: '',
    width: '150px',
    key: 'x',
    scopedSlots: {
      customRender: 'action'
    }
  }
]

export default {
  name: 'Workplace',
  components: {
    STable,
    Ellipsis
  },
  data () {
    return {
      data: [],
      columns,
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

    getRoleList().then(res => {
      // console.log('workplace -> call getRoleList()', res)
    })

    getServiceList().then(res => {
      // console.log('workplace -> call getServiceList()', res)
    })
  },
  methods: {
    toMVOInfo () {
      this.$router.push('/mvo/mvo-info')
    },
    handleOk (e) {
      e.preventDefault()
      var app = this
      // var flag = false
      this.form.validateFields((err, values) => {
        if (!err) {
          // flag = true
          console.log('Received values of form: ', values)
          app.form1 = values
          this.addBrand(values)
          this.form.resetFields()
          this.AddEditVisible = false
          // window.location.reload()
        }
      })
      // console.log(e)
    },
    getMVOInfo () {
      var app = this
		console.log('weqw')
      request
        .post('/system/CompanyInformationController/getCompanyInfo', {
          manBuyerId: 0,
          userId: storage.get('userId'),
          username: storage.get('username')
        })
        .then(function (response) {
          console.log('sdsd')
          console.log(response)
          var data = response.content
          if (response.success) {
			if (data) {
				var type = ''
				if (data.gmcReportType === '1') {
					type = 'TUV'
				} else {
					type = 'UL'
				}
				app.data.push({
					manId: data.manId,
					name_cn: data.nameCn,
					name_en: data.nameEn,
					type: type,
					certificate: data.gmcReportUrl,
					description: data.description
				})
				app.MVOInfo = data
				app.getBrandList()
			}
          }	else {
				app.toMVOInfo()
			}
        })
    },
    addBrand (values) {
      var app = this
      var brandDto = {
        manId: this.MVOInfo.manId,
        brdId: values.brdId,
        nameCn: values.nameCn,
        nameEn: values.nameEn,
        remark: values.remark
      }
      console.log(values)
      console.log(brandDto.brdId)
      request
        .post('/system/BrdBrandController/saveBrand', {
          UserId: storage.get('userId'),
          BrdBrandDto: brandDto
        })
        .then(function (response) {
          console.log(response)
          if (response.success) {
            app.$message.info('add success', 5)
            window.location.reload()
          } else {
            app.$message.info('add fail', 5)
          }
        })
    },
    saveBrand (item) {
      this.form1 = item
      console.log(this.form1)
      this.AddEditVisible = true
      // var brandDto = {
      // 	manId: item.manId,
      // 	brdId: item.brdId,
      // 	nameCn: item.nameCn,
      // 	nameEn: item.nameEn,
      // 	remark: item.remark
      // }
      // var brandDto = {
      // 	brdId: 2,
      // 	manId: this.MVOInfo.manId,
      // 	nameCn: '淘宝21',
      // 	nameEn: 'TaoBao',
      // 	remark: 'ohhhh'
      // }
      // request.post('/system/BrdBrandController/saveBrand', {
      // 	UserId: storage.get('userId'),
      // 	BrdBrandDto: brandDto
      // }).then(function (response) {
      // 	console.log(response)
      // })
      // console.log(item)
    },
    removeBrand (item) {
      var app = this
      console.log('removeBrand')
      var brandDto = {
        manId: item.manId,
        brdId: item.brdId,
        nameCn: item.nameCn,
        nameEn: item.nameEn,
        remark: item.remark
      }
      request
        .post('/system/BrdBrandController/removeBrand', {
          UserId: storage.get('userId'),
          BrdBrandDto: brandDto
        })
        .then(function (response) {
          console.log(response)
          if (response.success) {
            app.$message.info('delete success', 5)
            window.location.reload()
          } else {
            app.$message.info('delete fail', 5)
          }
          // window.location.reload()
        })
    },
    getBrandList () {
      this.dataSource.push({})
      var app = this
      console.log('1232')
      console.log(this.MVOInfo)
      // console.log(this.data instanceof Array)
      request.post('/system/BrdBrandController/getBrandsList', this.MVOInfo).then(function (response) {
        console.log(response)
        response.content.forEach(item => {
          console.log(item)
          app.dataSource.push(item)
        })
      })
    }
  },
  mounted () {
    this.getMVOInfo()
    // this.getBrandList()
  }
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
