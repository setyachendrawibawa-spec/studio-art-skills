const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Read environment or use default PostgreSQL local config
const connectionString = process.env.DATABASE_URL || `postgresql://${process.env.PGUSER || 'postgres'}:${process.env.PGPASSWORD || 'postgres'}@${process.env.PGHOST || 'localhost'}:${process.env.PGPORT || 5432}/${process.env.PGDATABASE || 'studio_art_skills'}`;

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Automatically check connection and initialize tables if needed
const initDb = async () => {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to PostgreSQL database.');

    // Check if table roles exists
    const res = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'roles'
      );
    `);

    const tableExists = res.rows[0].exists;
    if (!tableExists) {
      console.log('Database tables not found. Initializing schema.sql...');
      const schemaPath = path.join(__dirname, 'schema.sql');
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      await client.query(schemaSql);
      console.log('Schema created successfully.');

      console.log('Seeding initial data...');
      const seedPath = path.join(__dirname, 'seed.sql');
      const seedSql = fs.readFileSync(seedPath, 'utf8');
      await client.query(seedSql);
      console.log('Seed data inserted successfully.');
    } else {
      console.log('Database tables already exist. Skipping schema setup.');
    }

    client.release();
  } catch (err) {
    console.error('Database connection / initialization failed:', err.message);
    console.log('Database operation will fall back to in-memory/mock state where needed.');
  }
};

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
  initDb
};
