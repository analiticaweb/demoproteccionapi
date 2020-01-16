const express = require('express');
const bodyParser = require('body-parser');
var createsend = require('createsend-node');
const hbs = require('hbs');
const app = express();

app.use(express.static(__dirname+'/views'));

app.set('view engine','hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

var auth = { apiKey: '7h2QgfOk3/OVQVFRsUqbHDryDTLEKPUUlEfy7mPePYmfFFtpRuoXQApYFqYEjtlh09z3HlfXuB6gFQY/BQPq0a/ev5Tt3VOG9XFgkQ+PKf8DSgfm/u09kjJrGZnotf9DWXYNNSPfl6cdX94U3TIZHA==' };
var api = new createsend(auth);
var listId = 'f493ed3a7bbf2f79c425e7eba1a6ae7a' // The ID of the list

app.post("/", (req, res) => {
    var details = {
        EmailAddress: req.body.email,
        CustomFields: [
          { Key: 'ahorro', Value: req.body.ahorroval },
          { Key: 'hobby', Value: req.body.hobbyval },
          { Key: 'premio', Value: req.body.premioval },
          { Key: 'perfil', Value: req.body.perfil }
        ]
        // CustomFields: [
        //     { Key: 'ahorro', Value: 'req.body.ahorro' },
        //     { Key: 'hobby', Value: 'req.body.hobby' },
        //     { Key: 'premio', Value: 'req.body.premio' }
        //   ]
      };
      api.subscribers.addSubscriber(listId, details, (err, response) => {
        if (err) {
            console.log(err);
            res.send(err)
        }
        else {
            console.log(details);
            res.render('sendResponse',{name:details.EmailAddress});
            // res.json(details)
        }
    });
})


app.listen(port, () => {
    console.log("Servidor inicilizado en ", port)
});