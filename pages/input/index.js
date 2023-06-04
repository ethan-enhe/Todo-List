// pages/input/index.js
var utils = require('../../utils/util.js');
var app = getApp();
var cl = getApp().globaldata.bkgcolor;
var im = getApp().globaldata.bkgimage;
var desc, duration, importance=false, start_time, due_time;
var start_date, due_date, complete;
Page({
    onload: function () {},
    data: {
        desc: null,
        duration: null,
        importance: false,
        start_time: null,
        due_time: null,
        complete: false,
        due_date: null,
        start_date: null
    },
    onShow: function (options) {
        this.setData({
            cl: getApp().globaldata.bkgcolor,
            im: getApp().globaldata.bkgimage,
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
    setimp() {
        this.setData({
            importance: true
        })
        importance = true;
    },
    setunimp() {
        this.setData({
            importance: false
        })
        importance = false;
    },
    newtask() {
        console.log("!!!", desc);
        app.tasklist.insert_task(new utils.task(desc, duration, importance, start_date+" "+start_time, due_date+" "+due_time, false));
        wx.switchTab({
          url: '/pages/tasklist/index',
          success: (res) => {},
          fail: (res) => {},
          complete: (res) => {},
        })
    }
})