class Chess {
  constructor(chessSprite,type, org, size, handler) {
    //起始点，终结点，点间隔，起始终结点误差范围,棋子大小
    this.startPoint = 46;
    this.endPoint = 958;
    this.interval = 50.667; 
    this.deviation = 10;
    //坐标轴数量
    this.dxy = 19;
    this.piceR = 20;
    this.color = ['#000000', '#ffffff'];
    this.type = 0;
    this.steps = 0;
    //棋子配置
    this.piceOptions = [
      //0黑 1白 黑子先行
     {
      type: 0,
      color: '#000000',
      txtColor: '#ffffff',
      maps: new Map()
     },
     {
      type: 1,
      color: '#ffffff',
      txtColor: '#000000',
      maps: new Map()
     }  
  ];
    this.chessSprite = chessSprite;
    this.chessSprite.size(size.width, size.height);
    this.chessSprite.on(type, org, handler);
  }
  //添加新的棋子请求
  add(data) {
    let {x, y, ifAxes} = data;
    // 如果不是坐标点，转换位坐标模式
    let dx, dy;
    if (!ifAxes) {
      [dx,dy] = this.transform(x,y);
    } else {
      dx = x;
      dy = y;
    }
    
    //验证是否为符合规则的坐标
    if(!this.rules(dx, dy)) {
      return false;
    }
    //根据坐标求出偏移量
    x = dx * this.interval + this.startPoint;
    y = dy * this.interval + this.startPoint;
    this.steps++;
    //数字文本偏移计算
    let x_ = x_ = x - this.piceR / 4 * this.steps.toString().length;
    let y_ = y - this.piceR / 2;
    this.draw({x, y, x_, y_});
    //添加到两种集合
    let maps = this.piceOptions[this.type]['maps'];
    maps.set(`${dx},${dy}`, {'step': maps.size + 1,'x': dx,'y' : dy});
    this.type = Number(!this.type);
    return [dx, dy];
  }
  /**
   * 规则 
   * 1 不可重复
   * 2 坐标在0-18内
   */
  rules(x, y) {
    if (x === undefined || y === undefined) {
      return false;
    }
    if (x < 0 || x > 18) {
      return false;
    }
    if (y < 0 || y > 18) {
      return false;
    }
    for(let v of this.piceOptions[0]['maps'].values()) {
      if (x === v.x && y === v.y) {
          return false;
      }
    }
    for(let v of this.piceOptions[1]['maps'].values()) {
        if (x === v.x && y === v.y) {
            return false;
        }
    }
    return true;
  }
  //把像素转为坐标
  transform(x, y) {
    let [countX, countY, startPoint, endPoint, interval, deviation] = [x, y, this.startPoint, this.endPoint, this.interval, this.deviation];
    if (countX < (startPoint - deviation) || countX > (endPoint + deviation) || countY < (startPoint - deviation) || countY > (endPoint + deviation)) {
        return [];
    }
    let axes;
    let arr = [countX, countY].map((v) => {
    let value = v;
    if (value < startPoint) {
      axes = 0;
    } else if (value > endPoint) {
      axes = this.dxy - 1;
    } else {
      axes = Math.round((value - startPoint) / interval);
    }
    return axes;
   });
   return arr;
  }
  //绘制棋子
  draw(data) {
    let {x,y,x_,y_} = data ;
    let type = this.type;
    let color = this.piceOptions[type]['color'];
    let txtColor = this.piceOptions[type]['txtColor'];
    let txt = this.steps;
    this.chessSprite.graphics.drawCircle(x, y, this.piceR, color);
    this.chessSprite.graphics.fillText(`${txt}`, x_, y_, `${this.piceR}px Arial`, txtColor);
  }
}

export default Chess;