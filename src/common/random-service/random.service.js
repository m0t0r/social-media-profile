class RandomService {

  constructor($q) {
    this.$q = $q;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setRoamdomUserStatus(users) {
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
}

export default RandomService;
