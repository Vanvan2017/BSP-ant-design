<script>
/*eslint-disable*/
</script>
<template>
  <div>
    <page-header-wrapper>
      <a-card :bordered="false">
        <a-row>
          <a-col :sm="8" :xs="24">
            <info title="Product Amount" :value="`${totalCnt}`" :bordered="true" />
          </a-col>
          <a-col :sm="8" :xs="24">
            <info title="Already On Shelf" :value="`${onShelfCnt}`" :bordered="true" />
          </a-col>
          <a-col :sm="8" :xs="24">
            <info title="Already In Repo" :value="`${inRepoCnt}`" />
          </a-col>
        </a-row>
      </a-card>

      <a-card style="margin-top: 24px" :bordered="false" title="Item list">
        <div slot="extra">
          <a-radio-group v-model="status">
            <a-radio-button value="all">All</a-radio-button>
            <a-radio-button value="processing">Amazon</a-radio-button>
            <a-radio-button value="waiting">Ebay</a-radio-button>
          </a-radio-group>
          <a-input-search style="margin-left: 16px; width: 272px;" />
        </div>

        <div class="operate">
          <a-button type="dashed" style="width: 100%" icon="plus" @click="showAdd">Add</a-button>
        </div>

        <a-list
          size="large"
          :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}"
        >
          <a-list-item :key="index" v-for="(item, index) in data">
            <a-list-item-meta :description="item.description">
              <a-avatar slot="avatar" size="large" shape="square" :src="item.uri" />
              <a slot="title">{{ item.title }}</a>
            </a-list-item-meta>
            <div slot="actions">
              <a @click="edit(item)">Edit</a>
            </div>
            <div slot="actions">
              <a @click="del(item)">Delete</a>
            </div>
            <div class="list-content">
              <div class="list-content-item">
                <span>Category Name</span>
                <p>{{ item.category_name }}</p>
              </div>
              <div class="list-content-item">
                <span>Status</span>
                <p>{{ item.status }}</p>
              </div>
              <!--            <div class="list-content-item">
              <span>Brand</span>
              <p>{{ item.owner }}</p>
              </div>-->
              <div class="list-content-item">
                <span>Create Time</span>
                <p>{{ item.startAt }}</p>
              </div>
              <!--           <div class="list-content-item">
              <a-progress :show-info="false" :percent="item.progress.value" :status="!item.progress.status ? null : item.progress.status" style="width: 180px" />
              </div>-->
            </div>
          </a-list-item>
        </a-list>
      </a-card>
    </page-header-wrapper>

    <a-modal v-model="visible" title="Add item" @ok="handleOk">
      Item Title：
      <a-input :placeholder="title" v-model="tempTitle" />
      <br />
      <br />Item Category：
      <a-select :default-value="categoryData[0]" style="width: 300px" v-model="tempCategory">
        <a-select-option v-for="category in categoryData" :key="category">{{ category }}</a-select-option>
      </a-select>
      <br />
      <br />Item Status：
      <a-select :default-value="itemStatus[0]" style="width: 300px" v-model="tempStatus">
        <a-select-option v-for="status in itemStatus" :key="status">{{ status }}</a-select-option>
      </a-select>
      <br />
      <br />
      <div class="clearfix">
        <a-upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 12">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </div>
    </a-modal>

    <a-modal v-model="visible1" title="Edit item" @ok="handleOk1">
      Item Title：
      <a-input :placeholder="tempTitle" disabled />
      <br />
      <br />Item Category：
      <a-select :default-value="categoryData[0]" style="width: 300px" v-model="tempCategory">
        <a-select-option v-for="category in categoryData" :key="category">{{ category }}</a-select-option>
      </a-select>
      <br />
      <br />Item Status：
      <a-select :default-value="itemStatus[0]" style="width: 300px" v-model="tempStatus">
        <a-select-option v-for="status in itemStatus" :key="status">{{ status }}</a-select-option>
      </a-select>
      <br />
      <br />
      <div class="clearfix">
        <a-upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 12">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </div>
    </a-modal>
  </div>
</template>

<script>
import TaskForm from './modules/TaskForm'
import Info from './components/Info'
import {axios as request} from '@/utils/request'
import storage from 'store'

const categoryData = ['cloth', 'electronic', 'accessory', 'child', 'daily necessities', 'outdoors', 'food', 'drink']
const itemStatus = ['On Shelf', 'In Repo', 'Off Shelf']
const data = []
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
export default {
  name: 'StandardList',
  components: {
    TaskForm,
    Info
  },
  data() {
    return {
      totalCnt: 0,
      onShelfCnt: 0,
      inRepoCnt: 0,
      data,
      tempTitle: 'title',
      visible: false,
      visible1: false,
      status: 'all',
      tempStatus: 'On Shelf',
      tempRecord: '',
      itemStatus,
      categoryData,
      tempCategory: categoryData[0],
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-2',
          name: 'image.png',
          status: 'error'
        }
      ]
    }
  },
  methods: {
    handleCategoryChange(value) {
      this.tempCategory = value
    },
    showAdd() {
      this.tempTitle = 'title'
      this.tempCategory = categoryData[0]
      this.tempStatus = 'On Shelf'
      this.visible = true
    },
    handleCancel() {
      this.previewVisible = false
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChange({ fileList }) {
      this.fileList = fileList
    },
    handleOk(e) {
      this.add()
      this.visible = false
    },
    handleOk1() {
      this.update()
      this.visible1 = false
    },
    edit(record) {
      this.tempCategory = categoryData[0]
      this.tempStatus = 'On Shelf'
      this.tempRecord = record
      // this.fileList=[]
      this.visible1 = true
      this.tempTitle = record.title
    },
    add() {
      var tempSts
      if (this.tempStatus == 'On Shelf') tempSts = 'A'
      else if (this.tempStatus == 'In Repo') tempSts = 'B'
      else tempSts = 'C'
      var tmpuri
      if (this.fileList.length == 0) tmpuri = ''
      else tmpuri = this.fileList[0].url
      var _this = this
      request
        .post('/system/mvo/productCategory/insert', {
          title: this.tempTitle,
          categoryName: this.tempCategory,
          createdBy: 'naultilss',
          uri: tmpuri,
          stsCd: tempSts,
          userId: storage.get('userId')
        })
        .then(function(response) {
          console.log(response)
          if (response.success == true) {
            _this.$message.info(`Add Succeed`)
            app.data = []
            _this.getData()
          } else {
            _this.$message.error(`Add Failed`)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    update() {
      console.log('recordaaaa', this.tempRecord)
      console.log('recordaaaa', this.fileList[0].url)
      var tempSts
      if (this.tempStatus == 'On Shelf') tempSts = 'A'
      else if (this.tempStatus == 'In Repo') tempSts = 'B'
      else tempSts = 'C'
      var tmpuri
      if (this.fileList.length == 0) tmpuri = ''
      else tmpuri = this.fileList[0].url
      var _this = this
      request
        .post('/system/mvo/productCategory/update', {
          prcId: this.tempRecord.prc_id,
          categoryName: this.tempCategory,
          uri: tmpuri,
          stsCd: tempSts,
          lastUpdateBy: 'ptryyy'
        })
        .then(function(response) {
          console.log(response)
          if (response.success == true) {
            _this.$message.info(`Update Succeed`)
            app.data = []
            _this.getData()
          } else {
            _this.$message.error(`Update Failed`)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    del(record) {
      console.log(record)
      var _this = this
      request
        .post('/system/mvo/productCategory/delete', {
          prcId: record.prc_id,
          lastUpdateBy: 'rain'
        })
        .then(function(response) {
          console.log(response)
          if (response.success == true) {
            _this.$message.info(`Delete Succeed`)
            app.data = []
            _this.getData()
          } else {
            _this.$message.error(`Delete Failed`)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getData() {
      console.log('2333')
      var app = this
      ;(app.data = []),
        (app.totalCnt = 0),
        (app.onShelfCnt = 0),
        (app.inRepoCnt = 0),
        request
          .post('/system/mvo/productCategory/list', {
            page: 0,
            size: 10,
            userId: storage.get('userId')
          })
          .then(function(response) {
            console.log(response)
            response.content.list.forEach(item => {
              console.log(item)
              if (item.sts_cd == 'A') {
                item.status = 'On Shelf'
                app.totalCnt = app.totalCnt + 1
                app.onShelfCnt = app.onShelfCnt + 1
              } else if (item.sts_cd == 'B') {
                item.status = 'In Repo'
                app.totalCnt = app.totalCnt + 1
                app.inRepoCnt = app.inRepoCnt + 1
              } else {
                item.status = 'Off Shelf'
                app.totalCnt = app.totalCnt + 1
              }
              console.log(item)
              if (item.sts_cd == 'A') {
                item.status = 'On Shelf'
              } else if (item.sts_cd == 'B') {
                item.status = 'In Repo'
              } else {
                item.status = 'Off Shelf'
              }
              app.data.push(item)
            })
            //response.data.content.list
          })
          .catch(function(error) {
            console.log(error)
          })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
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
