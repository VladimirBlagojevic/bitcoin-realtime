const btnBox=document.querySelector('.content__switch-curency');
const curency=document.querySelector('.content__curency-name');
const curencyFull=document.querySelector('.content__curency-full-name');
const btnBtc=document.getElementsByClassName('content__btn')[0];
const btnEur=document.getElementsByClassName('content__btn')[1];
const curencyValue=document.querySelector('.content__money');
const convertBtn=document.querySelector('.content__convert-box');
const input=document.querySelector('.content__input');
let bitcoinData;

//setup event listeners
btnBox.addEventListener('click', switchCurency);
convertBtn.addEventListener('click', convertToCurency);

function switchCurency(event) {
    // check which button is clicked (event delegation)
    if(event.target.textContent === 'EUR'){
        // change UI to EURO
        changeToEuro();
        // get bitcoin value in euro from api
        getBitcoin().then(data => {
            bitcoinData=data;
            curencyValue.textContent=(bitcoinData.bpi.EUR.rate_float).toFixed(2); 
            input.value='1';
        });
        
    } else if(event.target.textContent === 'USD'){
        //Change UI to Bitcoin
        changeToBitcoin();
        // get bitcoin value in US Dollars from api
        getBitcoin().then(data => {
            bitcoinData=data;
            curencyValue.textContent=(bitcoinData.bpi.USD.rate_float).toFixed(2); 
            input.value='1';
        });
    }
}
// Calculate value for inputed amount of bitcoins and display it in the UI
function convertToCurency(){
    // for dollars
    if(curency.textContent === 'USD'){
        getBitcoin().then(data => {
            bitcoinData=data;
            curencyValue.textContent=((bitcoinData.bpi.USD.rate_float)* parseInt(input.value)).toFixed(2); 
        });
    //for euros
    } else if(curency.textContent === 'EUR'){
        getBitcoin().then(data => {
            bitcoinData=data;
            curencyValue.textContent=((bitcoinData.bpi.EUR.rate_float)* parseInt(input.value)).toFixed(2); 
        });
    }
}

function changeToEuro(){
    btnEur.classList.add('content__btn--Eur');
    btnBtc.classList.remove('content__btn--Btc');
    curency.textContent='EUR';
    curencyFull.textContent='Euro';
}

function changeToBitcoin(){
    btnEur.classList.remove('content__btn--Eur');
    btnBtc.classList.add('content__btn--Btc');
    curency.textContent='USD';
    curencyFull.textContent='US Dollar';
}

// Async function to fetch data from Bitcoin api
async function getBitcoin(cur){
    try{
        const value= await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        const data= await value.json();
        return data; 
    }
    catch(error) {
        alert(error);
    } 
}
// get bitcoin value when app starts
getBitcoin().then(data => {
    bitcoinData=data;
    curencyValue.textContent=(bitcoinData.bpi.USD.rate_float).toFixed(2); 
})


