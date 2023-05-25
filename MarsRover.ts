type DirectionName = "NORTH" | "EAST" | "SOUTH" | "WEST";

type Point = {
  x: number;
  y: number;
};

type Direction = {
  name: DirectionName;
  deltaX: number;
  deltaY: number;
};

type Position = {
  point: Point;
  direction: Direction;
};

export default class MarsRover {
  private postion: Position;
 
  private north: Direction = {
    name: "NORTH",
    deltaX: 0,
    deltaY: 1,
  };
  private east: Direction = {
    name: "EAST",
    deltaX: 1,
    deltaY: 0,
  };
  private south: Direction = {
    name: "SOUTH",
    deltaX: 0,
    deltaY: -1,
  };
  private west: Direction = {
    name: "WEST",
    deltaX: -1,
    deltaY: 0,
  };
  private directionsDict = {
    EAST: this.east,
    WEST: this.west,
    NORTH: this.north,
    SOUTH: this.south,
  };

  private orderedDirections = [this.north, this.east, this.south, this.west];

  private visited = new Set();
  private generatedCommand:string;
  private maxY:number;
  private minY:number;
  private maxX:number;
  private minX:number; 

  constructor(x: number, y: number, directionName: DirectionName) {
    this.postion = {
      point: {
        x,
        y,
      },
      direction: this.directionsDict[directionName],
    };
  }
  
  // move forward or back
  private step(command: "F" | "B" ) {
    const direction = command === "F" ? 1 : -1; // if forward add delta otherwise subtract    
    this.postion.point.x += this.postion.direction.deltaX * direction;
    this.postion.point.y += this.postion.direction.deltaY * direction;
  }

  // rotate right or left
  private rotate(command: "L" | "R") {
    const currentIndex = this.orderedDirections.indexOf(this.postion.direction);
    let nextDirectionIndex = command === "R" ? currentIndex + 1 : currentIndex - 1;    
   
    // handle index out of bounds     
    if (nextDirectionIndex >= this.orderedDirections.length) nextDirectionIndex = 0;
    if (nextDirectionIndex < 0) nextDirectionIndex = this.orderedDirections.length - 1;

    this.postion.direction = this.orderedDirections[nextDirectionIndex];
  }

  private runSingleCommand = (command: string) => {
    switch (command) {
      case "F":
        this.step(command);
        break;
      case "B":
        this.step(command);
        break;
      case "L":
        this.rotate(command);
        break;
      case "R":
        this.rotate(command);
    }
  };

  private dfs(heading:[number, number], obstacles: number[][], command=""){

    if(this.generatedCommand) return;        

    if(this.postion.point.x > this.maxX || this.postion.point.x < this.minX)
       return;
    if(this.postion.point.y > this.maxY || this.postion.point.y < this.minY)
       return;   

    if(this.postion.point.x === heading[0] && this.postion.point.y === heading[1]){
        this.generatedCommand = command; 
        return;    
    }
    if(!!obstacles.find( ([x,y]) => this.postion.point.x === x && this.postion.point.y ===y))
        return;    
    // unique key to the current position     
    const positionKey = `${this.postion.point.x},${this.postion.point.y},${this.postion.direction.name}`   

    if(this.visited.has(positionKey))
        return;
    this.visited.add(positionKey); 

    this.step("F");
    this.dfs(heading, obstacles, command+"F" );
    this.step("B");
   
    this.step("B")
    this.dfs(heading, obstacles, command+"B");
    this.step("F");
    
    this.rotate("L")
    this.dfs(heading, obstacles, command+"L");
    this.rotate("R"); 

    this.rotate("R");
    this.dfs(heading, obstacles, command+"R");
    this.rotate("L");
  } 

  public runCommands(commands: string, obstacles: number[][] = []) {
    let prevDirection = this.postion.direction;
    let prevPoint = this.postion.point;
    let shouldStop = false;
    commands.split("").every((command) => {
      prevPoint =  { ...this.postion.point }
      prevDirection = { ...this.postion.direction };

      this.runSingleCommand(command);
      // stop if we find the current position is obstacles array
      shouldStop = !!obstacles.find(
        (point) =>
          point[0] === this.postion.point.x && point[1] === this.postion.point.y
      );
      return !shouldStop;
    });
    return shouldStop
      ? `(${prevPoint.x},${prevPoint.y}) ${prevDirection.name} STOPPED`
      : `(${this.postion.point.x},${this.postion.point.y}) ${this.postion.direction.name}`;
  }

  public generateCommand (heading: [number,number], obstacles: number[][] = []){
     // setting search grid boundaries
     this.minX = Math.min( this.postion.point.x, heading[0], ...obstacles.map(point => point[0]))-1;
     this.maxX = Math.max( this.postion.point.x, heading[0], ...obstacles.map(point => point[0]))+1;
     this.minY = Math.min(this.postion.point.y, heading[1], ...obstacles.map(point => point[1]))-1;
     this.maxY = Math.max(this.postion.point.y, heading[1], ...obstacles.map(point => point[1]))+1;
     
     // run dfs from the initial postion until we find the heading position
     this.dfs(heading, obstacles);   
     return this.generatedCommand;     
  } 
}
