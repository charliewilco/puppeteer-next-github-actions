import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="favicon.ico" />
      <link
        rel="stylesheet"
        href="https://unpkg.com/spectre.css/dist/spectre.min.css"
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/spectre.css/dist/spectre-exp.min.css"
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css"
      />
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{" "}
        |{" "}
        <Link href="/about">
          <a data-testid="ABOUT_LINK">About</a>
        </Link>{" "}
        |{" "}
        <Link href="/new">
          <a data-testid="NEW_LINK">New</a>
        </Link>{" "}
      </nav>
    </header>
    <main className="container grid-lg">{children}</main>
    <footer className="container grid-lg">
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
);

export default Layout;
