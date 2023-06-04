// pages/input/index.js
var utils = require('../../utils/util.js');
var app = getApp();
var cl = getApp().globaldata.bkgcolor;
var im = getApp().globaldata.bkgimage;
var desc, duration, importance = false,
    start_time, due_time;
var start_date, due_date, complete;
console.log(app)
var pos = app.tasklist.get_pos(app.globaldata.taskid);
var list = app.tasklist.get_tasks();
Page({
    onload: function () {},
 /*   data: {
        desc: list[pos].desc,
        duration: list[pos].duration,
        importance: list[pos].importance,
        start_date: null,
        due_date: null,
        start_time: null,
        due_time: null,
        complete: list[pos].complete,
    },*/
    onShow: function (options) {
        this.setData({
            cl: getApp().globaldata.bkgcolor,
            im: getApp().globaldata.bkgimage,
            pos: app.tasklist.get_pos(app.globaldata.taskid),
            desc: list[pos].desc,
            duration: list[pos].duration,
            importance: list[pos].importance,   
            complete: list[pos].complete,
        })
        this.setData({
            start_date: list[pos].start_time.toLocaleDateString(),//xxxx/xx/xx
            start_time: list[pos].start_time.getHours()+":"+list[pos].start_time.getMinutes(),//xx:xx
        })
        this.setData({
            due_date: list[pos].due_time.toLocaleDateString(),
            due_time: list[pos].due_time.getHours()+":"+list[pos].due_time.getMinutes(),
        })
    },

    descinput(e) {
        this.setData({
            desc: e.detail.value
        })
        desc = e.detail.value;
        console.log(desc);
    },
    durationinput(e) {
        this.setData({
            duration: e.detail.value
        })
        duration = e.detail.value;
        console.log(e.detail.value);
    },
    starttinput(e) {
        this.setData({
            start_time: e.detail.value
        })
        start_time = e.detail.value;
        console.log(e.detail.value);
    },
    duetinput(e) {
        this.setData({
            due_time: e.detail.value
        })
        due_time = e.detail.value;
        console.log(e.detail.value);
    },
    startdinput(e) {
        this.setData({
            start_date: e.detail.value
        })
        start_date = e.detail.value;
        console.log(e.detail.value);
    },
    duedinput(e) {
        this.setData({
            due_date: e.detail.value
        })
        due_date = e.detail.value;
        console.log(e.detail.value);
    },
    newtask() {
        console.log("!!!", desc);
        list[pos].desc=desc;
        list[pos].duration=duration; 
        list[pos].importance=importance;
        list[pos].start_date=new date(start_date + " " + start_time); 
        list[pos].due_date=new date(due_date + " " + due_time);
        list[pos].complete=complete;
        wx.switchTab({
            url: '/pages/tasklist/index',
            success: (res) => {},
            fail: (res) => {},
            complete: (res) => {},
        })
    }
})