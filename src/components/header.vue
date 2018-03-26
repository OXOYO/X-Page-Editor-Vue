/**
* Created by OXOYO on 2018/3/22.
*
* 头部组件
*/

<style scoped lang="less" rel="stylesheet/less">
  .x-form-editor_header {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 49px;
    line-height: 49px;
    border-bottom: 1px solid #dddddd;
    display: inline-block;
    z-index: 2000;
    background: #ffffff;

    .x-form-editor_title {
      height: 30px;
      line-height: 30px;
      font-size: 24px;
      font-weight: bold;
      display: inline-block;
    }
  }
</style>

<template>
  <div class="x-form-editor_header">
    <div class="x-form-editor_title">X-Form-Editor</div>
    <XFormEditorHandler mode="horizontal" position="bottom"></XFormEditorHandler>
  </div>
</template>

<script>
import XFormEditorHandler from '../global/components/handler.vue'

export default {
  name: 'XFormEditorHeader',
  components: {
    XFormEditorHandler
  },
  data () {
    return {}
  }
}
</script>
