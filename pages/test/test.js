const date = new Date()
const days = ['今天','明天','后天']
const hours = []
const minutes = ['00', '10', '20', '30', '40', '50']
for (let i = 0; i <= 23; i++) {
  hours.push(i)
}

Page({
  data: {
    days: days,
    hours: hours,
    minutes: minutes,
    value: [0, 0, 0],
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.days[val[0]],
      month: this.data.hours[val[1]],
      day: this.data.minutes[val[2]]
    })
  }
})
