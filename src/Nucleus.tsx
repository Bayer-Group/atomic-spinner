import * as React from 'react';

export type NucleusProps = {
  particleFillColor: string,
  particleBorderColor: string,
  particleBorderWidth: number,
  particleCount: number,
  particleSize: number,
  distanceFromCenter: number,
  orbitTime: number
}

const Nucleus = ({
  particleFillColor, particleBorderColor, particleBorderWidth, particleCount, particleSize, distanceFromCenter, orbitTime
}: NucleusProps) => {
  const startingAngle = 0;
  const particles: JSX.Element[] = Array.from({ length: particleCount })
    .map((_, i) => {
      const rotationAngle = startingAngle + i * ((2 * Math.PI) / particleCount);
      const offsetX = particleCount > 1 ? distanceFromCenter * Math.cos(rotationAngle) : 0;
      const offsetY = particleCount > 1 ? distanceFromCenter * Math.sin(rotationAngle) : 0;

      const particleDimensions = {
        cx: 50 + offsetX,
        cy: 50 + offsetY
      };

      const effectiveBorderWidth = Math.min(particleBorderWidth, particleSize / 3);

      return (
        <React.Fragment key={`particle-${rotationAngle}`}>
          {effectiveBorderWidth > 0 && i === 0 && (
            <mask id={`bottom-particle`}>
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
            mask={i > Math.floor(particleCount / 2) ? `url('#bottom-particle')` : undefined}
          />
        </React.Fragment>
      );
    });

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
  );
};

export default Nucleus;
