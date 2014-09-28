(function () {
    Ext.define("App.views.Posts", {
        extend: 'Ext.grid.Panel',
        title: '文章管理',
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
           text: "Title",
            dataIndex: 'Title',
            sortable: false,
            flex: 1
        }, {
           text: "Content",
            dataIndex: 'Content',
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
        }, {
            text: "Category",
            dataIndex: 'Category',
            sortable: false,
            width: 140
        }],
        initComponent: function () {
            var me = this;
            me.store = $loader("post", {
                model: "Post",
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
                        me.addPost();
                    }
                }, {
                    icon: $icon('delete'),
                    name: 'btn-del',
                    text: 'Delete',
                    disabled: true,
                    handler: function () {
                        me.deletePost(me.getSelectionModel().getSelection()[0]);
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
        deletePost: function (admin) {
            var me = this, id = admin.get("Id");
            console.log(id);
            Ext.Msg.confirm('Warning', 'Delete the post or not', function(btn) {
                if(btn == 'yes'){
                    $rpc('post.delete', {
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
        addPost: function () {
            var me = this,
                dlg = Ext.widget('window', {
                    modal: true,
                    title: 'Create New Artical',
                    width: 700,
                    bodyPadding: 10,
                    items: {
                        xtype: 'form',
                        overflowY: 'auto',
                        bodyPadding: 5,
                        border: 0,
                        defaults: {
                            xtype: "textfield",
                            labelWidth: 160,
                            anchor: "100%"
                        },
                        items: [{
                            name: 'name',
                            fieldLabel: 'Post Name',
                            allowBlank: false
                        }, {
                            name: 'title',
                            fieldLabel: 'Post title',
                            allowBlank: false
                        }, {
                            name: 'content',
                            fieldLabel: 'Post Content',
                            id: 'content',
                            xtype: 'textarea',
                            allowBlank: false,
                            height: 500
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
                        text: 'Preview',
                        handler: function() { 
                            
                        }
                    }, {
                        text: 'Cancel',
                        handler: function () {
                            dlg.close();
                        }
                    }]
                }).show(null, function() {
                    var me = this, blogArea = me.down('textarea[name="content"]'), elcontent = $('textarea', blogArea.el.dom);
                    
                    
                }).center();
        }
    });
})();