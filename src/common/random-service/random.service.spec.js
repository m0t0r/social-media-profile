import commonModule from '../index';

describe('RandomService', () => {
  'use strict';

  let RandomService;

  beforeEach(window.module(commonModule.name));

  beforeEach(inject(($injector) => {
    RandomService = $injector.get('RandomService');
  }));

  it('should be able to generate random integer in a provided range', () => {
    let number = RandomService.getRandomInt(1, 10);

    expect(number >= 1 && number <= 10).toEqual(true);
  });

  it('should be able to generate random user status', () => {
    let mockUsers = [{fname: 'John'}, {fname: 'Bob'}];
    RandomService.setRandomUserStatus(mockUsers).then((usersWithStatus) => {
      expect(usersWithStatus.length).not.toEqual(1);
    });
  });
});
