describe('pubsub', function(){
	it('should call the subscription if the event is emitted', function(){
		//arrange
		var evtName = 'event-1',
			data = 'data-1',
			data2 = 'data-2',
			subscription = jasmine.createSpy();

		//act
		pubsub(evtName)
			.subscribe(subscription)
			.emit(data);

		//assert
		expect(subscription).toHaveBeenCalledWith(data);		
	});
})