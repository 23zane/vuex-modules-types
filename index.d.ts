import {ActionContext, ActionTree, DispatchOptions, GetterTree, MutationTree, Store as VuexStore} from "vuex";
import {VuexModule} from "vuex-module-decorators";
declare module "@23zane/vuex-modules-types" {
	export type CommonActionContext<Module extends {
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
		RootGetters extends Record<string, any> = Record<string, any>> = {
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

	export abstract class GenericVuexModule<Module extends {
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
		RootGetters extends Record<string, any> = Record<string, any>> extends VuexModule {
		context: CommonActionContext<Module, Mutations, Actions, Getters, RootGetters>;
		mutations?: MutationTree<Module> &
			{
				[key in Mutations]: any;
			};
		actions?: ActionTree<Module, Module> &
			{
				[key in Actions]: any;
			};
		getters?: GetterTree<Module, Module> &
			{
				[key in Getters]: any;
			};
		state: Module;
	}

	export interface GenericVuexModuleInterface<Module extends {
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
		RootGetters extends Record<string, any> = Record<string, any>> extends VuexModule {
		context: CommonActionContext<Module, Mutations, Actions, Getters, RootGetters>;
		mutations?: MutationTree<Module> &
			{
				[key in Mutations]: any;
			};
		actions?: ActionTree<Module, Module> &
			{
				[key in Actions]: any;
			};
		getters?: GetterTree<Module, Module> &
			{
				[key in Getters]: any;
			};
	}

	export type CommonStore<Module extends {
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
		Getters extends string | number | symbol = keyof Module> =
		Omit<VuexStore<Module>, "commit" | "dispatch" | "getters">
		& {
		commit<K extends Mutations>(key: K, payload?: Parameters<Module[K]>[0]): ReturnType<Module[K]>;
		dispatch<K extends Actions, P extends Parameters<Module[K]>[0]>(
			key: K,
			payload?: P,
			options?: DispatchOptions
		): ReturnType<Module[K]>;
		getters: {
			[key in Getters]: Module[key];
		};
	};
}