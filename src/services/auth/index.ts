import firebase, { auth as authUntyped } from "./firebase";
import { User } from "./user";

const auth = authUntyped as firebase.auth.Auth;

export type ProviderType = "google" | "facebook";

export class AuthService {
  public async signInWithProvider(providerType: ProviderType) {
    const provider = this.getProvider(providerType);
    try {
      await auth.signInWithPopup(provider);
    } catch (err) {
      throw new Error(`Could not sign in: an error occured`);
    }
  }

  public onAuthStateChanged(cb: (authUser: User | undefined) => void) {
    auth.onAuthStateChanged(() => {
      cb(this.getCurrentUser());
    });
  }

  public getCurrentUser(): User | undefined {
    const authUser = auth.currentUser;
    if (!authUser) {
      return undefined;
    }
    const user = new User();
    user.uid = authUser.uid;
    user.displayName = authUser.displayName;
    user.email = authUser.email;
    user.photoURL = authUser.photoURL;
    return user;
  }

  public async getTokenId(): Promise<string> {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("Could not get token: user is not connected");
    }
    return user.getIdToken();
  }

  public async signOut() {
    return auth.signOut();
  }

  private getProvider(provider: ProviderType): firebase.auth.AuthProvider {
    switch (provider) {
      case "google":
        return new firebase.auth.GoogleAuthProvider();
      case "facebook":
        return new firebase.auth.FacebookAuthProvider();
    }
  }
}

export * from "./user";
