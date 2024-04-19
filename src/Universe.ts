import Vector from './Vector'
import Body from './Body'

export enum RenderFitMode {
  ContainBodies,
  CenterOfMass
}

export default class Universe {
  bodies: Body[]
  gravity: number
  collisions: boolean
  deltaTime: number
  renderFitMode: RenderFitMode
  fixedViewPortSize: number | undefined

  constructor({
    bodies,
    gravity,
    collisions,
    deltaTime,
    renderFitMode,
    fixedViewPortSize
  }: {
    bodies: Body[]
    gravity?: number
    collisions?: boolean
    deltaTime?: number
    renderFitMode?: RenderFitMode
    fixedViewPortSize?: number
  }) {
    this.bodies = bodies
    this.deltaTime = deltaTime ?? 0.5
    this.gravity = gravity ?? 6.674e-11
    this.collisions = collisions ?? false
    this.renderFitMode = renderFitMode ?? RenderFitMode.ContainBodies
    this.fixedViewPortSize = fixedViewPortSize
  }

  calculateGravitationalForces = () => {
    const bodyForces: Vector[][] = Array.from({ length: this.bodies.length }, () => [])
    this.bodies.forEach((body1, index1) => {
      this.bodies.slice(index1 + 1).forEach((body2, index2) => {
        const gravityBetweenBodies =
          (this.gravity
            * (body1.mass * body2.mass)
            / body1.position.distance(body2.position)) || Infinity

        bodyForces[index1].push(body1.position.unitDirection(body2.position).scaleBy(gravityBetweenBodies))
        bodyForces[index2 + index1 + 1].push(body2.position.unitDirection(body1.position).scaleBy(gravityBetweenBodies))
      })

      body1.setExternalForces(bodyForces[index1])
    })
  }

  bounceCollisions = (body1: Body, index1: number) => {
    this.bodies.forEach((body2, index2) => {
      if (index1 !== index2) {
        const distanceBetweenBodies = body2.position.distance(body1.position)
        if (distanceBetweenBodies < body1.radius + body2.radius) {
          body2.position.sum(body2.position.diff(body1.position).scaleTo(body1.radius + body2.radius))

          const collisionVelocity1 = body1.velocity.projection(body1.position.unitDirection(body2.position))
          const collisionVelocity2 = body2.velocity.projection(body2.position.unitDirection(body1.position))

          const parallelVelocity1 = body1.velocity.diff(collisionVelocity1)
          const parallelVelocity2 = body2.velocity.diff(collisionVelocity2)

          const preCollisionSpeed1 = collisionVelocity1.getMagnitude()
          const preCollisionSpeed2 = collisionVelocity2.getMagnitude()
          const postCollisionSpeed1 =
            ((body1.mass - body2.mass) / (body1.mass + body2.mass)) * preCollisionSpeed1
            + ((2 * body2.mass) / (body1.mass + body2.mass)) * preCollisionSpeed2
          const postCollisionSpeed2 = -1 * (preCollisionSpeed1 + postCollisionSpeed1 - preCollisionSpeed2)

          body1.velocity = parallelVelocity1.sum(collisionVelocity1.scaleTo(postCollisionSpeed1 * 1.05))
          body2.velocity = parallelVelocity2.sum(collisionVelocity2.scaleTo(postCollisionSpeed2 * 1.05))
        }
      }
    })
  }

  moveBodiesThroughTime = () => {
    this.calculateGravitationalForces()
    this.bodies.forEach((body, index) => {
      body.moveBodyThroughTime(this.deltaTime)
      this.collisions && this.bounceCollisions(body, index)
    })
  }

  getBodyBoundaries = () => {
    return this.bodies.reduce((agg, { position }) => {
      position.x < agg.x[0] && (agg.x[0] = position.x)
      position.x > agg.x[1] && (agg.x[1] = position.x)
      position.y < agg.y[0] && (agg.y[0] = position.y)
      position.y > agg.y[1] && (agg.y[1] = position.y)
      position.z < agg.z[0] && (agg.z[0] = position.z)
      position.z > agg.z[1] && (agg.z[1] = position.z)

      return agg
    }, { x: [Infinity, -Infinity], y: [Infinity, -Infinity], z: [Infinity, -Infinity] })
  }

  getCenterOfMass = () => {
    const totalMass = this.bodies.reduce((agg, { mass }) => agg + mass, 0)
    return this.bodies.reduce((agg, { mass, position }) => {
      return agg.sum(position.scaleBy((mass / totalMass)))
    }, new Vector(0, 0, 0))
  }
}
