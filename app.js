const path=require('path')
const express=require("express")
const hbs=require('hbs')

const app=express()
console.log(__dirname) // Helps to give the directoy info where app.js is present. It is present as a parameter to a function that is used to wrap our node.js functionalities.


//Further, we can add more path customisations using path module that is inbuilt in nodejs
// console.log(path.join(__dirname,"/source")) // now as source contains index.html that means something special which is the first that is fired when srever is runned, our different settings that we added later in app.get('',....) would not run.
const indexpath = path.join(__dirname, "/source")
//This is the method for changing the static path. All the css, images and js files which are static are present in this folder and all the changes hsould be in order of this path. Now after this I need to add a static path for my node application to work upon and this happens by app.use(express.static(indexpath))


const viewspath=path.join(__dirname,"/templates/views")
const partialspath=path.join(__dirname,"/templates/partials")

//hbs handlebar always goes for looking for a folder names views. If it is not finding it then it would return a very large error message and that won't work so for making it work either you keep all hbs docs in a folder names views and if not, then you could explicitly give path to your view and for that you could use app.set('views',viewspath) and then in viewspath you would have to give path to a folder, not necessarily with a name views in it but anything.
app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)
app.use(express.static(indexpath)) 
console.log('alala')
app.get('',(req,res)=>
{
    res.render('index',{            //index should be present in views folder in your project and there is no need for extension. Further, you would see that if you want to change the view location, then that is possible too. It is given in above stated comments.
        title:"My project",
        age:19,
        name:"Abhishek"
    })
})
// This way 
// console.log(__filename)
//app.get will tell what will the server do in case that app.com is called or app.com/first or app.com/second is called. First argument of app.get is an empty string which will contain, something after / if it is home that is app.js, then it would be empty.
//(req is short form for request and res for response)
// app.get('',(req,res)=>{
// res.send('<h1>abhishek</h1')
// })
// This above one runs only when index.html is not found in root directory or any other path that is present.
// We can add a folder which cosists of all the files of html and further, we can add the path by using path module that is inbuilt in nodejs. path.join joins the path and returns something special.

app.get('/help', (req, res) => {
    res.render('help', { title: 'help', age: 18, name: "Abhishek"})
})
app.get('/weather',(req,res)=>{
    res.render('weather', { title: "Weather", age: 20,name: "Abhishek"})
})
app.get('/about',(req,res)=>{
    res.render('about', { title: 'About', name: "Abhishek"})
})

app.get('Just check',(res,req)=>{
    res.send({name:'Abhishek',age:18})
})
app.get('/help/*', (req, res) => {
    res.send("No help article found")
})
app.get("/products",(req,res)=>{
    if(!req.query.abhishek){
        return res.send({
            error:"Sorry you have to provide my surname"
        })
    }      //Checking whether it exists or not so that we can do stuff accodingly
    console.log(req.query.abhishek) // Works when !req.query.abhishek Falsifies.
    products=["agarwal","singhal","bansal"]
    damdam=[]
    damdam=products.filter((surname)=>{return surname==req.query.abhishek||surname=="agarwal"})
    return res.send({
         damdam
    })
})
app.get('*',(req,res)=>{
    // console.log(req.query.abhishek)
    res.send("No webpage found")
})
//Actually it checks for the webpages and thr routes in sequence and it begins from public folder, it is not found and then later it checks in one by one and as soon as any route is dound then it does not checks for further for the same route.
app.listen(3000,()=>{
    console.log("My first server is functioning")
}) //We can use multiple listens on app but that is obviously of no use.

// In the request we have query through which we can get whatever is written in after ? which tells the queries in the url.
//SO if we type queries after url which is given by ? and then we have to do something according to it then we use req.query. If you know the property name, say search or smething like title.id etc, you can actually add them in you req.query.property_name and that will return you the value of that property.

//There is an error of cannot set headers after they are sent to the client and this error comes when we are sending two or more requests to same port. Example app.get(" ",()=>{res.send("First")res.send("Second")})
//So whenever such message comes check whether you are sending more than one request or receiving more than one response.
//In such cases we can use return in first response like we did in products
