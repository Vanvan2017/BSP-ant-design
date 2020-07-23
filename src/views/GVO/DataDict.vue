<script>
/*eslint-disable*/
</script>
<template>
  <div>
    <page-header-wrapper>
      <a-card :bordered="false">
        <div class="table-operator">
          <a-button type="primary" icon="plus" @click="handleAdd">add</a-button>
          <!--        <a-dropdown v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1">
              <a-icon type="delete" />删除
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作
            <a-icon type="down" />
          </a-button>
          </a-dropdown>-->
        </div>

        <s-table
          ref="table"
          size="default"
          :columns="columns"
          :data="loadData"
          :alert="{ show: true, clear: true }"
          :rowSelection="{ selectedRowKeys: this.selectedRowKeys, onChange: this.onSelectChange }"
        >
          <template v-for="(col, index) in columns" :slot="col.dataIndex" slot-scope="text, record">
            <div :key="index">
              <a-input
                v-if="record.editable"
                style="margin: -5px 0"
                :value="text"
                @change="e => handleChange(e.target.value, record.key, col, record)"
              />
              <template v-else>{{ text }}</template>
            </div>
          </template>
          <template slot="action" slot-scope="text, record">
            <div class="editable-row-operations">
              <span v-if="record.editable">
                <a @click="() => save(record)">保存</a>
                <a-divider type="vertical" />
                <a-popconfirm title="真的放弃编辑吗?" @confirm="() => cancel(record)">
                  <a>取消</a>
                </a-popconfirm>
              </span>
              <span v-else>
                <a class="edit" @click="() => edit(record)">edit</a>
                <a-divider type="vertical" />
                <a class="delete" @click="() => del(record)">delete</a>
              </span>
            </div>
          </template>
        </s-table>
      </a-card>
    </page-header-wrapper>
    <a-modal v-model="visible" title="Item Information" @ok="handleSubmit" width="700px">
      <a-form
        :form="form"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 12 }"
        @submit="handleSubmit"
      >
        <a-form-item label="codeType">
          <a-input
            v-decorator="['codeType', { rules: [{ required: true, message: 'please input codeType' }],
					initialValue: form1.codeType}]"
          />
        </a-form-item>
        <a-form-item label="description">
          <a-input
            v-decorator="['description', { rules: [{ required: true, message: 'please input description' }],
					initialValue: form1.description}]"
          />
        </a-form-item>
        <a-form-item label="typeCd">
          <a-input
            v-decorator="['typeCd', { rules: [{ required: true, message: 'please input typeCd' }],
					initialValue: form1.typeCd}]"
          />
        </a-form-item>
        <a-form-item label="codeVal">
          <a-input
            v-decorator="['codeVal', { rules: [{ required: true, message: 'please input codeVal' }],
					initialValue: form1.codeVal}]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { STable } from '@/components'
import {axios as request} from '@/utils/request'
import storage from 'store'

export default {
  name: 'TableList',
  components: {
    STable
  },
  data() {
    return {
      // 表头

      form: this.$form.createForm(this, { name: 'coordinated' }),
      columns: [
        {
          title: 'Id',
          dataIndex: 'cdmId',
          width: '120px'
        },
        {
          title: 'dict type',
          dataIndex: 'codeType',
          width: '120px',
          scopedSlots: { customRender: 'codeType' }
        },
        {
          title: 'description',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: 'type Cd',
          dataIndex: 'typeCd',
          width: '150px',
          scopedSlots: { customRender: 'typeCd' }
          // customRender: (text) => text + ' 次'
        },
        {
          title: 'code Value',
          dataIndex: 'codeVal',
          width: '100px',
          scopedSlots: { customRender: 'codeVal' }
        },
        {
          table: 'action',
          dataIndex: 'action',
          width: '120px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return request
          .post('/system/CodeMasterController/getCdmList', {
            userId: storage.get('userId'),
            rights: 1
          })
          .then(function(response) {
            response.content.forEach(item => {
              item.editable = false
            })
            var result = {
              data: response.content,
              pageNo: parameter.pageNo,
              pageSize: 10
            }
            return result
          })
      },


      visible: false,
      form1: {
        codeType: '',
        codeVal: '',
        description: '',
        remark: '',
        typeCd: ''
      },
      form2: {
        codeType: '',
        codeVal: '',
        description: '',
        remark: '',
        typeCd: ''
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  methods: {
    handleChange(value, key, column, record) {
      console.log(value, key, column)
      record[column.dataIndex] = value
    },
    handleSubmit(e) {
      var _this = this
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          request
            .post('/system/CodeMasterController/saveCdm', {
              CdmCodeMasterDto: values,
              SysUserDto: {
                userId: storage.get('userId')
              }
            })
            .then(function(response) {
				if (response.success) {
					_this.$message.success('save success')
				} else {
					_this.$message.warning('save fail')
				}
				_this.visible = false
            })
        }
      })
    },
    handleAdd() {
      // this.mdl = null
      this.visible = true
    },
    edit(row) {
      row.editable = true
      // row = Object.assign({}, row)
    },
    // eslint-disable-next-line
    del(row) {
      var app = this
      this.$confirm({
        title: 'warning',
        content: `realy delete ${row.cdmId} ?`,
        okText: 'yes',
        okType: 'danger',
        cancelText: 'no',
        onOk() {
          console.log('OK')
          // 在这里调用删除接口
          request
            .post('/system/CodeMasterController/removeCdm', {
              cdmId: row.cdmId
            })
            .then(function(response) {
              app.$refs.table.refresh(true)
            })
          // return new Promise((resolve, reject) => {
          //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          // }).catch(() => console.log('Oops errors!'))
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    },
    save(row) {
      var _this = this
      if (row.codeType === '') {
        this.$message.warning('the codeType can not be null')
        this.$refs.table.refresh(true)
      } else if (row.codeVal === '') {
        this.$message.warning('the codeVal can not be null')
        this.$refs.table.refresh(true)
      } else {
        row.editable = false
        console.log(row)
        request
          .post('/system/CodeMasterController/saveCdm', {
            CdmCodeMasterDto: row,
            SysUserDto: {
              userId: storage.get('userId')
            }
          })
          .then(function(response) {
						if (response.success) {
							_this.$message.success('save success')
							_this.$refs.table.refresh(true)
						}
            
          })
      }
    },
    cancel(row) {
      row.editable = false
      this.$refs.table.refresh(true)
    },

    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    }
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  }
}
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 54px;
}

.fold {
  width: calc(100% - 216px);
  display: inline-block;
}

.operator {
  margin-bottom: 18px;
}

@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
</style>
