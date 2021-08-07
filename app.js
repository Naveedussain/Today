const mongoose = require("mongoose");
const DB_URI = "mongodb+srv://NaveedHussain:<password>@cluster0.ic1ub.mongodb.net/NewUser";

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// Signup Page function

function signup() {
    var fullName = document.getElementById("fullName");
    var email = document.getElementById("email");
    var age = document.getElementById("age");
    var number = document.getElementById("phoneNumber");
    var password = document.getElementById("password");
    var address = document.getElementById("address");
    var message = document.getElementById("message");
    var obj = {
        fullName: fullName.value,
        email: email.value,
        age: age.value,
        number: number.value,
        password: password.value,
        address: address.value,

    };
    for (var x in obj) {
        if (obj[x] === "") {
            message.innerText = "Invalid Credential";
            setTimeout(() => {
                message.innerText = ""
            }, 2000)
            return;
        }
    }
    // console.log(obj);
    var users = JSON.parse(localStorage.getItem("list")) || [];
    var checkIndx = users.findIndex(function(val) {
        return val.email.toLowerCase() === obj.email.toLowerCase()
    })
    if (checkIndx === -1) {
        users.push(obj)
        localStorage.setItem("list", JSON.stringify(users))
        message.innerText = "Account Created Successfully You are going to login page"
        setTimeout(() => {
            location.href = "login.html"
        }, 2000)
    } else {
        message.innerText = "User Email Exists "
    }
    console.log(users);

    setTimeout(() => {
        message.innerText = ""
    }, 2000)

}


// Login Page function
function login() {
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    let message = document.getElementById("message")

    let obj = {
        email: email.value,
        password: password.value,
    };
    if (email.value === "" || password.value === "") {
        message.innerText = "Invalid Credential";
        setTimeout(() => {
            message.innerText = ""
        }, 2000)
        return;
    }

    var users = JSON.parse(localStorage.getItem("list")) || []
    var currentUser = users.find(function(val) {
        return val.email.toLowerCase() === obj.email.toLowerCase() && val.password === obj.password
    });
    if (currentUser) {
        localStorage.setItem("login user", JSON.stringify(currentUser))
        message.innerText = "Welcome!";
        setTimeout(() => {
            location.href = "index.html"
        }, 1000)

    } else {
        message.innerText = "Wrong email or password"
    }
    setTimeout(() => {
        message.innerText = ""
    }, 2000)
}


// for Logout
function logout() {
    var message = document.getElementById("message")
    localStorage.removeItem("login user")
    message.innerText = "Good Bye!"
    setTimeout(() => {
        location.href = "login.html"
    }, 2000)
}


// Current User on index.html
function getCurrentUser() {
    let welcome = document.getElementById("welcome")
    let info1 = document.getElementById("info1");
    let info2 = document.getElementById("info2");
    let info3 = document.getElementById("info3");
    let info4 = document.getElementById("info4");
    let info5 = document.getElementById("info5");
    let info6 = document.getElementById("info6");
    let loginUser = JSON.parse(localStorage.getItem("login user"));
    welcome.innerText = `Welcome! ` + loginUser.fullName
    info1.innerText = `Name: ` + loginUser.fullName
    info2.innerText = `Email: ` + loginUser.email
    info3.innerText = `Age: ` + loginUser.age
    info4.innerText = `Phone Number: ` + loginUser.number
    info5.innerText = `Password: ` + loginUser.password
    info6.innerText = `Address: ` + loginUser.address

}


// Div for inputText Bar
var inputText = document.getElementById("inputText");


// These are my Input Text Bar for Title and Description
var inputTitle = document.createElement("input");
inputTitle.setAttribute("type", "text");
inputTitle.setAttribute("id", "input1");
inputTitle.setAttribute("placeholder", "Title");


// console.log(inputTitle);
var inputDescription = document.createElement("input");
inputDescription.setAttribute("type", "text");
inputDescription.setAttribute("id", "input2");
inputDescription.setAttribute("placeholder", "Description");
// console.log(inputDescription);


// Now Button for Submit input bar
var submitbutton = document.createElement("button")
var submitbuttonText = document.createTextNode("Submit")
submitbutton.appendChild(submitbuttonText)
submitbutton.setAttribute("onClick", "submit()")
submitbutton.setAttribute("class", "btnSubmit")



// Post Function
function post() {

    document.getElementById("post").disabled = true;

    // appending my child to Parent
    inputText.appendChild(inputTitle)
    inputText.appendChild(inputDescription)
    inputText.appendChild(submitbutton)

}


// For posting 
var ul = document.getElementById("ul");


// Submiting input to post
const arr=[];
let BASE_URL = `http://localhost:3000`;
let objFirst = {
    title:inputTitle.value,
    description: inputDescription.value
};
if(inputTitle.value && inputDescription.value!=''){
    arr.push(obj);
    console.log(arr);
}
axios.post(`${BASE_URL}/createPostFromBody`,arr)
.then((response) => {
    console.log(response);
}).catch((err) =>{
    console.log(err);
});
const submit=()=>{
    var li = document.createElement("li");

    var card = ` <div class="mt-3 mb-2 card bg-white text-dark" style="width: 18rem; border: none;">
    <img src="https://source.unsplash.com/collection/190727/1600x900" class="card-img-top" alt="post-image">
    <div class="card-body">
        <h5 class="card-title">${inputTitle.value}</h5>
        <p class="card-text">${inputDescription.value}</p>
        <button class = "btn btn-primary my-4'>Delete</button>
        </div>
</div>`;
    // console.log(card);
    li.innerHTML = card;
    ul.appendChild(li);
    document.getElementById("post").disabled = false;
    if( inputTitle.value === "" || inputDescription.value === "")  {
        ul.appendChild(li).remove();}
    inputTitle.value = "";
    inputDescription.value = "";
    inputText.removeChild(inputTitle)
    inputText.removeChild(inputDescription)
    inputText.removeChild(submitbutton)
}



let getPost = () =>{
    axios.get(`${BASE_URL}/findPost`)
    .then((response) =>{
        console.log(response.data);
        response.data.forEach(element => {
            let li = document.createElement('li');
             card = `<div class="mt-3 mb-2 card bg-white text-dark" style="width: 18rem; border: none;">
            <img src="https://source.unsplash.com/collection/190727/1600x900" class="card-img-top" alt="post-image">
            <div class="card-body">
            <h5 class="card-title">${element.value}</h5>
            <p class="card-text text-dark">${element.value}</p>
            <button class = "btn btn-primary my-4'>Delete</button>
            </div></div>`;
            li.innerHTML = card;
            ul.appendChild(li);
        })
    }) .catch((err) =>{
        console.log(err);
    });
}
document.addEventListener("load",getPost());