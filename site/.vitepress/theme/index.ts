// ── External Dependencies & Registrations
import DefaultTheme from 'vitepress/theme';
import type { App } from 'vue';

// ── Local (KB Site) Framework
import ConnectorHeader from './components/ConnectorHeader.vue';
import './custom.css';

export default {
    extends: DefaultTheme,
    enhanceApp({ app }: { app: App }) {
        app.component('ConnectorHeader', ConnectorHeader);
    }
};
