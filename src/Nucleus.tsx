import * as React from 'react';

export type NucleusProps = {
  particleFillColor: string,
  particleBorderColor: string,
  particleCount: number,
  particleSize: number,
  distanceFromCenter: number
}

const Nucleus = ({
  particleFillColor, particleBorderColor, particleCount, particleSize, distanceFromCenter
}: NucleusProps) => {
  const startingAngle = Math.random() * 2 * Math.PI;
  const particles: JSX.Element[] = Array.from({ length: particleCount })
    .map((_, i) => {
      const rotationAngle = startingAngle + i * ((2 * Math.PI) / particleCount);
      const offsetX = distanceFromCenter * Math.cos(rotationAngle);
      const offsetY = distanceFromCenter * Math.sin(rotationAngle);

      return (
        <g key={`particle-${rotationAngle}`}>
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
};

export default Nucleus;
