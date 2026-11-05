"""Synthesizes the 10-second sound bed for the opening shot (no samples needed).

Cues match anim.html: soft room tone, sleepy hum, slot pop-ins at 3.0s,
blink ticks, a sparkle when the phone vanishes, and a pop when it lands in slot 1.
Usage: python3 sfx.py out.wav
"""
import math, random, struct, sys, wave

SR = 44100
DUR = 10.0
N = int(SR * DUR)
buf = [0.0] * N
random.seed(7)


def add(start, length, fn, gain=1.0):
    s0 = int(start * SR)
    for i in range(int(length * SR)):
        j = s0 + i
        if 0 <= j < N:
            buf[j] += gain * fn(i / SR)


def env(t, attack, decay):
    return (t / attack if t < attack else math.exp(-(t - attack) / decay))


# room tone: quiet warm pad (A minor add9) with slow swell
def pad(t):
    a = min(1.0, t / 1.5) * min(1.0, (DUR - t) / 0.8)
    v = sum(math.sin(2 * math.pi * f * t + p) for f, p in [(110, 0), (164.8, 1), (220, 2), (246.9, 3), (329.6, 4)])
    return a * v / 5 * (0.75 + 0.25 * math.sin(2 * math.pi * 0.2 * t))
add(0, DUR, pad, 0.07)


# sleepy hum while lying in bed
def snore(t):
    return env(t, 0.25, 0.3) * math.sin(2 * math.pi * (95 + 10 * math.sin(2 * math.pi * 3 * t)) * t) * (0.6 + 0.4 * random.random())
add(0.15, 0.8, snore, 0.12)


# hotbar slots popping in, rising pitch
def pop(freq, decay=0.06):
    def f(t):
        return env(t, 0.003, decay) * math.sin(2 * math.pi * (freq * (1 + 0.6 * math.exp(-t * 40))) * t)
    return f
for i in range(9):
    add(3.0 + i * 0.05, 0.2, pop(620 + i * 55), 0.32)

# startle "boing" on the reaction
add(3.15, 0.5, lambda t: env(t, 0.01, 0.15) * math.sin(2 * math.pi * (300 + 260 * math.sin(2 * math.pi * 7 * t) * math.exp(-t * 5)) * t), 0.18)

# blink ticks
for b in (5.0, 5.42):
    add(b + 0.06, 0.05, pop(2400, 0.008), 0.18)


# sparkle shimmer as the phone vanishes
def sparkle(t):
    return env(t, 0.01, 0.18) * sum(math.sin(2 * math.pi * f * t) for f in (1568, 2093, 2637, 3136)) / 4
for k in range(5):
    add(7.75 + k * 0.05, 0.4, sparkle, 0.22)

# whoosh as the icon flies (filtered noise approximation)
state = [0.0]
def whoosh(t):
    state[0] = 0.85 * state[0] + 0.15 * (random.random() * 2 - 1)
    return math.sin(math.pi * min(1, t / 0.45)) * state[0]
add(8.0, 0.45, whoosh, 0.5)

# landing pop in slot 1
add(8.45, 0.25, pop(420, 0.09), 0.45)
add(8.45, 0.25, pop(840, 0.05), 0.2)

peak = max(abs(x) for x in buf) or 1.0
scale = 0.85 / peak
with wave.open(sys.argv[1] if len(sys.argv) > 1 else 'sfx.wav', 'w') as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(b''.join(struct.pack('<h', int(max(-1, min(1, x * scale)) * 32767)) for x in buf))
print('wrote', N / SR, 'seconds')
