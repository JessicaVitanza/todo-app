
function parseUrlParams() {
  const url = window.location.href;
  const urlArray = url.split('?');
  const paramsString = urlArray[1];
  if (paramsString) {
    const paramsArray = paramsString.split('&');
    const paramsObj = {};
    for (const string of paramsArray){
        const stringArray = string.split('=');
        paramsObj[stringArray[0]] = decodeURIComponent(stringArray[1]);
    }
    console.log(paramsObj);
  } else {
    return null;  
  } 
}

const params = parseUrlParams();
console.log(params);


// function getTodoFromSessionStorage(){
//   const todoString = sessionStorage.getItem('selctedTodo');
//   if (todoString) {
//       const todo = JSON.parse(todoString);
//     console.log(todo);
//   }
// }
// getTodoFromSessionStorage();

