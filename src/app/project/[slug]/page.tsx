import { projects } from "@/lib/config";
import { ProjectDetailClient } from "./client";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  return <ProjectDetailClient params={params} />;
}
