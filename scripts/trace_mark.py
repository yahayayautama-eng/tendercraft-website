import zlib, struct

def trace():
    filename = r'C:\Users\Yayis\Documents\Codex\2026-09-18\d\assets\brand\tendercraft-logo-concept-v2.png'
    with open(filename, 'rb') as f:
        f.read(8)
        idat = bytearray()
        while True:
            header = f.read(8)
            if not header: break
            length, ctype = struct.unpack('>I4s', header)
            data = f.read(length); f.read(4)
            if ctype == b'IHDR': width, height = struct.unpack('>II', data[:8])
            elif ctype == b'IDAT': idat.extend(data)
            elif ctype == b'IEND': break

    decomp = zlib.decompress(idat)
    stride = 1 + width * 4

    def paeth(a, b, c):
        p = a + b - c
        pa = abs(p - a); pb = abs(p - b); pc = abs(p - c)
        if pa <= pb and pa <= pc: return a
        elif pb <= pc: return b
        else: return c

    prev_row = [0] * (width * 4)
    blue_pts = []
    dark_pts = []

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

        # We only care about the icon (x < 650)
        for x in range(0, 650, 4):
            r = curr_row[x * 4]
            g = curr_row[x * 4 + 1]
            b = curr_row[x * 4 + 2]
            a = curr_row[x * 4 + 3]
            if a > 128:
                if b > 180 and r < 80:
                    blue_pts.append((x, y))
                elif r < 40 and g < 40 and b < 40:
                    dark_pts.append((x, y))

    print(f"Blue pts: {len(blue_pts)}, Dark pts: {len(dark_pts)}")

    # Top blue ribbon bounds
    top_blue = [p for p in blue_pts if p[1] < 350]
    bottom_blue = [p for p in blue_pts if p[1] >= 350]

    print(f"Top blue bounds: X=[{min(p[0] for p in top_blue)}, {max(p[0] for p in top_blue)}], Y=[{min(p[1] for p in top_blue)}, {max(p[1] for p in top_blue)}]")
    if bottom_blue:
        print(f"Bottom blue bounds: X=[{min(p[0] for p in bottom_blue)}, {max(p[0] for p in bottom_blue)}], Y=[{min(p[1] for p in bottom_blue)}, {max(p[1] for p in bottom_blue)}]")

    print(f"Dark bounds: X=[{min(p[0] for p in dark_pts)}, {max(p[0] for p in dark_pts)}], Y=[{min(p[1] for p in dark_pts)}, {max(p[1] for p in dark_pts)}]")

    # Check the slant at top-left of top_blue:
    # At different Y values, what is the min X?
    for y_val in range(190, 280, 10):
        xs = [p[0] for p in top_blue if abs(p[1] - y_val) <= 2]
        if xs:
            print(f"Top blue left edge at Y={y_val}: min X = {min(xs)}, max X = {max(xs)}")

    # Check the fold at top-right:
    # Where does dark start at top-right?
    top_dark = [p for p in dark_pts if p[1] < 350]
    if top_dark:
        print(f"Top dark fold bounds: X=[{min(p[0] for p in top_dark)}, {max(p[0] for p in top_dark)}], Y=[{min(p[1] for p in top_dark)}, {max(p[1] for p in top_dark)}]")

trace()
