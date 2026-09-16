## Local Instructions

App

```bash
npm i
```

```bash
npm run dev
```

## DB

```bash
docker compose up -d db
```

#### Migrations

```bash
npx dbmate new create_new_table
```

Then

```bash
npx dbmate migrate
```
