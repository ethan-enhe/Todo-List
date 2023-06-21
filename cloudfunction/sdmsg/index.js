// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.userId,
      page: event.page,
      lang: 'zh_CN',
      data: event.data,
      templateId: event.templateId,
    })
    return result
  } catch (err) {
    return err
  }
}

