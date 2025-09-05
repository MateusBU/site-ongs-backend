module.exports = app =>{
    const save = (req, res) =>{
        res.send('user save');
    }

    const get = (req, res) =>{
        res.send('get user');
    }

    return {save, get};
}