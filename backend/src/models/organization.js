import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Organization = sequelize.define('organization', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: [3, 15]
        }
    }
},
    {
        timestamps: false
    }
)