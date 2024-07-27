const postPlants = (req, res)=>{

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
}

const getPlants = (req, res)=>{


    res.json({
        success:true,
        data : Plants,
        message:"All plants fetched succefully"
    })
}

const putPlantId = (req,res)=>{

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
}

const getPlantId =  (req , res )=> {
    const {id} = req.params

    const plant = Plants.find((p)=>p.id == id)

    res.json({
        success:plant ? true : false,
        data : plant || null,
        message: plant ? "Plant is find succefully" : " plant not found"
    })
}


const deletePlant = (req , res)=>{

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
}

export {
    postPlants,
    getPlants,
    putPlantId,
    getPlantId,
    deletePlant
}