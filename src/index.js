import './styles.css';


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