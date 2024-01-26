//project breakdown
//1. deposit some money
//2. determine number of lines to bet on
//3. collect a bet amount
//4. spin the slot machine ....key notes
//5. check if a user won
//6. give the user their winnings
//7. play again

//importing the package we installed 
const prompt= require("prompt-sync")();

// object for spinning the machine

const ROWS =4;
const COLUMNS=4;


//The number of alphabet we will have when we spin the machine randomly
const SYMBOLS_COUNT={
    A:2,
    B:4,
    C:6,
    D:8,
    E:10
};

//the multiplier, the odss that is going to be multiplied by the users bet
const SYMBOL_VALUES={
    A:5,
    B:4,
    C:3,
    D:2,
    E:1

};





// 1. deposit some amount 
const deposit = ()=> {
    while (true) {
    const depositAmount= prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    //if the numberdeposited is a number or if it is less than or equal to zero
    if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        console.log("invalid deposit amount, try again.");
    }else{
        return numberDepositAmount;    
    }
}
};


//2. getting the number of lines
const getNumberOfLines = ()=>{
    while(true){
    const lines= prompt("Enter the number of lines to bet on (1-4): ");
    const numberOfLines=parseFloat(lines);

    if (isNaN(numberOfLines) || numberOfLines <=0 || numberOfLines >4){
        console.log("invalid number of lines, try again.");
    }else{
        return numberOfLines;
    }
 }
};

 

//3. determining the amount of money used to bet, this is going to be based on the users balance
// the amount of money that is going to be used to bet will be divided by the number of lines to bet on
const getBet=(balance, lines) =>{
    while(true){
    const bet= prompt("Enter the bet per line: ");
    const numberBet=parseFloat(bet);  //converting a string into a decimal number

    if (isNaN(numberBet) || numberBet <=0 || numberBet > balance / lines){
        console.log("invalid bet, try again.");
    }else{
        return numberBet;
    }
 }
};


//. 4 spinning the slot machine
const spin=() =>{
    const symbols=[];  //original available symbols
    for(const[symbol, count] of Object.entries(SYMBOLS_COUNT)){
      for (let i=0; i < count; i++){
        symbols.push(symbol);  //pushing multiple symbol into the array symbol count
      }
    }


    //where the user is going to spin to generate a random symbol
    const reels=[[], [], [], []];
    for (let i=0; i < COLUMNS; i++){
        const reelSymbols=[...symbols]; //copying the original symbols to the reel 
        for (let j=0; j < ROWS; j++){

            const randomIndex= Math.floor(Math.random() * reelSymbols.length);  //the random index is going to be multiplied by the lengh of the reel
            const selectedSymbol= reelSymbols[randomIndex];    //this is the selected symbol generated randomly by randomIndex
            reels[i].push(selectedSymbol); //we have pushed the selected symbol inside the column 
            reelSymbols.splice(randomIndex, 1); //we remove the selected symbol from the reel
        }
    }
    return reels;
};



//transposing matrix; swapping its rows with it columns
const transpose=(reels) =>{
    const rows =[];  

    for(let i=0; i< ROWS; i++){
        rows.push([]);
        for (let j=0; j< COLUMNS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};


//displaying what the user spin
const printRows=(rows) =>{
    for (const row of rows){
        let rowString="";
        ["A", "B", "C", "D"]

        for (const [i, symbol] of row.entries()){
            rowString += symbol
            if (i != row.lenght -1){
                rowString+= " | "     // key note
            }
        }
        console.log(rowString)
    }
};




// 5. checking if a user won
const getWinings=(rows, bet, lines) => {
    let winnings=0;

    //if all the symbols in the row are the same, return true
    for (let row=0; row< lines; row++){
        const symbols= rows[row];
        let allSame = true;

        //if all the symbols in the row are not the same, return force and break.
        for (const symbol of symbols){
            if (symbol != symbols[0]){
                allSame=false;
                break;
            }
            
        }if (allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings
}




// adding the winnings to a user balance and asking them whether they will play again or quit
const game=()=>{
 
let balance=deposit();
while(true){
    console.log("you have a balance of $" + balance);  //adding their winnings to the balance

const numberOfLines=getNumberOfLines();

const bet= getBet(balance, numberOfLines);
balance -= bet * numberOfLines;    //deducting amount used on bet from the initial balance

const reels=spin();

const rows= transpose(reels);
printRows(rows);    //displaying how the output of the game will look like

const winnings= getWinings(rows, bet, numberOfLines)
balance += winnings;
console.log("You won, $" + winnings.toString());

 if (balance <=0){
    console.log("You run out of money!");
    break;
 }
 //if the user failed, he/she has an option to bet again
 const playAgain=prompt("Do you want to play again (y/n)? ");
 if (playAgain != "y") break;    //if a user didnt typed yes as he/she want to play again then we break

 }
};
game();