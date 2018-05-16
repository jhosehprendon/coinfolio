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
                let getCoinValue = async () => {

                    const coinApi = `https://cors-anywhere.herokuapp.com/https://api.coinmarketcap.com/v1/ticker/${childSnapshot.val().name}`;
                    let requestCoin;
                    let type;

                    try {
                        requestCoin = await axios.get(coinApi);       
                    }catch(error){
                        console.log('error', error);
                    }

                    let newValue = requestCoin.data[0].price_usd * childSnapshot.val().amount;
                    database.ref(`users/${uid}/coins/${childSnapshot.key}/times`).set(newValue)

                }        

                getCoinValue();
                coins.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });

            });

            dispatch(setCoins(coins));
        });
    };
};

// REMOVE_COIN Action creator
export const removeCoin = ({ id } = {}) => ({
    type: 'REMOVE_COIN',
    id
});

export const startRemoveCoin = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/coins/${id}`).remove().then(() => {
            dispatch(removeCoin({ id }));
        });
    };
};

// EDIT_COIN Action creator
export const editCoin = (id, updates, selectedRemove) => ({
    type: 'EDIT_COIN',
    id,
    updates,

});

export const startEditCoin = (id, updates, selectedRemove) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/coins/${id}`).update(updates).then(() => {
            dispatch(editCoin(id, updates));
        });
    };
};


// // FETCH_ALL_COINS Action creator
// export const fetchAllCoins = (coinlist) => ({
//     type: 'FETCH_ALL_COINS',
//     payload: coinlist
// });

// export const startFetchAllCoins = () => {
//     return async (dispatch) => {
//         const allCoinsApi = 'https://cors-anywhere.herokuapp.com/https://api.coinmarketcap.com/v1/ticker/';
//         let requestAllCoins;

//         try {
//             requestAllCoins = await axios.get(allCoinsApi); 
//         }catch(error){
//             console.log('error', error);
//         }

//         let arrayAllCoins = requestAllCoins.data.map(x => {
//             return (x.name)
//         });

//         let coinlist = arrayAllCoins;
//         console.log(coinlist)

//         dispatch(fetchAllCoins(coinlist));
//     };
// };