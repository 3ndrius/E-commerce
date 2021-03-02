import { Helmet } from "react-helmet";
import React from "react";

const Meta = ({ title}) =>  {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{`${title} E-commerce`}</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
  );
}

export default Meta
