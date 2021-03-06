const Book = require('../../models/book')
const error = require('../../utils/error')

async function bookDetailsHandler(req, res, next) {
    try {
        const { id } = req.query
        const bookFound = await Book.findById(id)
        if (!bookFound) {
            return error(res, 400, 'Book not found')
        }
        res.json({
            success: true,
            book: bookFound
        })
    } catch (error) {
        next(error)
    }
}

module.exports = exports = bookDetailsHandler
