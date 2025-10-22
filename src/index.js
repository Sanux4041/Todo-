
import './styles.css';
// import dropDown from './assets/dropdown.svg';


const addTask=document.querySelector('.newTask');
const showProject=document.querySelector('.optionToShow');
const projectHidden=document.querySelector('.project-hidden');
const dialog=document.querySelector('#dialogBox');
const dialogClose=document.querySelector('.dialogClose');
const sideBar=document.querySelector('.sidebar-content');
const slide=document.querySelector('.magic');
const container=document.querySelector('.container');
const projectAdd=document.querySelector('.projectAdd');
const projectClose=document.querySelector('.projectClose');
const projectDialog=document.querySelector('#projectDialog');
const projectInput=document.querySelector('.projectInput');
const title=document.querySelector('.dynamic-tittle');




slide.addEventListener('click',()=>{
    sideBar.classList.toggle('sidebar-content-active');
   container.classList.toggle('sidebar-hidden');
})

dialogClose.addEventListener('click',()=>{
    dialog.close();
})

projectClose.addEventListener('click',()=>{
    projectDialog.close();
})
projectAdd.addEventListener('click',()=>{
    if(projectInput.value==''){
        alert("Enter some project");
    }else{
       const newDiv=document.createElement('div');
       const title=document.createElement("h4");
       title.textContent=projectInput.value;
       newDiv.appendChild(title);
       projectHidden.appendChild(newDiv);
       projectDialog.close();
       projectInput.value="";
    }

})

addTask.addEventListener('click',()=>{
   projectDialog.showModal();
})

function magic(){
    projectHidden.classList.toggle("active");
}

showProject.addEventListener('click',magic);
class CreateTodo{
    constructor(id,title,description,dueDate,priority){
        this.id=id;
        this.title=title;
        this.description=description;
        this.dueDate=dueDate;
        this.priority=priority;
    }
}

const todoArray=[];
function newTodo(todoObj){
    todoArray.push(todoObj);
    console.log(todoArray);
    return todoArray;
} 

let test1=new CreateTodo(1,'one','testing one data','sunday','high');
let test2=new CreateTodo(2,'two','testing one data','sunday','high');
let test3=new CreateTodo(3,'three','testing one data','sunday','high');
let test4=new CreateTodo(4,'four','testing one data','sunday','high');

todoArray.push(test1);
todoArray.push(test2);
todoArray.push(test3);
todoArray.push(test4);

window.todoArray=todoArray;
window.newTodo=newTodo;
window.deleteTodo=deleteTodo;
window.editTodo=editTodo;
window.showTodo=showTodo;
window.setPriority=setPriority;

function deleteTodo(id){
   const updated = todoArray.filter(item => item.id !== id);
  todoArray.splice(0, todoArray.length, ...updated); // 0 index bata length sama ko lai hataunxa ani update hunxa
  return todoArray;

}
function editTodo(id){
    const updated=todoArray.find(item=>{
        if(item.id==id){
            item.title='';
            item.description='';
            item.dueDate='';
            item.priority='testing';
            console.log(todoArray);
        }
    })
}

function showTodo(){
    return todoArray;
}

function setPriority(id){
    todoArray.find(item=>{
        if(item.id==id){
            item.priority='very very high';
   console.log(todoArray);
}
})
return todoArray;
}
console.log("testing");