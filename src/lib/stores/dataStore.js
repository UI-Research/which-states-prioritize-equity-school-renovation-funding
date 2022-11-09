import { writable, derived } from 'svelte/store';

import _states from '$data/states.csv';
import _stateFundingData from '$data/TestStateData.csv';

export const statesLookup = writable(_states);
export const stateFundingData = writable(_stateFundingData);
