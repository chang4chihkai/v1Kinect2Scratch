// The MIT License (MIT)

// Copyright (c) 2015 Stephen Howell, stephenhowell@outlook.com

//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in
//all copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//THE SOFTWARE.
 
(function (ext)
{
    var jointData = { "HipCenter": null, "Spine": null, "ShoulderCenter": null, "Head": null, "ShoulderLeft": null, "ElbowLeft": null, "WristLeft": null, "HandLeft": null, "ShoulderRight": null, "ElbowRight": null, "WristRight": null, "HandRight": null, "HipLeft": null, "KneeLeft": null, "AnkleLeft": null, "FootLeft": null, "HipRight": null, "KneeRight": null, "AnkleRight": null, "FootRight": null };

    var connection = new WebSocket('ws://localhost:8181/'); // Changing the port

    connection.onopen = function () {
        //console.log('Connection open!');
    }

    connection.onclose = function () {
        //console.log('Connection closed');
    }

    connection.onerror = function (error) {
        console.log('Error detected: ' + error.toString());
    }

    connection.onmessage = function (e) {
        console.log(e.data);
        var obj = JSON.parse(e.data);        
        jointData[obj.joint] = obj;
    }

    // Cleanup function when the extension is unloaded
    ext._shutdown = function () { if (connection.socket.connected) { connection.socket.disconnect(); } };

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function () {        
        if (connection.readyState == 1) {
            return { status: 2, msg: 'Connected' };
        } 
        else {               
            return { status: 1, msg: 'Not connected, attempting reconnection...' };                
        }
    };    
    
    ext.Disconnect = function (callback) {
        if (!(connection === null)) {
            if (connection.readyState == 1) {
                //console.log("disconnecting from server");
                connection.close();
            } else { console.log("Disconnect: socket already disconnected"); }
        }
    };

    ext.getValue = function (coordinate, bodyPart) {
        var j = jointData[bodyPart];
        //console.log("Requested: " + coordinate + " of " + bodyPart + " = " + j[coordinate]);
        return JSON.stringify(j[coordinate]);
    };
    
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['r', 'get %m.coordinate position of %m.bodyPart', 'getValue', 'x', 'HandRight']
        ],
        menus: {
            coordinate: ["x", "y", "z"],
            bodyPart: [ "HipCenter", "Spine", "ShoulderCenter", "Head", "ShoulderLeft", "ElbowLeft", "WristLeft", "HandLeft", "ShoulderRight", "ElbowRight", 
								"WristRight", "HandRight", "HipLeft", "KneeLeft", "AnkleLeft", "FootLeft", "HipRight", "KneeRight", "AnkleRight", "FootRight" ]
        },
        url: 'http://howell.azurewebsites.net/kinect2scratch'
    };

    // Register the extension
    ScratchExtensions.register('Kinect2Scratch v1', descriptor, ext);

})({});




