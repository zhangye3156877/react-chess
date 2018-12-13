const initialState = {
  ifInstruction: true,  // 显示说明书
  ifTitleImgFull: true, //显示大标题
  globalWekSocket:null, //websoket
  process: 'instrction', //instrction home game setting play
  mode: 0 //0进入游戏 1进入设置
};

// action types
export const types = {
  SWITCH_INSTRUCTION: "APP/SWITCH_INSTRUCTION",   // 切换显示说明书
  SWITCH_TITLEIMGFULL: "APP/SWITCH_TITLEIMGFULL",  
  CONNECT_SOCKET: "APP/CONNECT_SOCKET" ,
  SWITCH_PROCESS: "APP/SWITCH_PROCESS",
  SWITCH_MODE: "APP/SWITCH_MODE",
};

// action creators
export const actions = {
  switchInstrction: () => ({
    type: types.SWITCH_INSTRUCTION
  }),
  switchTitleImgFull: (bol) => ({
    type: types.SWITCH_TITLEIMGFULL,
    bol
  }),
  connectSocket: (ws) => ({
    type: types.CONNECT_SOCKET,
    ws
  }),
  swithProcss: (process) => ({
    type: types.SWITCH_PROCESS,
    process
  }),
  switchMode: () => ({
    type: types.SWITCH_MODE,
  })
};

// selectors
// export const getInstruction = state => {
//   return state.app.ifInstruction;
// };
// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SWITCH_INSTRUCTION:
      return { ...state, ifInstruction: !state.ifInstruction };
    case types.SWITCH_TITLEIMGFULL:
      return { ...state, ifTitleImgFull: action.bol};
    case types.CONNECT_SOCKET:
      return { ...state, ws: action.ws};
    case types.SWITCH_PROCESS:
      return { ...state, process: action.process};
    case types.SWITCH_MODE:
      return { ...state, mode: state.mode === 0 ? 1 :0};
    default:
      return state;
  }
};

export default reducer;


