exports.getUsers = (req, res) => {
    res.send('User route is working');
}

exports.getUserById = (req, res) => {
    const UserId = req.params.id;
    res.send(`Details of user with ID: ${UserId}`);
}

exports.createUser = (req, res) => {
    const newUser = req.body;
    res.status(201).send(`New User created: ${JSON.stringify(newUser)}`);
}

exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    res.send(`User with ID: ${userId} updated to: ${JSON.stringify(updatedUser)}`);
}

exports.deleteUser = (req, res) => {
    const UserId = req.params.id;
    res.send(`User with ID: ${UserId} deleted`);
}