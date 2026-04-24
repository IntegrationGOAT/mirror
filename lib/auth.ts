import { supabase } from "./supabase/client";
import type { AuthError, Session, User } from "@supabase/supabase-js";

export interface AuthResponse {
  success: boolean;
  error?: AuthError | null;
  message?: string;
}

export interface SignUpResponse extends AuthResponse {
  user?: User;
  session?: Session;
}

export interface SignInResponse extends AuthResponse {
  user?: User;
  session?: Session;
}

/**
 * Sign up a new user with email and password
 */
export async function signUp(
  email: string,
  password: string
): Promise<SignUpResponse> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      return { success: false, error, message: error.message };
    }

    return {
      success: true,
      user: data.user ?? undefined,
      session: data.session ?? undefined,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

/**
 * Sign in with email and password
 */
export async function signIn(
  email: string,
  password: string
): Promise<SignInResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error, message: error.message };
    }

    return {
      success: true,
      user: data.user,
      session: data.session,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle(): Promise<SignInResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      return { success: false, error, message: error.message };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<AuthResponse> {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, error, message: error.message };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

/**
 * Get the current user session
 */
export async function getSession() {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return session;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

/**
 * Get the current user
 */
export async function getCurrentUser() {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }

    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(
  callback: (user: User | null, session: Session | null) => void
) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user ?? null, session ?? null);
  });
}
