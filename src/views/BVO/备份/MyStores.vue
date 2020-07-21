<script>/*eslint-disable*/</script>
<template>
  <page-header-wrapper>
    <div class="operate">
      <a-button
        type="dashed"
        style="width: 100%; height: 10vh;"
        icon="plus"
        @click="showAddStore"
      >添加</a-button>
    </div>

    <div>
      <a-modal
        v-model="visible"
        title="Add Store"
        on-ok="handleOk"
        :footer="null"
        width="50vw"
        centered="ture"
      >
        <a-form @submit="handleSubmit" :form="form">
          <a-form-item
            label="商店名称"
            :labelCol="{lg: {span: 7}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          >
            <a-input
              v-decorator="[
                'storeName',
                {rules: [{ required: true, message: '请输入标题' }]}
              ]"
              name="storeName"
              placeholder="给商店起个名字"
            />
          </a-form-item>
          
          <a-form-item
            label="token"
            :labelCol="{lg: {span: 7}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          >
            <a-input
              placeholder="请输入token"
              v-decorator="[
                'token',
                {rules: [{ required: true, message: '请输入token' }]}
              ]"
            />
          </a-form-item>

          <a-form-item
            label="APP ID"
            :labelCol="{lg: {span: 7}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          >
            <a-input
              placeholder="请输入APP ID"
              v-decorator="[
                'APPId',
                {rules: [{ required: true, message: '请输入APP ID' }]}
              ]"
            />
          </a-form-item>

          <a-form-item
            label="Key"
            :labelCol="{lg: {span: 7}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          >
            <a-input
              placeholder="请输入key"
              v-decorator="[
                'key',
                {rules: [{ required: true, message: '请输入key' }]}
              ]"
            />
          </a-form-item>

          <a-form-item
            label="平台类型"
            :labelCol="{lg: {span: 7}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
            :required="true"
          >
            <a-radio-group v-decorator="['plataeformType', { initialValue: 1 }]">
              <a-radio :value="1">Amazon</a-radio>
              <a-radio :value="2">Ebay</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
            <a-button htmlType="submit" type="primary">提交</a-button>
            <a-button style="margin-left: 20px" @click="handleCancel">取消</a-button>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>

    <a-card style="margin-top: 26px">
      <a-list item-layout="horizontal" :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          >
            <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
            <a-avatar
              slot="avatar"
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595077975290&di=0c0c3c7dddff03dc6dfc0b4ab90fed9f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F93%2F97%2F8056f2b41266a15.jpg"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-card>

    <a-card style="margin-top: 26px">
      <a-list item-layout="horizontal" :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          >
            <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
            <a-avatar
              slot="avatar"
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595078190185&di=d6f2eeb333a27a9fc80bbfca94654526&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F65%2F23%2F5bdff71a6c642_610.jpg"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-card>
  </page-header-wrapper>
</template>

<script>
const data = [
  {
    title: 'Amazon Store Title 1'
  },
  {
    title: 'Amazon Store Title 2'
  },
  {
    title: 'Amazon Store Title 3'
  },
  {
    title: 'Amazon Store Title 4'
  }
]
export default {
  name: 'MyStores',
  data() {
    return {
      data,
      form: this.$form.createForm(this),
      visible: false
    }
  },
  methods: {
    showAddStore() {
      this.visible = true
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          //code
          this.form.resetFields()
          this.visible = false
        }
      })
    },
    handleCancel() {
		  this.visible = false
	  }
  }
}
</script>
<style></style>
