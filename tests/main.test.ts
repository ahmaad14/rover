import MarsRover from "../MarsRover";

describe( "test forward command", () => {
    it("moves forward with north direction", () => {
        const rover = new MarsRover(1, 1, "NORTH");
        expect(rover.runCommands("F")).toBe("(1,2) NORTH");
    });
    it("moves forward with east direction", () => {
        const rover = new MarsRover(1, 1, "EAST");
        expect(rover.runCommands("F")).toBe("(2,1) EAST");
    });
    
    it("moves forward with south direction", () => {
        const rover = new MarsRover(1, 1, "SOUTH");
        expect(rover.runCommands("F")).toBe("(1,0) SOUTH");
    });
    
    it("moves forward with west direction", () => {
        const rover = new MarsRover(1, 1, "WEST");
        expect(rover.runCommands("F")).toBe("(0,1) WEST");
    });
})

describe("test back command", () => {
    it("moves back with north direction", () => {
        const rover = new MarsRover(1, 1, "NORTH");
        expect(rover.runCommands("B")).toBe("(1,0) NORTH");
    });
    
    it("moves back with east direction", () => {
        const rover = new MarsRover(1, 1, "EAST");
        expect(rover.runCommands("B")).toBe("(0,1) EAST");
    });
    
    it("moves back with south direction", () => {
        const rover = new MarsRover(1, 1, "SOUTH");
        expect(rover.runCommands("B")).toBe("(1,2) SOUTH");
    });
    
    it("moves back with west direction", () => {
        const rover = new MarsRover(1, 1, "WEST");
        expect(rover.runCommands("B")).toBe("(2,1) WEST");
    });
}) 

describe("test left command", () => {

it("rotate left with north direction", () => {
    const rover = new MarsRover(1, 1, "NORTH");
    expect(rover.runCommands("L")).toBe("(1,1) WEST");
});

it("rotate left with east direction", () => {
    const rover = new MarsRover(1, 1, "EAST");
    expect(rover.runCommands("L")).toBe("(1,1) NORTH");
});

it("rotate left with south direction", () => {
    const rover = new MarsRover(1, 1, "SOUTH");
    expect(rover.runCommands("L")).toBe("(1,1) EAST");
});

it("rotate left with west direction", () => {
    const rover = new MarsRover(1, 1, "WEST");
    expect(rover.runCommands("L")).toBe("(1,1) SOUTH");
});
}) 

describe("test right command", () => {

    it("rotate right with north direction", () => {
        const rover = new MarsRover(1, 1, "NORTH");
        expect(rover.runCommands("R")).toBe("(1,1) EAST");
    });
    
    it("rotate right with east direction", () => {
        const rover = new MarsRover(1, 1, "EAST");
        expect(rover.runCommands("R")).toBe("(1,1) SOUTH");
    });
    
    it("rotate right with south direction", () => {
        const rover = new MarsRover(1, 1, "SOUTH");
        expect(rover.runCommands("R")).toBe("(1,1) WEST");
    });
    
    it("rotate right with west direction", () => {
        const rover = new MarsRover(1, 1, "WEST");
        expect(rover.runCommands("R")).toBe("(1,1) NORTH");
    });
}) 

it("runs multiple commands", () => {
        const rover = new MarsRover(-2, -2, "NORTH");
        expect(rover.runCommands("FFRFFBFLRRRFB")).toBe("(0,0) WEST");
})

it("stopps before an obstacle", () => {
    const rover = new MarsRover(0, -2, "NORTH");
    expect(rover.runCommands("FFF", [[0,0], [0,1]] )).toBe("(0,-1) NORTH STOPPED");
})

it("generates valid commands", () => {
    const rover = new MarsRover(0, 0, "NORTH");
    const rover2 = new MarsRover(0, 0, "NORTH");
    const command = rover.generateCommand( [2,2], [] ); 
    expect(rover2.runCommands(command)).toContain("(2,2)");
})

