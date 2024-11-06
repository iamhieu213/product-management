const Cart = require('../../models/Carts.model');
const Product = require('../../models/product.model');
const Order = require('../../models/order.model');
const Chat = require('../../models/chats.model');
const User = require('../../models/user.model');
const productHelper = require('../../helpers/products');

module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;
    // SocketIO
    _io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on("client_send_message", async (content) => {
            // Lưu vào database
            const chat = new Chat({
                user_id: userId,
                content: content
            });
            await chat.save();

            _io.emit('server_return_message', {
                fullName: fullName,
                userId: userId,
                content: content
            })
        });


    });
    // End SocketIO
    const chats = await Chat.find({
        deleted: false
    });

    for (const chat of chats) {
        const user = await User.findOne({
            _id: chat.user_id
        }).select('fullName');
        chat.infoUser = user.fullName
    }

    res.render('client/pages/chat/index', {
        pageTitle: 'Chat',
        chats: chats
    });
}