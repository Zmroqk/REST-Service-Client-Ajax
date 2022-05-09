<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import DocumentationIcon from './components/icons/IconDocumentation.vue'
import BookForm from './components/BookForm.vue'
import {ref, onMounted} from "vue";

const checked = ref(false);
const booksData = ref([]);
const fetchData = () => fetch("http://localhost:3000/all").then(res => { if(res.ok) return res.json(); else return null; }).then(data => booksData.value = data);

onMounted(() => {
  fetchData();
});

</script>

<template>
  <header>
    <div class="logo">
      <DocumentationIcon />
    </div>
    <BookForm :modifyMode="checked" />
  </header>

  <main>
    <div v-for="book in booksData">
      {{book.title}}
    </div>
  </main>
</template>

<style>
@import "./assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
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
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
