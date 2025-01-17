import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./user.js";

export const Article = sequelize.define('article', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [5, 100],
        },
    },
    content: {
        type: DataTypes.TEXT,
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

User.hasMany(Article, {
    foreignKey: 'user_id',
    sourceKey: 'id'
})

Article.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id'
})