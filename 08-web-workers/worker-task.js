function doWork(){
	for(var i=0; i < 20000; i++){
		if (i % 100 === 0){
			var percentCompleted = Math.round((i / 20000) * 100);
			self.postMessage({ type : 'progress', percentCompleted : percentCompleted});
		}
		for(var j=0; j < 10000; j++)
			for(var k=0; k<100; k++){
				
			}
	}
}

self.addEventListener('message', function(evtArg){
	if (evtArg.data.type === 'start'){
		doWork();
		self.postMessage({ type : 'completed'});
	}
})