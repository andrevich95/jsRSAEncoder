const express = require('express');
const bodyParser = require('body-parser');
const rsa = require('./rsa');
const app = express();

const keys = rsa.generate(250);
console.log('Keys');
console.log('n:', keys.n.toString());
console.log('d:', keys.d.toString());
console.log('e:', keys.e.toString());

app.use( bodyParser.json() );
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(req, res, next) {
    console.log('Time:', Date.now());
    console.log('Request:',req.body.text);
    console.log('========================');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    console.log();
    console.log();
});


app.get('/', function(req, res) {
    console.log(1);
    res.sendFile(__dirname+'/index.html');
});

app.post('/encrypt', function(req, res) {
    const message = req.body.text;

    const encoded_message = rsa.encode(message);
    const encrypted_message = rsa.encrypt(encoded_message, keys.n, keys.e);

    console.log('Message:', message);
    console.log('Encoded:', encoded_message.toString());
    console.log('Encrypted:', encrypted_message.toString());

    res.send({'msg' : encrypted_message.toString()});
});

app.post('/decrypt', function(req, res) {
    const message = req.body.text;

    const decrypted_message = rsa.decrypt(message, keys.d, keys.n);
    const decoded_message = rsa.decode(decrypted_message);

    console.log('Message:', message);
    console.log('Decrypted:', decrypted_message.toString());
    console.log('Decoded:', decoded_message.toString());
    res.send({'msg' : decoded_message.toString()});
});

app.listen(3000);
console.log('Server Started, go to http://localhost:3000');