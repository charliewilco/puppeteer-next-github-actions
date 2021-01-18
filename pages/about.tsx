import Link from "next/link";
import Layout from "../components/Layout";

const AboutPage = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <h1 data-testid="ABOUT_TITLE" className="text-3xl font-bold mb-8">
      About
    </h1>
    <section className="prose prose-lg">
      <p>This is the about page</p>
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </section>
  </Layout>
);

export default AboutPage;
