export const config = {

    bot: {
        token: process.env.BOT_TOKEN
    },
    db: {
        connectionLimit: 4,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    }

}