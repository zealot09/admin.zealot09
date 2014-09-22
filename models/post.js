module.exports = function(sequelize, DataType){
	var Post = sequelize.define('Post', {
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
		Title: {
			type: DataType.STRING,
			field: 'title'
		},
		Comment: {
			type: DataType.STRING,
			field: 'comment'
		},
		CreateAt: {
			type: DataType.DATE,
			field: 'created_at'
		},
		UpdateAt: {
			type: DataType.DATE,
			field: 'updated_at'
		},
		CategoryId: {
			type: DataType.INTEGER,
			field: 'category_id'
		}
    }, {
		tableName: 'posts',
		createdAt: false,
		updatedAt: false		
    });
    
    // Post.belongsTo(Category);

	return Post;
}