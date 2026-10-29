(function(root){
 const frame={id:'synthetic-local-v1',units:'m',originE:0,originNorthing:0,originPixel:[0,0],pixelsPerMetre:1,verticalDatum:'SYNTHETIC demo zero; not a survey datum'};
 const surveyPoint=([x,z],y=0)=>[x,y,z],architecturalPoint=(u,v,y=0)=>[u-10,y,v-16];
 const rect=(x,z,w,d)=>[[x,0,z],[x+w,0,z],[x+w,0,z+d],[x,0,z+d]];
 const buildings=[{id:'B1',name:'Synthetic existing context',identity:'SYNTHETIC',geometry:'SYNTHETIC',source:'Generated demo',footprint:rect(18,-30,15,18),height:12,color:'#8b9caa70'},{id:'B3',name:'Synthetic replacement context',identity:'SYNTHETIC',geometry:'SYNTHETIC',source:'Generated demo',footprint:rect(-10,-16,20,10),height:7,color:'#b6a07d90'},{id:'B4-REF',footprint:null}];
 const outline=[[0,0],[20,0],[20,10],[0,10]],levels=[['B2',-6.4],['B1',-3.2],['G',0],['L2',4],['L3',8],['RF',12]].map(([name,y])=>({name,y,outline,source:'SYNTHETIC demonstration only'}));
 function phaseObjects(phase,showDemolition=true){if(!['EXISTING','DEMOLITION','PROPOSED'].includes(phase))throw Error('Unknown phase');return{b1:true,b3:phase==='EXISTING'||phase==='DEMOLITION'&&showDemolition,b3Ghost:phase==='DEMOLITION',zeb:phase==='PROPOSED',b4:false};}
 const api={frame,buildings,levels,replacementCentre:[0,-11],architecturalPoint,surveyPoint,constraints:[],boreholes:[],phaseObjects,version:'public-synthetic-0.1'};
 if(typeof module!=='undefined')module.exports=api;else root.SiteModel=api;
})(globalThis);
