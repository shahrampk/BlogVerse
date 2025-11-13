import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthServices {
  client = new Client();
  account;
  constructor() {
    this.client
      .setProject(config.appwriteProjectID)
      .setEndpoint(config.appwriteURL);

    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        email: email,
        password: password,
        name: name,
      });

      if (userAccount) {
        // call another method
        return this.login(email, password);
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login(email, password) {
    try {
      return await this.account.createEmailPasswordSession({ email, password });
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite Services :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite Services :: logout :: error", error);
    }
  }
}

const authServices = new AuthServices();

export default authServices;
