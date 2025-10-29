
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

// const secondContent=document.querySelector('.second-content');

let projectArray = [];
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
    if (event.target && event.target.tagName === 'H4') {
        title.textContent = "";
        const newH2 = document.createElement('H2');
        newH2.textContent = event.target.textContent;

        title.appendChild(newH2);
        console.log(newH2);
    }


    if (event.target && event.target.classList.contains('project-btn')) {
       projectArray=projectArray.filter((p)=>p.id!==event.target.dataset.id);
       event.target.closest('.project-section').remove();
       
    }
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

        newDiv.appendChild(title);
        newDiv.appendChild(btn);
        projectHidden.appendChild(newDiv);



        projectArray.push(project);
        console.log(projectArray);

        projectDialog.close();
        projectInput.value = "";
    }


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