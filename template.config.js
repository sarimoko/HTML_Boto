let options = {
    options: {
        debug: true
    },
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: "Sariboto",
        password: "oauth:XXXX"
    },
    channels: [ "#sarimoko" ]
};

let client = new tmi.client(options);

// Connect the client to the server..
client.connect();