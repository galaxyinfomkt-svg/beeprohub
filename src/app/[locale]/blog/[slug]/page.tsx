import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import JsonLd from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schemas";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords.join(", "),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd data={[
        articleSchema(post.title, post.excerpt, post.date, `https://beeprohub.com${post.image}`, `https://beeprohub.com/${locale}/blog/${post.slug}`),
        breadcrumbSchema([
          { name: "Home", url: "https://beeprohub.com" },
          { name: "Blog", url: `https://beeprohub.com/${locale}/blog` },
          { name: post.title, url: `https://beeprohub.com/${locale}/blog/${post.slug}` },
        ]),
      ]} />

      <section className="bg-dark py-20">
        <div className="max-w-3xl mx-auto px-4">
          <Link href={`/${locale}/blog`} className="text-primary text-sm hover:text-primary-hover mb-4 inline-block">&larr; Back to Blog</Link>
          <span className="inline-block bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 ml-3">{post.category}</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <time>{post.date}</time>
            <span>By {post.author}</span>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>
          <article className="prose prose-lg max-w-none prose-headings:text-dark prose-p:text-gray-600 prose-strong:text-dark prose-li:text-gray-600 prose-a:text-primary">
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n## /g, '<h2>').replace(/\n### /g, '<h3>').replace(/<h2>/g, '</p><h2>').replace(/<h3>/g, '</p><h3>').replace(/\n\n/g, '</p><p>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^/, '<p>') + '</p>' }} />
          </article>

          {/* CTA */}
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 mt-12 text-center">
            <h3 className="text-2xl font-bold text-dark mb-3">Ready to Transform Your Business?</h3>
            <p className="text-gray-600 mb-6">Start your 14-day free trial and see the difference Bee Pro Hub makes.</p>
            <Link href={`/${locale}/contact`} className="bg-primary hover:bg-primary-hover text-dark font-bold px-8 py-3 rounded-xl transition-colors">
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
