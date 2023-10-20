import request from '@/utils/request'

// get
export const artGetChannelsService = () => request.get('/my/cate/list')

// add
export const artAddChannelService = (data) => request.post('/my/cate/add', data)

// edit
export const artEditChannelService = (data) =>
  request.put('/my/cate/info', data)

// delete
export const artDelChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })
