var products = [
	{id : 6, name : 'Pen', cost : 50, units : 20, category : 'stationary'},
	{id : 9, name : 'Ten', cost : 70, units : 70, category : 'stationary'},
	{id : 3, name : 'Len', cost : 60, units : 60, category : 'grocery'},
	{id : 5, name : 'Zen', cost : 30, units : 30, category : 'grocery'},
	{id : 1, name : 'Ken', cost : 20, units : 80, category : 'utencil'}
];

// sort, filter, groupBy

function describe(title, fn){
	console.group(title);
	fn();
	console.groupEnd();
}

describe('Default List', function(){
	console.table(products);
});

describe('Sorting', function(){
	describe('Default sort [ products by cost ]', function(){
		function sortProductsByCost(){
			for(var i = 0; i < products.length -1; i++)
				for(var j = i+1; j < products.length; j++)
					if (products[i].cost > products[j].cost){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
		}
		sortProductsByCost();
		console.table(products);
	});

	describe('Generic sort',  function(){
		function sort(list, comparer){
			var comparerFn = function(){ 
				return 0;
			};
			
			if (typeof comparer === 'function')
				comparerFn = comparer;

			if (typeof comparer === 'string')
				comparerFn = function(item1, item2){
					if (item1[comparer] < item2[comparer]) return -1;
					if (item1[comparer] > item2[comparer]) return 1;
					return 0;
				}
			
			for(var i = 0; i < list.length -1; i++)
				for(var j = i+1; j < list.length; j++)
					if (comparerFn(list[i], list[j]) > 0 ){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}

		function getDescendingComparer(comparer){
			return function(){
				return comparer.apply(undefined, arguments) * -1;
			}
		}

		describe('Any list by any attribute', function(){
			/*function sort(list, attrName){
				for(var i = 0; i < list.length -1; i++)
					for(var j = i+1; j < list.length; j++)
						if (list[i][attrName] > list[j][attrName]){
							var temp = list[i];
							list[i] = list[j];
							list[j] = temp;
						}
			}*/
			describe('Products by units', function(){
				sort(products, 'units');
				console.table(products);
			});

			describe('Products by category', function(){
				sort(products, 'category');
				console.table(products);
			});

		});

		describe('Any list by any comparer', function(){
			/*function sort(list, comparer){
				for(var i = 0; i < list.length -1; i++)
					for(var j = i+1; j < list.length; j++)
						if (comparer(list[i], list[j]) > 0 ){
							var temp = list[i];
							list[i] = list[j];
							list[j] = temp;
						}
			}*/

			var productsByValueComparer = function(p1, p2){
				var p1Value = p1.cost * p1.units,
					p2Value = p2.cost * p2.units;
				if (p1Value < p2Value) return -1;
				if (p1Value > p2Value) return 1;
				return 0
			};

			describe('Products by value [ cost * units ]', function(){
				
				sort(products, productsByValueComparer);
				console.table(products);
			});

			describe('Products by value [ cost * units ] in descending', function(){
				var productsByValueComparerInDescending = getDescendingComparer(productsByValueComparer);
				sort(products, productsByValueComparerInDescending);
				console.table(products);
			});
		});
	});
});

describe('Filtering', function(){
	describe('Default filter [ stationary products ]', function(){
		function filterStationaryProducts(){
			var stationaryProducts = [];
			for(var i = 0; i < products.length; i++)
				if (products[i].category === 'stationary')
					stationaryProducts.push(products[i]);
			return stationaryProducts;
		}
		var stationaryProducts = filterStationaryProducts();
		console.table(stationaryProducts);
	});

	describe('Any list by any criteria',  function(){
		function filter(list, predicate){
			var result = [];
			for(var i = 0; i < list.length; i++)
				if (predicate(list[i]))
					result.push(list[i]);
			return result;
		}

		function negate(predicate){
			return function(){
				return !predicate.apply(undefined, arguments);
			}
		}

		describe('products by cost', function(){
			var isCostly = function(product){
				return product.cost > 60;
			};

			describe('costly products [ cost > 50 ]', function(){
				var costlyProducts = filter(products, isCostly);
				console.table(costlyProducts);
			});

			describe('affordable products', function(){
				/*var isAffordable = function(product){
					return !isCostly(product);
				};*/

				var isAffordable = negate(isCostly);
				var affordableProduts = filter(products, isAffordable);
				console.table(affordableProduts);
			});

		});

		describe('Products by units', function(){
			var isUnderstocked = function(product){
				return product.units < 50;
			};
			describe('understocked products [ units < 50 ]', function(){	
				var understockedProducts = filter(products, isUnderstocked);
				console.table(understockedProducts);
			});

			describe('wellstocked products', function(){
				/*var isWellstocked = function(product){
					return !isUnderstocked(product);
				};*/
				var isWellstocked = negate(isUnderstocked);
				var wellstockedProducts = filter(products, isWellstocked);
				console.table(wellstockedProducts);
			});
		});
	});
});

describe('GroupBy', function(){
	describe('Default grouping [ Products by category ]', function(){
		function groupProductsByCategory(){
			var result = {
				stationary : [],
				grocery : [],
				utencil : []
			};

			for(var i=0, count = products.length; i < count; i++){
				result[products[i].category].push(products[i]);
			}

			return result;
		}

		var productsByCategory = groupProductsByCategory();
		console.log(productsByCategory);
	})

	describe('Any list by any attribute', function(){
		function groupBy(list, attrName){
			var result = {};
			for(var i=0, count = list.length; i < count; i++){
				var item = list[i],
					key = item[attrName];
				if (typeof result[key] === 'undefined')
					result[key] = [];
				result[key].push(item);
			}
			return result;
		}

		describe('products by category', function(){
			var productsByCategory = groupBy(products, 'category');
			console.log(productsByCategory);
		});

	});

	describe('Any list by any key', function(){
		function groupBy(list, keySelector){
			var result = {};
			for(var i=0, count = list.length; i < count; i++){
				var item = list[i],
					key = keySelector(item);
				if (typeof result[key] === 'undefined')
					result[key] = [];
				result[key].push(item);
			}
			return result;
		}

		describe('products by cost', function(){
			var costKeySelector = function(product){
				return product.cost > 50 ? 'costly' : 'affordable';
			};
			var productsByCost = groupBy(products, costKeySelector);
			console.log(productsByCost);
		});
	});
});
