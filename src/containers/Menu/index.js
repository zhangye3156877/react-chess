import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {Route, withRouter} from "react-router-dom";
import {actions as appActions} from '../../redux/modules/app';
import {actions as gameActions} from '../../redux/modules/game';
import './style.scss';
import  btn_game from '../../static/img/home/home_btn_game.png';
import  btn_config from '../../static/img/home/home_btn_config.png';

class Menu extends Component {
  toGame = (e) => {
    
    e.stopPropagation();
    this.props.setChessType([
      {
        id: 1,
        url: `imgChessType${1}` 
      },
      {
        id: 2,
        url: `imgChessType${2}` 
      }
    ]);
    this.props.swithProcss('game');
    this.props.history.push('/game')

  }
  switchInstruction = () => {
    this.props.switchInstrction()
  }
  render() {
    let mode = this.props.mode;
    let instruction = <div className="instruction"></div>;
    let menu = <div>
      <Route to="/game">
          <div className="goGame">
            <img 
              onClick={this.toGame}
              src={btn_game} 
              alt="" className={mode === 1 ? "" : "actived"}/>
          </div>  
        </Route>
        <Route to="/setting">
          <div className="goSetting">
            <img src={btn_config} alt="" className={mode === 0 ? "" : "actived"}/>
          </div>
        </Route>
    </div>;
    return(
      <div className="menu-wrap" onClick={this.switchInstruction}>
        {
          this.props.ifInstruction ? instruction : menu
        }
      </div> 
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    ifInstruction: state.app.ifInstruction,
    mode: state.app.mode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(appActions, dispatch),
    ...bindActionCreators(gameActions, dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));