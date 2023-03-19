import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, soccer, testSportgrounds, testClubs, rosslare, maggieCredentials } from "../fixtures.js";

suite("Club API tests", () => {
  let user = null;
  let rugby = null;

  setup(async () => {
    placemarkService.clearAuth();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    await placemarkService.deleteAllSportgrounds();
    await placemarkService.deleteAllClubs();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    soccer.userid = user._id;
    rugby = await placemarkService.createSportground(soccer);
  });

  teardown(async () => {});

  test("create club", async () => {
    const returnedClub = await placemarkService.createClub(rugby._id, rosslare);
    assertSubset(rosslare, returnedClub);
  });

  test("create Multiple clubs", async () => {
    for (let i = 0; i < testClubs.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createClub(rugby._id, testClubs[i]);
    }
    const returnedClubs = await placemarkService.getAllClubs();
    assert.equal(returnedClubs.length, testClubs.length);
    for (let i = 0; i < returnedClubs.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const club = await placemarkService.getClub(returnedClubs[i]._id);
      assertSubset(club, returnedClubs[i]);
    }
  });

  test("Delete ClubApi", async () => {
    for (let i = 0; i < testClubs.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createClub(rugby._id, testClubs[i]);
    }
    let returnedClubs = await placemarkService.getAllClubs();
    assert.equal(returnedClubs.length, testClubs.length);
    for (let i = 0; i < returnedClubs.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const club = await placemarkService.deleteClub(returnedClubs[i]._id);
    }
    returnedClubs = await placemarkService.getAllClubs();
    assert.equal(returnedClubs.length, 0);
  });

  test("denormalised sportground", async () => {
    for (let i = 0; i < testClubs.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createClub(rugby._id, testClubs[i]);
    }
    const returnedSportground = await placemarkService.getSportground(rugby._id);
    assert.equal(returnedSportground.clubs.length, testClubs.length);
    for (let i = 0; i < testClubs.length; i += 1) {
      assertSubset(testClubs[i], returnedSportground.clubs[i]);
    }
  });
});
