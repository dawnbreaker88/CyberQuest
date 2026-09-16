/**
 * Universal Challenge Contract Validator
 * Validates that challenge objects adhere to the expected shape
 * without crashing the application in development.
 */

export function validateChallenge(challenge) {
  const errors = [];

  if (!challenge || typeof challenge !== 'object') {
    return { valid: false, errors: ['Challenge must be a non-null object'] };
  }

  const requiredFields = [
    'id',
    'questId',
    'type',
    'title',
    'difficulty',
    'xp',
    'content',
    'evaluation',
    'feedback'
  ];

  requiredFields.forEach((field) => {
    if (challenge[field] === undefined || challenge[field] === null) {
      errors.push(`Missing required field: '${field}'`);
    }
  });

  if (challenge.content && typeof challenge.content !== 'object') {
    errors.push("'content' must be an object");
  }

  if (challenge.evaluation && typeof challenge.evaluation !== 'object') {
    errors.push("'evaluation' must be an object defining action outcomes");
  }

  if (challenge.feedback && typeof challenge.feedback !== 'object') {
    errors.push("'feedback' must be an object defining outcome feedback");
  }

  if (errors.length > 0) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[Challenge Validation Error for "${challenge.id || 'unknown'}"]:`, errors);
    }
    return { valid: false, errors };
  }

  return { valid: true, errors: [] };
}
