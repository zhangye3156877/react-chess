import Background from './component/background';
import Chess from './component/chess';
import calc from './utils/calc';

class Main {
    constructor() {
        this.width =1200;
        this.height = 1000;
        this.bgSprite = new Laya.Sprite();
        this.chessSprite = new Laya.Sprite();
        this.menu = null;
        //模式 1双人 2人机
        this.mode = 2;
        //锁 用于非双人模式 对方下子时锁定
        this.lock = false;
        this.init();
    }
    //初始化
    init() {
        //载入不同容器 棋盘 棋子
        Laya.init(this.width, this.height, Laya.WebGL);
        Laya.stage.addChild(this.bgSprite);
        Laya.stage.addChild(this.chessSprite);
        //实例棋盘
        this.bg = new Background(this.bgSprite);
        //实例棋子
        this.chess = new Chess(
            this.chessSprite,
            Laya.Event.CLICK,this,
            {width:1000,height:1000},
            this._handleGoChess);
    }
    //下棋
    goChess(x, y, ifAxes) {
        let result = this.chess.add({
            x,
            y,
            ifAxes
        })
        let dx, dy;
        if (result) {
            [dx, dy] = result;
        } else {
            return false;
        }
        //走完该步判断是否胜出
        this._ifWin({
            x: dx,
            y: dy
        });
        return true;
    }
    //胜利
    win(type) {
        let str = type === 0 ? '黑棋胜利' : '白旗胜利';
        alert(str);
    }
    //电脑或网络走棋
    _opponentGoChess() {
        let type = this.chess.type;
        let type_ = Number(!this.chess.type);
        let map1 = this.chess.piceOptions[type]['maps'];
        let map2 = this.chess.piceOptions[type_]['maps'];
        let r = calc(map1, map2);
        let x = r[0]
        let y = r[1]
        let xx =this.goChess(x, y, true);
        this.lock = false;
    }
    //走棋
    _handleGoChess() {
        if (this.lock) {
            return
        }
        let [x, y] = [this.chessSprite.mouseX, this.chessSprite.mouseY];
        //调用实例走棋方法
        let goSuccess = this.goChess(x, y);
        if (goSuccess && this.mode === 2) {
            this.lock = true;
            this._opponentGoChess();
        }
    }
    //是否胜出
    _ifWin(data) {
      let {x, y} = data;
      let type = Number(!this.chess.type);
      let mp = this.chess['piceOptions'][type]['maps'];
      
      //四个搜索方向
      let dx = [0,1,1,1];
      let dy = [1,1,0,-1];
      for (let z = 0; z < 4; z++) {
          let count = 0;
          let a = x;
          let b = y;
          let str = `${a + dx[z]},${b + dy[z]}`;
          //正向
          while (mp.has(str)) {
              count++;
              a = a + 1 * dx[z];
              b = b + 1 * dy[z]; 
              str = `${a},${b}`;
          }
          a = x;
          b = y;
          str = `${a - dx[z]},${b - dy[z]}`;
          //反向
          while (mp.has(str)) {
              count++;
              a = a - 1 * dx[z];
              b = b - 1 * dy[z];
              str = `${a},${b}`;
          }
          //一轴五子胜出
          if (count > 4) {
              this.win(type);
              return true;
          }
      }
      return false;
    }
}

new Main();

