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
      }
    },
    clubs: {
      _model : "Club",
      club_1 : {
        clubname: "Rosslare Rangers",
        description: "Junior Football Club",
        county: "Wexford",
        latitude: 52.24,
        longitude: -6.33,
        sportgroundid: "->sportgrounds.soccer"
      },
    }
  };
  