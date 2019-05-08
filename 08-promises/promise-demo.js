function add(x,y){
	console.log(`	[@Service] processing ${x} and ${y}`);
	var p = new Promise(function(resolveFn, rejectFn){
		setTimeout(function(){
			if (x === 0 || y === 0){
				return rejectFn(new Error('Invalid arguments'));
			}
			var result = x + y;
			console.log(`	[@Service] returning result`);
			resolveFn(result);

		}, 5000);
	});
	return p;
}

function addClient(x,y){
	console.log(`[@Client] triggering add`);
	var p = add(x,y);
	p.then(function(result){
		console.log(`[@Client] result = ${result}`);
	});
}

async function addClient(x,y){
	try{
		console.log(`[@Client] triggering add`);
		var result = await add(x,y);
		console.log(`[@Client] result = ${result}`);
		var doubleResult = result * 2;
		return doubleResult;
	} catch (e) {
		console.log(e);
	}
}

async function addClient(x,y){
	console.log(`[@Client] triggering add`);
	var result = await add(x,y);
	console.log(`[@Client] result = ${result}`);
	var doubleResult = result * 2;
	return doubleResult;
}



