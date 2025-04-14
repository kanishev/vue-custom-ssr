import { getCurrentInstance, hasInjectionContext } from "vue";
import type { App } from "vue";

type AppInstance = App | null;

export function getAppInstance(): AppInstance {
    let instance: AppInstance = null;

    if (hasInjectionContext()) {
        const currentInstance = getCurrentInstance();

        if (currentInstance) {
            instance = currentInstance.appContext.app;
        } else {
            console.log("App instance not found.");
        }
    }

    return instance;
}

export function formClientInstanceProperties(app, context) {
    app.config.initialState = context.initialState;
    app.config.globalState = context.globalState;
}
