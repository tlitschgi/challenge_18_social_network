const { User } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();

            const userObj = {
                users,
            };

            res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json({
                user,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { username: req.body.username, email: req.body.email },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No such user exists' });
            }

            res.status(200).json({ message: 'User successfully updated' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No such user exists' });
            }

            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new:true }
            )
    
            if (!user) {
                return res.status(404).json({ message: 'No such user exists' });
            }
            
            res.status(200).json({ message: 'Congrats! You made a new friend!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new:true }
            )
    
            if (!user) {
                return res.status(404).json({ message: 'No such user exists' });
            }
            
            res.status(200).json({ message: 'You are no longer friends' });
        } catch (err) {
            res.status(500).json(err);
        }
    }
};