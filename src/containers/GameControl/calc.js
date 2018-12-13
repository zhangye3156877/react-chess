function calc(self, opponent) {
  let s = self;
  let o = opponent;
  //四个搜索方向
  let dx = [0,1,1,1];
  let dy = [1,1,0,-1];
  let num = 4;
  let endX1 = 0;
  let endY1 = 0;
  let endX2 = 0;
  let endY2 = 0;
  //双正反手第一个子
  let startPointS = [];
  let startPointO = [];
  while (num > 0) {
    for (let v of s.values()) {
      let x = v.x;
      let y = v.y;
      for (let z = 0; z < 4; z++) {
        let count = 0;
        let a = x;
        let b = y;
        if (num === 1) {
          startPointS.push(
            [a + 1 * dx[z], b + 1 * dy[z]],
            [a - 1 * dx[z], b - 1 * dy[z]],
          )
        }
        let str = `${a + dx[z]},${b + dy[z]}`;
        //正向
        while (s.has(str)) {
            count++;
            a = a + 1 * dx[z];
            b = b + 1 * dy[z]; 
            str = `${a},${b}`;
            endX1 = a;
            endY1 = b;
        }
        a = x;
        b = y;
        str = `${a - dx[z]},${b - dy[z]}`;
        //反向
        while (s.has(str)) {
            count++;
            a = a - 1 * dx[z];
            b = b - 1 * dy[z];
            str = `${a},${b}`;
            endX2 = a;
            endY2 = b;
        }
        //
        if (count > num - 1) {
          let result = ifCanUse([[endX1,endY1],[endX2,endY2]], [s, o]);
          if (result) {
            console.log(result)
            return result;
          }
        }
      }
    }
    for (let v of o.values()) {
      let x = v.x;
      let y = v.y;
      for (let z = 0; z < 4; z++) {
        let count = 0;
        let a = x;
        let b = y;
        if (num === 1) {
          startPointO.push(
            [a + 1 * dx[z], b + 1 * dy[z]],
            [a - 1 * dx[z], b - 1 * dy[z]],
          )
        }
        let str = `${a + dx[z]},${b + dy[z]}`;
        //正向
        while (o.has(str)) {
            count++;
            a = a + 1 * dx[z];
            b = b + 1 * dy[z]; 
            str = `${a},${b}`;
            endX1 = a;
            endY1 = b;
        }
        a = x;
        b = y;
        str = `${a - dx[z]},${b - dy[z]}`;
        //反向
        while (o.has(str)) {
            count++;
            a = a - 1 * dx[z];
            b = b - 1 * dy[z];
            str = `${a},${b}`;
            endX2 = a;
            endY2 = b;
        }
        //
        if (count > num - 1) {
          let result = ifCanUse([[endX1,endY1],[endX2,endY2]], [s, o]);
          if (result) {
            console.log(result)
            return result;
          }
        }
      }
    }
    num--;
  }
  console.log('未找到点')
  if (startPointS.length > 0) {
     return ifCanUse(startPointS, [s,o]);
  } else if(startPointO.length > 0){
    return ifCanUse(startPointO, [o,s]);
  } else {
    console.log('空场'); 
    return [9,9];
  }
}

function ifCanUse(axes, maps) {
  let min = 0;
  let max = 18;
  outLabel:for (let item of axes) {
    if (item[0] > max || item[0] < min || item[1] > max || item[1] < min) {
      continue;
    } 
    let str = `${item[0]},${item[1]}`;
    for(let m of maps) {
      if (m.has(str)) {
        continue outLabel;
      }
    }
    return item;
  }
  return false;
}

export default calc;