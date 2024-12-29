// import { baseurl } from "./baseurl.js";


// console.log(baseurl);

let form = document.getElementById("form");
form.addEventListener("submit", function () {
  event.preventDefault();
//   let username = form.username.value;
  let email = form.email.value;
  let password = form.password.value;
//   let gender = form.gender.value;
//   let mobile = form.mobile.value;
//   let userObj = { username, email, password, gender, mobile };
  /// logic is check whether email is present in the DB
  fetch("https://scientific-young-ankylosaurus.glitch.me/login")//get request
    .then((res) => res.json())
    .then((data) => {
      let user = data.filter((el, i) => el.email == email);
      if (user.length != 0) {
        /// user present
        // alert("User already registred, please login");
        // window.location.href = "login.html";
        if(user[0].password==password){
            alert("Login Success");
            localStorage.setItem("loginData",JSON.stringify(user[0]));
            window.location.href="todos.html"
        }
        else{
            alert("Wrong Password, please login with correct password");
        }

      } else {
        /// user is not present
        /// push the user into json server
        alert("User not Registered please signup");
        window.location.href="signup.html";
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Something wenr wrong, Please try again later");
    });
});