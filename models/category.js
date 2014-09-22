module.exports = function(sequelize, DataType){
	var Category = sequelize.define('Category', {
		Id: {
			type: DataType.INTEGER,
			field: 'id',
			primaryKey: true,
			autoIncrement: true
		},
		Name: {
			type: DataType.STRING,
			field: 'name'
		},
		Amount: {
			type: DataType.STRING,
			field: 'amount'
		},
		CreateAt: {
			type: DataType.DATE,
			field: 'created_at',
			allowNull: true
		},
		UpdateAt: {
			type: DataType.DATE,
			field: 'updated_at',
			allowNull: true
		}
    }, {
		tableName: 'categories',
		createdAt: false,
		updatedAt: false
    });
    
	return Category;
}