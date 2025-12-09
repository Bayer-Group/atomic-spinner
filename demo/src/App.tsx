import AtomicSpinner from 'atomic-spinner'
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
import React, { JSX, useCallback, useState } from 'react'
import SettingsBox from './SettingsBox'
import DarkModeToggle from './DarkModeToggle'

function App(): JSX.Element {
  const [atomSize, setAtomSize] = useState(300)
  const [displayElectronPaths, setDisplayElectronPaths] = useState(true)
  const [displayNucleus, setDisplayNucleus] = useState(true)
  const [electronPathColor, setElectronPathColor] = useState('#99999944')
  const [electronPathCount, setElectronPathCount] = useState(3)
  const [electronPathWidth, setElectronPathWidth] = useState(0.5)
  const [electronsPerPath, setElectronsPerPath] = useState(2)
  const [electronSize, setElectronSize] = useState(1.5)
  const [electronSpeed, setElectronSpeed] = useState(0.5)
  const [electronNewColor, setElectronNewColor] = useState('#ffffff')
  const [electronColorPalette, setElectronColorPalette] = useState(['#FF6B6B', '#FFE66D', '#05386B'])
  const [nucleusParticleFillColor, setNucleusParticleFillColor] = useState('#99999922')
  const [nucleusParticleBorderColor, setNucleusParticleBorderColor] = useState('#99999966')
  const [nucleusParticleBorderWidth, setNucleusParticleBorderWidth] = useState(0.3)
  const [nucleusLayerCount, setNucleusLayerCount] = useState(1)
  const [nucleusParticlesPerLayer, setNucleusParticlesPerLayer] = useState(3)
  const [nucleusParticleSize, setNucleusParticleSize] = useState(2.5)
  const [nucleusDistanceFromCenter, setNucleusDistanceFromCenter] = useState(4)
  const [nucleusSpeed, setNucleusSpeed] = useState(2)
  const [nucleusMaskOverlap, setNucleusMaskOverlap] = useState(true)

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
