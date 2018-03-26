/**
* Created by OXOYO on 2018/3/21.
*
* 画板组件
*/

<style scoped lang="less" rel="stylesheet/less">
  .x-form-editor_board {
    position: absolute;
    top: 50px;
    right: 0;
    bottom: 0;
    left: 0;
    display: inline-block;
    z-index: 1000;
    background-image: linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0), linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0);
    background-position: 0 0, 10px 10px;
    background-size: 20px 20px;
  }
</style>

<template>
  <div class="x-form-editor_board">
    <h1>TODO Board</h1>
  </div>
</template>

<script>
export default {
  name: 'XFormEditorBoard',
  data () {
    return {}
  }
}
</script>
