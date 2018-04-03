/**
 * Created by OXOYO on 2018/3/26.
 *
 * 自定义组件
 */

import Vue from 'vue'
import iview from 'iview'
import 'iview/dist/styles/iview.css'

// 导入自定义组件
import CustomInput from './components/Input.vue'

// 注册iview
Vue.use(iview)

// 遍历组件数据
let iviewComponentList = {}
Object.keys(iview).map(key => {
  let item = iview[key]
  if (typeof item === 'object' && item instanceof Object) {
    iviewComponentList[key] = item
  }
})
console.log('iviewComponentList', iviewComponentList)
// 合并
let componentList = Object.assign({}, {CustomInput}, iviewComponentList)

export default componentList
