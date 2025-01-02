import * as React from 'react'

export interface NucleusProps {
  layerCount: number
  particlesPerLayer: number
  particleFillColor: string
  particleBorderColor: string
  particleBorderWidth: number
  particleSize: number
  distanceFromCenter: number
  orbitTime: number
  nucleusMaskOverlap: boolean
}

type NucleusLayerProps = NucleusProps & {
  particlesPerLayer: number
  startingAngle: number
}

const NucleusLayer = ({
  particleFillColor, particleBorderColor, particleBorderWidth, particlesPerLayer, particleSize, distanceFromCenter, orbitTime, startingAngle, nucleusMaskOverlap
}: NucleusLayerProps): React.JSX.Element => {
  const particles: React.JSX.Element[] = Array.from({ length: particlesPerLayer })
    .map((_, i) => {
      const rotationAngle = startingAngle + i * ((2 * Math.PI) / particlesPerLayer)
      const offsetX = particlesPerLayer > 1 ? distanceFromCenter * Math.cos(rotationAngle) : 0
      const offsetY = particlesPerLayer > 1 ? distanceFromCenter * Math.sin(rotationAngle) : 0

      const particleDimensions = {
        cx: 50 + offsetX,
        cy: 50 + offsetY
      }

      const effectiveBorderWidth = Math.min(particleBorderWidth, particleSize / 3)

      return (
        <React.Fragment key={`particle-${rotationAngle}`}>
          {nucleusMaskOverlap && effectiveBorderWidth > 0 && i === 0 && (
            <mask id={`layer-${startingAngle}-bottom-particle`}>
              <rect x="0" y="0" width="100" height="100" fill="white"></rect>
              <circle
                {...particleDimensions}
                r={particleSize + effectiveBorderWidth / 2}
              />
            </mask>
          )}
          <circle
            {...particleDimensions}
            r={particleSize}
            fill={particleFillColor}
            stroke={particleBorderColor}
            strokeWidth={effectiveBorderWidth}
            mask={nucleusMaskOverlap && i > Math.floor(particlesPerLayer / 2) ? `url('#layer-${startingAngle}-bottom-particle')` : undefined}
          />
        </React.Fragment>
      )
    })

  return (
    <g>
      <animateTransform
        attributeName="transform"
        begin="0s"
        dur={`${orbitTime}s`}
        type="rotate"
        from="0 50 50"
        to="360 50 50"
        repeatCount="indefinite"
      />
      {particles}
    </g>
  )
}

const Nucleus = (props: NucleusProps): React.JSX.Element => {
  const angleIncrement = props.particlesPerLayer % 2 === 0
    ? Math.PI / 2 / Math.max(1, (props.layerCount - 1))
    : Math.PI / Math.max(1, (props.layerCount - 1))

  return (
    <>
      {Array.from({ length: props.layerCount }).map((_, index) => {
        const startingAngle = index * angleIncrement
        return <NucleusLayer
          key={`nucleus-layer-${startingAngle}`}
          {...props}
          particlesPerLayer={props.particlesPerLayer}
          startingAngle={startingAngle} />
      }
      )}
    </>
  )
}

export default Nucleus
