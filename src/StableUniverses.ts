import Body from './Body'
import Universe, { RenderFitMode } from './Universe';
import Vector from './Vector';

const equalChaseCircularSpeed = 0.008125;
export const EqualChaseCircular = new Universe({
  bodies: [
    new Body({
      mass: 1000000,
      position: new Vector(0, -0.7320508076, 0),
      velocity: new Vector(1, 0, 0).scaleTo(equalChaseCircularSpeed),
      color: '#3d9900'
    }),
    new Body({
      mass: 1000000,
      position: new Vector(1, 1, 0),
      velocity: new Vector(-1, 1 * Math.tan(60 * Math.PI / 180), 0).scaleTo(equalChaseCircularSpeed),
      color: '#00314e'
    }),
    new Body({
      mass: 1000000,
      position: new Vector(-1, 1, 0),
      velocity: new Vector(-1, -1 * Math.tan(60 * Math.PI / 180), 0).scaleTo(equalChaseCircularSpeed),
      color: '#008ebd'
    })
  ], fixedViewPortSize: 3, renderFitMode: RenderFitMode.CenterOfMass
});

const equalChaseInOutSpeed = 0.006;
export const EqualChaseInOut = new Universe({
  bodies: [
    new Body({
      mass: 5000000,
      position: new Vector(0, -0.7320508076, 0),
      velocity: new Vector(1, 0, 0).scaleTo(equalChaseInOutSpeed),
      color: '#3d9900'
    }),
    new Body({
      mass: 5000000,
      position: new Vector(1, 1, 0),
      velocity: new Vector(-1, 1 * Math.tan(60 * Math.PI / 180), 0).scaleTo(equalChaseInOutSpeed),
      color: '#00314e'
    }),
    new Body({
      mass: 5000000,
      position: new Vector(-1, 1, 0),
      velocity: new Vector(-1, -1 * Math.tan(60 * Math.PI / 180), 0).scaleTo(equalChaseInOutSpeed),
      color: '#008ebd'
    })
  ], fixedViewPortSize: 3, renderFitMode: RenderFitMode.CenterOfMass
});

const getRandom = () => -1 + Math.random() * 2;
const maxVelocityForRandom = 0.02;
export const Random = new Universe({
  bodies: [
    new Body({
      mass: 1000000,
      maxVelocity: maxVelocityForRandom,
      position: new Vector(getRandom(), getRandom(), 0),
      velocity: new Vector(getRandom(), getRandom(), 0).scaleTo(getRandom() * 0.001),
      color: '#3d9900'
    }),
    new Body({
      mass: 1000000,
      maxVelocity: maxVelocityForRandom,
      position: new Vector(getRandom(), getRandom(), 0),
      velocity: new Vector(getRandom(), getRandom(), 0).scaleTo(getRandom() * 0.001),
      color: '#00314e'
    }),
    new Body({
      mass: 1000000,
      maxVelocity: maxVelocityForRandom,
      position: new Vector(getRandom(), getRandom(), 0),
      velocity: new Vector(getRandom(), getRandom(), 0).scaleTo(getRandom() * 0.001),
      color: '#008ebd'
    })
  ], collisions: true
});

export const FigureEight = new Universe({
  bodies: [
    new Body({
      mass: 1,
      position: new Vector(0.97000436, -0.24308753, 0),
      velocity: new Vector(0.466203685, 0.43236573, 0),
      color: "#3d9900"
    }),
    new Body({
      mass: 1,
      position: new Vector(-0.97000436, 0.24308753, 0),
      velocity: new Vector(0.466203685, 0.43236573, 0),
      color: "#00314e"
    }),
    new Body({
      mass: 1,
      position: new Vector(0, 0, 0),
      velocity: new Vector(-0.93240737, -0.86473146, 0),
      color: "#008ebd"
    })
  ],
  gravity: 1, collisions: false, deltaTime: 0.005
});
