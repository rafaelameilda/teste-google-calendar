<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>
          <router-link class="title" to="/">Controle de Cargas </router-link>
        </q-toolbar-title>

        <q-btn flat rounded icon-right="account_circle" :label="user.name" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      :width="300"
      :breakpoint="500"
      bordered
    >
      <r-menu @logout="logoutPage" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title>
          <small>&copy; {{ copyright }} - PLIM LTDA</small>
        </q-toolbar-title>
        <q-space></q-space>
        <small @click="copyToClipBoard">Powered By {{ author }}</small>
        <strong @click="copyToClipBoard"
          ><small>&nbsp;&nbsp;Versão {{ appVersion }}</small></strong
        >
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import pachageInfo from "../../package.json";
import { useQuasar, copyToClipboard } from "quasar";

defineOptions({
  name: "MainLayout",
});

const $q = useQuasar();
const leftDrawerOpen = ref(true);
const appVersion = pachageInfo.version;
const author = pachageInfo.author;
const copyright = pachageInfo.copyright;
const user = { name: "Usuário Teste" };

const logoutPage = async () => {
  $q.notify({
    message: "Desconectando....",
    type: "warning",
    timeout: 2000,
    progress: true,
    spinner: true,
  });
};

const copyToClipBoard = () => {
  copyToClipboard("Precisando ligue! | Rafael Almeida (69) 99966-3803")
    .then(() => {
      $q.notify({
        message: "Dados Copiados para a área de transferência!",
        type: "positive",
      });
    })
    .catch(() => {
      $q.notify({
        message: "Falha ao copiar NF para a área de transferência!",
        type: "negative",
      });
    });
};
</script>

<style>
.title {
  text-decoration: none;
  color: white;
}
.q-drawer__content {
  background-color: #0c9abe !important;
}

* {
  font-family: "Poppins", sans-serif;
}
</style>
