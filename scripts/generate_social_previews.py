"""Render original work-sharing diagrams from source using Pillow and licensed Manrope.

Run manually with Python 3 and Pillow. These committed assets need no build-time
image library. Every image is an explanation, not a photograph or live telemetry.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
FOREST, IVORY, SAGE, COPPER = '#153e35', '#f6f2e9', '#d9e3da', '#a4543b'
FONT = ROOT / 'public/fonts/manrope-latin-variable.woff2'


def font(size):
    result = ImageFont.truetype(str(FONT), size)
    result.set_variation_by_axes([500])
    return result


def render(slug, title, kind, labels, caption):
    image = Image.new('RGB', (1200, 630), IVORY)
    draw = ImageDraw.Draw(image)
    draw.text((64, 40), 'Fidret.', font=font(36), fill=FOREST)
    draw.text((64, 108), kind, font=font(24), fill=FOREST)
    y = 156
    for line in title:
        draw.text((64, y), line, font=font(48), fill=FOREST)
        y += 62
    top = 345
    if slug == 'signal-freshness':
        for label, line_y in [('Observation', top + 18), ('Arrival', top + 95)]:
            draw.text((64, line_y - 20), label, font=font(24), fill=FOREST)
            draw.line((280, line_y, 1090, line_y), fill=FOREST, width=2)
        for source_x, arrival_x in [(310, 360), (510, 560), (710, 1050), (910, 960)]:
            color = COPPER if source_x == 710 else FOREST
            draw.line((source_x, top + 18, arrival_x, top + 95), fill=color, width=4)
            for x, y in [(source_x, top + 18), (arrival_x, top + 95)]:
                draw.ellipse((x-7, y-7, x+7, y+7), fill=color)
    else:
        gap = 24
        width = (1072 - gap * (len(labels) - 1)) // len(labels)
        for i, label in enumerate(labels):
            x = 64 + i * (width + gap)
            draw.rectangle((x, top, x + width, top + 120), fill=SAGE)
            for j, line in enumerate(label.split('|')):
                draw.text((x + 20, top + 28 + 35 * j), line, font=font(25), fill=FOREST)
    draw.text((64, 515), caption, font=font(24), fill=FOREST)
    draw.text((64, 575), 'Original explanatory diagram  |  Scope and evidence at fidret.com', font=font(18), fill=FOREST)
    target = ROOT / 'public/social' / f'{slug}.png'
    image.save(target, optimize=True)
    print(target.relative_to(ROOT), image.size)


if __name__ == '__main__':
    render('signal-freshness', ['What happens when a machine', 'trusts old information?'], 'Software experiment', [], 'Arrival does not establish freshness. Synthetic software evidence.')
    render('autonomous-farm', ['What if two farm jobs', 'need the same water?'], 'Architecture and interactive model', ['Watering|proposed', 'Reservation|checked', 'Local checks|still needed'], 'A dry field does not mean water is reserved. A fictional teaching model.')
    render('publishing-system', ['How do you keep a growing', 'website consistent?'], 'Implemented website and workflow', ['Authored|work', 'Publication|checks', 'Public|pages'], 'A working implementation, built for Fidret’s own publication.')
    render('ai-software-factory', ['The tests passed.', 'Is this version ready?'], 'Architecture and interactive model', ['Proposed|version 13', 'Tests cover|version 12', 'Hold this|version'], 'The tests must cover this version. A teaching model.')
    render('agentic-company-harness', ['Which parts of a task', 'should an AI agent handle?'], 'Research and practical brief', ['Read the|ticket', 'Draft for|review', 'Do not send|the reply'], 'A planning structure, not a deployed enterprise control system.')
