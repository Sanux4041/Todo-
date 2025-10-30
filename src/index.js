
import './styles.css';
import { TodoList, Todos, ProjectList, Projects } from './class/project';
// import dropDown from './assets/dropdown.svg';


const addTask = document.querySelector('.newTask');
const showProject = document.querySelector('.optionToShow');
const projectHidden = document.querySelector('.project-hidden');
const dialog = document.querySelector('#dialogBox');
const dialogClose = document.querySelector('.dialogClose');
const sideBar = document.querySelector('.sidebar-content');
const slide = document.querySelector('.magic');
const container = document.querySelector('.container');
const projectAdd = document.querySelector('.projectAdd');
const projectClose = document.querySelector('.projectClose');
const projectDialog = document.querySelector('#projectDialog');
const projectInput = document.querySelector('.projectInput');
const title = document.querySelector('.dynamic-tittle');
const firstContent = document.querySelector('.first-content');
const addTodoTask = document.querySelector('.addNewTask');

//for add todo list variable
const todoTitle=document.querySelector('#title');
const todoDesc=document.querySelector('#description');
const todoDate=document.querySelector('#date');
const todoPriority=document.querySelector('#priority');
const addTodoBtn=document.querySelector('.btn-value');

// const secondContent=document.querySelector('.second-content');

let projectArray =[];
let currentId=null;
let projectList = new ProjectList();
let todoList = new TodoList(projectList);

addTodoTask.addEventListener('click', () => {
    dialog.showModal();
})

// use of event delegant 
//this section is used for today and upcoming section only...
firstContent.addEventListener('click', (event) => {
    if (event.target.tagName === 'P') {
        title.textContent = "";
        const newH2 = document.createElement('H2');
        newH2.textContent = event.target.textContent;
        title.appendChild(newH2);
        // console.log(event.target.textContent);
    }
})

projectHidden.addEventListener('click', (event) => {
if(event.target.closest('.project-section' )){
    // console.log(event.target.dataset.id);
    currentId=event.target.dataset.id;
}



    if (event.target && event.target.classList.contains('project-btn')) {
        const del = confirm("Are you sure you want to delete ?");
        if (del) {
            projectArray = projectArray.filter((p) => p.id !== event.target.dataset.id);
            event.target.closest('.project-section').remove();
        }


    }
})

function createNewProject() {
    if (projectInput.value == '') {
        alert("Enter some project");
    } else {
        const newDiv = document.createElement('div');
        newDiv.classList.add('project-section');
        const title = document.createElement("H4");
        title.textContent = projectInput.value;
        const btn = document.createElement('Button');
        btn.classList.add('project-btn');
        btn.textContent = "Delete";



        const project = projectList.addProject(projectInput.value);

        btn.dataset.id = project.id;
        newDiv.dataset.id=project.id;
        title.dataset.id=project.id;

        newDiv.appendChild(title);
        newDiv.appendChild(btn);
        projectHidden.appendChild(newDiv);



        projectArray.push(project);

        projectDialog.close();
        projectInput.value = "";
    }
}

projectInput.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        createNewProject();
    }
})

//section for todoAdd button
addTodoBtn.addEventListener('click',()=>{
    const todoTitleValue=todoTitle.value.trim();
    const todoDescValue=todoDesc.value.trim();
    const todoDatevalue=todoDate.value;
    const todoPriorityValue=todoPriority.value;

    if(!todoTitleValue || !todoDescValue || !todoDatevalue || !todoPriorityValue){
        alert("Enter all the field");
        return;
    }
    todoList.addTodo(currentId,todoTitleValue,todoDescValue,todoDatevalue,todoPriorityValue);
    console.log(projectArray);
    dialog.close();
})


slide.addEventListener('click', () => {
    sideBar.classList.toggle('sidebar-content-active');
    container.classList.toggle('sidebar-hidden');
})

dialogClose.addEventListener('click', () => {
    dialog.close();
})

projectClose.addEventListener('click', () => {
    projectDialog.close();
})

projectAdd.addEventListener('click', (e) => {

    createNewProject();

})

addTask.addEventListener('click', () => {
    projectDialog.showModal();
})

function magic() {
    projectHidden.classList.toggle("active");
}

showProject.addEventListener('click', magic);






// let projectList=new ProjectList();
// const p1=projectList.addProject("sunday");
// const p2=projectList.addProject("monday");

// let todoList=new TodoList(projectList);
// todoList.addTodo(p1.id,"sunday task","wake up and do exercise","monday","high");
// todoList.addTodo(p2.id,"monday task","do exercise","sunday","high");

// console.log(projectList);

//   <div class="project-main">
//   <div class="project-title-first">
//  <h3>tittle of project</h3>
//     <p>Due date</p>
//     </div>
//    <div class="project-title-second">
//     <p>Content</p>
//     <p class="project-priority">Priority</p>
//    </div>
//     </div>