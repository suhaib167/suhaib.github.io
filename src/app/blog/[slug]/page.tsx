import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/lib/config";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (params as unknown as { slug: string }).slug;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article className="glass rounded-2xl p-8 md:p-12">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readingTime}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="prose prose-invert max-w-none text-gray-400">
            <p className="text-lg leading-relaxed">{post.excerpt}</p>
            <p className="mt-4">
              Full article content goes here. This is a placeholder for the complete blog post
              content. In a production build, this would be rendered from MDX or a CMS.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
