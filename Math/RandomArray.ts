// specify the size of the array
const size = 1000000;

// create an empty set to store the random numbers
const randomSet = new Set();

// loop through and generate random numbers
while (randomSet.size < size) {
    const randomNumber = Math.floor(Math.random() * 1000000); // generates a random number between 0 and 999,999

    randomSet.add(randomNumber); // add the random number to the set
}

// convert the set to an array
const randomArray = Array.from(randomSet);

console.log(randomArray); // prints the random number array to the console
