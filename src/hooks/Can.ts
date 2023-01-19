import { createContext } from 'react';
import { createContextualCan } from '@casl/react';
import {ability} from "../configs/acl/ability";

export const AbilityContext = createContext(ability);
export const Can = createContextualCan(AbilityContext.Consumer);
