const { authService } = require('../services');
const { tokenizer } = require('../helpers');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { id } = req.user;

            console.log(id);
            const tokens = tokenizer();
            console.log(tokens);
            await authService.createToken({ ...tokens, user_id: id });

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    }
};
