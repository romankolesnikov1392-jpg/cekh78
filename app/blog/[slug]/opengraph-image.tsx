import { getPost, getPosts } from "@/content/posts"
import { ogSize, renderOg } from "@/lib/og"

export const alt = "Статья в блоге автосервиса Цех78"
export const size = ogSize
export const contentType = "image/png"

const photoBySlug: Record<string, string> = {
  "podgotovka-k-zime": "blog/winter.jpg",
  "5-priznakov-diagnostiki-hodovoy": "equipment/lift-underbody.jpg",
  "chto-takoe-saylentbloki": "process/suspension-apart.jpg",
  "to-po-reglamentu": "blog/oil-service.jpg",
  "kak-my-krasim": "blog/prep-sanding.jpg",
  "diagnostika-pered-pokupkoy": "blog/used-cars.jpg",
}

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  return renderOg({
    eyebrow: post ? `Блог · ${post.category}` : "Блог",
    title: post ? post.title.replace(/ /g, " ") : "Блог",
    photo: photoBySlug[slug] ?? "blog/winter.jpg",
  })
}
