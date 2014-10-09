module.exports = function(sequelize, DataType){
	var Admin = sequelize.define('Admin', {
		Id: {
			type: DataType.INTEGER,
			field: 'id',
			primaryKey: true,
			autoIncrement: true
		},
		Account: {
			type: DataType.STRING,
			field: 'account'
		},
		Password: {
			type: DataType.STRING,
			field: 'password'
		},
		ContactPhone: {
			type: DataType.STRING,
			field: 'contactPhone'
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
		tableName: 'admins',
		createdAt: false,
		updatedAt: false
    });
    
	return Admin;
}