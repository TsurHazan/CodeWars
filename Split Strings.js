/* 
Complete the solution so that it splits the string into pairs of two characters. If the string contains an odd number of characters then it should replace the missing second character of the final pair with an underscore ('_').

Examples:

* 'abc' =>  ['ab', 'c_']
* 'abcdef' => ['ab', 'cd', 'ef']

*/
function solution(str) {
  let finalArray = [];
  for (let index = 0; index < str.length; index = index + 2) {
    let pair = str[index];
    if (index + 1 !== str.length || (index + 1) % 2 === 0) {
      pair = pair + str[index + 1];
    } else {
      pair = pair + "_";
    }
    finalArray.push(pair);
  }
  return finalArray;
}
