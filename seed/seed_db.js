const mongoose = require('mongoose');
const faker = require('faker');
const User = require('../models/User');
const Plant = require('../models/Plant');
const Notification = require('../models/Notification');

(async function() {
  /** CONNECT TO MONGO */
  mongoose.connect('mongodb://localhost:27017/botanica', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

  mongoose.connection.on('open', () => {
    console.log(`Connected to the database...`);
  });

  console.log(`First, i will delete all the old users`);

  /** DELETE ALL USERS */
  try {
    await User.deleteMany({});
    console.log('Old users moved to a better place. Spandau');
  } catch (e) {
    console.log(e);
  }

  /** DELETE ALL PLANTS */
  try {
    await Plant.deleteMany({});
    console.log('Old plants moved to a better place. Spandau');
  } catch (e) {
    console.log(e);
  }

  /** DELETE ALL NOTIFICATIONS */
  try {
    await Notification.deleteMany({});
    console.log('Old notifications moved to a better place. Spandau');
  } catch (e) {
    console.log(e);
  }

  console.log(`I am creating 20 fake users`);

  /** CREATE 20 FAKE USERS */
  const userPromises = Array(20)
    .fill(null)
    .map(() => {
      const user = new User({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'botanica',
        userName: faker.internet.userName(),
        role: faker.random.arrayElement(['Admin', 'User'])
      });

      const token = user.generateAuthToken();
      return user.save();
    });

  try {
    await Promise.all(userPromises);
    console.log('Users stored in the database!');
  } catch (e) {
    console.log(e);
  }

  console.log(`I am creating 20 fake records`);

  /** CREATE 10 FAKE PLANTS FOR EACH USER */
  const allUsers = await User.find();
  for (const user of allUsers) {
    const plantsPromises = Array(10)
      .fill(null)
      .map(() => {
        const plant = new Plant({
          userId: user._id,
          name: faker.random.words(),
          image: `https://i.picsum.photos/id/${faker.random.number({ min: 0, max: 800 })}/400/400.jpg`,
          waterFrequency: faker.random.number({ min: 2, max: 10 })
        });

        return plant.save();
      });

    try {
      await Promise.all(plantsPromises);
      console.log(`Plants for ${user.firstName} ${user.lastName} stored in the database!`);
    } catch (e) {
      console.log(e);
    }
  }

  /** CREATE SOME FAKE NOTIFICATIONS */
  const allPlants = await Plant.find();
  for (const plant of allPlants) {
    const notPromises = Array(5)
      .fill(null)
      .map(() => {
        const notification = new Notification({
          userId: plant.userId,
          plantId: plant._id,
          message: `Hey don't forget to water your friend, ${plant.name}`,
          seen: false
        });

        return notification.save();
      });

    try {
      await Promise.all(notPromises);
      console.log(`Create 5 notifications for your plant, ${plant.name}`);
    } catch (e) {
      console.log(e);
    }
  }

  mongoose.connection.close();
})();
