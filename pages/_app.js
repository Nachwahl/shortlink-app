import '../styles/globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {SessionProvider} from "next-auth/react"
import Navbar from "../component/Navbar";
import { SWRConfig } from "swr";


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
                    <SWRConfig
                        value={{
                            refreshInterval: 3000,
                            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
                        }}
                    >
                        <Navbar>
                            <Component {...pageProps} />
                        </Navbar>
                    </SWRConfig>
                </SessionProvider>
            </ThemeProvider>
        </div>
    )
}

export default App
