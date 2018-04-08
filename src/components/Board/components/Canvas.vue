/**
* Created by OXOYO on 2018/4/8.
*
* 画布组件
*/

<style scoped lang="less" rel="stylesheet/less">
  .xpe_canvas {
    display: inline-block;
    position: absolute;
    z-index: 2000;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    .canvas_item {
      display: inline-block;
      position: absolute;
      left: 50%;
      margin: 100px 0;
      background: #fff;

      &.active,
      &:hover {
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1);
      }

      &.pc {
        width: 960px;
        height: 1000px;
        margin-left: -480px;
      }
      &.mobile {
        width: 360px;
        height: 1349px;
        margin-left: -180px;
      }
    }
  }
</style>

<template>
  <div class="xpe_canvas">
    <div
      v-for="item in canvasMap"
      v-if="currentActive === item.id"
      :class="[ 'canvas_item', currentActive === item.id ? 'active' : '', item.type === 'pc' ? 'pc' : item.type === 'mobile' ? 'mobile' : '' ]"
      :key="item.id"
      :project-id="item.id"
      :name="item.name"
      :title="item.name"
      @drop.stop.prevent="handleDrop(item, $event)"
      @dragover.stop.prevent
    >
      <h1> {{ item.name }}</h1>
      <h1> {{ item.id }}</h1>
      <template
        v-for="(node, index) in item.components"
      >
        <component :is="node.component.name" :key="index"></component>
      </template>
    </div>
  </div>
</template>

<script>
import utils from '@/global/utils'

export default {
  name: 'XPECanvas',
  data () {
    return {
      // 画布列表
      canvasMap: {},
      // 当前激活对象
      currentActive: '',
      // 当前操作对象
      currentTarget: ''
    }
  },
  methods: {
    // 元素drop
    handleDrop: function (item, event) {
      let _t = this
      console.log('handleDrop')
      // 获取节点数据
      let nodeInfo = JSON.parse(event.dataTransfer.getData('node'))
      let offsetX = event.offsetX
      let offsetY = event.offsetY
      let style = 'left: ' + offsetX + 'px; top: ' + offsetY + 'px'
      console.log('style', style, nodeInfo)
      // 更新当前画布下的组件数据
      _t.canvasMap[item.id]['components'].push(nodeInfo)
      // TODO 动态解析组件 props、slot 等
      // TODO 完善组件上右键菜单
    }
  },
  created: function () {
    let _t = this
    // 监听事件
    utils.bus.$on('XPE/project/add/ok', function (payload) {
      console.log('canvasMap', payload.name)
      _t.canvasMap = {
        ..._t.canvasMap,
        [payload.id]: payload
      }
      // 更新当前激活对象
      _t.currentActive = payload.id
    })
    utils.bus.$on('XPE/project/trigger', function (projectID) {
      // 更新当前激活对象
      _t.currentActive = projectID
    })
    utils.bus.$on('XPE/project/remove', function (projectID) {
      // 删除当前操作对象数据
      delete _t.canvasMap[projectID]
    })
  }
}
</script>
