import express from "express"
import cors from "cors"



const app = express()
const port = 5002;

app.use(cors());
app.use(express.json());


let Products = []

app.get("/", (req,res) => {
    res.send("HEllo world , on my node.js server.")
})


app.get("/get-products", (req,res) => {
    res.send(Products)
})


app.post("/add-product" , (req,res) => {
    let reqBody = req.body

    if(!reqBody?.productName || !reqBody?.productPrice || !reqBody?.productDescription){
        res.send("Requrired parameter missing!...")
        return
    }
     
    Products.push({
        id: new Date().getTime(),
        productName : reqBody.productName,
        productPrice : reqBody.productPrice,
        productDescription: reqBody.productDescription
    })

    res.send("Product add Successfully!")
})



app.delete('/delete-product/:id' , (req,res) => {
    const productId = req?.params?.id;

    let isMatch = false

    for(let i=0 ; i <= Products.length ; i++ ){

        if(productId == Products[i].id){
            Products.splice(i,1)
            isMatch = true
            break
        }

    }

    if(isMatch){
        res.send("Product Delete Successfully!" )
    }
    else{
        res.send("Product not found.")
    }
})



// app.put("/edit-product/:id", (req,res) => {
//     let productId = req.params.id

//     let reqBody = req.body

//     let isEdit =false

//     for(let i = 0 ; i < Products.length ; i++){
//         if(productId == Products[i].id){
//             Products[i].name = reqBody?.name ,
//             Products[i].price = reqBody?.price,
//             Products[i].price = reqBody.description
//             isEdit = true

//             break
//         }
//     }

//     if(isEdit){
//         res.send(`prouduct ${productId} is Edit successfully!`)
//     }
//     else{
//         res.send(`product ${productId} is not found.`)
//     }
// })







app.listen(port, () => {
    console.log("The project is running on port " , {port});
    
})