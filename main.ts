import MarsRover from "./MarsRover"

const rover = new MarsRover(0, 1, "EAST");

console.log(rover.runCommands("FFF", [[2,1]]));

console.log(rover.generateCommand([2,3]));
