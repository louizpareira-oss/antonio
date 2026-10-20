#!/usr/bin/env python3
"""Full-screen 9:16 Shorts for "What If You Got 2x Heavier Every Single Day?" (the user's reference layout, Oct 20).

The picture is rendered by the studio itself in 9:16 (node render.mjs --reframe: a per-shot window over the 16:9
stage, planned in shorts/reframe.json), so it stays sharp. On top: the video's question as a 2-line title (white /
yellow) and big yellow word-group captions from timeline/words.json. The audio is cut from the final long-video mix.

Usage (from the project folder):
  python3 shorts/make_shorts.py render [N ...]   render the missing 9:16 picture pieces (resumable, 20 s each)
  python3 shorts/make_shorts.py [N ...]          compose the Shorts into out/shorts/   (no N = all seven)
"""
import json, math, os, subprocess, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.dirname(HERE)
STUDIO = os.path.dirname(os.path.dirname(PROJ))
SRC = os.path.join(PROJ, 'out', 'What_If_You_Got_2x_Heavier_Every_Single_Day.mp4')   # audio source
OUT = os.path.join(PROJ, 'out', 'shorts')
SEGS = os.path.join(PROJ, 'build', 'shorts', 'segs')
TITLE_FONT = os.path.join(STUDIO, 'node_modules', '@fontsource', 'fredoka', 'files', 'fredoka-latin-700-normal.woff')

FPS = 24
W, H = 1080, 1920
SEG = 20.0                      # seconds per render piece (an idle container restart can kill a long render)
TITLE = ('WHAT IF YOU GOT', '2X HEAVIER EVERY DAY?')
YELLOW = (255, 210, 40)
TITLE_Y = 262
CAP_Y, CAP_MAXW, CAP_SIZE = 1230, 860, 104

# Each Short: number, file slug, parts, title-off ranges (Short seconds, e.g. while the video's own title card is up).
# A part is (video start, video end, audio end), cut on shot starts; if the audio end is later, the last frame holds
# so the final word isn't clipped by the next shot.
SHORTS = [
    (1, 'weight_doubles', [(0.0, 34.14, 34.14)], [(28.76, 34.2)]),
    (2, 'gorilla_to_titanic', [(34.14, 88.0, 88.0)], []),
    (3, 'the_lake', [(88.0, 142.33, 142.33)], []),
    (4, 'immovable_kid', [(142.33, 177.5, 177.5)], []),
    (5, 'the_bridge', [(177.5, 222.12, 222.27)], []),
    (6, 'under_the_river', [(287.13, 333.74, 333.74)], []),
    (7, 'you_float', [(333.74, 368.07, 368.07), (455.83, 491.23, 491.23)], []),
]


def font(size):
    return ImageFont.truetype(TITLE_FONT, size)


def frame_parts(parts):
    out = []
    for va, vb, ab in parts:
        f0 = math.ceil(va * FPS - 1e-6)
        fv = math.ceil(vb * FPS - 1e-6)
        fa = max(fv, math.ceil(ab * FPS - 1e-6))
        out.append((va, vb, ab, f0, fv, fa))
    return out


def pieces(f0, fv):
    """Split frames [f0, fv) into render pieces of at most SEG seconds."""
    n = max(1, math.ceil((fv - f0) / (SEG * FPS)))
    step = math.ceil((fv - f0) / n)
    return [(a, min(fv, a + step)) for a in range(f0, fv, step)]


def seg_path(a, b):
    return os.path.join(SEGS, f'f{a:06d}_{b:06d}.mp4')


def render(spec):
    os.makedirs(SEGS, exist_ok=True)
    for va, vb, ab, f0, fv, fa in frame_parts(spec[2]):
        for a, b in pieces(f0, fv):
            dst = seg_path(a, b)
            if os.path.exists(dst):
                continue
            tmp = dst[:-4] + '.part.mp4'
            print(f'short {spec[0]}: rendering frames {a}-{b} ({(b - a) / FPS:.1f} s)', flush=True)
            subprocess.run(['node', 'render.mjs', '--project', PROJ, '--reframe', '--workers', '4',
                            '--from', f'{a / FPS:.6f}', '--to', f'{b / FPS:.6f}', '--out', tmp],
                           cwd=STUDIO, check=True, stdout=subprocess.DEVNULL)
            os.replace(tmp, dst)


def clean(word):
    w = word.replace('...', '').replace('…', '')
    w = w.strip('"“”,;:')
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
    f = font(CAP_SIZE)
    groups, cur = [], []
    for w in seq:
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
        out.append({'text': ' '.join(w['txt'] for w in g), 'start': g[0]['t'], 'end': min(end, total),
                    'last': g[-1]['e']})
    return out, total


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


def fit_size(text, size, maxw):
    while font(size).getlength(text) > maxw and size > 40:
        size -= 2
    return size


def outlined(rows, stroke_k):
    """Centered lines [(text, colour, size)] with a thick black outline and a soft shadow -> (layer, w, h)."""
    pad = 34
    width = int(max(font(s).getlength(t) for t, _, s in rows) + pad * 2 + 40)
    heights = [int(s * 1.14) for *_, s in rows]
    height = int(sum(heights) + pad * 2)
    sh = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    im = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    ds, d = ImageDraw.Draw(sh), ImageDraw.Draw(im)
    y = pad
    for (text, col, s), hh in zip(rows, heights):
        f, sw = font(s), max(4, int(s * stroke_k))
        ds.text((width / 2, y + hh / 2 + s * 0.08), text, font=f, fill=(0, 0, 0, 170), anchor='mm',
                stroke_width=sw, stroke_fill=(0, 0, 0, 170))
        d.text((width / 2, y + hh / 2), text, font=f, fill=col, anchor='mm', stroke_width=sw, stroke_fill=(0, 0, 0))
        y += hh
    im = Image.alpha_composite(sh.filter(ImageFilter.GaussianBlur(10)), im)
    return rgba_layer(im), width, height


def caption_layer(text, scale):
    return outlined([(text, YELLOW, max(30, int(fit_size(text, CAP_SIZE, CAP_MAXW) * scale)))], 0.12)


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


def frames(parts):
    """Yield every picture frame of the Short in order (rendered pieces, then held frames)."""
    fr = None
    for va, vb, ab, f0, fv, fa in parts:
        for a, b in pieces(f0, fv):
            dec = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', seg_path(a, b), '-frames:v', str(b - a), '-an',
                                    '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'],
                                   stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
            for _ in range(b - a):
                buf = dec.stdout.read(W * H * 3)
                if len(buf) == W * H * 3:
                    fr = np.frombuffer(buf, np.uint8).reshape(H, W, 3)
                yield fr
            dec.stdout.close()
            dec.wait()
        for _ in range(fa - fv):
            yield fr


def compose(spec):
    n, slug, raw_parts, no_title = spec
    parts = frame_parts(raw_parts)
    missing = [1 for *_, f0, fv, fa in parts for a, b in pieces(f0, fv) if not os.path.exists(seg_path(a, b))]
    if missing:
        sys.exit(f'short {n}: {len(missing)} picture piece(s) missing; run: python3 shorts/make_shorts.py render {n}')
    groups, _ = caption_groups(parts)
    nframes = sum(fa - f0 for *_, f0, fv, fa in parts)
    total = nframes / FPS
    title, tw, th = outlined([(TITLE[0], (255, 255, 255), fit_size(TITLE[0], 86, 1000)),
                              (TITLE[1], YELLOW, fit_size(TITLE[1], 86, 1000))], 0.1)
    os.makedirs(OUT, exist_ok=True)
    os.makedirs(os.path.join(PROJ, 'build'), exist_ok=True)
    out_path = os.path.join(OUT, f'short_{n}_{slug}.mp4')
    log = open(os.path.join(PROJ, 'build', f'short_{n}.log'), 'w')
    last_word_end = groups[-1]['last'] if groups else total
    enc = subprocess.Popen(
        ['ffmpeg', '-y', '-v', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS),
         '-i', '-', '-i', SRC, '-filter_complex', audio_graph(parts, total, last_word_end),
         '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p',
         '-r', str(FPS), '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', out_path],
        stdin=subprocess.PIPE, stderr=log)
    cache, gi = {}, 0
    for i, fr in enumerate(frames(parts)):
        out, t = fr.copy(), i / FPS
        if not any(a <= t < b for a, b in no_title):
            paste(out, title, W // 2 - tw // 2, TITLE_Y - th // 2)
        while gi < len(groups) and t >= groups[gi]['end']:
            gi += 1
        if gi < len(groups) and groups[gi]['start'] <= t:
            age = t - groups[gi]['start']
            key = (gi, 0.84 if age < 1 / FPS else (0.94 if age < 2 / FPS else 1.0))   # pop in
            if key not in cache:
                cache = {k: v for k, v in cache.items() if k[0] == gi}
                cache[key] = caption_layer(groups[gi]['text'], key[1])
            layer, cw, ch = cache[key]
            paste(out, layer, W // 2 - cw // 2, CAP_Y - ch // 2)
        enc.stdin.write(out.tobytes())
    enc.stdin.close()
    enc.wait()
    log.close()
    print(f'short {n}: {out_path}  {nframes} frames, {total:.2f} s, {len(groups)} captions', flush=True)


if __name__ == '__main__':
    args = sys.argv[1:]
    mode = 'render' if args[:1] == ['render'] else 'compose'
    want = [int(a) for a in args if a.isdigit()] or [s[0] for s in SHORTS]
    for spec in SHORTS:
        if spec[0] in want:
            render(spec) if mode == 'render' else compose(spec)
