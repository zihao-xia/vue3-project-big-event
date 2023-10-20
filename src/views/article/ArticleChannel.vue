<script setup>
import { ref } from 'vue'
import { artGetChannelsService, artDelChannelService } from '../../api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const channelList = ref([])
const loading = ref(false)
const dialog = ref()

const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
}
getChannelList()

const onEditChannel = (row) => {
  dialog.value.open(row)
}

const onDelChannel = async (row) => {
  await ElMessageBox.confirm(
    'Are you sure you want to delete the channel?',
    'Notice',
    {
      type: 'warning',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }
  )
  await artDelChannelService(row.id)
  ElMessage.success('Delete Channel Successful')
  getChannelList()
}

const onAddChannel = () => {
  dialog.value.open({})
}

const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <page-container title="Article Channel">
    <template #extra>
      <el-button @click="onAddChannel">Add Channel</el-button>
    </template>

    <el-table :data="channelList" class="table" v-loading="loading">
      <el-table-column label="No." width="100" type="index"></el-table-column>
      <el-table-column label="Channel Name" prop="cate_name"></el-table-column>
      <el-table-column label="Alias" prop="cate_alias"></el-table-column>
      <el-table-column label="Operations" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty descrption="No Data"></el-empty>
      </template>
    </el-table>

    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>

<style lang="scss" scoped>
.table {
  width: 100%;
}
</style>
