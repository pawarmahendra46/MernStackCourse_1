
//node js
//express js
//Db-MongoDb

//API List
//1.API Create Item ==>get data from front end and save in Db

//2.Api Update Item ==> get/update data from front end and update in db

//3.API Delete item ==> get details from front end and Delete in Db

//4.API get all item ==> get from db and show at front end.

console.log('Welcome Mahendra.')

const express = require('express') //express js is a framework of node js.

const mongoose = require('mongoose') //library connect mongoDb
const cors=require('cors') //library

const app = express()// app- var- store express function
app.use(express.json()) //convert all data into json format.
app.use(cors())
//Dbconnection
mongoose.connect("mongodb://127.0.0.1:27017/crud-Database-1").then(() => console.log("Mongo DB Connected..")).catch((err) => console.log(err));

app.use(express.json());
//Schema- means model/table structure
const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
    sellingPrice: Number,
    purchasePrice: Number,
    quantity: Number,
    unit: String
});

const Items = mongoose.model("Items", itemSchema)//table name/collection Name
module.exports=Items;
//API 1 -Create Item API
app.post("/api/create-item", async (req, res) => {
    try {
        const { name, description, sellingPrice, purchasePrice, quantity, unit } = req.body;

        const saveItem = new Items({
            name,
            description,
            sellingPrice,
            purchasePrice,
            quantity,
            unit
        });

        await saveItem.save();

        res.status(201).json({message:"Item Created.",data:saveItem});

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error creating item" });
    }
});

//API 1 -Update item
app.put("/api/update-item/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const { 
            name,
            description,
            sellingPrice,
            purchasePrice,
            quantity,
            unit
        } = req.body;

        const updatedItem = await Items.findByIdAndUpdate(
            id,
            {
                name,
                description,
                sellingPrice,
                purchasePrice,
                quantity,
                unit
            },
            { new: true } // returns updated document
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json(updatedItem);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error updating item" });
    }
});

//API 1 -Delete item
app.delete("/api/delete-item/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedItem = await Items.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({
            message: "Item deleted successfully",
            data: deletedItem
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting item" });
    }
});

//API 1 -GetAll item
app.get("/api/Get-all-item", async(req, res) => {
    try {
    
        const items=await Items.find()
        res.status(200).json({message:"List of items..",data:items})
    }
    catch (err) {
        console.log(err)
    }
})
//API-1 GetSingle item on id
app.get("/api/items/:id", async (req, res) => {
    try {
        const item = await Items.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json(item);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching item" });
    }
});

// health Route
app.get("/health", (req, res) => {
    res.send("Server Running..");
});

const PORT = 9090
app.listen(PORT, () => {
    console.log('Server Started on port.', PORT)
})