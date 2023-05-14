// app.js
App({
    onLaunch() {
    },
    task: class {
        constructor(desc, duration, importance, start_time, due_time) {
            this.desc = desc;
            this.duration = duration;
            this.importance = importance;
            this.start_time = start_time;
            this.due_time = due_time;
        }
    },
    globalData: class {
        constructor() {
            this.list = new Array();
        }
        insert_task(task_data) {
            this.list.push(task_data);
        }
        get_sorted_tasks() {
            tmp = JSON.parse(JSON.stringify(this.list)); //深拷贝，不想修改原数组
            tmp.sort(function (a, b) {
                if (b.start_time == a.start_time) return 0;
                if (a.start_time == undefined) return -1;
                if (b.start_time == undefined) return 1;
                return (a.start_time < b.start_time ? -1 : 1);
            })
            return tmp;
        }
    }
})