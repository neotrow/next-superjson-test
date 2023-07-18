import "@/styles/globals.css";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";

type AppOwnProps = {
  prop1?: string;
  prop2?: string;
  prop3?: string;
};

export function MyCustomApp({
  Component,
  pageProps,
  prop1,
}: AppProps & AppOwnProps) {
  return (
    <>
      <p>example: {prop1}</p>
      <Component {...pageProps} />
    </>
  );
}

MyCustomApp.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context);

  const ownProps: AppOwnProps = {};

  ownProps.prop1 = "foo";
  ownProps.prop2 = "bar";
  ownProps.prop3 = "baz";

  // ownProps { prop1: [Function: withSuperJSON], prop2: 'bar', prop3: 'baz' }
  console.log("ownProps", ownProps);

  // doesn't work
  return { ...ctx, ...ownProps };

  // works
  // return { ...ctx, prop1: "foo", prop2: "bar", prop3: "baz" };

  // works
  // const result = { ...ctx, prop1: "foo", prop2: "bar", prop3: "baz" };
  // return result;
};

export default MyCustomApp;
