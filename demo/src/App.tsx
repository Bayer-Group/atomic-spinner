import React, { JSX, useCallback, useState } from 'react'
import AtomicSpinner, { defaultProps } from 'atomic-spinner'
import {
  Box,
  Chip,
  IconButton,
  Slider,
  Typography,
  Switch,
  Grid
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { HexAlphaColorPicker, HexColorInput } from 'react-colorful'
import SettingsBox from './SettingsBox'
import DarkModeToggle from './DarkModeToggle'

function App(): JSX.Element {
  const [atomSize, setAtomSize] = useState(defaultProps.atomSize)
  const [displayElectronPaths, setDisplayElectronPaths] = useState(defaultProps.displayElectronPaths)
  const [displayNucleus, setDisplayNucleus] = useState(defaultProps.displayNucleus)
  const [electronPathColor, setElectronPathColor] = useState(defaultProps.electronPathColor)
  const [electronPathCount, setElectronPathCount] = useState(defaultProps.electronPathCount)
  const [electronPathWidth, setElectronPathWidth] = useState(defaultProps.electronPathWidth)
  const [electronsPerPath, setElectronsPerPath] = useState(defaultProps.electronsPerPath)
  const [electronSize, setElectronSize] = useState(defaultProps.electronSize)
  const [electronSpeed, setElectronSpeed] = useState(defaultProps.electronSpeed)
  const [electronNewColor, setElectronNewColor] = useState('#ffffff')
  const [electronColorPalette, setElectronColorPalette] = useState(defaultProps.electronColorPalette)
  const [nucleusParticleFillColor, setNucleusParticleFillColor] = useState(defaultProps.nucleusParticleFillColor)
  const [nucleusParticleBorderColor, setNucleusParticleBorderColor] = useState(defaultProps.nucleusParticleBorderColor)
  const [nucleusParticleBorderWidth, setNucleusParticleBorderWidth] = useState(defaultProps.nucleusParticleBorderWidth)
  const [nucleusLayerCount, setNucleusLayerCount] = useState(defaultProps.nucleusLayerCount)
  const [nucleusParticlesPerLayer, setNucleusParticlesPerLayer] = useState(defaultProps.nucleusParticlesPerLayer)
  const [nucleusParticleSize, setNucleusParticleSize] = useState(defaultProps.nucleusParticleSize)
  const [nucleusDistanceFromCenter, setNucleusDistanceFromCenter] = useState(defaultProps.nucleusDistanceFromCenter)
  const [nucleusSpeed, setNucleusSpeed] = useState(defaultProps.nucleusSpeed)
  const [nucleusMaskOverlap, setNucleusMaskOverlap] = useState(defaultProps.nucleusMaskOverlap)

  const electronColorDeleteHandler = useCallback((electronColor: string) => () => {
    setElectronColorPalette(electronColorPalette.filter((color) => color !== electronColor))
  }, [electronColorPalette])

  const electronColorAddHandler = useCallback(() => {
    setElectronColorPalette([...new Set([...electronColorPalette, electronNewColor])])
  }, [electronColorPalette, electronNewColor])

  return (
    <Box sx={{ flexGrow: 1, padding: 5 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid container size={{ xs: 12 }} justifyContent="center">
          <DarkModeToggle />
        </Grid>
        <Grid container size={{ xs: 12 }}>
          <Grid size={{ xs: 12 }} display="flex" sx={{ minHeight: `${atomSize}px`, padding: 0 }} justifyContent="center">
            <AtomicSpinner
              atomSize={atomSize}
              displayElectronPaths={displayElectronPaths}
              displayNucleus={displayNucleus}
              electronColorPalette={electronColorPalette}
              electronPathCount={electronPathCount}
              electronPathColor={electronPathColor}
              electronPathWidth={electronPathWidth}
              electronsPerPath={electronsPerPath}
              electronSize={electronSize}
              electronSpeed={electronSpeed}
              nucleusLayerCount={nucleusLayerCount}
              nucleusParticlesPerLayer={nucleusParticlesPerLayer}
              nucleusParticleFillColor={nucleusParticleFillColor}
              nucleusParticleBorderColor={nucleusParticleBorderColor}
              nucleusParticleBorderWidth={nucleusParticleBorderWidth}
              nucleusParticleSize={nucleusParticleSize}
              nucleusDistanceFromCenter={nucleusDistanceFromCenter}
              nucleusSpeed={nucleusSpeed}
              nucleusMaskOverlap={nucleusMaskOverlap}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Atom Size</Typography>
              <Slider
                value={atomSize}
                valueLabelDisplay="auto"
                step={1}
                min={0}
                max={1000}
                onChange={(_event, value) => setAtomSize(value)}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Display Electron Paths</Typography>
              <Switch
                checked={displayElectronPaths}
                onChange={(_event, checked) => setDisplayElectronPaths(checked)}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Display Nucleus</Typography>
              <Switch
                checked={displayNucleus}
                onChange={(_event, checked) => setDisplayNucleus(checked)}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Electron Path Count</Typography>
              <Slider
                value={electronPathCount}
                valueLabelDisplay="auto"
                step={1}
                min={0}
                max={50}
                onChange={(_event, value) => setElectronPathCount(value)}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Electron Path Width</Typography>
              <Slider
                value={electronPathWidth}
                valueLabelDisplay="auto"
                step={0.1}
                min={0}
                max={10}
                onChange={(_event, value) => setElectronPathWidth(value)}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Electrons Per Path</Typography>
              <Slider
                value={electronsPerPath}
                valueLabelDisplay="auto"
                step={1}
                min={0}
                max={50}
                onChange={(_event, value) => setElectronsPerPath(value)}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Electron Size</Typography>
              <Slider
                value={electronSize}
                valueLabelDisplay="auto"
                step={0.1}
                min={0}
                max={10}
                onChange={(_event, value) => setElectronSize(value)}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Electron Speed</Typography>
              <Slider
                value={electronSpeed}
                valueLabelDisplay="auto"
                step={0.1}
                min={0.1}
                max={3}
                onChange={(_event, value) => setElectronSpeed(value)}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Nucleus Particle Border Width</Typography>
              <Slider
                value={nucleusParticleBorderWidth}
                valueLabelDisplay="auto"
                step={0.1}
                min={0}
                max={1}
                onChange={(_event, value) => setNucleusParticleBorderWidth(value)}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Nucleus Layer Count</Typography>
              <Slider
                value={nucleusLayerCount}
                valueLabelDisplay="auto"
                step={1}
                min={0}
                max={10}
                onChange={(_event, value) => setNucleusLayerCount(value)}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Nucleus Particles Per Layer</Typography>
              <Slider
                value={nucleusParticlesPerLayer}
                valueLabelDisplay="auto"
                step={1}
                min={0}
                max={10}
                onChange={(_event, value) => setNucleusParticlesPerLayer(value)}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Nucleus Particle Size</Typography>
              <Slider
                value={nucleusParticleSize}
                valueLabelDisplay="auto"
                step={0.1}
                min={0}
                max={10}
                onChange={(_event, value) => setNucleusParticleSize(value)}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Nucleus Distance From Center</Typography>
              <Slider
                value={nucleusDistanceFromCenter}
                valueLabelDisplay="auto"
                step={0.1}
                min={0}
                max={10}
                onChange={(_event, value) => setNucleusDistanceFromCenter(value)}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Nucleus Speed</Typography>
              <Slider
                value={nucleusSpeed}
                valueLabelDisplay="auto"
                step={0.1}
                min={0}
                max={10}
                onChange={(_event, value) => setNucleusSpeed(value)}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Nucleus Mask Overlap</Typography>
              <Switch
                checked={nucleusMaskOverlap}
                onChange={(_event, checked) => setNucleusMaskOverlap(checked)}
              />
            </SettingsBox>
          </Grid>
        </Grid>
        <Grid container>
          <Grid size={{ xs: 12, lg: 3 }}>
            <SettingsBox>
              <Typography gutterBottom>Electron Color Palette</Typography>
              <HexAlphaColorPicker style={{ margin: '15px auto' }} color={electronNewColor} onChange={setElectronNewColor} />
              <HexColorInput alpha color={electronNewColor} onChange={setElectronNewColor} />
              <IconButton aria-label="add" color="primary" onClick={electronColorAddHandler}>
                <AddIcon />
              </IconButton>
              {electronColorPalette.map((electronColor) =>
                <Chip
                  key={electronColor}
                  style={{ backgroundColor: electronColor, margin: '2px' }}
                  label={electronColor}
                  onDelete={electronColorDeleteHandler(electronColor)}
                />
              )}
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 3 }}>
            <SettingsBox>
              <Typography gutterBottom>Electron Path Color</Typography>
              <HexAlphaColorPicker style={{ margin: '15px auto' }} color={electronPathColor} onChange={setElectronPathColor} />
              <HexColorInput alpha color={electronPathColor} onChange={setElectronPathColor} />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 3 }}>
            <SettingsBox>
              <Typography gutterBottom>Nucleus Particle Fill Color</Typography>
              <HexAlphaColorPicker style={{ margin: '15px auto' }} color={nucleusParticleFillColor} onChange={setNucleusParticleFillColor} />
              <HexColorInput alpha color={nucleusParticleFillColor} onChange={setNucleusParticleFillColor} />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 3 }}>
            <SettingsBox>
              <Typography gutterBottom>Nucleus Particle Border Color</Typography>
              <HexAlphaColorPicker style={{ margin: '15px auto' }} color={nucleusParticleBorderColor} onChange={setNucleusParticleBorderColor} />
              <HexColorInput alpha color={nucleusParticleBorderColor} onChange={setNucleusParticleBorderColor} />
            </SettingsBox>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default App
