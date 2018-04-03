/**
* Created by OXOYO on 2018/4/3.
*
* 新增项目弹窗
*/

<style lang="less" rel="stylesheet/less">
  .xpe_add-project-modal {
    text-align: left;
  }
</style>

<template>
  <XUIModal
    class="xpe_add-project-modal"
    :value="isShow"
    title="新增项目"
    :transfer="false"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
  >
    <XUIForm
      ref="addProjectForm"
      :model="formData"
      :rules="formRules"
      :label-width="120"
    >
      <XUIFormItem label="项目名称：" prop="projectName">
        <XUIInput type="text" v-model="formData.projectName" placeholder="请输入项目名" style="width: 300px;"></XUIInput>
      </XUIFormItem>
    </XUIForm>
    <div slot="footer">
      <Button type="text" size="large" @click="handleCancel">取消</Button>
      <Button type="primary" size="large" @click="handleOK">确定</Button>
    </div>
  </XUIModal>
</template>

<script>

import utils from '../utils'

export default {
  name: 'XPEAddProjectModal',
  data () {
    return {
      // 是否显示弹窗
      isShow: false,
      // 表单数据
      formData: {
        projectName: ''
      },
      // 表单校验规则
      formRules: {
        projectName: {
          required: true,
          trigger: 'change'
        }
      }
    }
  },
  methods: {
    handleOK: function () {
      let _t = this
      // 校验结果
      let validResult = false
      _t.$refs['addProjectForm'].validate((valid) => {
        validResult = valid
        if (!valid) {
          _t.$Message.error('表单验证失败！')
        }
      })
      console.log('validResult', validResult)
      if (!validResult) {
        return false
      }
      // 关闭弹窗
      _t.isShow = false
      let timeNow = new Date().getTime()
      let payload = {
        id: timeNow,
        name: _t.formatDate.projectName,
        type: 'pc'
      }
      // 广播事件
      utils.bus.$emit('XPE/project/add/ok', payload)
    },
    handleCancel: function () {
      let _t = this
      // 关闭弹窗
      _t.isShow = false
    }
  },
  created: function () {
    let _t = this
    // 监听事件
    utils.bus.$on('XPE/project/add', function () {
      _t.isShow = true
    })
  }
}
</script>
