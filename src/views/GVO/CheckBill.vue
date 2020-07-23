<template>
  <page-header-wrapper>
    <a-card rowKey="tkey">
      <a-table :row-selection="rowSelection" :columns="columns" :data-source="data">
        <a-tag
          slot="operateType"
          :color="text===1? 'green':text===2?'blue':'pink'"
          slot-scope="text"
        >{{ text===1? "Application":text===2?"Withdraw":"Refund" }}</a-tag>
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
            <a-radio :value="1">Approve</a-radio>
            <a-radio :value="2">Reject</a-radio>
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
            placeholder="Please enter the reason you failed"
            v-decorator="[
              'reason',
              {rules: [{ message: 'Please enter the reason' }]}
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
          <a-button htmlType="submit" type="primary">Submit</a-button>
          <a-button style="margin-left: 20px" @click="handleCancel">Cancel</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </page-header-wrapper>
</template>
<script>
import request from '../../utils/request'
import {
  getTransactionAuditList as getTransactionAuditListAPI,
  passTransactionAudit as passTransactionAuditAPI,
  failTransactionAudit as failTransactionAuditAPI
} from '@/api/transactionAudit'

const columns = [
  {
    title: 'transactionAuditId',
    dataIndex: 'transactionAuditId',
    scopedSlots: { customRender: 'transactionAuditId' }
  },
  {
    title: 'transactionId',
    dataIndex: 'transactionId'
  },
  {
    title: 'buyerId',
    dataIndex: 'buyerId'
  },
  {
    title: 'createBy',
    dataIndex: 'createBy'
  },
  {
    title: 'operateType',
    dataIndex: 'operateType',
    scopedSlots: { customRender: 'operateType' }
  },
  {
    title: 'depositingMoneyBefore',
    dataIndex: 'depositingMoneyBefore'
  },
  {
    title: 'withdrawingMoneyBefore',
    dataIndex: 'withdrawingMoneyBefore'
  },
  { title: 'Action', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } }
]

export default {
  data () {
    return {
      transactionId: null,
      transactionAuditId: null,
      buyerId: null,
      fileList: [],
      uploading: false,
      visible: false,
      data: [],
      columns,
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    this._loadData()
  },
  methods: {
    async _loadData () {
      const res = await getTransactionAuditListAPI()
      this.data = res.content.list
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
      fileList.forEach((file) => {
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
    async handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const parameter = values
          parameter.buyerId = this.buyerId
          parameter.transactionAuditId = this.transactionAuditId
          parameter.transactionId = this.transactionId
          if (parameter.decision === 1) {
            // 通过
            const res = await passTransactionAuditAPI(parameter)
            if (res.content === 'success') {
              this.$message.success('Pass success')
            } else {
              this.$message.error('Pass failed')
            }
          } else {
            // 拒绝
            const res = await failTransactionAuditAPI(parameter)
            if (res.content === 'success') {
              this.$message.error('Reject failed')
            }
          }
          this.visible = false
          this._loadData()
        }
      })
    },
    confirm (record) {
      const { buyerId, transactionAuditId, transactionId } = record
      this.buyerId = buyerId
      this.transactionAuditId = transactionAuditId
      this.transactionId = transactionId
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
        getCheckboxProps: (record) => ({
          props: {
            name: record.name
          }
        })
      }
    }
  }
}
</script>
