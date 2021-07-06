import faunadb, { query as q } from "faunadb";

export default async (req, res) => {
  const { path } = req.query;

  const {
    data: { count },
  } = await new faunadb.Client({
    domain: "db.us.fauna.com",
    secret: process.env.FAUNADB_SECRET,
    keepAlive: false,
  }).query(q.Call(q.Function("getHits"), path.join(" ")));
  res.status(200).setHeader("Content-Type", "image/svg+xml")
    .send(`<?xml version="1.0"?>
<svg xmlns="http://www.w3.org/2000/svg" width="80" height="20">
  <rect width="30" height="20" fill="#555"/>
  <rect x="30" width="50" height="20" fill="#4c1"/>
  <rect rx="3" width="80" height="20" fill="transparent"/>
  <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
    <text x="15" y="14">hits</text>
    <text x="54" y="14">${count}</text>
  </g>
</svg>`);
};
