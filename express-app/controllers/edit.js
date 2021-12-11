const { response } = require("express")

module.exports = {
    async edit(req, res) {
        const id = req.params.id
        const cube = await req.storage.getById(id)
        if (cube === undefined) {
            res.redirect('/404')
        } else {
            cube[`select${cube.difficulty}`] = true

            const ctx = {
                title: 'Edit Cube Page',
                cube
            }

            res.render('edit', ctx)
        }

    },
    async editPost(req, res) {
        const cube = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            difficulty: Number(req.body.difficulty),
        }
        try {
            await req.storage.edit(req.params.id, cube)
            res.redirect('/')
        } catch (error) {
            response.redirect('404')
        }
    }
}