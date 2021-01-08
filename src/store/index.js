import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './mutation-types';

import router from '../router';
import api from '../api';

Vue.use(Vuex);

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',

	state: {
		isBootingUp: true,
		session: {
			token: undefined,
			userId: undefined
		},
		signIn: {
			inProgress: false,
			payload: undefined,
			data: undefined,
			error: undefined
		},
		signUp: {
			inProgress: false,
			payload: undefined,
			data: undefined,
			error: undefined
		},
		troubleSigningIn: {
			inProgress: false,
			payload: undefined,
			data: undefined,
			error: undefined
		},
		vehicleList: {
			inProgress: false,
			payload: undefined,
			data: undefined,
			error: undefined
		},
		vehicle: {
			inProgress: false,
			payload: undefined,
			data: undefined,
			error: undefined
		},
		vehicleCreate: {
			inProgress: false,
			payload: undefined,
			data: undefined,
			error: undefined
		},
		vehicleUpdate: {
			inProgress: false,
			payload: undefined,
			data: undefined,
			error: undefined
		},
		vehicleDelete: {
			inProgress: false,
			payload: undefined,
			data: undefined,
			error: undefined
		},
		account: {
			inProgress: false,
			payload: undefined,
			data: undefined,
			error: undefined
		},
		accountUpdate: {
			inProgress: false,
			payload: undefined,
			data: undefined,
			error: undefined
		},
		accountDelete: {
			inProgress: false,
			payload: undefined,
			data: undefined,
			error: undefined
		},
		broadcastCreate: {
			inProgress: false,
			payload: undefined,
			data: undefined,
			error: undefined
		},
		broadcastDelete: {
			inProgress: false,
			payload: undefined,
			data: undefined,
			error: undefined
		}
	},
	getters: {
		isLoggedIn: (state) => state.session.token && state.session.userId
	},
	mutations: {
		[types.SESSION_SET](state, { token, userId }) {
			state.isBootingUp = false;

			state.session = {
				token: token && token.length ? token : undefined,
				userId: userId && userId.length ? userId : undefined
			};
		},
		[types.SIGN_IN](state, payload) {
			state.signIn = { ...state.signIn, ...payload };
		},
		[types.SIGN_UP](state, payload) {
			state.signUp = { ...state.signUp, ...payload };
		},
		[types.TROUBLE_SIGNING_IN](state, payload) {
			state.troubleSigningIn = { ...state.troubleSigningIn, ...payload };
		},
		[types.VEHICLE_LIST](state, payload) {
			state.vehicleList = { ...state.vehicleList, ...payload };
		},
		[types.VEHICLE](state, payload) {
			state.vehicle = { ...state.vehicle, ...payload };
		},
		[types.VEHICLE_CREATE](state, payload) {
			state.vehicleCreate = { ...state.vehicleCreate, ...payload };
		},
		[types.VEHICLE_UPDATE](state, payload) {
			state.vehicleUpdate = { ...state.vehicleUpdate, ...payload };
		},
		[types.VEHICLE_DELETE](state, payload) {
			state.vehicleDelete = { ...state.vehicleDelete, ...payload };
		},
		[types.ACCOUNT](state, payload) {
			state.account = { ...state.account, ...payload };
		},
		[types.ACCOUNT_UPDATE](state, payload) {
			state.accountUpdate = { ...state.accountUpdate, ...payload };
		},
		[types.ACCOUNT_DELETE](state, payload) {
			state.accountDelete = { ...state.accountDelete, ...payload };
		},
		[types.BROADCAST_CREATE](state, payload) {
			state.broadcastCreate = { ...state.broadcastCreate, ...payload };
		},
		[types.BROADCAST_DELETE](state, payload) {
			state.broadcastDelete = { ...state.broadcastDelete, ...payload };
		}
	},
	actions: {
		async bootUp({ commit, state, dispatch }) {
			const current = window.localStorage.getItem('deliveryguy_session');

			const [
				token,
				userId
			] = (current || '').split('/akd/');

			commit(types.SESSION_SET, { token, userId });

			api.setUserToken(token);

			if(!token) {
				return;
			}

			await dispatch('account', { id: userId });
		},
		async signIn({ commit, state, dispatch }, payload) {
			if(state.signIn.inProgress) {
				return;
			}

			try {
				commit(types.SIGN_IN, { inProgress: true, payload, error: undefined });
				const response = await api.request('sign_in', payload);
				commit(types.SIGN_IN, { inProgress: false, payload: undefined });

				window.localStorage.setItem('deliveryguy_session', `${response.data.token}/akd/${response.data.userId}`);

				await dispatch('bootUp');

				router.push({ name: 'auth' });
			} catch(error) {
				commit(types.SIGN_IN, { inProgress: false, error });
				// throw error;
			}
		},
		async signOut({ commit }) {
			try {
				api.request('sign_out');
			} catch(error) {
			}
			commit(types.SESSION_SET, {});
			window.localStorage.removeItem('deliveryguy_session');

			router.push({ name: 'signin' });
		},
		async signUp({ commit, state }, payload) {
			if(state.signUp.inProgress) {
				return;
			}

			try {
				commit(types.SIGN_UP, { inProgress: true, payload, error: undefined });
				const response = await api.request('sign_up', payload);
				commit(types.SIGN_UP, { inProgress: false, data: response.data });
			} catch(error) {
				commit(types.SIGN_UP, { inProgress: false, error });
				// throw error;
			}
		},
		async troubleSigningIn({ commit, state }, payload) {
			if(state.troubleSigningIn.inProgress) {
				return;
			}

			try {
				commit(types.TROUBLE_SIGNING_IN, { inProgress: true, payload, error: undefined });
				const response = await api.request('trouble_signing_in', payload);
				commit(types.TROUBLE_SIGNING_IN, { inProgress: false, data: response.data });
			} catch(error) {
				commit(types.TROUBLE_SIGNING_IN, { inProgress: false, error });
				// throw error;
			}
		},
		async vehicleList({ commit, state }, payload) {
			if(state.vehicleList.inProgress) {
				return;
			}

			try {
				commit(types.VEHICLE_LIST, { inProgress: true, payload, error: undefined });
				const response = await api.request('vehicles', payload);
				commit(types.VEHICLE_LIST, { inProgress: false, data: response.data });
			} catch(error) {
				commit(types.VEHICLE_LIST, { inProgress: false, error });
				// throw error;
			}
		},
		async vehicle({ commit, state }, payload) {
			if(state.vehicle.inProgress) {
				return;
			}

			try {
				commit(types.VEHICLE, { inProgress: true, payload, error: undefined });
				const response = await api.request('vehicles.get', payload);
				commit(types.VEHICLE, { inProgress: false, data: response.data });
			} catch(error) {
				commit(types.VEHICLE, { inProgress: false, error });
				// throw error;
			}
		},
		async clearVehicle({ commit, state }) {
			commit(types.VEHICLE, { inProgress: false, payload: undefined, data: undefined, error: undefined });
		},
		async vehicleCreate({ commit, state }, payload) {
			if(state.vehicleCreate.inProgress) {
				return;
			}

			try {
				commit(types.VEHICLE_CREATE, { inProgress: true, payload, error: undefined });
				const response = await api.request('vehicles.create', payload);
				commit(types.VEHICLE_CREATE, { inProgress: false, data: response.data });
			} catch(error) {
				commit(types.VEHICLE_CREATE, { inProgress: false, error });
				// throw error;
			}
		},
		async clearVehicleCreate({ commit, state }) {
			commit(types.VEHICLE_CREATE, { inProgress: false, payload: undefined, data: undefined, error: undefined });
		},
		async vehicleUpdate({ commit, state }, payload) {
			if(state.vehicleUpdate.inProgress) {
				return;
			}

			try {
				commit(types.VEHICLE_UPDATE, { inProgress: true, payload, error: undefined });
				const response = await api.request('vehicles.update', payload);
				commit(types.VEHICLE_UPDATE, { inProgress: false, data: response.data });
			} catch(error) {
				commit(types.VEHICLE_UPDATE, { inProgress: false, error });
				// throw error;
			}
		},
		async vehicleDelete({ commit, state }, payload) {
			if(state.vehicleDelete.inProgress) {
				return;
			}

			try {
				commit(types.VEHICLE_DELETE, { inProgress: true, payload, error: undefined });
				const response = await api.request('vehicles.delete', payload);
				commit(types.VEHICLE_DELETE, { inProgress: false, data: response.data || {} });
			} catch(error) {
				commit(types.VEHICLE_DELETE, { inProgress: false, error });
				// throw error;
			}
		},
		async account({ commit, state }, payload) {
			if(state.account.inProgress) {
				return;
			}

			try {
				commit(types.ACCOUNT, { inProgress: true, payload, error: undefined });
				const response = await api.request('accounts.get', payload);
				commit(types.ACCOUNT, { inProgress: false, data: response.data });
			} catch(error) {
				commit(types.ACCOUNT, { inProgress: false, error });
				// throw error;
			}
		},
		async accountUpdate({ commit, state }, payload) {
			if(state.accountUpdate.inProgress) {
				return;
			}

			try {
				commit(types.ACCOUNT_UPDATE, { inProgress: true, payload, error: undefined });
				const response = await api.request('accounts.update', payload);
				commit(types.ACCOUNT_UPDATE, { inProgress: false, data: response.data });
				commit(types.ACCOUNT, { inProgress: false, data: response.data });
			} catch(error) {
				commit(types.ACCOUNT_UPDATE, { inProgress: false, error });
				// throw error;
			}
		},
		async accountDelete({ commit, state, dispatch }, payload) {
			if(state.accountDelete.inProgress) {
				return;
			}

			try {
				commit(types.ACCOUNT_DELETE, { inProgress: true, payload, error: undefined });
				const response = await api.request('accounts.delete', payload);
				commit(types.ACCOUNT_DELETE, { inProgress: false, data: response.data || {} });
				dispatch('signOut', payload);
			} catch(error) {
				commit(types.ACCOUNT_DELETE, { inProgress: false, error });
				// throw error;
			}
		},
		async broadcastCreate({ commit, state }, payload) {
			if(state.broadcastCreate.inProgress) {
				return;
			}

			try {
				commit(types.BROADCAST_CREATE, { inProgress: true, payload, error: undefined });
				const response = await api.request('broadcasts.create', payload);
				commit(types.BROADCAST_CREATE, { inProgress: false, data: response.data });
			} catch(error) {
				commit(types.BROADCAST_CREATE, { inProgress: false, error });
				// throw error;
			}
		},
		async broadcastDelete({ commit, state }, payload) {
			if(state.broadcastDelete.inProgress) {
				return;
			}

			try {
				commit(types.BROADCAST_DELETE, { inProgress: true, payload, error: undefined });
				const response = await api.request('broadcasts.delete', payload);
				commit(types.BROADCAST_DELETE, { inProgress: false, data: response.data || {} });
			} catch(error) {
				commit(types.BROADCAST_DELETE, { inProgress: false, error });
				// throw error;
			}
		}
	}
});
