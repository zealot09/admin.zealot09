(function(Ext) {
    Ext.define("App.views.Home", {
        extend: 'Ext.panel.Panel',
        title: '集团云管理后台首页',
        html: "<h2>集团云管理后台首页</h2>",
        initComponent: function() {
            var me = this;
            me.callParent();
        }
    });
})(window.Ext);