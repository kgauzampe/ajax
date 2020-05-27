let express = require('express');
let cors = require('cors');
const { request } = require('http');
let app = express();
let {addContent, displayAll} = require('./database')


app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.get('/', function (req,res) {
   res.status(200).sendFile('index.html')
})

app.post('/addNewVisitor', async function (req,res) {
    //console.log(req.body);
   let content = await addContent(req.body)
   console.log(content)
    res.status(200).json({message: 'done'})

})

app.get('/viewVisitors', async function (req,res) {
    let view = await displayAll()
    res.status(200).json(view)
})

let port = process.env.PORT || 9001;

app.listen(port, function () {
    console.log('server running on port 9000')
})


