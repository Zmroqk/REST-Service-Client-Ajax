<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";
import DocumentationIcon from "./components/icons/IconDocumentation.vue";
import BookForm from "./components/BookForm.vue";
import { ref, onMounted } from "vue";

const checked = ref(false);
const modifiedBook = ref(undefined);
const booksData = ref([]);
const fetchData = () =>
  fetch("http://localhost:3000/all")
    .then((res) => {
      if (res.ok) return res.json();
      else return null;
    })
    .then((data) => {
      data.forEach((book) => {
        const date = new Date(book.releaseDate);
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();
        if (dd < 10) {
          dd = `0${dd}`;
        }
        if (mm < 10) {
          mm = `0${mm}`;
        }
        book.releaseDate = `${dd}-${mm}-${yyyy}`;
      });
      booksData.value = data;
    });

const removeItem = async (id) => {
  await fetch("http://localhost:3000/delete/" + id, { method: "DELETE" });
  await fetchData();
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="main-container">
    <header>
      <div class="logo">
        <DocumentationIcon />
      </div>
      <BookForm
        :modifyMode="checked"
        :book="modifiedBook"
        @on-submit="fetchData()"
        @on-exit-modify="
          () => {
            checked = false;
            fetchData();
          }
        "
      />
    </header>

    <main>
      <div v-for="book in booksData" :key="book.id">
        <div class="flex">
          <div>
            {{ book.title }}
          </div>
          <div>
            {{ book.author }}
          </div>
          <div>
            {{ book.score }}
          </div>
          <div>
            {{ book.releaseDate }}
          </div>
        </div>
        <div>
          Description
          <p>
            {{ book.description }}
          </p>
        </div>
        <div>
          <button
            @click="
              () => {
                checked = true;
                modifiedBook = book;
              }
            "
          >
            Modify
          </button>
          <button @click="removeItem(book.id)">Remove</button>
        </div>
        <hr />
      </div>
    </main>
  </div>
</template>

<style>
@import "./assets/base.css";

.flex {
  display: flex;
  align-content: space-around;
  width: 600px;
}
.flex > div {
  flex: 1;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

main {
  margin-top: 20px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    margin: 20px;
  }

  .main-container {
    display: flex;
    padding-right: calc(var(--section-gap) / 2);
  }

  .main-container .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
