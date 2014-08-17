(function () {

    /********************************* Models *************************************/
    Ext.define("Permission", {
        extend: "Ext.data.Model",
        fields: ['Id', 'Name', 'Description'],
        idProperty: 'Id'
    });

    Ext.define("Administrator", {
        extend: "Ext.data.Model",
        fields: ['id', 'login', 'enabled', 'createTime', 'lastLogin', 'lastLoginIp', 'roles', 'permissions', 'domains'],
        idProperty: 'id'
    });

    Ext.define("AdministratorRole", {
        extend: "Ext.data.Model",
        fields: ['id', 'name', 'desc', 'permissions'],
        idProperty: 'id'
    });

    Ext.define("Role", {
        extend: "Ext.data.Model",
        fields: ['id', 'name', 'desc'],
        idProperty: 'id'
    });

    Ext.define("AppDomain", {
        extend: "Ext.data.Model",
        fields: ['id', 'guid', 'desc', 'theme', 'name', 'domain', 'createTime'],
        idProperty: 'id'
    });

    Ext.define("Gateway", {
        extend: "Ext.data.Model",
        fields: ['id', 'domain', 'domainGuid', 'name', 'brokerType', 'configuration', 'destTypes', 'desc', 'enabled', 'status', 'threshold', 'createTime'],
        idProperty: 'id'
    });

    Ext.define("Customer", {
        extend: "Ext.data.Model",
        fields: ['id', 'domain', 'domainGuid', 'customerNo', 'name', 'contact', 'contactPhone', 'area', 'manager', 'signature', 'desc', 'balance', 'status', 'createTime', 'sendStartQuarter', 'sendEndQuarter', 'disableDomainSignature', 'isPhoneVerified', 'isIpVerified', 'ip'],
        idProperty: 'id'
    });

    Ext.define("Keyword", {
        extend: "Ext.data.Model",
        fields: ['id', 'keyword', 'domain'],
        idProperty: 'id'
    });

    Ext.define("SmsTemplate", {
        extend: "Ext.data.Model",
        fields: ['id', 'domain', 'domainGuid', 'customerNo', 'template', 'name', 'desc', 'createTime', 'auditBy', 'status', 'statusText', 'lastUpdate', 'isGlobal'],
        idProperty: 'id'
    });

    Ext.define("MtTask", {
        extend: "Ext.data.Model",
        fields: ['taskId', 'domain', 'domainGuid', 'customerNo',
            'template', 'templateId', 'payload', 'extCode',
            'createTime', 'startTime', 'endTime', 'dueTime',
            'receiverAmount', 'msgAmount', 'successMsgAmount', 'reportMsgAmount', 'status', 'statusText', 'auditBy'],
        idProperty: 'taskId'
    });

    Ext.define('MoMessage', {
        extend: 'Ext.data.Model',
        fields: ['id', 'source', 'dest', 'content', 'receiveTime'],
        idProperty: 'id'
    });

    Ext.define('MtMessage', {
        extend: 'Ext.data.Model',
        fields: ['id', 'domain', 'domainGuid', 'customerNo', 'receiver', 'receiverType', 'createTime', 'submitTime', 'statusTime', 'status', 'statusText','amount'],
        idProperty: 'id'
    });

    Ext.define('MmsMessage', {
        extend: 'Ext.data.Model',
        fields: ['id', 'domain', 'domainGuid', 'customerNo', 'receiver', 'receiverType', 'createTime', 'submitTime', 'statusTime', 'status', 'statusText', 'amount'],
        idProperty: 'id'
    });

    Ext.define("ScheduledMtTask", {
        extend: "Ext.data.Model",
        fields: ['id', 'domain', 'domainGuid', 'customerNo', 'appName', 'name', 'desc', 'template', 'templateId', 'payload',
            'createTime', 'startTime', 'endTime', 'lastRun', 'recurringType', 'timePoints',
            'lastRunStatus', 'auditBy', 'enabled', 'status', 'statusText', 'lastUpdate'],
        idProperty: 'id'
    });

    Ext.define('CustomerBlacklist', {
        extend: 'Ext.data.Model',
        fields: ['id', 'domain', 'domainGuid', 'customerNo', 'receiver', 'userReply', 'createTime', 'reason', 'isGlobal'],
        idProperty: 'id'
    });

    Ext.define('RecurringPlan', {
        extend: 'Ext.data.Model',
        fields: ['planId', 'planName', 'balanceName', 'balanceId', 'amount', 'price', 'enabled', 'recurringType', 'desc', 'createTime'],
        idProperty: 'planId'
    });
    
    Ext.define('Stats', {
        extend: 'Ext.data.Model',
        //fields: ['domain', 'customerNo', 'createTime', 'mtCmccAmount', 'mtTelecomAmount', 'mtUnicomAmount', 'mtTotalAmount', 'mmsCmccAmount', 'mmsTelecomAmount', 'mmsUnicomAmount', 'mmsTotalAmount']
        fields: ['domain', 'customerNo', 'createTime', 'mtCmccAmount', 'mtTelecomAmount', 'mtUnicomAmount', 'mtTotalAmount', 'mtCmccFAmount', 'mtTelecomFAmount', 'mtUnicomFAmount', 'mtTotalFAmount',
    'mmsCmccAmount', 'mmsTelecomAmount', 'mmsUnicomAmount', 'mmsTotalAmount', 'mmsCmccFAmount', 'mmsTelecomFAmount', 'mmsUnicomFAmount', 'mmsTotalFAmount']
    });

    Ext.define('CustomerSubscription', {
        extend: 'Ext.data.Model',
        fields: ['id', 'domain', 'domainGuid', 'customerNo', 'destinationType', 'balanceName', 'rate', 'exceededRate', 'extendedCode',
        'priority', 'enabled', 'name', 'desc', 'gatewayName'],
        idProperty: 'id'
    });
    Ext.define('SystemLog', {
        extend: 'Ext.data.Model',
        fields: ['id', 'level', 'systemEvent', 'detail', 'eventTime'],
        idProperty: 'id'
    });
    Ext.define('GatewaySendConfig', {
        extend: 'Ext.data.Model',
        fields: ['id', 'gatewayId', 'sendName', 'gatewayName', 'brokerName'],
        idProperty: 'id'
    });
    Ext.define('GatewayBroker', {
        extend: 'Ext.data.Model',
        fields: ['id', 'brokerName'],
        idProperty: 'id'
    });
})();