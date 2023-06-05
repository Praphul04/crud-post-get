const addUserBtn = document.getElementById('addUser');
const btnText = addUserBtn.innerText;
const usernameTextFeild = document.getElementById('userName');
const recordsDisplay = document.getElementById('records');
const emailIdText = document.getElementById('emailId');

let userArray =[];
let edit_id = null;
let edit_email = null; 


// let objstr = localStorage.getItem('users')
// if(objstr!=null){
// userArray  = JSON.parse(objstr);

axios.get('https://crudcrud.com/api/5b79606c1b924635aecc6483d5007452/appointmentData')
.then((response)=>{

    console.log(response)
    for(var i=0; i< response.data.length; i++){
        DisplayInfo(userArray);
        
    }
}).catch((err)=>{
    console.log(err)
})



//}
DisplayInfo();
addUserBtn.onclick=()=>{
    const name =  usernameTextFeild.value;
    const email = emailIdText.value;
    if(edit_id!= null || edit_email!= null){
     userArray.splice(edit_id,1,{'name' : name,'email' : email});
     edit_id = null;
     edit_email = null;
    }else{
        
        userArray.push({'name' : name, 'email': email});
       

    }
  
SaveInfo(userArray);
usernameTextFeild.value = '';
emailIdText.value='';
DisplayInfo();
addUserBtn.innerText = btnText;
}


function SaveInfo(userArray){
    // let str =  JSON.stringify(userArray);
    const str ={
        userArray
    }
    axios.post('https://crudcrud.com/api/5b79606c1b924635aecc6483d5007452/appointmentData',str)
    .then((response)=>{
        console.log(response)
    }).catch((err)=>{
        console.log(err)
    })

    
    // DisplayInfo();
// localStorage.setItem('users', str);

 }
function DisplayInfo(){
let statement = '';
userArray.forEach((user,i)=> {
    statement += `<tr>
    <th scope="row">${i+1}</th>
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td><i class="btn text-whilte fa fa-edit btn-info mx-3" onclick='editInfo(${i})'></i><i class="btn btn-danger text white fa fa-trash"onclick='DeleteInfo(${i})'></i></td>
  </tr>`;
})
recordsDisplay.innerHTML = statement;
}


function editInfo(id){
    alert('Do You Want to Edit');
    edit_id = id;
    // edit_email = id;
    axios.put('https://crudcrud.com/api/5b79606c1b924635aecc6483d5007452/appointmentData',id)
    .then((response)=>{
        console.log(response);
      
    }).catch((err)=>{
        console.log(err)
    })
     
    
    usernameTextFeild.value = userArray[id].name;
    emailIdText.value = userArray[id].email;   
    addUserBtn.innerText='Save Changes';
}


function DeleteInfo(id){
    alert('Do You Want to Delete');
    userArray.splice(id,1);
    // userArray.splice(id1,1);
    axios.delete('https://crudcrud.com/api/5b79606c1b924635aecc6483d5007452/appointmentData',id)
.then((response)=>{
    console.log(DeleteInfo(id));
  
}).catch((err)=>{
    console.log(err)
})
    SaveInfo(userArray);
    DisplayInfo();
}
