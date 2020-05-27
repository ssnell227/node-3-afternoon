module.exports = {
    create: (req, res) => {
        const { name, description, price, image_url } = req.body
        const db = req.app.get('db')
        db.create_product([name, description, price, image_url])
            .then(product => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    getOne: (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')
        db.read_product(id)
            .then((product) => res.status(200).send(product))
            .catch(err => {
                res.status(500).send(`An error occured: ${err}`);
                console.log(err)
            })
    },
    getAll: (req, res) => {
        const db = req.app.get('db')
        db.read_products()
            .then((products) => res.status(200).send(products))
            .catch(err => {
                res.status(500).send(`An error occured: ${err}`);
                console.log(err)
            })
    },
    update: (req, res) => {
        const { id } = req.params
        const description = req.query.desc
        const db = req.app.get('db')
        db.update_product([id, description])
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send(err);
            })
    },
    delete: (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')
        db.delete_product(id)
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send(err)
            })
    }
}