(function(root){
  // Presentation only. Never use this filter in geometry or collision checks.
  const target='proposal-ramp-B-overlay';
  const visible=(id,showGreen=true)=>id!==target||showGreen;
  const api={target,visible};
  if(typeof module!=='undefined')module.exports=api;else root.SceneVisibility=api;
})(globalThis);
