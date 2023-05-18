// 时间格式转换 yyyy/mm/dd
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDate(date, split) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join(split || '')
}


// 两位数以内的数字自动补零
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 计算变化多少天后的日期
function DateAddDay(d, days) {
  var d = new Date(d);
  return new Date(d.setDate(d.getDate() + days));
}
// 获得本周周日的日期
function FirstDayInThisWeek(d) {
  var d = new Date(d);
  //console.log(formatTime(DateAddDay(d, 0 - d.getDay())));
  return DateAddDay(d, 0 - d.getDay());
}

// 判断类型
function Type(obj) {
    var typeStr = Object.prototype.toString.call(obj).split(" ")[1];
    return typeStr.substr(0, typeStr.length - 1).toLowerCase();
}

//深拷贝
const copyObj = (obj = {}) => { //变量先置空
    let newobj = null;

    //判断是否需要继续进行递归
    if (typeof (obj) == 'object' && obj !== null) {
        newobj = obj instanceof Array ? [] : {}; //进行下一层递归克隆
        for (var i in obj) {
            newobj[i] = copyObj(obj[i])
        } //如果不是对象直接赋值
    } else newobj = obj;
    return newobj;
}




  module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  DateAddDay: DateAddDay,
  FirstDayInThisWeek: FirstDayInThisWeek,
  type: Type,
  addZero: formatNumber,
  deepcopy: copyObj,
}