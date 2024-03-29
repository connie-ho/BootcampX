const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohort_name = process.argv[2];
const n = process.argv[3];

query = {
  text: `
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `,
  values: [cohort_name || 'JUL02', n || 5]
};

pool
  .query(query)
  .then(res => {
    res.rows.forEach(row => {
      console.log(`${row.name} has an id of ${row.student_id} and was in the ${row.cohort} cohort`);
    });
  })
  .catch(err => console.error('query error', err.stack));