import express from 'express'
import mongoose from 'mongoose' 
import dotenv from "dotenv"
dotenv.config()

import { gethealth } from "./controllers/health.js"
import { postPlants, 
        getPlants , 
        putPlantId , 
        getPlantId ,
        deletePlant} from './controllers/plant.js'

import { handlePAgeNotFound } from './controllers/error.js'


const app = express()
app.use(express.json())

const dbconnection = async()=>{
      const connect = await mongoose.connect(process.env.MONGO_URL)

     if (connect){
        console.log("Connected to MongoDB")
     }
     else{
        console.log("MongoDB Not Connected")
     }
}
dbconnection();


// const Plants = [
//     {
//         "id": 5,
//         "name": "bamboo",
//         "category": "indoor",
//         "image": "https://www.ugaoo.com/cdn/shop/files/Aimage_3.jpg?v=1682523121",
//         "price": "200",
//         "description": "this is bamboo tree"
//     },
//     {
//         "id": 3,
//         "name": "mango",
//         "category": "indoor",
//         "image": "https://www.ugaoo.com/cdn/shop/files/Aimage_3.jpg?v=1682523121",
//         "price": "200",
//         "description": "this is bamboo tree"
//     },
//     {
//         "id": 6,
//         "name": "banana",
//         "category": "indoor",
//         "image": "https://www.ugaoo.com/cdn/shop/files/Aimage_3.jpg?v=1682523121",
//         "price": "200",
//         "description": "this is bamboo tree"
//     }
// ]

app.get("/health",gethealth)

app.post("/plant",postPlants)

app.get("/plants",getPlants)

app.get("/plant/:id",getPlantId)

app.put("/plant/:id",putPlantId )

app.delete("/plant/:id", deletePlant)

app.use("*",handlePAgeNotFound)


const PORT = process.env.PORT


app.listen(PORT,()=>{
    console.log(`server is running at Port : ${PORT}`)
})

