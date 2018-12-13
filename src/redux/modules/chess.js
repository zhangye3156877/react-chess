const initialState = {
  white: new Map(),
  black: new Map(),
  chessPointer: [],//最新子落点及颜色
  whoIsPlaying:0 //当前将要下棋角色
};

// action types
export const types = {
  ADD_CHESS: "CHESS/ADD_CHESS",   // 点击添加棋子
  TRANSFORM_CHESS: "CHESS/TRANSFORM_CHESS" // 转变返回棋子数据结构
};

// action creators
export const actions = {
  addChess: (chessType, axis) => ({
    type: types.ADD_CHESS,
    chessType,
    axis
  }),
  //
  transform: (chessArrayBlack, chessArrayWhite) => ({
    type: types.TRANSFORM_CHESS,
    chessArrayBlack,
    chessArrayWhite
  })
};

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CHESS:
      let map_add, color_add, color_point,who;
      if (action.chessType === 0) {
        map_add = state.black;
        color_add = 'black';
        color_point = 'white';
        who = 1;
      } else {
        map_add = state.white;
        color_add = 'white';
        color_point = 'black'
        who = 0;
      }
      let [x_add, y_add] = action.axis;
      map_add.set([x_add, y_add], {
        id: `${x_add},${y_add}`,
        dx: x_add,
        dy: y_add,
        color: color_point
      })
      return { 
        ...state,
        whoIsPlaying: who,
        chessPointer:[x_add, y_add, color_add],
        [color_add]: new Map(map_add) };
    case types.TRANSFORM_CHESS:
      let mapb = new Map();
      let mapw = new Map();
      let chessArrayBlack = action.chessArrayBlack;
      let chessArrayWhite = action.chessArrayWhite;
      //console.log(chessArrayBlack,chessArrayWhite);
      for (let x = 0; x < chessArrayBlack.length; x += 2) {
        let [dx, dy] = [chessArrayBlack[x], chessArrayBlack[x+1]];
        mapb.set([dx, dy], {
          id: `${dx},${dy}`,
          dx,
          dy,
          color: 'black'
        })
      }
      for (let x = 0; x < chessArrayWhite.length; x += 2) {
        let [dx, dy] = [chessArrayWhite[x], chessArrayWhite[x+1]];
        mapw.set([dx, dy], {
          id: `${dx},${dy}`,
          dx,
          dy,
          color: 'white'
        })
      }
      
      return { ...state, black: new Map(mapb), white: new Map(mapw)};
    default:
      return state;
  }
};

export default reducer;


