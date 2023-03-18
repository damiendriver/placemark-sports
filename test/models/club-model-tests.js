import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testSportgrounds, testClubs, golf, soccer, rosslare, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Club Model tests", () => {

  let golfList = null;

  setup(async () => {
    db.init("mongo");
    await db.sportgroundStore.deleteAllSportgrounds();
    await db.clubStore.deleteAllClubs();
    golfList = await db.sportgroundStore.addSportground(golf);
    for (let i = 0; i < testClubs.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testClubs[i] = await db.clubStore.addClub(golfList._id, testClubs[i]);
    }
  });

  test("create single club", async () => {
    const soccerList = await db.sportgroundStore.addSportground(soccer);
    const club = await db.clubStore.addClub(soccerList._id, rosslare)
    assert.isNotNull(club._id);
    assertSubset (rosslare, club);
  });

  test("get multiple clubs", async () => {
    const clubs = await db.clubStore.getClubsBySportgroundId(golfList._id);
    assert.equal(clubs.length, testClubs.length)
  });

  test("delete all clubs", async () => {
    const clubs = await db.clubStore.getAllClubs();
    assert.equal(testClubs.length, clubs.length);
    await db.clubStore.deleteAllClubs();
    const newClubs = await db.clubStore.getAllClubs();
    assert.equal(0, newClubs.length);
  });

  test("get a club - success", async () => {
    const soccerList = await db.sportgroundStore.addSportground(soccer);
    const club = await db.clubStore.addClub(soccerList._id, rosslare)
    const newClub = await db.clubStore.getClubById(club._id);
    assertSubset (rosslare, newClub);
  });

  test("delete One Club - success", async () => {
    await db.clubStore.deleteClub(testClubs[0]._id);
    const clubs = await db.clubStore.getAllClubs();
    assert.equal(clubs.length, testSportgrounds.length - 1);
    const deletedClub = await db.clubStore.getClubById(testClubs[0]._id);
    assert.isNull(deletedClub);
  });

  test("get a club - bad params", async () => {
    assert.isNull(await db.clubStore.getClubById(""));
    assert.isNull(await db.clubStore.getClubById());
  });

  test("delete one club - fail", async () => {
    await db.clubStore.deleteClub("bad-id");
    const clubs = await db.clubStore.getAllClubs();
    assert.equal(clubs.length, testSportgrounds.length);
  });
});
