const cloud = require("wx-server-sdk")
cloud.init({env:cloud.DYNAMIC_CURRENT_ENV})
exports.main = async(event,context)=>{
   const wxContext = cloud.getWXContext()
   try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: "oSuuI5V-dKfxPuik2phIQjgjla-0",
      page: "pages/index/index",
      lang: 'zh_CN',
      data: {
          "date2":{"value":"2022-2-26"},
          "date3":{"value":"2022-2-23"},
          "thing1":{"value":"poop"}
      },
      template_id: "EbuL48StwQeStSF4EYlVd9AMJccDEbIiu7UHQF_VWTc",
    })
   
    return result
  } catch (err) {
    return err
  }
}