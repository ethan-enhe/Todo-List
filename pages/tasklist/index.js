// pages/tasklist/index.js
export class task{
  constructor(name,id,expired = false,begin_date = none,due_date = none){
       this.name = name;
       this.id = id;
       this.expired = expired;
       this.due_date = due_date;
       this.begin_date = begin_date;
  }
}

Page({

    /**
     * 页面的初始数据
     */
   
    data: {
      Tasklist : [ 1,2,3,4
      ]
    },





    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})

Component({
  

  pageLifetimes: {
     
         
    show(){
        /*
        每个页面的tab栏实例是不一样的
        在切换到的页面里还需要设置那个页面的tab实例的选中项目。
        */
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
    },




  },
   save_task_data(){
       /**
        * 将任务数据缓存至本地
        */
   },

   read_task_data(){
      /**  读取本地缓存数据 */

   },
    init_task(){

    }
    






})
