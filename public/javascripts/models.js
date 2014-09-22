(function () {

    /********************************* Models *************************************/
    Ext.define("Category", {
        extend: "Ext.data.Model",
        fields: ['Id', 'Name', 'CreateAt', 'UpdateAt'],
        idProperty: 'id'
    });
    
})();