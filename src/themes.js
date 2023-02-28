import {createTheme} from '@mui/material';
import font from './styles/fonts/SFUIText-Regular.ttf'
import SFPro from './styles/fonts/SFProText-Regular.ttf'
import font1 from '../dist/assets/SFUIText-Regular-c5339ac0.ttf'

export const theme = createTheme({
    palette: {
        action: {
            disabledOpacity: 1,
            disabled: 'primary.main',
            disabledBackground: 'primary.main',
        },
        primary: {
            main: "rgba(3, 29, 96, 0.82)",
            pale: "rgba(3, 29, 96, 0.50)",
        },
        secondary: {
            main: "rgb(255, 255, 255)",
        }
    },
    typography: {
        fontFamily: 'SFProText',
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
                    font-family: 'SFProText';
                    font-style: normal;
                    font-display: swap;
                    font-weight: 400;
                    src: local('SFProText'), local('SFProText-Regular'), url(${font1}) format('ttf');
                    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;          
                }
            `,
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#fff',
                    fontWeight: '400'
                }
            }
        },
        MuiButtonGroup: {
            styleOverrides: {
                root: {

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
                },
            }
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    '& .MuiToggleButtonGroup-grouped': {
                        height: 36,
                        border: "1px solid rgba(3, 29, 96, 0.50)",
                        color: "rgba(3, 29, 96, 0.82)",
                        padding: 16,
                        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                        '&.Mui-selected': {
                            backgroundColor: "rgba(3, 29, 96, 0.82)",
                            color: "white",
                            boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
                            '&:hover': {
                                backgroundColor: "rgba(3, 29, 96, 0.82)",
                            }
                        },
                    }
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    '&.MuiTableCell-root': {
                        textAlign: 'left',
                        fontSize: 14,
                        textOverflow: "ellipsis",
                        overflow: "hidden",

                    }
                }
            }
        }

    },
});
