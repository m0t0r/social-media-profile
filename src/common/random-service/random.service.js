'use strict';

class RandomService {

  constructor($q) {
    this.$q = $q;
    this.initMockUsersActivities();
  }

  initMockUsersActivities() {
    this.mockUserActivities = [
      {
        name: 'friendship',
        description: 'added you as a friend',
        content: '',
        likes: this.getRandomInt(1, 100),
        timeAgo: this.getRandomInt(1, 59)
      },
      {
        name: 'images',
        description: 'added 1 new illustration',
        content: [{url: 'http://lorempixel.com/960/796/nightlife/' + this.getRandomInt(1, 10)}],
        likes: this.getRandomInt(1, 100),
        timeAgo: this.getRandomInt(1, 59)
      },
      {
        name: 'post',
        description: 'posted on his/her page',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, commodi debitis dolore eos facilis in iste nam natus obcaecati placeat possimus quas qui quos rem repudiandae saepe similique sunt. Aperiam at aut commodi dignissimos dolores enim excepturi ipsam laboriosam, porro quod reiciendis, reprehenderit sit, veritatis! Accusantium architecto delectus fugiat neque.',
        likes: this.getRandomInt(1, 100),
        timeAgo: this.getRandomInt(1, 59)
      },
      {
        name: 'images',
        description: 'added 2 new photos of you',
        content: [
          {url: 'http://lorempixel.com/960/796/nightlife/' + this.getRandomInt(1, 10)},
          {url: 'http://lorempixel.com/960/796/nightlife/' + this.getRandomInt(1, 10)}
        ],
        likes: this.getRandomInt(1, 100),
        timeAgo: this.getRandomInt(1, 59)
      }
    ];
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setRandomUserStatus(users) {
    return this.$q((resolve) => {
      users.forEach((user, index) => {
        let num = this.getRandomInt(1, 59);
        if (num % 2 === 0) {
          user.active = true;
        } else {
          user.active = false;
          user.lastOnline = num;
        }

        if (users.length - 1 === index) { return resolve(users); }
      });
    });
  }

  setRandomUserActivity(users) {
    return this.$q((resolve) => {
      users.forEach((user, index) => {
        let num = this.getRandomInt(0, 3);
        user.activity = this.mockUserActivities[num];
        if (users.length - 1 === index) { return resolve(users); }
      });
    });
  }
}

export default RandomService;
