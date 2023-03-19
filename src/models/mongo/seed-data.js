export const seedData = {
    users: {
      _model: "User",
      homer: {
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpson.com",
        password: "secret"
      },
      marge: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
        password: "secret"
      },
      bart: {
        firstName: "Bart",
        lastName: "Simpson",
        email: "bart@simpson.com",
        password: "secret"
      }
    },
    sportgrounds: {
      _model: "Sportground",
      soccer: {
        title: "Soccer",
        userid: "->users.bart"
      },
      gaa: {
        title: "GAA",
        userid: "->users.bart"
      },
      rugby: {
        title: "Rugby",
        userid: "->users.homer"
      },
      golf: {
        title: "Golf",
        userid: "->users.homer"
      },
    },
    clubs: {
      _model : "Club",
      club_1 : {
        clubname: "Rosslare Rangers",
        description: "Junior Football Club",
        county: "Wexford",
        latitude: 52.24,
        longitude: -6.33,
        userid: "->users.bart",
        sportgroundid: "->sportgrounds.soccer"
      },
      club_2 : {
        clubname: "St. Marys Rosslare",
        description: "Senior Hurling Club",
        county: "Wexford",
        latitude: 52.24,
        longitude: -6.40,
        userid: "->users.bart",
        sportgroundid: "->sportgrounds.gaa"
      },
      club_3 : {
        clubname: "Wexford Wanders",
        description: "Leinster Feeder Club",
        county: "Wexford",
        latitude: 52.35,
        longitude: -6.48,
        userid: "->users.homer",
        sportgroundid: "->sportgrounds.rugby"
      },
      club_4 : {
        clubname: "St. Helens Bay Golf",
        description: "18 Hole Parkland",
        county: "Wexford",
        latitude: 52.33,
        longitude: -6.32,
        userid: "->users.homer",
        sportgroundid: "->sportgrounds.golf"
      },
    }
  };
  