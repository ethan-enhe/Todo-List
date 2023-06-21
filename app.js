// app.js
const util = require('./utils/util.js');
const {
    deepcopy,
    task,
    fix_task
} = require('./utils/util.js');
var utils = require('./utils/util.js')

App({
    globaldata: {
        bkgcolor: "blue",
        bkgimage: "none",
    },
    tasklist: {
        insert_task: function (task_data) { //传入类型为task的任务，加入人物列表
            this.list.push(task_data);
        },
        get_pos(task_id) { //通过id查找事件在列表中的位置
            for (var i = 0; i < this.list.length; i++)
                if (this.list[i].id == task_id) return i;
        },
        delete_task(task_id) { //传入taskid，删除对应任务。
            var index = this.list.findIndex(function (x) {
                return x.id == task_id;
            })
            console.log("已经删除")
            if (index != -1) this.list.splice(index, 1);
        },
        get_tasks() { //返回列表本身，不要直接做修改！！
            return this.list;
        },
        get_tasks_copy() { //返回列表的深拷贝，可以随意修改
            // console.log(utils.deepcopy(this.list));
            var res = utils.deepcopy(this.list);
            for (var i = 0; i < res.length; i++)
                res[i] = utils.fix_task(res[i]);
            return res;
        },
        save_tasks() {
            wx.setStorageSync("tasklist", this.list);
            console.log("缓存记录条数 " + this.list.length);
        },
        load_tasks() {
            //this.list;
            const that = this;
            this.list = wx.getStorageSync('tasklist')
            if (this.list == "")
                this.list = new Array();
            for (var i = 0; i < this.list.length; i++)
                this.list[i] = utils.fix_task(this.list[i]);
        },
        task_inrange(l, r) { //筛选出与l，r，时间有交集，且时间确定的事件
            var tmp = this.get_tasks_copy();
            var res = new Array();
            for (var i = 0; i < tmp.length; i++) {
                if (tmp[i].start_time != null && typeof (tmp[i].duration) == "number") {
                    var end = new Date(tmp[i].start_time);
                    end.setMinutes(end.getMinutes() + tmp[i].duration)
                    if (end > l && tmp[i].start_time < r)
                        res.push({
                            start_time: tmp[i].start_time,
                            end_time: end
                        });
                }
            }
            res.sort(function (a, b) {
                return utils.cmp_date(b.start_time, a.start_time);
            })
            return res;
        },
        available_time(tasks, l, r) { //传入Date对象，得到当天内的空余时间（一个数组，每项为{start_ava,end_ava}）
            var ge5min = function (a, b) { //取出所有时长大于5分钟的时间段
                return utils.cmp_date(a, b) >= 1 * 60 * 1000;
            }
            var ava = new Array();
            for (var i = 0; i < tasks.length; i++) {
                if (ge5min(l, tasks[i].start_time)) {
                    ava.push({
                        start_ava: new Date(l),
                        end_ava: new Date(tasks[i].start_time)
                    })
                }
                if (tasks[i].end_time > l)
                    l = tasks[i].end_time;
            }
            if (ge5min(l, r))
                ava.push({
                    start_ava: new Date(l),
                    end_ava: r
                })
            return ava;
        },
        try_insert( _ava_time, trytime) { //尝试把这些任务插进ava_time里
            function get_minute(a, b) {
                return utils.cmp_date(a, b) / 1000 / 60;
            }
            var _task=this.get_tasks_copy();
            _task.sort(function (a, b) {
                if (a.importance && !b.importance) return -1;
                if (!a.importance && b.importance) return 1;
                return util.cmp_date(b.due_time, a.due_time);
            })


            var best_satisfied = 0,
                best_satisfied_imp = 0;
            var best_task_arrange = new Array();

            while (trytime--) {
                var ava_time = new Array();
                var task = new Array();
                for (var i = 0; i < _ava_time.length; i++) {
                    ava_time.push({
                        start_ava: new Date(_ava_time[i].start_ava),
                        end_ava: new Date(_ava_time[i].end_ava),
                    })
                }
                for (var i = 0; i < _task.length; i++) {
                    task.push(utils.fix_task(utils.deepcopy(_task[i])))
                }
                var satisfied = 0,
                    satisfied_imp = 0;
                for (var i = 0; i < task.length; i++) {
                    if (task[i].start_time == null || task[i].start_time == undefined) {
                        var cnt = 0;
                        for (var j = 0; j < ava_time.length; j++) {
                            if (Math.min(get_minute(ava_time[j].start_ava, task[i].due_time),
                                    get_minute(ava_time[j].start_ava, ava_time[j].end_ava)) > task[i].duration)
                                ++cnt;
                        }
                        console.log(cnt);
                        var choose = Math.ceil(Math.random() * cnt);
                        for (var j = 0; j < ava_time.length; j++) {
                            if (Math.min(get_minute(ava_time[j].start_ava, task[i].due_time),
                                    get_minute(ava_time[j].start_ava, ava_time[j].end_ava)) > task[i].duration) {
                                if (cnt == choose) {
                                    task[i].start_time = new Date(ava_time[j].start_ava);
                                    ava_time[j].start_ava.setMinutes(ava_time[j].start_ava.getMinutes() + task[i].duration);
                                    ++satisfied;
                                    if (task[i].importance) ++satisfied_imp;
                                    break;
                                }
                                ++cnt;
                            }
                        }
                    }
                }
                if (satisfied_imp > best_satisfied_imp || (satisfied_imp == best_satisfied_imp && satisfied > best_satisfied)) {
                    best_task_arrange = task;
                    best_satisfied = satisfied;
                    best_satisfied_imp = satisfied_imp;
                }
            }
            console.log("安排上了", best_satisfied, "个任务");
            console.log("安排上了", best_satisfied_imp, "个重要任务");
            return best_task_arrange;
        }
    },
    onLaunch() {
        wx.cloud.init({env:"dolist-2gn76fqw7f70a669"});
        this.tasklist.load_tasks();
        var res = wx.getStorageSync("setting");
        if (res != "")
            this.globaldata = res;
    },
    onHide() {
        this.tasklist.save_tasks();
        wx.setStorageSync("setting", this.globaldata);
    },
})