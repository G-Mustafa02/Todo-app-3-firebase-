import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, Timestamp, getDocs,deleteDoc, updateDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDP_EuJz4b4Z5dF1se7VAvRVbYeyeoehjk",
  authDomain: "first-firebase-prj-c41ac.firebaseapp.com",
  projectId: "first-firebase-prj-c41ac",
  storageBucket: "first-firebase-prj-c41ac.firebasestorage.app",
  messagingSenderId: "1096907115442",
  appId: "1:1096907115442:web:74aabbb614f13088fa72ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.querySelector("#form");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const addTodo = document.querySelector("#addTodo")
const div = document.querySelector(".container")
const updateBtn = document.querySelector(".updatedbtn")
updateBtn.style.visibility = "hidden";


renderData()

form.addEventListener('submit', async (e)=>{
    e.preventDefault()
    // console.log(title.value, description.value);
    try {
        const docRef = await addDoc(collection(db, "todos"), {
          title: title.value,
          description:description.value,
          date: Timestamp.fromDate(new Date()),
        });
        title.value = "";
        description.value = "";
        console.log("Document written with ID: ", docRef.id);
        
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      renderData()
})


async function renderData() {
    const docRef = await getDocs(collection(db, "todos"));
    docRef.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    const todoData = doc.data();
    const docId = doc.id;
     div.innerHTML += `
    <div class="box">
             <p>title: ${todoData.title} </p>
             <p>description : ${todoData.description}</p>
             <button id="delBtn" onclick="deletefunc('${docId}')">Delete</button>
             <button id ="editBtn" onclick="editfunc('${docId}')">Edit</button>
         </div>`
});
}
// window.deletefunc = async function(docId){
//     const docRef = doc(db, "todos", docId)
//     await deleteDoc(docRef);
//     div.innerHTML = "";
//     renderData()

// }
window.deletefunc = async function(docId) {
    try {
        const docRef = doc(db, "todos", docId);
        await deleteDoc(docRef);
        console.log("Document deleted successfully");
        div.innerHTML = "";
        renderData();
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
}

window.editfunc = async function(docId){
    try {
        const docRef = await getDoc(doc(db, "todos", docId));
        const currentTodo = docRef.data();
        console.log(currentTodo);
        title.value = currentTodo.title;
        description.value = currentTodo.description;

        const addTodo = document.querySelector("#addTodo")
        // Hide the button but keep its space
        addTodo.style.visibility = "hidden";
        var updateBtn = document.querySelector(".updatedbtn")

        updateBtn.style.visibility = "visible";


        

        // let updateBtn = document.querySelector(".updatedbtn")
        updateBtn.addEventListener('click', async()=>{
            const updatedtitle = title.value;
            const updatedDescription = description.value;
            const updateDocument = doc(db, "todos", docId);

            
            await updateDoc(updateDocument, {
            title:  updatedtitle,
            description: updatedDescription
            });
            div.innerHTML = "";
            renderData();
            title.value = "";
            description.value = "";
            addTodo.style.visibility = "visible";
            updateBtn.style.visibility = "hidden";

        })
       
        
    }catch (error) {
        console.log(error);
        
        
    }
}
