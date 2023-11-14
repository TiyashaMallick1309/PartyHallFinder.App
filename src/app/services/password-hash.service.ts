import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class PasswordHashService {

  constructor() { }

  public hashPassword(password: string): {
    salt: string,
    hash: string
  } {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const hash = CryptoJS.PBKDF2(password, salt, {
      keySize: 512 / 32,
      iterations: 1000
    });
    return {
      salt: salt.toString(),
      hash: hash.toString()
    };
  }
}
