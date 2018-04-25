const coinsReducerDefaultState = [ ];

const coinsReducer = (state = coinsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_COIN':
            return [
                ...state,
                action.coin
            ];
        case 'SET_COINS':
            return action.coins;   
        default:
            return state;
    }
};

export default coinsReducer;