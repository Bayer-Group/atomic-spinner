import * as React from 'react';

export type ElectronProps = {
  pathDefinitionId: string,
  rotationAngle: number,
  orbitTime: number,
  spacetimeOffset: number,
  size: number,
  colorPalette: string[]
};

const Electron = ({
  pathDefinitionId, rotationAngle, orbitTime, spacetimeOffset, size, colorPalette
}: ElectronProps) => {
  let unusedColors: string[] = [];

  const getRandomElectronColor = () => {
    if (!unusedColors.length) {
      unusedColors = [...colorPalette];
    }

    return unusedColors.splice(Math.floor(Math.random() * (unusedColors.length)), 1)[0];
  };

  return (
    <g transform={`rotate(${rotationAngle} 50 50)`}>
      <circle cx="50" cy="15" r={size} fill={getRandomElectronColor()}>
        <animateMotion
          dur={`${orbitTime}s`}
          repeatCount="indefinite"
          begin={`${spacetimeOffset}s`}
        >
          <mpath href={`#${pathDefinitionId}`} />
        </animateMotion>
      </circle>
    </g>
  );
};

export default Electron;
