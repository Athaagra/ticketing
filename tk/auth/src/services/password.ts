import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
 static async toHash(password:string){
  const salt = randomBytes(8).toString('hex');
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  console.log(salt,buf);
  return `${buf.toString('hex')}.${salt}`;
 }
 static async compare(storedPassword: string, suppliedPassword: string){
  console.log('This is stored password',storedPassword.split('.'));
  const [hashedPassword, salt] = storedPassword.split('.');
  console.log('This is hashed password',hashedPassword);
  console.log('This is salt',salt);
  const buf = (await scryptAsync(suppliedPassword, salt as string, 64)) as Buffer;
  return buf.toString('hex') === hashedPassword; 
 }
}

