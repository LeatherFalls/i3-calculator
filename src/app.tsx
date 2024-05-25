import { Box,ThemeProvider, Grid, createTheme, Typography, IconButton, CssBaseline } from '@mui/material';
import { useEffect, useState } from 'preact/hooks';
import { ScoreForm } from './components/ScoreForm';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export const App: React.FC = () => {
  const [a, setA] = useState<number | null>(0);
  const [b, setB] = useState<number | null>(0);
  const [c, setC] = useState<number | null>(0);
  const [d, setD] = useState<number | null>(0);
  const [ff, setFF] = useState<number | null>(0);
  const [harmonicMean, setHarmonicMean] = useState<number | null>(0);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const scoreValues = {
    A: 10,
    B: 8,
    C: 6,
    D: 3,
    FF: 1,
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleHarmonicMean = () => {
    const scores = [
      ...Array(a || 0).fill(scoreValues.A),
      ...Array(b || 0).fill(scoreValues.B),
      ...Array(c || 0).fill(scoreValues.C),
      ...Array(d || 0).fill(scoreValues.D),
      ...Array(ff || 0).fill(scoreValues.FF),
    ];

    if (scores.length > 0) {
      const harmonicSum = scores.reduce((acc, note) => acc + (1 / note), 0);
      const mean = (scores.length / harmonicSum).toFixed(2);
      setHarmonicMean(parseFloat(mean));
    } else {
      setHarmonicMean(null);
    }
  };

  useEffect(() => {
    handleHarmonicMean();
  }, [a, b, c, d, ff]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container sx={{ height: '100vh', width: '100vw' }}>
        <Grid item xs={12} md={7} sx={{ 
          display: { xs: 'none', md: 'block' },
          backgroundImage: 'url(https://adufrgs.org.br/wp-content/uploads/2023/05/20220131-UNI-FACHADA_UFRGS-SECOM.jpg)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }} />
        <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column' }}>
          <IconButton onClick={() => setDarkMode(!darkMode)} sx={{ position: 'fixed', top: '1rem', right: '1rem' }}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box component="form" sx={{ width: '80%', maxWidth: '400px' }}>
              <Box sx={{ mb: 3 }}>
                <img src="https://seeklogo.com/images/U/UFRGS-logo-D7FF55A4F5-seeklogo.com.png" alt="Logo" style={{ width: '100%' }} />
              </Box>
              <Typography variant="h6" align="center" sx={{ mb: 3 }}>
                Cálculo do índice I3
              </Typography>
              <ScoreForm label="Conceito A" value={a} onChange={(e) => setA(e.target.value ? parseInt(e.target.value) : null)} />
              <ScoreForm label="Conceito B" value={b} onChange={(e) => setB(e.target.value ? parseInt(e.target.value) : null)} />
              <ScoreForm label="Conceito C" value={c} onChange={(e) => setC(e.target.value ? parseInt(e.target.value) : null)} />
              <ScoreForm label="Conceito D" value={d} onChange={(e) => setD(e.target.value ? parseInt(e.target.value) : null)} />
              <ScoreForm label="Conceito FF" value={ff} onChange={(e) => setFF(e.target.value ? parseInt(e.target.value) : null)} />
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" align="center">
                  {`${a !== null ? a : ''}A + ${b !== null ? b : ''}B + ${c !== null ? c : ''}C + ${d !== null ? d : ''}D + ${ff !== null ? ff : ''}FF = ${harmonicMean !== null ? harmonicMean : ''}`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
