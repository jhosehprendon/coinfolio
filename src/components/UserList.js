import React from 'react';
import { connect } from 'react-redux';
import { startFetchCoins } from '../actions/coins';
import UserListItem from './UserListItem';

export const UserList = (props) => (
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
                        
                        return <UserListItem key={coin.id} {...coin} />
                        
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



export default connect(mapStateToProps)(UserList);