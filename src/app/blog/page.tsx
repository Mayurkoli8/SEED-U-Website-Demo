import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { formatDate, posts } from "@/content/posts";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Tag } from "@/components/ui/primitives";

export const metadata = pageMetadata({
  title: "Blog & News",
  description: "Notes from SEED U on Indian-language AI, Marathi agriculture AI, verified data and responsible AI.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        path="/blog"
        crumb="Blog"
        eyebrow="Blog & news"
        title="Notes from the field."
        lede={<p>What we are learning about language, agriculture and building AI that people can trust.</p>}
      />
      <section aria-label="Posts" className="pb-28">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="group relative flex h-full flex-col rounded-3xl bg-mist p-7 ring-1 ring-forest/10 transition-[background-color,transform] duration-500 hover:-translate-y-1 hover:bg-sage-soft/60">
                  <div className="flex flex-wrap items-center gap-2">
                    {post.draft && <Tag tone="soil">Draft</Tag>}
                    {post.tags.map((t) => (
                      <Tag key={t} tone="muted">
                        {t}
                      </Tag>
                    ))}
                  </div>
                  <h2 className="mt-5 text-3xl text-forest">
                    <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-lg text-muted">{post.description}</p>
                  <p className="mt-6 text-sm text-muted">
                    <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.author}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
