'use strict';
const based64 = require("base-64");
const bcrypt = require("bcrypt");
const username = "shihab";
const password = "123@abc.com";

const encoded = based64.encode(`${username}:${password}`);


console.log("encoded >>>>>>>>> ", encoded);


const decoded = based64.decode(encoded);

console.log("decoded >>>>>>>>> ", decoded);

const username2 = decoded.split(':')[0];
console.log(username2)

const password2 = decoded.split(':')[1];
console.log(password2)


/*****************************************/

let password3 = "123@test.com";

async function encrypt(text) {

    console.log("password3 >>>>>> ", password3);
    let hashed = await bcrypt.hash(password3, 5);
    console.log("hashed >>>>>> ", hashed);

    let p1 = "$2b$05$gSCl97Iw.4RrQcMT/T.YWuR0oddaCe6pa.pKuN5m6hIY93k.CcHWq";

    let p2 = "$2b$05$qjXdSFb7FAYSR4kCoDmbt.Qru7vhrXFcfoIq6GOsvp2E4SvORhggW";

    let isValid1 = await bcrypt.compare(text, p1);
    console.log("isValid1 >>>>>", isValid1)
    let isValid2 = await bcrypt.compare(text, p2);
    console.log('isValid2 >>>>>', isValid2)


}

encrypt(password3);