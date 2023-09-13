module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo', {
        title: {
            type : DataTypes.STRING,
            allowNull : false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    return Todo;
}

