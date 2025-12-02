const prisma = require('../prisma');
exports.getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        res.json({
            status: 'success',
            message: 'Users retrieved successfully',
            data: users,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: { detail: 'Unable to fetch users' },
        });
    }
}

exports.getUserById = async (req, res) => {
    const usersId = parseInt(req.params.id, 10);

    if (isNaN(usersId)) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid users id',
        });
    }

    try {
        const users = await prisma.user.findUnique({
            where: { id: usersId },
        });

        if (!users) {
            return res.status(404).json({
                status: 'error',
                message: 'users not found',
            });
        }

        res.json({
            status: 'success',
            message: 'users retrieved successfully',
            data: users,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: { detail: 'Unable to fetch users' },
        });
    }
}

exports.createUser = async (req, res) => {
    const { name, email, password, tel, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid request body',
            error: {
                detail: 'name, email, password, and role are required',
            },
        });
    }

    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password,
                tel: tel || null,
                role: role || "user",
            },
        });

        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: newUser,
        });
    } catch (error) {
        console.error('Error creating user:', error);

        // Check for unique constraint violation (duplicate email)
        if (error.code === 'P2002') {
            return res.status(409).json({
                status: 'error',
                message: 'Email already exists',
                error: { detail: 'A user with this email already exists' },
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: { detail: 'Unable to create user' },
        });
    }
}
exports.updateUser = async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const { name, email, password, tel, role } = req.body;

    if (isNaN(userId)) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid user id',
        });
    }

    if (!name || !email || !password) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid request body',
            error: {
                detail: 'name, email, password, and role are required',
            },
        });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name,
                email,
                password,
                tel: tel || null,
                role: role || "user",
            },
        });

        res.json({
            status: 'success',
            message: 'User updated successfully',
            data: updatedUser,
        });
    } catch (error) {
        console.error('Error updating user:', error);

        if (error.code === 'P2025') {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: { detail: 'Unable to update user' },
        });
    }
}
exports.deleteUser = async (req, res) => {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid user id',
        });
    }

    try {
        const deletedUser = await prisma.user.delete({
            where: { id: userId },
        });

        res.json({
            status: 'success',
            message: 'User deleted successfully',
            data: deletedUser,
        });
    } catch (error) {
        console.error('Error deleting user:', error);

        if (error.code === 'P2025') {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: { detail: 'Unable to delete user' },
        });
    }
}
