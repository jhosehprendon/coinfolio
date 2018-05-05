import React from 'react';
import { connect } from 'react-redux';
import { startFetchCoins } from '../actions/coins';
import CoinListItem from './CoinListItem';

export const ConList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Coins</div>
            <div className="show-for-desktop">Coin</div>
            <div className="show-for-desktop">Amount</div>
        </div>
        <div className="list-body">
            {
                props.coins.length === 0 ? (
                    <div className="list-item list-item--message">
                        <span><p>No coins in your portafolio</p></span>
                    </div>
                ) : (

                    props.coins.map((coin)=> {

                        return <CoinListItem key={coin.id} {...coin} />
                    })
                )
            }
        </div>
    </div>   

)

const mapStateToProps = (state) => {
    return {
        coins: state.coins
    };
};



export default connect(mapStateToProps)(ConList);


// export const CoinList = (props) => (
//     <div className="content-container">
//         <div className="list-header">
//             <div className="show-for-mobile">Coins</div>
//             <div className="show-for-desktop">Coin</div>
//             <div className="show-for-desktop">Amount</div>
//         </div>
//         <div className="list-body">
//             {
//                 props.coins.length === 0 ? (
//                     <div className="list-item list-item--message">
//                         <span><p>No coins in your portafolio</p></span>
//                     </div>
//                 ) : (

//                     props.coins.map((coin)=> {

//                         return <CoinListItem key={coin.id} {...coin} />
//                     })
//                 )
//             }
//         </div>
//     </div>    
// );

// export default connect(mapStateToProps)(CoinList);



////////////////---------------------//////////////
///////////////---------///////


// getCoinValue = () => {

//     this.props.coins.map((coin)=> {

//         let getCoinValues = async () => {

//             const coinApi = `https://cors-anywhere.herokuapp.com/https://api.coinmarketcap.com/v1/ticker/${coin.name}`;
//             let requestCoin;
//             let type;
//             let total = coin.times;

//             try {
//                 requestCoin = await axios.get(coinApi); 
//                 type = "FETCH_COIN"       
//             }catch(error){
//                 console.log('error', error);
//             }

//             let newTimes = requestCoin.data[0].price_usd;

//             newTimes = newTimes * coin.amount;
//             console.log(newTimes)
//             console.log(total)

//             total = newTimes

//             this.setState(() => ({ times: total }));
//         }
//         getCoinValues();
//     })
// }


