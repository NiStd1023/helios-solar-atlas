import numpy as np
from PIL import Image
from pathlib import Path
rng=np.random.default_rng(71)
target=Path('dist/media')
def render(name,colors,mode,size=420):
    if name=='saturn': w,h,R=1120,870,238
    else: w=h=size; R=w*.469
    y,x=np.mgrid[:h,:w].astype('float32')
    x=(x-(w-1)/2)/R; y=-(y-(h-1)/2)/R
    z=np.sqrt(np.maximum(0,1-x*x-y*y))
    latitude=np.arcsin(np.clip(y*.93+z*.27,-1,1))
    lon=np.arctan2(x,z)
    grain=rng.normal(0,1,(h,w))
    cloud=(np.sin(lon*19+np.sin(latitude*14)*3)*np.cos(latitude*31+lon*4)+np.sin(lon*42+latitude*36)*np.cos(latitude*51-lon*9)*.42)
    if mode=='bands':
        q=.49+.17*np.sin(latitude*24+.45*np.sin(lon*8))+.13*np.cos(latitude*47+.25*np.sin(lon*18))+.07*np.sin(latitude*102)+cloud*.027
        if name=='jupiter':
            oval=((lon-.41)/.23)**2+((latitude+.30)/.09)**2
            q-=.45*np.exp(-oval*1.4)
        q+=.025*grain
    elif mode=='ice':
        q=.50+latitude*.11+.08*np.sin(latitude*17)+cloud*.035+grain*.012
    else:
        q=.51+cloud*.15+.12*np.sin(lon*8+np.cos(latitude*7)*3)*np.sin(latitude*13-lon*4)+.05*grain
        if name=='earth':
            land=np.sin(lon*6+latitude*4)+np.sin(latitude*9+np.sin(lon*5)*2)+np.sin(lon*13-latitude*15)*.5
            q=np.where(land>.70,.49+cloud*.11,.19+cloud*.056)
            vapor=np.sin(lon*24+latitude*33+np.sin(lon*12+latitude*11)*2)+np.cos(lon*15-latitude*47)
            q=np.where(vapor>1.0,.76+vapor*.09,q)
        if name=='sun':
            q=.57+cloud*.15+.13*np.sin(lon*103+latitude*115)*np.sin(latitude*132-lon*94)+grain*.075
        if name in ('mercury','mars'):
            for cx,cy,cr in rng.uniform([-1,-1,.012],[1,1,.13],(68,3)):
                d=np.hypot(x-cx,y-cy)/cr
                q+=.10*np.exp(-((d-.85)/.16)**2)-.13*np.exp(-(d/.66)**2)
    palette=np.array(colors)
    rgb=np.stack([np.interp(q,[0,.49,1],palette[:,i]) for i in range(3)],axis=-1)
    sun=np.maximum(0,-x*.57+y*.58+z*.58)
    light=np.ones_like(sun)*.90 if name=='sun' else .13+.90*sun**.65
    rgb*=light[:,:,None]
    rgb+=np.maximum(0,z-.6)[:,:,None]*1.3
    alpha=np.clip((1-np.hypot(x,y))*R+.5,0,1)
    if name=='saturn':
        a=np.deg2rad(15)
        u=x*np.cos(a)+y*np.sin(a)
        v=(-x*np.sin(a)+y*np.cos(a))/.36
        rad=np.hypot(u,v)
        rip=(np.sin(rad*181)+np.sin(rad*397)*.55+np.cos(rad*93)*.55+grain*.36)
        band=.70+.21*np.sin(rad*25)+.11*rip
        ringalpha=np.clip((rad-1.17)*R,0,1)*np.clip((2.18-rad)*R,0,1)*np.clip(band+.11,0,1)
        ringalpha*=1-.83*np.exp(-((rad-1.925)/.032)**6)
        ringalpha*=1-.42*np.exp(-((rad-1.34)/.065)**2)
        lum=np.clip(.76-u*.21,.17,1.16)
        shadow=(u>.42)&((v+u*.23)<.65)&((v+u*.23)>-.50)
        lum=np.where(shadow,lum*.53,lum)
        ringrgb=(np.array([198,172,132])[None,None,:]+(band-.6)[:,:,None]*57)*lum[:,:,None]
        front=v<0
        under=ringalpha*(1-alpha)
        over=ringalpha*front
        outalpha=np.where(front,alpha*(1-over)+over,alpha+under)
        premult=np.where(front[:,:,None],rgb*alpha[:,:,None]*(1-over[:,:,None])+ringrgb*over[:,:,None],rgb*alpha[:,:,None]+ringrgb*under[:,:,None])
        rgb=premult/np.maximum(outalpha[:,:,None],1e-5)
        alpha=outalpha
    raw=np.dstack((np.clip(rgb,0,255),alpha*255)).astype('uint8')
    img=Image.fromarray(raw,'RGBA')
    img.save(target/f'{name}.webp',quality=89,method=6)
    if name=='saturn':
        img.thumbnail((360,360))
        img.save(target/'saturn-small.webp',quality=85,method=6)
for n,c,m in [
 ('sun',[[116,36,6],[241,99,24],[255,221,126]],'solid'),
 ('mercury',[[61,53,50],[139,124,113],[217,198,171]],'solid'),
 ('venus',[[124,69,29],[215,163,87],[255,226,166]],'ice'),
 ('earth',[[10,31,85],[43,116,119],[227,247,252]],'solid'),
 ('mars',[[93,40,25],[188,84,54],[244,171,118]],'solid'),
 ('jupiter',[[120,60,41],[205,156,119],[255,238,195]],'bands'),
 ('saturn',[[128,91,61],[213,174,120],[255,224,158]],'bands'),
 ('uranus',[[45,101,115],[124,208,213],[221,254,250]],'ice'),
 ('neptune',[[35,48,114],[62,102,199],[157,202,253]],'ice'),
]: render(n,c,m)
