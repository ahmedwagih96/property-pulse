import { Helmet } from "react-helmet";
interface SEO {
  title: string;
  description?: string;
  canonicalUrl?: string;
}
const Seo = ({ title, description ='', canonicalUrl = "" }: SEO) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{`${title} - Property Pulse`}</title>
      <link
        rel="canonical"
        href={`https://property-pulse.onrender.com${canonicalUrl}`}
      />
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Seo;
