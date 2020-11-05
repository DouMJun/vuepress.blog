import Vue from 'vue'
Vue.component("test", () => import("D:\\webPractice\\vuepressblog\\docs\\.vuepress\\components\\test"))
Vue.component("CodeBlock", () => import("D:\\webPractice\\vuepressblog\\node_modules\\@vuepress\\theme-default\\global-components\\CodeBlock"))
Vue.component("Badge", () => import("D:\\webPractice\\vuepressblog\\node_modules\\@vuepress\\theme-default\\global-components\\Badge"))
Vue.component("CodeGroup", () => import("D:\\webPractice\\vuepressblog\\node_modules\\@vuepress\\theme-default\\global-components\\CodeGroup"))


export default {}