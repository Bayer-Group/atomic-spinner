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
  const [atomSize, setAtomSize] = useState(200);
  const [displayElectronPaths, setDisplayElectronPaths] = useState(true);
  const [displayNucleus, setDisplayNucleus] = useState(true);
  const [electronPathCount, setElectronPathCount] = useState(3);
  const [electronsPerPath, setElectronsPerPath] = useState(2);
  const [electronNewColor, setElectronNewColor] = useState('#86E5FF');
  const [electronColorPalette, setElectronColorPalette] = useState(['#0081C9', '#5BC0F8', '#86E5FF']);

  const atomSizeChangeHandler = useCallback((_event: unknown, value: number | number[]) => {
    setAtomSize(Number(value));
  }, []);

  const displayElectronPathsChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayElectronPaths(event.target.checked);
  }, []);

  const displayNucleusChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayNucleus(event.target.checked);
  }, []);

  const electronPathCountChangeHandler = useCallback((_event: unknown, value: number | number[]) => {
    setElectronPathCount(Number(value));
  }, []);

  const electronsPerPathChangeHandler = useCallback((_event: unknown, value: number | number[]) => {
    setElectronsPerPath(Number(value));
  }, []);

  const electronColorDeleteHandler = useCallback((electronColor: string) => () => {
    setElectronColorPalette(electronColorPalette.filter((color) => color !== electronColor))
  }, [electronColorPalette]);

  const electronColorAddHandler = useCallback(() => {
    setElectronColorPalette([...new Set([...electronColorPalette, electronNewColor])]);
  }, [electronColorPalette, electronNewColor]);

  return (
    <Box sx={{ flexGrow: 1, padding: 5 }}>
      <Grid container spacing={2}>
        <Grid xs={12} display="flex" justifyContent="center">
          <AtomicSpinner
            atomSize={atomSize}
            displayElectronPaths={displayElectronPaths}
            displayNucleus={displayNucleus}
            electronPathCount={electronPathCount}
            electronsPerPath={electronsPerPath}
            electronColorPalette={electronColorPalette}
          />
        </Grid>
        <Grid xs={12} lg={2}>
          <Typography gutterBottom>Atom Size</Typography>
          <Slider
            defaultValue={200}
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={1000}
            onChangeCommitted={atomSizeChangeHandler}
          />
        </Grid>
        <Grid xs={12} lg={2}>
          <Typography gutterBottom>Display Electron Paths</Typography>
          <Switch
            checked={displayElectronPaths}
            onChange={displayElectronPathsChangeHandler}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Grid>
        <Grid xs={12} lg={2}>
          <Typography gutterBottom>Display Nucleus</Typography>
          <Switch
            checked={displayNucleus}
            onChange={displayNucleusChangeHandler}
          />
        </Grid>
        <Grid xs={12} lg={2}>
          <Typography gutterBottom>Electron Path Count</Typography>
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
          <Typography gutterBottom>Electrons Per Path</Typography>
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
          <Typography gutterBottom>Electron Color Palette</Typography>
          {electronColorPalette.map((electronColor, i) =>
            <Chip
              key={electronColor}
              style={{backgroundColor: electronColor}}
              label={electronColor}
              onDelete={electronColorDeleteHandler(electronColor)}
            />
          )}
          <HexColorPicker style={{marginTop: '15px'}} color={electronNewColor} onChange={setElectronNewColor} />
          <HexColorInput color={electronNewColor} onChange={setElectronNewColor} />
          <IconButton aria-label="add" color="primary" onClick={electronColorAddHandler}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
