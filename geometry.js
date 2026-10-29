(function(root){
  const defaults={x:0,z:16,rotation:0,length:24,width:3.5,rise:3,start:0};
  const limits={x:[-50,50],z:[-50,50],rotation:[-180,180],length:[5,60],width:[2,10],rise:[0.1,8],start:[-8,12]};
  function normalize(value){if(value.profile==='three-segment-straight'){const P=typeof module!=='undefined'?require('./ramp-profile.js'):root.RampProfile;return P.normalize(value);}const out={};for(const [k,[lo,hi]] of Object.entries(limits)){const n=Number(value[k]);if(!Number.isFinite(n))throw Error('Invalid '+k);out[k]=Math.max(lo,Math.min(hi,n));}return out;}
  function corners(r){if(r.profile==='three-segment-straight'){const P=typeof module!=='undefined'?require('./ramp-profile.js'):root.RampProfile;return [P.world(r,-P.arcLength(r),r.start,-1),P.world(r,r.length,r.end,-1),P.world(r,r.length,r.end,1),P.world(r,-P.arcLength(r),r.start,1)];}const a=r.rotation*Math.PI/180,c=Math.cos(a),s=Math.sin(a);return [[-1,-1],[1,-1],[1,1],[-1,1]].map(([u,v])=>{const x=u*r.length/2,z=v*r.width/2;return [r.x+x*c-z*s,r.start+(u+1)*r.rise/2,r.z+x*s+z*c];});}
  function metrics(r){if(r.profile==='three-segment-straight'){const P=typeof module!=='undefined'?require('./ramp-profile.js'):root.RampProfile,s=P.solve(r),arc=P.arcLength(r),grade=100*s.drop/(r.length+arc);return {grade,maxGrade:s.maxGrade,angle:Math.atan(grade/100)*180/Math.PI,area:(r.length+arc)*r.width,deckLength:s.deckLength+arc,end:r.end};}return {grade:100*r.rise/r.length,angle:Math.atan2(r.rise,r.length)*180/Math.PI,area:r.length*r.width,deckLength:Math.hypot(r.length,r.rise),end:r.start+r.rise};}
  function perimeter(r){if(r.profile==='three-segment-straight'){const P=typeof module!=='undefined'?require('./ramp-profile.js'):root.RampProfile;return P.perimeter(r);}return corners(r);}
  function outside(r){return corners(r).some(([x,y,z])=>Math.abs(x)>30||Math.abs(z)>24);}
  const api={defaults,limits,normalize,corners,metrics,outside,perimeter};
  if(typeof module!=='undefined')module.exports=api;else root.Geometry=api;
})(globalThis);
