/**
 * ChallengeManager
 * Handles challenge indexing, progression, and boundaries without any threat-specific logic.
 */

export class ChallengeManager {
  constructor(challenges = []) {
    this.challenges = Array.isArray(challenges) ? challenges : [];
    this.currentIndex = 0;
  }

  setChallenges(challenges) {
    this.challenges = Array.isArray(challenges) ? challenges : [];
    this.currentIndex = 0;
  }

  getCurrentChallenge() {
    if (this.challenges.length === 0) return null;
    return this.challenges[this.currentIndex] || null;
  }

  getChallengeIndex() {
    return this.currentIndex;
  }

  getTotalCount() {
    return this.challenges.length;
  }

  hasNext() {
    return this.currentIndex < this.challenges.length - 1;
  }

  next() {
    if (this.hasNext()) {
      this.currentIndex += 1;
      return this.getCurrentChallenge();
    }
    return null;
  }

  reset() {
    this.currentIndex = 0;
  }

  getChallengeById(id) {
    return this.challenges.find((c) => c.id === id) || null;
  }
}
