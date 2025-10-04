require("dotenv/config");
const booksTable = require('../models/book.model')
const db = require("../db");
const { eq } = require('drizzle-orm');

exports.getAllBooks = async function (req, res)
{
    const books = await db.select().from(booksTable);
    return res.json(books);
};

exports.getBooksById = async function (req, res)
{
    const id = req.params.id;

    const [book] = await db
        .select()
        .from(booksTable)
        .where(table => eq(table.id, id))
        .limit(1);

    if (!book)
        return res
            .status(404)
            .json({ error: `Book with id ${id} does not exist!`});

    return res.json(book);
};

exports.createBook = async function (req, res)
{
    const { title, description, authorId } = req.body;

    if (!title || title === '')
        return res.status(400).json({ error: 'title is required'});

    const [result] = await db.insert(booksTable).values({
        title,
        authorId,
        description,
    }).returning({
        id: booksTable.id,
    });

    return res
        .status(201)
        .json({ message: "Book created success", id: result.id });
};

exports.deleteById = async function(req, res)
{
    const id = req.params.id;

    await db.delete(booksTable).where(eq(booksTable.id, id));

    return res.status(200).json({ message: "book deleted"});
};