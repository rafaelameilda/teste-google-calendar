<template>
  <q-page class="q-pa-md items-start q-gutter-xs">
    <div class="row q-col-gutter-sm">
      <div :class="i.class" v-for="i in cards" :key="i.id">
        <q-card class="cursor-pointer" :class="'bg-' + i.cor" v-if="i.qtLaudos">
          <q-card-section horizontal>
            <q-card-section class="col-md-7 col-lg-9 col-sm-10 text-middle">
              <div class="card-title">Caminhões: {{ i.flagPosicao }}</div>
              <div class="time">Nenhuma atividade ainda</div>
            </q-card-section>
            <q-separator vertical />
            <q-card-section>
              <div class="card-number text-middle">{{ i.qtLaudos }}</div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="flex flex-center">
      <img class="image" src="logo_home.svg" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { googleTokenLogin } from "vue3-google-login";
import { useQuasar } from "quasar";

defineOptions({
  name: "IndexPage",
});

const events = ref<any>([]);
const userProfile = ref<any>(null);
const $q = useQuasar();

const callback = async () => {
  try {
    const token = await googleTokenLogin();

    const result = await fetch("http://localhost:3000/exchange-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: token.access_token }),
    });

    const data = await result.json();

    events.value = data.events;
    userProfile.value = data.userProfile;

    $q.notify({
      color: "positive",
      position: "top",
      message: "bem vindo nego doido " + data.userProfile.name,
      icon: "report_problem",
    });
  } catch (error) {
    console.error("Error during Google login or fetching events:", error);
  }
};

const cards = [
  {
    qtLaudos: 10,
    flagPosicao: "Carregar",
    cor: "brown",
    class: "col-md-4 col-lg-4 col-sm-12 col-xs-12",
    id: 1,
  },
  {
    qtLaudos: 10,
    flagPosicao: "Descarregar",
    cor: "blue-grey",
    class: "col-md-4 col-lg-4 col-sm-12 col-xs-12",
    id: 2,
  },
  {
    qtLaudos: 10,
    flagPosicao: "Fila",
    cor: "teal",
    class: "col-md-4 col-lg-4 col-sm-12 col-xs-12",
    id: 3,
  },
];

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};
</script>

<style scoped>
.image {
  height: calc(100vh - 440px);
  padding-top: 10%;
}

* {
  font-family: "Poppins", sans-serif;
}

.card-title {
  color: #fff;

  font-size: 19px;
}

.card-number {
  color: #fff;
  font-weight: bold;
  font-size: 27px;
}

.time {
  color: #fff;
  font-size: 10px;
  font-weight: normal;
}
</style>
