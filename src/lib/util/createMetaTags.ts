import app from "@/lib/config/app.config";
import { BASE_URL } from "@/lib/config/env.config";

interface Params {
  title?: string;
  description?: string;
  url?: string;
}

const createMetaTags = ({
  title: _title,
  description: _description,
  url: _url,
}: Params = {}) => {
  const title = _title ? `${_title} | ${app.name}` : app.name,
    description = _description ?? app.description,
    url = _url ?? BASE_URL;

  const tags = [
    { title },
    { name: "description", content: description },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@omnidotdev" },
    { name: "twitter:url", content: url },
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
  ];

  return tags;
};

export default createMetaTags;
