class Fish extends Denizen {

  constructor(options) {
    super(options);
    this.imageUri = '/images/fish01.png';
    this.maxSwimSpeed = 100;
    this.makeNewVelocity();
    this.isTasty = true;
  }

  generateSwimVelocity(max, min) {
    if (min && min > max) {
      min = 0;
    }
    let newSpeed = new Vector(randRangeInt(-max, max), randRangeInt(-max / 2, max / 2));
    while (min && newSpeed.magnitude() < min) {
      newSpeed = new Vector(randRangeInt(-max, max), randRangeInt(-max / 2, max / 2));
    }
    return newSpeed;
  }

  updateOneTick() {
    
    var delta = this.swimVelocity.scale(PHYSICS_TICK_SIZE_S);
    this.position.addMut(delta);
    this.timeUntilSpeedChange -= PHYSICS_TICK_SIZE_S;
    if (this.timeUntilSpeedChange < 0) {
      this.makeNewVelocity();
    }
    this.stayInside();
    this.checkIfEaten();
    this.checkIfMate();
  }

  stayInside() {
    let bounds = {
      // minX: -500,
      // maxX: 500,
      // minY: 20,
      // maxY: 400,
      minX: - window.innerWidth / 2 + 20,
      maxX: window.innerWidth / 2 - 20,
      minY: 10,
      maxY: window.innerHeight + 10,
    };
    if (this.position.x < bounds.minX) {
      this.swimVelocity.x = -this.swimVelocity.x + 5;
      this.position.x += 1;
    } 
    if (this.position.x > bounds.maxX) {
      this.swimVelocity.x = -this.swimVelocity.x - 5;
      this.position.x -= 1;
    }
    
    if (this.position.y < bounds.minY) {
      this.swimVelocity.y = -this.swimVelocity.y + 5;
      this.position.y += 1;
    } 
    if (this.position.y > bounds.maxY) {
      this.swimVelocity.y = -this.swimVelocity.y - 5;
      this.position.y -= 1;
    }
  }

  checkIfMate() {
    let fishes = this.tank.getProximateDenizens(this.position, 50);
    
    for (const fish of fishes) {
      
      if (fish.id !== this.id && fish.isTasty) {
        
        let mateChance = Math.random();
        if (mateChance > 0.999) {
          alert(this.tank.getRandomSpecies());
          var xVel = randRangeInt(0, 0);
          var yVel = 0 - Math.abs(xVel);
          var s = new Seed({
            tank: this.tank,
            position: this.position,
            velocity: new Vector(xVel, yVel),
            
            type: this.tank.getRandomSpecies(),
          });
        }
      }
    }
  }


  checkIfEaten() {
    let fishes = this.tank.getProximateDenizens(this.position, 30);
    
    for (const fish of fishes) {
      
      if (fish.isBiteFish) {
        //alert(fish.isBiteFish);
        this.kill();
      }
    }
  }

  makeNewVelocity(minMag) {
    this.swimVelocity = this.generateSwimVelocity(this.maxSwimSpeed, minMag || 0);
    this.timeUntilSpeedChange = randRangeInt(5);
  }

}

