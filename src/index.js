
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
const todoContent = document.querySelector('.project-title-content');
const todayTasks = document.querySelector('#todayTask');
const upcomingTasks = document.querySelector('#upcomingTask');

//for add todo list variable
const todoTitle = document.querySelector('#title');
const todoDesc = document.querySelector('#description');
const todoDate = document.querySelector('#date');
const todoPriority = document.querySelector('#priority');
const addTodoBtn = document.querySelector('.btn-value');


// const secondContent=document.querySelector('.second-content');

let projectArray = [];
let currentId = null;
let projectList = new ProjectList();
let todoList = new TodoList(projectList);

let todayTask = [];
let upcomingTask = [];




todayTasks.addEventListener('click', () => {
    title.innerHTML = "";
    todoContent.textContent = "";
    const h3 = document.createElement('h3');
    h3.textContent = "Today Tasks";
    title.appendChild(h3);
    currentId = 11;
    if (todayTask.length == 0) {
        return;
    }
    else {
        defaultTask(currentId);
    }
}
);


upcomingTasks.addEventListener('click', () => {
    title.innerHTML = "";
    todoContent.textContent = "";
    const h3 = document.createElement('h3');
    h3.textContent = "Upcoming Tasks";
    title.appendChild(h3);
    currentId = 22;
    if (upcomingTask.length == 0) {
        return;
    }
    else {
        defaultTask(currentId);
    }
}
);
function defaultTask(id) {
    currentId = id;
    todoContent.innerHTML = "";


    const task = {
        id: crypto.randomUUID(),
        title: todoTitle.value,
        dueDate: todoDate.value,
        description: todoDesc.value,
        priority: todoPriority.value
    };


    if (id === 11) {
        if (!task.title == "") {

            todayTask.push(task);
            localStorage.setItem('ajaKoTask', JSON.stringify(todayTask));
        }


 todayTask=JSON.parse(localStorage.getItem('ajaKoTask'));
        todayTask.forEach((todo) => {
            const newDiv = document.createElement('div');
            newDiv.classList.add('project-main');

            const divFirst = document.createElement('div');
            divFirst.classList.add('project-title-first');
            const divSecond = document.createElement('div');
            divSecond.classList.add('project-title-second');

            const h3 = document.createElement('h3');
            h3.textContent = todo.title;
            const p = document.createElement('p');
            p.textContent = todo.dueDate;
            divFirst.append(h3, p);

            const p2 = document.createElement('p');
            p2.textContent = todo.description;
            const p3 = document.createElement('p');
            p3.textContent = todo.priority;
            const btn = document.createElement('button');
            btn.textContent = "Delete";
            btn.classList.add("defaultBtn");
            btn.dataset.id = todo.id;

            if (todo.priority === "High") p3.classList.add('high');
            else if (todo.priority === "Medium") p3.classList.add('medium');
            else if (todo.priority === "Low") p3.classList.add('low');

            p3.classList.add('project-priority');



            divSecond.append(p2, p3, btn);
            newDiv.append(divFirst, divSecond);
            todoContent.appendChild(newDiv);
        });
    } else if (id === 22) {
        if (!task.title == "") {

            upcomingTask.push(task);

            localStorage.setItem('futureKoTask', JSON.stringify(upcomingTask));
        }
let upcomingsTask=JSON.parse(localStorage.getItem('futureKoTask'));

// console.log(upcomingsTask); have to work on this....

        upcomingTask.forEach((todo) => {
            const newDiv = document.createElement('div');
            newDiv.classList.add('project-main');

            const divFirst = document.createElement('div');
            divFirst.classList.add('project-title-first');
            const divSecond = document.createElement('div');
            divSecond.classList.add('project-title-second');

            const h3 = document.createElement('h3');
            h3.textContent = todo.title;
            const p = document.createElement('p');
            p.textContent = todo.dueDate;
            divFirst.append(h3, p);

            const p2 = document.createElement('p');
            p2.textContent = todo.description;
            const p3 = document.createElement('p');
            p3.textContent = todo.priority;
            const btn = document.createElement('button');
            btn.textContent = "Delete";
            btn.classList.add("defaultBtn");
            btn.dataset.id = todo.id;

            if (todo.priority === "High") p3.classList.add('high');
            else if (todo.priority === "Medium") p3.classList.add('medium');
            else if (todo.priority === "Low") p3.classList.add('low');

            p3.classList.add('project-priority');



            divSecond.append(p2, p3, btn);
            newDiv.append(divFirst, divSecond);
            todoContent.appendChild(newDiv);
        });
    }
    dialog.close();

    // Clear inputs after adding
    todoTitle.value = "";
    todoDesc.value = "";
    todoDate.value = "";
    todoPriority.value = "";
}


addTodoTask.addEventListener('click', () => {
    dialog.showModal();
})

const today = new Date().toISOString().split('T')[0];
todoDate.min = today;

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
    if (event.target.closest('.project-section')) {
        const projectSection = event.target.closest('.project-section');
        const h4 = projectSection.querySelector('h4');
        const heading = document.createElement('h3');
        title.textContent = "";
        heading.textContent = h4.textContent;
        title.appendChild(heading);

        // console.log(event.target.dataset.id);
        currentId = event.target.dataset.id;

        renderContain();
    }



    if (event.target && event.target.classList.contains('project-btn')) {
        const del = confirm("Are you sure you want to delete ?");
        if (del) {
            projectArray = projectArray.filter((p) => p.id !== event.target.dataset.id);
            event.target.closest('.project-section').remove();
            currentId = null;
            title.textContent = "";
            todoContent.innerHTML = "";
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
        newDiv.dataset.id = project.id;
        title.dataset.id = project.id;

        newDiv.appendChild(title);
        newDiv.appendChild(btn);
        projectHidden.appendChild(newDiv);



        projectArray.push(project);
        localStorage.setItem('projectKoArray', JSON.stringify(projectArray));

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
addTodoBtn.addEventListener('click', () => {

    let todoTitleValue = todoTitle.value.trim();
    let todoDescValue = todoDesc.value.trim();
    let todoDatevalue = todoDate.value;
    let todoPriorityValue = todoPriority.value;

    if (currentId == null) {
        dialog.close();
        todoTitle.value = "";
        todoDesc.value = "";
        todoDate.value = "";
        todoPriority.value = "";
        return;
    }

    if (currentId == 11) {
        defaultTask(11);
        return;
    }

    else if (currentId == 22) {
        defaultTask(22);
        return;
    }


    if (!todoTitleValue || !todoDescValue || !todoDatevalue || !todoPriorityValue) {
        alert("Enter all the field");
        return;
    }
    todoList.addTodo(currentId, todoTitleValue, todoDescValue, todoDatevalue, todoPriorityValue);

    renderContain();
    let testing=JSON.parse(localStorage.getItem('projectKoArray'));
    console.log(testing);
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


function renderContain() {
    const project = projectList.showProject(currentId);

    todoContent.innerHTML = "";
    project.todos.forEach((todo) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('project-main');
        const divFirst = document.createElement('div');
        divFirst.classList.add('project-title-first');
        const divSecond = document.createElement('div');
        divSecond.classList.add('project-title-second');

        const h3 = document.createElement('H3');
        h3.textContent = todo.title;
        const p = document.createElement('P');
        p.textContent = todo.dueDate;

        divFirst.append(h3, p);

        const p2 = document.createElement('p');
        p2.textContent = todo.description;
        const p3 = document.createElement('p');
        p3.textContent = todo.priority;
        if (todo.priority == "High") {
            p3.classList.add('high');
        }
        else if (todo.priority == "Medium") {
            p3.classList.add('medium');
        }
        else if (todo.priority == "Low") {
            p3.classList.add('low');
        }
        p3.classList.add('project-priority');
        const btn = document.createElement('button');
        btn.dataset.id = todo.id;
        btn.textContent = "Delete";
        btn.classList.add('todoBtn-delete');


        divSecond.append(p2, p3, btn);

        newDiv.append(divFirst, divSecond);
        todoContent.appendChild(newDiv);

    })

    todoTitle.value = "";
    todoDesc.value = "";
    todoDate.value = "";
    todoPriority.value = "";


}

todoContent.addEventListener('click', (e) => {
    if (e.target.closest('.todoBtn-delete')) {
        const id = e.target.dataset.id;
        const project = projectList.showProject(currentId);
        const ask = confirm("Are you sure you want to delete this?");

        if (ask) {
            project.todos = project.todos.filter((todo) => todo.id !== id);
            renderContain();
        }
    }
    else if (e.target.closest('.defaultBtn')) {
        const id = e.target.dataset.id;
        const ask = confirm("Are you sure you want to delete this?");

        if (ask) {
            if (currentId == 11) {
                todayTask = todayTask.filter((todo) => todo.id !== id);
                defaultTask(currentId);
            }
            else {
                upcomingTask = upcomingTask.filter((todo) => todo.id !== id);
                defaultTask(currentId);
            }
        }

    }
})




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