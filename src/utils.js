import { getCurrentInstance, hasInjectionContext } from "vue";

export function getAppInstance() {
    let instance = null;

    if (hasInjectionContext()) {
        instance = getCurrentInstance().appContext.app;
    }

    return instance;
}
