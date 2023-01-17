import * as React from 'react'

export interface ElectronPathProps {
  pathDefinitionId: string
  color: string
  width: number
  rotationAngle: number
}

const ElectronPath = ({
  pathDefinitionId, color, width, rotationAngle
}: ElectronPathProps): JSX.Element => {
  return (
    <g transform={`rotate(${rotationAngle} 50 50)`}>
      <use href={`#${pathDefinitionId}`} stroke={color} strokeWidth={width} />
    </g>
  )
}

export default ElectronPath
