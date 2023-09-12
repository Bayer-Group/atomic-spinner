[![npm](https://img.shields.io/npm/v/atomic-spinner?logo=npm)](https://www.npmjs.com/package/atomic-spinner)
[![npm bundle size](https://img.shields.io/bundlephobia/min/atomic-spinner)](https://bundlephobia.com/package/atomic-spinner)
[![Publish New Release](https://github.com/Bayer-Group/atomic-spinner/actions/workflows/publish-new-release.yml/badge.svg)](https://github.com/Bayer-Group/atomic-spinner/actions/workflows/publish-new-release.yml)

# atomic-spinner
Customizable React loading spinner that looks like an [atom](https://en.wikipedia.org/wiki/Atom)

## Live Demo

https://bayer-group.github.io/atomic-spinner/

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

const App = () => <AtomicSpinner />

export default App
```

## Options

| prop | type | default |
| ---- | ---- | ------- |
| atomSize | number | 200 |
| displayElectronPaths | bool | false |
| displayNucleus | bool | false |
| electronColorPalette | string[] | [ '#0081C9', '#5BC0F8', '#86E5FF' ] |
| electronPathCount | number | 3 |
| electronPathColor | string | #707070 |
| electronPathWidth | number | 0.5 |
| electronsPerPath | number | 2 |
| electronSize | number | 1.5 |
| electronSpeed | number | 0.5 |
| nucleusDistanceFromCenter | number | 2.5 |
| nucleusLayerCount | number | 2 |
| nucleusParticlesPerLayer | number | 3 |
| nucleusParticleFillColor | string | #707070 |
| nucleusParticleBorderColor | string | #999999 |
| nucleusParticleBorderWidth | number | 0.3 |
| nucleusParticleSize | number | 2.5 |
| nucleusSpeed | number | 2 |
| nucleusMaskOverlap | bool | true |
