import * as React from 'react';

export type NucleusProps = {
  particleFillColor: string,
  particleBorderColor: string,
  particleCount: number,
  particleSize: number,
  distanceFromCenter: number
}

export function Nucleus({
  particleFillColor, particleBorderColor, particleCount, particleSize, distanceFromCenter
}: NucleusProps) {
  const startingAngle = Math.random() * 2 * Math.PI;
  const particles: JSX.Element[] = Array.from({ length: particleCount })
    .map((_, i) => {
      const angle = startingAngle + i * ((2 * Math.PI) / particleCount);
      const offsetX = distanceFromCenter * Math.cos(angle);
      const offsetY = distanceFromCenter * Math.sin(angle);

      return (
        <g key={i}>
          <circle
            cx={50 + offsetX}
            cy={50 + offsetY}
            r={particleSize}
            fill={particleFillColor}
            stroke={particleBorderColor}
            strokeWidth={0.3}
          />
        </g>
      );
    });

  particles.sort(({ key }) => (Number(key) % (particleCount / 3) ? 1 : -1));

  return <>{particles}</>;
}

export type ElectronPathProps = {
  color: string,
  width: number,
  rotationAngle: number
};

export const ElectronPath = ({
  color, width, rotationAngle
}: ElectronPathProps) => {
  return (
    <g transform={`rotate(${rotationAngle} 50 50)`}>
      <use xlinkHref="#electronPath" stroke={color} strokeWidth={width} />
    </g>
  );
};

export type ElectronProps = {
  rotationAngle: number,
  orbitTime: number,
  spacetimeOffset: number,
  size: number,
  colorPalette: string[]
};

export const Electron = ({
  rotationAngle, orbitTime, spacetimeOffset, size, colorPalette
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
          <mpath xlinkHref="#electron" />
        </animateMotion>
      </circle>
    </g>
  );
};

export type AtomicSpinnerProps = {
  atomSize?: number,
  displayElectronPaths?: boolean,
  displayNucleus?: boolean,
  electronColorPalette?: string[],
  electronPathCount?: number,
  electronPathColor?: string,
  electronPathWidth?: number,
  electronsPerPath?: number,
  electronSize?: number,
  nucleusParticleFillColor?: string,
  nucleusParticleBorderColor?: string,
  nucleusParticleCount?: number,
  nucleusParticleSize?: number,
  nucleusDistanceFromCenter?: number
};

const AtomicSpinner = ({
  atomSize = 200,
  displayElectronPaths = true,
  displayNucleus = true,
  electronColorPalette = ['#0081C9', '#5BC0F8', '#86E5FF'],
  electronPathCount = 3,
  electronPathColor = '#707070',
  electronPathWidth = 0.5,
  electronsPerPath = 2,
  electronSize = 1.5,
  nucleusParticleFillColor = '#707070',
  nucleusParticleBorderColor = '#999',
  nucleusParticleCount = 6,
  nucleusParticleSize = 2.5,
  nucleusDistanceFromCenter = 2.5
}: AtomicSpinnerProps) => {
  const electronPaths = Array.from({ length: electronPathCount })
    .map((_, i) => ({
      rotationAngle: 0 + i * (180 / electronPathCount),
      electronCount: electronsPerPath,
      electronOrbitTime: 2 + Math.random() * 1
    }));

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
        <path id="electronPath" d="M50 15A15 35 0 0 1 50 85A15 35 0 0 1 50 15" fill="none" />
        <path id="electron" d="M0 0A15 35 0 0 1 0 70A15 35 0 0 1 0 0" fill="none" />
      </defs>
      {displayNucleus
        && (
          <Nucleus
            particleCount={nucleusParticleCount}
            particleSize={nucleusParticleSize}
            distanceFromCenter={nucleusDistanceFromCenter}
            particleFillColor={nucleusParticleFillColor}
            particleBorderColor={nucleusParticleBorderColor}
          />
        )}
      {displayElectronPaths
        && electronPaths.map(({ rotationAngle }) => (
          <ElectronPath
            key={`electron-path-${rotationAngle}`}
            color={electronPathColor}
            width={electronPathWidth}
            rotationAngle={rotationAngle}
          />
        ))}
      {electronPaths.map(({ electronCount, rotationAngle, electronOrbitTime }) =>
        Array.from({ length: electronCount })
          .map((_, i) => (
            <Electron
              key={`electron-${i}`}
              rotationAngle={rotationAngle}
              orbitTime={electronOrbitTime}
              size={electronSize}
              spacetimeOffset={-electronOrbitTime + i * (electronOrbitTime / (electronCount))}
              colorPalette={electronColorPalette}
            />
          )))}
    </svg>
  );
};

export default React.memo(AtomicSpinner);
