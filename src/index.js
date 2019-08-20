/**
 * Created by OXOYO on 2018/3/21.
 */

import {
  Button,
  Icon,
  Form,
  FormItem,
  Modal,
  Input,
  InputNumber,
  RadioGroup,
  Radio,
  Switch,
  Collapse,
  Panel,
  Spin,
  Tooltip
} from 'iview'
import 'iview/dist/styles/iview.css'

import XPageEditor from './components/Index.vue'
import XPEIcon from './ui/Icon.vue'
import './styles/main.less'

const XPE = {}
const prefix = 'XUI'

XPE.installed = false
XPE.install = function (Vue) {
  if (XPE.installed) {
    return
  }

  // 注册UI组件
  Vue.component(prefix + 'Button', Button)
  Vue.component(prefix + 'Icon', Icon)
  Vue.component(prefix + 'Form', Form)
  Vue.component(prefix + 'FormItem', FormItem)
  Vue.component(prefix + 'Modal', Modal)
  Vue.component(prefix + 'Input', Input)
  Vue.component(prefix + 'InputNumber', InputNumber)
  Vue.component(prefix + 'RadioGroup', RadioGroup)
  Vue.component(prefix + 'Radio', Radio)
  Vue.component(prefix + 'Switch', Switch)
  Vue.component(prefix + 'Collapse', Collapse)
  Vue.component(prefix + 'Panel', Panel)
  Vue.component(prefix + 'Spin', Spin)
  Vue.component(prefix + 'Tooltip', Tooltip)
  // 注册XPageEditor
  Vue.component('XPageEditor', XPageEditor)
  Vue.component('XPEIcon', XPEIcon)
  XPE.installed = true
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(XPE)
}

export default XPE
