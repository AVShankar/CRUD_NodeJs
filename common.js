//JS file for inex.html (Homepage)

//Adding contact details to table
function homeOnload() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    console.log(this.status);
    if (this.status == 200 && this.readyState == 4) {
      var count = 1;
      console.log("success");
      var contactDetails = JSON.parse(this.responseText);
      contactDetails.forEach(function(individualContact) {
        console.log(count);
        document.getElementById("content").innerHTML +=
          `<tbody><tr><td><div id='name'>` +
          individualContact.name +
          `</div></td><td><div id='phone'>` +
          individualContact.phone +
          `</div></td><td><div id='email'>` +
          individualContact.email +
          `</div></td><td><div id='address'>` +
          individualContact.address +
          "</div></td><td>" +
          `<input id=${individualContact._id} type=\"button\" value=\"Delete\" class=\"btn btn-danger\" onclick=\"erase()\">` +
          "</td></tr></tbody>";
        count += 1;
      });
    }
  };
  xhttp.open("GET", "http://localhost:3000/contacts", true);
  xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  xhttp.send();
}

//Deleting Contact details
//erase() Function
function erase() {
  console.log("You clicked Delete!");
  var id = {
    id: event.target.id
  };
  console.log(id);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("Deleted!");
    }
    window.location.replace("./");
    return true;
  };

  xhttp.open("DELETE", "http://localhost:3000/erase", true);
  xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(id));
}

//Newcontact.html Js file
// Adding a new contact to data base
function addContact() {
  var newContact = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value
  };
  console.log(newContact);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readystate == 4 && this.staus == 200) {
      console.log("Data sent successfully!");
    }
    window.location.replace("./index.html");
    return true;
  };

  xhttp.open("POST", "http://localhost:3000/newcontact", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(newContact));
}

// Update.HTML onload function

function updateOnload() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    console.log(this.status);
    if (this.status == 200 && this.readyState == 4) {
      var count = 1;
      console.log("success");
      var contactDetails = JSON.parse(this.responseText);
      contactDetails.forEach(function(individualContact) {
        console.log(count);
        document.getElementById("content").innerHTML +=
          `<tbody><tr><td contenteditable><div id='name${individualContact._id}'>` +
          individualContact.name +
          `</div></td><td contenteditable><div id='phone${individualContact._id}'>` +
          individualContact.phone +
          `</div></td><td contenteditable><div id='email${individualContact._id}'>` +
          individualContact.email +
          `</div></td><td contenteditable><div id='address${individualContact._id}'>` +
          individualContact.address +
          "</div></td><td>" +
          `<input id=${individualContact._id} type=\"button\" value=\"Update\" class=\"btn btn-info\" onclick=\"update()\">` +
          "</td></tr></tbody>";
        count += 1;
      });
    }
  };
  xhttp.open("GET", "http://localhost:3000/contacts", true);
  xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  xhttp.send();
}

//update() Function
function update() {
  var name = "name".concat(event.target.id);
  var phone = "phone".concat(event.target.id);
  var email = "email".concat(event.target.id);
  var address = "address".concat(event.target.id);
  var newDetails = {
    id: event.target.id,
    name: document.getElementById(name).innerText,
    phone: document.getElementById(phone).innerText,
    email: document.getElementById(email).innerText,
    address: document.getElementById(address).innerText
  };
  console.log("Yeah man it's Update!");
  console.log(newDetails);
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("Contact updated successfully!");
    } else {
      console.log("Failed to upadte");
    }
  };
  xhttp.open("PUT", "http://localhost:3000/update", true);
  xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(newDetails));
}
