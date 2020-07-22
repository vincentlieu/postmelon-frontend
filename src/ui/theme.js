import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
  primary: { main: '#136F63' },
  secondary: { main: '#BEEDAA', contrastText: '#000000' },
};
const themeName = 'PostMelon';

export default createMuiTheme({ palette, themeName });
