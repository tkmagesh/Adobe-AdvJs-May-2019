//ES5
/*
var pubsub = (function(){
	var _events = {

	};

	function PubSub(evtName){
		this._name = evtName;
		this._subscribers = [];
	}

	PubSub.prototype.emit = function() {
		var args = arguments;
		this._subscribers.forEach(function(subscriptionFn){
			subscriptionFn.apply(undefined, args);
		});
		return this;
	};

	PubSub.prototype.subscribe = function() {
		var self = this;
		Array.prototype.forEach.call(arguments, function(subscriptionFn){
			if (typeof subscriptionFn === 'function')
				self._subscribers.push(subscriptionFn);
		});
		return this;
	};

	PubSub.prototype.unsubscribe = function() {
		var self = this;
		Array.prototype.forEach.call(arguments, function(subscriptionFn){
			if (self._subscribers.indexOf(subscriptionFn) >= 0){
				self._subscribers.splice(self._subscribers.indexOf(subscriptionFn), 1);
			}
		});
		return this;
	};

	return function(evtName){
		_events[evtName] = _events[evtName] || new PubSub(evtName);
		return _events[evtName];
	}
})();
*/

const pubsub = (function(){
	const _events = {};

	class PubSub {
		cosntructor(evtName){
			this._name = evtName;
			this._subscribers = [];
		}

		emit(...args){
			this._subscribers.forEach(subscriptionFn => subscriptionFn(...args));
			return this;
		}

		subscribe(...args){
			args.forEach(subscriptionFn => {
				if (typeof subscriptionFn === 'function')
					this._subscribers.push(subscriptionFn);
			});
			return this;
		}

		unsubscribe(...args) {
			args.forEach(subscriptionFn => {
				if (this._subscribers.indexOf(subscriptionFn) >= 0){
					this._subscribers.splice(this._subscribers.indexOf(subscriptionFn), 1);
				}
			});
			return this;
		}
	}

	return function(evtName){
		_events[evtName] = _events[evtName] || new PubSub(evtName);
		return _events[evtName];
	}
})();

/*
test data

var evt1 = 'event-1', 
	evt2 = 'event-2', 
	data1 = 'data-1', 
	data2 = 'data-2', 
	sub1 = function(data1){ 
		console.log('subscription- 1 is invoked'); 
		console.log(data1);
	}, 
	sub2 = function(data1, data2){ 
		console.log('subscription- 2 is invoked'); 
		console.log(data1, data2); 
	};
	

*/