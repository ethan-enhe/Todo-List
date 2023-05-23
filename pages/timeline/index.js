// pages/timeline/index.js
var utils = require('../../utils/util.js')
var app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

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
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 1
            })
        }
        app.tasklist.insert_task(new utils.task("123",123,true,new Date("October 13, 1975 11:13:00"),null,false));
        app.tasklist.insert_task(new utils.task("123",123,true,new Date("October 13, 1975 11:13:00")+10000,null,true));
        app.tasklist.insert_task(new utils.task("123",123,false,new Date("October 13, 1975 11:13:00")+10000000,null,false));

        var taskdata = app.tasklist.get_tasks_copy().sort(function(a,b){return a.start_date-b.start_date});

        var showdata=new Array();
        for(var i=0;i<taskdata.length;i++){

        }
        this.setData({
            tasklist: taskdata
        })


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