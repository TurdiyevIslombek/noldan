import { Link, useLocation } from "react-router-dom";
import SiteNav from "../components/SiteNav";
import { useSeo } from "../lib/seo";
import { NOT_FOUND } from "../lib/seo-routes";

/* A real "not found", not a quiet redirect home: sending every mistyped
   address to the homepage is what search engines flag as a soft 404. */
export default function NotFound() {
  const { pathname } = useLocation();
  useSeo(NOT_FOUND, pathname);
  return (
    <div className="nf">
      <SiteNav />
      <main id="main" className="nf__main">
        <p className="nf__code">404</p>
        <h1>Bu sahifa topilmadi.</h1>
        <p>Manzil notoʻgʻri yozilgan yoki sahifa koʻchirilgan boʻlishi mumkin.</p>
        <div className="nf__go">
          <Link to="/learn">Darslarga oʻtish</Link>
          <Link to="/">Bosh sahifa</Link>
        </div>
      </main>
    </div>
  );
}
