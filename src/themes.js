import {createTheme} from '@mui/material';

export const theme = createTheme({
    palette: {
        action: {
            disabledOpacity: 1,
            disabled: 'primary.main',
            disabledBackground: 'primary.main',
        },
        primary: {
            main: "rgba(3, 29, 96, 0.82)",
        },
        secondary: {
            main: "rgb(255, 255, 255)",
        }
    },
    typography: {
        fontFamily: ['SFUIText', 'sans-serif'].join(','),
        button: {
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: '20',
            color: 'secondary.main',
            opacity: '1',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                    font-family: 'SFUIText';
                    font-style: normal;
                    font-display: swap;
                    font-weight: 400;
                    src: local('SFUIText'), local('SFUIText-Regular'), url('./styles/fonts/SFUIText-Regular.ttf') format('ttf');
                    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;          
                }
            `,
        },
        MuiButtonGroup: {
            styleOverrides: {
                root: {
                    fontFamily: ['Nunito', 'sans-serif'].join(','), 
                    color: 'white',
                }
            }
        },  
        MuiInputBase: {
            styleOverrides: {
                root: {
                    height: "36px",
                    fontSize: 14,
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    height: "36px",
                    padding: "-1px",
                    fontSize: 14,
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                InputProps: {
                    height: "36px",
                    fontSize: 12,
                }
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    width: "300px",
                },
            }
        },     
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    '& .MuiToggleButtonGroup-grouped': {
                        height: 36,
                        border: "1px solid",
                        color: "rgba(3, 29, 96, 0.82)",
                        padding: 16,
                        transition: '0.3s',
                        '&.Mui-selected': {
                            backgroundColor: "rgba(3, 29, 96, 0.82)",
                            color: "white",
                            border: "1px solid rgba(3, 29, 96, 0.82)",  
                            
                            '&:hover': {
                                backgroundColor: "rgba(3, 29, 96, 0.82)",
                            }
                        },
                }
            }
        }
        },
        MuiTogglleButton: {
            styeOverrides: {
                root: {
                    
                }
            }
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    backgroundColor: "",
                }
            }
        }
    },
});
