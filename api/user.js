module.exports = app =>{
    const save = async(req, res) =>{
        const user = {...req.body}; //json on url

        // res.send(`user save`);
        res.send(user);
    }

    const get = (req, res) =>{
        res.send('get user');
    }

    return {save, get};
}