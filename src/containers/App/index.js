import React, {Component} from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {Route,  withRouter} from "react-router-dom";
import Menu from '../Menu';
import Game from '../Game';
import Setting from '../Setting';
import createWS from '../../common/websocket';
import {actions} from '../../redux/modules/app';
import {actions as gameActions, getList, getStep} from '../../redux/modules/game';
import {actions as chessActions} from '../../redux/modules/chess';
import './reset.scss';
import './style.scss';
import logoFullImg from '../../static/img/logo/logo_full.png';
import logoImg from '../../static/img/logo/logo.png';


class App extends Component{
  state = {
    socketUrl : process.env.NODE_ENV === 'development' ?
    'ws://192.168.1.81:8080/aigoface/websocket' : 'ws://127.0.0.1:8080/aigoface/websocket',
    chooseId: 0,
  }
  
  componentDidMount = () => {
    
    //const ws = new WebSocket("ws://127.0.0.1:8001");
    //const ws = new WebSocket(this.state.socketUrl);
    //this.props.connectSocket(ws);
    //new createWS(this.state.socketUrl, this);
    
  }
  render() {
    let titleImg;
    this.props.ifTitleImgFull ? titleImg = logoFullImg : titleImg = logoImg;
    return <div className="bg">
        <div className="title">
          <img src={titleImg} alt=""/>
        </div>
        <div className="content">
          <Route exact path="/" component={Menu} />
          <Route path="/game" component={Game}/>
          <Route path="/setting" component={Setting}/>
        </div>
    </div>
  }
}

const mapStateToProps = (state, props) => {
  return {
    ifInstruction: state.app.ifInstruction,
    ifTitleImgFull: state.app.ifTitleImgFull,
    process: state.app.process,
    mode: state.app.mode,
    steps: getStep(state), 
    optionList: getList(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(actions, dispatch),
    ...bindActionCreators(gameActions, dispatch),
    ...bindActionCreators(chessActions, dispatch),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));