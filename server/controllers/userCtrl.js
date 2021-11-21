import Users from '../models/userModel.js'

const userCtrl = {
    getUser: async (req, res) => {
            try {
                const user = await Users.findById(req.params.id).select('-password')
                res.json(user)
            } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

export default userCtrl; 