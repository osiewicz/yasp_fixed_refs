import ky from "ky";
import { appConfig } from "../appConfig";
import { Note } from "../src/models/note.model";

const { secretKey, collectionId } = appConfig.jsonBin;

export class JsonBinApi {
  static addNote = async (payload: Note) => {
    try {
      return await ky
        .post("https://api.jsonbin.io/b", {
          headers: {
            "Content-Type": "application/json",
            "secret-key": secretKey,
            private: "false",
            "collection-id": collectionId
          },
          json: {
            payload
          }
        })
        .json();
    } catch (err) {
      return err;
    }
  };

  static updateNote = async (noteId: string, payload: Note) => {
    try {
      return await ky
        .put(`https://api.jsonbin.io/b/${noteId}`, {
          headers: {
            "Content-Type": "application/json"
          },
          json: {
            payload
          }
        })
        .json();
    } catch (err) {
      return err;
    }
  };

  static readNote = async (noteId: string) => {
    try {
      return await ky
        .get(`https://api.jsonbin.io/b/${noteId}/latest`, {
          headers: {
            "secret-key": secretKey
          }
        })
        .json();
    } catch (err) {
      return err;
    }
  };

  static deleteNote = async (noteId: string) => {
    try {
      return await ky
        .delete(`https://api.jsonbin.io/b/${noteId}`, {
          headers: {
            "secret-key": secretKey
          }
        })
        .json();
    } catch (err) {
      return err;
    }
  };

  static getNotes = async () => {
    try {
      return await ky
        .get(`https://api.jsonbin.io/e/collection/${collectionId}/all-bins`, {
          headers: {
            "secret-key": secretKey,
            "collection-id": collectionId
          }
        })
        .json();
    } catch (err) {
      return err;
    }
  };
}
