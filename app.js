const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());

let parkingLots = {}
let id = 0
app.get('/',(req, res) => res.status(200).json(parkingLots))

app.post('/entry',(req,res) => {
    const { plate, parkingLot } = req.query;
    if (!parkingLot || !plate) {
        return res.status(400).json({error: 'Invalid params'})
    }
    let newEntry = {
        plate,
        parkingLot,
        entryTime: Date.now()
    }
    parkingLots[++id] = newEntry
    return res.status(201).json(id)
})

app.post('/exit', (req, res) => {
    const { ticketId } = req.query;

    if(!ticketId) return res.status(400).json({error: 'Invalid params'})

    const parkedTimeMs = Date.now() - parkingLots[ticketId].entryTime;
    const parkedTimeHours = parkedTimeMs / (1000 * 60 * 60);
    const charge = Math.ceil(parkedTimeHours * 4) / 4 * 10;
    let leaveCarInfo = {
        plate : parkingLots[ticketId].plate,
        parkedTime :  Math.ceil(parkedTimeHours * 60),
        parkingLot : parkingLots[ticketId].parkingLot,
        charge
    }

    delete parkingLots[ticketId]
    return res.status(200).json(leaveCarInfo)

})

app.listen(port, () => console.log(`Express app running on port ${port}!`));