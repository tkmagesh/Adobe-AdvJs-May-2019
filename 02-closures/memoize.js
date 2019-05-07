function memoize(fn){
	var cache = {};
	return function (){
		var key = JSON.stringify(arguments);
		if (typeof cache[key] === 'undefined')
			cache[key] = fn.apply(undefined, arguments);
		return cache[key];	
	}
}


var isPrime = memoize(function checkPrime(n){
	console.log('processing ', n);
	for(var i = 2; i <= (n/2); i++)
		if (n % i === 0)
			return false;
	return true;
});

var isOddOrEven = memoize(function checkOddOrEven(n){
	console.log('processing ', n);
	return n % 2 === 0 ? 'even' : 'odd';
});

var add = memoize(function add(x,y){
	console.log('processing ', x, ' and ', y);
	return x + y;
});
