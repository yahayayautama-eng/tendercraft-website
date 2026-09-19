import zlib, struct

def analyze():
    filename = r'C:\Users\Yayis\Documents\Codex\2026-09-18\d\assets\brand\tendercraft-logo-concept-v2.png'
    with open(filename, 'rb') as f:
        f.read(8)
        idat = bytearray()
        while True:
            header = f.read(8)
            if not header: break
            length, ctype = struct.unpack('>I4s', header)
            data = f.read(length)
            f.read(4)
            if ctype == b'IHDR':
                width, height = struct.unpack('>II', data[:8])
            elif ctype == b'IDAT':
                idat.extend(data)
            elif ctype == b'IEND':
                break

    print(f"Dimensions: {width} x {height}")
    decomp = zlib.decompress(idat)
    stride = 1 + width * 4

    def paeth(a, b, c):
        p = a + b - c
        pa = abs(p - a)
        pb = abs(p - b)
        pc = abs(p - c)
        if pa <= pb and pa <= pc: return a
        elif pb <= pc: return b
        else: return c

    prev_row = [0] * (width * 4)
    grid = [] # 2D array of (r, g, b, a) sampled

    y_min, y_max = height, 0
    x_min, x_max = width, 0

    # Let's reconstruct all scanlines
    pixels = {} # (x, y) -> (r, g, b, a)
    for y in range(height):
        filter_type = decomp[y * stride]
        curr_row = [0] * (width * 4)
        raw_row = decomp[y * stride + 1 : (y + 1) * stride]
        for x_byte in range(width * 4):
            filt = filter_type
            x_val = raw_row[x_byte]
            a = curr_row[x_byte - 4] if x_byte >= 4 else 0
            b = prev_row[x_byte]
            c = prev_row[x_byte - 4] if x_byte >= 4 else 0
            if filt == 0: val = x_val
            elif filt == 1: val = (x_val + a) & 0xff
            elif filt == 2: val = (x_val + b) & 0xff
            elif filt == 3: val = (x_val + ((a + b) >> 1)) & 0xff
            elif filt == 4: val = (x_val + paeth(a, b, c)) & 0xff
            curr_row[x_byte] = val
        prev_row = curr_row

        if y % 5 == 0:
            for x in range(0, width, 5):
                r = curr_row[x * 4]
                g = curr_row[x * 4 + 1]
                b = curr_row[x * 4 + 2]
                alpha = curr_row[x * 4 + 3]
                if alpha > 100 and (r < 240 or g < 240 or b < 240):
                    pixels[(x, y)] = (r, g, b)

    print(f"Total non-background points sampled: {len(pixels)}")
    icon_pts = [(x, y, c) for (x, y), c in pixels.items() if x < 650]
    wordmark_pts = [(x, y, c) for (x, y), c in pixels.items() if x >= 650]

    if icon_pts:
        ix_min = min(p[0] for p in icon_pts)
        ix_max = max(p[0] for p in icon_pts)
        iy_min = min(p[1] for p in icon_pts)
        iy_max = max(p[1] for p in icon_pts)
        print(f"Icon Box: X=[{ix_min}, {ix_max}] (w={ix_max-ix_min}), Y=[{iy_min}, {iy_max}] (h={iy_max-iy_min})")

    if wordmark_pts:
        wx_min = min(p[0] for p in wordmark_pts)
        wx_max = max(p[0] for p in wordmark_pts)
        wy_min = min(p[1] for p in wordmark_pts)
        wy_max = max(p[1] for p in wordmark_pts)
        print(f"Wordmark Box: X=[{wx_min}, {wx_max}] (w={wx_max-wx_min}), Y=[{wy_min}, {wy_max}] (h={wy_max-wy_min})")

    # Find dominant blues and darks in icon
    blues = [c for x, y, c in icon_pts if c[2] > 180 and c[0] < 80]
    darks = [c for x, y, c in icon_pts if c[0] < 50 and c[1] < 50 and c[2] < 50]
    if blues:
        avg_b = (sum(c[0] for c in blues)//len(blues), sum(c[1] for c in blues)//len(blues), sum(c[2] for c in blues)//len(blues))
        print(f"Dominant blue: #{avg_b[0]:02x}{avg_b[1]:02x}{avg_b[2]:02x} (RGB: {avg_b})")
    if darks:
        avg_d = (sum(c[0] for c in darks)//len(darks), sum(c[1] for c in darks)//len(darks), sum(c[2] for c in darks)//len(darks))
        print(f"Dominant dark: #{avg_d[0]:02x}{avg_d[1]:02x}{avg_d[2]:02x} (RGB: {avg_d})")

if __name__ == '__main__':
    analyze()
