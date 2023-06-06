import { writable } from 'svelte/store';

export const currentStep = writable(null);
export const filters = writable([]);