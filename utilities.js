var api={
    GetCryptoData(){
        var url = "https://api.coinmarketcap.com/v1/ticker/?limit=10";
        return fetch(url).then((response) => response.json())
        // console.log(this.state.cryptoData);  
    }
};

module.exports = api;