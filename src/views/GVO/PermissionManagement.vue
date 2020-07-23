<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="roleID">
                <a-input placeholder="PLease Enter..." />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary">Query</a-button>
                <a-button style="margin-left: 8px">Reset</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <a-table :columns="columns" :data-source="loadData" row-key="roleName">
        <span slot="action" slot-scope="text, record">
          <a @click="handleModify(record)">Modify {{ record.roleName }} Permission</a>
        </span>
      </a-table>

      <!--对某个角色的权限操作  -->
      <a-modal title="Modify" style="top: 20px;" :width="800" v-model="visible" @ok="handleOk">
        <a-form class="permission-form">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="id"
            hasFeedback
            validateStatus="success"
          >
            <a-input placeholder="id" disabled="disabled" v-model="modalForm.id" />
          </a-form-item>

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="RoleName"
            hasFeedback
            validateStatus="success"
          >
            <a-input
              placeholder="make a role name"
              disabled="disabled"
              v-model="modalForm.roleName"
            />
          </a-form-item>

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="Description"
            hasFeedback
          >
            <a-textarea
              :rows="5"
              placeholder="..."
              id="description"
              v-model="modalForm.description"
            />
          </a-form-item>

          <a-divider>Has Permissions</a-divider>

          <a-checkbox-group :options="allPermissions" v-model="checkedPermissions"></a-checkbox-group>
        </a-form>
      </a-modal>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import {
  getRoleList as getRoleListAPI,
  updateRole as updateRoleApi,
  updatePermission as updatePermissionApi
} from '@/api/permission'

const columns = [
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: 'roleName',
    dataIndex: 'roleName'
  },
  {
    title: 'description',
    dataIndex: 'description'
  },
  {
    title: 'action',
    width: '150px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'PermissionManagement',
  components: {},
  data () {
    return {
      roleId: null,
      allPermissions: [],
      checkedPermissions: [],
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      modalForm: {},
      // 表头
      columns,
      loadData: []
    }
  },
  mounted () {
    this._getRoleList()
  },
  methods: {
    async _getRoleList () {
      const res = await getRoleListAPI()
      this.loadData = res.content.list
    },
    handleModify (record) {
      this.visible = true
      this.roleId = record.id
      this.modalForm = record
      this.allPermissions = record.permissions.map((item) => {
        return { label: item.menuName, value: item.menuId }
      })
      this.checkedPermissions = record.permissions
        .filter((item) => {
          return item.deleted === 0
        })
        .map((item) => {
          return item.menuId
        })
    },
    async handleOk (e) {
      e.preventDefault()
      const form = Object.assign({}, this.modalForm)
      // const permissions = form.permissions
      delete form.deleted
      delete form.permissions
      // 更新角色
      await updateRoleApi(form)

      // 更新角色权限
      const res = await updatePermissionApi({
        roleId: this.roleId,
        permissions: JSON.stringify(this.checkedPermissions)
      })
      if (res.content === 'success') {
        this.visible = false
        this.$message.success('Success')
        this._getRoleList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.permission-form {
  /deep/ .permission-group {
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>
