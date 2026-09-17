import fs from "fs";
import path from "path";
import { Pool } from "pg";

const getMunicipalities = () => {
  const csvPath = path.join(
    process.cwd(),
    "data",
    "Areas_Municipio_CAOP2025.csv",
  );
  const csv = fs.readFileSync(csvPath, "utf-8");

  const rows = csv.trim().split("\n");
  rows.shift();

  const data: { code: string; administrativeAreaName: string; name: string }[] =
    [];

  rows.forEach((row) => {
    const columns = row.split(";");
    const code = columns[0].replaceAll('"', "");
    const administrativeAreaName = columns[7];
    const name = columns[8];

    data.push({ code, administrativeAreaName, name });
  });

  return data;
};

const seedDatabase = async () => {
  const municipalitiesData = getMunicipalities();

  const municipalities = municipalitiesData.map((municipality) => {
    return {
      area: municipality.administrativeAreaName,
      municipality: municipality.name,
    };
  });

  const placeholders = municipalities
    .map((_, index) => {
      const firstParameter = index * 2 + 1;
      return `($${firstParameter}, $${firstParameter + 1})`;
    })
    .join(", ");

  const values = municipalities.flatMap((municipality) => [
    municipality.area,
    municipality.municipality,
  ]);

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await pool.query(
      `
        insert into locations (area, municipality)
        values ${placeholders}
        on conflict (area, municipality) do nothing
      `,
      values,
    );

    console.log((await pool.query("select count(*) from locations")).rowCount);
  } catch (e) {
    console.error(e);
  } finally {
    await pool.end();
  }
};

seedDatabase();
