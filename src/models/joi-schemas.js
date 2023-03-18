import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");


export const ClubSpec = Joi.object()
  .keys({
    clubname: Joi.string().required().example("Rosslare Rangers"),
    description: Joi.string().required().example("Junior Soccer Club"),
    county: Joi.string().required().example("Wexford"),
    latitude: Joi.number().allow("").optional().example(52.24),
    longitude: Joi.number().allow("").optional().example(-6.33),
    sportgroundid: IdSpec,
  })
  .label("Club");

export const ClubSpecPlus = ClubSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ClubPlus");

export const ClubArraySpec = Joi.array().items(ClubSpecPlus).label("ClubArray");


export const SportgroundSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Soccer"),
    userid: IdSpec,
    clubs: ClubArraySpec,
  })
  .label("Sportground");

export const SportgroundSpecPlus = SportgroundSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("SportgroundPlus");

export const SportgroundArraySpec = Joi.array().items(SportgroundSpecPlus).label("SportgroundArray");

