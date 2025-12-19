async function getData() {
    let res = await fetch("http://localhost:3000/data")
    try {
        if (!res.ok) {
            throw new Error("something went wrong");

        }
        let data = await res.json()
        // console.log(data)
        showData(data)
    } catch (error) {
        console.log(error.message)
    }
}



async function showData(data) {
    let container = document.getElementById("container")
    let item = document.createElement("div")
    // item.innerHTML=data.map(student=>{
    //     return `
    //     <p>ID : ${student.id}</p>
    //     <p>Name : ${student.name}</p>
    //     <button id=deletebtn${student.id}>Delete</button>
    //     <button id=editbtn${student.id}>Edit</button>

    //     `
    // }).join("")

    data.forEach(student => {
        let item = document.createElement("div")
        item.innerHTML = `
        <p>ID : ${student.id}</p>
        <p>Name : ${student.name}</p>
        <button id=deletebtn${student.id}>Delete</button>
        <button id=editbtn${student.id}>Edit</button>
        `
        container.appendChild(item)
    })

    data.forEach(student => {
        let delbtn = document.getElementById(`deletebtn${student.id}`)
        let editbtn = document.getElementById(`editbtn${student.id}`)
        delbtn.onclick = () => {
            deleteData(student.id)
        }

        editbtn.onclick = () => {
            editData(student.id)
        }
    });

}
//Delete

async function deleteData(id) {
    let res = await fetch(`http://localhost:3000/data/${id}`, { "method": "DELETE" })
    try {
        if (!res.ok) {
            throw new Error("Data Not Deleted");

        }
        alert("Data successfully Deleted")
    } catch (error) {
        console.log(error.message)
    }

}
//Editing the Data

async function editData(id) {
    let studentID = document.getElementById("id")
    let name = document.getElementById("name")
    let image = document.getElementById("image")
    let res = await fetch(`http://localhost:3000/data/${id}`)
    try {
        if (!res.ok) {
            throw new Error("Something not getting data");

        }
        let data = await res.json()
        studentID.value = data.id;
        name.value = data.name;
        image.value = data.image
    } catch (error) {
        console.log(error)
    }
}

async function saveData() {
    let studentID = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let image = document.getElementById("image").value;
    let obj = {
        "name": name,
        "image": image
    }
    let studentMethod = studentID ? "PUT" : "POST";
    let URL = studentID ? `http://localhost:3000/data/${studentID}` : "http://localhost:3000/data";
    let res = await fetch(URL, {
        "method": studentMethod,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(obj)
    })
    try {
        if (!res.ok) {
            throw new Error("Data Not Updated");

        }
        alert("Data successfully Updated")
    } catch (error) {
        console.log(error)
    }
}

document.addEventListener("DOMContentLoaded", getData)