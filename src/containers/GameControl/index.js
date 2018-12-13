import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
//import Konva from 'konva';
import { Stage, Layer, Line, Image, Circle, Rect} from 'react-konva';
import WaringForChess from '../../components/WarningForChess'
import {actions} from '../../redux/modules/chess';

import './style.scss';
import imgBg from '../../static/img/gmk/gmk_play/vboard.png';
class GameControl extends Component {
  state = {
    image:null,
    interval: 36.1, //格子规格
    topMargin: 101, //边距
    leftMargin: 93,
    showWarningForChess:false,
    axisForWarn:[]
  }
  _showWarningForChess(x,y){
    let cx,cy;
    cx = x * this.state.interval + this.state.leftMargin;
    cy = y * this.state.interval + this.state.topMargin;
    this.setState({
      showWarningForChess: !this.state.showWarningForChess,
      axisForWarn:[cx, cy]
    })
  }
  handleClick = (e) => {
    let x = e.evt.offsetX;
    let y = e.evt.offsetY;
    let state = this.state;
    if (x > 835 || x < state.leftMargin || y > 853 || y < state.topMargin) {
      return;
    }
    x = Math.round((x - state.leftMargin) / state.interval);
    y = Math.round((y - state.topMargin) / state.interval);
    this.props.addChess(this.props.who, [x,y]);

    //test for show warning
    this._showWarningForChess(x, y);
  }
  handleKeydonwn (e){
    console.log(e)
  }
  //计算坐标
  computedAxies = (x, y) => {
    let dx ,dy;
    let state = this.state;
    //根据坐标求出偏移量
    dx = x * state.interval + state.leftMargin;
    dy = y * state.interval + state.topMargin;
    //数字文本偏移计算
    //let x_ = x_ = x - this.piceR / 4 * this.steps.toString().length;
    //let y_ = y - this.piceR / 2;
    return [dx, dy];
  }

  componentDidMount() {
    //window.addEventListener('keydown',this.handleKeydonwn,false);
    const image = new window.Image();
    image.src = imgBg;
    image.onload = () => {
      this.setState({
        image: image
      });
    };
  }
  render() {
    //console.log(this.props.chessArray);
    let blackArray = this.props.black;
    let whitekArray = this.props.white;
    let chessPointer = this.props.chessPointer;
    let shamps = []
   
    blackArray.forEach((item) => {
      let [x,y] = this.computedAxies(item.dx, item.dy);
       shamps.push(
        <Circle 
              key={item.id}
              x={x} 
              y={y}
              radius={15} 
              fill= {item.color}
            />
        );
      })
      whitekArray.forEach((item) => {
        let [x,y] = this.computedAxies(item.dx, item.dy);
        shamps.push(
         <Circle 
               key={item.id}
               x={x} 
               y={y}
               radius={15} 
               fill= {item.color}
             />
        );
      })
      if (chessPointer.length > 0 ) {
        let [px, py] = this.computedAxies(chessPointer[0], chessPointer[1]);
        let color = chessPointer[2];
        console.log(px,py,color)
        shamps.push(
          <Line
              key={`${px}${py}`}
              points={[
                px - 10, py,
                px + 10, py, 
                px, py, 
                px, py + 10,
                px, py - 10
              ]}
              stroke={color}
          />
        )
      }
      
    
    return(
      //<div style={{position:'relative'}}>
        <Stage width={835} height={853}
        onClick = {this.handleClick}
        >
          <Layer>
            <Image
              image={this.state.image}
              width={835}
              height={853}
            />
          </Layer>
          <Layer>
            {
            shamps
            }
          </Layer>
           {
             this.state.showWarningForChess &&
            <WaringForChess
             axisForWarn={this.state.axisForWarn}
            />
           }
        </Stage>
      //</div>  
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    white: state.chess.white,
    black: state.chess.black,
    who: state.chess.whoIsPlaying,
    chessPointer: state.chess.chessPointer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(actions, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GameControl);