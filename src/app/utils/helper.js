export function mapObject(object, callback) {
  return Object.keys(object).map(function (key) {
    return callback(key, object[key]);
  });
}

export function time12To24(time){
  if(time.length != 8) alert('time12To24 err:'+time)
  if(time.substr(0,2) === '12') time = '00' + time.substr(2)
  if(time.substr(6,2) === 'AM') return time.substr(0, 5)
  return (parseInt(time.substr(0,2)) +  12) + time.substr(2, 3)
}

export function time24To12(time){
  if(parseInt(time.substr(0, 2)) < 12){
    if(parseInt(time.substr(0, 2)) == 0) time = '12' + time.substr(2)
    return time + ' AM'
  }
  var h = '0' + (parseInt(time.substr(0, 2)) - 12)
  time = h.substr(h.length - 2) + time.substr(2) + ' PM'
  if(parseInt(time.substr(0, 2)) == 0) time = '12' + time.substr(2)
  return time
}
