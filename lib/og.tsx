import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import sharp from "sharp"

/** Общий генератор Open Graph картинок 1200×630 в фирменном стиле. */
export const ogSize = { width: 1200, height: 630 }

const fontsPromise = Promise.all([
  readFile(join(process.cwd(), "assets/fonts/sofia-extra-condensed-800.ttf")),
  readFile(join(process.cwd(), "assets/fonts/golos-text-500.ttf")),
])

async function photoDataUrl(relPath: string) {
  const buf = await sharp(join(process.cwd(), "assets/photos", relPath))
    .resize(640, 630, { fit: "cover" })
    .jpeg({ quality: 72 })
    .toBuffer()
  return `data:image/jpeg;base64,${buf.toString("base64")}`
}

export async function renderOg({ eyebrow, title, photo }: { eyebrow: string; title: string; photo: string }) {
  const [[display, body], img] = await Promise.all([fontsPromise, photoDataUrl(photo)])
  const fontSize = title.length > 60 ? 64 : title.length > 36 ? 76 : 92
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#121314", color: "#ECE9E4", fontFamily: "Golos" }}>
        <div style={{ position: "absolute", right: 0, top: 0, width: 640, height: 630, display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse */}
          <img src={img} width={640} height={630} alt="" style={{ objectFit: "cover" }} />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 640,
              height: 630,
              background: "linear-gradient(90deg, #121314 0%, rgba(18,19,20,0.6) 35%, rgba(18,19,20,0.05) 100%)",
            }}
          />
        </div>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 64px", width: 760, height: "100%" }}>
          <div style={{ display: "flex", alignItems: "stretch", fontFamily: "Sofia", fontSize: 44, lineHeight: 1 }}>
            <div style={{ display: "flex", alignItems: "center", paddingRight: 8 }}>ЦЕХ</div>
            <div style={{ display: "flex", alignItems: "center", border: "4px solid #FF5A1F", padding: "2px 8px 0" }}>78</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ display: "flex", fontSize: 20, letterSpacing: 3, textTransform: "uppercase", color: "#FF5A1F" }}>{eyebrow}</div>
            <div style={{ display: "flex", fontFamily: "Sofia", fontSize, lineHeight: 0.92, letterSpacing: -0.5 }}>{title}</div>
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 20, color: "#A39F99" }}>
            <span>Санкт-Петербург · ул. Руставели, 13</span>
            <span style={{ color: "#86837D" }}>· демо-проект</span>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Sofia", data: display, weight: 800, style: "normal" },
        { name: "Golos", data: body, weight: 500, style: "normal" },
      ],
    }
  )
}
