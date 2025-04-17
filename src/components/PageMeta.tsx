
import { Helmet } from "react-helmet";

interface PageMetaProps {
  title: string;
  description?: string;
}

export const PageMeta = ({ title, description }: PageMetaProps) => {
  const baseTitle = "Exam Nexus";
  const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
};
