async function getdata() {
    let res=await fetch("http://localhost:3000/data")
    try {
        if(!res.ok){
            throw new Error("Something happen");
            
        }
        let data=await res.json()
        showData(data)
    } catch (error) {
        console.log(error.message)
    }
}
async function showData(data) {
    let container=document.getElementById("container")
    data.forEach(obj => {
        let item=document.createElement("div")
        item.innerHTML=`
        <p>ID : ${obj.id}</p>
        <p>Name : ${obj.name}</p>
        <img src='${obj.image}'>
        `
        container.appendChild(item)
    });
    
}
document.addEventListener("DOMContentLoaded", getdata)