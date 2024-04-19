import * as React from 'react'
import PropTypes from 'prop-types'
import ElectronPath from './ElectronPath'
import Electron from './Electron'
import Nucleus from './Nucleus'
import Vector from './Vector';
import Body from './Body';
import Universe, { RenderFitMode } from './Universe';
import { EqualChaseCircular, EqualChaseInOut, FigureEight, Random } from './StableUniverses'

export interface AtomicSpinnerProps {
  atomSize?: number
  displayElectronPaths?: boolean
  displayNucleus?: boolean
  electronColorPalette?: string[]
  electronPathCount?: number
  electronPathColor?: string
  electronPathWidth?: number
  electronsPerPath?: number
  electronSize?: number
  electronSpeed?: number
  nucleusLayerCount?: number
  nucleusParticlesPerLayer?: number
  nucleusParticleFillColor?: string
  nucleusParticleBorderColor?: string
  nucleusParticleBorderWidth?: number
  nucleusParticleSize?: number
  nucleusDistanceFromCenter?: number
  nucleusSpeed?: number
  nucleusMaskOverlap?: boolean
}

const AtomicSpinner: React.FunctionComponent<AtomicSpinnerProps> = ({
  atomSize = 200,
  displayElectronPaths = true,
  displayNucleus = true,
  electronColorPalette = ['#0081C9', '#5BC0F8', '#86E5FF'],
  electronPathCount = 3,
  electronPathColor = '#707070',
  electronPathWidth = 0.5,
  electronsPerPath = 2,
  electronSize = 1.5,
  electronSpeed = 0.5,
  nucleusLayerCount = 2,
  nucleusParticlesPerLayer = 3,
  nucleusParticleFillColor = '#707070',
  nucleusParticleBorderColor = '#999999',
  nucleusParticleBorderWidth = 0.3,
  nucleusParticleSize = 2.5,
  nucleusDistanceFromCenter = 2.5,
  nucleusSpeed = 2,
  nucleusMaskOverlap = true
}: AtomicSpinnerProps) => {
  const universeSvgRef = React.useRef();
  const electronPaths = Array.from({ length: electronPathCount })
    .map((_, i) => ({
      rotationAngle: 0 + i * (180 / electronPathCount),
      electronCount: electronsPerPath,
      electronOrbitTime: 1 / electronSpeed + Math.random() * (0.2 / electronSpeed)
    }))

  const electronPathDefinitionId = 'electronPath'
  const electronDefinitionId = 'electron'

  const colorOffset = Math.floor(Math.random() * electronColorPalette.length)

  const universe = Random
  console.log(universe.bodies)

  let timeout: NodeJS.Timeout;
  const moveBodies = () => {
    universe.moveBodiesThroughTime();
    const svgElement = (universeSvgRef.current as unknown as SVGElement | undefined)

    if (svgElement) {
      const centerOfMass = universe.getCenterOfMass();
      const bodyBoundaries = universe.getBodyBoundaries();

      const viewBoxPaddingPercent = 1.2;
      const bodiesWidth = bodyBoundaries.x[1] - bodyBoundaries.x[0]
      const bodiesHeight = bodyBoundaries.y[1] - bodyBoundaries.y[0]
      const viewBoxSize = universe.fixedViewPortSize ?? Math.max(
        bodiesWidth,
        bodiesHeight,
        Math.max(...universe.bodies.map(({ radius }) => radius)) * 25
      ) * viewBoxPaddingPercent

      const containingViewBox = {
        minX: universe.renderFitMode === RenderFitMode.CenterOfMass ? centerOfMass.x - viewBoxSize / 2 : bodyBoundaries.x[0] - (viewBoxSize - bodiesWidth) / 2,
        minY: universe.renderFitMode === RenderFitMode.CenterOfMass ? centerOfMass.y - viewBoxSize / 2 : bodyBoundaries.y[0] - (viewBoxSize - bodiesHeight) / 2,
        width: viewBoxSize,
        height: viewBoxSize
      };

      svgElement.setAttribute('viewBox', `${containingViewBox.minX}, ${containingViewBox.minY}, ${containingViewBox.width}, ${containingViewBox.height}`)

      universe.bodies.forEach((body, bodyIndex) => {
        svgElement.querySelectorAll(`#body-circle-${bodyIndex} circle`)
          .forEach((circle) => {
            circle.setAttribute('cx', body.position.x.toString())
            circle.setAttribute('cy', body.position.y.toString())
          })

        body.pastPositions.forEach((position, tailIndex) => {
          const tailCircle = svgElement.querySelector(`#tail-circle-${bodyIndex}-${tailIndex}`)
          tailCircle?.setAttribute('r', (body.radius / 3 * (1 - 1 * (tailIndex / (body.pastPositions.length - 1)))).toFixed(3))
          tailCircle?.setAttribute('cx', position.x.toString())
          tailCircle?.setAttribute('cy', position.y.toString())
        })
      })
    }
    timeout = setTimeout(moveBodies, 1);
  }

  React.useEffect(() => {
    moveBodies()

    return () => {
      clearTimeout(timeout);
    }
  }, [])

  const longestTailLength = Math.max(...universe.bodies.map(({ tailLength }) => tailLength));

  return (
    <>
      <svg
        // @ts-expect-error nope
        ref={universeSvgRef}
        xmlns="http://www.w3.org/2000/svg"
        width={1200}
        height={800}
        style={{ background: '#000' }}
      >
        <defs>
          {universe.bodies.map((_, bodyIndex) => (
            <filter
              key={`body-shadow-${bodyIndex}`}
              id={`body-shadow-${bodyIndex}`}
            >
              <feGaussianBlur stdDeviation="0.02" />
            </filter>
          ))}
        </defs>
        {
          Array.from({ length: longestTailLength })
            .map((_, tailIndex) => {
              const reverseTailIndex = longestTailLength - 1 - tailIndex
              return (
                universe.bodies.map((body, bodyIndex) => (
                  <circle
                    key={`tail-circle-${bodyIndex}-${reverseTailIndex}`}
                    id={`tail-circle-${bodyIndex}-${reverseTailIndex}`}
                    fill={body.color}
                    r={0}
                    cx={0}
                    cy={0} />
                )))
            })
        }
        {universe.bodies.map((body, bodyIndex) => (
          <g
            id={`body-circle-${bodyIndex}`}
            key={`body-circle-${bodyIndex}`}
          >
            <circle
              fill={body.color}
              r={body.radius * 3}
              opacity={0.1}
              cx={body.position.x}
              cy={body.position.y}
              style={{
                filter: `url(#${`body-shadow-${bodyIndex}`})`
              }}
            />
            <circle
              stroke="#000"
              strokeWidth={body.radius * 0.05}
              fill={body.color}
              r={body.radius}
              cx={body.position.x}
              cy={body.position.y}
            />
          </g>
        ))}
      </svg >
    </>
  )
}

AtomicSpinner.propTypes = {
  atomSize: PropTypes.number,
  displayElectronPaths: PropTypes.bool,
  displayNucleus: PropTypes.bool,
  electronColorPalette: PropTypes.arrayOf(PropTypes.string.isRequired),
  electronPathCount: PropTypes.number,
  electronPathColor: PropTypes.string,
  electronPathWidth: PropTypes.number,
  electronsPerPath: PropTypes.number,
  electronSize: PropTypes.number,
  electronSpeed: PropTypes.number,
  nucleusDistanceFromCenter: PropTypes.number,
  nucleusLayerCount: PropTypes.number,
  nucleusParticlesPerLayer: PropTypes.number,
  nucleusParticleFillColor: PropTypes.string,
  nucleusParticleBorderColor: PropTypes.string,
  nucleusParticleBorderWidth: PropTypes.number,
  nucleusParticleSize: PropTypes.number,
  nucleusSpeed: PropTypes.number,
  nucleusMaskOverlap: PropTypes.bool
}

export default AtomicSpinner
