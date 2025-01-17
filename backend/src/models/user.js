import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Organization } from "./organization.js";

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: [3, 15]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: [3, 55]
        }
    }
},
    {
        timestamps: false
    }
)

Organization.hasMany(User, {
    foreignKey: 'organization_id',
    sourceKey: 'id'
})

User.belongsTo(Organization, {
    foreignKey: 'organization_id',
    targetKey: 'id'
})