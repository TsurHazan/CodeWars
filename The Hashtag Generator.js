// https://www.codewars.com/kata/52449b062fb80683ec000024/train/javascript
function generateHashtag(str) {
  let trimmed = str.trim();
  if (trimmed === "" || trimmed.length === 0) return false;
  let words = trimmed.split(/\s+/).map((word) => word.trim());
  words = words.map((word, index) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  words = `#${words.join("")}`;
  if (words.length > 140) return false;
  return words;
}
