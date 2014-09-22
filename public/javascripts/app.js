(function (Ext, $) {
    Ext.Loader.setConfig({
        paths: {
            App: Ext.String.format('{0}javascripts/app', window.baseUrl || '')
        }
    });
    var $icon = window.$icon = function (icon) {
        if (typeof icon !== 'string') return null;
        if (icon.indexOf('.') < 0) icon = icon + '.png';
        return Ext.String.format('{0}icons/{1}', window.baseUrl || '', icon);
    };

    var navStore = Ext.create('Ext.data.TreeStore', {
        fields: ['id', 'text', 'icon'],
        idProperty: 'id',
        root: {
            expanded: true,
            children: $(siteMap).map(function () {
                var x = this;
                return { text: x.Text, id: x.Id, leaf: true, icon: $icon(x.Icon) };
            })
        }
    });

    window.isAdmin = function () {
        // return currentUser.Roles.indexOf("administrators") >= 0;
    };

    window.$rpc = function (sn, args, cb) {
        if (typeof sn !== 'string' || (typeof args !== 'function' && typeof cb !== 'function')) throw new Error('Invalid arguments');
        if (typeof args === 'function' && cb === undefined) {
            cb = args;
            args = {};
        }
        var url = Ext.String.format('{0}{1}', window.baseUrl || '', sn.replace(".", "/"));
        $.post(url, args, function (data) {
            if (typeof data === 'string') {
                if (data == "s_ok") cb(null, data);
                else if (data.indexOf("e_") === 0) cb(data, "error code：" + data);
                else cb(null, data);
            } else {
                cb(null, data);
            }
        }, 'json').fail(function (req, status, error) {
            cb(status, "request error，error status：" + status + (error ? "，error message：" + error : ""));
        });
    };

    window.$loader = function (item, config) {
        if (config.localStore) {
            var store = Ext.create({
                xclass: 'Ext.data.JsonStore',
                model: config.model,
                proxy: 'memory'
            });
            $rpc(item + '.loader', null, function (err, data) {
                if (!err) {
                    store.add(data.data);
                    store.fireEvent("load");
                }
            });
            return store;
        }
        return Ext.create(Ext.apply({
            xclass: 'Ext.data.JsonStore',
            autoLoad: true,
            remoteSort: true,
            remoteFilter: true,
            proxy: {
                type: 'ajax',
                url: Ext.String.format('{0}{1}/loader', window.baseUrl || '', item),
                startParam: 's',
                limitParam: 'ps',
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'total',
                    messageProperty: 'msg',
                    successProperty: 'success'
                },
                actionMethods: {
                    create: 'POST',
                    read: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                }
            }
        }, config));
    };

    window.$datefmt = function (v) {
        return new Date(v).toString('yyyy-MM-dd HH:mm');
    };
    window.$celltip = function (v, m) {
        if (v) m.tdAttr = "title=" + JSON.stringify(v.toString());
        return v;
    };

    var currentView, loadView = window.loadView = function (view, data, node) {
        if (typeof view !== 'string' || view === '') throw new Error('View not specified: ' + view);
        var msg = window.onbeforeunload();
        if (msg) {
            Ext.Msg.confirm('Unsaved Changes', msg, function () {
                console.log(arguments);
            });
        }
        var cls = 'App.views.' + view;
        Ext.getBody().mask("Loading...");
        Ext.require(cls, function () {
            if (window.viewPanel === undefined) throw new Error('View panel not ready.');
            window.viewPanel.removeAll();
            currentView = Ext.create(cls, {
                viewData: data,
            });
            window.viewPanel.add(currentView);
            if (node && navStore.getById(node) !== undefined) navigation.getSelectionModel().select(navStore.getById(node), false, true);
            Ext.getBody().unmask();
        });
    };

    window.onbeforeunload = function () {
        if (currentView && (typeof currentView.confirmClose === 'string' || typeof currentView.confirmClose === 'function')) {
            var confirmClose = typeof currentView.confirmClose === 'string' ? currentView.confirmClose : currentView.confirmClose();
            if (typeof confirmClose === 'string' && confirmClose !== '') return confirmClose;
        }
    };

    Ext.onReady(function () {
        $('body').empty();
        Ext.widget('viewport', {
            renderTo: Ext.getBody(),
            layout: 'border',
            style: {
                background: '#ebebeb'
            },
            defaults: {
                margin: 5
            },
            items: [{
                xtype: 'component',
                region: 'north',
                height: 60,
                html: '<div style="float:right"><a href="#" id="change-pwd">Reset Password</a> | <a href="/logout">Log out</a></div><h1>' + document.title + '</h1>'
            }, {
                xtype: 'treepanel',
                region: 'west',
                width: 200,
                store: navStore,
                title: 'Navigator',
                rootVisible: false,
                listeners: {
                    select: function (grid, r) {
                        loadView(r.data.id);
                    },
                    afterrender: function () {
                        window.navigation = this;
                        this.getSelectionModel().select(this.getStore().getById('Home'));
                    }
                }
            }, {
                xtype: 'container',
                region: 'center',
                layout: 'fit',
                listeners: {
                    afterrender: function () {
                        window.viewPanel = this;
                        $('#change-pwd').click(function () {
                            var dlg = Ext.widget('window', {
                                modal: true,
                                title: 'Reset Password',
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
                                        name: 'originalPassword',
                                        fieldLabel: 'Current Password',
                                        allowBlank: false,
                                        inputType: 'password'
                                    }, {
                                        name: 'password',
                                        fieldLabel: 'New Password',
                                        allowBlank: false,
                                        inputType: 'password'
                                    }, {
                                        name: 'confirm',
                                        fieldLabel: 'Confirm Password',
                                        allowBlank: false,
                                        inputType: 'password'
                                    }]
                                },
                                buttons: [{
                                    text: '确定',
                                    handler: function () {
                                        var form = dlg.down('form').getForm();
                                        if (!form.isValid()) {
                                            Ext.Msg.alert("出错", "密码不能为空！");
                                            return;
                                        }
                                        var values = form.getValues();
                                        if (values.password != values.confirm) {
                                            Ext.Msg.alert("出错", "两次密码输入不一致！");
                                            return;
                                        }
                                        delete values.confirm;
                                        values.password = CryptoJS.SHA3(values.password).toString();
                                        values.originalPassword = CryptoJS.SHA3(values.originalPassword).toString();

                                        $rpc('Admin.ChangePassword', values, function (err, result) {
                                            Ext.getBody().unmask();
                                            if (err) {
                                                console.log(arguments);
                                                Ext.Msg.alert("请求出错", "修改密码出错，" + result);
                                            }
                                            else {
                                                dlg.close();
                                                Ext.Msg.alert("成功", "密码修改成功！");
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
                        });
                    }
                }
            }]
        }).show();
    });
})(window.Ext, window.jQuery);
