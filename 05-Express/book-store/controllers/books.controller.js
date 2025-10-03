const { BOOKS } = require('../models/book')

exports.getAllBooks = function (req, res)
{
    res.json(BOOKS);
};

exports.getBooksById = function (req, res)
{
    const id = parseInt(req.params.id);

    if (isNaN(id))
    {
        return res.status(400).json({error: `Id must be of type number`});
    }
    // SELECT * from books where id = {id}
    const book = BOOKS.find((e) => e.id === id);

    if (!book)
        return res
            .status(404)
            .json({ error: `Book with id ${id} does not exist!`});

    return res.json(book);
};

exports.createBook = function (req, res)
{
    const { title, author } = req.body;

    if (!title || title === '')
        return res.status(400).json({ error: 'title is required'});

    if (!author || author === '')
        return res.status(400).json({ error: 'author is required'});

    const id = BOOKS.length + 1;

    const book = { id, title, author };
    BOOKS.push(book);

    return res.status(201).json({ message: 'Book created success', id });
};

exports.deleteById = function(req, res)
{
    const id = parseInt(req.params.id);

    if(isNaN(id))
        return res.status(400).json({ error: `id must be of type number`});

    const indexToDelete = BOOKS.findIndex((e) => e.id === id);

    if (indexToDelete < 0)
        return res
            .status(404)
            .json({ error : `Book with id ${id} does not exists!`});

    BOOKS.slice(indexToDelete, 1);

    return res.status(200).json({ message: "book deleted"});
};