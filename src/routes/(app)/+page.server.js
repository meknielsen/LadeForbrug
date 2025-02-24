import { redirect } from '@sveltejs/kit';

export const actions = {
	login: ({ cookies, url }) => {
		cookies.set('logged_in', 'true', { path: '/' });
		redirect(303, url.searchParams.get('redirectTo') ?? '/ladeboks');
	}

};