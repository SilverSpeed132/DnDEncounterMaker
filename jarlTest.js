let opti = 1250

const refArr = [0, 25, 50, 100, 200, 450, 700, 1100]

function randombetween(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function generate(max, thecount) {
    var r = [];
    var currsum = 0;
    for(var i=0; i<thecount-1; i++) {
        r[i] = randombetween(1, max-(thecount-i-1)-currsum);
        currsum += r[i];
    }
    r[thecount-1] = max - currsum;
    return r;
}


inputArr = generate(opti, 3)

function add1(a, length) {
    let carry = 1;
    for (i = length - 1; carry > 0 && i >= 0; i--) {
        let result = a[i] + carry;
        carry = result >> 1;
        a[i] = result & 1;
    }
}

let temp = [0,0,0]
let combinations = []

for (let i = 0; i < (1 << temp.length); i++ ){
    add1(temp, temp.length)
    combinations.push([...temp])
}


let choices = []


inputArr.forEach((topNum) => {
    for (let i = 0; i < refArr.length; i++){
        if (topNum < refArr[i]){
            choices.push([refArr[i], refArr[i - 1]])
            break
        }
    }
})



arrCombinations = []

combinations.forEach((combArr) => {
    let sub_com = []
    combArr.forEach((bin, index) => {
        sub_com.push(choices[index][bin])
    })
    arrCombinations.push(sub_com)
})



sums = []

arrCombinations.forEach((arr) => {
    sums.push(arr.reduce((partialSum, a) => partialSum + a, 0))
})



let min = opti
let minIndex = 0

for (let i = 0; i < sums.length; i++){
    if(Math.abs(opti - sums[i]) < min){
        min = opti- sums[i]
        minIndex = i
    }
}

console.log(arrCombinations[minIndex])