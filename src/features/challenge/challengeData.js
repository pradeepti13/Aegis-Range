/**
 * Aegis Range - Cybersecurity Challenge Data
 * Feature: Review 1 Challenge Module
 * Challenge: SQL Injection — Login Bypass
 */

export const CHALLENGE_DATA = {
  id: 'SQL-001',
  title: 'SQL Injection — Login Bypass',
  category: 'Web Security',
  difficulty: 'Beginner',
  points: 100,
  flag: 'AEGIS{sql_injection_basic}',
  description: 
    'A vulnerable authentication portal uses raw SQL string concatenation to verify user credentials. ' +
    'The backend constructs queries directly from user-supplied input without parameterization or sanitization.',
  objective: 
    'Analyze the simulated backend query structure. Craft a classic SQL injection payload to bypass the authentication check ' +
    'as administrator and extract the secret challenge flag.',
  scenario: {
    targetUrl: 'http://internal-portal.aegis.range/login',
    vulnerableCode: "SELECT * FROM users WHERE username = '" + "$username" + "' AND password = '" + "$password" + "';",
    databaseType: 'SQLite / PostgreSQL Mock',
    vulnerableParameter: 'username / password'
  },
  hint: {
    title: 'SQL Injection Syntax & Logic',
    content: 
      "In SQL queries, single quotes (') are used to enclose string literals. " +
      "If you input a single quote, you break out of the string literal. " +
      "Combining this with a boolean tautology (like OR '1'='1' or OR 1=1) and a comment sequence (-- or #) " +
      "forces the WHERE clause to evaluate to TRUE while ignoring the password check.",
    examplePayloads: [
      "admin' --",
      "' OR '1'='1",
      "' OR 1=1 --",
      "admin' OR '1'='1' --"
    ]
  }
};

/**
 * Validates a submitted flag against the correct flag.
 * Performs normalization (trimming whitespace).
 * 
 * @param {string} inputFlag 
 * @returns {{ isValid: boolean, scoreAwarded: number, feedback: string }}
 */
export function validateFlag(inputFlag) {
  if (!inputFlag || typeof inputFlag !== 'string') {
    return {
      isValid: false,
      scoreAwarded: 0,
      feedback: 'Please enter a flag before submitting.'
    };
  }

  const cleanInput = inputFlag.trim();

  if (cleanInput === CHALLENGE_DATA.flag) {
    return {
      isValid: true,
      scoreAwarded: CHALLENGE_DATA.points,
      feedback: `Correct flag! +${CHALLENGE_DATA.points} XP awarded. Excellent work on bypassing the authentication.`
    };
  }

  return {
    isValid: false,
    scoreAwarded: 0,
    feedback: 'Incorrect flag. Check your syntax or use the hint to re-evaluate the SQL query structure.'
  };
}

/**
 * Simulates the backend SQL query execution for the interactive sandbox.
 * Demonstrates how user inputs affect the SQL query and whether it succeeds in bypassing authentication.
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns {{ query: string, bypassed: boolean, message: string, retrievedFlag: string | null }}
 */
export function simulateSqlQuery(username = '', password = '') {
  const safeUser = username || '';
  const safePass = password || '';
  
  // Reconstruct the raw simulated query
  const rawQuery = `SELECT * FROM users WHERE username = '${safeUser}' AND password = '${safePass}';`;
  
  // Common SQL injection patterns for login bypass
  const sqliSignatures = [
    /'\s*or\s+.*=.*--?/i,
    /'\s*or\s+'?1'?\s*=\s*'?1/i,
    /'\s*or\s+true/i,
    /admin'\s*--/i,
    /admin'\s*#/i,
    /'\s*--/i,
    /'\s*#/i
  ];

  const hasInjection = sqliSignatures.some(regex => regex.test(safeUser) || regex.test(safePass));

  if (hasInjection) {
    return {
      query: rawQuery,
      bypassed: true,
      message: 'AUTHENTICATION BYPASSED! Logged in as Administrator [User ID: 1].',
      retrievedFlag: CHALLENGE_DATA.flag
    };
  }

  if (safeUser === 'admin' && safePass === 'SuperSecretPassword!2026') {
    return {
      query: rawQuery,
      bypassed: true,
      message: 'Logged in as Administrator with legitimate credentials.',
      retrievedFlag: CHALLENGE_DATA.flag
    };
  }

  return {
    query: rawQuery,
    bypassed: false,
    message: 'Authentication failed: Invalid username or password (Query evaluated to 0 matching rows).',
    retrievedFlag: null
  };
}
