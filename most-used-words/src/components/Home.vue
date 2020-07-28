<template>
  <v-container fluid class="d-flex flex-column full-height main-container">
    <v-form class="mt-2">
      <v-file-input
        multiple
        chips
        v-model="files"
        label="Selecione as legendas"
        prepend-icon="mdi-message-text"
        append-outer-icon="mdi-send"
        outlined
        @click:append-outer="processSubtitles"
        :disabled="loading"
      />
    </v-form>

    <div v-if="!loading" class="pills flex-grow-1">
      <Pill
        v-for="word in groupedWords"
        :key="word.name"
        :name="word.name"
        :amount="word.amount"
      />
    </div>

    <div v-if="loading" class="d-flex justify-center align-center flex-grow-1">
      <v-progress-circular
        :size="100"
        :width="7"
        color="primary"
        style="margin-top: -100px;"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-container>
</template>

<script>
const { ipcRenderer } = window.require("electron");
import Pill from "./Pill";

export default {
  components: { Pill },
  data: () => ({
    files: [],
    groupedWords: [],
    loading: false,
  }),
  methods: {
    processSubtitles() {
      const paths = this.files.map((f) => f.path);
      ipcRenderer.send("process-subtitles", paths);
      ipcRenderer.on("process-subtitles", (event, resp) => {
        this.loading = false;
        console.log(resp);
        this.groupedWords = resp;
      });
      this.loading = true;
    },
  },
};
</script>

<style>
* {
  user-select: none;
}
html {
  overflow: hidden !important;
}
html,
body,
body > div,
main {
  height: 100% !important;
}
.main-container {
  overflow-y: scroll !important;
}
.pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.full-height {
  height: 100%;
}
.v-file-input button {
  margin-top: -6px;
}
</style>