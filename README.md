[![npm](https://img.shields.io/npm/v/atomic-spinner?logo=npm)](https://www.npmjs.com/package/atomic-spinner)
[![npm bundle size](https://img.shields.io/bundlephobia/min/atomic-spinner)](https://bundlephobia.com/package/atomic-spinner)

# atomic-spinner
Customizable loading spinner that looks like an [atom](https://en.wikipedia.org/wiki/Atom)

## Examples
![example-atom-1](https://user-images.githubusercontent.com/8313853/210661410-c2d977d8-426c-438f-b24b-cdbfc4b506f4.svg)
![example-atom-2](https://user-images.githubusercontent.com/8313853/210662408-6d3eed7e-44ca-4bdd-b190-d9fba865c1a9.svg)

## Installation

```sh
npm i atomic-spinner
```

```sh
yarn add atomic-spinner
```

```sh
pnpm i atomic-spinner
```

## Usage

```jsx
import AtomicSpinner from 'atomic-spinner'

function MyComponent() {
  return (
    <AtomicSpinner
      atomSize={200}
      displayElectronPaths
      displayNucleus
      electronColorPalette={[ '#0081C9', '#5BC0F8', '#86E5FF' ]}
      electronPathCount={3}
      electronPathColor="#707070"
      electronPathWidth={0.5}
      electronsPerPath={2}
      electronSize={1.5}
      nucleusParticleFillColor="#707070"
      nucleusParticleBorderColor="#999"
      nucleusParticleCount={6}
      nucleusParticleSize={2.5}
      nucleusDistanceFromCenter={2.5}
    />
  )
}

export default MyComponent
```
