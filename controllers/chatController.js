const Message = require('../models/chatModel');
const sendMessage = async (req, res) => {
    const { content, room } = req.body;
    const sender = req.user.id;

    try {
        const newMessage = new Message({ content, sender, room });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getMessages = async (req, res) => {
    const { room } = req.params;
    try {
        const messages = await Message.find({ room }).populate('sender', 'username');
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    sendMessage,
    getMessages
}