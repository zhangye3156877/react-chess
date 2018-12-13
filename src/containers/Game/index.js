import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {getList, getStep, actions} from '../../redux/modules/game';
import {actions as appActions} from '../../redux/modules/app';
import GameItem from '../../components/GameItem';
import GameControl from '../GameControl';

import './style.scss';

class Game extends Component {
  //配置棋
  deployChess = (id) => {
    //console.log(this.props)
    switch(this.props.steps) {
        case 0:
          this.props.setOptions('chess', id);
          break;
        case 1:
          this.props.setOptions('role', id);
          break;
        case 2:
          this.props.setOptions('level', id);
          break;
        default: 
        return 
      }
    this.props.switchGameStep();
  }
  //切换选项-鼠标移入
  switchItem = (id) => {
    //console.log(id)
    this.props.switchOptons(id);
  }
  getStyle = (step) => {
    switch(step) {
      case 0:
        return {
          width: '50%'
        }
      case 1:
        return {
          width: '16%'
        }
      case 2:
        return {
          width: '30%'
        }
      default: 
        break;
    }
  }
  //
  componentWillMount = () => {
    //
    this.props.switchTitleImgFull(false);
  }
  
  componentWillUnmount = () => {
    console.log('game组件卸载');
    this.props.switchTitleImgFull(true);
  }
  
  render() {

    let {optionList, steps} = this.props;
    let list = [];
    console.log(optionList);
    optionList.forEach((item) => {
      list.push(
        <GameItem 
          key = {item.id}
          source = {optionList}
          setID = {this.deployChess.bind(null, item.id)}
          setChoosed = {this.switchItem.bind(null, item.id)}
          imgUrl = {item.url}
          choosedImgUrl = {item.choosedImgUrl}
          choosed = {item.choosed}
          style = {styles}
        />)
    })
    let styles = this.getStyle(steps);
    return <div className='chess-bg'>
        {
         <GameControl/>
          //steps < 3 ? list: <GameControl/>
        }
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    optionList: getList(state),
    steps: getStep(state), 
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(actions, dispatch),
    ...bindActionCreators(appActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);