/**
* Created by OXOYO on 2018/3/26.
*
*/

<style scoped lang="less" rel="stylesheet/less">
  .x-form-editor_footer {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 49px;
    line-height: 49px;
    border-top: 1px solid #dddddd;
    display: inline-block;
    z-index: 2000;
    background: #ffffff;
  }
</style>

<template>
  <div class="x-form-editor_footer">
    <h1>TODO Footer</h1>
    <XFormEditorHandler mode="horizontal" position="top"></XFormEditorHandler>
  </div>
</template>

<script>
import XFormEditorHandler from '../global/components/handler.vue'

export default {
  name: 'XFormEditorFooter',
  components: {
    XFormEditorHandler
  }
}
</script>
