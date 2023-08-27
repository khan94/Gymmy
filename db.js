// import path from 'path'
import { v4 as uuid } from "uuid";
import knexBuilder from "knex";
import knexConfig from "./knexfile.js";
// import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url)

// const __dirname = path.dirname(__filename)

// const dbPath = path.resolve(__dirname, 'db/database.sqlite')

const knex = knexBuilder(
  process.env.NODE_ENV === "development"
    ? knexConfig.development
    : knexConfig.production
);
// {
//   client: 'sqlite3',
//   connection: {
//     filename: dbPath,
//   },
//   useNullAsDefault: true,
// }

knex.schema
  .hasTable("users")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("users", (table) => {
          table.uuid("id").primary().notNullable().defaultTo(uuid());
          table.boolean("isAdmin").defaultTo(false);
          table.string("email");
          table.string("name");
          table.string("password");
          table
            .timestamp("created_at")
            .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
        })
        .then(() => {
          // Log success message
          console.log("Table 'Users' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    knex.schema.hasTable("workouts").then((exists) => {
      if (!exists) {
        return knex.schema
          .createTable("workouts", (table) => {
            table.uuid("id").primary().notNullable().defaultTo(uuid());
            table.string("type");
            table.string("name");
            table.string("date");
            table
              .timestamp("created_at")
              .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
            table.uuid("userId").notNullable();
            table
              .foreign("userId")
              .references("id")
              .inTable("users")
              .onUpdate("CASCADE")
              .onDelete("CASCADE");
          })
          .then(() => {
            // Log success message
            console.log("Table 'Workouts' created");
          })
          .catch((error) => {
            console.error(`There was an error creating table: ${error}`);
          });
      }
    });
  })
  .then(() => {
    knex.schema.hasTable("exercises").then((exists) => {
      if (!exists) {
        return knex.schema
          .createTable("exercises", (table) => {
            table.uuid("id").primary().notNullable().defaultTo(uuid());
            table.string("type");
            table.string("name").notNullable();
            table.string("muscle");
            table.string("equipment");
            table.string("difficulty");
            table.string("instructions");
            table.uuid("workoutId").notNullable();
            table
              .foreign("workoutId")
              .references("id")
              .inTable("workouts")
              .onUpdate("CASCADE")
              .onDelete("CASCADE");
            table
              .timestamp("created_at")
              .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
            table.uuid("userId").notNullable();
            table
              .foreign("userId")
              .references("id")
              .inTable("users")
              .onUpdate("CASCADE")
              .onDelete("CASCADE");
          })
          .then(() => {
            console.log("Table 'Exercises' created");
          })
          .catch((error) => {
            console.error(
              `There was an error creating 'exercises' table: ${error}`
            );
          });
      }
    });
  })
  .then(() => {
    knex.schema.hasTable("sets").then((exists) => {
      if (!exists) {
        return knex.schema
          .createTable("sets", (table) => {
            table.uuid("id").primary().notNullable().defaultTo(uuid());
            table.string("weight");
            table.string("reps");
            table.string("notes");
            table.uuid("exerciseId").notNullable();
            table
              .foreign("exerciseId")
              .references("id")
              .inTable("exercises")
              .onUpdate("CASCADE")
              .onDelete("CASCADE");
            table
              .timestamp("created_at")
              .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
            table.uuid("userId").notNullable();
            table
              .foreign("userId")
              .references("id")
              .inTable("users")
              .onUpdate("CASCADE")
              .onDelete("CASCADE");
          })
          .then(() => {
            console.log("Table 'Sets' created");
          })
          .catch((error) => {
            console.error(
              `There was an error creating 'exercises' table: ${error}`
            );
          });
      }
    });
  })
  .then(() => {
    // Log success message
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });
if (process.env.NODE_ENV === "development")
  knex.raw("PRAGMA foreign_keys = ON;").then(() => {
    console.log("Foreign Key Check activated.");
  });

// Export the database
export default knex;
