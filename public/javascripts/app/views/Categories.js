(function () {
    Ext.define("App.views.Categories", {
        extend: 'Ext.grid.Panel',
        title: 'Zealot\'s admin',
        columns: [{
            text: "ID",
            dataIndex: 'Id',
            sortable: false,
            width: 40
        }, {
            text: "Name",
            dataIndex: 'Name',
            sortable: false,
            flex: 1
        }, {
            text: "createTime",
            dataIndex: 'CreateAt',
            sortable: false,
            width: 140
        }, {
            text: "updateTime",
            dataIndex: 'UpdateAt',
            sortable: false,
            width: 140
        }],
        initComponent: function () {
            var me = this;
            me.store = $loader("category", {
                model: "Category",
                pageSize: 20
            });
            me.bbar = Ext.create('Ext.PagingToolbar', {
                autoScroll: true,
                store: me.store,
                displayInfo: true,
                displayMsg: '列表项 {0} - {1} of {2}',
                emptyMsg: "空列表",
                items: ['-', {
                    icon: $icon('add'),
                    name: 'btn-add',
                    text: 'Add',
                    handler: function () {
                        me.addCategory();
                    }
                }, {
                    icon: $icon('delete'),
                    name: 'btn-del',
                    text: 'Delete',
                    disabled: true,
                    handler: function () {
                        me.deleteCategory(me.getSelectionModel().getSelection()[0]);
                    }
                }]
            });
            me.callParent();
        },
        listeners: {
            selectionchange: function (g, records) {
                this.down('[name=btn-del]').setDisabled(records.length != 1);
            }
        },
        deleteCategory: function (admin) {
            var me = this, id = admin.get("Id");
            console.log(id);
            Ext.Msg.confirm('Warning', 'Delete the category or not', function(btn) {
                if(btn == 'yes'){
                    $rpc('category.delete', {
                        id: id
                    }, function (err, result) {
                                Ext.getBody().unmask();
                                if (err) {
                                    console.log(arguments);
                                    Ext.Msg.alert("请求出错", "删除出错，" + result);
                                }
                                else {
                                    //dlg.close();
                                    me.getSelectionModel().deselectAll();
                                    me.store.reload();
                                    Ext.Msg.alert("成功", "删除成功");
                                }
                            });
                }
            });
        },
        addCategory: function () {
            var me = this,
                dlg = Ext.widget('window', {
                    modal: true,
                    title: 'Create New Artical Category',
                    width: 450,
                    bodyPadding: 10,
                    items: {
                        xtype: 'form',
                        overflowY: 'auto',
                        bodyPadding: 5,
                        border: 0,
                        defaults: {
                            xtype: "textfield",
                            labelWidth: 80,
                            anchor: "100%"
                        },
                        items: [{
                            name: 'name',
                            fieldLabel: 'Category Name',
                            allowBlank: false,
                            length: 16
                        }]
                    },
                    buttons: [{
                        text: 'Create',
                        handler: function () {
                            var form = dlg.down('form').getForm();
                            if (!form.isValid()) {
                                Ext.Msg.alert("出错", "请填写完整的信息");
                                return;
                            }
                            var values = form.getValues();
                            
                            Ext.getBody().mask('正在创建文章分类，请稍后...');
                            $rpc('category.create', values, function (err, result) {
                                Ext.getBody().unmask();
                                if (err) {
                                    console.log(arguments);
                                    Ext.Msg.alert("请求出错", "创建管理员出错，" + result);
                                }
                                else {
                                    dlg.close();
                                    me.getSelectionModel().deselectAll();
                                    me.store.reload();
                                    Ext.Msg.alert("成功", "创建管理员成功");
                                }
                            });
                        }
                    }, {
                        text: '取消',
                        handler: function () {
                            dlg.close();
                        }
                    }]
                }).show().center();
        }
    });
})();