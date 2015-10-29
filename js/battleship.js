var battleship = function (numOfShips) {
    var shipsList = [],
        numOfGuesses = 0,
        takenLocations = [],
        shipCount = 0,

    //Ship Object
        ship = function () {
            var shipName,
                locationCells;

            function checkYourself(userGuess) {
                var index = locationCells.indexOf(userGuess.toLowerCase()),
                    result;
                if (index !== -1) {
                    locationCells.splice(index, 1);
                    result = 'Hit!';
                    if (locationCells.length === 0) {
                        result = 'Hit and Kill!';
                    }
                } else {
                    result = 'Miss';
                }
                return result;
            }

            function setName(name) {
                shipName = name;
            }

            function getName() {
                return name;
            }

            function setLocationCells(location) {
                console.log(location);
                if (typeof location === 'object' && location.length > 2) {
                    locationCells = location;
                } else {
                    console.log('The location (' + location + ') of: ' + this + ' was not set correctly');
                }
            }

            function getLocationCells() {
                return locationCells;
            }

            return {
                setName: setName,
                getName: getName,
                setLocationCells: setLocationCells,
                getLocationCells: getLocationCells,
                checkYourself: checkYourself
            }
        },

    //Game Set Up
        gameSetUp = function (numOfShips) {
            var i, j, shipObject, len, shipSize;
            if (numOfShips > 0) {
                for (i = 0; i < numOfShips; i++) {
                    shipObject = ship();
                    shipObject.name = 'shipNumber_' + (i + 1);
                    shipsList.push(shipObject);
                }
                len = shipsList.length;
                for (j = 0; j < len; j++) {
                    shipSize = randomIntFromInterval(3, 5);
                    shipsList[j].setLocationCells(placeShip(shipSize));

                }
            } else {
                alert('Please enter a number of ships greater than zero')
            }
        },

    //returns an array of letter number coordinates for a ship e.g [G2, G3, G4]
        placeShip = function (shipSize) {
            var gridLength = 7,
                gridSize = 49,
                alphabet = 'abcdefg',
                success = false,
                alphaCells = [],
                coordinates = [],
                x = 0,
                attempts = 0,
                y = 0,
                location, row, column, increment;

            shipCount += 1;
            increment = 1;
            if ((shipCount % 2) == 1) {
                increment = gridLength;
            }

            while (!success & attempts < 200) {
                location = randomIntFromInterval(1, 49);
                success = true;
                x = 0;
                while (success && x < shipSize) {
                    if (takenLocations.indexOf(location) === -1) {
                        coordinates[x++] = location;
                        location += increment;
                        if (location >= gridSize) {
                            success = false;
                        }
                        if (x > 0 && (location % gridLength == 0)) {
                            success = false;
                        }
                    } else {
                        success = false;
                    }

                }

            }

            while (y < shipSize) {
                takenLocations.push(coordinates[y]);
                row = Math.floor(coordinates[y] / gridLength);
                column = alphabet.charAt(coordinates[y] % gridLength);
                alphaCells.push(column + row);
                y++;
            }
            return alphaCells;
        },

    //return random whole number between min and max
        randomIntFromInterval = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },

    //Takes in user's guess and prints to screen the result
        checkUsersGuess = function (userGuess) {
            if (userGuess) {
                var i,
                    len = shipsList.length,
                    result = 'Miss';
                numOfGuesses++;
                document.getElementById('userguess').value = '';

                for (i = 0; i < len; i++) {
                    result = shipsList[i].checkYourself(userGuess);

                    if (result === 'Hit!') {
                        document.getElementById(userGuess.toLowerCase()).style.backgroundColor = "#FF6666";
                        break;
                    }
                    if (result === 'Hit and Kill!') {
                        document.getElementById(userGuess.toLowerCase()).style.backgroundColor = "#FF6666";
                        result = result + ' ' + shipsList[i].name + ' is Dead';
                        shipsList.splice(i, 1);
                        break;
                    }
                }
                if (numOfGuesses === 7) {
                    result = result + '     need a hand? F12 helps you cheat'
                }
                if (result === 'Miss') {
                    document.getElementById(userGuess.toLowerCase()).style.backgroundColor = "#939393";
                }
                addResultToPage(result);
            }
        },

    //adds result to the output feed on the screen
        addResultToPage = function (result) {
            var element = document.getElementById("outputFeed"),
                para = document.createElement("p"),
                node = document.createTextNode(result);

            para.appendChild(node);
            element.appendChild(para);
        }

    // Start Game
    gameSetUp(numOfShips);

    return {
        gameSetUp: gameSetUp,
        checkUsersGuess: checkUsersGuess
    }

}(3);

