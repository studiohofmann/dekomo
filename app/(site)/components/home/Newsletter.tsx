import { sanityFetch } from "@/sanity/lib/client";
import { NEWSLETTER_QUERY } from "@/sanity/lib/queries";
import type { NEWSLETTER_QUERYResult } from "@/sanity/types";
import NewsletterForm from "./NewsletterForm";

export default async function Newsletter() {
  const newsletter: NEWSLETTER_QUERYResult = await sanityFetch({
    query: NEWSLETTER_QUERY,
    revalidate: 60,
  });

  return (
    <section id={newsletter?.sectionId || undefined}>
      <h3>{newsletter?.ueberschrift ?? "Newsletter"}</h3>
      <div className="w-full lg:w-2/5">
        {newsletter?.text && (
          <p className="text-sm mb-2">{newsletter.text}</p>
        )}
        <NewsletterForm />
      </div>
    </section>
  );
}
