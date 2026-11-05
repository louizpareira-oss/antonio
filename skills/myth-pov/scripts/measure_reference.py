"""Measure a reference video: cuts, per-shot camera motion, light/colour, captions (OCR), audio loudness.
usage: python3 -I measure.py VIDEO OUTDIR
Writes OUTDIR/shots.json, OUTDIR/captions.json, OUTDIR/audio.json, frames and contact sheets.
"""
import json, os, subprocess, sys, math
import numpy as np, cv2

video, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
for d in ('frames', 'sheets'):
    os.makedirs(os.path.join(out, d), exist_ok=True)

cap = cv2.VideoCapture(video)
fps = cap.get(cv2.CAP_PROP_FPS)
frames = []
while True:
    ok, f = cap.read()
    if not ok:
        break
    frames.append(f)
N = len(frames)
H, W = frames[0].shape[:2]
print(video, N, 'frames', fps, 'fps', W, 'x', H, flush=True)

# ---------- per-frame stats ----------
gray = [cv2.cvtColor(f, cv2.COLOR_BGR2GRAY) for f in frames]
hsv = [cv2.cvtColor(f, cv2.COLOR_BGR2HSV) for f in frames]
small = [cv2.resize(f, (90, 160), interpolation=cv2.INTER_AREA) for f in frames]

# cut score: histogram distance + pixel diff on small frames
cut_score = [0.0]
for i in range(1, N):
    a = cv2.calcHist([hsv[i - 1]], [0, 1], None, [32, 16], [0, 180, 0, 256]); cv2.normalize(a, a)
    b = cv2.calcHist([hsv[i]], [0, 1], None, [32, 16], [0, 180, 0, 256]); cv2.normalize(b, b)
    hd = cv2.compareHist(a, b, cv2.HISTCMP_BHATTACHARYYA)
    pd = float(np.mean(np.abs(small[i].astype(np.int16) - small[i - 1].astype(np.int16)))) / 255
    cut_score.append(hd * 0.6 + pd * 2.0)
cs = np.array(cut_score)
med = np.median(cs[1:])
cuts = [0]
for i in range(1, N):
    win = cs[max(1, i - 8):min(N, i + 9)]
    local = np.median(win)
    if cs[i] > max(0.22, local * 3.0 + 0.05, med * 4) and cs[i] == win.max() and i - cuts[-1] >= 4:
        cuts.append(i)
# dissolve / fade check: frames where luma drops near black
mean_luma = np.array([float(g.mean()) for g in gray])

# ---------- motion between consecutive frames ----------
def motion(a, b):
    p0 = cv2.goodFeaturesToTrack(a, maxCorners=400, qualityLevel=0.01, minDistance=7, blockSize=7)
    if p0 is None or len(p0) < 12:
        return None
    p1, st, err = cv2.calcOpticalFlowPyrLK(a, b, p0, None, winSize=(21, 21), maxLevel=3)
    good0, good1 = p0[st == 1], p1[st == 1]
    if len(good0) < 12:
        return None
    M, inl = cv2.estimateAffinePartial2D(good0, good1, method=cv2.RANSAC, ransacReprojThreshold=2.0)
    if M is None:
        return None
    s = math.hypot(M[0, 0], M[1, 0]); rot = math.degrees(math.atan2(M[1, 0], M[0, 0]))
    flow = good1 - good0
    resid = good1 - (good0 @ M[:, :2].T + M[:, 2])
    inlier_ratio = float(inl.mean()) if inl is not None else 0
    # parallax: spread of residual flow among points (3D camera move -> depth-dependent flow)
    par = float(np.median(np.linalg.norm(resid, axis=1)))
    return dict(dx=float(M[0, 2] + (s - 1) * 0), dy=float(M[1, 2]), scale=s, rot=rot,
                mag=float(np.median(np.linalg.norm(flow, axis=1))), inl=inlier_ratio, par=par)

mot = [None] + [motion(gray[i - 1], gray[i]) for i in range(1, N)]

# ---------- captions by OCR on a band ----------
from rapidocr_onnxruntime import RapidOCR
ocr = RapidOCR()
def ocr_band(img):
    res, _ = ocr(img)
    if not res:
        return []
    return [(r[1], float(r[2]), [float(min(p[0] for p in r[0])), float(min(p[1] for p in r[0])), float(max(p[0] for p in r[0])), float(max(p[1] for p in r[0]))]) for r in res if float(r[2]) > 0.5]

cap_rows = []
step = 3
for i in range(0, N, step):
    up = cv2.resize(frames[i], (W * 2, H * 2), interpolation=cv2.INTER_CUBIC)
    r = ocr_band(up)
    txt = ' '.join(t for t, c, b in sorted(r, key=lambda x: (x[2][1] // 30, x[2][0])))
    boxes = [b for t, c, b in r]
    cap_rows.append((i, txt, boxes))
captions = []
for i, txt, boxes in cap_rows:
    if captions and captions[-1]['text'] == txt:
        captions[-1]['end'] = round((i + step) / fps, 3)
        continue
    if txt:
        y = np.mean([(b[1] + b[3]) / 2 for b in boxes]) / (H * 2)
        hgt = np.mean([(b[3] - b[1]) for b in boxes]) / (H * 2)
        captions.append(dict(start=round(i / fps, 3), end=round((i + step) / fps, 3), text=txt, y_frac=round(float(y), 3), text_h_frac=round(float(hgt), 4)))
    else:
        if captions and 'closed' not in captions[-1]:
            captions[-1]['closed'] = True
json.dump(captions, open(os.path.join(out, 'captions.json'), 'w'), indent=1)
print('captions', len(captions), flush=True)

# ---------- per-shot aggregation ----------
def colour_stats(f):
    b, g, r = [float(c.mean()) for c in cv2.split(f)]
    hs = cv2.cvtColor(f, cv2.COLOR_BGR2HSV)
    lab = cv2.cvtColor(f, cv2.COLOR_BGR2LAB)
    L = lab[:, :, 0].astype(np.float32) * 100 / 255
    h3 = H // 3
    gy = cv2.cvtColor(f, cv2.COLOR_BGR2GRAY)
    cx = gy[H // 3:2 * H // 3, W // 4:3 * W // 4]
    edge = np.concatenate([gy[:, :W // 10].ravel(), gy[:, -W // 10:].ravel()])
    hue = hs[:, :, 0][hs[:, :, 1] > 60]
    hh = np.bincount((hue // 15).astype(int), minlength=12)[:12] if hue.size else np.zeros(12)
    names = ['red', 'orange', 'yellow', 'yellow-green', 'green', 'green-cyan', 'cyan', 'sky-blue', 'blue', 'blue-violet', 'violet', 'magenta']
    top = [names[k] for k in np.argsort(hh)[::-1][:3] if hh[k] > 0]
    return dict(luma=round(float(gy.mean()), 1), centre_luma=round(float(cx.mean()), 1), edge_luma=round(float(edge.mean()), 1),
                top_third=round(float(gy[:h3].mean()), 1), mid_third=round(float(gy[h3:2 * h3].mean()), 1), bottom_third=round(float(gy[2 * h3:].mean()), 1),
                contrast_std=round(float(gy.std()), 1), sat=round(float(hs[:, :, 1].mean()), 1),
                warmth_r_minus_b=round(r - b, 1), rgb=[round(r), round(g), round(b)],
                p5=int(np.percentile(gy, 5)), p95=int(np.percentile(gy, 95)), dominant_hues=top)

shots = []
bounds = cuts + [N]
for k in range(len(cuts)):
    a, b = bounds[k], bounds[k + 1]
    ms = [m for m in mot[a + 1:b] if m]
    def agg(key):
        return [m[key] for m in ms]
    if ms:
        dx = float(np.sum(agg('dx'))); dy = float(np.sum(agg('dy')))
        zs = float(np.prod(agg('scale'))); rot = float(np.sum(agg('rot')))
        mag = float(np.mean(agg('mag'))); par = float(np.mean(agg('par'))); inl = float(np.mean(agg('inl')))
        # speed profile: first/second half magnitude to spot ease-in / ease-out
        half = len(ms) // 2 or 1
        m1 = float(np.mean([m['mag'] for m in ms[:half]])); m2 = float(np.mean([m['mag'] for m in ms[half:]])) if len(ms) > 1 else m1
        jitter = float(np.std([m['dx'] for m in ms]) + np.std([m['dy'] for m in ms]))
    else:
        dx = dy = rot = mag = par = inl = m1 = m2 = jitter = 0.0; zs = 1.0
    dur = (b - a) / fps
    labels = []
    if abs(zs - 1) > 0.04:
        labels.append('push-in/zoom-in' if zs > 1 else 'pull-out/zoom-out')
    if abs(dx) > W * 0.08:
        labels.append('content moves right (camera pans/trucks LEFT)' if dx > 0 else 'content moves left (camera pans/trucks RIGHT)')
    if abs(dy) > H * 0.05:
        labels.append('content moves down (camera tilts/cranes UP)' if dy > 0 else 'content moves up (camera tilts/cranes DOWN)')
    if abs(rot) > 2:
        labels.append(f'roll {rot:.1f} deg')
    if par > 0.6 and mag > 0.5:
        labels.append('strong parallax (3D camera move: dolly/orbit/truck)')
    if not labels:
        labels.append('static / locked' if mag < 0.3 else 'subtle drift / character motion only')
    fr = [a, (a + b - 1) // 2, b - 1]
    paths = []
    for tag, fi in zip(('first', 'mid', 'last'), fr):
        p = os.path.join(out, 'frames', f'shot{k + 1:03d}_{tag}_f{fi:05d}.jpg')
        cv2.imwrite(p, frames[fi], [cv2.IMWRITE_JPEG_QUALITY, 92]); paths.append(p)
    caps = [c['text'] for c in captions if c['start'] < b / fps and c['end'] > a / fps]
    shots.append(dict(shot=k + 1, start=round(a / fps, 3), end=round(b / fps, 3), dur=round(dur, 3), start_frame=a, end_frame=b - 1,
                      cut_strength=round(float(cs[a]), 3) if a else None,
                      transition_hint=('fade/dip' if a and min(mean_luma[max(0, a - 3):a + 3]) < 12 else 'hard cut') if a else 'start',
                      camera=dict(total_dx_px=round(dx, 1), total_dy_px=round(dy, 1), total_scale=round(zs, 3), total_roll_deg=round(rot, 2),
                                  mean_flow_px_per_frame=round(mag, 2), first_half_speed=round(m1, 2), second_half_speed=round(m2, 2),
                                  parallax=round(par, 2), rigid_inlier_ratio=round(inl, 2), shake_jitter=round(jitter, 2), labels=labels),
                      light_first=colour_stats(frames[a]), light_mid=colour_stats(frames[fr[1]]), light_last=colour_stats(frames[b - 1]),
                      captions=caps, frames=paths))
    # contact sheet: up to 8 evenly spaced frames of the shot, small
    idx = np.linspace(a, b - 1, num=min(8, max(2, b - a))).astype(int)
    tiles = [cv2.resize(frames[i], (180, 320)) for i in idx]
    for t, i in zip(tiles, idx):
        cv2.putText(t, f'{i / fps:.2f}s', (4, 14), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0, 255, 255), 1)
    while len(tiles) % 4:
        tiles.append(np.zeros_like(tiles[0]))
    rows = [np.hstack(tiles[r:r + 4]) for r in range(0, len(tiles), 4)]
    cv2.imwrite(os.path.join(out, 'sheets', f'shot{k + 1:03d}.jpg'), np.vstack(rows), [cv2.IMWRITE_JPEG_QUALITY, 88])

json.dump(dict(video=os.path.basename(video), fps=fps, frames=N, width=W, height=H, duration=round(N / fps, 3), shot_count=len(shots),
               avg_shot_len=round(N / fps / len(shots), 3), shots=shots), open(os.path.join(out, 'shots.json'), 'w'), indent=1)

# per-frame motion curve for the record
json.dump([dict(f=i, t=round(i / fps, 3), cut=round(cut_score[i], 3), luma=round(float(mean_luma[i]), 1), **({k: round(v, 3) for k, v in mot[i].items()} if mot[i] else {}))
           for i in range(N)], open(os.path.join(out, 'per_frame.json'), 'w'))

# ---------- audio ----------
r = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', video, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True)
summ = r.stderr[r.stderr.rfind('Summary:'):]
sil = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', video, '-af', 'silencedetect=n=-35dB:d=0.25', '-f', 'null', '-'], capture_output=True, text=True)
sils = [l.split('] ')[1] for l in sil.stderr.splitlines() if 'silence_' in l]
json.dump(dict(ebur128_summary=summ, silences=sils), open(os.path.join(out, 'audio.json'), 'w'), indent=1)
print('done', len(shots), 'shots', flush=True)
