import { ref, Ref, onServerPrefetch } from "vue";
import { getAppInstance } from "../utils/appInstance";

interface AsyncDataOptions {
    server?: boolean;
}

interface IAsyncData<DataT, ErrorT> {
    data: Ref<DataT | null>;
    error: Ref<ErrorT | null>;
    loading: Ref<boolean>;
    refresh: () => Promise<void>;
}

type AsyncData<T, E> = IAsyncData<T, E> & Promise<IAsyncData<T, E>>;

export function useAsyncData<DataT, ErrorT = unknown>(
    key: string,
    handler: () => Promise<DataT>,
    options: AsyncDataOptions = { server: true }
): AsyncData<DataT, ErrorT> {
    const asyncData: IAsyncData<DataT, ErrorT> = {
        data: ref(null),
        error: ref(null),
        loading: ref(false),
        refresh: async () => {},
    };

    asyncData.data;

    const instance = getAppInstance();
    const initialState = instance.config.initialState;

    const isServer = import.meta.env.SSR;

    if (key in initialState) {
        asyncData.data.value = initialState[key];
    }

    let promise;

    asyncData.refresh = () => {
        asyncData.loading.value = true;

        const p = new Promise<DataT>((resolve, reject) => {
            try {
                resolve(handler());
            } catch (error) {
                reject(error);
            }
        })
            .then((result) => {
                asyncData.data.value = result;
                asyncData.error.value = null;
                instance.config.initialState[key] = asyncData.data.value;
            })
            .catch((error) => {
                asyncData.data.value = null;
                asyncData.error.value = error?.message ?? (error as ErrorT);
            })
            .finally(() => {
                asyncData.loading.value = false;
            });

        promise = p;
        return promise;
    };

    const initialFetch = () => asyncData.refresh();

    const fetchOnServer = options.server !== false;

    if (isServer && fetchOnServer) {
        const promise = initialFetch();
        if (instance) {
            onServerPrefetch(() => promise);
        }
    }

    if (!isServer && !fetchOnServer) {
        initialFetch();
    }

    const asyncDataPromise = Promise.resolve(promise).then(() => asyncData);
    return Object.assign(asyncDataPromise, asyncData) as AsyncData<DataT, ErrorT>;
}
