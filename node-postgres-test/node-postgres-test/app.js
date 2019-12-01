var express = require("express");
var app = express();
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/dist/timectrl'));

app.use('/api/funcionarios/', require('./routes/api/funcionarios'));
app.use('/api/externos/', require('./routes/api/externos'));
app.use('/api/registros/', require('./routes/api/registros'));
app.use('/api/extras/', require('./routes/api/extras'));

app.get("/", async (req, res, next) => {
  res.json('Funfante!');
});

app.listen(3000, function() {
  console.log("node-postgress running on port 3000!");
});
