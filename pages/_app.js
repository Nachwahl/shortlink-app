import '../styles/globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {SessionProvider} from "next-auth/react"


function App({Component, pageProps: {session, ...pageProps}}) {
    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#2979ff',
            },
            secondary: {
                main: '#37474f',
            },
        },
    });
    return (
        <div>
            <ThemeProvider theme={theme}>
                <SessionProvider session={session}>
                    <CssBaseline/>
                    <Component {...pageProps} />
                </SessionProvider>
            </ThemeProvider>
        </div>
    )
}

export default App
