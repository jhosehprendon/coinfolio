import React from 'react';
import { Link } from 'react-router-dom';
import numeral from 'numeral';

const CoinListItem = ({ name, amount, id }) => (
    <Link className="list-item" to={`/edit/${id}`}>
        <div>
            <h3 className="list-item__title">{name}</h3>
        </div>
        <h3 className="list-item__data">{numeral(amount / 100).format('$0,0.00')}</h3>
    </Link> 
);

export default CoinListItem;