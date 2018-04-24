export default (coins) => {
    return coins
    .map((coin) => coin.amount)
    .reduce((sum, value) => {
        return sum + value;
    }, 0);
};