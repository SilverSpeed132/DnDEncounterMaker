const possibleAmounts = [0, 25, 50, 100, 200, 450, 700, 1100, 1800, 2300, 2900, 3900, 5000, 5900, 7200,
    8400, 10000, 11500, 13000, 15000, 18000, 20000, 22000, 25000, 33000, 41000, 50000, 62000, 155000]

let originalX = 3 //can be positive integer 1 or greater  
let originalRange = 1333 //can be positive integer 1 or greater

function valueArray (range, x){

    //Create temp variables for calculations
    let tempX = x;
    let tempRange = range;

    //array to return
    let randArr = [];

    /*while tempX > 1, will pull a random integer less than tempRange for value,
    then will subtract that random number from tempRange, push it to randArr, and
    decrement tempX.
    
    When tempX = 1, the remainder of tempRange is pushed to randArr.
    */
    while (tempX > 1){
        let value = Math.floor(Math.random() * tempRange);
        tempRange -= value;
        randArr.push(value);
        tempX--
    }
    randArr.push(tempRange);

    let lowerAmnt = 0, higherAmnt = 0;

    //Loops through the randArr array and finds which index of possibleAmounts it is closest to, and reassigns it to that number.
    for (let i = 0; i < randArr.length; i++){
        for (let j = 0; j < possibleAmounts.length; j++){
            if (randArr[i] < possibleAmounts[j]){
                higherAmnt = possibleAmounts[j];
                lowerAmnt = possibleAmounts[j-1];
                break;
            }
        }
        if (randArr[i] - lowerAmnt > higherAmnt - randArr[i]){
            randArr[i] = higherAmnt
        } else {randArr[i] = lowerAmnt}
    }

/*
Current Bug: Because of the rounding to different indices of possibleAmounts, the
sum of randArr deviates too much from originalRange and can cause issues with future
calculations

originalX can not be changed at all, but the way originalRange is calculated could be.
*/

    console.log(randArr)
    return randArr;
}

valueArray(originalRange, originalX);

