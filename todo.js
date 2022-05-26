// function parseUrlParams(){
//   const url = window.location.href;
//   console.log('URL', url);
//   const urlArray = url.split('?');
//   console.log('URLarray', urlArray);
//   const paramsString = urlArray[1];
//   console.log('secondo elemento di urlarray', paramsString);
//   if (paramsString) {
//     const paramsArray = paramsString.split('&');
//     console.log('array dei parametri', paramsArray)
//     const paramsObj = {};
//     for (const str of paramsArray) {
//       console.log('stringa parametro', str)
//       const strArray = str.split('=')
//       console.log('array del parametro', strArray)
//       paramsObj[strArray[0]] = decodeURIComponent(strArray[1]) ;
//     }
//     console.log('paramsObj', paramsObj)
//   } else {
//     return null;
//   }
// }

const BASE_URL = 'https://628778b1e9494df61b39b038.mockapi.io/todos'

let selectedTodo = new Todo ('new todo');


function goHome(){
  window.location.href = './'
}

function parseUrlParams() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  return params;
}

function changeTitle() {
    const pageTitle = document.getElementById('page-title');
    pageTitle.innerHTML = 'Modifica il titolo'
}


function loadSelectedTodo(id){
  const todoUrl = BASE_URL + '/' + id;
  fetch(todoUrl)
  .then(resp => resp.json())
  .then(result => initSeceltedTodo(result));
}


function initSeceltedTodo(obj) {
  const todo = Todo.fromDbObj(obj);
  selectedTodo = todo;
  fillForm(selectedTodo); 
}

function colorTags(selectedTags){
  const tags = document.getElementsByClassName('tag');
  for (const tagSpan of tags) {
    if (selectedTags.includes(tagSpan.innerHTML)) {
      tagSpan.style.backgroundColor = '#794a9d';
    } else {
      tagSpan.style.backgroundColor = '#1e1c1c7c';
    }
  }
}


function addOrRemoveTag(tag){
  if(selectedTodo.tags.includes(tag)){
    selectedTodo.tags = selectedTodo.tags.filter(t => filterTags(t, tag));
  } else {
    selectedTodo.tags.push(tag);
  }
  colorTags(selectedTodo.tags);
}

function filterTags(t1, t2) {
  return t1 !== t2;
}


function saveTodo(){



  const nameInput = document.getElementById('name-input');
  const name = nameInput.value.trim();
  if (name) {
    selectedTodo.name = name;
    const dbObj = selectedTodo.todoDbObj();
    const dbObjJson = JSON.stringify(dbObj);
    const url = BASE_URL + '/' + params.id;
    const fetchOptions = {method: 'put', body: dbObjJson, headers: {'Content-Type': 'application/json'}}
    fetch(url, fetchOptions).then(resp => resp.json()).then(res => goHome())

  } else {
    alert('Non posso salvare un Todo senza nome')
  }
}

function changePriority(priority) {
 selectedTodo.priorityOrder = priority;
 colorPriority(selectedTodo.priority);
}


function colorPriority(priority){
  const priorities = document.getElementsByClassName('priority');
  for (const prioritySpan of priorities) {
    if (priority.name === prioritySpan.innerHTML) {
      prioritySpan.style.backgroundColor = priority.color;
    } else {
      prioritySpan.style.backgroundColor = '#1e1c1c7c';
    }
  }
}


function fillForm(todo){
  const nameInput = document.getElementById('name-input');
  nameInput.value = todo.name;
  colorTags(todo.tags);
  colorPriority(todo.priority);
}

const params = parseUrlParams();
if (params.id) {
  changeTitle();
  loadSelectedTodo(params.id);
} else {
  fillForm()
}



// function getTodoFromSessionStorage(){
//   const todoString = sessionStorage.getItem('selectedTodo');
//   if (todoString) {
//     const todo = JSON.parse(todoString);
//     console.log('todo', todo)
//   }
// }


// getTodoFromSessionStorage()

