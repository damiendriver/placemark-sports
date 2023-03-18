import { EventEmitter } from "events";
import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, soccer, testSportgrounds, maggieCredentials } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Sportground API tests", () => {

    let user = null;
  
    setup(async () => {
      placemarkService.clearAuth();
      user = await placemarkService.createUser(maggie);
      await placemarkService.authenticate(maggieCredentials);
      await placemarkService.deleteAllSportgrounds();
      await placemarkService.deleteAllUsers();
      user = await placemarkService.createUser(maggie);
      await placemarkService.authenticate(maggieCredentials);
      soccer.userid = user._id;
    });

  teardown(async () => {});

  test("create sportground", async () => {
    const returnedSportground = await placemarkService.createSportground(soccer);
    assert.isNotNull(returnedSportground);
    assertSubset(soccer, returnedSportground);
  });


  test("delete a sportground", async () => {
    const sportground = await placemarkService.createSportground(soccer);
    const response = await placemarkService.deleteSportground(sportground._id);
    assert.equal(response.status, 204);
    try {
      const returnedSportground = await placemarkService.getSportground(sportground.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Sportground with this id", "Incorrect Response Message");
    }
  });


  test("create multiple sportgrounds", async () => {
    for (let i = 0; i < testSportgrounds.length; i += 1) {
      testSportgrounds[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createSportground(testSportgrounds[i]);
    }
    let returnedLists = await placemarkService.getAllSportgrounds();
    assert.equal(returnedLists.length, testSportgrounds.length);
    await placemarkService.deleteAllSportgrounds();
    returnedLists = await placemarkService.getAllSportgrounds();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant sportground", async () => {
    try {
      const response = await placemarkService.deleteSportground("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Sportground with this id", "Incorrect Response Message");
    }
  });
});