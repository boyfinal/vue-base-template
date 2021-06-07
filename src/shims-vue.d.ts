declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare var process: {
  env: {
    VUE_APP_BASE_API_ENDPOINT: string;
  };
};
