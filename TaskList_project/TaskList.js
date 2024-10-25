console.log("I am here");

document.querySelector("#task_due_date").value = new Date().toISOString().substring(0, 10);

class TheTask {
  constructor(text, dueDate, urgent, importnt) {
    this.text = text;
    this.dueDate = new Date(dueDate);
    this.urgent = urgent;
    this.importnt = importnt;  
  } 
}

function daysTillEnd (dueDate) {
  var Today = new Date().getTime();
  var DueDateSubstr = new Date(dueDate).getTime();
  daysleft = DueDateSubstr-Today;
  let Difference_In_Days =
    Math.ceil
        (daysleft / (1000 * 3600 * 24));
  let DueDaysStatus = "";        
  (Difference_In_Days == 0) ? DueDaysStatus = "for today" 
  : (Difference_In_Days == 1) ? DueDaysStatus = "for tomorrow"
  : (Difference_In_Days < 0) ? DueDaysStatus = Difference_In_Days*(-1) + " days ago"    
  : DueDaysStatus = "do in "+ Difference_In_Days + " days"; 
  return DueDaysStatus;
}

var UrgentImportantTasks = [];
var NotUrgentImportantTasks = [];
var UrgentNotImportantTasks = [];
var NotUrgentNotImportantTasks = [];
var OverallArray = [UrgentImportantTasks, NotUrgentImportantTasks, UrgentNotImportantTasks, NotUrgentNotImportantTasks];
var OverallListofIDs = ["UrgentImportant", "NotUrgentImportant", "UrgentNotImportant", "NotUrgentNotImportant"];

function addContent () {
    var text_element = document.querySelector("#task_text");
    var text = text_element.value;
    var due_date_element = document.querySelector("#task_due_date");
    var due_date = new Date(due_date_element.value);
    var urgent_element = document.querySelector("#checkbox_Urgent");
    var important_element = document.querySelector("#checkbox_Important");
    var urgent = urgent_element.checked;
    var importnt = important_element.checked;
    var incomingData = new TheTask(text, due_date, urgent, importnt); 
let variant = urgent +"+"+ importnt;
switch (variant) {
  case "true+true" : UrgentImportantTasks.push(incomingData); break;
  case "false+true" : NotUrgentImportantTasks.push(incomingData); break;
  case "true+false" : UrgentNotImportantTasks.push(incomingData); break;
  case "false+false" : NotUrgentNotImportantTasks.push(incomingData); break;
}
pageRefresh ("Normal_Mode");
}

function pageRefresh (Mode) { 
for (var i=0; i < 4; i++) {                                          // loop through 4 arrays of tasks
document.querySelector(`#${OverallListofIDs[i]} ul`).innerHTML="";  // delete the content of the box
var numInList = -1;
for (const item of OverallArray[i]) {                               // fill box with tasks from corresponding array
numInList++;
  let HightlightColor = "black";
  if (Mode !== "Normal_Mode" ) {daysTillEnd(item["dueDate"]) == "for today" ? HightlightColor = "blue" : HightlightColor = "black"; }
  let added_content = document.createElement("li");
  added_content.innerHTML = `<div>${item["text"]}</div><div>
  <span style="font-weight:normal">${daysTillEnd(item["dueDate"])}</span></div><button class="hide" id="${OverallListofIDs[i]}${numInList}">[X]</button>`;
  added_content.style.color = HightlightColor;
  document.querySelector(`#${OverallListofIDs[i]} ul`).append(added_content);
  }
}

const Items = document.querySelectorAll('li button')
Items.forEach((item) => {
  item.addEventListener("click", () => {
    var LiItem = item.getAttribute("id");
    var NeededArrayId = LiItem.slice(0,(LiItem.length - 1));   
    var NeededArrayName = NeededArrayId + "Tasks";
    var NeededItemPosition = LiItem.slice(-1);
    var arr = window[NeededArrayName];
    window[NeededArrayName].splice(NeededItemPosition,1);
    pageRefresh ("Normal_Mode");
  });
}
);
} 

function showInputForm () {
  var toggleBlock = document.querySelector(".inputForm");
  toggleBlock.classList.toggle("hide");
}  

function hightlightTodayTasks () {
  document.querySelector("button[onmouseenter]").style.color = "blue";
  document.querySelector("button[onmouseenter]").style.fontWeight="bold";
  pageRefresh ("Highlight_Mode");
  }

function dehightlightTodayTasks () {
  document.querySelector("button[onmouseenter]").style.color = "black";
  document.querySelector("button[onmouseenter]").style.fontWeight="normal";  
  pageRefresh ("Normal_Mode");
    }  

function Sort(ArrayName) {
OverallArray.forEach ((array) => array.sort((a, b) => a.dueDate - b.dueDate));
pageRefresh ("Normal_Mode");
}

function DeleteTask() {
  const Items = document.querySelectorAll('li button');
Items.forEach((item) => {
  item.classList.toggle("hide");
})
}