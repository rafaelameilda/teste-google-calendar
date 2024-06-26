<template>
  <r-container :label="label" :required="required" :help="help">
    <q-input
      ref="ccInput"
      v-model="content"
      class="field-container-content"
      :color="color"
      input-class="native-field-container-content"
      outlined
      :autofocus="autofocus"
      :clearable="clearable"
      clear-icon="close"
      dense
      :disable="disable"
      :inputName="inputName"
      :readonly="readonly"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :minlength="minlength"
      :error="error"
      :error-message="errorMessage"
      :mask="mask"
      :type="type"
      :counter="counter"
      :autogrow="autoGrow"
      @blur="$emit('blur-evt', $event)"
      @keypress.enter="$emit('keypress-enter')"
      @keypress.tab="$emit('keypress-tab')"
    >
      <template v-if="iconRight" v-slot:append>
        <q-icon
          class="cursor-pointer"
          @click="$emit('icon-click', inputName)"
          :name="icon"
        >
          <q-tooltip class="bg-primary" :offset="[10, 10]">
            Clique para incluir os produtos
          </q-tooltip></q-icon
        >
      </template>

      <template v-if="iconLeft" v-slot:prepend>
        <q-icon :name="icon"></q-icon>
      </template>
    </q-input>
  </r-container>
</template>

<script lang="ts">
import { defineComponent, watch, computed, ref } from "vue";

export default defineComponent({
  name: "Input",

  props: {
    value: [String, Number],
    label: String,
    clearable: Boolean,
    counter: Boolean,
    autofocus: Boolean,
    readonly: Boolean,
    disable: Boolean,
    icon: String,
    inputName: {
      type: String,
      required: true,
    },
    iconLeft: Boolean,
    placeholder: String,
    help: String,
    maxlength: Number,
    minlength: Number,
    errorMessage: String,
    autoGrow: Boolean,
    color: {
      type: String,
      default: "black",
    },
    iconRight: {
      default: false,
      type: Boolean,
    },
    type: {
      type: String,
      default: "text",
    },
    mask: String,
    error: Boolean,
    required: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    "valid",
    "svalid",
    "icon-click",
    "blur-evt",
    "keypress-enter",
    "keypress-tab",
    "input",
  ],

  setup(props, ctx) {
    const setValid = (valid: any, msg = "") => {
      ctx.emit("valid", {
        valid: valid,
        message: msg,
        inputName: props.inputName,
      });
      ctx.emit("svalid", valid);
    };

    const model = ref<string>("");

    const content = computed({
      get: () => model.value,
      set: (val: any) => {
        model.value = val;

        ctx.emit("input", {
          data: { [props.inputName]: val },
          campo: props.inputName,
        });
      },
    });

    watch(content, (value) => {
      if (props.minlength) {
        if (value.toString().length < props.minlength) {
          setValid(
            false,
            `Valor mínimo do campo não preenchido. ${props.minlength}`
          );
        } else {
          setValid(true, "");
        }
      }
      if (props.maxlength) {
        if (value.toString().length >= Number(props.maxlength)) {
          setValid(false, `Valor máximo do campo excedido. ${props.maxlength}`);
        } else {
          setValid(true, "");
        }
      }
    });

    return { setValid, content };
  },
});
</script>

<style scoped>
.native-field-container-content::-webkit-outer-spin-button,
.native-field-container-content::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

.native-field-container-content[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}

.field-container-content {
  padding: 8px 0;
}
</style>
