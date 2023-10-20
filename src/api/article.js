import request from '@/utils/request'

// channel: get
export const artGetChannelsService = () => request.get('/my/cate/list')

// channel: add
export const artAddChannelService = (data) => request.post('/my/cate/add', data)

// channel: edit
export const artEditChannelService = (data) =>
  request.put('/my/cate/info', data)

// channel: delete
export const artDelChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })

// article: get
export const artGetListService = (params) =>
  request.get('/my/article/list', { params })
