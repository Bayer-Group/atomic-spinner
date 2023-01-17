import * as React from 'react'

export interface ElectronProps {
  pathDefinitionId: string
  rotationAngle: number
  orbitTime: number
  spacetimeOffset: number
  size: number
  colorPalette: string[]
}

let unusedColors: string[] = []

const Electron = ({
  pathDefinitionId, rotationAngle, orbitTime, spacetimeOffset, size, colorPalette
}: ElectronProps): JSX.Element => {
  const getNextElectronColor = (): string => {
    if (unusedColors.length === 0) {
      unusedColors = [...colorPalette]
    }

    return unusedColors.pop() ?? '#000000'
  }

  return (
    <g data-testid="electron" transform={`rotate(${rotationAngle} 50 50)`}>
      <circle cx="50" cy="15" r={size} fill={getNextElectronColor()}>
        <animateMotion
          dur={`${orbitTime}s`}
          repeatCount="indefinite"
          begin={`${spacetimeOffset}s`}
        >
          <mpath href={`#${pathDefinitionId}`} />
        </animateMotion>
      </circle>
    </g>
  )
}

export default Electron
