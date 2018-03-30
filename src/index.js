/**
 * Created by OXOYO on 2018/3/21.
 */

import XPageEditor from './components/Index.vue'

const XPE = {}

XPE.installed = false
XPE.install = function (Vue) {
  if (XPE.installed) {
    return
  }

  Vue.component('XPageEditor', XPageEditor)
  XPE.installed = true
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(XPE)
}

export default XPE
