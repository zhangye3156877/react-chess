import imgChessType1 from '../../static/img/chess/chess_btn_go.png';
import imgChessType2 from '../../static/img/chess/chess_btn_gobang.png';
import imgGoBangL1 from '../../static/img/gmk/gmk_level/gmk_level_1_idle.png';
import imgGoBangL2 from '../../static/img/gmk/gmk_level/gmk_level_2_idle.png';
import imgGoBangL3 from '../../static/img/gmk/gmk_level/gmk_level_3_idle.png';
import imgGoBangL4 from '../../static/img/gmk/gmk_level/gmk_level_4_idle.png';
import imgGo1k from '../../static/img/gmk/go_level/1k.png';
import imgGo3k from '../../static/img/gmk/go_level/3k.png';
//import imgGo5k from '../../static/img/gmk/go_level/5k.png';
import imgGo7k from '../../static/img/gmk/go_level/7k.png';
//import imgGo9k from '../../static/img/gmk/go_level/9k.png';
import imgGo11k from '../../static/img/gmk/go_level/11k.png';
//import imgGo1d from '../../static/img/gmk/go_level/1d.png';
//import imgGo2d from '../../static/img/gmk/go_level/2d.png';
//import imgGo3d from '../../static/img/gmk/go_level/3d.png';
//import imgGo4d from '../../static/img/gmk/go_level/4d.png';
//import imgGo5d from '../../static/img/gmk/go_level/5d.png';
//import imgGo6d from '../../static/img/gmk/go_level/6d.png';
import imgChess1 from '../../static/img/gmk/gmk_role/stone_0.png';
import imgChess2 from '../../static/img/gmk/gmk_role/stone_1.png';
import imgChessChoosen1 from '../../static/img/gmk/gmk_role/stone_choosen_0.png';
import imgChessChoosen2 from '../../static/img/gmk/gmk_role/stone_choosen_1.png';



const initialState = {
  gameStep: 0,
  chessType: new Map(),
  chessTypeImg: new Map([
    [1, imgChessType1],
    [2, imgChessType2],
  ]),
  player: new Map([
    ['0', {
      id: '0',
      url: imgChess1,
      choosed:true,
      //choosedImgUrl: imgChessChoosen1
    }],
    ['1', {
      id: '1',
      url: imgChess2,
      //choosedImgUrl: imgChessChoosen2
    }]
  ]),
  gameLevel: {
    // 围棋暂时四级
    '1': new Map([
      ['-11', {
        id: '-11',
        url: imgGo11k,
        choosed: true
      }],
      ['-7', {
        id: '-7',
        url: imgGo7k
      }],
      ['-3', {
        id: '-3',
        url: imgGo3k
      }],
      ['-1', {
        id: '-1',
        url: imgGo1k
      }]
    ]),
    // 五子棋暂没2
    '2': new Map([
      ['0', {
        id: '0',
        url: imgGoBangL1,
        choosed: true
      }],
      ['1', {
        id: '1',
        url: imgGoBangL2
      }],
      ['3', {
        id: '3',
        url: imgGoBangL3
      }],
      ['4', {
        id: '4',
        url: imgGoBangL4
      }]
    ]),
  },
  options:[]
}

//action types
export const types = {
  SWITCH_GAMESTEP : 'GAME/SWITCH_GAMESTEP',
  SET_PLAYER: 'GAME/SET_PLAYER',
  SET_GAMELEVEL: 'GAME/SET_GAMELEVEL',
  SET_CHESSTYPE: 'GAME/SET_CHESSTYPE',
  SWITCH_OPTIONS: 'GAME/SWITCH_OPTIONS',
  SET_OPTIONS: 'GAME/SET_OPTIONS'
}

//action creators
export const actions = {
  //记录配置项，并切换下一项
  switchGameStep: (id) => ({
    type: types.SWITCH_GAMESTEP,
    id
  }),
  // setPlayer: (data) => ({
  //   type: types.SET_PLAYER,
  //   data
  // }),
  // setGameLevel: (data) => ({
  //   type: types.SET_GAMELEVEL,
  //   data
  // }),
  setChessType: (data) => ({
    type: types.SET_CHESSTYPE,
    data
  }),
  //切换选项
  switchOptons:(id) => ({
    type: types.SWITCH_OPTIONS,
    id
  }),
  // 设置给后台的具体配置
  setOptions:(keys, data) => ({
    type: types.SET_OPTIONS,
    keys,
    data
  })
} 

// selectors

export const getList = state => {
  let steps = state.game.gameStep;
  switch(steps) {
    case 0:
      return state.game.chessType;
    case 1:
      return state.game.player;
    case 2:
      // options0 为棋类选项 
      let chessType = state.game.options[0]['value'];
      return state.game.gameLevel[chessType];
    default: 
      return []
  }
};
export const getStep = state => {
  return state.game.gameStep;
};

//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SWITCH_GAMESTEP:
      return {...state, gameStep: ++state.gameStep}
    // case types.SET_PLAYER:
    //   return {...state, player: action.data}
    // case types.SET_GAMELEVEL:
    //   return {...state, gameLevel: action.data}
    case types.SET_CHESSTYPE:
      let chessType = state.chessType;
      action.data.map((item, index) => {
        if (index === 0) {
          chessType.set(item.id, {
            id: item.id,
            url: state.chessTypeImg.get(item.id),
            choosed: true
          })
        } else {
          chessType.set(item.id, {
            id: item.id,
            url: state.chessTypeImg.get(item.id)
          })
        }
      })
      return {...state, chessType: new Map(chessType)}
    case types.SWITCH_OPTIONS:
      let steps = state.gameStep;
      //console.log(steps)
      switch(steps) {
        case 0:
          return {...state, chessType: active(state.chessType, action.id)}
        case 1:
          return {...state, player: active(state.player, action.id)};
        case 2:
          let chessType = state.options[0]['value'];
          let obj = {...state.gameLevel};
          let maps = active(state.gameLevel[chessType], action.id);
          obj[chessType] = maps;
          return {...state, gameLevel: obj};
        default: 
          return state
      }

    case types.SET_OPTIONS:
      let optionsArray = [...state.options, {
        reg: action.keys,
        value: action.data
      }];
      return {...state, options: optionsArray}
    default: 
    return state
    
  }
} 

// function 切换激活效果
function active(maps, id) {
  for (let x of maps.values()) {
    if (x.choosed === true) {
      x.choosed = false;
    }
  }
  let obj = maps.get(id);
  obj.choosed = true;
  maps.set(id, obj);
  return new Map(maps);
}

export default reducer;