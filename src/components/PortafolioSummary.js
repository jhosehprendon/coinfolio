import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
// import selectExpenses from '../selectors/expenses';
// import selectExpensesTotal from '../selectors/expenses-total';

export const PortafolioSummary = ({ portafolioTotal }) => {
  const formattedPortafolioTotal = numeral(portafolioTotal / 100).format('$0,0.00');
  
  return (
    <div className="page-header">
      <div className="content-container"> 
        <h1 className="page-header__title">Portafolio Balance: <span>{formattedPortafolioTotal}</span></h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">Add Coin to Portafolio</Link>
        </div>
      </div>  
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // portafolioTotal: selectExpensesTotal(visibleExpenses),
    portafolioTotal: 100000000
  };
};

export default connect(mapStateToProps)(PortafolioSummary);