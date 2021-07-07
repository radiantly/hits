# Hits

![Hit count](https://hits.vercel.app/USER/REPO.svg) ![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square) ![License](https://img.shields.io/github/license/radiantly/hits?style=flat-square)

> A no-nonsense hit count badge generator built with Next.js and FaunaDB.

## Usage

To use the generated hit count badge, add the following snippet to your readme file.

```md
![Hit count](https://hits.vercel.app/USER/REPO.svg)
```

## Running locally

```sh
# Install dependencies
npm install

# Run local development server on https://localhost:3000/
npm run dev
```

## Deployment instructions

1. Firstly, you'll need to set up the back-end database to store the hit counts.

   1. Head over to https://fauna.org and create an account.
   2. Create a database (Select US as the region - if your region of choice is different, you may need to change the db connection domain over at [./pages/api/[...path].js](./pages/api/[...path].js)).
   3. Within the created database, create a collection.
   4. Next, click `Indexes` on the sidebar and add an index.
      - Name: `by_path`
      - Terms: `data.path`
      - Values: `data.count`
      - Unique: Checked
      - Serialized: Checked
   5. After that, click `Functions` and add a function with the name `getHits`. For the function body, copy and paste the below function:

      ```fql
      Query(
        Lambda(
          "path",
          Let(
            { match: Match(Index("by_path"), Var("path")) },
            If(
              Exists(Var("match")),
              Let(
                { doc: Get(Var("match")) },
                Update(Select("ref", Var("doc")), {
                  data: { count: Add(Select(["data", "count"], Var("doc")), 1) }
                })
              ),
              Create(Collection("hitcount"), {
                data: { path: Var("path"), count: 1 }
              })
            )
          )
        )
      )
      ```

      This function takes a single argument (the path), and adds it to the database if it does not exist, or increments the count if it does.

   6. Finally, hit `Security` in the sidebar and generate a server secret.

2. Set up the front-end:

   To deploy the Next.js app, you can use a platform like Netlify or Vercel. Add the FaunaDB server secret as an environment variable called `FAUNADB_SECRET`.

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fradiantly%2Fhits&env=FAUNADB_SECRET&project-name=hits&repository-name=hits)

### License

MIT
