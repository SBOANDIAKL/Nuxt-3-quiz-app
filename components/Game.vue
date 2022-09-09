<template>
  <div>
    <div v-if="data">
      <form @submit.prevent="startGame" class="container">
        <div class="card w-75 mx-auto" style="width: 18rem">
          <div class="card-body mx-auto">
            <h3 class="card-title text-center my-3">Quiz App</h3>
            <div class="card-text mx-auto">
              <div class="form-group w-75 mx-auto">
                <label for="number"
                  >Number of Questions:
                  <input
                    type="number"
                    class="w-25 ml-3"
                    v-model="number"
                    required
                    max="20"
                /></label>
              </div>
              <div class="form-group w-75 mx-auto">
                <label for="category">Select Category</label>
                <select class="custom-select w-50 mx-3" v-model="category">
                  <option value="0" selected>Any Category</option>
                  <option
                    v-for="category in data?.trivia_categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <div class="form-group w-75 mx-auto">
                <label for="difficulty">Select Diffucilty: </label>
                <select class="custom-select w-50 mx-3" v-model="difficulty">
                  <option selected value="">Any Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div class="form-group w-75 mx-auto">
                <label for="difficulty">Select Type</label>
                <select class="custom-select w-50 ml-5" v-model="type">
                  <option selected value="">Any Type</option>
                  <option value="multiple">Multiple</option>
                  <option value="boolean">True/False</option>
                </select>
              </div>
            </div>
            <div class="w-25 mx-auto">
              <button class="btn btn-primary">Let's Begin</button>
            </div>

            <!-- {{ store.categories }} -->
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { testStore } from "~/store/";

const store = testStore();
const number = ref(10);
const category = ref("0");
const apicategory = ref([]);
const type = ref("");
const difficulty = ref("");
const router = useRouter();

function startGame() {
  // router.push(
  //   "/game?amount=" +
  //     number.value +
  //     "&category=" +
  //     category.value +
  //     "&difficulty=" +
  //     difficulty.value
  // );
  router.push("/game");
  store.total = number.value;
  store.category = category.value;
  store.difficulty = difficulty.value;
  store.type = type.value;

  //   router.push({
  //     name: "game",
  //     query: {
  //       amount: number.value,
  //       category: category.value,
  //       difficulty: difficulty.value,
  //       type: type.value,
  //     },
  //   });
}

const { data, pending, error, refresh } = await useAsyncData("categories", () =>
  $fetch("https://opentdb.com/api_category.php")
);
</script>
