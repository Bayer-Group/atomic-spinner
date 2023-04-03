import * as React from 'react'

export interface ElectronProps {
  pathDefinitionId: string
  rotationAngle: number
  orbitTime: number
  spacetimeOffset: number
  size: number
  color: string
}

const Electron = ({
  pathDefinitionId, rotationAngle, orbitTime, spacetimeOffset, size, color
}: ElectronProps): JSX.Element => {
  return (
    <g data-testid="electron" transform={`rotate(${rotationAngle} 50 50)`}>
      <circle cx="50" cy="15" r={size} fill={color}>
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
