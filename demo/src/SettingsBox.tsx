import { Paper, styled } from '@mui/material';

const SettingsBox = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.primary,
}));

export default SettingsBox;
