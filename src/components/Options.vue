/**
* Created by OXOYO on 2018/3/21.
*
* 配置组件
*/

<style scoped lang="less" rel="stylesheet/less">
  .xpe_options {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    /*width: 400px;*/
    /*margin-right: -400px;*/
    padding-top: 50px;
    border-left: 1px solid #dddddd;
    display: inline-block;
    z-index: 2000;
    background: #ffffff;
    box-shadow: -2px 0 2px 0 rgba(0, 0, 0, 0.1);
    transition: all .5s ease-in .1s;

    &.block_expand {
      margin-right: 0;
    }

    &:hover {
      .handler {
        margin-left: -10px;
      }
    }

    .block_header {
      width: 100%;
      height: 39px;
      line-height: 39px;
      border-bottom: 1px solid #dddddd;
      text-align: right;

      .title {
        font-size: 16px;
        font-weight: bold;
        margin-right: 20px;
        display: inline-block;
      }
    }
    .block_body {
      position: absolute;
      top: 90px;
      right: 0;
      left: 0;
      bottom: 0;
      padding: 20px 0;
      z-index: 2000;
      background: #ffffff;
      text-align: left;
      overflow-y: auto;

      .options-collapse {
        border-left-color: transparent;
        border-right-color: transparent;
        border-radius: 0;
      }
    }
  }
</style>

<template>
  <div :class="{'xpe_options': true, 'block_expand': isExpand}" :style="computedStyle">
    <div class="block_header">
      <div class="title">Options</div>
    </div>
    <div class="block_body">
      <XUICollapse v-model="activePanel" class="options-collapse">
        <XUIPanel name="propsMap">
          props
          <div class="options-body" slot="content" v-if="Object.keys(nodeInfo).length">
            <XUIForm
              class="options-body"
              ref="propsForm"
              :model="propsMap"
              :label-width="80"
              @keydown.native.enter.prevent
              @click.stop.prevent
            >
              <XUIFormItem
                class="options-item"
                v-for="(val, key) in propsMap"
                :key="key"
                :label="key"
                :prop="key"
              >
                <XUISwitch
                  v-if="typeof propsMap[key] === 'boolean'"
                  v-model="propsMap[key]"
                >
                </XUISwitch>
                <XUIInput v-else type="text" v-model="propsMap[key]"></XUIInput>
              </XUIFormItem>
            </XUIForm>
          </div>
        </XUIPanel>
        <XUIPanel name="slotsMap">
          slots
          <div class="options-body" slot="content" v-if="Object.keys(nodeInfo).length">
            <div
              class="options-item"
              v-for="(val, key) in slotsMap"
              :key="key"
            >
              {{ val }}
            </div>
          </div>
        </XUIPanel>
        <XUIPanel name="innerHTML">
          innerHTML
          <div class="options-body" slot="content" v-if="Object.keys(nodeInfo).length">
            <XUIForm
              class="options-body"
              :label-width="80"
              @keydown.native.enter.prevent
              @click.stop.prevent
            >
              <XUIFormItem
                class="options-item"
                label="innerHTML"
              >
                <XUIInput type="text" v-model="innerHTML"></XUIInput>
              </XUIFormItem>
            </XUIForm>
          </div>
        </XUIPanel>
      </XUICollapse>
      <!-- propsMap -->
      <!--<div class="options-group" v-if="Object.keys(nodeInfo).length">
        <div class="options-header">Props</div>
        <div class="options-body">
          <XUIForm
            class="options-body"
            ref="propsForm"
            :model="propsMap"
            :label-width="120"
            inline
            @keydown.native.enter.prevent
            @click.stop.prevent
          >
            <XUIFormItem
              class="options-item"
              v-for="(val, key) in propsMap"
              :key="key"
              :label="key"
              :prop="key"
            >
              <XUISwitch
                v-if="typeof propsMap[key] === 'boolean'"
                v-model="propsMap[key]"
              >
              </XUISwitch>
              <XUIInput v-else type="text" v-model="propsMap[key]"></XUIInput>
            </XUIFormItem>
          </XUIForm>
        </div>
      </div>-->
      <!-- slotsMap -->
      <!--<div class="options-group" v-if="Object.keys(nodeInfo).length">
        <div class="options-header">Slots</div>
        <div class="options-body">
          <div
            class="options-item"
            v-for="(val, key) in slotsMap"
            :key="key"
          >
            {{ val }}
          </div>
        </div>
      </div>-->
      <!-- innerHTML -->
      <!--<div class="options-group" v-if="Object.keys(nodeInfo).length">
        <div class="options-header">innerHTML</div>
        <div class="options-body">
          <XUIForm
            class="options-body"
            :label-width="120"
            inline
            @keydown.native.enter.prevent
            @click.stop.prevent
          >
            <XUIFormItem
              class="options-item"
              label="innerHTML"
            >
              <XUIInput type="text" v-model="innerHTML"></XUIInput>
            </XUIFormItem>
          </XUIForm>
        </div>
      </div>-->
    </div>
    <XPEHandler class="handler" mode="vertical" position="left" :expand="isExpand" :callback="toggleHandler"></XPEHandler>
  </div>
</template>

<script>
import Vue from 'vue'

import XPEHandler from '@/global/components/Handler.vue'

import defConfig from '@/config'
import utils from '@/global/utils'

export default {
  name: 'XPEOptions',
  components: {
    XPEHandler
  },
  props: {
    config: {
      type: Object,
      default: function () {
        return defConfig.UI.options
      }
    }
  },
  data () {
    return {
      // 是否展开
      isExpand: true,
      nodeInfo: {},
      propsMap: {},
      slotsMap: {},
      innerHTML: '',
      // 当前展开的面板
      activePanel: ['propsMap', 'slotsMap', 'innerHTML']
    }
  },
  computed: {
    computedStyle: function () {
      let _t = this
      return {
        ..._t.config.style,
        'margin-right': _t.isExpand ? 0 : _t.config.style['margin-right']
      }
    }
  },
  watch: {
    propsMap: {
      handler: function (val, oldVal) {
        let _t = this
        // 只在值变化时进行处理
        if (Object.keys(oldVal).length && Object.keys(val).length) {
          // 广播事件，更新组件props
          utils.bus.$emit('XPE/project/component/props/set', {
            ..._t.nodeInfo,
            props: val
          })
        }
      },
      deep: true
    },
    slotsMap: {
      handler: function (val, oldVal) {
        let _t = this
        // 只在值变化时进行处理
        if (Object.keys(oldVal).length && Object.keys(val).length) {
          // 广播事件，更新组件props
          utils.bus.$emit('XPE/project/component/props/set', {
            ..._t.nodeInfo,
            slots: val
          })
        }
      },
      deep: true
    },
    innerHTML: {
      handler: function (val) {
        let _t = this
        // 广播事件，更新组件props
        utils.bus.$emit('XPE/project/component/props/set', {
          ..._t.nodeInfo,
          innerHTML: val
        })
      },
      deep: true
    }
  },
  methods: {
    // 切换handler显示/隐藏
    toggleHandler: function (val) {
      let _t = this
      _t.isExpand = val !== undefined ? val : !_t.isExpand
      _t.$nextTick(function () {
        let elWidth = _t.isExpand ? _t.$el.offsetWidth : 0
        // 广播事件
        utils.bus.$emit('XPE/expand/toggle/single', {
          position: 'right',
          val: {
            right: elWidth
          }
        })
      })
    },
    // 动态解析组件
    compileComponent: function (nodeInfo) {
      let _t = this
      _t.nodeInfo = nodeInfo
      // TODO 动态解析组件 props、slot 等
      console.log('compileComponent', nodeInfo)
      // 读取组件
      let constructor = Vue.component(nodeInfo.component.name)
      // 实例化
      let instance = new constructor()
      // 获取props、slots
      let propsMap = instance.$props
      let slotsMap = instance.$slots
      _t.propsMap = propsMap
      _t.slotsMap = slotsMap
      _t.innerHTML = ''
    }
  },
  created: function () {
    let _t = this
    // 监听事件
    utils.bus.$on('XPE/expand/toggle/all', function (val) {
      _t.toggleHandler(val)
    })
    utils.bus.$on('XPE/project/component/trigger', function (nodeInfo) {
      // 动态解析组件 props、slot 等
      _t.compileComponent(nodeInfo)
    })
  }
}
</script>
