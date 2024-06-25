<template>
  <q-page class="row items-center justify-evenly q-pa-md">
    <div>
      <q-btn
        @click="callback"
        label="Login Using Google"
        color="green"
        rounded
        class="q-mb-md"
      />

      <div v-if="userProfile">
        <q-card class="q-ma-md">
          <q-card-section>
            <div class="row items-center">
              <img size="64px" :src="userProfile.picture" />
              <div class="q-ml-md">
                <div class="text-h6">{{ userProfile.name }}</div>
                <div class="text-subtitle2">{{ userProfile.email }}</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div v-if="events.length">
        <q-card class="q-ma-md">
          <q-card-section>
            <div class="text-h6 q-mb-md">Events</div>
            <q-list bordered>
              <q-item v-for="event in events" :key="event.id">
                <q-item-section>
                  <q-item-label>{{ event.summary }}</q-item-label>
                  <q-item-label caption>{{
                    formatDate(event.start.dateTime)
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
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

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};
</script>
