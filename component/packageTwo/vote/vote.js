const date = new Date()
const years = []
const months = []
const days = []
const hours = []
const minutes = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = '0' + i
  }
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = '0' + i
  }
  days.push(i)
}
for (let i = 0; i <= 24; i++) {
  if (i < 10) {
    i = '0' + i
  }
  hours.push(i)
}

for (let i = 0; i <= 60; i++) {
  if (i < 10) {
    i = '0' + i
  }
  minutes.push(i)
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 组件的显示影藏
    getDate: false,
    // 时间
    years: years,
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    value: [9999, 0, 0, 0, 0],
    myDate: '2019年02月01日00时00分',
    // 单选多选
    index: 0,
    array: ['单选', '多选']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击时间显示piker组件
    showDate() {
      this.setData({
        getDate: true
      })
    },
    // 点击时间影藏piker组件
    hiddenDate() {
      this.setData({
        getDate: false
      })
    },
    // 点击选择时间
    bindChange: function(e) {
      const val = e.detail.value
      console.log(val)
      this.setData({
        year: this.data.years[val[0]],
        month: this.data.months[val[1]],
        day: this.data.days[val[2]],
        hour: this.data.hours[val[3]],
        minute: this.data.minutes[val[4]],
        myDate: this.data.years[val[0]] + '年' + this.data.months[val[1]] + '月' + this.data.days[val[2]] + '日' + this.data.hours[val[3]] + '时' + this.data.minutes[val[4]] + '分'
      })
    },
    // 选择投票类型
    bindPickerChange(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value
      })
    },
    // getResult(time, type) {
    //   const date = new Date(time);
    //   switch (type) {
    //     case 'datetime':
    //       return date.toLocaleString();
    //     case 'date':
    //       return date.toLocaleDateString();
    //     case 'year-month':
    //       return `${date.getFullYear()}/${date.getMonth() + 1}`;
    //     case 'time':
    //       return time;
    //     default:
    //       return '';
    //   }
    // }
  },
})