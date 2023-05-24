import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required().min(6),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required().regex(/^[A-Z][a-z]{2,}$/),
  lastName: Joi.string().example("Simpson").required().regex(/^[A-Z][a-z]{2,}$/),
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

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");