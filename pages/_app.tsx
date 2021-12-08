import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import App from 'next/app';

interface MyAppProps extends AppProps {
  subdomain: string;
}

export default function MyApp({ Component, pageProps, subdomain }: MyAppProps) {
  return (
    <div>
      <div>Subdomain {subdomain}</div>
      <Component {...pageProps} />
    </div>
  )
}


MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const { ctx } = appContext;
  let subdomain: string = '';

  if (ctx.req) {
    subdomain = ctx.req.headers.host?.split('.')[0] ?? '';
  }
  
  return { ...appProps, subdomain }
}
