export const StatusCodesEnum = Object.freeze({
  ok: 200,
  created: 201,
  deleted: 204,
  unauthorized: 401,
  accessDenied: 403,
  notFound: 404,
  serverError: 500,
});

export const GenresEnum = Object.freeze({
  Action: "Action and Adventure",
  Mystery: "Mystery",
  Horror: "Horror",
  ThrillerAndSuspence: "Thriller and Suspense",
  HistoricalFiction: "Historical Fiction",
  ContemporaryFunction: "Contemporary Fiction",
  GraphicNovel: "Graphic Novel",
  ForChildren: "For Children",
});

export const UserRolesEnum = Object.freeze({
  Admin: "admin",
  Manager: "manager",
});
