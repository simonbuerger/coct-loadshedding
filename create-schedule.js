const {highestStage, numAreaCodes, LoadSheddingSchedule} = require('./loadshedding');
const fs = require('fs');

const scheduler = new LoadSheddingSchedule();

for (let h = 1; h <= numAreaCodes; h++) {
  const data = {
    days: {},
  }
  for (let i = 1; i <= 31; i++) {
    if (!data.days[i]) {
      data.days[i] = {};
    }
    for (let j = 1; j <= highestStage; j++) {
      data.days[i][j] = scheduler.getTimeSlotsByAreaCode(j, i, h)
    }
  }
  fs.writeFileSync(`./dist/${h}.json`, JSON.stringify({
    data,
  }));
}
