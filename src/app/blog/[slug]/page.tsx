import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { formatDate, getPost, posts } from "@/content/posts";
import { Container, Tag } from "@/components/ui/primitives";
import { Prose } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({ title: post.title, description: post.description, path: `/blog/${post.slug}`, noIndex: post.draft, type: "article" });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <article className="pt-10 pb-28 sm:pt-16">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
          <Link href="/blog" className="hover:text-forest hover:underline">
            ← All posts
          </Link>
        </nav>
        <header className="max-w-3xl">
          <div className="flex flex-wrap gap-2">
            {post.draft && <Tag tone="soil">Draft · pending SEED U approval</Tag>}
            {post.tags.map((t) => (
              <Tag key={t} tone="muted">
                {t}
              </Tag>
            ))}
          </div>
          <h1 className="mt-6 text-5xl text-forest sm:text-6xl">{post.title}</h1>
          <p className="mt-5 text-xl text-muted">{post.description}</p>
          <p className="mt-6 text-sm text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.author}
          </p>
        </header>
        <div className="mt-12 border-t border-forest/10 pt-10">
          <Prose>
            {post.body.map((b, i) => {
              if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
              if (b.type === "ul")
                return (
                  <ul key={i}>
                    {b.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                );
              return <p key={i}>{b.text}</p>;
            })}
          </Prose>
        </div>
      </Container>
      <JsonLd data={jsonLd} />
    </article>
  );
}
