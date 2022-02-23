var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");




var taskFormHandler = function (event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
      alert("You need to fill out the task form!");
      return false;
    }

    // reset form inputs
    formEl.reset();

    // package up data as an object
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
}



var createTaskEl = function(taskDataObj) {
     // create list item
     var listItemEl = document.createElement("li");
     listItemEl.className = "task-item";

     // add task id as a data attribute
     listItemEl.setAttribute("data-task-id", taskIdCounter);
 
     // create div to hold task info and add to list item
     var taskInfoEl = document.createElement("div");
     // give it a class name
     taskInfoEl.className = "task-info";
     // add HTML content to div
     taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
 
     // add task type to task name
     listItemEl.appendChild(taskInfoEl);

     var taskActionsEl = createTaskActions(taskIdCounter);
     listItemEl.appendChild(taskActionsEl);

     // add entire list item (name & type) to list
     tasksToDoEl.appendChild(listItemEl);

     //increase task counter for next unique id
     taskIdCounter++;
}



var createTaskActions = function(taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  // create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  // create select drop down for status change
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "status-select";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  // list status choices
  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i < statusChoices.length; i++) {
    // creat option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  actionContainerEl.appendChild(statusSelectEl);

  return actionContainerEl;
};





var taskButtonHandler = function(event) {
  // get target element from event
  var targetEl = event.target;

  // if edit button was clicked
  if (targetEl.matches(".edit-btn")) {
    // get the element's task id
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }

  // if delete button was clicked
  else if (targetEl.matches(".delete-btn")) {
    // get the element's task id
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};






var editTask = function(taskId) {
  // get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  document.querySelector("input[name='task-name']").value = taskName;

  var taskType = taskSelected.querySelector("span.task-type").textContent;
  document.querySelector("select[name='task-type']").value = taskType;

  // change the submit button to say "save task" when in edit mode
  document.querySelector("#save-task").textContent = "Save Task";

  // add data-task-id attribute on the form that shows which task is being edited
  formEl.setAttribute("data-task-id", taskId);
};


var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
};













formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
 