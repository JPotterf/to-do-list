// Code goes here

//object is the todoList with parameters to alter the list

var todoList = {
  todos: [],
  //adds an object to the todo array with the task name and completion boolian as properties
  addTodo: function(todoText){
    this.todos.push({    
      todoText: todoText, //property todoText is set to parameter todoText
      completed: false    //default of false until task is set to complete
    });
  },
  
  //method to change tasks in todos 
  changeTodo: function(position, todoText){
    this.todos[position].todoText = todoText;   //sets todoText property from main object to parameter at index position
  },
  
  //changes the completed property to the opposite of what it currently is
  toggleCompleted: function(position){
    var todo = this.todos[position];
    todo.completed = !todo.completed; //switches the bool value
  },
  
  //delete todo
  deleteTodo: function(position){
    this.todos.splice(position, 1);
  },
  
  toggleAll: function(){ //if everything true make everything false
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    //get number of completed todos
    this.todos.forEach(function(todo){
      if (todo.completed === true){
        completedTodos++;
      }
    });

    this.todos.forEach(function(todo){
      //case1: if everything is true make all false
      if(completedTodos === totalTodos){
        todo.completed = false;
      }else {
        //case2: make everything true
        todo.completed = true;
      }
    }); 
  }
};

//methods on this object will handle events that occur on html
var handler = {
  toggleAll: function(){
    todoList.toggleAll();
    view.displayTodos();
  },
  addTodo: function(){
    var addToDoTextInput = document.getElementById("addTodoTextInput"); // access the element to enter new task
    todoList.addTodo(addToDoTextInput.value); //gets the value of what was entered into the addToDoText input
    addTodoTextInput.value = ''; //sets the input to an empty string to clear the input box after added
    view.displayTodos();
    
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position){
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(){
    var toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  }
};

//object that is responsible for what the viewer sees on the front end
var view = {
  displayTodos: function(){
    var todosUl = document.querySelector('ul'); //referencing the blank list that exists in the DOM
    todosUl.innerHTML = '';
  
    todoList.todos.forEach(function(todo, position){
      var todoLi = document.createElement('li'); //create a new list element for the DOM
      var todoTextWithCompletion = '';
      if(todo.completed === true) { //displays task in the lists and if they are done or not
        todoTextWithCompletion = '(x) ' + todo.todoText;//concatenate strings used to display         
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;//concatenate strings shows as not completed       
      }
      
      todoLi.id = position; //each list item will have a unique id number
      todoLi.textContent =  todoTextWithCompletion; //sets the text content of the list elmnt with completed values
      todoLi.appendChild(this.createDeleteButton()); //accesses method in view object, creates delt button to each list item
      todosUl.appendChild(todoLi); //putting the new list element into the blank list that exists in DOM  
    }, this); //the final 'this' is a result of forEach, in this scenario 'this' references to the view object
  },
  createDeleteButton: function(){
    var deleteButton = document.createElement('button'); //creates the button
    deleteButton.textContent = 'Delete';  //label the button
    deleteButton.className = 'deleteButton' //set to a class so all buttons can be accessed
    return deleteButton
  },
  setUpEventListeners: function(){
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event) {
      //get the element that was clicked on
      var elementClicked = event.target;
    
      //check elementClicked is a delete button.
      if(elementClicked.className === 'deleteButton'){
        //position is id of list element, cast from string to integer
        //enter as argument to deleteTodo method in handler object
        handler.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });    
  }
};

view.setUpEventListeners(); 







