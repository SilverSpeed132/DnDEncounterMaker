/*EncounterMaker
Description:
This program currently takes a given input, and displays an array of JS objects representing DnD 5e enemies to create a potential encounter.

Known Bugs: 
- Lines 106-118: numbers are assigned properly, but because of this, the sum of the enemyValues array indices may be considerably lower or higher than xpRange
    - Possible Fix: have enemyValueArray pull only viable enemyXpAmnts (that are less than calcRange) from calcRange for all but the last enemy
        - Wouldn't completely fix the bug, but would mitigate variance
        - Would also need a way to lower the value of the difference lost when the last number is rounded
*/


//Array containing enemy JS objects
const enemyArray = [
    {name: "owlbear", armorClass: 13, health: 59, strength: 5, dex: 1, con: 3, intel: -4, wis: 1, cha: -2, xpAmnt: 700},
    {name: "bandit", armorClass: 12, health: 11, strength: 0, dex: 1, con: 1, intel: 0, wis: 0, cha: 0, xpAmnt: 25},
    {name: "giant owl", armorClass: 12, health: 19, strength: 1, dex: 2, con: 1, intel: -1, wis: 1, cha: 0, xpAmnt: 50},
    {name: "hobgoblin", armorClass: 18, health: 11, strength: 1, dex: 1, con: 1, intel: 0, wis: 0, cha: -1, xpAmnt: 100},
    {name: "bugbear", armorClass: 16, health: 27, strength: 2, dex: 2, con: 1, intel: -1, wis: 0, cha: -1, xpAmnt: 200},
    {name: "orc war chief", armorClass: 16, health: 93, strength: 4, dex: 1, con: 4, intel: 0, wis: 0, cha: 3, xpAmnt: 1100},
    {name: "allosaurus", armorClass: 13, health: 51, strength: 4, dex: 1, con: 3, intel: -4, wis: 1, cha: -3, xpAmnt: 450},
    {name: "hill giant", armorClass: 13, health: 105, strength: 5, dex: -1, con: 4, intel: -3, wis: -1, cha: -2, xpAmnt: 1800},
    {name: "awakened shrub", armorClass: 9, health: 10, strength: -4, dex: -1, con: 0, intel: 0, wis: 0, cha: -2, xpAmnt: 0},
    {name: "giant fire beetle", armorClass: 13, health: 4, strength: -1, dex: 0, con: 1, intel: -5, wis: -2, cha: -4, xpAmnt: 0},
    {name: "blood hawk", armorClass: 12, health: 7, strength: -2, dex: 2, con: 0, intel: -4, wis: 2, cha: -3, xpAmnt: 25},
    {name: "skeleton", armorClass: 13, health: 13, strength: 0, dex: 2, con: 2, intel: -2, wis: -1, cha: -3, xpAmnt: 50},
    {name: "orc", armorClass: 13, health: 15, strength: 3, dex: 1, con: 3, intel: -2, wis: 0, cha: 0, xpAmnt: 100},
    {name: "animated armor", armorClass: 18, health: 33, strength: 2, dex: 0, con: 1, intel: -5, wis: 1, cha: -5, xpAmnt: 200},
    {name: "gargoyle", armorClass: 15, health: 52, strength: 2, dex: 0, con: 3, intel: -2, wis: 0, cha: -2, xpAmnt: 450},
    {name: "hell hound", armorClass: 15, health: 45, strength: 3, dex: 1, con: 2, intel: -2, wis: 1, cha: -2, xpAmnt: 700},
    {name: "banshee", armorClass: 12, health: 58, strength: -5, dex: 2, con: 0, intel: 1, wis: 0, cha: 3, xpAmnt: 1100},
    {name: "earth elemental", armorClass: 17, health: 126, strength: 5, dex: -1, con: 5, intel: -3, wis: 0, cha: -3, xpAmnt: 1800}
] 

function encounterMaker(numOfPlayers, diff, enemyAmnt, playerLvls){
    
    let dM = 0; //will hold the difficulty modifier based on diff argument
    let lvl2Xp = []; //array holds each player's XP amount needed for an "easy" difficulty encounter
    let xpTranslate = [25,50,75,125,250,300,350,450,550,600,800,1000,1100,1250,1400,1600,2000,2100,2400,2800]; //contains "easy" xp needed for each level
    let ezXpNeeded = 0;

    //loops through playerLvls to fill lvl2Xp with the appropriate "easy" difficulty XP values
    for (let i = 0; i < playerLvls.length; i++){
        lvl2Xp[i] = xpTranslate[playerLvls[i] - 1]
    };
    for (let i = 0; i < lvl2Xp.length; i++){
        ezXpNeeded += lvl2Xp [i];
    }

    //Assigns dM a number based on the specified difficulty
    switch(diff){
        case "easy":
            dM = 1;
            break;
        case "medium":
            dM = 2;
            break;
        case "hard":
            dM = 3;
            break;
        case "deadly":
            dM = 4;
            break;
    }

    //Calculates experience needed for the specified encounter
    let xpNeeded = dM * ezXpNeeded;
    let nextxpNeeded = (dM + 1) * ezXpNeeded

    let newRange = xpNeeded + ((nextxpNeeded - xpNeeded)/2)
    let xpRange = Math.floor(Math.random()*(nextxpNeeded - xpNeeded)) + xpNeeded;
    xpRange = newRange
    //determines amount of enemies to pull based on enemy amount specified
    let enemyCount = 0;
    switch(enemyAmnt){
        case "one":
            enemyCount = 1;
            break;
        case "small":
            enemyCount = 2;
            xpRange /= 1.5
            break;
        case "medium":
            enemyCount = Math.floor(Math.random()*4) + 3;
            xpRange /= 2
            break;
        case "large":
            enemyCount = Math.floor(Math.random()*4) + 7;
            xpRange /= 2.5
            break;
        case "many":
            enemyCount = Math.floor(Math.random()*4) + 11;
            xpRange /= 3
            break;
        case "horde":
            if(xpRange / 100 > 15){
                enemyCount = xpRange / 100;
            } else enemyCount = 15;
            break;
    }


    //uses the eVA function to create an array of values for enemy xpAmnts to pull for.
    let enemyValues = enemyValueArray(xpRange, enemyCount);

    //Contains an array of possible enemy XP Values and creates 2 variables for calculations
    let enemyXpAmnts = [0, 25, 50, 100, 200, 450, 700, 1100, 1800, 2300, 2900, 3900, 5000, 5900, 7200,
         8400, 10000, 11500, 13000, 15000, 18000, 20000, 22000, 25000, 33000, 41000, 50000, 62000, 155000]
    let lowerXpAmnt = 0, higherXpAmnt = 0;

    //Loops through the enemyValues array and finds which index of enemyXpAmnts it is closest to, and reassigns it to that number.
    for (let i = 0; i < enemyValues.length; i++){
        for (let j = 0; j < enemyXpAmnts.length; j++){
            if (enemyValues[i] < enemyXpAmnts[j]){
                higherXpAmnt = enemyXpAmnts[j];
                lowerXpAmnt = enemyXpAmnts[j-1];
                break;
            }
        }
        if (enemyValues[i] - lowerXpAmnt > higherXpAmnt - enemyValues[i]){
            enemyValues[i] = higherXpAmnt
        } else {enemyValues[i] = lowerXpAmnt}
    }

    //creates an array of JS objects from enemyArray... filters enemyArray for enemies that match the index at enemyValues, then randomly selects one of those enemies
    //and pushes it to encounterArray
    let encounterArray = []
    for (let i = 0; i < enemyValues.length; i++){
        let tempArray = enemyArray.filter(obj => {
            return obj.xpAmnt === enemyValues[i];
        });
        encounterArray.push(tempArray[Math.floor(Math.random()*tempArray.length)])
    }
    
    console.log(encounterArray)
}

function enemyValueArray (range, enemyNum){
    
    let x = enemyNum;
    let calcRange = range;
    let randArr = [];

    while (x > 1){
        let value = Math.floor(Math.random() * calcRange);
        calcRange -= value;
        randArr.push(value);
        x--
    }
    randArr.push(calcRange);

    return randArr;
}

encounterMaker(4, "hard", "large", [4,3,5,3]);