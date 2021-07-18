module.exports = {
    async details(req, res) {
        const id = req.params.id
        const details = await req.storage.getById(id)

        if (details === undefined) {
            res.redirect('/404')
        } else {
            const ctx = {
                title: 'Cubicle',
                details
            }

            res.render('details', ctx)
        }


    }
}