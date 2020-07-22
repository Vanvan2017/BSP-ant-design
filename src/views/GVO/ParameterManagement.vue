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
			<a-form-item label="paramCd">
				<a-input
					v-decorator="['paramCd', { rules: [{ required: true, message: 'please input paramCd' }],
					initialValue: form1.paramCd}]"
				/>
            </a-form-item>
			<a-form-item label="paramValue">
				<a-input
					v-decorator="['paramValue', { rules: [{ required: true, message: 'please input paramValue' }],
					initialValue: form1.paramValue}]"
				/>
			</a-form-item>
			<a-form-item label="description">
				<a-input
					v-decorator="['typeCd', { rules: [{ required: true, message: 'please input description' }],
					initialValue: form1.description}]"
				/>
			</a-form-item>
		</a-form>
	</a-modal>
	</div>
</template>

<script>
import { STable } from '@/components'
import {axios as request} from '@/utils/request'

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
          dataIndex: 'parId',
          width: '70px'
        },
        {
          title: '参数主键',
          dataIndex: 'paramCd',
          width: '90px',
          scopedSlots: { customRender: 'paramCd' }
        },
        {
          title: '参数值',
          dataIndex: 'paramValue',
          width: '90px',
          scopedSlots: { customRender: 'paramValue' }
        },
        {
          title: '参数说明',
          dataIndex: 'description',
          width: '200px',
          scopedSlots: { customRender: 'description' }
          // customRender: (text) => text + ' 次'
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
        return 	request.post('/system/parameterController/getParameterList',
				{
					'userId':	storage.get('userId'),
					'rights':	1
				}).then(function (response) {
					response.content.forEach(item => {
						item.editable = false
					})
					var result = {
						'data': response.content,
						'pageNo': parameter.pageNo,
						'pageSize': 10
					}
					return result
				})
      },
		visible: false,
		form1: {
			'description': 'string',
			'paramCd': 'string',
			'paramValue': 'string'
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
				request.post('/system/parameterController/saveParameter',
				{
					'ParParameterDto': {
						'description': values.description,
						'paramCd': values.paramCd,
						'paramValue': values.paramValue,
						'remark': values.remark
					},
					'SysUserDto': {
						'userId':	storage.get('userId')
					}
				}).then(function (response) {
					_this.visible = false
					_this.$refs.table.refresh(true)
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
		var _this = this
      this.$confirm({
        title: '警告',
        content: `真的要删除 ${row.parId} 吗?`,
        okText: 'yes',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          console.log('OK')
          // 在这里调用删除接口
			request.post('/system/parameterController/removeParameter',
			{
				'parId': row.parId
			}).then(function (response) {
				_this.$refs.table.refresh(true)
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
      row.editable = false
	  console.log(row)
		if(row.paramCd === ''){
			this.$message.warning('the paramCd can not be null')
			this.$refs.table.refresh(true)
		} else if (row.paramValue === ''){
			this.$message.warning('the paramValue can not be null')
			this.$refs.table.refresh(true)
		} else {
			request.post('/system/parameterController/saveParameter',
			{
		  	'ParParameterDto': row,
		  	'SysUserDto': {
		  		'userId':	storage.get('userId')
		  	}
		  }).then(function (response) {
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
