export function mapObject(object, callback) {
  return Object.keys(object).map(function (key) {
    return callback(key, object[key]);
  });
}

function zeroPad(str, len){
  if(typeof str !== 'string') str = ''
  if(typeof len !== 'number') len = 1
  for(var i = 0; i < len; i++) str = '0' + str
  return str.substr(str.length-len)
}

export function time12To24(time){
  if(typeof time !== 'string') return '00:00'
  if(time.length != 8) alert('time12To24 err:'+time)
  if(time.substr(0,2) === '12') time = '00' + time.substr(2)
  if(time.substr(6,2) === 'AM') return time.substr(0, 5)
  return (parseInt(time.substr(0,2)) +  12) + time.substr(2, 3)
}

export function time24To12(time){
  if(typeof time !== 'string') return '00:00 AM'
  if(parseInt(time.substr(0, 2)) < 12){
    if(parseInt(time.substr(0, 2)) == 0) time = '12' + time.substr(2)
    return time + ' AM'
  }
  time = zeroPad('' + (parseInt(time.substr(0, 2)) - 12), 2) + time.substr(2) + ' PM'
  if(parseInt(time.substr(0, 2)) == 0) time = '12' + time.substr(2)
  return time
}

export function timeAdd(time, min){
  if(typeof time !== 'string') time = '00:00'
  if(typeof min !== 'number') min = 0
  if(time.length == 8) time = time12To24(time)
  if(time.length != 5) time = '00:00'
  min = min + timeVal(time)
  return zeroPad(parseInt(min / 60) % 24 + ':' + zeroPad('' + min % 60, 2), 5)
}

export function timeVal(time){
    if(typeof time !== 'string') time = '00:00'
    if(time.length == 8) time = time12To24(time)
    return parseInt(time.substr(0, 2)) * 60 +  parseInt(time.substr(3, 2))
}
