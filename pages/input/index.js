// pages/input/index.js
var utils = require('../../utils/util.js');
var app = getApp();
var cl = getApp().globaldata.bkgcolor;
var im = getApp().globaldata.bkgimage;
var desc, duration, importance=false, start_time, due_time, complete;
Page({
    onload: function () {},
    data: {
        desc: null,
        duration: null,
        importance: false,
        start_time: null,
        due_time: null,
        complete: false,
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
    startinput(e) {
        this.setData({
            start_time: e.detail.value
        })
        start_time = e.detail.value;
        console.log(e.detail.value);
    },
    dueinput(e) {
        this.setData({
            due_time: e.detail.value
        })
        due_time = e.detail.value;
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
        app.tasklist.insert_task(new utils.task(desc, duration, importance, start_time, due_time, false));
    }
})