import express from 'express'
import mongoose from 'mongoose' 
import dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(express.json())

const Plants = [
    {
        "id": 5,
        "name": "bamboo",
        "category": "indoor",
        "image": "https://www.ugaoo.com/cdn/shop/files/Aimage_3.jpg?v=1682523121",
        "price": "200",
        "description": "this is bamboo tree"
    },
    {
        "id": 3,
        "name": "mango",
        "category": "indoor",
        "image": "https://www.ugaoo.com/cdn/shop/files/Aimage_3.jpg?v=1682523121",
        "price": "200",
        "description": "this is bamboo tree"
    },
    {
        "id": 6,
        "name": "banana",
        "category": "indoor",
        "image": "https://www.ugaoo.com/cdn/shop/files/Aimage_3.jpg?v=1682523121",
        "price": "200",
        "description": "this is bamboo tree"
    }
]

app.post("/plant",(req, res)=>{

    const {
        name,
        category,
        image,
        price,
        description
    } = req.body

    const randomId = Math.round(Math.random()*10000)

    const newPlant ={
        id: randomId,
        name : name,
        category : category,
        image : image,
        price : price,
        description : description
    }

    Plants.push(newPlant)

   


    res.json({
        success:true,
        data: newPlant,
        message:" new plant is added"
    })
})

app.get("/plants",(req, res)=>{


    res.json({
        success:true,
        data : Plants,
        message:"All plants fetched succefully"
    })
})

app.get("/plant/:id", (req , res )=> {
    const {id} = req.params

    const plant = Plants.find((p)=>p.id == id)

    res.json({
        success:plant ? true : false,
        data : plant || null,
        message: plant ? "Plant is find succefully" : " plant not found"
    })
})

app.put("/plant/:id", (req,res)=>{

    const {
        name,
        category,
        image,
        price,
        description
    } = req.body

    const {id} = req.params

    let index = -1

    Plants.forEach((plant , i)=>{
        if(plant.id == id){ 
            index = i
            
        }
    })

    const newObj = {
        id,
        name,
        category,
        image,
        price,
        description

    }

    if(index==-1){
        return res.json({
            success:false,
            data:null,
            message:`plant not found for id ${id} `
        })
       
    }
    else 
    {
        Plants[index] = newObj

        return res.json({
            success:true,
            message: `plant updated sucessfully`,
            data : newObj
        })
    }
})

app.delete("/plant/:id", (req , res)=>{

    const {id} = req.params

    let index = -1

    Plants.forEach((Plants , i)=>{
        if(Plants.id == id){
            index = i
        }
    })

    if(index == -1){
        return res.json({
            success:false,
            message:`plant not found for id ${id} `,
            })
    }

    Plants.splice(index , 1)
    

    res.json({
        success:true,
        message: `plant deleted sucessfully`,
        data: null

    })
})


const PORT = process.env.PORT


app.listen(PORT,()=>{
    console.log(`server is running at Port : ${PORT}`)
})

