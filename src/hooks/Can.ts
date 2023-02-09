import {createContext} from 'react';
import { createContextualCan } from '@casl/react';
import {ACLEntityEnum} from "../types";

type Actions = 'read' | 'update';
type Subjects = 'Auth' | 'Hospitals' | 'Users' | 'Surveys';

export const initialACL=
    [
        {
            action: 'read',
            subject: ACLEntityEnum.AUTH
        },
]

export type ACLInterface=Array<{action: Actions, subject: Subjects}>
export const AbilityContext = createContext ( undefined as any );
export const Can = createContextualCan(AbilityContext.Consumer);
