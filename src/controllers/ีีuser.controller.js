exports.getUsers = (req, res) => {
    res.send('Room route is working');
}

exports.getUserById = (req, res) => {
    const roomId = req.params.id;
    res.send(`Details of room with ID: ${roomId}`);
}

exports.createUser = (req, res) => {
    const newRoom = req.body;
    res.status(201).send(`New room created: ${JSON.stringify(newRoom)}`);
}

exports.updateUser = (req, res) => {
    const roomId = req.params.id;
    const updatedRoom = req.body;
    res.send(`Room with ID: ${roomId} updated to: ${JSON.stringify(updatedRoom)}`);
}

exports.deleteUser = (req, res) => {
    const roomId = req.params.id;
    res.send(`Room with ID: ${roomId} deleted`);
}