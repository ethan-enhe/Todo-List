// app.js
var utils = require('./utils/util.js')

App({
//   globalData: 'I am global data',

    tasklist: {

        insert_task: function (task_data) { //传入类型为task的任务，加入人物列表
            console.log(task_data);
            this.list.push(task_data);
        },
        delete_task(task_id) { //传入taskid，删除对应任务。
            var index = this.list.findIndex(function (x) {
                return x.id == task_id;
            })
            if (index != -1) this.list.splice(index, 1);
        },
        get_tasks() { //返回列表本身，不要直接做修改！！
            return this.list;
        },
        get_tasks_copy() { //返回列表的深拷贝，可以随意修改
            return utils.deepcopy(this.list);
        },
        save_tasks() {
            wx.setStorageSync("tasklist", this.list);
            console.log("缓存记录条数 " + this.list.length);
        },
        load_tasks() {
            this.list = wx.getStorageSync("tasklist");
            console.log("获取之前记录条数 " + this.list.length);
            if (this.list.length == 0)
                this.list = new Array();
        }
    },
    onLaunch() {
        this.tasklist.load_tasks();
        // console.log("1231");
        // this.tasklist.insert_task(new utils.task("123",123,1,new Date("October 13, 1975 11:13:00"),null));
    },
    onHide() {
        this.tasklist.save_tasks();
    },

})
