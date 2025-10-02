const express = require('express');
const { BOOKS } = require('../db/book')
const router = express.Router();

// Routes
router.get('/', (req, res) => {
    // add custom header
    res.setHeader('x-piy', 'subh');
    // return books from array to json format
    res.json(BOOKS);
});

router.get('/:id', (req, res) => {
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
});

router.post('/', (req, res) => {
    const { title, author } = req.body;

    if (!title || title === '')
        return res.status(400).json({ error: 'title is required'});

    if (!author || author === '')
        return res.status(400).json({ error: 'author is required'});

    const id = BOOKS.length + 1;

    const book = { id, title, author};
    BOOKS.push(book);

    return res.status(201).json({ message: 'Book created success', id });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if(isNaN(id))
        return res.status(400).json({ error: `id must be of type number`});

    const indexToDelete = books.findIndex((e) => e.id === id);

    if (indexToDelete < 0)
        return res
            .status(404)
            .json({ error : `Book with id ${id} does not exists!`});

    BOOKS.slice(indexToDelete, 1);

    return res.status(200).json({ message: 'book deleted'});
});

module.exports = router;