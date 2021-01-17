var moment = require('moment');

module.exports.parse = (message) => {
  let data = message.toString();

  // will need to change this with split(regex)
  let tempArr = data.split(",");
  tempArr[0] = tempArr[0].replace("[", "");
  tempArr[0] = tempArr[0].replace("]", ",");
  tempArr[0] = tempArr[0].split(",");
  tempArr = [].concat(...tempArr);

  let finalArray = [];

  for (let i = 1; i < tempArr.length; i++) {
    let jsonObject = {
      DeviceId: Number,
      Output: Number,
      Status: Number,
      Date_time: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    };

    jsonObject.DeviceId = tempArr[0];
    jsonObject.Output = i;
    jsonObject.Status = tempArr[i];
    finalArray.push(jsonObject);
  }

  finalArray = finalArray.map((item) => Object.values(item));
  return finalArray;
};
