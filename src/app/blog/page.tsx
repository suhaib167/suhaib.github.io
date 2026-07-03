import { BlogList } from "@/components/blog/blog-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Mohamed Suhaib",
  description: "Read articles about AI, embedded systems, and full-stack development.",
};

export default function BlogPage() {
  return <BlogList />;
}
