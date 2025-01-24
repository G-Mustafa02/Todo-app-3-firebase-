import { collection, addDoc, Timestamp, getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 
import { db } from "./firebaseConfig.js";


const form = document.querySelector("#form");
const title = document.querySelector("#title");
const description = document.querySelector("#description")
const div = document.querySelector(".container")



let allTodos = [];
function renderData(arr){
  div.innerHTML = "";
  arr.map(item =>{
    div.innerHTML += `
    <div class="box">
            <p>title: ${item.title} </p>
            <p>description : ${item.description}</p>
        </div>`
  })
}


form.addEventListener('submit',async (event)=>{
    event.preventDefault();
    console.log("title --->", title.value);
    console.log("des -->", description.value);
    allTodos = [];

    try {
        const docRef = await addDoc(collection(db, "todos"), {
          title: title.value,
          description: description.value,
          date: Timestamp.fromDate(new Date()),

         
        });
        console.log("Document written with ID: ", docRef.id);
        title.value = "";
        description.value ="";



        const querySnapshot = await getDocs(collection(db, "todos"));

        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          allTodos.push(doc.data())
          
        });
        console.log(allTodos);
          renderData(allTodos)


      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
    

})






// const querySnapshot = await getDocs(collection(db, "todos"));
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   // console.log(doc.id, " => ", doc.data());
//   allTodos.push(doc.data())
//   console.log(allTodos);
//   renderData(allTodos)
// });
