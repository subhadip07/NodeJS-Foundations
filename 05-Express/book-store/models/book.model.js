const { pgTable, uuid, varchar, text } = require("drizzle-orm/pg-core");
const authorsTable = require("./author.model");

const booksTable = pgTable("books", {
    id: uuid().primaryKey().defaultRandom(),
    title: text(),
    description: text(),
    authorId: uuid().references(() => authorsTable.id).notNull(),
});

module.exports = booksTable;