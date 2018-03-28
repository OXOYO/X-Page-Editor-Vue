/**
* Created by OXOYO on 2018/3/28.
*
* 右键菜单元素
*/

<style scoped lang="less" rel="stylesheet/less">
</style>

<template>
  <div
    v-if="info.enable"
    class="context-menu-item"
    :name="info.name"
    :style="info.style"
    @click.stop.prevent="triggerMenuItem"
  >
    <!--
    <Icon
      class="context-menu-icon"
      v-if="info.icon"
      :type="info.icon.type"
      :style="info.icon.style"
    >
    </Icon>
    -->
    <i
      v-if="info.icon"
      :class="['context-menu-icon', 'iconfont', info.icon.type]"
      :style="info.icon.style"
      :alt="info.text"
      :title="info.text"
    >
    </i>
    <div class="context-menu-label">
      <div class="context-menu-label-text">{{ info.text }}</div>
      <!--
      <Icon
        class="context-menu-icon-child"
        v-if="info.children && info.children.length"
        type="arrow-right-b"
      >
      </Icon>
      -->
      <i
        v-if="info.children && info.children.length"
        :class="['context-menu-icon-child', 'iconfont', 'icon-arrow-right']"
      >
      </i>
    </div>
    <slot name="child"></slot>
  </div>
</template>

<script>
import utils from '../../utils'

export default {
  name: 'ContextMenuItem',
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 触发菜单
    triggerMenuItem: function () {
      let _t = this
      console.log('triggerMenuItem', _t.info.text, _t.info.name)
      // 执行菜单相应操作
      if (_t.info && _t.info.action && _t.info.action.type) {
        switch (_t.info.action.type) {
          case 'bus':
            console.log('_t.info.action.handler', _t.info.action.handler)
            utils.bus.$emit(_t.info.action.handler, _t.info.action.params)
            break
        }
      }
      // 广播事件，关闭菜单
      utils.bus.$emit('XFormEditor/contextMenu/hide')
    }
  }
}
</script>
