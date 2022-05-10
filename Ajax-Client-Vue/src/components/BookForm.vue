<script setup>
import { onBeforeUpdate, ref } from "vue";
const props = defineProps({
  modifyMode: {
    type: Boolean,
    required: true,
  },
  book: Object,
});
const emit = defineEmits("onSubmit", "onExitModify");

const Book = ref({
  title: "",
  author: "",
  description: "",
  score: 0,
  releaseDate: "",
});

const submitBook = async () => {
  await fetch("http://localhost:3000/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Book.value),
  });
  emit("onSubmit");
};

const modifyBook = async () => {
  await fetch("http://localhost:3000/modify/" + props.book.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Book.value),
  });
  emit("onExitModify");
};

onBeforeUpdate(() => {
  if (props.book && props.modifyMode) {
    Book.value = props.book;
  }
});
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ !props.modifyMode ? "Add book" : "Modify book" }}</h1>
    <div>
      <label for="input-title">Provide title:</label>
      <input name="input-title" v-model="Book.title" placeholder="Title" />
    </div>
    <div>
      <label for="input-author">Provide author:</label>
      <input name="input-author" v-model="Book.author" placeholder="Author" />
    </div>
    <div>
      <label for="input-description">Provide description:</label>
      <textarea
        name="input-description"
        v-model="Book.description"
        placeholder="Description"
      />
    </div>
    <div>
      <label for="input-score">Provide score:</label>
      <input
        type="number"
        name="input-score"
        v-model="Book.score"
        placeholder="Score"
      />
    </div>
    <div>
      <label for="input-score">Provide release date:</label>
      <input
        type="date"
        name="input-score"
        v-model="Book.releaseDate"
        placeholder="Release date"
      />
    </div>
    <div>
      Summary:
      <div>Title: {{ Book.title }}</div>
      <div>Author: {{ Book.author }}</div>
      <div>Score: {{ Book.score }}</div>
      <div>Release date: {{ Book.releaseDate }}</div>
      <div>Description: {{ Book.description }}</div>
    </div>
    <div>
      <button @click.prevent="props.modifyMode ? modifyBook() : submitBook()">
        {{ props.modifyMode ? "Modify" : "Add book" }}
      </button>
      <button
        v-if="props.modifyMode"
        @click="
          () => {
            emit('onExitModify');
          }
        "
      >
        Exit modify mode
      </button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

button {
  width: 100%;
}

label {
  display: block;
}

input,
textarea {
  margin: 5px;
}

.greetings {
  min-width: 400px;
}

.greetings input,
.greetings textarea {
  width: 100%;
}

.greetings h1,
.greetings h3,
.greetings label {
  text-align: center;
}
</style>
