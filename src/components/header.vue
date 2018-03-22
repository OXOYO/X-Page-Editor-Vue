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
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #dddddd;
    display: inline-block;

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
  </div>
</template>

<script>
export default {
  name: 'XFormEditorHeader',
  data () {
    return {}
  }
}
</script>
