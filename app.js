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
                                    itemId: 'chatGrid', // Added itemId to reference the grid
                                    region: 'center', // Messages list takes the main space
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['user', 'message', 'timestamp', 'isLoading'], // Added isLoading field
                                        data: [] // Start with an empty store
                                    }),
                                    columns: [
                                        { text: 'User', dataIndex: 'user', flex: 1, renderer: function(value, metaData, record) {
                                            if (record.get('isLoading')) {
                                                return '<span class="loading-indicator">Gemini is thinking...</span>';
                                            }
                                            return value;
                                        }},
                                        { text: 'Message', dataIndex: 'message', flex: 3 },
                                        { text: 'Time', dataIndex: 'timestamp', xtype: 'datecolumn', format: 'H:i:s', width: 70 }
                                    ],
                                    hideHeaders: true, // Optional: if you don't want column headers
                                    viewConfig: {
                                        stripeRows: false, // Optional: remove default striping if custom styling is preferred
                                        getRowClass: function(record) {
                                            return record.get('isLoading') ? 'loading-row' : '';
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    region: 'south',
                                    layout: 'hbox',
                                    padding: 5,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'messageInput', // Added itemId to reference the textfield
                                            flex: 1,
                                            emptyText: 'Type your message...',
                                            enableKeyEvents: true, // Enable key events for Enter key submission
                                            listeners: {
                                                keypress: function(textfield, e) {
                                                    if (e.getKey() == e.ENTER) {
                                                        var sendButton = textfield.up('container').down('button');
                                                        sendButton.handler.call(sendButton.scope || sendButton, sendButton, e);
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'x-fa fa-paper-plane',
                                            tooltip: 'Send',
                                            margin: '0 0 0 5',
                                            handler: function(button) {
                                                var chatWindow = button.up('window');
                                                var messageInput = chatWindow.down('#messageInput');
                                                var chatGrid = chatWindow.down('#chatGrid');
                                                var messageStore = chatGrid.getStore();
                                                var userMessage = messageInput.getValue();

                                                if (Ext.isEmpty(userMessage)) {
                                                    return; // Don't send empty messages
                                                }

                                                // Add user's message to the grid
                                                messageStore.add({
                                                    user: 'You',
                                                    message: userMessage,
                                                    timestamp: new Date()
                                                });
                                                messageInput.setValue(''); // Clear input field

                                                // Add loading indicator
                                                var loadingRecord = messageStore.add({
                                                    user: 'Gemini',
                                                    message: '', // Placeholder for loading
                                                    timestamp: new Date(),
                                                    isLoading: true
                                                })[0]; // Get the added record instance

                                                // Simulate API call to backend proxy
                                                Ext.Ajax.request({
                                                    url: '/api/chat_with_gemini', // Backend proxy endpoint
                                                    method: 'POST',
                                                    jsonData: {
                                                        message: userMessage
                                                    },
                                                    success: function(response) {
                                                        var responseData = Ext.decode(response.responseText);
                                                        // Update the loading record with Gemini's response
                                                        loadingRecord.set({
                                                            message: responseData.reply, // Assuming backend returns { reply: "..." }
                                                            isLoading: false,
                                                            timestamp: new Date() // Update timestamp
                                                        });
                                                        loadingRecord.commit(); // Commit changes to the record
                                                    },
                                                    failure: function(response) {
                                                        // Update the loading record with an error message
                                                        loadingRecord.set({
                                                            message: 'Error: Could not connect to Gemini.',
                                                            isLoading: false,
                                                            timestamp: new Date() // Update timestamp
                                                        });
                                                        loadingRecord.commit();
                                                    }
                                                });
                                                // Scroll to the bottom of the grid
                                                chatGrid.getView().focusRow(messageStore.getCount() - 1);
                                            }
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
