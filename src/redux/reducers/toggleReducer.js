const initialState = { sidebarShow: true };

export const toggleReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE':
          return {
            ...state,
            sidebarShow:action.data
        };
        default:
          return state;
      }
}