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
        app.tasklist.insert_task(new utils.task("淑芬作业",123,true,new Date("2023-6-12"),null,false));
        app.tasklist.insert_task(new utils.task("线代作业",123,true,new Date("2023-6-14"),null,true));
        app.tasklist.insert_task(new utils.task("线代作业",123,true,new Date("2023-7-13"),null,true));
        app.tasklist.insert_task(new utils.task("线代作业啊大受打击啊老大加拉数据库捡垃圾的反馈阿达flak设计的flak十分谨慎考虑降低发生六点",123,true,new Date("2022-12-14"),null,true));
        app.tasklist.insert_task(new utils.task( "线代作业",123,true,new Date("2023-7-13"),null,true) )

        var taskdata = app.tasklist.get_tasks_copy().sort(function(a,b){
            return Date.parse(a.start_time)-Date.parse(b.start_time);
        });

        var showdata=new Array();
        var lastmonth={};
        for(var i=0;i<taskdata.length;i++){
            // taskdata[i].desc+= (new Date(taskdata[i].start_time)).getFullYear();
            var time=new Date(taskdata[i].start_time);
            var tmp=utils.getYearMonth(time);
            taskdata[i].day=time.getDate();
            if(tmp!=lastmonth.year_month){
                if(i)showdata.push(lastmonth);
                lastmonth={year_month:tmp,
                    taskdata:[taskdata[i]]};
            }
            else lastmonth.taskdata.push(taskdata[i]);
        }
        if(lastmonth!={})showdata.push(lastmonth);
        this.setData({
            tasklist: taskdata,
            showdata: showdata
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