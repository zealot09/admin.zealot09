module.exports = function(sequelize, DataType){
	var Customer = sequelize.define('Customer', {
		id: {
			type: DataType.INTEGER,
			field: 'id'
		},
		domain: {
			type: DataType.STRING,
			field: 'domain'
		},
		customerNo: {
			type: DataType.STRING,
			field: 'customer_no'
		},
		password: {
			type: DataType.STRING,
			field: 'password'
		},
		name: {
			type: DataType.STRING,
			field: 'name'
		},
		contact: {
			type: DataType.STRING,
			field: 'contact'
		},
		contact_phone: {
			type: DataType.STRING,
			field: 'contact_phone'
		},
		send_start_quarter: {
			type: DataType.INTEGER,
			field: 'send_start_quarter'
		},
		send_end_quarter: {
			type: DataType.INTEGER,
			field: 'send_end_quarter'
		},
		area: {
			type: DataType.STRING,
			field: 'area'
		},
		manager: {
			type: DataType.STRING,
			field: 'manager'
		},
		manager_phone: {
			type: DataType.STRING,
			field: 'manager_phone'
		},
		signature: {
			type: DataType.STRING,
			field: 'signature'
		},
		description: {
			type: DataType.STRING,
			field: 'description'
		},
		balance: {
			type: DataType.INTEGER,
			field: 'balance'
		},
		status: {
			type: DataType.ENUM('Normal', 'Trusted', 'Disabled', 'Pending'),
			field: 'status'
		},
		create_time: {
			type: DataType.DATE,
			field: 'create_time'
		},
		is_phone_verified: {
			type: DataType.BOOLEAN,
			field: 'is_phone_verified'
		},
		is_ip_verified: {
			type: DataType.BOOLEAN,
			field: 'is_ip_verified'
		},
		ip: {
			type: DataType.STRING,
			field: 'ip'
		}
        }, {
		tableName: 'customer'
	});

	return Customer;
}
