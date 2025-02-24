import { redirect } from '@sveltejs/kit';

export const actions = {
	logout: ({ cookies }) => {
		cookies.delete('logged_in', { path: '/' });
		redirect(303, '/');
	}
};