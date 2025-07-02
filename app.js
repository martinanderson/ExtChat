Ext.application({
    name: 'ExtChatApp',
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'centered',
            items: [
                {
                    xtype: 'button',
                    text: 'Open chat',
                    handler: function() {
                        Ext.Msg.alert('Button Clicked', 'Hello from ExtJs!');
                    }
                }
            ]
        });
    }
});
