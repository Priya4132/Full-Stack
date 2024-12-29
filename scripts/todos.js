import { logout } from "./logout.js";

logout();
let loginData = JSON.parse(localStorage.getItem("loginData"));

let form=document.getElementById("form");
form.addEventListener("submit", async function(){
   event.preventDefault();
   let todoname=form.todoname.value;
   let deadline=form.deadline.value;
   let priority=form.priority.value;
   let todoObj={
    todoname,deadline,priority,status:false,userId:loginData.id
   }
// now push todo from data to json server/
//use post method to add data to json server
   try{
   await  fetch("https://scientific-young-ankylosaurus.glitch.me/todos",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(todoObj)
    })
    alert("todo Added Succefully");

   }
   catch{;
   }


})

// fucntion for fething todos details


window.onload= async()=>{
    let data=await getTodos();
    displayTodos(data);
}
async function getTodos(){
    try{
        let res=await fetch("https://scientific-young-ankylosaurus.glitch.me/todos");
        let data=await res.json();
        return data;
    }
    catch{
        alert("Something went wrong , not able to fetch todods");
    }
}
// fucntion for showing todos details
function displayTodos(arr){
    let cont=document.getElementById("cont");
    cont.innerHTML="";
    arr.map((el,i)=>{
        let card=document.createElement("card");
        card.setAttribute("class","card")
        let todoname=document.createElement("h4");
        todoname.textContent=`Title:${el.todoname}`
         let priority=document.createElement("h4");
        priority.textContent=`Priority:${el.priority}`;
        let deadline = document.createElement("h5");
        deadline.textContent = `Deadline: ${el.deadline}`;
        let newDeadline= new Date(el.deadline);
        if(newDeadline<Date.now() && el.status==false){
card.classList.add("pending");
        }
        let status=document.createElement("h4");
        if(el.status==true){
            status.textContent=`Status:Completed`;

        }
        else{
            status.textContent=`Status:Pending`;
        
        }

        let changeStatus=document.createElement("button");
        changeStatus.setAttribute("class", "todobtns")
        changeStatus.textContent="Change Status";
        changeStatus.addEventListener("click", async function(){
            changeStatusFn(el,i); 
        });
        let deleteTodoButton = document.createElement("button");
        deleteTodoButton.setAttribute("class", "todobtns");
        deleteTodoButton.textContent = `Delete Todo`;
        deleteTodoButton.addEventListener("click", async function () {
          deleteTodoFn(el, i);
        });
        card.append(todoname,deadline,priority,status,changeStatus,deleteTodoButton);
        cont.append(card);
        getTodos();
    })
}

// function for changing status of todos
async function changeStatusFn(el,i){
    let updatedTodos={...el, status:!el.status };
    let todoId=el.id;
    try{
        await fetch(`https://scientific-young-ankylosaurus.glitch.me/todos/${todoId}`, {
            method:"PATCH",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(updatedTodos)
        })
        alert("Todos Status updated Successfully....");
       getTodos();
        
    }
    catch{
        alert("not able to update todos")
    }

}


// function for deleting todo

async function deleteTodoFn(el, i) {
    let todoId = el.id;
    fetch(`https://scientific-young-ankylosaurus.glitch.me/todos/${todoId}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("Todo Deleted....");
        /// reload to get updated data
        // window.location.reload()
        // or else call loadData funtion
        getTodos();
      })
      .catch((err) => {
        alert("Something went wrong in updation");
        console.log(err);
      });
  }
