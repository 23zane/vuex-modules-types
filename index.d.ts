import {ActionContext, ActionTree, DispatchOptions, GetterTree, MutationTree, Store as VuexStore} from "vuex";
import {VuexModule} from "vuex-module-decorators";

export type CommonActionContext<
	Module extends {
		[key in Mutations]: (...args: any) => any;
	} &
		{
			[key in Actions]: (...args: any) => any;
		} &
		{
			[key in Getters]: any;
		},
	Mutations extends string | number | symbol = keyof Module,
	Actions extends string | number | symbol = keyof Module,
	Getters extends string | number | symbol = keyof Module,
	RootGetters extends Record<string, any> = Record<string, any>
	> = {
	commit<K extends Mutations>(key: K, payload?: Parameters<Module[K]>[0]): ReturnType<Module[K]>;
	dispatch<K extends Actions, P extends Parameters<Module[K]>[0]>(
		key: K,
		payload?: P,
		options?: DispatchOptions
	): ReturnType<Module[K]>;
	getters: {
		[key in Getters]: Module[key];
	};
	rootGetters: RootGetters;
} & Omit<ActionContext<Module, Module>, "commit" | "getters" | "rootGetters">;

export abstract class GenericVuexModule<
	C extends {
		[key in M]: (...args: any) => any;
	} &
		{
			[key in A]: (...args: any) => any;
		} &
		{
			[key in G]: any;
		},
	M extends string | number | symbol = keyof C,
	A extends string | number | symbol = keyof C,
	G extends string | number | symbol = keyof C
	> extends VuexModule {
	context: CommonActionContext<C, M, A, G>;
	mutations?: MutationTree<C> &
		{
			[key in M]: any;
		};
	actions?: ActionTree<C, C> &
		{
			[key in A]: any;
		};
	getters?: GetterTree<C, C> &
		{
			[key in G]: any;
		};
	state: C;
}

export interface GenericVuexModuleInterface<
	C extends {
		[key in M]: (...args: any) => any;
	} &
		{
			[key in A]: (...args: any) => any;
		} &
		{
			[key in G]: any;
		},
	M extends string | number | symbol = keyof C,
	A extends string | number | symbol = keyof C,
	G extends string | number | symbol = keyof C
	> extends VuexModule {
	context: CommonActionContext<C, M, A, G>;
	mutations?: MutationTree<C> &
		{
			[key in M]: any;
		};
	actions?: ActionTree<C, C> &
		{
			[key in A]: any;
		};
	getters?: GetterTree<C, C> &
		{
			[key in G]: any;
		};
}

export type CommonStore<
	C extends {
		[key in M]: (...args: any) => any;
	} &
		{
			[key in A]: (...args: any) => any;
		} &
		{
			[key in G]: any;
		},
	M extends string | number | symbol = keyof C,
	A extends string | number | symbol = keyof C,
	G extends string | number | symbol = keyof C
	> = Omit<VuexStore<C>, "commit" | "dispatch" | "getters"> & {
	commit<K extends M>(key: K, payload?: Parameters<C[K]>[0]): ReturnType<C[K]>;
	dispatch<K extends A, P extends Parameters<C[K]>[0]>(
		key: K,
		payload?: P,
		options?: DispatchOptions
	): ReturnType<C[K]>;
	getters: {
		[key in G]: C[key];
	};
};