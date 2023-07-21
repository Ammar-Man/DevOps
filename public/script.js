console.log("hello");

const API_URL = "http://localhost:3040";

// to avoid erron with out login button 

    if( document.querySelector('#login').style.display == "block")  {
        console.log("test1");

        document.querySelector('#btn-login').addEventListener('click', (e) => {
            login();
        });
    
        document.querySelector('#btn-register').addEventListener('click', (e) => {
            getRegister();
        });

    }


// If you have token in localStorage !

if(localStorage.getItem('jwt')!= ""){

    getUserInfo();
    console.log("test_jwt");
    document.querySelector('#btn-Profile').addEventListener('click', (e) => {
        getUserInfo();
        console.log("test_jwt2");
    });

    document.querySelector('#btn-send-register').addEventListener('click', (e) => {
        userRegister();
    });
    console.log("test_jwt3");
}

document.querySelector('#loginbtm').addEventListener('click', (e) => {
    loginHtml();
});



document.querySelector('#btn-Bank').addEventListener('click', (e) => {
    // getBank();
});

async function getUserInfo() {
    const resp = await fetch(API_URL + '/users/info', {
        method: "GET",
        headers: {

            "Authorization": "Bearer " + localStorage.getItem('jwt')
        }
    });

    if (resp.status > 201) { return showLoging(); }

    const notes = await resp.json();
    console.log(notes);
    document.querySelector('#usersInfo').style.display = 'block';
    document.querySelector('#logOutButton').style.display = 'block';
    document.querySelector('#btn-Profile').style.display = 'block';
    document.querySelector('#btn-Bank').style.display = 'block';
    document.querySelector('#login').style.display = 'none';


    let notesHTML = "";

    notesHTML += `
         <div><h2>Users info</h2></div>
         <div class = "note">
         Id: ${notes.userInfo._id} <br>
         Email: ${notes.userInfo.email} <br>
         FirstName : ${notes.userInfo.firstName}<br>
         LastName:  ${notes.userInfo.lastName}  <br>
        </div>
        
         `;

    document.querySelector('#usersInfo').innerHTML = notesHTML;
}

async function getCabins(name) {
    const resp = await fetch(API_URL + '/cabins/owned', {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('jwt')
        }
    });

    if (resp.status > 201) { return showLoging(); }

    const notes = await resp.json();
    console.log(notes);

    /**/
    let notesHTML = "";
    function testInputTrue(note) {
        let sauna = "";
        let beach = "";
        if (note.sauna == true) { sauna = "Sauna" }
        if (note.beach == true) { beach = "Beach" }
        if (sauna != "" && beach != "") { return sauna + ", " + beach; }
        return sauna + beach;
    }
    let nu = 0;

    notesHTML += `
        <form>     
            <select id="selectedCabins">`
    nu = 0;
    for (const note of notes) {
        nu += 1;
        notesHTML += `
                    <option value="${note.address} ">
                    Cabin  ${nu} -
                    (${testInputTrue(note)}) <br>
                        ${note.address} 
                    </option>
                `;

    } ` 
            </select>
            <button id="btn">Get the Selected Value</button>
        </form>
   `;
    if (!name) { document.querySelector('#selectCabins').innerHTML = notesHTML; }
    else {
        document.querySelector('#' + name).innerHTML = notesHTML;
    }


}

async function getServices(name) {
    const resp = await fetch(API_URL + '/services', {
        method: "GET",
        headers: { "Authorization": "Bearer " + localStorage.getItem('jwt') }
    });

    if (resp.status > 201) { return showLoging(); }

    const notes = await resp.json();
    console.log(notes);

    /**/
    let notesHTML = "";



    notesHTML += `
    <form>     
        <select id="selectedServices">`
    nu = 0;
    for (const note of notes) {
        nu += 1;
        notesHTML += `
                <option value=" ${note.service} ">
                ${note.service} 
                </option>
            `;

    } ` 
        </select>
        <button id="btn">Get the Selected Value</button>
    </form>
`;

    if (!name) { document.querySelector('#selectServices').innerHTML = notesHTML; }
    else {
        document.querySelector('#' + name).innerHTML = notesHTML;
    }


}

function insertChooseCabin() {
    let chooseCabinDiv = `
    <div class="notes" id="chooseCabin">
    <h2>Choose cabin</h2>
    <div id="selectCabins">Not notes to show..</div>
    <h2>Select Services</h2>
    <div id="selectServices">Not notes to show..</div>
    <div id="selectDate">
        <h2> Select Date</h2>
            <input type="date" id="selectedDate" name="birthday">
            <a class="button button1" onclick="sendOrders()">Send</a>
    </div>
</div>
    `;

    document.querySelector('#insertChooseCabin').innerHTML = chooseCabinDiv;
}
function insertOrderedServices() {
    let chooseCabinDiv = `
    <div  id="ordersInfo">
    </div>
    <div id="selectServicesBtn">
    <a class="button button1" onclick="sendDeleteOS()">Delete</a>
    <a class="button button1" onclick="fixChangeOrders()">Change</a>
    </div>
    <div id="changeFolder">
    <div id="changeCabins"></div>
    <div id="changeServices"></div>
    <div id="changeDate"></div>
    <div id="selectServicesBtn2"></div>
    </div>
    `;

    document.querySelector('#insertOrderedServices').innerHTML = chooseCabinDiv;
}

async function login() {
    const resp = await fetch(API_URL + '/users/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value

        })
    });
    const respJson = await resp.json();
    console.log(respJson);
    if (resp.status > 201) { return alert(respJson.msg); }

    localStorage.setItem("jwt", respJson.token);
    getUserInfo();
    // getBank();

    // insertChooseCabin();
    // insertOrderedServices();
    // getCabins();
    // getServices();
    // getOrders();
    // LogoutButton();
}

async function userRegister() {
    const resp = await fetch(API_URL + '/users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({


            firstName: document.querySelector('#reg-firstName').value,
            lastName: document.querySelector('#reg-lastName').value,
            email: document.querySelector('#reg-email').value,
            password: document.querySelector('#reg-password').value,
            archived: true,
        })
    });
    const respJson = await resp.json();
    console.log(respJson);
    if (resp.status > 201) { return alert(respJson.msg); }

    localStorage.setItem("jwt", respJson.token);
    getUserInfo();
    // getBank();


    // insertChooseCabin();
    // insertOrderedServices();
    // getCabins();
    // getServices();
    // getOrders();
    // LogoutButton();
}

async function getBank() {
    const resp = await fetch(API_URL + '/bankaccounts', {
        method: "GET",
        headers: {

            "Authorization": "Bearer " + localStorage.getItem('jwt')
        }
    });

    if (resp.status > 201) { return showLoging(); }

    const notes = await resp.json();
    // console.log(notes);
    // console.log(notes[0]);
    document.querySelector('#usersBank').style.display = 'block';

    let notesHTML = "";
    notesHTML += `
         <div><h2>Bank Accounts info</h2></div>
         <div class = "note">
         BankAccountBalance: ${notes[0].bankAccountBalance} £ <br>
         BankAccountNumber: ${notes[0].bankAccountNumber} <br>
         VisaCardId : ${notes[0].visaCardId}<br>
         
        </div>
        
         `;

    document.querySelector('#usersBank').innerHTML = notesHTML;
}
// getAllBikes();

async function getAllBikes() {
    const resp = await fetch(API_URL + '/bikes', {
        method: "GET",
        headers: {

            "Authorization": "Bearer " + localStorage.getItem('jwt')
        }
    });

    if (resp.status > 201) { return showLoging(); }

    const notes = await resp.json();
    console.log(notes);
    // console.log(notes[0]);
    document.querySelector('#bikesHolders').style.display = 'block';

    let notesHTML = "";

    for (let i = 0; i < notes.length; i++) {
        notesHTML += `
      <div class="alert alert-warning media ">
            <div class="media-left">
                            <a href="#">
                         
                            <img src="${notes[i].bikeImg}"class="img-thumbnail img-responsive image_max media-object" alt="Italian Trulli" > <br>
                               
                            </a>
                    </div>

                    <div class="media-body">
                        <h4 class="media-heading">${notes[i].bikeName}</h4>
                        Kunto: ${notes[i].bikeCondition}<br>
                        Hinta: <b> ${notes[i].bikePrice} €</b><br>
                        Lisätiedot: ${notes[i].moreInfo}<br>
                        createdAt: ${notes[i].createdAt}<br>
                        Lisätiedot: ${notes[i].moreInfo}<br>
                        Osoita : Vantaa
                    </div>
        </div>
      `;
    }

    document.querySelector('#bikesHolders').innerHTML = notesHTML;
}

function loginHtml(){
    document.querySelector('#login').style.display = 'block';
    let notesHTML = "";
    notesHTML += `
                <h1>Login</h1>
                <p>email: Test@gmail.com /
                password: 123456
                </p>
                <p>Please login in this form.</p>
                <hr>
                <form class="form-horizontal">
                <div class="form-group">
                    <label class="control-label col-sm-2" for="email">Email:</label>
                    <div class="col-sm-10">
                        <input class="form-control" id="email">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="pwd">Password:</label>
                    <div class="col-sm-10">
                        <input class="form-control" type="password" id="password">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <input class="btn btn-default" onclick="login()" id="btn-login" type="button" value="Login">
                        <input class="btn btn-default " id="btn-register" type="button" value="Register">
                    </div>
                </div>
                </form>
    `;
    document.querySelector('#login').innerHTML = notesHTML;
}

async function getOrders() {
    const resp = await fetch(API_URL + '/orders', {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('jwt')
        }
    });

    if (resp.status > 201) { return showLoging(); }

    const notes = await resp.json();
    console.log(notes);

    /**/
    let notesHTML = "";
    notesHTML += `<h2>Ordered services</h2>`;
    notesHTML += `  
    <form id="getOrdersFormId"> 
    <select class="flex-container" id="OrderedSelectedValue" multiple> 
    `;
    for (const note of notes) {
        const changeDate = new Date(note.date);
        if (changeDate === 'Invalid Date') return;
        notesHTML += `
        <option class = "note flex-container" value="${note._id}">
                    
                        <div class="flex flex-item-left ">${note.cabin} ,</div>
                        <div class="flex flex-item-right "> ${note.service} ,</div>
                        <div class="flex flex-item-left "> ${changeDate.toISOString().split('T')[0]}</div>
                    
         </option> 
            `;

    }
    notesHTML += ` `;

    document.querySelector('#ordersInfo').innerHTML = notesHTML;

}

async function sendOrders() {
    const resp = await fetch(API_URL + '/orders', {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('jwt'),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({


            date: document.querySelector('#selectedDate').value,
            cabin: document.querySelector('#selectedCabins').value,
            service: document.querySelector('#selectedServices').value
        })
    });
    //const respJson = await resp.json();
    //resp.send(resp);
    getOrders();
    if (resp.status < 201) { return alert("Yours orders  been sent"); }
    console.log(resp);
    // if (resp.status > 201) { return showLoging(); }

    // const notes = await resp.json();
    // console.log(notes);

}

async function fixChangeOrders() {

    let SelectedIdValue = getSelectedOptionValue('OrderedSelectedValue');
    if (!SelectedIdValue) return;
    localStorage.setItem("SelectedIdValue", SelectedIdValue);
    let notesHTML = "";
    let chooseCabinHTML =
        `
    <h2>Choose cabin</h2>
    <div id="selectCabins">Not notes to show..</div>
    <h2>Select Services</h2>
    <div id="selectServices">Not notes to show..</div>
    <div id="selectDate">
    <h2> Select Date</h2>
    <input type="date" id="selectedDate" name="birthday">
    <a class="button button1" onclick="sendOrders()">Send</a>
    </div>`;


    document.querySelector('#OrderedSelectedValue').innerHTML = notesHTML;
    document.querySelector('#getOrdersFormId').innerHTML = notesHTML;
    document.querySelector('#selectServicesBtn').innerHTML = notesHTML;
    document.querySelector('#chooseCabin').innerHTML = '<h2>Choose cabin</h2>';
    // document.querySelector('#chooseCabin').style.display = 'none';
    getCabins('changeCabins');
    getServices('changeServices');
    document.querySelector('#changeDate').innerHTML = `<input type="date" id="selectedDate" name="birthday">`;
    document.querySelector('#selectServicesBtn2').innerHTML = ` <a class="button button1" onclick="saveOrderServices()">Change</a>`;



}

function getSelectedOptionValue(name) {
    let selectNameId = "";
    if (name) {
        selectNameId = document.querySelector('#' + name);
        if (selectNameId.value) { return selectNameId.value; }
        if (selectNameId.options) { return selectNameId.options[selectNameId.selectedIndex]; }
    }
    else { return false; }

    // let e = document.querySelector('#OrderedSelectedValue');
    //     var value = e.value;
    //     var text = e.options[e.selectedIndex].text;

    return { selectNameId };
}
 
async function sendChangeOrderServices() {
    const resp = await fetch(API_URL + '/orders/' + localStorage.getItem('SelectedIdValue'), {
        method: "PATCH",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('jwt'),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            date: localStorage.getItem('selectedDate'),
            cabin: localStorage.getItem('selectedCabins'),
            service: localStorage.getItem('selectedServices')
        })
    });
    //window.location.reload();

    insertChooseCabin();
    insertOrderedServices();
    getCabins();
    getServices();
    getOrders();

    if (resp.status < 201) { return alert("Yours orders  been chenged"); }
    if (resp.status > 201) { return alert("Date is not selected!"); }
    console.log(resp);

}
function saveOrderServices() {

    let selectedCabins = getSelectedOptionValue('selectedCabins');
    if (!selectedCabins) return;

    let selectedServices = getSelectedOptionValue('selectedServices');
    if (!selectedServices) return;

    let selectedDate = getSelectedOptionValue('selectedDate');
    if (!selectedDate) return;

    localStorage.setItem("selectedCabins", selectedCabins);
    localStorage.setItem("selectedServices", selectedServices);
    localStorage.setItem("selectedDate", selectedDate);

    sendChangeOrderServices();
}

async function sendDeleteOS() {
    const selectNameId = document.querySelector('#OrderedSelectedValue').value;
    const resp = await fetch(API_URL + '/orders/' + selectNameId, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('jwt'),
            "Content-Type": "application/json"
        }
    });
    //const respJson = await resp.json();
    //resp.send(resp);

    getOrders();

    if (resp.status < 201) { return alert("the orders services been deleted"); }
    console.log(resp);
    // if (resp.status > 201) { return showLoging(); }

    // const notes = await resp.json();
    // console.log(notes);

}

function myCabins() {
    console.log("cabins");
    getCabins();
}

function myUsers() {
    console.log("users");
    getUserInfo();
}

function myBookins() {
    console.log("bookings");
    getOrders();
}

function logOutUsers() {
    localStorage.removeItem("jwt");
    window.location.reload();
}

function LogoutButton() {
    if ('jwt' in localStorage) {
        document.querySelector('#logOutButton').style.display = 'block';
    }

}

function getRegister() {
    document.querySelector('#login').style.display = 'none';
    document.querySelector('#container-register').style.display = 'block';
}

LogoutButton();
// getUserInfo();
getAllBikes();
// getBank();