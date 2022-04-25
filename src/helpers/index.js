export const convertISO8601ToHMS = time => {
  // convert ISO8601 to HMS (eg: PT2H3M18S -> 2:03:18)
  let reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
  let hours = 0, minutes = 0, seconds = 0, totalseconds;

  if (reptms.test(time)) {
    let matches = reptms.exec(time);
    if (matches[1]) hours = Number(matches[1]);
    if (matches[2]) minutes = Number(matches[2]);
    if (matches[3]) seconds = Number(matches[3]);
    totalseconds = hours * 3600  + minutes * 60 + seconds;

    let start, end = 19
    if (totalseconds < 600) start = 15
    else if (totalseconds < 3600) start = 14
    else if (totalseconds < 36000) start = 12
    else start = 11

    return new Date(totalseconds * 1000).toISOString().substring(start, end);
  }

  // 'P0D' stands for live streaming
  if (time === 'P0D') return 'live'

  // throw error if expection exists
  throw Error(`Unable to convert: ${time}`)
}

export const convertTimeToTimeAgo = time => {
  const secSinceThen = Math.floor((Date.now() - new Date(time)) / 1000)
  
  const oneMinInSec = 60
  const oneHourInSec = oneMinInSec * 60
  const oneDayInSec = oneHourInSec * 24
  const oneWeekInSec = oneDayInSec * 7
  const oneMonthInSec = oneDayInSec * 30
  const oneYearInSec = oneDayInSec * 365

  if (secSinceThen < oneMinInSec){
    return `${Math.floor(secSinceThen / oneSecInSec)} 秒前`
  } else if (secSinceThen < oneHourInSec){
    return `${Math.floor(secSinceThen / oneMinInSec)} 分鐘前`
  } else if (secSinceThen < oneDayInSec){
    return `${Math.floor(secSinceThen / oneHourInSec)} 小時前`
  } else if (secSinceThen < oneWeekInSec){
    return `${Math.floor(secSinceThen / oneDayInSec)} 天前`
  } else if (secSinceThen < oneMonthInSec){
    return `${Math.floor(secSinceThen / oneWeekInSec)} 週前`
  } else if (secSinceThen < oneYearInSec){
    return `${Math.floor(secSinceThen / oneMonthInSec)} 個月前`
  } else {
    return `${Math.floor(secSinceThen / oneYearInSec)} 年前`
  }
}

export const convertNumToApproxChNum = num => {
  if (num < 10**4){
    return `${num}`
  } else if (num < 10**5){
    return `${Math.floor(num / 10**3) / 10}萬`
  } else if (num < 10**8){
    return `${Math.floor(num / 10**4)}萬`
  } else if (num < 10**9){
    return `${Math.floor(num / 10**7) / 10}億`
  } else if (num < 10**12){
    return `${Math.floor(num / 10**8)}億`
  }
}