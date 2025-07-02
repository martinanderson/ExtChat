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
                            layout: 'border', // Changed to border layout
                            plain: true, // Optional: for a plain body
                            closable: true,
                            autoShow: true,
                            items: [
                                {
                                    xtype: 'grid',
                                    region: 'center', // Messages list takes the main space
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['user', 'message', 'timestamp'],
                                        data: [
                                            // Example messages
                                            { user: 'John', message: 'Hello!', timestamp: new Date() },
                                            { user: 'Jane', message: 'Hi there!', timestamp: new Date() }
                                        ]
                                    }),
                                    columns: [
                                        { text: 'User', dataIndex: 'user', flex: 1 },
                                        { text: 'Message', dataIndex: 'message', flex: 3 },
                                        { text: 'Time', dataIndex: 'timestamp', xtype: 'datecolumn', format: 'H:i:s', width: 70 }
                                    ],
                                    hideHeaders: true, // Optional: if you don't want column headers
                                },
                                {
                                    xtype: 'container',
                                    region: 'south',
                                    layout: 'hbox',
                                    padding: 5,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            emptyText: 'Type your message...'
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'x-fa fa-paper-plane', // Using Font Awesome icon
                                            tooltip: 'Send',
                                            margin: '0 0 0 5' // Margin to the left of the button
                                        }
                                    ]
                                }
                            ]
                        });
                    }
                }
            ]
        });
    }
});
