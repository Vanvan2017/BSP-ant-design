<script>/*eslint-disable*/</script>
<template>
  <div>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="商品标题">
                <a-input v-model="queryParam.id" placeholder="标题"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="SKU">
                <a-input v-model="queryParam.status" placeholder="SKU"/>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="商品价格">
                  <a-input-number v-model="queryParam.callNo" style="width: 100%"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="更新日期">
                  <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入更新日期"/>
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
        <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
            <!-- lock | unlock -->
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作 <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        :alert="true"
        :rowSelection="rowSelection"
        showPagination="auto"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="description" slot-scope="text">
          <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a @click="handleSub(record)">删除</a>
          </template>
        </span>
      </s-table>
    </a-card>
  </page-header-wrapper>
  <a-modal v-model="visible" title="Item Information" @ok="handleSubmit" width="700px">
        <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
            <a-form-item label="Title">
              <a-input
                v-decorator="['title', { rules: [{ required: true, message: 'Please input item title!' }] }]"
              />
            </a-form-item>
            
            <a-form-item label="Volumn weight">
            <a-row>
              <a-col :span="6">
                Length:
              </a-col>
              <a-col :span="15">
                <a-input
                  v-decorator="['length', { rules: [{ required: true, message: 'Please input item length!' }] }]"
                />
              </a-col>
              <a-col :span="3" align="right">
                cm
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="6">
                Width:
              </a-col>
              <a-col :span="15">
                <a-input
                  v-decorator="['width', { rules: [{ required: true, message: 'Please input item width!' }] }]"
                />
              </a-col>
              <a-col :span="3" align="right">
                cm
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="6">
                Height:
              </a-col>
              <a-col :span="15">
                <a-input
                  v-decorator="['height', { rules: [{ required: true, message: 'Please input item height!' }] }]"
                />
              </a-col>
              <a-col :span="3" align="right">
                cm
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="6">
                Weight:
              </a-col>
              <a-col :span="15">
                <a-input
                  v-decorator="['weight', { rules: [{ required: true, message: 'Please input item weight!' }] }]"
                />
              </a-col>
              <a-col :span="3" align="right">
                kg
              </a-col>
            </a-row>
            </a-form-item>
            
            <a-form-item label="Sku Code">
              <a-input
                v-decorator="['sku', { rules: [{ required: true, message: 'Please input item Sku code!' }] }]"
              />
            </a-form-item>
            
            <a-form-item label="Upc Code">
              <a-input
                v-decorator="['upc', { rules: [{ required: false}] }]"
              />
            </a-form-item>
            
            <a-form-item label="Ena Code">
              <a-input
                v-decorator="['ena', { rules: [{ required: false}] }]"
              />
            </a-form-item>
            
            <a-form-item label="Item Model">
              <a-input
                v-decorator="['model', { rules: [{ required: true, message: 'Please input item model!' }] }]"
              />
            </a-form-item>
            
            <a-form-item label="Sell Price">
              <a-input-number
                    :default-value="0"
                    :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                    @change="onChange"
                    v-decorator="['price', { rules: [{ required: true, message: 'Please input item price!' }] }]"
                  />
            </a-form-item>
            
            <a-form-item label="Warranty Period">
              <a-input
                v-decorator="['warranty', { rules: [{ required: false }] }]"
              />
            </a-form-item>
            
            <a-form-item label="Ebay Description">
              <a-textarea placeholder="Ebay Description" :rows="4" 
                v-decorator="['EbayDiscription', { rules: [{ required: false }] }]"
              />
            </a-form-item>
            
            <a-form-item label="Amazon Description">
              <a-textarea placeholder="Amazon Description" :rows="4" 
                v-decorator="['AmazonDiscription', { rules: [{ required: false }] }]"
              />
            </a-form-item>
          </a-form>
  </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { getRoleList, getServiceList } from '@/api/manage'

import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateForm'

const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '商品标题',
    dataIndex: 'no'
  },
  {
    title: '商品价格',
    dataIndex: 'callNo',
    sorter: true,
    needTotal: true,
    customRender: (text) => text + ' 元'
  },
  {
    title: '商品库存',
    dataIndex: 'callNo',
    sorter: true,
    needTotal: true,
    customRender: (text) => text + ' 个'
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    sorter: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]

const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '运行中'
  },
  2: {
    status: 'success',
    text: '已上线'
  },
  3: {
    status: 'error',
    text: '异常'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateForm,
    StepByStepModal
  },
  data () {
    this.columns = columns
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      // create model
      visible: false,
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getServiceList(requestParameters)
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  created () {
    getRoleList({ t: new Date() })
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    handleAdd () {
      this.mdl = null
      this.visible = true
    },
    handleEdit (record) {
      this.visible = true
      this.mdl = { ...record }
    },
    handleSubmit(e) {
          e.preventDefault();
          this.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
              this.visible = false
            }
          });
        },
    handleSelectChange(value) {
          console.log(value);
          this.form.setFieldsValue({
            note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
          });
    },
    handleOk () {
      this.visible = false
      // const form = this.$refs.createModal.form
      // this.confirmLoading = true
      // form.validateFields((errors, values) => {
      //   if (!errors) {
      //     console.log('values', values)
      //     if (values.id > 0) {
      //       // 修改 e.g.
      //       new Promise((resolve, reject) => {
      //         setTimeout(() => {
      //           resolve()
      //         }, 1000)
      //       }).then(res => {
      //         this.visible = false
      //         this.confirmLoading = false
      //         // 重置表单数据
      //         form.resetFields()
      //         // 刷新表格
      //         this.$refs.table.refresh()

      //         this.$message.info('修改成功')
      //       })
      //     } else {
      //       // 新增
      //       new Promise((resolve, reject) => {
      //         setTimeout(() => {
      //           resolve()
      //         }, 1000)
      //       }).then(res => {
      //         this.visible = false
      //         this.confirmLoading = false
      //         // 重置表单数据
      //         form.resetFields()
      //         // 刷新表格
      //         this.$refs.table.refresh()

      //         this.$message.info('新增成功')
      //       })
      //     }
      //   } else {
      //     this.confirmLoading = false
      //   }
      // })
    },
    handleCancel () {
      this.visible = false

      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
    },
    handleSub (record) {
      if (record.status !== 0) {
        this.$message.info(`${record.no} 删除成功`)
      } else {
        this.$message.error(`${record.no} 删除失败`)
      }
    },
    onChange(value) {
          console.log('changed', value);
        },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
