import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./user.js";
import { Article } from "./article.js";

export const Comment = sequelize.define('comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    }
},
    {
        timestamps: false
    }
)

User.hasMany(Comment, {
    foreignKey: 'user_id',
    sourceKey: 'id'
})
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id'
})

Article.hasMany(Comment, {
    foreignKey: 'article_id',
    sourceKey: 'id'
})
Comment.belongsTo(Article, {
    foreignKey: 'article_id',
    targetKey: 'id'
})