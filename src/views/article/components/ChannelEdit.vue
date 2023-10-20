<script setup>
import { ref } from 'vue'
import { artEditChannelService, artAddChannelService } from '@/api/article.js'

const dialogVisible = ref(false)
const formRef = ref()
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: 'Please enter channel name', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: 'Channel Name should be 1-10 non-blank characters',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: 'Please enter alias', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: 'Alias should be 1-15 characters or numbers',
      trigger: 'blur'
    }
  ]
}

const emit = defineEmits(['success'])
const onSubmit = async () => {
  await formRef.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    await artEditChannelService(formModel.value)
    ElMessage.success('Edit Channel Successful')
  } else {
    await artAddChannelService(formModel.value)
    ElMessage.success('Add Channel Successful')
  }
  dialogVisible.value = false
  emit('success')
}

const open = (row) => {
  formModel.value = { ...row }
  dialogVisible.value = true
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? 'Add Channel' : 'Edit Channel'"
    width="40%"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="120px"
      style="padding-right: 30px"
    >
      <el-form-item label="Channel Name" prop="cate_name">
        <el-input
          v-model="formModel.cate_name"
          placeholder="Input Channel Name"
        ></el-input>
      </el-form-item>
      <el-form-item label="Alias" prop="cate_alias">
        <el-input
          v-model="formModel.cate_alias"
          placeholder="Input Alias"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onSubmit">Submit</el-button>
      </span>
    </template>
  </el-dialog>
</template>
