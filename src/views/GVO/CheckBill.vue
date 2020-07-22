<template>
  <page-header-wrapper>
    <a-card rowKey="tkey">
      <a-table :row-selection="rowSelection" :columns="columns" :data-source="data">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <a slot="action" slot-scope="record" @click="() => confirm(record)">Confirm</a>
      </a-table>
    </a-card>
    <a-modal v-model="visible" title="Confirm Bill" :footer="null" width="50vw">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="Decision"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-radio-group v-decorator="['decision', { initialValue: 1 }]">
            <a-radio :value="1">通过</a-radio>
            <a-radio :value="2">不通过</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          v-show="form.getFieldValue('decision') === 2"
          label="Reason"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-textarea
            rows="4"
            placeholder="请输入你不通过的原因"
            v-decorator="[
              'reason',
              {rules: [{ message: '请输入原因' }]}
            ]"
          />
        </a-form-item>

        <a-row
          class="clearfix"
          style="margin-top: 24px; text-align:center"
          justify="center"
          type="flex"
        >
          <a-col :span="24">
            <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload">
              <a-button>
                <a-icon type="upload" />Select File
              </a-button>
            </a-upload>
            <a-button
              type="primary"
              :disabled="fileList.length === 0"
              :loading="uploading"
              style="margin-top: 16px"
              @click="handleUpload"
            >{{ uploading ? 'Uploading' : 'Start Upload' }}</a-button>
          </a-col>
        </a-row>

        <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center; margin-top: 24px">
          <a-button htmlType="submit" type="primary">提交</a-button>
          <a-button style="margin-left: 20px" @click="handleCancel">取消</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </page-header-wrapper>
</template>
<script>
import request from '../../utils/request'
import { getTransactionAuditList as getTransactionAuditListAPI } from '@/api/transactionAudit'

const columns = [
  {
    title: 'Account Name',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  },
  { title: 'Action', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } }
]
const data = [
  {
    tkey: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    tkey: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    tkey: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    tkey: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park'
  }
]

export default {
  data () {
    return {
      fileList: [],
      uploading: false,
      visible: false,
      data,
      columns,
      form: this.$form.createForm(this)
    }
  },
  mounted () {},
  methods: {
    async _loadData () {
      const res = await getTransactionAuditListAPI()
      console.log(res)
    },
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    beforeUpload (file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    handleUpload () {
      const { fileList } = this
      const formData = new FormData()
      fileList.forEach(file => {
        formData.append('files[]', file)
      })
      this.uploading = true

      // You can use any AJAX library you like
      request({
        url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        method: 'post',
        processData: false,
        data: formData,
        success: () => {
          this.fileList = []
          this.uploading = false
          this.$message.success('upload successfully.')
        },
        error: () => {
          this.uploading = false
          this.$message.error('upload failed.')
        }
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          // 下面写发起请求QAQ
          this.visible = false
        }
      })
    },
    confirm (record) {
      console.log(record)
      this.visible = true
    },
    handleCancel () {
      this.visible = false
    }
  },
  computed: {
    rowSelection () {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
        },
        getCheckboxProps: record => ({
          props: {
            name: record.name
          }
        })
      }
    }
  }
}
</script>
