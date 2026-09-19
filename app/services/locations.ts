import { pool } from "@/app/lib/db";

export type Location = {
  area: string;
  municipality: string;
};

export async function listLocations(): Promise<Location[]> {
  const result = await pool.query(`
            select area, municipality from locations
            order by area
        `);

  return result.rows;
}
