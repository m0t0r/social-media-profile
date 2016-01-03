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
      expect(usersWithStatus[0].active).toBeDefined();
      expect(usersWithStatus[1].active).toBeDefined();
    });
  });

  it('should be able to generate random user activity', () => {
    let mockUsers = [{fname: 'James'}, {fname: 'Tom'}];
    RandomService.setRandomUserActivity(mockUsers).then((usersWithActivity) => {
      expect(usersWithActivity[0].activity).toBeDefined();
      expect(usersWithActivity[1].activity).toBeDefined();
    });
  });
});
