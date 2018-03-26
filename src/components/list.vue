/**
* Created by OXOYO on 2018/3/21.
*
* 元素列表组件
*/

<style scoped lang="less" rel="stylesheet/less">
  .x-form-editor_list {
    position: absolute;
    top: 50px;
    bottom: 0;
    left: 0;
    width: 400px;
    margin-left: -400px;
    border-right: 1px solid #dddddd;
    display: inline-block;
    z-index: 2000;
    background: #ffffff;
    transition: all .5s ease-in .1s;

    &.list_expand {
      margin-left: 0;

      .handler {
        margin-right: 0;

        &:hover {
          .handler-icon {
            transform: rotate(360deg);
          }
        }
      }
    }

    &:hover {
      .handler {
        margin-right: -22px;
      }
    }

    .list_header {
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #dddddd;
    }
    .list_body {
      position: absolute;
      top: 40px;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 2000;
      background: #ffffff;

      .list_item {
        height: 20px;
        line-height: 20px;
        padding: 10px;
        margin: 5px;
        border-bottom: 1px solid;
      }
    }
    .handler {
      transition: all .5s ease-in .1s;
      position: absolute;
      top: 50%;
      right: 0;
      margin-top: -20px;
      margin-right: -22px;
      height: 40px;
      line-height: 40px;
      width: 20px;
      border: 1px solid #dddddd;
      border-left-color: #ffffff;
      background: #ffffff;
      overflow: hidden;

      &:hover {
        .handler-icon {
          transform: rotate(360deg);
        }
      }

      .handler-icon {
        height: 100%;
        width: 100%;
        display: inline-block;
        transition: all .5s ease-in .1s;
        transform: rotate(0deg);

        &:after {
          content: '<';
        }
        &.rotate {
          transform: rotate(180deg);
        }
      }
    }
  }
</style>

<template>
  <div :class="{'x-form-editor_list': true, 'list_expand': isExpand}">
    <div class="list_header">
      资源列表
    </div>
    <div class="list_body">
      <div class="list_item" v-for="(value, key) in config.data" :key="key">{{ key }}</div>
    </div>
    <!--
    <div class="handler" @click="toggleHandler">
      <div :class="{'handler-icon': true, 'rotate': !isExpand }"></div>
    </div>
    -->
    <XFormEditorHandler mode="vertical" position="right"></XFormEditorHandler>
  </div>
</template>

<script>
import XFormEditorHandler from '../global/components/handler.vue'

export default {
  name: 'XFormEditorList',
  components: {
    XFormEditorHandler
  },
  props: {
    config: {
      type: Object
    }
  },
  data () {
    return {
      // 是否展开
      isExpand: true,
      // 是否显示handler
      isShowHandler: false
    }
  },
  methods: {
    // 切换handler显示/隐藏
    toggleHandler: function () {
      let _t = this
      _t.isShowHandler = !_t.isShowHandler
      _t.isExpand = !_t.isExpand
    }
  },
  created: function () {
    let _t = this
    console.log('List Config::', _t.config)
  }
}
</script>
