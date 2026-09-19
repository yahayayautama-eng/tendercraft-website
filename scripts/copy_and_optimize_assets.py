import os
import shutil

def copy_assets():
    base_dest = os.path.join('public', 'projects')
    os.makedirs(base_dest, exist_ok=True)

    # 1. Beadle
    beadle_dest = os.path.join(base_dest, 'beadle')
    os.makedirs(beadle_dest, exist_ok=True)
    
    beadle_mark_src = r'C:\Users\Yayis\Documents\Codex\2026-09-17\as\work\beadle\brand\beadle-mark.svg'
    if os.path.exists(beadle_mark_src):
        shutil.copy2(beadle_mark_src, os.path.join(beadle_dest, 'beadle-mark.svg'))
    
    if os.path.exists('raw-captures/beadle-alert-active.png'):
        shutil.copy2('raw-captures/beadle-alert-active.png', os.path.join(beadle_dest, 'beadle-hero.png'))
        shutil.copy2('raw-captures/beadle-alert-active.png', os.path.join(beadle_dest, 'beadle-alert-active.png'))
    if os.path.exists('raw-captures/beadle-demo-full.png'):
        shutil.copy2('raw-captures/beadle-demo-full.png', os.path.join(beadle_dest, 'beadle-delivery-report.png'))
    print("Beadle assets copied.")

    # 2. CompoundOS
    compound_dest = os.path.join(base_dest, 'compoundos')
    os.makedirs(compound_dest, exist_ok=True)
    compound_src = r'C:\Users\Yayis\Desktop\Design\compoundos  Alternate\shots'
    
    compound_files = [
        ('01-dashboard.png', 'compoundos-hero.png'),
        ('01-dashboard.png', 'dashboard.png'),
        ('02-tenants.png', 'tenants.png'),
        ('03-tenant-profile.png', 'tenant-profile.png'),
        ('05-payments.png', 'payments.png'),
        ('06-gatepasses.png', 'gatepasses.png'),
        ('07-complaints.png', 'complaints.png'),
        ('10-tenant-portal.png', 'tenant-portal.png'),
        ('11-tenant-portal-mobile.png', 'tenant-portal-mobile.png')
    ]
    for s_name, d_name in compound_files:
        src_path = os.path.join(compound_src, s_name)
        if os.path.exists(src_path):
            shutil.copy2(src_path, os.path.join(compound_dest, d_name))
    print("CompoundOS assets copied.")

    # 3. Automated Risk Register
    arr_dest = os.path.join(base_dest, 'automated-risk-register')
    os.makedirs(arr_dest, exist_ok=True)
    if os.path.exists('raw-captures/arr-landing.png'):
        shutil.copy2('raw-captures/arr-landing.png', os.path.join(arr_dest, 'arr-hero.png'))
    if os.path.exists('raw-captures/arr-full.png'):
        shutil.copy2('raw-captures/arr-full.png', os.path.join(arr_dest, 'arr-full.png'))
    print("Automated Risk Register assets copied.")

    # 4. FreightHUD
    freight_dest = os.path.join(base_dest, 'freighthud')
    os.makedirs(freight_dest, exist_ok=True)
    freight_src = r'C:\Users\Yayis\Desktop\Antigravity projects\Freight'
    f_banner = os.path.join(freight_src, r'assets\campaign\freighthud_hero_banner.jpg')
    if os.path.exists(f_banner):
        shutil.copy2(f_banner, os.path.join(freight_dest, 'freighthud-hero.jpg'))
    
    f_store = os.path.join(freight_src, r'store\assets')
    for sf, df in [
        ('screenshot_1_1280x800.png', 'screenshot-1.png'),
        ('screenshot_2_1280x800.png', 'screenshot-2.png'),
        ('marquee_promo_1400x560.png', 'marquee-promo.png'),
        ('icon128.png', 'freighthud-icon.png')
    ]:
        sp = os.path.join(f_store, sf)
        if os.path.exists(sp):
            shutil.copy2(sp, os.path.join(freight_dest, df))
    print("FreightHUD assets copied.")

    # 5. CartItemizer
    cart_dest = os.path.join(base_dest, 'cartitemizer')
    os.makedirs(cart_dest, exist_ok=True)
    cart_src = r'C:\Users\Yayis\Desktop\Antigravity projects\Amazon'
    c_cover = os.path.join(cart_src, r'assets\cartitemizer_cover.jpg')
    if os.path.exists(c_cover):
        shutil.copy2(c_cover, os.path.join(cart_dest, 'cartitemizer-hero.jpg'))
    
    c_store = os.path.join(cart_src, r'assets\store')
    for sf, df in [
        ('screenshot-1-amazon-split.jpg', 'screenshot-1.jpg'),
        ('screenshot-2-homedepot.jpg', 'screenshot-2.jpg'),
        ('screenshot-3-formats.jpg', 'screenshot-3.jpg'),
        ('promo-marquee-1400x560.jpg', 'marquee-promo.jpg')
    ]:
        sp = os.path.join(c_store, sf)
        if os.path.exists(sp):
            shutil.copy2(sp, os.path.join(cart_dest, df))
    print("CartItemizer assets copied.")

if __name__ == '__main__':
    copy_assets()
