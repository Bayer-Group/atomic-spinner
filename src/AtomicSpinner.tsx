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

export const defaultProps: Required<AtomicSpinnerProps> = {
  atomSize: 200,
  displayElectronPaths: true,
  displayNucleus: true,
  electronColorPalette: ['#FF6B6B', '#FFE66D', '#05386B'],
  electronPathCount: 3,
  electronPathColor: '#99999944',
  electronPathWidth: 0.5,
  electronsPerPath: 2,
  electronSize: 1.5,
  electronSpeed: 0.5,
  nucleusLayerCount: 1,
  nucleusParticlesPerLayer: 3,
  nucleusParticleFillColor: '#99999922',
  nucleusParticleBorderColor: '#99999966',
  nucleusParticleBorderWidth: 0.3,
  nucleusParticleSize: 2.5,
  nucleusDistanceFromCenter: 4,
  nucleusSpeed: 2,
  nucleusMaskOverlap: true
};

const AtomicSpinner: React.FunctionComponent<AtomicSpinnerProps> = ({
  atomSize = defaultProps.atomSize,
  displayElectronPaths = defaultProps.displayElectronPaths,
  displayNucleus = defaultProps.displayNucleus,
  electronColorPalette = defaultProps.electronColorPalette,
  electronPathCount = defaultProps.electronPathCount,
  electronPathColor = defaultProps.electronPathColor,
  electronPathWidth = defaultProps.electronPathWidth,
  electronsPerPath = defaultProps.electronsPerPath,
  electronSize = defaultProps.electronSize,
  electronSpeed = defaultProps.electronSpeed,
  nucleusLayerCount = defaultProps.nucleusLayerCount,
  nucleusParticlesPerLayer = defaultProps.nucleusParticlesPerLayer,
  nucleusParticleFillColor = defaultProps.nucleusParticleFillColor,
  nucleusParticleBorderColor = defaultProps.nucleusParticleBorderColor,
  nucleusParticleBorderWidth = defaultProps.nucleusParticleBorderWidth,
  nucleusParticleSize = defaultProps.nucleusParticleSize,
  nucleusDistanceFromCenter = defaultProps.nucleusDistanceFromCenter,
  nucleusSpeed = defaultProps.nucleusSpeed,
  nucleusMaskOverlap = defaultProps.nucleusMaskOverlap
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
            key={`electron-path-${electronsPerPath}-${rotationAngle}`}
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
                key={`electron-${electronsPerPath}-${electronKey}`}
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
