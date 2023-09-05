import {createTheme} from '@mui/material';
import font from './styles/fonts/SFUIText-Regular.ttf'
import fontLight from './styles/fonts/SFUIText-Light.ttf'
//main: "rgba(3, 29, 96, 0.82)",

//rgba(3, 29, 96, 0.50)


export const getMode = (mode: any) => (
    mode === 'light'
        ? {
            action: {
                disabledOpacity: 1,
                disabled: 'primary.main',
                disabledBackground: 'primary.main',
                active: 'rgb(3, 29, 96, 0.82)',
                /*hover: 'rgba(208,208,208,0.82)',*/
                selected: 'rgba(0,19,69,0.82)',
            },
            primary: {
                //main: "rgba(3, 29, 96, 0.82)",
                main: "rgb(48, 70, 125)",
                /*main: "rgba(232,232,232,0.82)",*/
                contrastText: 'rgba(255,255,255,0.82)',
                //main: "rgba(81,130,255,0.82)",
                //index: "rgba(3, 29, 96, 0.05)",
                pale: "rgba(182,182,182,0.82)",
                contrastPale: "rgba(247,247,247,0.82)",
                fileLoader: 'rgb(48,70,125)'
            },
            secondary: {
                //main: "rgb(255, 255, 255)",
                main: "rgb(3, 29, 96, 0.82)",
                success: 'rgba(32,163,45,0.82)',
                error: 'rgb(255,44,44)',

            },
            text: {
                primary: 'rgba(0,0,0,0.82)',
                secondary: 'rgba(26,26,26,0.61)',
                disabled: 'rgba(88,88,88,0.5)',

            },
            background: {
                default: 'rgb(255,255,255)',
                paper: 'rgb(255,255,255)',
                block: 'rgba(238,238,238,0.63)',
                dialog: 'rgb(255,255,255)',
                accent: 'rgba(234,234,234,0.82)',
            },
            mode: "light"
        }
        : {action: {
                disabledOpacity: 1,
                disabled: 'primary.main',
                disabledBackground: 'primary.main',
                active: 'rgba(210,210,210,0.82)',
                //hover: 'rgba(83,83,83,0.82)',
                /*hover: 'rgba(0,19,69,0.82)',*/
                selected: 'rgba(0,19,69,0.82)',
            },
            primary: {
                main: "rgb(255,255,255)",
                /*main: "rgb(38,37,37)",*/
                contrastText: 'rgba(24,24,24,0.82)',
                //main: "rgba(81,130,255,0.82)",
                //index: "rgba(3, 29, 96, 0.05)",
                pale: "rgba(78,78,78,0.82)",
                contrastPale: 'rgba(24,24,24,0.82)',
                //contrastPale: 'rgba(33,32,32,0.63)',
				fileLoader: 'rgba(24,24,24,0.82)'
            },
            secondary: {
                //main: "rgb(255, 255, 255)",
                /*main: "rgb(3, 29, 96, 0.82)",*/
                main: "rgba(3, 29, 96, 0.82)",
                main2: "rgb(31,62,162)",
                success: 'rgba(104,252,140,0.91)',
                error: 'rgb(255,44,44)',
                hover: "rgba(22,47,118,0.84)",
                hover2: "rgba(45,78,176,0.84)",
                lightMain: "rgba(3,29,96,0.82)",
            },
            text: {
                primary: 'rgba(255,255,255,0.82)',
                secondary: 'rgba(194,194,194,0.61)',
                disabled: 'rgba(88,88,88,0.5)',

            },
            background: {
                default: 'rgb(21,21,21)',
                block: 'rgba(33,32,32,0.63)',
                dialog: 'rgb(28,28,28)',
                accent: 'rgb(51,51,51)',
            },
            mode: 'dark'
        }
)

export const themeObject = {
    typography: {
        fontFamily: 'SFUIText',
        button: {
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: '20',
            opacity: '1',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides:

                `@font-face {
                    font-family: 'SFUIText';
                    font-style: normal;
                    font-display: swap;
                    font-weight: 400;
                    src: local('SFUIText'), local('SFUIText-Regular'), local('SFUIText-Light'),url(${fontLight}) format('truetype'), url(${font}) format('truetype');
                    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;          
                }
            `,
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: '400',
                }
            }
        },
        MuiButtonGroup: {
            styleOverrides: {
                root: {
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    //padding: "-1px",
                    fontSize: 14,
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                InputProps: {
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
                    margin: 1,
                    '& .MuiToggleButtonGroup-grouped': {
                        height: 36,
                        // color: "primary.main",
                        padding: 16,
                        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                        '&.Mui-selected': {
                            backgroundColor: "rgba(3, 29, 96, 0.82)",
                            color: "white",
                            boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
                            '&:hover': {
                                backgroundColor: "rgba(3, 29, 96, 0.82)",
                                opacity: 0.9,
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
                        fontSize: 14,
                        textOverflow: "ellipsis",
                        overflow: "hidden",

                    }
                }
            }
        }

    },
}
