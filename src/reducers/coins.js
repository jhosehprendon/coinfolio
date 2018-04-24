const coinsReducerDefaultState = [ ];

const coinsReducer = (state = coinsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_COIN':
            return [
                ...state,
                action.coin
            ];
        default:
            return state;
    }
};

export default coinsReducer;