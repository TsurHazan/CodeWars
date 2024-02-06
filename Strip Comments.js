/* 
https://www.codewars.com/kata/51c8e37cee245da6b40000bd/javascript
Complete the solution so that it strips all text that follows any of a set of comment markers passed in. Any whitespace at the end of the line should also be stripped out.

Example:

Given an input string of:

apples, pears # and bananas
grapes
bananas !apples
The output expected would be:

apples, pears
grapes
bananas
The code would be called like so:

var result = solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"])
// result should == "apples, pears\ngrapes\nbananas"
*/

//My solution
function solution(text, markers) {
  let textRowsArray = text.split("\n");
  let fixedRows = [];
  let finalArray = [];
  //treat every row
  for (let rowIndex = 0; rowIndex < textRowsArray.length; rowIndex++) {
    let rowArrayFixed = [];

    //find if the current row has marker
    let isMarkerExist = false;
    let markersPositions = [];

    markers.forEach((element) => {
      isMarkerExist = textRowsArray[rowIndex].includes(element);
      if (isMarkerExist) {
        markersPositions.push(textRowsArray[rowIndex].indexOf(element));
        markersPositions.sort((a, b) => a - b);
      }
    });

    rowArrayFixed.push(textRowsArray[rowIndex].slice(0, markersPositions[0]));
    fixedRows.push(rowArrayFixed.join(" "));
  }

  for (let index = 0; index < fixedRows.length; index++) {
    if (fixedRows[index] !== "") {
      finalArray.push(fixedRows[index].trimEnd());
    }
    if (index + 1 < fixedRows.length) {
      finalArray.push("\n");
    }
  }
  finalArray = finalArray.join("");
  return finalArray.toString();
}

//chatGPT solution

function solution(text, markers) {
  const lines = text.split("\n");

  const result = lines
    .map((line) => {
      const markerIndex = markers.reduce((index, marker) => {
        const markerPos = line.indexOf(marker);
        return markerPos !== -1 && (index === -1 || markerPos < index) ? markerPos : index;
      }, -1);

      return markerIndex !== -1 ? line.slice(0, markerIndex).trimEnd() : line.trimEnd();
    })
    .join("\n");

  return result;
}
