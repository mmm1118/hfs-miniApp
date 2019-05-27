/*L的方法库*/

function funtime(time) {
  var now = new Date().getTime();
  // 下面两种转换格式都可以。
  var tmpTime = Date.parse(time.replace(/-/gi, "/"));

  // 返回值
  var result;
  // 一分钟 1000 毫秒 乘以 60
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;
  var month = day * 30;
  var year = day * 365;
  // 现在时间 减去 传入时间 得到差距时间
  var diffValue = now - tmpTime;
  // 小于 0 直接返回
  if (diffValue < 0) {
    return;
  }

  // 计算 差距时间除以 指定时间段的毫秒数 
  var yearC = diffValue / year;
  var monthC = diffValue / month;
  var weekC = diffValue / week;
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;

  if (yearC >= 1) {
    console.log("年前");
    result = "" + parseInt(yearC) + "月前";

  } else if (monthC >= 1) {

    console.log(parseInt(monthC) + "月前")
    result = "" + parseInt(monthC) + "月前";

  } else if (weekC >= 1) {

    console.log(parseInt(weekC) + "周前")
    result = "" + parseInt(weekC) + "周前";

  } else if (dayC >= 1) {

    console.log(parseInt(dayC) + "天前")
    result = "" + parseInt(dayC) + "天前";

  } else if (hourC >= 1) {

    console.log(parseInt(hourC) + "小时前")
    // result = "" + parseInt(hourC) + "小时前";
    result = { time: parseInt(hourC), dw: '时' }

  } else if (minC >= 1) {

    console.log(parseInt(minC) + "分钟前")
    result = {time: parseInt(minC),dw:'分'}
    // result = "" + parseInt(minC) + "分钟前";

  } else {
    result = "刚刚";
  }

  return result;
}


/* 把 2019-03 改为 2019年3月  如果是本年的话 那么就返回 月号 不是本年就返回 年 月*/
function Annualconversion(Annual) {
  var date = new Date();
  var year = date.getFullYear();

  var Annuals = Annual.split('-')
  var mothe = Annuals[1].split('');
  var mothetwo = Annuals[2].split('');
  var Annualconversion;

  console.log(year)
  //判断是不是今年 是今年就返回月 和号
  if (Annuals[0] == year) {
   var motheyue = mothe[0] == 0 ? mothe[1] + '月' : mothe[0] + mothe[1] + '月'
   var mothetwoday = mothetwo[0] == 0 ? mothe = mothetwo[1] + '号' : mothetwo[0] + mothetwo[1] + '号'
    Annualconversion = motheyue + mothetwoday;

  } else {
    // 这是不等于同一年的数据
    console.log('2018')
  var motheyear = mothe[0] == 0 ? mothe[1] + '月' : mothe[0] + mothe[1] + '月'
  var Annualconversion = Annuals[0] + '年' + motheyear;

  }
  return Annualconversion;
}

/* 获得当前时间 */
function newDate(){
  var myDate = new Date();//获取系统当前时间
  var getFullYear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
  var getMonth = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
  var getDate = myDate.getDate(); //获取当前日(1-31)
  var getHours = myDate.getHours(); //获取当前小时数(0-23)
  var getMinutes = myDate.getMinutes(); //获取当前分钟数(0-59)
  var getSeconds = myDate.getSeconds(); //获取当前秒数(0-59)

  return getFullYear + '-' + getMonth + '-' + getDate + ' ' + getHours + ':' + getMinutes + ':' + getSeconds
}

//new data 返回 月-号
function Monthyue(time) {
  let timelist = time.split(' ');
  var yue = timelist[0].split('-');
  return yue[1] + ':' + yue[2];
}


/**
 * 验证手机号码
 * @param {number} num 手机号码
 */

/* 导出方法 
方法名字 和 导出名字一样 可以填写一个
*/
module.exports = {
  funtime,
  Annualconversion,
  newDate,
  Monthyue,
}