/**
 * Created by OXOYO on 2018/3/21.
 */

import FormEditor from './components/index.vue'

const XFormEditor = {}

XFormEditor.installed = false
XFormEditor.install = function (Vue) {
  if (XFormEditor.installed) {
    return
  }

  Vue.component('XFormEditor', FormEditor)
  XFormEditor.installed = true
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(XFormEditor)
}

export default XFormEditor
