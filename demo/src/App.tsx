import AtomicSpinner from 'atomic-spinner';
import {
  Box,
  Chip,
  IconButton,
  Slider,
  Typography,
  Switch,
  Unstable_Grid2 as Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import './App.css';
import React, { useCallback, useState } from 'react';

function App() {
  const [displayElectronPaths, setDisplayElectronPaths] = useState(true);
  const [electronPathCount, setElectronPathCount] = useState(3);
  const [electronsPerPath, setElectronsPerPath] = useState(2);
  const [electronNewColor, setElectronNewColor] = useState('#86E5FF');
  const [electronColorPalette, setElectronColorPalette] = useState(['#0081C9', '#5BC0F8', '#86E5FF']);

  const displayElectronPathsChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayElectronPaths(event.target.checked);
  }, []);

  const electronPathCountChangeHandler = useCallback((_event: unknown, value: number | number[]) => {
    setElectronPathCount(Number(value));
  }, []);

  const electronsPerPathChangeHandler = useCallback((_event: unknown, value: number | number[]) => {
    setElectronsPerPath(Number(value));
  }, []);

  return (
    <Box sx={{ flexGrow: 1, padding: 5 }}>
      <Grid container spacing={2}>
        <Grid xs={12} display="flex" justifyContent="center">
          <AtomicSpinner
            atomSize={300}
            displayElectronPaths={displayElectronPaths}
            electronPathCount={electronPathCount}
            electronsPerPath={electronsPerPath}
            electronColorPalette={electronColorPalette}
          />
        </Grid>
        <Grid xs={12} lg={2}>
          <Typography id="input-slider" gutterBottom>Display Electron Paths</Typography>
          <Switch
            checked={displayElectronPaths}
            onChange={displayElectronPathsChangeHandler}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Grid>
        <Grid xs={12} lg={2}>
          <Typography id="input-slider" gutterBottom>Electron Path Count</Typography>
          <Slider
            defaultValue={3}
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={100}
            onChangeCommitted={electronPathCountChangeHandler}
          />
        </Grid>
        <Grid xs={12} lg={2}>
          <Typography id="input-slider" gutterBottom>Electrons Per Path</Typography>
          <Slider
            defaultValue={3}
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={100}
            onChangeCommitted={electronsPerPathChangeHandler}
          />
        </Grid>
        <Grid xs={12} lg={2}>
          <Typography id="input-slider" gutterBottom>Electron Color Palette</Typography>
          {electronColorPalette.map((electronColor, i) =>
            <Chip
              key={i}
              style={{backgroundColor: electronColor}}
              label={electronColor}
              onDelete={() => {
                setElectronColorPalette(electronColorPalette.filter((color) => color !== electronColor))
              }}
            />
          )}
          <HexColorPicker style={{marginTop: '15px'}} color={electronNewColor} onChange={setElectronNewColor} />
          <HexColorInput color={electronNewColor} onChange={setElectronNewColor} />
          <IconButton aria-label="add" color="primary" onClick={() => {
            setElectronColorPalette([...new Set([...electronColorPalette, electronNewColor])]);
          }}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
