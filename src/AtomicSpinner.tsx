import * as React from 'react'

import ElectronPath from './ElectronPath'
import Electron from './Electron'
import Nucleus from './Nucleus'

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
  const electronPaths = Array.from({ length: electronPathCount })
    .map((_, i) => ({
      rotationAngle: 0 + i * (180 / electronPathCount),
      electronCount: electronsPerPath,
      electronOrbitTime: 1 / electronSpeed + Math.random() * (0.2 / electronSpeed)
    }))

  const electronPathDefinitionId = 'electronPath'
  const electronDefinitionId = 'electron'

  const colorOffset = Math.floor(Math.random() * electronColorPalette.length)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={atomSize}
      height={atomSize}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <defs>
        <path id={electronPathDefinitionId} d="M50 15A15 35 0 0 1 50 85A15 35 0 0 1 50 15" fill="none" />
        <path id={electronDefinitionId} d="M0 0A15 35 0 0 1 0 70A15 35 0 0 1 0 0" fill="none" />
      </defs>
      {displayNucleus &&
        (
          <Nucleus
            layerCount={nucleusLayerCount}
            particlesPerLayer={nucleusParticlesPerLayer}
            particleSize={nucleusParticleSize}
            distanceFromCenter={nucleusDistanceFromCenter}
            particleFillColor={nucleusParticleFillColor}
            particleBorderColor={nucleusParticleBorderColor}
            particleBorderWidth={nucleusParticleBorderWidth}
            orbitTime={10 / nucleusSpeed}
            nucleusMaskOverlap={nucleusMaskOverlap}
          />
        )}
      {displayElectronPaths &&
        electronPaths.map(({ rotationAngle }) => (
          <ElectronPath
            key={`electron-path-${rotationAngle}`}
            pathDefinitionId={electronPathDefinitionId}
            color={electronPathColor}
            width={electronPathWidth}
            rotationAngle={rotationAngle}
          />
        ))}
      {electronPaths.map(({ electronCount, rotationAngle, electronOrbitTime }, pathIndex) => {
        const randomSpacetimeShift = (-1 + Math.random() * -1) * electronOrbitTime

        return Array.from({ length: electronCount })
          .map((_, electronIndex) => {
            const electronKey = electronIndex

            return (
              <Electron
                key={`electron-${electronKey}`}
                pathDefinitionId={electronDefinitionId}
                rotationAngle={rotationAngle}
                orbitTime={electronOrbitTime}
                size={electronSize}
                spacetimeOffset={randomSpacetimeShift + electronIndex * (electronOrbitTime / (electronCount))}
                color={electronColorPalette[(pathIndex * electronsPerPath + electronIndex + colorOffset) % electronColorPalette.length] ?? '#000'} />
            )
          })
      })}
    </svg>
  )
}

export default AtomicSpinner
