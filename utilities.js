var api={
    GetCryptoData(){
        var url = "https://api.coinmarketcap.com/v1/ticker/?limit=20";
        return fetch(url).then((response) => response.json())
        // console.log(this.state.cryptoData);  
    }
};

// export it
module.exports = api;
