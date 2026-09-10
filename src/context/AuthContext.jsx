import React, { createContext, useContext, useState, useEffect } from 'react';
import { onboardingScenarios } from '../data/onboarding/scenarios';

const AuthContext = createContext(null);

const STORAGE_KEY_AUTH = 'cyberquest_auth';
const STORAGE_KEY_USER = 'cyberquest_user';

const INITIAL_USER = {
  id: 'agent-01',
  name: 'Prabhath',
  email: 'prabhath@cyberquest.dev',
  profile: {
    name: 'Prabhath',
    email: 'prabhath@cyberquest.dev',
    experienceLevel: 'beginner',
    goals: ['phishing', 'scams'],
  },
  onboarding: {
    completed: false,
    completedAt: null,
    baselineScores: {
      phishing: 75,
      passwords: 65,
      qr: 50,
      scams: 70,
      socialEngineering: 45,
    },
    strength: 'phishing',
    blindSpot: 'socialEngineering',
  },
  stats: {
    level: 1,
    xp: 0,
    securityIQ: 61,
    streak: 0,
    challengesCompleted: 0,
    challengesAttempted: 0,
    accuracy: 0,
  },
  progress: {
    currentQuest: 'phishing',
    questsCompleted: [],
    challengesCompleted: [],
  },
  badges: ['first_catch'],
  achievements: ['first_decision'],
};

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_AUTH);
      return stored ? JSON.parse(stored) : false;
    } catch {
      return false;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with initial template to ensure all schema fields exist
        return {
          ...INITIAL_USER,
          ...parsed,
          profile: { ...INITIAL_USER.profile, ...(parsed.profile || {}) },
          onboarding: { ...INITIAL_USER.onboarding, ...(parsed.onboarding || {}) },
          stats: { ...INITIAL_USER.stats, ...(parsed.stats || {}) },
          progress: { ...INITIAL_USER.progress, ...(parsed.progress || {}) },
        };
      }
      return null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(isAuthenticated));
      if (user) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch (e) {
      console.error('Error persisting auth state to localStorage:', e);
    }
  }, [isAuthenticated, user]);

  const login = async ({ email, password }) => {
    const displayName = email.split('@')[0] || 'Agent';
    const capitalizedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

    const loggedInUser = user
      ? { ...user, email }
      : {
          ...INITIAL_USER,
          name: capitalizedName,
          email,
          profile: { ...INITIAL_USER.profile, name: capitalizedName, email },
        };

    setUser(loggedInUser);
    setIsAuthenticated(true);
    return loggedInUser;
  };

  const signup = async ({ name, email, password }) => {
    const cleanName = name.trim() || 'Agent';
    const cleanEmail = email.trim();

    const newUser = {
      ...INITIAL_USER,
      id: `agent-${Date.now().toString().slice(-4)}`,
      name: cleanName,
      email: cleanEmail,
      profile: {
        ...INITIAL_USER.profile,
        name: cleanName,
        email: cleanEmail,
      },
      onboarding: {
        ...INITIAL_USER.onboarding,
        completed: false, // New user needs onboarding
      },
    };

    setUser(newUser);
    setIsAuthenticated(true);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(STORAGE_KEY_AUTH);
      localStorage.removeItem(STORAGE_KEY_USER);
    } catch (e) {
      console.error('Error clearing auth:', e);
    }
  };

  const updateUser = (updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  /**
   * Completes the onboarding assessment, computes category scores, Security IQ,
   * identifies strengths and blind spots, and stores results in user state.
   */
  const completeOnboarding = ({ experienceLevel, goals, answers }) => {
    const rawCategoryScores = {
      phishing: 0,
      passwords: 0,
      qr: 0,
      scams: 0,
      socialEngineering: 0,
    };

    const maxCategoryScores = {
      phishing: 0,
      passwords: 0,
      qr: 0,
      scams: 0,
      socialEngineering: 0,
    };

    // Calculate score from the 10 scenarios
    onboardingScenarios.forEach((scenario) => {
      const cat = scenario.category;
      const chosenOptionId = answers[scenario.id];
      const points = scenario.scoring[chosenOptionId] ?? 1;
      const maxPoints = Math.max(...Object.values(scenario.scoring));

      rawCategoryScores[cat] = (rawCategoryScores[cat] || 0) + points;
      maxCategoryScores[cat] = (maxCategoryScores[cat] || 0) + maxPoints;
    });

    // Normalize each category to 0-100 (default minimum baseline 25 to encourage players)
    const normalizedCategoryScores = {};
    let totalScoreSum = 0;
    let categoryCount = 0;

    const categories = ['phishing', 'passwords', 'qr', 'scams', 'socialEngineering'];

    categories.forEach((cat) => {
      const raw = rawCategoryScores[cat] || 0;
      const max = maxCategoryScores[cat] || 6;
      const percentage = Math.round((raw / max) * 100);
      // Floor at 20, cap at 98 for initial baseline
      const boundedScore = Math.max(25, Math.min(95, percentage));
      normalizedCategoryScores[cat] = boundedScore;
      totalScoreSum += boundedScore;
      categoryCount += 1;
    });

    const calculatedSecurityIQ = Math.round(totalScoreSum / categoryCount);

    // Identify strength (highest category) and blind spot (lowest category)
    let highestCat = categories[0];
    let lowestCat = categories[0];

    categories.forEach((cat) => {
      if (normalizedCategoryScores[cat] > normalizedCategoryScores[highestCat]) {
        highestCat = cat;
      }
      if (normalizedCategoryScores[cat] < normalizedCategoryScores[lowestCat]) {
        lowestCat = cat;
      }
    });

    // If all equal, diversify naturally
    if (highestCat === lowestCat) {
      highestCat = 'phishing';
      lowestCat = 'socialEngineering';
    }

    const updatedUserData = {
      ...user,
      profile: {
        ...(user?.profile || {}),
        experienceLevel: experienceLevel || 'beginner',
        goals: goals || ['phishing', 'scams'],
      },
      onboarding: {
        completed: true,
        completedAt: new Date().toISOString(),
        baselineScores: normalizedCategoryScores,
        strength: highestCat,
        blindSpot: lowestCat,
      },
      stats: {
        ...(user?.stats || {}),
        securityIQ: calculatedSecurityIQ,
        xp: (user?.stats?.xp || 0) + 100, // +100 XP baseline bonus
      },
    };

    setUser(updatedUserData);
    return updatedUserData;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        signup,
        logout,
        updateUser,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
