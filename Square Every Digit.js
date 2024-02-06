/*
https://www.codewars.com/kata/546e2562b03326a88e000020/train/javascript
*/

function squareDigits(num) {
  let finalInt;
  let numArr = num.toString().split("");
  for (let index = 0; index < numArr.length; index++) {
    let currentNum = parseInt(numArr[index]);
    let currentNumSquared = currentNum * currentNum;
    numArr[index] = currentNumSquared;
  }
  finalInt = parseInt(numArr.join(""));
  return finalInt;
}

console.log(squareDigits(9119));
