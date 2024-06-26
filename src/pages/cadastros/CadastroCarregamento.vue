<template>
  <q-card bordered>
    <q-card>
      <q-card-section>
        <!-- <q-card>
          <q-card-section> -->
        <q-form ref="formFieldsRef" class="row q-col-gutter-xs q-pa-sm">
          <r-input
            :label="'Fornecedor'"
            inputName="inputFornecedor"
            :required="true"
            class="col-12 col-lg-6 col-md-6"
          />
        </q-form>
      </q-card-section>

      <q-separator />
      <q-card-actions align="right">
        <q-btn
          outline
          no-caps
          icon="far fa-window-close"
          type="reset"
          color="negative"
          label="Cancelar"
        >
          <q-tooltip
            transition-show="rotate"
            class="bg-primary"
            transition-hide="rotate"
            content-class="bg-accent"
            >Cancelar e limpar formulário</q-tooltip
          >
        </q-btn>
        <q-btn
          outline
          no-caps
          icon="far fa-plus-square"
          type="submit"
          color="secondary"
          label="Adicionar"
        >
          <q-tooltip
            transition-show="rotate"
            class="bg-primary"
            transition-hide="rotate"
            content-class="bg-accent"
            >Adicionar Item a Lista</q-tooltip
          >
        </q-btn>
      </q-card-actions>
      <!-- </q-card>
      </q-card-section> -->
    </q-card>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "IndexPage",
});
</script>
