#!/usr/bin/env python3
"""Generate every icon asset the site needs from the real app artwork.

Source: brand/app-icon.png, copied from the iOS project's
Assets.xcassets/ShieldHourglass.imageset (1254x1254). That is the same artwork
the Screen Time shield extension loads, so the site and the shield show the
identical mark.

Run: python3 scripts/make-icons.py
Writes: public/assets/*

The artwork ships as a square with pure-black corner cutouts and no alpha.
Everything that sits on the page gets a rounded-rect alpha mask so the corners
are transparent; apple-touch-icon keeps the full square because iOS applies its
own mask and would otherwise round an already-rounded icon twice.
"""
import os

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "brand", "app-icon.png")
OUT = os.path.join(ROOT, "public", "assets")
os.makedirs(OUT, exist_ok=True)

BG = (11, 11, 12)          # Palette.nearBlack
AMBER = (251, 174, 60)     # Palette.amber
INK = (244, 244, 245)      # Palette.ink
MUTED = (138, 138, 142)    # Palette.muted

# Apple's icon corner radius, as a fraction of the side.
RADIUS_RATIO = 0.2237

master = Image.open(SRC).convert("RGBA")


def rounded(size):
    """The icon at `size`, with its corners made transparent."""
    icon = master.resize((size, size), Image.LANCZOS)
    # Supersample the mask so the curve stays smooth at 16px.
    ss = 4
    mask = Image.new("L", (size * ss, size * ss), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, size * ss - 1, size * ss - 1],
        radius=int(size * ss * RADIUS_RATIO),
        fill=255,
    )
    mask = mask.resize((size, size), Image.LANCZOS)
    out = icon.copy()
    out.putalpha(mask)
    return out


def square(size):
    """The icon at `size`, flattened on the app's near-black. No alpha."""
    icon = master.resize((size, size), Image.LANCZOS)
    plate = Image.new("RGB", (size, size), BG)
    plate.paste(icon, (0, 0), icon)
    return plate


def save(img, name, **kw):
    path = os.path.join(OUT, name)
    img.save(path, optimize=True, **kw)
    print(f"  {name:24s} {img.size[0]}x{img.size[1]}  {os.path.getsize(path):>7,} B")


print("icons:")
for size in (16, 32):
    save(rounded(size), f"favicon-{size}.png")

# Multi-resolution .ico for browsers and Windows pinned tiles.
ico_path = os.path.join(OUT, "favicon.ico")
rounded(48).save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print(f"  {'favicon.ico':24s} 16/32/48    {os.path.getsize(ico_path):>7,} B")

# iOS applies its own corner mask, so this one stays square.
save(square(180), "apple-touch-icon.png")

for size in (192, 256, 512):
    save(rounded(size), f"icon-{size}.png")

for size in (64, 128):
    save(rounded(size), f"logo-{size}.png")


# ----------------------------------------------------------------- OG card
def font(size, weight="Bold"):
    """SF Pro Rounded where available, Arial Rounded as the fallback."""
    rounded_candidates = [
        "/System/Library/Fonts/SFNSRounded.ttf",
        "/System/Library/Fonts/SFCompactRounded.ttf",
        "/System/Library/Fonts/Supplemental/Arial Rounded Bold.ttf",
    ]
    for path in rounded_candidates:
        if not os.path.exists(path):
            continue
        try:
            f = ImageFont.truetype(path, size)
        except OSError:
            continue
        try:
            f.set_variation_by_name(weight)
        except Exception:
            pass  # static font, or no such named instance
        return f
    return ImageFont.load_default()


W, H = 1200, 630
card = Image.new("RGB", (W, H), BG)

# Soft amber bloom behind the icon. Blurred at low resolution, then scaled,
# so the falloff has no visible edge.
glow = Image.new("RGB", (W // 6, H // 6), BG)
ImageDraw.Draw(glow).ellipse([18, 36, 86, 104], fill=(84, 58, 22))
glow = glow.filter(ImageFilter.GaussianBlur(14))
card = Image.blend(card, glow.resize((W, H), Image.LANCZOS), 0.85)

d = ImageDraw.Draw(card)

ICON = 260
icon = rounded(ICON)
icon_x, icon_y = 96, (H - ICON) // 2
card.paste(icon, (icon_x, icon_y), icon)

text_x = icon_x + ICON + 64
d.text((text_x, 236), "Deadline", font=font(104, "Heavy"), fill=INK)
d.text((text_x, 364), "Screen time that fights back", font=font(40, "Semibold"), fill=AMBER)
d.text((text_x, 436), "hitdeadline.com", font=font(28, "Semibold"), fill=MUTED)

og = os.path.join(ROOT, "public", "og-image.png")
card.save(og, optimize=True)
print(f"\n  {'og-image.png':24s} {W}x{H}  {os.path.getsize(og):>7,} B")
