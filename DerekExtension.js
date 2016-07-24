// The MIT License (MIT)

// Copyright (c) 2016 Derek Breen, breenworks@gmail.com

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
    var Nouns =  { "Fruit": ["Apples", "Bananas", "Oranges"], "Animals" = [ "Cat", "Dog", "Monkey" ], "Countries": [ "England", "Ireland", "Scotland" ] };
	
	ext.getRandomWord = function (nounList) {		
		// Get noun list requested
		// return random value from array list
		return Nouns.nounList[Math.floor(Math.Random(Nouns.nounList.length))];
    };
    
	ext.getRandomValue = function (min, max) {		
		return Math.floor((Math.random() * max) + min) ;
    };
    
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['r', 'get random between %n and %n', 'getRandomValue', 1, 10]
			['r', 'get random noun from list %m.nouns', getRandomWord, 'Fruit']
        ],
        menus: {            
		        nouns: ['Fruit', 'Animals', 'Countries']                
        },
        url: 'http://derekbreen.com/scratchlinks'
    };
// Cleanup function when the extension is unloaded
    ext._shutdown = function () {  };

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function ()  {                
		return { status: 2, msg: 'Connected' };           
    };    
    
    ext.Disconnect = function (callback) {
    
    };

    // Register the extension
    ScratchExtensions.register('Derek Extension', descriptor, ext);

})({});




