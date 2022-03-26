
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
    {name: "awakened shrub", armorClass: 9, health: 10, strength: -4, dex: -1, con: 0, intel: 0, wis: 0, cha: -2, xpAmnt: 0}
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

    let xpRange = Math.floor(Math.random()*(nextxpNeeded - xpNeeded)) + xpNeeded;

    //determines amount of enemies to pull based on enemy amount specified
    let enemyCount = 0;
    switch(enemyAmnt){
        case "one":
            enemyCount = 1;
            break;
        case "small":
            enemyCount = Math.floor(Math.random()*2) + 2;
            break;
        case "medium":
            enemyCount = Math.floor(Math.random()*3) + 4;
            break;
        case "large":
            enemyCount = Math.floor(Math.random()*4) + 7;
            break;
        case "many":
            enemyCount = Math.floor(Math.random()*4) + 11;
            break;
        case "horde":
            enemyCount = xpNeeded / 100;
            break;
    }

    //uses the eVA function to create an array of values for enemy xpAmnts to pull for.
    let enemyValues = enemyValueArray(xpRange, enemyCount);

    //Contains an array of possible enemy XP Values and creates 2 variables for calculations
    let enemyXpAmnts = [0, 25, 50, 100, 200, 450, 700, 1100, 1800, 2300, 2900, 3900, 5000, 5900, 7200, 8400, 10000, 11500, 13000, 15000, 18000, 20000, 22000, 25000, 33000, 41000, 50000, 62000, 155000]
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

encounterMaker(4, "hard", "small", [4,3,5,3]);