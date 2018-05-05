import uuid from 'uuid';
import database from '../firebase/firebase';
import axios from 'axios';


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
    return (dispatch, getState ) => {
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/coins`).once('value').then((snapshot) => {
            const coins = [];

     
            snapshot.forEach((childSnapshot) => {
                // let getCoinValue = async () => {

                //     const coinApi = `https://cors-anywhere.herokuapp.com/https://api.coinmarketcap.com/v1/ticker/${childSnapshot.val().name}`;
                //     let requestCoin;
                //     let type;

                //     try {
                //         requestCoin = await axios.get(coinApi);       
                //     }catch(error){
                //         console.log('error', error);
                //     }

                //     let newValue = requestCoin.data[0].price_usd * childSnapshot.val().amount;
                //     console.log(newValue)
                //     database.ref(`users/${uid}/coins/${childSnapshot.key}`).set(newValue)

                // }        

                // getCoinValue();
                coins.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });

            });

            dispatch(setCoins(coins));
        });
    };
};
