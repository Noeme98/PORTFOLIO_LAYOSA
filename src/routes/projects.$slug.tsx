import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProjectCaseStudy } from "@/components/project-case-study";
import { getNextProject, getProject } from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project, next: getNextProject(params.slug) };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.project.name} — ${loaderData.project.category} Case Study`;
    const d = loaderData.project.summary;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/projects/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/projects/${params.slug}` }],
    };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const { project, next } = Route.useLoaderData();
  return <ProjectCaseStudy project={project} next={next ?? null} />;
}
