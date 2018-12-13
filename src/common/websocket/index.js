class createWS {
  constructor(url, props) {
    this.ws = new WebSocket(url);
    this.origin = props;
    //是否显示了下棋过程的功能键
    this.showKbPlay = false;
    this.initEvent();
  }
  sendMessage(ws, data) {
    let data_ = JSON.stringify(data);
    ws.send(data_);
  }
  initEvent() {
    this.ws.onopen =  () => {
      console.log('websocket连接成功');
      if (this.origin.props.process === 'home') {
        this.sendMessage(this.ws, {
          cmd: 'page',
          page: 'home'
        })
      }
    };
    this.ws.onmessage = (e) => {
      let data;
      console.log(e.data);
      try {
        data = JSON.parse(e.data);
        if (typeof data !== 'object') {
          console.warn('warn:返回值不是对象类型');
          return
        }
        JSON.parse(e.data)
      } catch (error) {
        console.error('error:返回值不是标准json对象');
        return
      }
      console.log(data, this.origin.props.process);
      // 菜单页说明部分 
      if (this.origin.props.process === 'instrction') {
        if (data.key === 'ok') {
          if (this.origin.props.ifInstruction === false) {
            return;
          }
          this.origin.props.switchInstrction();
          this.origin.props.swithProcss('home');
        }
        return;
      }
      // 菜单页选择部分
      if (this.origin.props.process === 'home') {
        //msg 为chess 设置棋类
        if (data.msg === 'chess') {
          let chessArray = data.chess.map((item) => {
            
            return {
              id: item,
              url: `imgChessType${item}` 
            }
          })
          console.log(this.origin.props);
          this.origin.props.setChessType(chessArray);
        }
        if (data.key === 'left' || data.key === 'right' || data.key === 'up' || data.key === 'down') {
          this.origin.props.switchMode();
        } else if(data.key === 'ok') {
          
          if (this.origin.props.mode === 0) {
            this.sendMessage(this.ws, {
              cmd: 'page',
              page: 'chess'
            })
            this.origin.props.history.push('/game');
            this.origin.props.swithProcss('game');
          } else {
            this.origin.props.history.push('/setting');
            this.origin.props.swithProcss('setting');
          }
        } 
        return;
      } 
      // 游戏页设置部分
      if (this.origin.props.process === 'game') {
        let list = [...this.origin.props.optionList.keys()];
        let len = list.length;
        if (data.key === 'left' || data.key === 'up') {
          if (this.origin.state.chooseId <= 0) {
            this.origin.setState({
              chooseId: len - 1
            })
          } else {
            this.origin.setState({
              chooseId: --this.origin.state.chooseId
            })
          }
          this.origin.props.switchOptons(list[this.origin.state.chooseId]);
        } else if (data.key === 'right' || data.key === 'down') {
          if (this.origin.state.chooseId >= len - 1) {
            this.origin.setState({
              chooseId: 0
            })
          } else {
            this.origin.setState({
              chooseId: ++this.origin.state.chooseId
            })
          }
          this.origin.props.switchOptons(list[this.origin.state.chooseId]);
        } else if(data.key === 'ok') {
          //重置为首选项
          this.origin.setState({
            chooseId: 0
          })
          switch(this.origin.props.steps) {
            case 0:
              this.origin.props.setOptions('chess', list[this.origin.state.chooseId]);
              this.sendMessage(this.ws, {
                cmd: 'page',
                page: 'role'
              })
              break;
            case 1:
            console.log('role')
              this.origin.props.setOptions('role', list[this.origin.state.chooseId]);
              this.sendMessage(this.ws, {
                cmd: 'page',
                page: 'level'
              })
              break;
            case 2:
            console.log('level')
              this.origin.props.setOptions('level', list[this.origin.state.chooseId]);
              this.origin.props.swithProcss('play');
              this.sendMessage(this.ws, {
                cmd: 'page',
                page: 'play'
              })
              break;
            default: 
            return 
          }
          this.origin.props.switchGameStep();
        }
        return;
      } 
      // 游戏开始部分
      if (this.origin.props.process === 'play') {
        if (data.black) {
          this.origin.props.transform(data.black, data.white);
        }
        
        if (this.showKbPlay === false) {
          this.sendMessage(this.ws, {
            touch: 'kb_play'
          })
          this.showKbPlay = true;
        }
        if (data.touch === 'button') {
          if (data.key === 'ok') {
            this.sendMessage(this.ws, {
              cmd: 'key',
              key: 'ok'
            })
          }
        }
        return;
      }
    }
    this.ws.onerror = (e) => {
      console.log('error');
    }
    this.ws.onclose = (e) => {
      console.log('closed');
    }
  }
}

export default createWS;