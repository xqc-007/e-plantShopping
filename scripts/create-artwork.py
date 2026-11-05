"""Generate the project's original, self-contained botanical SVG illustrations."""
from pathlib import Path
import math
OUT=Path(__file__).resolve().parents[1]/'public'/'images'
OUT.mkdir(parents=True,exist_ok=True)
colours=['#45684a','#6c864e','#2a543f','#7e9565','#3f7053']
def leaf(x,y,scale=1,angle=0,colour='#45684a',shape='oval'):
    if shape=='heart': d='M0 0 C-60 -30 -55 -86 -21 -80 C-6 -79 0 -68 0 -61 C0 -75 18 -85 30 -78 C62 -53 32 -14 0 0Z'
    elif shape=='spear': d='M0 0 Q-38 -60 2 -145 Q38 -60 0 0Z'
    elif shape=='round': d='M0 0 C-58 -14 -56 -73 -10 -82 C35 -80 47 -26 0 0Z'
    else: d='M0 0 C-52 -20 -42 -85 0 -103 C42 -85 52 -20 0 0Z'
    return f'<g transform="translate({x} {y}) rotate({angle}) scale({scale})"><path d="{d}" fill="{colour}"/><path d="M0 -3 L0 -73" fill="none" stroke="#d0dcb2" stroke-opacity=".3" stroke-width="1.5"/></g>'
def stem(d): return f'<path d="{d}" fill="none" stroke="#66794f" stroke-width="4" stroke-linecap="round"/>'
def foliage(kind):
    s=''
    if kind in ['snake','aloe','zebra']:
        for i,(angle,h) in enumerate([(-46,.76),(-25,1.02),(0,1.24),(25,.91),(44,.68)]):
            s+=leaf(200+(i-2)*8,300,h,angle,colours[i%5],'spear')
            if kind in ['snake','zebra']:
                s+=f'<path d="M0 -32L8 -39 M-10 -50L12 -55 M-12 -70L12 -76 M-8 -92L10 -97" transform="translate({200+(i-2)*8} 300) rotate({angle}) scale({h})" stroke="{ "#c2d19c" if kind=="snake" else "#e1e8cc" }" stroke-width="4" fill="none"/>'
    elif kind=='barrel':
        s+='<ellipse cx="200" cy="231" rx="68" ry="76" fill="#6c8750"/>'
        for dx in [-43,-23,0,23,43]: s+=f'<path d="M200 157 Q{200+dx*2} 228 {200+dx*.7} 301" fill="none" stroke="#bdc787" stroke-width="3"/>'
        for j in range(6):
            for i in range(5):
                x=158+i*21;y=180+j*19
                if ((x-200)/64)**2+((y-231)/74)**2<1: s+=f'<path d="M{x-4} {y-4}l8 8 m-8 0l8 -8" stroke="#e8d195" stroke-width="1.7"/>'
    elif kind=='echeveria':
        for layer in [1,.72,.46]:
            for i in range(9): s+=leaf(200,267,layer,i*40+layer*20,'#8baca0' if layer==1 else '#6f998d','round')
    elif kind=='spider':
        for i in range(11):
            x=70+i*26;top=120+abs(i-5)*17
            s+=f'<path d="M200 300 Q{x} {top-75} {x} {top+90} Q{x+19} {top-40} 200 300Z" fill="{colours[i%5]}"/><path d="M200 300 Q{x+8} {top-50} {x+4} {top+70}" stroke="#dce3bd" stroke-width="3" fill="none"/>'
    elif kind in ['lavender','rosemary','thyme']:
        for i in range(7):
            x=118+i*26; y=115+abs(i-3)*15
            s+=stem(f'M200 310 Q{x} 230 {x} {y}')
            for j in range(5):
                for side in [-1,1]: s+=leaf(x+side*j*2,y+44+j*23,.20 if kind!='rosemary' else .12,side*65,colours[(i+j)%5])
            if kind=='lavender':
                for j in range(5): s+=f'<ellipse cx="{x+(-1)**j*4}" cy="{y+j*8}" rx="7" ry="9" fill="{["#8b75a1","#ab91b9"][j%2]}"/>'
    elif kind=='christmas':
        for i in range(7):
            x=105+i*31;y=170+abs(i-3)*18
            s+=stem(f'M200 310 Q{x} 190 {x} {y+40}')
            for j in range(4): s+=f'<ellipse cx="{x+(200-x)*j/7}" cy="{y+28+j*25}" rx="13" ry="22" transform="rotate({(3-i)*10} {x} {y+28+j*25})" fill="{colours[j%5]}"/>'
            s+=f'<path d="M{x} {y+12}q-25 -25 -13 -36q15 0 18 18q15 -19 23 -6q0 18 -28 24" fill="#d48791"/>'
    else:
        count=6 if kind in ['monstera','rubber','jade','basil','mint','jasmine'] else 9
        s+=stem('M200 311 Q189 220 205 102')
        for i in range(count):
            side=-1 if i%2 else 1;y=285-i*21;x=200+side*(58-abs(i-count/2)*3)
            s+=stem(f'M198 {y+22}Q{x} {y+10} {x} {y}')
            size=.8 if kind=='monstera' else .59 if kind=='rubber' else .40 if kind=='jade' else .47 if kind in ['basil','mint'] else .42
            shape='heart' if kind in ['monstera','pothos'] else 'round' if kind=='jade' else 'oval'
            s+=leaf(x,y,size,side*35,colours[i%5],shape)
            if kind=='monstera':
                # Vein-like negative spaces give the split-leaf illustration its character.
                s+=f'<path d="M{x-14} {y-27}l-10 -13 M{x+10} {y-24}l12 -13" stroke="#e9ecdf" stroke-width="4" fill="none"/>'
            if kind=='jasmine' and i%2==0:
                for a in range(5):
                    xx=x+math.cos(a*math.tau/5)*9; yy=y-35+math.sin(a*math.tau/5)*9
                    s+=f'<ellipse cx="{xx}" cy="{yy}" rx="7" ry="5" fill="#fffdf0"/>'
                s+=f'<circle cx="{x}" cy="{y-35}" r="3" fill="#d5c388"/>'
        if kind=='pothos':
            s+=stem('M175 273 Q95 275 112 367')
            for j in range(4):s+=leaf(113,300+j*18,.35,(-1)**j*55,colours[j%5],'heart')
    return s
names=['monstera','snake','pothos','zz','rubber','spider','lavender','rosemary','mint','basil','jasmine','thyme','aloe','jade','echeveria','zebra','barrel','christmas']
for idx,name in enumerate(names):
    bg=['#eeeee3','#e9ecdf','#ece7de'][idx//6]
    pot=['#b78465','#b5b298','#d1c4a9','#9caa93'][idx%4]
    art=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img" aria-label="Botanical illustration of {name}"><defs><linearGradient id="pot" x2="1" y2=".4"><stop stop-color="{pot}"/><stop offset="1" stop-color="{pot}" stop-opacity=".75"/></linearGradient></defs><rect width="400" height="400" fill="{bg}"/><ellipse cx="200" cy="373" rx="90" ry="12" fill="#394d32" opacity=".09"/>{foliage(name)}<ellipse cx="200" cy="296" rx="61" ry="13" fill="#536342"/><path d="M140 295H260L246 364Q200 381 154 364Z" fill="url(#pot)"/><ellipse cx="200" cy="296" rx="61" ry="11" fill="{pot}"/><ellipse cx="200" cy="295" rx="48" ry="7" fill="#686045"/><path d="M154 309l10 46" stroke="#fff" stroke-opacity=".14" stroke-width="9" stroke-linecap="round"/></svg>'''
    (OUT/f'{name}.svg').write_text(art)
# A larger editorial arrangement using the original plant drawings.
hero=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><radialGradient id="light"><stop stop-color="#f2f0dd"/><stop offset="1" stop-color="#d8dfc6"/></radialGradient></defs><rect width="600" height="600" fill="url(#light)"/><path d="M0 480 Q300 420 600 475V600H0Z" fill="#cdd5bb"/><circle cx="455" cy="128" r="80" fill="#f7f2dc" opacity=".45"/><ellipse cx="298" cy="532" rx="155" ry="20" fill="#28402f" opacity=".12"/><g transform="translate(-15 -30) scale(1.5)">{foliage('monstera')}<ellipse cx="200" cy="305" rx="68" ry="16" fill="#b5a48a"/><path d="M133 305h134l-15 74q-53 24-104 0Z" fill="#c0ac90"/><path d="M148 322l9 43" stroke="#e9dcc2" stroke-width="10" opacity=".45"/><ellipse cx="200" cy="305" rx="56" ry="9" fill="#686c49"/></g><g transform="translate(340 315) scale(.53)">{foliage('aloe')}<path d="M135 297h130l-15 80q-50 14-100 0Z" fill="#a37a60"/></g></svg>'''
(OUT/'hero.svg').write_text(hero)
(Path(__file__).resolve().parents[1]/'src'/'assets'/'landing-background.svg').write_text(hero)
print('Created 18 plant illustrations and landing artwork.')
