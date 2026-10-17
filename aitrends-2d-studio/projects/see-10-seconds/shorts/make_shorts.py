"""Cut the finished 16:9 video into vertical Shorts (1080x1920).

The 16:9 picture stays whole in the middle; above it a hook title, below it the channel line,
behind it a blurred copy of the same frame. Output: out/shorts/short_N_<slug>.mp4

    python3 shorts/make_shorts.py            # all
    python3 shorts/make_shorts.py 2          # just short 2
"""
import subprocess, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

P = Path(__file__).resolve().parent.parent
SRC = P / "out/What_If_You_Could_See_10_Seconds_Into_the_Future.mp4"
FONTS = P.parent.parent / "node_modules/@fontsource"
TITLE = str(FONTS / "fredoka/files/fredoka-latin-700-normal.woff")
UI = str(FONTS / "nunito/files/nunito-latin-900-normal.woff2")
W, H = 1080, 1920
VY = 650                       # top of the 16:9 picture (1080x608)
WHITE, CYAN = "#ffffff", "#7fe8ff"

# (slug, start, end, title lines [(text, colour, size)]) — cuts sit on shot starts, ends leave ~1 s after the last word
SHORTS = [
    ("the_power", 0.0, 46.2,
     [("WHAT IF YOU COULD SEE", WHITE, 82), ("10 SECONDS", CYAN, 150), ("INTO THE FUTURE?", WHITE, 82)]),
    ("never_lose", 46.24, 93.5,
     [("YOU SEE 10 SECONDS AHEAD.", WHITE, 70), ("YOU NEVER", WHITE, 128), ("LOSE AGAIN.", CYAN, 128)]),
    ("ten_seconds_to_save_her", 155.9, 220.3,
     [("YOU HAVE", WHITE, 90), ("10 SECONDS", CYAN, 150), ("TO SAVE HER.", WHITE, 90)]),
]


def overlay(n, lines, path):
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    # part pill
    f = ImageFont.truetype(UI, 34)
    label = f"PART {n} / {len(SHORTS)}"
    tw = d.textlength(label, font=f)
    d.rounded_rectangle((W / 2 - tw / 2 - 28, 170, W / 2 + tw / 2 + 28, 226), 28, fill=(8, 10, 24, 170), outline=(127, 232, 255, 200), width=3)
    d.text((W / 2, 199), label, font=f, fill=WHITE, anchor="mm")
    # hook title, bottom-aligned just above the picture
    fonts = [ImageFont.truetype(TITLE, s) for _, _, s in lines]
    heights = [s * 1.08 for _, _, s in lines]
    y = VY - 36 - sum(heights)
    for (txt, col, s), ft, h in zip(lines, fonts, heights):
        while d.textlength(txt, font=ft) > W - 80:
            s -= 4; ft = ImageFont.truetype(TITLE, s)
        if col == CYAN:  # soft glow behind the accent line
            glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
            ImageDraw.Draw(glow).text((W / 2, y + h / 2), txt, font=ft, fill=(88, 214, 255, 230), anchor="mm")
            im.alpha_composite(glow.filter(ImageFilter.GaussianBlur(18)))
            d = ImageDraw.Draw(im)
        d.text((W / 2, y + h / 2), txt, font=ft, fill=col, anchor="mm", stroke_width=max(6, s // 14), stroke_fill=(8, 10, 24, 255))
        y += h
    # channel line under the picture
    f2 = ImageFont.truetype(UI, 40)
    d.text((W / 2, VY + 608 + 70), "FULL STORY ON PARALLEL YOU", font=f2, fill=WHITE, anchor="mm", stroke_width=6, stroke_fill=(8, 10, 24, 255))
    f3 = ImageFont.truetype(TITLE, 34)
    d.text((W / 2, VY + 608 + 122), "Every what if, lived by you.", font=f3, fill=CYAN, anchor="mm", stroke_width=5, stroke_fill=(8, 10, 24, 255))
    im.save(path)


def build(n):
    slug, a, b, lines = SHORTS[n - 1]
    dur = b - a
    png = P / f"build/shorts/overlay_{n}.png"
    out = P / f"out/shorts/short_{n}_{slug}.mp4"
    png.parent.mkdir(parents=True, exist_ok=True); out.parent.mkdir(parents=True, exist_ok=True)
    overlay(n, lines, png)
    fo = dur - 0.5
    graph = (
        "[0:v]split[a][b];"
        f"[a]scale=-2:{H},crop={W}:{H},gblur=sigma=34,eq=brightness=-0.16:saturation=0.75[bg];"
        f"[b]scale={W}:-2[fg];"
        f"[bg][fg]overlay=0:{VY}[v1];[v1][1:v]overlay=0:0,"
        f"fade=t=in:st=0:d=0.15,fade=t=out:st={fo:.2f}:d=0.5,format=yuv420p[v];"
        f"[0:a]afade=t=in:st=0:d=0.12,afade=t=out:st={dur - 0.9:.2f}:d=0.9[aud]"
    )
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", f"{a}", "-t", f"{dur}", "-i", str(SRC), "-loop", "1", "-i", str(png),
                    "-filter_complex", graph, "-map", "[v]", "-map", "[aud]", "-t", f"{dur}", "-r", "24",
                    "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-profile:v", "high",
                    "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", str(out)], check=True)
    print(f"{out.name}: {dur:.1f} s")


if __name__ == "__main__":
    for n in ([int(x) for x in sys.argv[1:]] or range(1, len(SHORTS) + 1)):
        build(n)
