const express = require('express');
const path = require('path')
require("dotenv").config();
const database = require('./config/database');
var methodOverride = require('method-override');
const { Server } = require("socket.io");
database.connect();

const app = express()
const port = process.env.PORT;
const route = require("./routes/client/index.route");
const routeAdmin = require('./routes/admin/index.route');
const systemConfig = require('./config/system');

//socketio
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);
global._io = io;
//end socketio

const session = require('express-session');


var flash = require('express-flash');
const cookieParser = require('cookie-parser');

app.use(cookieParser('tes1'));
app.use(session({
    cookie: {
        maxAge: 60000
    }
}));
app.use(flash());


app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug')
app.use(express.static(`${__dirname}/public`));
app.use(methodOverride('_method'));

//TINY MCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//END TINY MCE


app.use(express.json()); // Phân tích JSON
app.use(express.urlencoded({
    extended: true
})); // Phân tích URL-encoded

route(app);
routeAdmin(app);

app.get('*', (req, res) => {
    res.render('client/pages/errors/404')
})


server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



// [
//     {
//         title: "Essence Mascara Lash Princess",
//         description: "The Essence Mascara Lash Princess is a popular mascara known for its v…",
//         price: 9.99,
//         discountPercentage: 7.17,
//         thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
//         status: "active",
//         delete: false,
//         position: 1
//     },

//     {
//         title: "Eyeshadow Palette with Mirror",
//         description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
//         price: 19.99,
//         discountPercentage: 5.5,
//         thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png",
//         status: "active",
//         delete: false,
//         position: 2
//     },

//     {
//         title: "Powder Canister",
//         description: "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
//         price: 14.99,
//         discountPercentage: 18.14,
//         thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png",
//         status: "active",
//         delete: false,
//         position: 3
//     },

//     {
//         title: "Red Lipstick",
//         description: "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
//         price: 12.99,
//         discountPercentage: 19.03,
//         thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png",
//         status: "active",
//         delete: false,
//         position: 4
//     },

//     {
//         title: "Red Nail Polish",
//         description: "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
//         price: 8.99,
//         discountPercentage: 2.46,
//         thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png",
//         status: "active",
//         delete: false,
//         position: 5
//     }
// ]