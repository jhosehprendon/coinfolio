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
            amount=0,
            times=0
        } = coinData;
        const coin = {name, amount, times};

        return database.ref(`users/${uid}/coins`).push(coin).then((ref) => {
            dispatch(addCoin({
                id: ref.key,
                ...coin
            }));
        })
    };
};

// SET COINS
export const setCoins = (coins) => ({
    type: 'SET_COINS',
    coins
});

export const startSetCoins = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/coins`).once('value').then((snapshot) => {
            const coins = [];

            snapshot.forEach((childSnapshot) => {
                coins.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setCoins(coins));
        });
    };
};