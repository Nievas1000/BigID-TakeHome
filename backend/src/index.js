import express from 'express'
import cors from 'cors'
import { sequelize } from './config/db.js'
import organizationRouter from './routes/organization.js'
import userController from './routes/user.js'
import articleController from './routes/article.js'
import commentController from './routes/comment.js'

const PORT = process.env.PORT || 4000;

const app = express()
app.use(express.json())
app.use(cors());

app.use('/organization', organizationRouter)
app.use('/user', userController)
app.use('/article', articleController)
app.use('/comment', commentController)


async function main() {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        await sequelize.sync({ force: false });

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
        process.exit(1);
    }
}

main()