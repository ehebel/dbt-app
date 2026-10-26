import zlib, struct, os, math

def create_png_rgba(width, height, rgba_func, filename):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0) # filter type 0
        for x in range(width):
            r, g, b, a = rgba_func(x, y, width, height)
            raw_data.extend((r, g, b, a))
    
    def chunk(chunk_type, data):
        c = chunk_type + data
        return struct.pack('>I', len(data)) + c + struct.pack('>I', zlib.crc32(c) & 0xffffffff)

    png = b'\x89PNG\r\n\x1a\n'
    png += chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)) # 6 = RGBA
    png += chunk(b'IDAT', zlib.compress(bytes(raw_data), 9))
    png += chunk(b'IEND', b'')

    with open(filename, 'wb') as f:
        f.write(png)
    print(f'Wrote {filename} ({len(png)} bytes)')

def dbt_icon_generator(is_maskable=False):
    def pixel(x, y, w, h):
        nx = (x / w) * 2 - 1 # -1 to 1
        ny = (y / h) * 2 - 1
        dist = math.sqrt(nx*nx + ny*ny)
        
        # Base colors
        # Sage: (90, 143, 118), Lavender: (142, 124, 195), Cream: (247, 250, 248)
        
        if is_maskable:
            # Full bleed background with squircle / round rect soft gradient
            t = (nx + ny + 2) / 4 # 0 to 1
            bg_r = int(90 * (1 - t) + 110 * t)
            bg_g = int(143 * (1 - t) + 160 * t)
            bg_b = int(118 * (1 - t) + 140 * t)
            
            # Safe zone: center symbol within 0.6 radius
            if dist < 0.52:
                # Outer circle
                if dist > 0.44:
                    return (255, 255, 255, 255)
                # Inner concentric circles / Dialectical wave
                elif dist < 0.12:
                    return (255, 255, 255, 255)
                elif 0.22 < dist < 0.30:
                    return (242, 239, 248, 230)
                else:
                    return (bg_r + 15, bg_g + 15, bg_b + 15, 255)
            return (bg_r, bg_g, bg_b, 255)
        else:
            # Standard app icon with soft squircle / rounded edges
            # Corner radius ~0.22
            abs_x, abs_y = abs(nx), abs(ny)
            edge = 0.88
            rad = 0.28
            inside = False
            if abs_x <= edge - rad and abs_y <= edge:
                inside = True
            elif abs_y <= edge - rad and abs_x <= edge:
                inside = True
            elif abs_x > edge - rad and abs_y > edge - rad:
                cdist = math.sqrt((abs_x - (edge - rad))**2 + (abs_y - (edge - rad))**2)
                if cdist <= rad:
                    inside = True
            
            if not inside:
                return (0, 0, 0, 0) # transparent
            
            # Background gradient
            t = (nx + ny + 2) / 4
            bg_r = int(90 * (1 - t) + 115 * t)
            bg_g = int(143 * (1 - t) + 155 * t)
            bg_b = int(118 * (1 - t) + 165 * t)
            
            # DBT Center Zen symbol / Wise Mind circles
            if dist < 0.55:
                if dist > 0.47:
                    return (255, 255, 255, 240)
                elif dist < 0.14:
                    return (255, 255, 255, 255)
                elif 0.24 < dist < 0.33:
                    return (242, 239, 248, 220)
                else:
                    return (bg_r + 20, bg_g + 20, bg_b + 20, 255)
            
            return (bg_r, bg_g, bg_b, 255)
            
    return pixel

if __name__ == '__main__':
    create_png_rgba(192, 192, dbt_icon_generator(False), 'icons/icon-192.png')
    create_png_rgba(512, 512, dbt_icon_generator(False), 'icons/icon-512.png')
    create_png_rgba(180, 180, dbt_icon_generator(False), 'icons/apple-touch-icon.png')
    create_png_rgba(192, 192, dbt_icon_generator(True), 'icons/icon-maskable-192.png')
    create_png_rgba(512, 512, dbt_icon_generator(True), 'icons/icon-maskable-512.png')
    print('All icons generated successfully.')
