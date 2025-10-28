

class Projects{
    constructor(title){
        this.id=crypto.randomUUID();
        this.title=title; 
        this.todos=[];
    }
}

class ProjectList{
    constructor(){
        this._projects=[];
    }
    addProject(name){
        const newProject=new Projects(name);
        this._projects.push(newProject);
        return newProject;
    }
    showProject(id){
        const result=this._projects.find((project)=>project.id==id);
        return result;
    }
    clearProject(id){
          this._projects=this._projects.filter((project)=>project.id!==id);
    }
}

class Todos{
    constructor(title,description,dueDate,priority){
        this.id=crypto.randomUUID();
        this.title=title;
        this.description=description;
        this.dueDate=dueDate;
        this.priority=priority;
    }
}

class TodoList{
    constructor(projectList){
        this.projectList=projectList;
    }
    addTodo(projectId,title,description,dueDate,priority){
        const newTodo=new Todos(title,description,dueDate,priority);
        const project=this.projectList.showProject(projectId);
        project.todos.push(newTodo);

    }
}


export {TodoList,Todos,ProjectList,Projects}


