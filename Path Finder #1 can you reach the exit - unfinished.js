function pathFinder(maze) {
  let mazeX = maze.indexOf("\n");
  let mazeY = (maze.match(/[\n\r]/g) || []).length;
  let mazeExit = [mazeX - 1, mazeY - 1];
  let mazeInStepObj = parseMaze(maze);

  let runner = new mazeRunner(mazeInStepObj[0]);
  let isfinishedMaze = false;

  while (true) {
    runner.visitUnvisitedDirections();
    if (runner.currentStep.stepX == mazeExit[0] && runner.currentStep.stepY == mazeExit[1]) {
      isfinishedMaze = true;
      break;
    } else if (areAllVisited(runner.stepsVisited)) {
      console.log("the maze cant be finished");
      break;
    }
  }

  return isfinishedMaze;
}

function mazeRunner(step) {
  this.currentStep = step;
  this.lastStep = null;
  this.stepsVisited = [step];

  this.canGo = function (direction) {
    const neighbor = this.currentStep[direction];
    return neighbor && !neighbor.isWall;
  };

  this.visitUnvisitedDirections = function () {
    if (!this.currentStep.isVisitedSouth) {
      this.goSouth();
    } else if (!this.currentStep.isVisitedEast) {
      this.goEast();
    } else if (!this.currentStep.isVisitedNorth) {
      this.goNorth();
    } else if (!this.currentStep.isVisitedWest) {
      this.goWest();
    } else {
      // No unvisited directions, go back to the last step
      if (!this.goBack()) {
        // If there are no unvisited directions and we can't go back, break the loop
      }
    }
    this.updateNeighborsVisits();
  };

  this.goBack = function () {
    // Check if there's a previous step to go back to
    if (this.lastStep) {
      // Move back to the last step
      this.currentStep = this.lastStep;
      return true;
    }
    // There's no previous step to go back to
    return false;
  };

  this.updateNeighborsVisits = function () {
    if (this.currentStep.northStep) this.currentStep.northStep.isVisitedSouth = true;
    if (this.currentStep.eastStep) this.currentStep.eastStep.isVisitedWest = true;
    if (this.currentStep.westStep) this.currentStep.westStep.isVisitedEast = true;
    if (this.currentStep.southStep) this.currentStep.southStep.isVisitedNorth = true;
    if (
      !this.stepsVisited.some((step) => step.stepX === this.currentStep.stepX && step.stepY === this.currentStep.stepY)
    ) {
      this.stepsVisited.push(this.currentStep);
    }
    return true;
  };
  this.goNorth = function () {
    const northStep = this.currentStep.northStep;
    if (!this.canGo("northStep")) {
      console.log("Can't go North because the north step is null or a wall");
      return false;
    }

    this.lastStep = this.currentStep;
    this.currentStep = northStep;
    this.updateNeighborsVisits();
  };

  this.goEast = function () {
    const eastStep = this.currentStep.eastStep;

    if (!this.canGo("eastStep")) {
      console.log("Can't go East because the east step is null or a wall");
      return false;
    }

    this.lastStep = this.currentStep;
    this.currentStep = eastStep;
  };

  this.goSouth = function () {
    const southStep = this.currentStep.southStep;
    this.currentStep.isVisitedSouth = true;

    if (!this.canGo("southStep")) {
      console.log("Can't go South because the south step is null or a wall");
      return false;
    }

    this.lastStep = this.currentStep;
    this.currentStep = southStep;
    this.updateNeighborsVisits();
  };

  this.goWest = function () {
    const westStep = this.currentStep.westStep;
    this.currentStep.isVisitedWest = true;

    if (!this.canGo("westStep")) {
      console.log("Can't go West because the west step is null or a wall");
      return false;
    }

    this.lastStep = this.currentStep;
    this.currentStep = westStep;
    this.updateNeighborsVisits();
  };
}

function areAllVisited(stepsVisited) {
  return stepsVisited.every(
    (step) =>
      (step.northStep === null || step.isVisitedNorth) &&
      (step.eastStep === null || step.isVisitedEast) &&
      (step.southStep === null || step.isVisitedSouth) &&
      (step.westStep === null || step.isVisitedWest)
  );
}

function parseMaze(mazeString) {
  let mazeArray = [];

  mazeArray = mazeString
    .trim()
    .split("\n")
    .map((row, y) =>
      row.split("").map((cell, x) => ({
        stepX: x,
        stepY: y,
        isVisitedNorth: false,
        isVisitedEast: false,
        isVisitedSouth: false,
        isVisitedWest: false,
        isWall: cell === "W",
        northStep: null,
        eastStep: null,
        southStep: null,
        westStep: null,
      }))
    )
    .flat();

  // Assign neighbors after the map operation
  mazeArray.forEach((step, index) => {
    const { stepX, stepY } = step;
    const rowLength = mazeArray.length / mazeString.trim().split("\n")[0].length;

    // Assign neighbors if they exist
    if (stepY > 0) step.northStep = mazeArray[(stepY - 1) * rowLength + stepX];
    if (stepX < rowLength - 1) step.eastStep = mazeArray[stepY * rowLength + (stepX + 1)];
    if (stepY < mazeArray.length / rowLength - 1) step.southStep = mazeArray[(stepY + 1) * rowLength + stepX];
    if (stepX > 0) step.westStep = mazeArray[stepY * rowLength + (stepX - 1)];
  });

  return mazeArray;
}

const m = `......
......
......
......
.....W
....W.
`;
console.log(pathFinder(m));
