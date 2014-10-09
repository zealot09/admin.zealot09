(function () {

    /********************************* Models *************************************/
    Ext.define("Category", {
        extend: "Ext.data.Model",
        fields: ['Id', 'Name', 'CreateAt', 'UpdateAt'],
        idProperty: 'id'
    });
    
    Ext.define("Post", {
        extend: "Ext.data.Model",
        fields: ['Id', 'Name', 'Title', 'Content', 'Category', 'CategoryId', 'CreateAt', 'UpdateAt'],
        idProperty: 'id'
    });
    
})();