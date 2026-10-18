"""Finishes the thumbnail: crops/fits the OpenArt image to 1280x720 and adds the text.
  python3 finish.py [input image]   (default: input/openart.png, else the screenshot crop)"""
import os, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
H = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(H, '../../node_modules/@fontsource/nunito/files/nunito-latin-900-normal.woff')
src = sys.argv[1] if len(sys.argv) > 1 else os.path.join(H, 'input/openart.png')
if os.path.exists(src) and not src.endswith('screenshot.webp'):
    im = Image.open(src).convert('RGB')
else:  # the image area inside the user's screenshot of the OpenArt result card (rounded corners trimmed)
    im = Image.open(os.path.join(H, 'input/openart_screenshot.webp')).convert('RGB').crop((65, 201, 927, 675))
W, Hh = 1280, 720; r = max(W / im.width, Hh / im.height); im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
x0, y0 = (im.width - W) // 2, (im.height - Hh) // 2; im = im.crop((x0, y0, x0 + W, y0 + Hh))
im = im.filter(ImageFilter.UnsharpMask(radius=1.6, percent=70, threshold=2)); im = ImageEnhance.Contrast(im).enhance(1.05); im = ImageEnhance.Color(im).enhance(1.08)
d = ImageDraw.Draw(im)
def line(txt, cy, color, box_w, size):
    while size > 40:
        f = ImageFont.truetype(FONT, size); w = d.textlength(txt, font=f)
        if w <= box_w: break
        size -= 2
    cx = 1280 - 40 - box_w / 2
    for off in [(6, 8)]: d.text((cx + off[0], cy + off[1]), txt, font=f, fill=(0, 0, 0), anchor='mm', stroke_width=14, stroke_fill=(0, 0, 0))
    d.text((cx, cy), txt, font=f, fill=color, anchor='mm', stroke_width=12, stroke_fill=(12, 10, 16))
    return size
s = line("I CAN'T", 92, (255, 255, 255), 560, 150)
line("HOLD HER.", 92 + s * 1.02, (255, 214, 64), 560, s)
out = os.path.join(H, 'out/thumbnail.jpg'); im.save(out, quality=92); print('wrote', out, im.size)
