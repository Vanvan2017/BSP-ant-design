<script>/*eslint-disable*/</script>
<template>
	<div>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
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
        </a-dropdown> -->
      </div>

      <s-table
        ref="table"
        size="default"
        :columns="columns"
        :data="loadData"
        :alert="{ show: true, clear: true }"
        :rowSelection="{ selectedRowKeys: this.selectedRowKeys, onChange: this.onSelectChange }"
      >
        <template
          v-for="(col, index) in columns"
          :slot="col.dataIndex"
          slot-scope="text, record"
        >
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
              <a class="edit" @click="() => edit(record)">修改</a>
              <a-divider type="vertical" />
              <a class="delete" @click="() => del(record)">删除</a>
            </span>
          </div>
        </template>
      </s-table>
    </a-card>
	</page-header-wrapper>
	<a-modal v-model="visible" title="Item Information" @ok="handleSubmit" width="700px">
		<a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
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
			<a-form-item label="codeType">
				<a-input
					v-decorator="['typeCd', { rules: [{ required: true, message: 'please input typeCd' }],
					initialValue: form1.typeCd}]"
				/>
			</a-form-item>
			<a-form-item label="codeType">
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
import axios from 'axios'

const request = axios.create({ // eslint-disable-line no-unused-vars
  // API 请求的默认前缀
  baseURL: 'http://localhost:9000/system/',
  timeout: 6000 // 请求超时时间
})
export default {
  name: 'TableList',
  components: {
    STable
  },
  data () {
    return {
      // 表头
	  
	  form: this.$form.createForm(this, { name: 'coordinated' }),
      columns: [
        {
          title: '编号',
          dataIndex: 'cdmId',
          width: '120px'
        },
        {
          title: '字典类型',
          dataIndex: 'codeType',
          width: '120px',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '用途描述',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '编码',
          dataIndex: 'typeCd',
          width: '150px',
          scopedSlots: { customRender: 'callNo' }
          // customRender: (text) => text + ' 次'
        },
        {
          title: '编码值',
          dataIndex: 'codeVal',
          width: '100px',
          scopedSlots: { customRender: 'status' }
        },
        {
          table: '操作',
          dataIndex: 'action',
          width: '120px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
		const requestParameters = Object.assign({}, parameter, this.queryParam)
		console.log('loadData request parameters:', requestParameters)
        return 	request.post('CodeMasterController/getCdmList',
			{
				'userId':	3,
				'rights':	1
			}).then(function (response) {
				console.log('sdsd')
				console.log(response)
				response.data.content.forEach(item => {
					item.editable = false
				})
				var result = {
					'data': response.data.content,
					'pageNo': parameter.pageNo,
					'pageSize': 10
				}
				return result
			})
      },
		visible: false,
		form1: {
			'codeType': 'string',
			'codeVal': 'string',
			'description': 'testCase',
			'remark': 'string',
			'typeCd': 'string'
		},
		form2: {
			'codeType': 'string',
			'codeVal': 'string',
			'description': 'testCase',
			'remark': 'string',
			'typeCd': 'string'
		},
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  methods: {
    handleChange (value, key, column, record) {
      console.log(value, key, column)
      record[column.dataIndex] = value
    },
	handleSubmit(e) {
			var _this = this
			e.preventDefault()
			this.form.validateFields((err, values) => {
				if (!err) {
				console.log('Received values of form: ', values);
				request.post('CodeMasterController/saveCdm',
				{
					'CdmCodeMasterDto': values,
					'SysUserDto': {
						'userId':	3
					}
				}).then(function (response) {
					console.log('sdsd')
					console.log(response)
					_this.visible = false
				})
				}
			})
	},
	handleAdd () {
		// this.mdl = null
		this.visible = true
	},
    edit (row) {
      row.editable = true
      // row = Object.assign({}, row)
    },
    // eslint-disable-next-line
    del(row) {
			var app = this
      this.$confirm({
        title: '警告',
        content: `真的要删除 ${row.cdmId} 吗?`,
        okText: 'yes',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          console.log('OK')
          // 在这里调用删除接口
		  request.post('CodeMasterController/removeCdm',
		  {
		  	'cdmId': row.cdmId
		  }).then(function (response) {
		  	console.log('sdsd')
		  	console.log(response)
				app.$refs.table.refresh(true)
		  })
          // return new Promise((resolve, reject) => {
          //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          // }).catch(() => console.log('Oops errors!'))
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },
    save (row) {
		var _this = this
		if(row.codeType === ''){
			this.$message.warning('the codeType can not be null')
			this.$refs.table.refresh(true)
		} else if(row.codeVal === ''){
			this.$message.warning('the codeVal can not be null')
			this.$refs.table.refresh(true)
		}else{
			row.editable = false
			console.log(row)
			request.post('CodeMasterController/saveCdm',
			{
				'CdmCodeMasterDto': row,
				'SysUserDto': {
					'userId':	3
				}
			}).then(function (response) {
				console.log('sdsd')
				console.log(response)
				_this.$refs.table.refresh(true)
			})
		}

	},
    cancel (row) {
		row.editable = false
		this.$refs.table.refresh(true)
    },

    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
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
