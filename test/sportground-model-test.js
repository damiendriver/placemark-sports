import { EventEmitter } from "events";
import { assert } from "chai";
import { assertSubset } from "./test-utils.js";
import { db } from "../src/models/db.js";
import { testSportgrounds, soccer } from "./fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Sportground Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.sportgroundStore.deleteAllSportgrounds();
    for (let i = 0; i < testSportgrounds.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testSportgrounds[i] = await db.sportgroundStore.addSportground(testSportgrounds[i]);
    }
  });

  test("create a sportground", async () => {
    const sportground = await db.sportgroundStore.addSportground(soccer);
    assertSubset(soccer, sportground);
    assert.isDefined(sportground._id);
  });

  test("delete all sportgrounds", async () => {
    let returnedSportgrounds = await db.sportgroundStore.getAllSportgrounds();
    assert.equal(returnedSportgrounds.length, 3);
    await db.sportgroundStore.deleteAllSportgrounds();
    returnedSportgrounds = await db.sportgroundStore.getAllSportgrounds();
    assert.equal(returnedSportgrounds.length, 0);
  });

  test("get a sportground - success", async () => {
    const sportground = await db.sportgroundStore.addSportground(soccer);
    const returnedSportground = await db.sportgroundStore.getSportgroundById(sportground._id);
    assertSubset(soccer, sportground);
  });

  test("delete One Playist - success", async () => {
    const id = testSportgrounds[0]._id;
    await db.sportgroundStore.deleteSportgroundById(id);
    const returnedSportgrounds = await db.sportgroundStore.getAllSportgrounds();
    assert.equal(returnedSportgrounds.length, testSportgrounds.length - 1);
    const deletedSportground = await db.sportgroundStore.getSportgroundById(id);
    assert.isNull(deletedSportground);
  });

  test("get a sportground - bad params", async () => {
    assert.isNull(await db.sportgroundStore.getSportgroundById(""));
    assert.isNull(await db.sportgroundStore.getSportgroundById());
  });

  test("delete One Sportground - fail", async () => {
    await db.sportgroundStore.deleteSportgroundById("bad-id");
    const allSportgrounds = await db.sportgroundStore.getAllSportgrounds();
    assert.equal(testSportgrounds.length, allSportgrounds.length);
  });
});
