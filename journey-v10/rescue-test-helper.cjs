// Production-flow fixtures explicitly perform the newly required physical rescue.
exports.freeJoseph=t=>{if(t.state.state==='cleared'&&t.state.arena==='rugby'&&t.run.curse&&!t.run.curse.rescued){Object.assign(t.player,{x:870,y:5290});let q=t.nearbyRescueActor();if(!q||!t.interactRescueActor(q))throw Error('Fixture could not physically free Joseph');}};
