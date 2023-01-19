import { createMongoAbility } from '@casl/ability';
import {initialAbility} from "./initialAbility";

export type Actions =  'read' | 'update';
export type Subjects = 'Login' | 'Users'| 'Surveys'|'Hospitals'|'Register';

const localStorageData=localStorage.getItem('userData')
let existingAbility
if (localStorageData) {
    const userData = JSON.parse(localStorageData)
    existingAbility = userData && userData.ability
}


export const ability = createMongoAbility<[Actions, Subjects]>(existingAbility || initialAbility);
