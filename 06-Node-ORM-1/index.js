require("dotenv/config");
const db = require("./db");
const { usersTable } = require("./drizzle/schema");


async function getAllUsers() 
{
    const users = await db.select().from(usersTable);
    console.log(`Users in DB`, users);
    return users;
}

async function createUser({ id, name, email }){
    await db.insert(usersTable).values({
        id,
        name,
        email,
    });
}

// createUser({ id: 1, name: 'subh', email: 'subh@gmail.com'});
// createUser({ id: 2, name: 'hitesh', email: 'hitest@gmail.com'});

getAllUsers();