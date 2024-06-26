import { boot } from "quasar/wrappers";
import Menu from "src/components/Menu.vue";
import InputContainer from "src/components/InputContainer.vue";
import RInput from "src/components/Input.vue";

export default boot(({ app }) => {
  app.component("r-menu", Menu);
  app.component("r-container", InputContainer);
  app.component("r-input", RInput);
});
