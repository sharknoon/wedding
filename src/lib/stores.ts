import { writable } from 'svelte/store';
import type { Details, Invitation } from './types';

export const invitation = writable<Invitation>();
export const details = writable<Details>();
export const downloadIds = writable<string[]>([]);
