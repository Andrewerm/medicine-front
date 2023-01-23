import {createContext} from 'react';
import { createContextualCan } from '@casl/react';

type Actions = 'read' | 'update';
type Subjects = 'Login' | 'Register' | 'Hospitals' | 'Users' | 'Surveys';
export type ACLInterface=Array<{action: Actions, subject: Subjects}>
export const AbilityContext = createContext ( undefined as any );
export const Can = createContextualCan(AbilityContext.Consumer);
