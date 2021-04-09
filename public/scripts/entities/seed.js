class Seed extends Denizen {

  constructor(options) {
    super(options);
    this.waterFriction = 0.3;      // "0.3" means "lose 30% per second"
    this.imageUri = '/images/seed.png';
    this.type = options.type;
    this.height = options.height || 20;
    this.width = options.width || 20;
    this.ttl = options.ttl || randRangeInt(3, 6);
  }

  updateOneTick() {
    this.stayInside();
    this.velocity = this.velocity.scale(1 - this.waterFriction * PHYSICS_TICK_SIZE_S);
    this.velocity.y -= 50 * PHYSICS_TICK_SIZE_S;
    


    var delta = this.velocity.scale(PHYSICS_TICK_SIZE_S);
    this.position = this.position.add(delta);

    this.ttl -= PHYSICS_TICK_SIZE_S;
    if (this.ttl < 0) {
      this.spawn();
      this.kill();
    }
  }

  spawn() {
    var Type = this.type;
    var individual = new Type({
      tank: this.tank,
      position: this.position,
    });
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
    if (this.position.x < bounds.minX || this.position.x > bounds.maxX) {
      this.velocity.x = -this.velocity.x;
    }
    
    if (this.position.y < bounds.minY || this.position.y > bounds.maxY) {
      this.velocity.y = -this.velocity.y;
    }
  }

  onClick(event) {
    this.spawn();
    this.kill();
  }

}
