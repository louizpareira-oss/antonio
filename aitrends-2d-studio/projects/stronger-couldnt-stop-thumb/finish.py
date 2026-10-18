"""Finishes a thumbnail: fits the image to 1280x720, boosts contrast/colour, and adds the 2-line text
(white + yellow, heavy black outline, like the viral What-If thumbnails).
  python3 finish.py <image> <out.jpg> "<LINE 1>" "<LINE 2>" left|right"""
import os, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
H = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(H, '../../node_modules/@fontsource/fredoka/files/fredoka-latin-700-normal.woff')
src, out, l1, l2, side = sys.argv[1:6]
im = Image.open(src).convert('RGB'); W, Hh = 1280, 720; r = max(W / im.width, Hh / im.height)
im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS); x0, y0 = (im.width - W) // 2, (im.height - Hh) // 2; im = im.crop((x0, y0, x0 + W, y0 + Hh))
im = ImageEnhance.Contrast(im).enhance(1.18); im = ImageEnhance.Color(im).enhance(1.25); im = im.filter(ImageFilter.UnsharpMask(radius=1.4, percent=60, threshold=2))
d = ImageDraw.Draw(im); box = 600
def fit(txt, size):
    while size > 40 and d.textlength(txt, font=ImageFont.truetype(FONT, size)) > box: size -= 2
    return size
s = min(fit(l1, 130), fit(l2, 130)); f = ImageFont.truetype(FONT, s)
cx = 40 + box / 2 if side == 'left' else W - 40 - box / 2
for txt, cy, col in [(l1, 30 + s * 0.55, (255, 255, 255)), (l2, 30 + s * 1.6, (255, 214, 64))]:
    d.text((cx + 5, cy + 7), txt, font=f, fill=(0, 0, 0), anchor='mm', stroke_width=round(s * 0.11), stroke_fill=(0, 0, 0))
    d.text((cx, cy), txt, font=f, fill=col, anchor='mm', stroke_width=round(s * 0.09), stroke_fill=(8, 6, 12))
im.save(out, quality=93); print('wrote', out)
