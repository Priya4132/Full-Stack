// import { baseurl } from "./baseurl.js";


// console.log(baseurl);

let form = document.getElementById("form");
form.addEventListener("submit", async function () {
  event.preventDefault();
  let username = form.username.value;
  let email = form.email.value;
  let password = form.password.value;
  let gender = form.gender.value;
  let mobile = form.mobile.value;
  let userObj = { username, email, password, gender, mobile };

  try {
   let res=await  fetch("https://scientific-young-ankylosaurus.glitch.me/login");
   let data= await res.json();
   let user=data.filter((el,i)=> el.email==email);
   if(user.length!=0){
    alert("User Already Registered , Please login");
    window.location.href="login.html"
   }
   else{//if user not present push data to json server
    await fetch("https://scientific-young-ankylosaurus.glitch.me/login" , {
        method:"POST",
        headers: {
            "content-type":"application/json"
        },
        body:JSON.stringify(userObj)
    });
    alert("Signup successful");
       window.location.href="login.html"
   }
  }
  catch{
console.log("not able to signup")
  }
  /// logic is check whether email is present in the DB
//   fetch("https://scientific-young-ankylosaurus.glitch.me/login")//get request
//     .then((res) => res.json())
//     .then((data) => {
//       let user = data.filter((el, i) => el.email == email);
//       if (user.length != 0) {
//         /// user present
//         alert("User already registred, please login");
//         window.location.href = "login.html"
//       } else {
//         /// user is not present
//         /// push the user into json server
//         fetch("https://scientific-young-ankylosaurus.glitch.me/login", { //post request
//           method: "POST",
//           headers: {
//             "content-type": "application/json",
//           },
//           body: JSON.stringify(userObj),
//         }).then(() => {
//           alert("Signup Sucessfull");
//           window.location.href = "login.html"
//         });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       alert("Something wenr wrong, Please try again later");
//     });
});