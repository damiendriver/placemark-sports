export const seedData = {
    users: {
      _model: "User",
      homer: {
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpson.com",
        password: "secret"
       // password: "$2a$10$HnapEWWKQQ0.0Ft33nXxtuJ0fsmd9ywYswEzT4C.6Ul5y6cOU.UEa"
      },
      marge: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
        password: "secret"
        // password: "$2a$10$D3TWK8MSAh63Lhk4gIFSJ.ekM368J88qJRUYSbuBfzffex6B0dFwK"
      },
      bart: {
        firstName: "Bart",
        lastName: "Simpson",
        email: "bart@simpson.com",
        password: "secret"
        // password: "$2a$10$uqnPlgyVjBEOtcgMhn/WRO3FwW4T9gX36tTB4RqpGeB/LkCR3YQuO"
      }
    },
    sportgrounds: {
      _model: "Sportground",
      soccer: {
        title: "Soccer",
        // img: "https://res.cloudinary.com/dqu1cfm2e/image/upload/v1679244159/z3kdkwjeizief7kkzqvn.jpg",
        userid: "->users.bart"
      },
      gaa: {
        title: "GAA",
        // img: "https://res.cloudinary.com/dqu1cfm2e/image/upload/v1679244177/chjny7efs3az4yfqcovb.jpg",
        userid: "->users.bart"
      },
      rugby: {
        title: "Rugby",
        // img: "https://res.cloudinary.com/dqu1cfm2e/image/upload/v1679244138/xzdfknx8moun7i2fwnvq.jpg",
        userid: "->users.homer"
      },
      golf: {
        title: "Golf",
        // img: "https://res.cloudinary.com/dqu1cfm2e/image/upload/v1679244117/ukbz9mtr704mopi8p7pv.jpg",
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
        clubname: "Waterford Wanders",
        description: "Munster Feeder Club",
        county: "Waterford",
        latitude: 52.25,
        longitude: -7.11,
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
  