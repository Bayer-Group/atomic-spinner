export default class Vector {
  x: number
  y: number
  z: number

  constructor(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
  }

  sum(otherVector: Vector) {
    return new Vector(
      this.x + otherVector.x,
      this.y + otherVector.y,
      this.z + otherVector.z
    )
  }

  diff(otherVector: Vector) {
    return new Vector(
      this.x - otherVector.x,
      this.y - otherVector.y,
      this.z - otherVector.z
    )
  }

  dotProduct(otherVector: Vector) {
    return this.x * otherVector.x + this.y * otherVector.y + this.z * otherVector.z
  }

  product(otherVector: Vector) {
    return new Vector(
      this.x * otherVector.x,
      this.y * otherVector.y,
      this.z * otherVector.z
    )
  }

  projection(directionVector: Vector) {
    const magnitude = this.dotProduct(directionVector) / (directionVector.getMagnitude() ** 2)

    return directionVector.scaleTo(magnitude)
  }

  distance(otherVector: Vector) {
    return (
      (otherVector.x - this.x) ** 2 +
      (otherVector.y - this.y) ** 2 +
      (otherVector.z - this.z) ** 2
    ) ** 0.5
  }

  unitDirection(otherVector: Vector) {
    const distance = this.distance(otherVector)

    return new Vector(
      (otherVector.x - this.x) / distance,
      (otherVector.y - this.y) / distance,
      (otherVector.z - this.z) / distance
    )
  }

  getMagnitude() {
    return this.distance(new Vector(0, 0, 0))
  }

  scaleBy(factor: number) {
    return new Vector(
      this.x * factor,
      this.y * factor,
      this.z * factor
    );
  }

  scaleTo(magnitude: number) {
    const currentMagnitude = this.getMagnitude()

    if (currentMagnitude === 0) {
      return this
    }

    return this.scaleBy(magnitude / currentMagnitude)
  }
}
