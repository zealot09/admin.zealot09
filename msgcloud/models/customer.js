module.exports = function(sequelize, DataType){
	var Customer = sequelize.define('Customer', {
		id: DataType.INTEGER,
		domain: DataType.STRING
        });

	return Customer;
}
