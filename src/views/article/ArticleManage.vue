<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artGetListService } from '@/api/article.js'
import { formatTime } from '@/utils/format.js'

const articleList = ref([])
const total = ref(0)
const loading = ref(false)
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticleList()

const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}

const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}

const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}

const onEditArticle = (row) => {
  console.log(row)
}
const onDeleteArticle = (row) => {
  console.log(row)
}
</script>

<template>
  <page-container title="Article Manage">
    <template #extra>
      <el-button>Add Manage</el-button>
    </template>

    <el-form inline>
      <el-form-item label="Article Channel">
        <!-- v-model === :modelValue @update:modelValue -->
        <channel-select
          v-model="params.cate_id"
          @onSearch="onSearch"
        ></channel-select>
      </el-form-item>
      <el-form-item label="Post Status">
        <el-select v-model="params.state" clearable @change="onSearch">
          <el-option label="Posted" value="已发布"></el-option>
          <el-option label="Draft" value="草稿"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="Title" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="Channel" prop="cate_name"></el-table-column>
      <el-table-column label="Post Time" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="Status" prop="state"></el-table-column>
      <el-table-column label="Operations">
        <template #default="{ row }">
          <el-button
            circle
            plain
            type="primary"
            :icon="Edit"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            circle
            plain
            type="danger"
            :icon="Delete"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[5, 10, 20]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    ></el-pagination>
  </page-container>
</template>

<style lang="scss" scoped></style>
