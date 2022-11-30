import { writable, derived } from 'svelte/store';
import { extent } from 'd3-array';

import _states from '$data/states.csv';
import _stateGridData from '$data/StateGrid_wFootnotes.csv';
import _stateFundingData from '$data/Funding_11_9_22_b.csv';

export const currentState = writable('');
export const statesLookup = writable(_states);
export const stateGridData = writable(_stateGridData);
export const stateFundingData = writable(_stateFundingData);

export const stateData = derived(
	[currentState, statesLookup, stateGridData, stateFundingData],
	([$currentState, $stateLookup, $stateGridData, $stateFundingData]) => {
		if ($currentState === '') {
			return {};
		}

		const state = $stateLookup.find((d) => d.name === $currentState);
		let { name: stateName, abbrev: stateAbbrev } = state;

		// get funding data
		const fundingData = $stateFundingData
			.filter((d) => d.State === stateAbbrev)
			.map((d) => ({
				state: d.State,
				year: +d.Year,
				value: d.capitalexpratio_5yr === '' ? null : +d.capitalexpratio_5yr
			}));

		// get grid data
		const gridData = $stateGridData.find((d) => d.State === stateName);

		return {
			name: stateName,
			abbrev: stateAbbrev,
			gridData,
			fundingData
		};
	}
);
