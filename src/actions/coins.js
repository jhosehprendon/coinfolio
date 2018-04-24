import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_COIN Action creator
export const addCoin = (coin) => ({
    type: 'ADD_COIN',
    coin
});

export const startAddCoin = (coinData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            name="",  
            amount=0
        } = coinData;
        const coin = {name, amount};

        return database.ref(`users/${uid}/coins`).push(coin).then((ref) => {
            dispatch(addCoin({
                id: ref.key,
                ...coin
            }));
        })
    };
};