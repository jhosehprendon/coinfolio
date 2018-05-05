export default (coins) => {
    return coins
    .map((coin) => coin.times)
    .reduce((sum, value) => {
        return sum + value;
    }, 0);
};