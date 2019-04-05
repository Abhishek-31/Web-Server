console.log('Client side javascript file is loaded!')
var weatherform = document.querySelector('form')
const search=document.querySelector('input')
const check=document.querySelector('#messageone')
const check2=document.querySelector('#messagetwo')
// check.textContent = "abhishek"
// console.log(check)

weatherform.addEventListener('submit',(e)=>{

    e.preventDefault()
    const location=search.value
        check.textContent="Loading!!"
        check2.textContent=" "
    fetch('http://localhost:3000/weather?address='+location).then((resp) => {
    resp.json().then((data) => {
            if (data.error)
                check.textContent=data.error
            else
            {
                check.textContent=data.location
                check2.textContent=data.forecast
            }
            //     console.log(data.forecast)
            // console.log(data.location)
            //Although require does not work in
        })
    })
}) 

//Actually fetch returns stuff as promises API.



//fetch used here is to send the htp request from the browser. It is an browser based API, the script is running in browser so we can use it here. But node does not contain it.
