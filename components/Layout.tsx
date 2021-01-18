import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import cx from "@sindresorhus/class-names";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => {
  const router = useRouter();

  const baseClassName = "font-bold hover:text-blue-500";

  const activeClassName = "text-blue-600";

  const homeClassName = cx(
    baseClassName,
    router.asPath === "/" && activeClassName,
    "pr-4"
  );
  const aboutClassName = cx(
    baseClassName,
    router.asPath === "/about" && activeClassName,
    "pl-4"
  );

  return (
    <div className="px-2">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <header className="max-w-2xl mx-auto py-4 border-b border-gray-300">
        <nav className="flex justify-between items-center">
          <div className="divide-x divide-gray-500">
            <Link href="/">
              <a className={homeClassName}>Home</a>
            </Link>
            <Link href="/about">
              <a className={aboutClassName} data-testid="ABOUT_LINK">
                About
              </a>
            </Link>
          </div>
          <Link href="/new">
            <a
              data-testid="NEW_LINK"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              New
            </a>
          </Link>{" "}
        </nav>
      </header>
      <main className="max-w-2xl mx-auto py-4">{children}</main>
      <footer className="max-w-2xl mx-auto p-4 border-t border-gray-300">
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  );
};

export default Layout;
