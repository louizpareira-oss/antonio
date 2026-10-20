#!/usr/bin/env python3
"""Cut the 9:16 Shorts for "What If You Got 2x Heavier Every Single Day?" in the "player card" layout.

Layout (1080x1920), from the user's reference Short:
  navy gradient, a "PART n / 7" pill and a 2-line hook title at the top, the 16:9 picture (letterbox cropped) inside a
  rounded cream player card with a play icon, a yellow progress bar, a knob and a timer, and big cream word-by-word
  captions (active word yellow, thick black outline) under the card, from timeline/words.json.

Frames are composed with PIL/numpy and piped to ffmpeg; the audio is cut from the final mix.
Usage (from the project folder): python3 shorts/make_shorts.py [N ...]   (no N = all seven)
"""
import json, math, os, subprocess, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.dirname(HERE)
STUDIO = os.path.dirname(os.path.dirname(PROJ))
SRC = os.path.join(PROJ, 'out', 'What_If_You_Got_2x_Heavier_Every_Single_Day.mp4')
OUT = os.path.join(PROJ, 'out', 'shorts')
FONTS = os.path.join(STUDIO, 'node_modules', '@fontsource')
TITLE_FONT = os.path.join(FONTS, 'fredoka', 'files', 'fredoka-latin-700-normal.woff')
UI_FONT = os.path.join(FONTS, 'nunito', 'files', 'nunito-latin-900-normal.woff2')

FPS = 24
W, H = 1080, 1920
TOTAL = 7

# Each Short: number, file slug, hook title (white line, yellow line), parts.
# A part is (video start, video end, audio end): cut on shot starts; if the audio end is later, the last frame holds
# so the final word isn't clipped by the next shot.
SHORTS = [
    (1, 'weight_doubles', ('YOUR WEIGHT', 'DOUBLES EVERY NIGHT'), [(0.0, 34.14, 34.14)]),
    (2, 'gorilla_to_titanic', ('DAY 1: A GORILLA.', 'DAY 20: THE TITANIC.'), [(34.14, 88.0, 88.0)]),
    (3, 'the_lake', ('THE WATER', 'STOPPED HOLDING YOU'), [(88.0, 142.33, 142.33)]),
    (4, 'immovable_kid', ('PICKUP TRUCK', 'VS. YOU'), [(142.33, 177.5, 177.5)]),
    (5, 'the_bridge', ('10 TONNE BRIDGE.', 'YOU WEIGH 36.'), [(177.5, 222.12, 222.27)]),
    (6, 'under_the_river', ("CAN'T CROSS THE BRIDGE?", 'WALK UNDER THE RIVER.'), [(287.13, 333.74, 333.74)]),
    (7, 'you_float', ('YOU FINALLY FLOAT.', 'THEN THIS HAPPENS.'), [(333.74, 368.07, 368.07), (455.83, 491.23, 491.23)]),
]

CREAM = (255, 244, 214)
YELLOW = (255, 214, 40)
NAVY_TOP, NAVY_BOT = (13, 22, 58), (5, 9, 28)
STRIP = (11, 19, 48)

# Player card geometry
CX0, CY0, CX1 = 40, 500, 1040           # outer card
BORDER, R_OUT = 10, 44
PX, PY, PW, PH = CX0 + BORDER, CY0 + BORDER, 980, 530   # picture
R_IN = R_OUT - BORDER
SY0, SH = PY + PH, 84                   # control strip under the picture
CY1 = SY0 + SH + BORDER
BAR_X0, BAR_X1, BAR_Y, BAR_T = 132, 878, SY0 + SH // 2, 8
CAP_Y, CAP_MAXW, CAP_SIZE = 1310, 800, 112
CROP = 'crop=1776:960:40:60'            # drop the 60 px letterbox bars; keep the left-edge weight badge


def font(path, size):
    return ImageFont.truetype(path, size)


def fit_font(path, text, size, maxw):
    f = font(path, size)
    while f.getlength(text) > maxw and size > 30:
        size -= 2
        f = font(path, size)
    return f


def rounded_mask(w, h, r, top=True, bottom=True):
    m = Image.new('L', (w, h), 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle((0, 0, w - 1, h - 1), r, fill=255,
                        corners=(top, top, bottom, bottom))
    return m


def make_base(n, title):
    """Everything that doesn't move: background, pill, title, card frame, strip, bar track, play icon."""
    y = np.linspace(0, 1, H)[:, None, None]
    top, bot = np.array(NAVY_TOP, float), np.array(NAVY_BOT, float)
    bg = top * (1 - y) + bot * y
    bg = np.broadcast_to(bg, (H, W, 3)).copy()
    # soft cyan glow behind the card, warm glow behind the captions
    yy, xx = np.mgrid[0:H, 0:W]
    for cx, cy, rad, col, k in ((540, 830, 760, (40, 110, 230), 0.42), (540, 1340, 520, (255, 120, 30), 0.10)):
        g = np.clip(1 - np.hypot(xx - cx, (yy - cy) * 1.1) / rad, 0, 1) ** 2 * k
        bg = bg * (1 - g[..., None]) + np.array(col, float) * g[..., None]
    rng = np.random.default_rng(7)
    bg += rng.normal(0, 1.4, bg.shape)          # dither so the gradient doesn't band
    img = Image.fromarray(np.clip(bg, 0, 255).astype(np.uint8)).convert('RGBA')

    # card shadow
    sh = Image.new('L', (W, H), 0)
    ImageDraw.Draw(sh).rounded_rectangle((CX0 + 6, CY0 + 22, CX1 - 6, CY1 + 22), R_OUT, fill=170)
    sh = sh.filter(ImageFilter.GaussianBlur(26))
    img = Image.composite(Image.new('RGBA', (W, H), (0, 0, 0, 255)), img, sh)

    d = ImageDraw.Draw(img)
    d.rounded_rectangle((CX0, CY0, CX1 - 1, CY1 - 1), R_OUT, fill=CREAM + (255,))
    d.rounded_rectangle((PX, PY, PX + PW - 1, SY0 + SH - 1), R_IN, fill=STRIP + (255,))
    # bar track and play icon
    d.rounded_rectangle((BAR_X0, BAR_Y - BAR_T // 2, BAR_X1, BAR_Y + BAR_T // 2), BAR_T // 2, fill=(255, 255, 255, 60))
    tx = PX + 34
    d.polygon([(tx, BAR_Y - 17), (tx, BAR_Y + 17), (tx + 29, BAR_Y)], fill=CREAM + (255,))

    # pill
    uf = font(UI_FONT, 34)
    label = f'PART {n} / {TOTAL}'
    lw = uf.getlength(label)
    pw, ph, pcy = lw + 56, 54, 196
    d.rounded_rectangle((540 - pw / 2, pcy - ph / 2, 540 + pw / 2, pcy + ph / 2), ph // 2, fill=(255, 122, 26, 255))
    d.text((540, pcy + 1), label, font=uf, fill=(255, 255, 255), anchor='mm')

    # hook title
    for line, col, cy in ((title[0], (255, 255, 255), 304), (title[1], YELLOW, 404)):
        f = fit_font(TITLE_FONT, line, 92, 980)
        d.text((540, cy), line, font=f, fill=col, anchor='mm', stroke_width=9, stroke_fill=(0, 0, 0))
    return np.array(img.convert('RGB'))


def rgba_layer(im):
    """PIL RGBA -> (premultiplied rgb float32, inverse alpha float32)."""
    a = np.asarray(im, np.float32)
    al = a[..., 3:4] / 255.0
    return a[..., :3] * al, 1.0 - al


def paste(dst, layer, x, y):
    rgb, inv = layer
    h, w = inv.shape[:2]
    x0, y0 = max(x, 0), max(y, 0)
    x1, y1 = min(x + w, dst.shape[1]), min(y + h, dst.shape[0])
    if x1 <= x0 or y1 <= y0:
        return
    sx, sy = x0 - x, y0 - y
    reg = dst[y0:y1, x0:x1].astype(np.float32)
    dst[y0:y1, x0:x1] = (rgb[sy:sy + y1 - y0, sx:sx + x1 - x0]
                         + reg * inv[sy:sy + y1 - y0, sx:sx + x1 - x0]).astype(np.uint8)


def clean(word):
    w = word.replace('...', '').replace('…', '')
    w = w.strip('"“”,.;:')
    return w.upper()


def caption_groups(parts):
    """Words in Short time, grouped 1-3 per caption (break on punctuation, pauses and width)."""
    words = json.load(open(os.path.join(PROJ, 'timeline', 'words.json')))['words']
    seq, off = [], 0.0
    for va, vb, ab, f0, fv, fa in parts:
        t0 = f0 / FPS
        for w in words:
            if va <= w['start'] < ab:
                txt = clean(w['word'])
                if txt:
                    seq.append({'t': w['start'] - t0 + off, 'e': min(w['end'], fa / FPS) - t0 + off,
                                'txt': txt, 'raw': w['word']})
        off += (fa - f0) / FPS
    total = off
    f = font(TITLE_FONT, CAP_SIZE)
    groups, cur = [], []
    for i, w in enumerate(seq):
        if cur:
            prev = cur[-1]
            joined = ' '.join(x['txt'] for x in cur + [w])
            if (len(cur) >= 3 or prev['raw'].rstrip('"”').endswith(('.', ',', '?', '!', ';', ':', '...'))
                    or w['t'] - prev['e'] > 0.35 or f.getlength(joined) > CAP_MAXW):
                groups.append(cur)
                cur = []
        cur.append(w)
    if cur:
        groups.append(cur)
    out = []
    for gi, g in enumerate(groups):
        end = g[-1]['e'] + 0.35
        if gi + 1 < len(groups):
            nxt = groups[gi + 1][0]['t']
            end = nxt if nxt - g[-1]['e'] < 0.6 else min(end, nxt)
        out.append({'words': g, 'start': g[0]['t'], 'end': min(end, total)})
    return out, total


def render_caption(group, active, scale=1.0):
    words = [w['txt'] for w in group['words']]
    size = CAP_SIZE
    f = font(TITLE_FONT, size)
    while f.getlength(' '.join(words)) > CAP_MAXW and size > 50:
        size -= 4
        f = font(TITLE_FONT, size)
    size = max(20, int(size * scale))
    f = font(TITLE_FONT, size)
    sw = max(3, int(size * 0.1))
    space = f.getlength(' ')
    widths = [f.getlength(w) for w in words]
    tw = sum(widths) + space * (len(words) - 1)
    pad = sw + 24
    cw, ch = int(tw + pad * 2), int(size * 1.35 + pad * 2)
    im = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
    # soft drop shadow
    sh = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
    ds = ImageDraw.Draw(sh)
    d = ImageDraw.Draw(im)
    x, cy = pad, ch / 2
    for i, (w, ww) in enumerate(zip(words, widths)):
        ds.text((x, cy + size * 0.07), w, font=f, fill=(0, 0, 0, 150), anchor='lm', stroke_width=sw,
                stroke_fill=(0, 0, 0, 150))
        x += ww + space
    im = Image.alpha_composite(im, sh.filter(ImageFilter.GaussianBlur(size * 0.06)))
    d = ImageDraw.Draw(im)
    x = pad
    for i, (w, ww) in enumerate(zip(words, widths)):
        d.text((x, cy), w, font=f, fill=(YELLOW if i == active else CREAM), anchor='lm', stroke_width=sw,
               stroke_fill=(0, 0, 0))
        x += ww + space
    return rgba_layer(im), cw, ch


def frame_parts(parts):
    out = []
    for va, vb, ab in parts:
        f0 = math.ceil(va * FPS - 1e-6)
        fv = math.ceil(vb * FPS - 1e-6)
        fa = max(fv, math.ceil(ab * FPS - 1e-6))
        out.append((va, vb, ab, f0, fv, fa))
    return out


def decode(f0, n):
    cmd = ['ffmpeg', '-v', 'error', '-ss', f'{(f0 - 0.5) / FPS:.5f}', '-i', SRC, '-frames:v', str(n), '-an',
           '-vf', f'{CROP},scale={PW}:{PH}:flags=lanczos', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-']
    return subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)


def audio_graph(parts, total, last_word_end):
    chains, labels = [], []
    for i, (va, vb, ab, f0, fv, fa) in enumerate(parts):
        a, b = f0 / FPS, fa / FPS
        c = f'[1:a]atrim=start={a:.5f}:end={b:.5f},asetpts=PTS-STARTPTS'
        if len(parts) > 1:
            if i > 0:
                c += ',afade=t=in:d=0.08'
            if i < len(parts) - 1:
                c += f',afade=t=out:st={b - a - 0.08:.5f}:d=0.08'
        chains.append(c + f'[p{i}]')
        labels.append(f'[p{i}]')
    tail = min(0.6, max(0.06, total - last_word_end))
    g = ';'.join(chains) + ';' + ''.join(labels) + f'concat=n={len(parts)}:v=0:a=1,'
    g += f'afade=t=in:d=0.04,afade=t=out:st={total - tail:.5f}:d={tail:.5f}[a]'
    return g


def make(spec):
    n, slug, title, raw_parts = spec
    parts = frame_parts(raw_parts)
    groups, total = caption_groups(parts)
    nframes = sum(fa - f0 for _, _, _, f0, _, fa in parts)
    total = nframes / FPS
    base = make_base(n, title)
    os.makedirs(OUT, exist_ok=True)
    out_path = os.path.join(OUT, f'short_{n}_{slug}.mp4')

    # picture corner mask (top corners round, bottom meets the strip)
    pm = np.asarray(rounded_mask(PW, PH, R_IN, top=True, bottom=False), np.float32)[..., None] / 255.0
    base_pic = base[PY:PY + PH, PX:PX + PW].astype(np.float32)
    corner = R_IN + 2

    uf = font(UI_FONT, 36)
    knob_im = Image.new('RGBA', (60, 60), (0, 0, 0, 0))
    kd = ImageDraw.Draw(knob_im)
    kd.ellipse((8, 8, 52, 52), fill=(255, 214, 40, 70))
    kd.ellipse((16, 16, 44, 44), fill=YELLOW + (255,), outline=(255, 250, 230, 255), width=3)
    knob = rgba_layer(knob_im)
    timers = {}

    os.makedirs(os.path.join(PROJ, 'build'), exist_ok=True)
    log = open(os.path.join(PROJ, 'build', f'short_{n}.log'), 'w')
    last_word_end = groups[-1]['words'][-1]['e'] if groups else total
    enc = subprocess.Popen(
        ['ffmpeg', '-y', '-v', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS),
         '-i', '-', '-i', SRC, '-filter_complex', audio_graph(parts, total, last_word_end),
         '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p',
         '-r', str(FPS), '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', out_path],
        stdin=subprocess.PIPE, stderr=log)

    cap_cache, cap_key = {}, None
    gi = 0
    i = 0
    fsize = PW * PH * 3
    for va, vb, ab, f0, fv, fa in parts:
        dec = decode(f0, fv - f0)
        pic = None
        for k in range(fa - f0):
            if k < fv - f0:
                buf = dec.stdout.read(fsize)
                if len(buf) == fsize:
                    pic = np.frombuffer(buf, np.uint8).reshape(PH, PW, 3)
            t = i / FPS
            fr = base.copy()
            # picture with rounded top corners
            region = pic.copy()
            for cx in (0, PW - corner):
                sl = (slice(0, corner), slice(cx, cx + corner))
                region[sl] = (pic[sl] * pm[sl] + base_pic[sl] * (1 - pm[sl])).astype(np.uint8)
            fr[PY:PY + PH, PX:PX + PW] = region
            # progress bar, knob, timer
            p = min(1.0, (i + 1) / nframes)
            bx = int(BAR_X0 + (BAR_X1 - BAR_X0) * p)
            fr[BAR_Y - BAR_T // 2:BAR_Y + BAR_T // 2, BAR_X0:bx] = YELLOW
            paste(fr, knob, bx - 30, BAR_Y - 30)
            s = int(t)
            label = f'{s // 60:02d}:{s % 60:02d}'
            if label not in timers:
                tim = Image.new('RGBA', (130, 60), (0, 0, 0, 0))
                ImageDraw.Draw(tim).text((128, 30), label, font=uf, fill=CREAM, anchor='rm')
                timers[label] = rgba_layer(tim)
            paste(fr, timers[label], PX + PW - 30 - 130, BAR_Y - 30)
            # caption
            while gi < len(groups) and t >= groups[gi]['end']:
                gi += 1
            if gi < len(groups) and groups[gi]['start'] <= t < groups[gi]['end']:
                g = groups[gi]
                act = max(j for j, w in enumerate(g['words']) if w['t'] <= t or j == 0)
                age = t - g['start']
                sc = 0.86 if age < 1 / FPS else (0.95 if age < 2 / FPS else 1.0)
                key = (gi, act, sc)
                if cap_key is None or cap_key[0] != gi:
                    cap_cache = {}
                if key not in cap_cache:
                    cap_cache[key] = render_caption(g, act, sc)
                cap_key = key
                layer, cw, ch = cap_cache[key]
                paste(fr, layer, 540 - cw // 2, CAP_Y - ch // 2)
            enc.stdin.write(fr.tobytes())
            i += 1
        dec.stdout.close()
        dec.wait()
    enc.stdin.close()
    enc.wait()
    log.close()
    print(f'short {n}: {out_path}  {nframes} frames, {total:.2f} s, {len(groups)} captions', flush=True)
    return out_path


if __name__ == '__main__':
    want = [int(a) for a in sys.argv[1:]] or [s[0] for s in SHORTS]
    for spec in SHORTS:
        if spec[0] in want:
            make(spec)
