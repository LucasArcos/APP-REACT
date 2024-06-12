import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import SearchHistory from './modelos/searchHistorySchema.js'; 
const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())

const PORT = 3000
const DB_URI = process.env.DB_URI

mongoose.connect(DB_URI)

const db = mongoose.connection

db.on("error", console.error.bind(console, "error en la conexion"))
db.once("open", ()=>{
    console.log("conexion exitosa a mongoDB")
})

app.post("/api/history", async (req, res)=>{
    try{
        const search = new SearchHistory(req.body)
        await search.save()
        res.status(201).send(search)
    }catch(error){
        res.status(400).send(error)
    }
})

app.get('/api/history', async (req, res) => {
    try {
      const history = await SearchHistory.find().sort({ searchedAt: -1 }).limit(10);
      res.status(200).send(history);
    } catch (error) {
      res.status(500).send(error);
    }
  })

app.listen(PORT,()=>{
    console.log("El servidor esta corrriendo en el puerto http://localhost:" + PORT)
} )

