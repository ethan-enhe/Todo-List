// app.js
var utils = require('./utils/util.js')
App({
    task: class {
        constructor(desc, duration, importance, start_time, due_time) {
            this.desc = desc; //任务名称
            this.duration = duration; //任务持续时间，单位分钟，Number类型
            this.importance = importance; //任务重要性，重要为1，否则为0
            this.start_time = start_time; //如果已经确定，则为一个Date对象，否则为null
            this.due_time = due_time; //任务截止时间，果已经确定，则为一个Date对象，否则为null
            this.id = Math.random(); //任务分配的id，直接随机值，冲突概率很小
        }
    },
    tasklist: {
        insert_task: function (task_data) { //传入类型为task的任务，加入人物列表
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
        }
    },
    onLaunch() {
        this.tasklist.load_tasks();
    },
    onHide() {
        this.tasklist.save_tasks();
    },
})

