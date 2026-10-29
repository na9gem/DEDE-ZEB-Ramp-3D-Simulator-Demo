(function(root){
 function connection(point,tie){const missing=[];if(!point||point.verification!=='VERIFIED MEASURED ROAD STATION')missing.push('Measured road station / access-point association');if(!tie||tie.status!=='VERIFIED'||!Number.isFinite(tie.archZeroMSL))missing.push('Architectural zero-to-MSL tie');return {allowed:missing.length===0,status:missing.length?'ENGINEERING HOLD':'DATA QUALIFIED ONLY',missing};}
 function contains(p,poly){let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])inside=!inside;}return inside;}
 function cross(a,b,c){return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);}
 function segment(a,b,c,d){const eps=1e-9;const on=(p,q,r)=>Math.abs(cross(p,q,r))<eps&&r[0]>=Math.min(p[0],q[0])-eps&&r[0]<=Math.max(p[0],q[0])+eps&&r[1]>=Math.min(p[1],q[1])-eps&&r[1]<=Math.max(p[1],q[1])+eps;return cross(a,b,c)*cross(a,b,d)<0&&cross(c,d,a)*cross(c,d,b)<0||on(a,b,c)||on(a,b,d)||on(c,d,a)||on(c,d,b);}
 function overlap(a,b){return a.some(p=>contains(p,b))||b.some(p=>contains(p,a))||a.some((p,i)=>b.some((q,j)=>segment(p,a[(i+1)%a.length],q,b[(j+1)%b.length])));}
 function chordSlope(){return {value:null,status:'NOT VERIFIED: annotation anchors are not qualified surveyed stations/sections'};}
 const api={connection,contains,segment,overlap,chordSlope};if(typeof module!=='undefined')module.exports=api;else root.RoadChecks=api;
})(globalThis);
