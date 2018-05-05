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
        case 'REMOVE_COIN':
        return state.filter(({id}) => {
            return id !== action.id;
        }) ;
        case 'EDIT_COIN':
            return state.map((coin) => {
                if(coin.id === action.id) {
                    return {
                        ...coin,
                        ...action.updates,
                        selectedRemove
                    };
                } else {
                    return coin;
                }
            });
        default:
            return state;
    }
};

export default coinsReducer;