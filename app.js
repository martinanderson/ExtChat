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
                        // Ext.Msg.alert('Button Clicked', 'Hello from ExtJs!');
                        var windowWidth = 260;
                        var screenWidth = Ext.getBody().getViewSize().width;
                        var xPosition = screenWidth - windowWidth - 20;

                        Ext.create('Ext.window.Window', {
                            title: 'Chat Window',
                            height: '90%',
                            width: windowWidth,
                            x: xPosition,
                            y: 20, // Small top margin
                            layout: 'fit',
                            plain: true, // Optional: for a plain body
                            closable: true,
                            autoShow: true,
                            // items: [{ // Example content
                            //     xtype: 'panel',
                            //     html: 'Window content goes here.'
                            // }]
                        });
                    }
                }
            ]
        });
    }
});
