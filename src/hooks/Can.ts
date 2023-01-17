import { createContext } from 'react';
import { createContextualCan } from '@casl/react';
import {createMongoAbility} from "@casl/ability";

export const initialAbility=createMongoAbility([{
    subject: 'Auth',
    action: 'read'
}])



export const AbilityContext = createContext(initialAbility);
export const Can = createContextualCan(AbilityContext.Consumer);
