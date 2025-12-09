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
import { HexColorPicker, HexColorInput } from 'react-colorful'
import React, { JSX, useCallback, useEffect, useState } from 'react'
import SettingsBox from './SettingsBox'
import DarkModeToggle from './DarkModeToggle'

function App(): JSX.Element {
  const [atomSize, setAtomSize] = useState(200)
  const [displayElectronPaths, setDisplayElectronPaths] = useState(true)
  const [displayNucleus, setDisplayNucleus] = useState(true)
  const [electronPathColor, setElectronPathColor] = useState('#707070')
  const [electronPathCount, setElectronPathCount] = useState(3)
  const [electronPathWidth, setElectronPathWidth] = useState(0.5)
  const [electronsPerPath, setElectronsPerPath] = useState(2)
  const [electronSize, setElectronSize] = useState(1.5)
  const [electronSpeed, setElectronSpeed] = useState(0.5)
  const [electronNewColor, setElectronNewColor] = useState('#86E5FF')
  const [electronColorPalette, setElectronColorPalette] = useState(['#0081C9', '#5BC0F8', '#86E5FF'])
  const [nucleusParticleFillColor, setNucleusParticleFillColor] = useState('#707070')
  const [nucleusParticleBorderColor, setNucleusParticleBorderColor] = useState('#999999')
  const [nucleusParticleBorderWidth, setNucleusParticleBorderWidth] = useState(0.3)
  const [nucleusLayerCount, setNucleusLayerCount] = useState(2)
  const [nucleusParticlesPerLayer, setNucleusParticlesPerLayer] = useState(3)
  const [nucleusParticleSize, setNucleusParticleSize] = useState(2.5)
  const [nucleusDistanceFromCenter, setNucleusDistanceFromCenter] = useState(2.5)
  const [nucleusSpeed, setNucleusSpeed] = useState(2)
  const [nucleusMaskOverlap, setNucleusMaskOverlap] = useState(true)

  const atomSizeChangeHandler = useCallback((_event: unknown, value: number | number[]) => {
    setAtomSize(Number(value))
  }, [])

  const displayElectronPathsChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayElectronPaths(event.target.checked)
  }, [])

  const displayNucleusChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayNucleus(event.target.checked)
  }, [])

  const electronPathCountChangeHandler = useCallback((_event: unknown, value: number | number[]) => {
    setElectronPathCount(Number(value))
  }, [])

  const electronPathWidthChangeHandler = useCallback((_event: unknown, value: number | number[]) => {
    setElectronPathWidth(Number(value))
  }, [])

  const electronsPerPathChangeHandler = useCallback((_event: unknown, value: number | number[]) => {
    setElectronsPerPath(Number(value))
  }, [])

  const electronSizeChangeHandler = useCallback((_event: unknown, value: number | number[]) => {
    setElectronSize(Number(value))
  }, [])

  const electronSpeedChangeHandler = useCallback((_event: unknown, value: number | number[]) => {
    setElectronSpeed(Number(value))
  }, [])

  const nucleusLayerCountChangeHandler = useCallback((_event: unknown, value: number | number[]) => {
    setNucleusLayerCount(Number(value))
  }, [])

  const nucleusParticlesPerLayerChangeHandler = useCallback((_event: unknown, value: number | number[]) => {
    setNucleusParticlesPerLayer(Number(value))
  }, [])

  const nucleusParticleBorderWidthChangeHandler = useCallback((_event: unknown, value: number | number[]) => {
    setNucleusParticleBorderWidth(Number(value))
  }, [])

  const nucleusParticleSizeChangeHandler = useCallback((_event: unknown, value: number | number[]) => {
    setNucleusParticleSize(Number(value))
  }, [])

  const nucleusDistanceFromCenterChangeHandler = useCallback((_event: unknown, value: number | number[]) => {
    setNucleusDistanceFromCenter(Number(value))
  }, [])

  const nucleusSpeedChangeHandler = useCallback((_event: unknown, value: number | number[]) => {
    setNucleusSpeed(Number(value))
  }, [])

  const electronColorDeleteHandler = useCallback((electronColor: string) => () => {
    setElectronColorPalette(electronColorPalette.filter((color) => color !== electronColor))
  }, [electronColorPalette])

  const electronColorAddHandler = useCallback(() => {
    setElectronColorPalette([...new Set([...electronColorPalette, electronNewColor])])
  }, [electronColorPalette, electronNewColor])

  const nucleusMaskOverlapChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setNucleusMaskOverlap(event.target.checked)
  }, [])

  const [showAtomicSpinner, setShowAtomicSpinner] = useState(true)

  useEffect(() => {
    setShowAtomicSpinner(false)
    setTimeout(() => { setShowAtomicSpinner(true) }, 1)
  }, [
    atomSize,
    displayElectronPaths,
    displayNucleus,
    electronColorPalette,
    electronPathCount,
    electronPathColor,
    electronPathWidth,
    electronsPerPath,
    electronSize,
    electronSpeed,
    nucleusLayerCount,
    nucleusParticlesPerLayer,
    nucleusParticleFillColor,
    nucleusParticleBorderColor,
    nucleusParticleBorderWidth,
    nucleusParticleSize,
    nucleusDistanceFromCenter,
    nucleusSpeed
  ])

  return (
    <Box sx={{ flexGrow: 1, padding: 5 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid container size={{ xs: 12 }} justifyContent="center">
          <DarkModeToggle />
        </Grid>
        <Grid container size={{ xs: 12 }}>
          <Grid size={{ xs: 12 }} display="flex" sx={{ minHeight: `${atomSize}px`, padding: 0 }} justifyContent="center">
            {showAtomicSpinner && (
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
            )}
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Atom Size</Typography>
              <Slider
                defaultValue={200}
                valueLabelDisplay="auto"
                step={1}
                min={0}
                max={1000}
                onChangeCommitted={atomSizeChangeHandler}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Display Electron Paths</Typography>
              <Switch
                checked={displayElectronPaths}
                onChange={displayElectronPathsChangeHandler}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Display Nucleus</Typography>
              <Switch
                checked={displayNucleus}
                onChange={displayNucleusChangeHandler}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Electron Path Count</Typography>
              <Slider
                defaultValue={3}
                valueLabelDisplay="auto"
                step={1}
                min={0}
                max={100}
                onChangeCommitted={electronPathCountChangeHandler}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Electron Path Width</Typography>
              <Slider
                defaultValue={0.5}
                valueLabelDisplay="auto"
                step={0.1}
                min={0}
                max={10}
                onChangeCommitted={electronPathWidthChangeHandler}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Electrons Per Path</Typography>
              <Slider
                defaultValue={3}
                valueLabelDisplay="auto"
                step={1}
                min={0}
                max={100}
                onChangeCommitted={electronsPerPathChangeHandler}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Electron Size</Typography>
              <Slider
                defaultValue={1.5}
                valueLabelDisplay="auto"
                step={0.1}
                min={0}
                max={10}
                onChangeCommitted={electronSizeChangeHandler}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Electron Speed</Typography>
              <Slider
                defaultValue={0.5}
                valueLabelDisplay="auto"
                step={0.1}
                min={0.1}
                max={3}
                onChangeCommitted={electronSpeedChangeHandler}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Nucleus Particle Border Width</Typography>
              <Slider
                defaultValue={0.3}
                valueLabelDisplay="auto"
                step={0.1}
                min={0}
                max={1}
                onChangeCommitted={nucleusParticleBorderWidthChangeHandler}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Nucleus Layer Count</Typography>
              <Slider
                defaultValue={2}
                valueLabelDisplay="auto"
                step={1}
                min={0}
                max={10}
                onChangeCommitted={nucleusLayerCountChangeHandler}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Nucleus Particles Per Layer</Typography>
              <Slider
                defaultValue={3}
                valueLabelDisplay="auto"
                step={1}
                min={0}
                max={10}
                onChangeCommitted={nucleusParticlesPerLayerChangeHandler}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Nucleus Particle Size</Typography>
              <Slider
                defaultValue={2.5}
                valueLabelDisplay="auto"
                step={0.1}
                min={0}
                max={10}
                onChangeCommitted={nucleusParticleSizeChangeHandler}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Nucleus Distance From Center</Typography>
              <Slider
                defaultValue={2.5}
                valueLabelDisplay="auto"
                step={0.1}
                min={0}
                max={10}
                onChangeCommitted={nucleusDistanceFromCenterChangeHandler}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Nucleus Speed</Typography>
              <Slider
                defaultValue={2}
                valueLabelDisplay="auto"
                step={0.1}
                min={0}
                max={10}
                onChangeCommitted={nucleusSpeedChangeHandler}
              />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SettingsBox>
              <Typography gutterBottom>Nucleus Mask Overlap</Typography>
              <Switch
                checked={nucleusMaskOverlap}
                onChange={nucleusMaskOverlapChangeHandler}
              />
            </SettingsBox>
          </Grid>
        </Grid>
        <Grid container>
          <Grid size={{ xs: 12, lg: 3 }}>
            <SettingsBox>
              <Typography gutterBottom>Electron Color Palette</Typography>
              <HexColorPicker style={{ margin: '15px auto' }} color={electronNewColor} onChange={setElectronNewColor} />
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
              <HexColorPicker style={{ margin: '15px auto' }} color={electronPathColor} onChange={setElectronPathColor} />
              <HexColorInput alpha color={electronPathColor} onChange={setElectronPathColor} />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 3 }}>
            <SettingsBox>
              <Typography gutterBottom>Nucleus Particle Fill Color</Typography>
              <HexColorPicker style={{ margin: '15px auto' }} color={nucleusParticleFillColor} onChange={setNucleusParticleFillColor} />
              <HexColorInput alpha color={nucleusParticleFillColor} onChange={setNucleusParticleFillColor} />
            </SettingsBox>
          </Grid>
          <Grid size={{ xs: 12, lg: 3 }}>
            <SettingsBox>
              <Typography gutterBottom>Nucleus Particle Border Color</Typography>
              <HexColorPicker style={{ margin: '15px auto' }} color={nucleusParticleBorderColor} onChange={setNucleusParticleBorderColor} />
              <HexColorInput alpha color={nucleusParticleBorderColor} onChange={setNucleusParticleBorderColor} />
            </SettingsBox>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default App
