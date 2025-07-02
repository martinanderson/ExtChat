Ext.application({
    name: 'ButtonApp',
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'centered',
            items: [
                {
                    xtype: 'button',
                    text: 'Click Me',
                    handler: function() {
                        Ext.Msg.alert('Button Clicked', 'Hello from ExtJs!');
                    }
                }
            ]
        });
    }
});
