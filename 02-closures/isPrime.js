
var isPrime = (function(){
	var cache = {};

	function checkPrime(n){
		console.log('processing ', n);
		for(var i = 2; i <= (n/2); i++)
			if (n % i === 0)
				return false;
		return true;
	}

	function isPrime(n){
		if (typeof cache[n] === 'undefined')
			cache[n] = checkPrime(n);
		return cache[n];
	}

	return isPrime;
})();

var isOddOrEven = (function(){
	var cache = {};

	function checkOddOrEven(n){
		console.log('processing ', n);
		return n % 2 === 0 ? 'even' : 'odd';
	}

	function isOddOrEven(n){
		if (typeof cache[n] === 'undefined')
			cache[n] = checkOddOrEven(n);
		return cache[n];	
	}

	return isOddOrEven;
})();



