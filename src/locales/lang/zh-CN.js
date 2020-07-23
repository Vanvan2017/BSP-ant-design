import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'

const components = {
  antLocale: antd,
  momentName: 'zh-cn',
  momentLocale: momentCN
}

const locale = {
  'message': '-',
  'menu.home': '主页',
  'menu.dashboard': '仪表盘',
  'menu.dashboard.analysis': '分析页',
  'menu.dashboard.monitor': '监控页',
  'menu.dashboard.workplace': '工作台',

  // operations
  'Add': '新增',
  'Edit': '编辑',
  'Delete': '删除',
  'Action': '操作',
  'Selected': '已选择',
  // GVO
  'Number': '编号',
  'Type': '字典类型',
  'Description': '用途描述',
  'Code': '编码',
  'Value': '编码值'
}

export default {
  ...components,
  ...locale
}
