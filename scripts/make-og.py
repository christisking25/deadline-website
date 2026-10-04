#!/usr/bin/env python3
"""Generate the 1200x630 Open Graph card for hitdeadline.com.

Run: python3 scripts/make-og.py
Writes: public/og-image.png
"""
import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1200, 630
BG = (11, 11, 12)
GOLD = (251, 174, 60)
WHITE = (255, 255, 255)
MUTED = (138, 138, 142)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def font(size, bold=True):
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Black.ttf" if bold else None,
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else None,
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    for path in candidates:
        if path and os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                continue
    return ImageFont.load_default()


img = Image.new("RGB", (W, H), BG)

# Soft gold glow, drawn small then blurred up so the falloff stays smooth.
glow = Image.new("RGB", (W // 4, H // 4), BG)
gd = ImageDraw.Draw(glow)
gd.ellipse([-70, -60, 150, 120], fill=(58, 45, 22))
gd.ellipse([200, 90, 340, 200], fill=(30, 24, 12))
glow = glow.filter(ImageFilter.GaussianBlur(30)).resize((W, H), Image.LANCZOS)
img = Image.blend(img, glow, 0.75)

d = ImageDraw.Draw(img)

# Hairline frame
d.rectangle([0, 0, W - 1, H - 1], outline=(30, 28, 24), width=2)


def hourglass(draw, cx, cy, w, h, color):
    """Draw the Deadline hourglass: two plates plus two sand triangles."""
    plate_h = max(6, int(h * 0.055))
    half_w, half_h = w / 2, h / 2
    draw.rounded_rectangle(
        [cx - half_w, cy - half_h, cx + half_w, cy - half_h + plate_h],
        radius=plate_h / 2, fill=color)
    draw.rounded_rectangle(
        [cx - half_w, cy + half_h - plate_h, cx + half_w, cy + half_h],
        radius=plate_h / 2, fill=color)
    inset = w * 0.09
    gap = h * 0.025
    draw.polygon([
        (cx - half_w + inset, cy - half_h + plate_h + gap),
        (cx + half_w - inset, cy - half_h + plate_h + gap),
        (cx, cy - gap),
    ], fill=color)
    draw.polygon([
        (cx, cy + gap),
        (cx + half_w - inset, cy + half_h - plate_h - gap),
        (cx - half_w + inset, cy + half_h - plate_h - gap),
    ], fill=color)


# Mark, top left
hourglass(d, 92, 86, 44, 58, GOLD)
d.text((132, 62), "DEADLINE", font=font(34), fill=WHITE)

# Headline
d.text((72, 212), "Screen time", font=font(96), fill=WHITE)
d.text((72, 316), "that fights back.", font=font(96), fill=GOLD)

# Subline
d.text((76, 452), "Deadline locks your apps until you actually do it.",
       font=font(30, bold=False), fill=MUTED)
d.text((76, 540), "hitdeadline.com", font=font(26), fill=GOLD)

# Large watermark hourglass, right side. Kept faint so the headline stays dominant.
overlay = img.copy()
od = ImageDraw.Draw(overlay)
hourglass(od, 1000, 320, 300, 430, GOLD)
img = Image.blend(img, overlay, 0.085)

out = os.path.join(ROOT, "public", "og-image.png")
img.save(out, "PNG", optimize=True)
print("wrote", out, img.size)
