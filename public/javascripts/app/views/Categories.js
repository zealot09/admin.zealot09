(function () {
    Ext.define("App.views.Categories", {
        extend: 'Ext.grid.Panel',
        title: 'Zealot\'s admin',
        columns: [{
            text: "ID",
            dataIndex: 'id',
            sortable: false,
            width: 40
        }, {
            text: "Name",
            dataIndex: 'name',
            sortable: false,
            flex: 1
        }, {
            text: "createTime",
            dataIndex: 'createTime',
            sortable: false,
            width: 140
        }, {
            text: "updateTime",
            dataIndex: 'updateTime',
            sortable: false,
            width: 140
        }],
        initComponent: function () {
            var me = this;
            me.store = $loader("categories", {
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
                    handler: function () {
                        me.addAdmin();
                    }
                }, {
                    icon: $icon('delete'),
                    name: 'btn-del',
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
            var me = this, login = admin.get("id");
        },
        addCategory: function () {
            var me = this,
                dlg = Ext.widget('window', {
                    modal: true,
                    title: '创建后台管理员',
                    width: 350,
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
                            name: 'login',
                            fieldLabel: '登录名',
                            allowBlank: false,
                            length: 16
                        }, {
                            name: 'password',
                            fieldLabel: '登陆密码',
                            allowBlank: false,
                            inputType: 'password'
                        }, {
                            name: 'confirm',
                            fieldLabel: '密码确认',
                            allowBlank: false,
                            inputType: 'password'
                        }, {
                            name: 'isSuper',
                            xtype: 'checkbox',
                            fieldLabel: '超级管理员'
                        }]
                    },
                    buttons: [{
                        text: '创建',
                        handler: function () {
                            var form = dlg.down('form').getForm();
                            if (!form.isValid()) {
                                Ext.Msg.alert("出错", "请填写完整的信息");
                                return;
                            }
                            var values = form.getValues();
                            if (values.password !== values.confirm) {
                                Ext.Msg.alert("出错", "两次输入的密码不一致，请检查");
                                return;
                            }
                            delete values.confirm;
                            values.password = CryptoJS.SHA3(values.password).toString();
                            values.isSuper = !!values.isSuper;

                            Ext.getBody().mask('正在创建管理员账户，请稍后...');
                            $rpc('admin.create', values, function (err, result) {
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