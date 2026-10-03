import Image from "next/image"
import Link from "next/link"
import { cn } from "cn"

import { readingTime, type Post } from "@/content/posts"

export function PostCard({ post, className, priority }: { post: Post; className?: string; priority?: boolean }) {
  return (
    <article className={cn("group relative flex flex-col gap-5", className)}>
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          placeholder="blur"
          preload={priority}
          className="img-zoom object-cover"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-x-100 group-focus-within:scale-x-100"
        />
      </div>
      <div className="flex flex-col gap-3">
        <p className="tech-label flex flex-wrap gap-x-3 gap-y-1 text-subtle">
          <span className="text-foreground/80">{post.category}</span>
          <time dateTime={post.date}>{post.dateLabel}</time>
          <span>{readingTime(post)} мин чтения</span>
        </p>
        <h3 className="text-[1.875rem] leading-[1] font-bold">
          <Link
            href={`/blog/${post.slug}`}
            className="outline-hidden after:absolute after:inset-0 after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-solid focus-visible:after:outline-offset-4 focus-visible:after:outline-ring"
          >
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 ease-[var(--ease-out)] group-hover:bg-[length:100%_1px]">
              {post.title}
            </span>
          </Link>
        </h3>
        <p className="text-[0.9375rem] text-muted-foreground">{post.excerpt}</p>
      </div>
    </article>
  )
}
